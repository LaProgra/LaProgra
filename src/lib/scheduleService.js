import { supabase } from "./supabaseClient";
import { getAirportCity } from "./airports";
import { isProgrammedActivity } from "./scheduleAnalysis";

export async function isUsernameAvailable(username) {
  const normalized = String(username || "").trim().toLowerCase();
  const { data, error } = await supabase.rpc("is_username_available", {
    candidate_username: normalized,
  });
  if (error) throw error;
  return data === true;
}

export async function saveProfile(userId, profile) {
  const username = String(profile.username || "").trim().toLowerCase();
  if (!/^[a-z0-9_-]{3,30}$/.test(username)) {
    throw new Error("El nombre de usuario debe tener entre 3 y 30 caracteres: letras, números, guiones o guiones bajos.");
  }
  const { error } = await supabase.from("profiles").upsert({
    id: userId,
    airline: profile.airline,
    base: profile.base,
    base_city: profile.baseCity,
    username,
    display_time_zone: profile.displayTimeZone || "base",
    include_manual_events_in_pdf: profile.includeManualEventsInPdf !== false,
    public_calendar_enabled: profile.publicCalendarEnabled === true,
    public_calendar_pin_hash: profile.publicCalendarPinHash || null,
    show_rest_day_events: profile.showRestDayEvents === true,
  });
  if (error) {
    if (error.code === "23505") throw new Error("Ese nombre de usuario ya está en uso.");
    throw error;
  }
}

export async function hashPublicPin(pin) {
  const data = new TextEncoder().encode(String(pin));
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function loadProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function searchProfiles(query) {
  const { data, error } = await supabase.rpc("search_profiles", { search_term: String(query || "").replace(/^@/, "").trim() });
  if (error) throw error;
  return data || [];
}

export async function loadFriendships() {
  const { data, error } = await supabase.rpc("load_friendships");
  if (error) throw error;
  return { friends: data?.friends || [], received: data?.received || [], sent: data?.sent || [] };
}

export async function sendFriendRequest(targetUserId) {
  const { data, error } = await supabase.rpc("send_friend_request", { target_user_id: targetUserId });
  if (error) {
    if (error.message?.includes("already_friends")) throw new Error("Ya sois amigos.");
    if (error.message?.includes("request_already_pending") || error.code === "23505") throw new Error("Ya existe una solicitud con este usuario.");
    throw error;
  }
  return data;
}

export async function respondToFriendRequest(requestId, status) {
  const { data, error } = await supabase.rpc("respond_friend_request", { request_id: requestId, next_status: status });
  if (error) throw error;
  return data;
}

export async function removeFriend(friendUserId) {
  const { error } = await supabase.rpc("remove_friendship", {
    friend_user_id: friendUserId,
  });
  if (error) {
    if (error.message?.includes("friendship_not_found")) {
      throw new Error("La amistad ya no existe.");
    }
    throw error;
  }
}

export async function loadFriendSchedule(friendUserIds, month, year) {
  const { data, error } = await supabase.rpc("load_friend_schedule", {
    friend_user_ids: friendUserIds,
    requested_month: month,
    requested_year: year,
  });
  if (error) throw error;
  return data?.users || [];
}

export function compareFriendSchedules(currentEvents, friendUsers, options = {}) {
  const users = [{ id: "me", username: "Tú", base: options.baseIata, events: currentEvents }, ...friendUsers];
  const periodStart = Date.UTC(options.year, options.month - 1, 1);
  const periodEnd = Date.UTC(options.year, options.month, 1);
  const presences = users.map((user) => ({ user, ...buildUserPresences(user, periodStart, periodEnd) }));
  const matches = [];
  const seen = new Map();
  const addMatches = (leftList, rightList, locationType, minimumMinutes) => {
    leftList.forEach((left) => rightList.forEach((right) => {
      if (left.user.id === right.user.id) return;
      const sameLocation = locationType === "airport"
        ? left.airportIata && left.airportIata === right.airportIata
        : left.cityKey && left.cityKey === right.cityKey;
      if (!sameLocation) return;
      const overlapStart = Math.max(left.startAt, right.startAt);
      const overlapEnd = Math.min(left.endAt, right.endAt);
      if (overlapEnd <= overlapStart) return;
      const durationMinutes = Math.round((overlapEnd - overlapStart) / 60000);
      if (durationMinutes < minimumMinutes) return;
      const type = locationType === "airport" ? "operational_airport" : "possible_city";
      const place = locationType === "airport" ? left.airportIata : left.city;
      const participants = [left, right].map((presence) => ({
        id: presence.user.id,
        username: presence.user.username,
        role: presence.kind,
        event: presence.event,
        at: new Date(overlapStart).toISOString(),
        presenceStartedAt: new Date(presence.startAt).toISOString(),
        presenceEndedAt: new Date(presence.endAt).toISOString(),
        continuedIntoMatch: presence.startAt < overlapStart,
        flightNumber: presence.event.flightNumber || presence.event.legs?.[0]?.flightNumber || "",
        route: presence.event.label || "",
      }));
      const key = `${type}|${[left.user.id, right.user.id].sort().join("|")}|${[left.eventKey, right.eventKey].sort().join("|")}|${place}|${overlapStart}`;
      const candidate = {
        type,
        locationType,
        confidence: locationType === "airport" ? "operational" : "possible",
        airportIata: locationType === "airport" ? left.airportIata : null,
        airportCity: locationType === "airport" ? getAirportCity(left.airportIata) : left.city,
        city: left.city || right.city,
        startedAt: new Date(overlapStart).toISOString(),
        endedAt: new Date(overlapEnd).toISOString(),
        distanceMinutes: durationMinutes,
        participants,
        users: [left.user, right.user],
        events: [left.event, right.event],
      };
      if (!seen.has(key) || seen.get(key).distanceMinutes < durationMinutes) seen.set(key, candidate);
    }));
  };
  for (let index = 0; index < presences.length; index += 1) {
    for (let next = index + 1; next < presences.length; next += 1) {
      addMatches(presences[index].airport, presences[next].airport, "airport", 1);
      addMatches(presences[index].city, presences[next].city, "city", 180);
    }
  }
  matches.push(...seen.values());
  const freeByUser = users.map((user) => {
    const byDay = new Map();
    const daysInMonth = new Date(options.year, options.month, 0).getDate();
    for (let day = 1; day <= daysInMonth; day += 1) byDay.set(`${options.year}-${String(options.month).padStart(2, "0")}-${String(day).padStart(2, "0")}`, { programmed: false });
    user.events.forEach((event) => {
      const key = `${event.year}-${String(event.month).padStart(2, "0")}-${String(event.day).padStart(2, "0")}`;
      if (byDay.has(key) && isProgrammedActivity(event)) byDay.get(key).programmed = true;
    });
    return { user, byDay };
  });
  const freeDays = new Set(freeByUser.flatMap(({ byDay }) => [...byDay.entries()].filter(([, value]) => !value.programmed).map(([day]) => day)));
  freeDays.forEach((day) => {
    const available = freeByUser.filter(({ byDay }) => byDay.get(day) && !byDay.get(day).programmed);
    const required = options.mode === "all" ? users.length : 2;
    if (available.length < required || !available.some(({ user }) => user.id === "me")) return;
    const selected = options.mode === "all" ? available : available.filter(({ user }) => user.id === "me" || available.find(({ user: candidate }) => candidate.id !== "me")?.user.id === user.id);
    matches.push({ type: "shared_free_day", confidence: "strong", airportIata: null, airportCity: null, startedAt: `${day}T00:00:00.000Z`, endedAt: `${day}T23:59:59.999Z`, distanceMinutes: 0, participants: selected.map(({ user }) => ({ id: user.id, username: user.username, role: "free", event: null, at: `${day}T12:00:00.000Z`, flightNumber: "", route: "" })), users: selected.map(({ user }) => user), events: [] });
  });
  const result = matches.filter((match) => match.type === "shared_free_day" || options.mode !== "all" || users.every((user) => match.users.some((matchUser) => matchUser.id === user.id))).sort((a, b) => new Date(a.startedAt) - new Date(b.startedAt));
  return result;
}

function buildUserPresences(user, periodStart, periodEnd) {
  const airport = [];
  const city = [];
  const base = normalizeAirportIata(user.base);
  const baseEvent = { label: "Base", flightNumber: "", type: "base" };
  let location = base;
  let contextEvent = baseEvent;
  let cursor = periodStart;
  const events = [...(user.events || [])].sort((a, b) => eventTimestamp(a) - eventTimestamp(b));
  let cityExpiresAt = Infinity;
  const addCity = (startAt, endAt, event = contextEvent) => {
    if (!location || endAt <= startAt) return;
    const start = Math.max(startAt, periodStart);
    const end = Math.min(endAt, periodEnd, cityExpiresAt);
    if (end <= start) return;
    const cityName = getAirportCity(location) || location;
    city.push({
      kind: location === base ? "base" : "city",
      airportIata: location,
      city: cityName,
      cityKey: cityName.trim().toLocaleLowerCase("es"),
      startAt: start,
      endAt: end,
      event,
      eventKey: event.id || `${event.year}-${event.month}-${event.day}-${event.label || "event"}`,
      user,
    });
  };

  const flights = events.flatMap((event) => flightSegments(event).map((segment, index) => ({
    ...segment,
    event,
    firmaAt: index === 0 && event.firmaAt ? new Date(event.firmaAt).getTime() : null,
    eventKey: event.id || `${event.year}-${event.month}-${event.day}-${event.label || "event"}`,
  }))).filter((flight) => Number.isFinite(flight.departureAt) && Number.isFinite(flight.arrivalAt) && flight.arrivalAt > flight.departureAt).sort((a, b) => a.departureAt - b.departureAt);

  flights.forEach((flight) => {
    const origin = normalizeAirportIata(flight.originIata);
    const destination = normalizeAirportIata(flight.destinationIata);
    if (flight.arrivalAt <= periodStart) {
      if (destination) {
        location = destination;
        contextEvent = flight.event;
        cityExpiresAt = destination === base ? Infinity : flight.arrivalAt + 12 * 60 * 60 * 1000;
      }
      cursor = Math.max(cursor, flight.arrivalAt);
      return;
    }
    if (flight.departureAt >= periodEnd) return;

    if (origin) location = origin;
    const reportTime = Number.isFinite(flight.firmaAt) ? flight.firmaAt : flight.departureAt;
    addCity(cursor, reportTime);

    if (origin && flight.firmaAt !== null && flight.firmaAt < flight.departureAt) {
      const startAt = Math.max(flight.firmaAt, periodStart);
      const endAt = Math.min(flight.departureAt, periodEnd);
      if (endAt > startAt) airport.push({
        kind: "firma",
        airportIata: origin,
        startAt,
        endAt,
        event: flight.event,
        eventKey: flight.eventKey,
        user,
      });
    }

    if (destination) {
      const startAt = Math.max(flight.arrivalAt, periodStart);
      const endAt = Math.min(flight.arrivalAt + 60 * 60 * 1000, periodEnd);
      if (endAt > startAt) airport.push({
        kind: "arrival",
        airportIata: destination,
        startAt,
        endAt,
        event: flight.event,
        eventKey: flight.eventKey,
        user,
      });
    }

    cursor = Math.max(cursor, flight.arrivalAt);
    if (destination) {
      location = destination;
      contextEvent = flight.event;
      cityExpiresAt = destination === base ? Infinity : flight.arrivalAt + 12 * 60 * 60 * 1000;
    }
  });

  addCity(cursor, periodEnd);
  return { airport, city };
}

function flightSegments(event) {
  const legs = [...(event.legs || [])].sort((a, b) => a.sequence - b.sequence);
  if (legs.length) return legs.filter((leg) => leg.departureAt && leg.arrivalAt).map((leg) => ({
    originIata: leg.originIata,
    destinationIata: leg.destinationIata,
    departureAt: leg.departureAt ? new Date(leg.departureAt).getTime() : null,
    arrivalAt: leg.arrivalAt ? new Date(leg.arrivalAt).getTime() : null,
  }));
  const match = String(event.label || "").toUpperCase().replace(/\s/g, "").match(/^([A-Z]{3})-([A-Z]{3})$/);
  if (!match || !event.startsAt || !event.endsAt || !event.flightNumber) return [];
  return [{
    originIata: match[1],
    destinationIata: match[2],
    departureAt: new Date(event.startsAt).getTime(),
    arrivalAt: new Date(event.endsAt).getTime(),
  }];
}

function legacyGroupFriendMatches(matches) {
  const groups = new Map();
  matches.forEach((match) => { const key = `${match.startedAt.slice(0, 10)}|${match.airportIata || "FREE"}`; if (!groups.has(key)) groups.set(key, { key, date: match.startedAt.slice(0, 10), airportIata: match.airportIata || "LIBRE", airportCity: match.airportCity || "Día libre", matches: [] }); groups.get(key).matches.push(match); });
  const sorted = [...groups.values()].sort((a, b) => a.date.localeCompare(b.date));
  const dayIndex = (value) => {
    const [year, month, day] = value.split("-").map(Number);
    return Date.UTC(year, month - 1, day) / 86400000;
  };
  const merged = [];
  sorted.forEach((group) => {
    const previous = merged[merged.length - 1];
    const participants = group.matches[0]?.participants?.map((participant) => participant.id).sort().join(",");
    const previousParticipants = previous?.matches[0]?.participants?.map((participant) => participant.id).sort().join(",");
    const isNextDay = previous && previous.airportIata === "LIBRE" && group.airportIata === "LIBRE" && participants === previousParticipants && dayIndex(group.date) - dayIndex(previous.dateEnd || previous.date) === 1;
    if (isNextDay) {
      previous.dateEnd = group.date;
      previous.matches.push(...group.matches);
    } else {
      merged.push({ ...group, dateEnd: group.date });
    }
  });
  return merged;
}

export function groupFriendMatches(matches) {
  const groups = new Map();
  matches.forEach((match) => {
    const locationType = match.type === "shared_free_day" ? "free" : match.locationType || "airport";
    const place = locationType === "airport" ? match.airportIata : locationType === "city" ? match.city : "FREE";
    const key = `${match.startedAt.slice(0, 10)}|${locationType}|${place || "unknown"}`;
    if (!groups.has(key)) groups.set(key, {
      key,
      date: match.startedAt.slice(0, 10),
      airportIata: match.airportIata,
      airportCity: match.airportCity,
      city: match.city,
      locationType,
      matches: [],
    });
    groups.get(key).matches.push(match);
  });
  const sorted = [...groups.values()].sort((a, b) => a.date.localeCompare(b.date));
  const dayIndex = (value) => {
    const [year, month, day] = value.split("-").map(Number);
    return Date.UTC(year, month - 1, day) / 86400000;
  };
  const merged = [];
  sorted.forEach((group) => {
    const previous = merged[merged.length - 1];
    const participants = group.matches[0]?.participants?.map((person) => person.id).sort().join(",");
    const previousParticipants = previous?.matches[0]?.participants?.map((person) => person.id).sort().join(",");
    const mergeFreeDay = previous?.locationType === "free"
      && group.locationType === "free"
      && participants === previousParticipants
      && dayIndex(group.date) - dayIndex(previous.dateEnd || previous.date) === 1;
    if (mergeFreeDay) {
      previous.dateEnd = group.date;
      previous.matches.push(...group.matches);
    } else {
      merged.push({ ...group, dateEnd: group.date });
    }
  });
  return merged;
}

export function buildAirportPresence(event, eventIndex = 0, options = {}) {
  const legs = [...(event.legs || [])].sort((a, b) => a.sequence - b.sequence);
  const eventKey = event.id || `${event.year}-${event.month}-${event.day}-${event.label || "event"}-${eventIndex}`;
  const presence = (kind, airportIata, startAt, endAt, at) => ({ kind, airportIata, startAt, endAt, at, event, eventKey });
  const baseIata = normalizeAirportIata(options.baseIata);
  const dayStart = Date.UTC(event.year, event.month - 1, event.day);
  const defaultStart = event.startsAt ? new Date(event.startsAt).getTime() : dayStart;
  const defaultEnd = event.endsAt ? new Date(event.endsAt).getTime() : dayStart + 24 * 60 * 60 * 1000;
  if (!legs.length) {
    const route = String(event.label || "").toUpperCase().replace(/\s/g, "").split("-");
    const originIata = normalizeAirportIata(route[0]);
    const destinationIata = normalizeAirportIata(route[1]);
    if (!originIata || !destinationIata) {
      return baseIata ? [presence("base", baseIata, defaultStart, defaultEnd, defaultStart)] : [];
    }
    return [
      ...(event.startsAt && event.endsAt ? [presence("travel", null, new Date(event.startsAt).getTime(), new Date(event.endsAt).getTime(), new Date(event.startsAt).getTime())] : []),
      ...(event.firmaAt && event.startsAt ? [presence("firma", normalizeAirportIata(event.firmaAirportIata) || originIata, new Date(event.firmaAt).getTime(), new Date(event.startsAt).getTime(), new Date(event.firmaAt).getTime())] : event.startsAt ? [presence("departure", originIata, new Date(event.startsAt).getTime(), new Date(event.startsAt).getTime(), new Date(event.startsAt).getTime())] : []),
      ...(event.endsAt ? [presence("arrival", destinationIata, new Date(event.endsAt).getTime(), Infinity, new Date(event.endsAt).getTime())] : []),
    ];
  }
  const presences = [];
  legs.forEach((leg, index) => {
    const departure = leg.departureAt ? new Date(leg.departureAt).getTime() : null;
    const arrival = leg.arrivalAt ? new Date(leg.arrivalAt).getTime() : null;
    const originIata = normalizeAirportIata(leg.originIata) || baseIata;
    const destinationIata = normalizeAirportIata(leg.destinationIata) || baseIata;
    if (index === 0 && event.firmaAt && departure !== null && originIata) presences.push(presence("firma", originIata, new Date(event.firmaAt).getTime(), departure, new Date(event.firmaAt).getTime()));
    else if (departure !== null && originIata) presences.push(presence("departure", originIata, departure, departure, departure));
    if (arrival !== null && destinationIata) {
      const nextDeparture = legs[index + 1]?.departureAt ? new Date(legs[index + 1].departureAt).getTime() : Infinity;
      presences.push(presence(index < legs.length - 1 ? "stay" : "arrival", destinationIata, arrival, nextDeparture, arrival));
    }
    if (departure !== null && arrival !== null) presences.push(presence("travel", null, departure, arrival, departure));
  });
  return presences;
}

function normalizeAirportIata(value) {
  const normalized = String(value || "").trim().toUpperCase();
  return /^[A-Z]{3}$/.test(normalized) ? normalized : null;
}

function closeAirportStays(presences, periodEnd) {
  const departures = presences
    .filter((presence) => ["departure", "firma"].includes(presence.kind))
    .sort((a, b) => a.startAt - b.startAt);
  return presences.map((presence) => {
    if (!["arrival", "stay"].includes(presence.kind)) {
      return { ...presence, endAt: Math.min(presence.endAt, periodEnd) };
    }
    const nextDeparture = departures.find(
      (candidate) => candidate.airportIata === presence.airportIata && candidate.startAt >= presence.startAt,
    );
    return { ...presence, endAt: Math.min(nextDeparture?.startAt || periodEnd, periodEnd) };
  }).filter((presence) => presence.endAt >= presence.startAt);
}

function subtractKnownLocations(presences) {
  const known = presences
    .filter((presence) => presence.kind !== "base" && presence.startAt < presence.endAt)
    .sort((a, b) => a.startAt - b.startAt);
  return presences.flatMap((presence) => {
    if (presence.kind !== "base") return presence.airportIata ? [presence] : [];
    let fragments = [{ startAt: presence.startAt, endAt: presence.endAt }];
    known.forEach((block) => {
      fragments = fragments.flatMap((fragment) => {
        if (block.endAt <= fragment.startAt || block.startAt >= fragment.endAt) return [fragment];
        return [
          ...(fragment.startAt < block.startAt ? [{ startAt: fragment.startAt, endAt: block.startAt }] : []),
          ...(block.endAt < fragment.endAt ? [{ startAt: block.endAt, endAt: fragment.endAt }] : []),
        ];
      });
    });
    return fragments
      .filter((fragment) => fragment.endAt > fragment.startAt)
      .map((fragment) => ({ ...presence, startAt: fragment.startAt, endAt: fragment.endAt }));
  });
}

export async function saveScheduleEvents(userId, eventsByDay) {
  const rows = scheduleRows(userId, eventsByDay);
  // sustituye la programación anterior del usuario
  const { error: deleteError } = await supabase
    .from("schedule_events")
    .delete()
    .eq("user_id", userId);
  if (deleteError) throw deleteError;
  if (rows.length === 0) return;
  const { error } = await supabase.from("schedule_events").insert(rows);
  if (error) throw error;
}

export async function saveAdditionalScheduleEvents(userId, eventsByDay) {
  const rows = scheduleRows(userId, eventsByDay);
  const periods = [
    ...new Map(
      rows.map(({ month, year }) => [`${year}-${month}`, { month, year }]),
    ).values(),
  ];

  for (const { month, year } of periods) {
    const { error } = await supabase
      .from("schedule_events")
      .delete()
      .eq("user_id", userId)
      .eq("month", month)
      .eq("year", year)
      .or("source.is.null,source.eq.imported");
    if (error) throw error;
  }

  if (rows.length === 0) return;
  const { error } = await supabase.from("schedule_events").insert(rows);
  if (error) throw error;
}

export async function deleteScheduleMonth(userId, month, year) {
  const { error } = await supabase
    .from("schedule_events")
    .delete()
    .eq("user_id", userId)
    .eq("month", month)
    .eq("year", year)
    .or("source.is.null,source.eq.imported");
  if (error) throw error;
}

export async function loadSwiftairCalendarSource(userId) {
  const { data, error } = await supabase
    .from("swiftair_calendar_sources")
    .select("webcal_url")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  return data?.webcal_url || "";
}

export async function syncSwiftairSchedule(webcalUrl) {
  const { data, error } = await supabase.functions.invoke("swiftair-sync", {
    body: { webcalUrl },
  });
  if (error) {
    const errorBody = await error.context?.json?.().catch(() => null);
    throw new Error(errorBody?.error || error.message);
  }
  if (!data?.events) {
    throw new Error("La sincronización no ha devuelto una programación válida.");
  }
  return data;
}

export async function saveManualEvent(userId, event) {
  const row = scheduleRows(userId, { [event.day]: [event] })[0];
  const { data, error } = await supabase
    .from("schedule_events")
    .insert({ ...row, source: "manual", visibility: event.visibility || "private" })
    .select("*")
    .single();
  if (error) throw error;
  return {
    ...event,
    day: data.day,
    month: data.month,
    year: data.year,
    source: data.source,
    visibility: data.visibility,
  };
}

export async function deleteAccount() {
  const { data, error } = await supabase.functions.invoke("delete-account", { body: {} });
  if (error) {
    const errorBody = await error.context?.json?.().catch(() => null);
    throw new Error(errorBody?.error || error.message);
  }
  if (!data?.success) throw new Error("No se ha podido eliminar la cuenta.");
}

function scheduleRows(userId, eventsByDay) {
  return Object.entries(eventsByDay).flatMap(([day, dayEvents]) =>
    dayEvents.map((event) => ({
      user_id: userId,
      day: Number(day),
      month: event.month,
      year: event.year,
      label: event.label,
      description: event.desc,
      starts_at: event.startsAt || null,
      ends_at: event.endsAt || null,
      type: event.type,
      flight_number: event.flightNumber || null,
      situated: event.situated || false,
      firma_at: event.firmaAt || null,
      source: event.source || "imported",
      visibility: event.visibility || "private",
    })),
  );
}

function eventTimestamp(event) {
  return event.startsAt
    ? new Date(event.startsAt).getTime()
    : Date.UTC(event.year, event.month - 1, event.day);
}

export async function loadScheduleEvents(userId) {
  const { data, error } = await supabase
    .from("schedule_events")
    .select("*")
    .eq("user_id", userId);
  if (error) throw error;

  const eventsByDay = {};
  let period = null;
  data.forEach((row) => {
    if (!eventsByDay[row.day]) eventsByDay[row.day] = [];
    eventsByDay[row.day].push({
      day: row.day,
      label: row.label,
      desc: row.description,
      startsAt: row.starts_at,
      endsAt: row.ends_at,
      type: row.type,
      flightNumber: row.flight_number,
      situated: row.situated,
      firmaAt: row.firma_at,
      source: row.source || "imported",
      visibility: row.visibility || "private",
      month: row.month,
      year: row.year,
    });
    if (!period) period = { month: row.month, year: row.year };
  });
  // Las filas llegan en el orden de inserción (el ICS no es cronológico), así
  // que los eventos de cada día se ordenan por instante de inicio.
  Object.values(eventsByDay).forEach((dayEvents) =>
    dayEvents.sort((a, b) => eventTimestamp(a) - eventTimestamp(b)),
  );
  return { events: eventsByDay, period };
}
