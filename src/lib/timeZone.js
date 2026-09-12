const DEFAULT_TIME_ZONE = "Europe/Madrid";

function parseTime(value) {
  const match = String(value || "").match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  if (!match) return null;

  const hour = Number(match[1]);
  const minute = Number(match[2]);
  const second = Number(match[3] || 0);
  if (hour > 23 || minute > 59 || second > 59) return null;
  return { hour, minute, second };
}

function getTimeZoneOffset(date, timeZone) {
  const offset = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
  })
    .formatToParts(date)
    .find((part) => part.type === "timeZoneName")?.value;
  const match = offset?.match(/(?:GMT|UTC)([+-])(\d{1,2})(?::?(\d{2}))?/);
  if (!match) return 0;

  const sign = match[1] === "+" ? 1 : -1;
  return sign * (Number(match[2]) * 60 + Number(match[3] || 0)) * 60_000;
}

export function normalizeTimeZone(timeZone) {
  if (!timeZone) return DEFAULT_TIME_ZONE;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone }).format();
    return timeZone;
  } catch {
    return DEFAULT_TIME_ZONE;
  }
}

export function getDisplayTimeZone(preference, baseTimeZone) {
  if (preference === "UTC") return "UTC";
  if (preference && preference !== "base") return normalizeTimeZone(preference);
  return normalizeTimeZone(baseTimeZone || DEFAULT_TIME_ZONE);
}

export function zonedDateTimeToUtc(date, time, timeZone) {
  const timeParts = parseTime(time);
  if (!date || !timeParts) return null;

  const zone = normalizeTimeZone(timeZone);
  const localTimestamp = Date.UTC(
    date.year,
    date.month - 1,
    date.day,
    timeParts.hour,
    timeParts.minute,
    timeParts.second,
  );
  let timestamp = localTimestamp - getTimeZoneOffset(new Date(localTimestamp), zone);
  timestamp = localTimestamp - getTimeZoneOffset(new Date(timestamp), zone);
  return new Date(timestamp).toISOString();
}

export function formatEventTime(instant, timeZone) {
  if (!instant) return "";
  return new Intl.DateTimeFormat("es-ES", {
    timeZone: normalizeTimeZone(timeZone),
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date(instant));
}

export function formatEventTimeRange(event, timeZone) {
  if (!event?.startsAt) return event?.time || "Todo el día";
  const start = formatEventTime(event.startsAt, timeZone);
  const end = event.endsAt ? formatEventTime(event.endsAt, timeZone) : "";
  return end ? `${start} - ${end}` : start;
}

export function getEventDayIndicator(event, timeZone) {
  if (!event?.startsAt || !event?.endsAt) return "";

  const startDate = getEventDisplayDate(event, timeZone);
  const endDate = getEventDisplayDate({ startsAt: event.endsAt }, timeZone);
  const crossedDays = Math.round(
    (Date.UTC(endDate.year, endDate.month - 1, endDate.day) -
      Date.UTC(startDate.year, startDate.month - 1, startDate.day)) /
      86_400_000,
  );
  return crossedDays > 0 ? `+${crossedDays}D` : "";
}

export function formatFirmaTime(event, timeZone) {
  if (event?.firmaAt) return formatEventTime(event.firmaAt, timeZone);
  return event?.firmaTime || "";
}

export function getEventDisplayDate(event, timeZone) {
  if (!event?.startsAt) {
    return { day: event?.day, month: event?.month, year: event?.year };
  }

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: normalizeTimeZone(timeZone),
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(new Date(event.startsAt));
  const valueFor = (type) => Number(parts.find((part) => part.type === type)?.value);
  return {
    day: valueFor("day"),
    month: valueFor("month"),
    year: valueFor("year"),
  };
}
