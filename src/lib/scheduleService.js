import { supabase } from "./supabaseClient";

export async function saveProfile(userId, profile) {
  const { error } = await supabase.from("profiles").upsert({
    id: userId,
    airline: profile.airline,
    base: profile.base,
    base_city: profile.baseCity,
    username: profile.username,
    display_time_zone: profile.displayTimeZone || "base",
  });
  if (error) throw error;
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
