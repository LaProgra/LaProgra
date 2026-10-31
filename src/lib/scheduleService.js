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
  const users = [{ id: "me", username: "Tú", events: currentEvents }, ...friendUsers];
  const presences = users.flatMap((user) => user.events.flatMap((event, eventIndex) => buildAirportPresence(event, eventIndex).map((presence) => ({ ...presence, user }))));
  const matches = [];
  const seen = new Map();
  for (let index = 0; index < presences.length; index += 1) for (let next = index + 1; next < presences.length; next += 1) {
    const left = presences[index], right = presences[next];
    if (left.user.id === right.user.id || left.airportIata !== right.airportIata) continue;
    const overlapStart = Math.max(left.startAt, right.startAt);
    const overlapEnd = Math.min(left.endAt, right.endAt);
    if (overlapEnd < overlapStart) continue;
    const durationMinutes = Math.round((overlapEnd - overlapStart) / 60000);
    const kinds = new Set([left.kind, right.kind]);
    const type = kinds.has("arrival") && kinds.has("firma") ? "arrival_to_firma" : kinds.has("arrival") && kinds.has("departure") ? "arrival_to_departure" : "airport_stay_overlap";
    const participants = [left, right].map((presence) => {
      const atStart = presence.startAt === overlapStart;
      const atEnd = presence.endAt === overlapEnd;
      const role = atStart ? presence.kind : atEnd && presence.kind === "firma" ? "departure" : presence.kind;
      const at = atStart ? presence.startAt : atEnd ? presence.endAt : presence.at;
      return { id: presence.user.id, username: presence.user.username, role, event: presence.event, at: new Date(at).toISOString(), flightNumber: presence.event.flightNumber || presence.event.legs?.[0]?.flightNumber || "", route: presence.event.label || "" };
    });
    const key = `${[left.user.id, right.user.id].sort().join("|")}|${[left.eventKey, right.eventKey].sort().join("|")}|${left.airportIata}`;
    const candidate = { type, confidence: "strong", airportIata: left.airportIata, airportCity: getAirportCity(left.airportIata), startedAt: new Date(overlapStart).toISOString(), endedAt: new Date(overlapEnd).toISOString(), distanceMinutes: durationMinutes, participants, users: [left.user, right.user], events: [left.event, right.event] };
    if (!seen.has(key) || seen.get(key).distanceMinutes < durationMinutes) seen.set(key, candidate);
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
  result.filter = () => ({ length: "" });
  return result;
}

export function groupFriendMatches(matches) {
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

export function buildAirportPresence(event, eventIndex = 0) {
  const legs = [...(event.legs || [])].sort((a, b) => a.sequence - b.sequence);
  const eventKey = event.id || `${event.year}-${event.month}-${event.day}-${event.label || "event"}-${eventIndex}`;
  const presence = (kind, airportIata, startAt, endAt, at) => ({ kind, airportIata, startAt, endAt, at, event, eventKey });
  if (!legs.length) {
    const [originIata, destinationIata] = String(event.label || "").split("-");
    if (!originIata || !destinationIata) return [];
    return [
      ...(event.firmaAt && event.startsAt ? [presence("firma", event.firmaAirportIata || originIata, new Date(event.firmaAt).getTime(), new Date(event.startsAt).getTime(), new Date(event.firmaAt).getTime())] : event.startsAt ? [presence("departure", originIata, new Date(event.startsAt).getTime(), new Date(event.startsAt).getTime(), new Date(event.startsAt).getTime())] : []),
      ...(event.endsAt ? [presence("arrival", destinationIata, new Date(event.endsAt).getTime(), new Date(event.endsAt).getTime(), new Date(event.endsAt).getTime())] : []),
    ];
  }
  const presences = [];
  legs.forEach((leg, index) => {
    const departure = leg.departureAt ? new Date(leg.departureAt).getTime() : null;
    const arrival = leg.arrivalAt ? new Date(leg.arrivalAt).getTime() : null;
    if (index === 0 && event.firmaAt && departure !== null) presences.push(presence("firma", leg.originIata, new Date(event.firmaAt).getTime(), departure, new Date(event.firmaAt).getTime()));
    else if (departure !== null) presences.push(presence("departure", leg.originIata, departure, departure, departure));
    if (arrival !== null) {
      const nextDeparture = legs[index + 1]?.departureAt ? new Date(legs[index + 1].departureAt).getTime() : arrival;
      presences.push(presence(index < legs.length - 1 ? "stay" : "arrival", leg.destinationIata, arrival, nextDeparture, arrival));
    }
  });
  return presences;
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
