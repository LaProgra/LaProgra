import { supabase } from "./supabaseClient";

export async function saveProfile(userId, profile) {
  const { error } = await supabase.from("profiles").upsert({
    id: userId,
    airline: profile.airline,
    base: profile.base,
    base_city: profile.baseCity,
    username: profile.username,
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
      .eq("year", year);
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
    .eq("year", year);
  if (error) throw error;
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
      time_range: event.time,
      type: event.type,
      flight_number: event.flightNumber || null,
      situated: event.situated || false,
      firma_time: event.firmaTime || null,
    })),
  );
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
      label: row.label,
      desc: row.description,
      time: row.time_range,
      type: row.type,
      flightNumber: row.flight_number,
      situated: row.situated,
      firmaTime: row.firma_time,
      month: row.month,
      year: row.year,
    });
    if (!period) period = { month: row.month, year: row.year };
  });
  return { events: eventsByDay, period };
}
