import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders as supabaseCorsHeaders } from "npm:@supabase/supabase-js@2/cors";

type DateParts = { year: number; month: number; day: number };

type CalendarEvent = {
  uid: string;
  day: number;
  month: number;
  year: number;
  label: string;
  desc: string;
  startsAt: string | null;
  endsAt: string | null;
  firmaAt: string | null;
  type: "duty" | "rest" | "reserve" | "training";
  flightNumber: string;
  situated: boolean;
};

type IcsProperty = {
  params: Record<string, string>;
  value: string;
};

type CalendarSource = {
  user_id: string;
  webcal_url: string;
};

type SyncedEventReference = {
  schedule_event_id: string;
  starts_at: string | null;
  day: number;
  month: number;
  year: number;
};

const MAX_CALENDAR_BYTES = 5 * 1024 * 1024;
const MAX_REDIRECTS = 3;
const REST_CODES = new Set([
  "D", "DH", "DT", "L", "LCB", "LN", "LR", "LT", "LTR", "LX", "V",
  "VB", "VL", "VN", "VR", "X", "XX",
]);
const RESERVE_CODES = new Set(["IM", "IMI", "N", "RE", "REI"]);
const TRAINING_CODES = new Set([
  "CM", "CR", "FDM", "FI", "LPC", "MP", "OL", "OPC", "SE", "SI", "SM", "TR",
]);

const appOrigins = (Deno.env.get("APP_ORIGIN") || "*")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

function resolveAllowedOrigin(request: Request) {
  if (appOrigins.includes("*")) return "*";
  const origin = request.headers.get("origin") || "";
  return appOrigins.includes(origin) ? origin : appOrigins[0] || "";
}

function corsHeadersFor(request: Request) {
  return {
    ...supabaseCorsHeaders,
    "Access-Control-Allow-Origin": resolveAllowedOrigin(request),
    Vary: "Origin",
  };
}

function responseJson(body: unknown, status = 200, headers: HeadersInit = supabaseCorsHeaders) {
  return Response.json(body, { status, headers });
}

function getPublishableKey() {
  const keys = Deno.env.get("SUPABASE_PUBLISHABLE_KEYS");
  if (keys) return JSON.parse(keys).default as string;
  return Deno.env.get("SUPABASE_ANON_KEY") || "";
}

function getSecretKey() {
  const keys = Deno.env.get("SUPABASE_SECRET_KEYS");
  if (keys) return JSON.parse(keys).default as string;
  return Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
}

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const admin = createClient(supabaseUrl, getSecretKey(), {
  auth: { autoRefreshToken: false, persistSession: false },
});

function parseCsvRows(text: string) {
  return text
    .trim()
    .split(/\r?\n/)
    .map((line) => line.split(",").map((cell) => cell.trim()));
}

async function loadStaticData() {
  const [airlines, swiftairCodes] = await Promise.all([
    Deno.readTextFile(new URL("./data/airlines.csv", import.meta.url)),
    Deno.readTextFile(new URL("./data/swt_codes.csv", import.meta.url)),
  ]);

  const airlineIataByIcao = new Map(
    parseCsvRows(airlines)
      .slice(1)
      .map(([iata, icao]) => [icao.toUpperCase(), iata.toUpperCase()]),
  );
  const swiftairCodesByIdent = new Map<string, { slab: string; explanation: string }>();

  parseCsvRows(swiftairCodes)
    .slice(1)
    .forEach(([ident, slab, explanation]) => {
      ident
        .toUpperCase()
        .split("/")
        .map((alias) => alias.trim().split(/\s+/)[0])
        .filter(Boolean)
        .forEach((alias) => {
          if (!swiftairCodesByIdent.has(alias)) {
            swiftairCodesByIdent.set(alias, { slab, explanation });
          }
        });
    });

  return { airlineIataByIcao, swiftairCodesByIdent };
}

const { airlineIataByIcao, swiftairCodesByIdent } = await loadStaticData();

function getTimeZoneOffset(date: Date, timeZone: string) {
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

function zonedDateTimeToUtc(date: DateParts, time: string, timeZone: string) {
  const match = time.match(/^(\d{2}):(\d{2})(?::(\d{2}))?$/);
  if (!match) return null;
  const localTimestamp = Date.UTC(
    date.year,
    date.month - 1,
    date.day,
    Number(match[1]),
    Number(match[2]),
    Number(match[3] || 0),
  );
  let timestamp = localTimestamp - getTimeZoneOffset(new Date(localTimestamp), timeZone);
  timestamp = localTimestamp - getTimeZoneOffset(new Date(timestamp), timeZone);
  return new Date(timestamp).toISOString();
}

function getDateInUtc(instant: string): DateParts {
  const date = new Date(instant);
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  };
}

function unfoldIcsLines(text: string) {
  return text.replace(/\r\n?/g, "\n").split("\n").reduce<string[]>((lines, line) => {
    if (/^[ \t]/.test(line) && lines.length) {
      lines[lines.length - 1] += line.slice(1);
    } else {
      lines.push(line);
    }
    return lines;
  }, []);
}

function unescapeIcsValue(value: string) {
  return value
    .replace(/\\n/gi, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\");
}

function parseIcsProperty(line: string) {
  const separator = line.indexOf(":");
  if (separator === -1) return null;

  const [name, ...parameters] = line.slice(0, separator).split(";");
  return {
    name: name.toUpperCase(),
    params: Object.fromEntries(
      parameters.map((parameter) => {
        const [key, value = ""] = parameter.split("=");
        return [key.toUpperCase(), value.replace(/^"|"$/g, "")];
      }),
    ),
    value: unescapeIcsValue(line.slice(separator + 1)),
  };
}

function parseVEvents(text: string) {
  const events: Record<string, IcsProperty>[] = [];
  let properties: Record<string, IcsProperty> | null = null;

  unfoldIcsLines(text).forEach((line) => {
    if (line === "BEGIN:VEVENT") {
      properties = {};
      return;
    }
    if (line === "END:VEVENT") {
      if (properties) events.push(properties);
      properties = null;
      return;
    }
    if (!properties) return;

    const property = parseIcsProperty(line);
    if (property && ["UID", "DTSTART", "DTEND", "SUMMARY", "DESCRIPTION", "LOCATION"].includes(property.name)) {
      properties[property.name] = property;
    }
  });

  return events;
}

function parseIcsDateTime(property?: IcsProperty) {
  if (!property?.value) return null;
  const match = property.value.trim().match(
    /^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})?)?(Z)?$/,
  );
  if (!match) return null;

  const date = { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) };
  const isAllDay = property.params.VALUE === "DATE" || !match[4];
  if (isAllDay) {
    return {
      date,
      instant: new Date(Date.UTC(date.year, date.month - 1, date.day)).toISOString(),
      isAllDay: true,
    };
  }

  const time = `${match[4]}:${match[5]}:${match[6] || "00"}`;
  const instant = match[7]
    ? new Date(Date.UTC(date.year, date.month - 1, date.day, Number(match[4]), Number(match[5]), Number(match[6] || 0))).toISOString()
    : zonedDateTimeToUtc(date, time, property.params.TZID || "UTC");

  return { date, instant, isAllDay: false };
}

function normalizeToken(value: string) {
  return value.trim().split(/\s+/)[0]?.toUpperCase().replace(/\.+$/, "") || "";
}

function getActivityType(code: string): CalendarEvent["type"] {
  if (REST_CODES.has(code)) return "rest";
  if (RESERVE_CODES.has(code)) return "reserve";
  if (TRAINING_CODES.has(code) || /^(CR|LPC|OL|OPC|SM)/.test(code)) return "training";
  return "duty";
}

function normalizeFlightNumber(value: string) {
  const source = value.toUpperCase();
  if (/^\d+P?$/.test(source)) return `WT${source}`;
  const icaoMatch = source.match(/^([A-Z]{3})(\d.*)$/);
  if (!icaoMatch) return source;
  return `${airlineIataByIcao.get(icaoMatch[1]) || icaoMatch[1]}${icaoMatch[2]}`;
}

function parseReportingTime(description: string, date: DateParts) {
  const match = description.match(/reporting\s+time\s*:\s*(\d{2})(\d{2})/i);
  if (!match) return null;
  return new Date(Date.UTC(date.year, date.month - 1, date.day, Number(match[1]), Number(match[2]))).toISOString();
}

type FlightLocationInterval = {
  departure: { hours: number; minutes: number };
  arrival: { hours: number; minutes: number };
};

function parseFlightLocationInterval(location?: string): FlightLocationInterval | null {
  const match = (location || "").match(/\((\d{2})(\d{2})Z-(\d{2})(\d{2})Z\)/);
  if (!match) return null;
  return {
    departure: { hours: Number(match[1]), minutes: Number(match[2]) },
    arrival: { hours: Number(match[3]), minutes: Number(match[4]) },
  };
}

// Anchors the (HHMMZ-HHMMZ) LOCATION interval to real UTC instants inside [periodStart, periodEnd].
function resolveFlightTimesFromLocation(
  interval: FlightLocationInterval,
  periodStart: string,
  periodEnd: string,
) {
  const periodStartMs = new Date(periodStart).getTime();
  const periodEndMs = new Date(periodEnd || periodStart).getTime();
  const anchor = new Date(periodStartMs);
  const anchorYear = anchor.getUTCFullYear();
  const anchorMonth = anchor.getUTCMonth();
  const anchorDay = anchor.getUTCDate();

  const buildCandidate = (dayOffset: number, time: { hours: number; minutes: number }) =>
    Date.UTC(anchorYear, anchorMonth, anchorDay + dayOffset, time.hours, time.minutes);

  const toleranceMs = 60_000;
  let departureMs: number | null = null;
  for (let offset = -1; offset <= 2; offset += 1) {
    const candidate = buildCandidate(offset, interval.departure);
    if (candidate >= periodStartMs - toleranceMs && candidate <= periodEndMs + toleranceMs) {
      departureMs = candidate;
      break;
    }
  }
  if (departureMs === null) departureMs = buildCandidate(0, interval.departure);

  const departureDate = new Date(departureMs);
  let arrivalMs: number | null = null;
  for (let offset = 0; offset <= 2; offset += 1) {
    const candidate = Date.UTC(
      departureDate.getUTCFullYear(),
      departureDate.getUTCMonth(),
      departureDate.getUTCDate() + offset,
      interval.arrival.hours,
      interval.arrival.minutes,
    );
    if (candidate >= departureMs) {
      arrivalMs = candidate;
      break;
    }
  }
  if (arrivalMs === null) arrivalMs = departureMs;

  return {
    startsAt: new Date(departureMs).toISOString(),
    endsAt: new Date(arrivalMs).toISOString(),
  };
}

function classifySwiftairEvent(summary: string) {
  const token = normalizeToken(summary);
  const activity = swiftairCodesByIdent.get(token);
  if (activity) {
    return {
      label: activity.slab,
      desc: activity.explanation,
      type: getActivityType(token),
      flightNumber: "",
      situated: false,
    };
  }

  const flightMatch = summary.match(/^\s*(\S+)\s+([A-Z]{3})-([A-Z]{3})\b/i);
  if (flightMatch) {
    const flightNumber = normalizeFlightNumber(flightMatch[1]);
    const origin = flightMatch[2].toUpperCase();
    const destination = flightMatch[3].toUpperCase();
    return {
      label: `${origin}-${destination}`,
      desc: `${origin} - ${destination}`,
      type: "duty" as const,
      flightNumber,
      situated: !flightNumber.startsWith("WT") && !flightNumber.startsWith("QY"),
    };
  }

  return { label: token || "ACT", desc: "", type: "duty" as const, flightNumber: "", situated: false };
}

function parseSwiftairCalendar(text: string) {
  return parseVEvents(text).flatMap((properties): CalendarEvent[] => {
    const start = parseIcsDateTime(properties.DTSTART);
    const end = parseIcsDateTime(properties.DTEND);
    if (!start?.instant) return [];

    const summary = properties.SUMMARY?.value.trim() || "";
    const description = properties.DESCRIPTION?.value || "";
    const classified = classifySwiftairEvent(summary);

    let flightTimes: { startsAt: string; endsAt: string } | null = null;
    if (!start.isAllDay && classified.flightNumber) {
      const interval = parseFlightLocationInterval(properties.LOCATION?.value);
      if (interval) {
        flightTimes = resolveFlightTimesFromLocation(
          interval,
          start.instant,
          end?.instant || start.instant,
        );
      }
    }

    return [{
      uid: properties.UID?.value || "",
      day: start.date.day,
      month: start.date.month,
      year: start.date.year,
      startsAt: start.isAllDay ? null : flightTimes?.startsAt || start.instant,
      endsAt: start.isAllDay ? null : flightTimes?.endsAt || end?.instant || null,
      firmaAt: start.isAllDay ? null : parseReportingTime(description, getDateInUtc(start.instant)),
      ...classified,
    }];
  });
}

function eventTimestamp(event: Pick<CalendarEvent, "startsAt" | "year" | "month" | "day">) {
  return event.startsAt
    ? new Date(event.startsAt).getTime()
    : Date.UTC(event.year, event.month - 1, event.day);
}

function filterRecentEvents(events: CalendarEvent[], now: Date) {
  const firstDayOfPreviousMonth = Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1);
  return events.filter((event) => eventTimestamp(event) >= firstDayOfPreviousMonth);
}

function buildSchedule(events: CalendarEvent[]) {
  const eventsByDay: Record<string, CalendarEvent[]> = {};
  let period: { month: number; year: number } | null = null;

  events
    .slice()
    .sort((a, b) => eventTimestamp(a) - eventTimestamp(b))
    .forEach((event) => {
      if (!eventsByDay[event.day]) eventsByDay[event.day] = [];
      eventsByDay[event.day].push(event);
      if (!period) period = { month: event.month, year: event.year };
    });

  return { events: eventsByDay, period };
}

function asScheduleRows(userId: string, events: CalendarEvent[]) {
  return events.map((event) => ({
    user_id: userId,
    day: event.day,
    month: event.month,
    year: event.year,
    label: event.label,
    description: event.desc,
    starts_at: event.startsAt,
    ends_at: event.endsAt,
    type: event.type,
    flight_number: event.flightNumber || null,
    situated: event.situated,
    firma_at: event.firmaAt,
  }));
}

function scheduleEventKey(event: Pick<CalendarEvent, "startsAt" | "year" | "month" | "day" | "label" | "flightNumber">) {
  return `${eventTimestamp(event)}|${event.label}|${event.flightNumber}`;
}

function constantTimeEquals(value: string | null, expected: string | undefined) {
  if (!value || !expected || value.length !== expected.length) return false;
  let difference = 0;
  for (let index = 0; index < value.length; index += 1) {
    difference |= value.charCodeAt(index) ^ expected.charCodeAt(index);
  }
  return difference === 0;
}

function allowedCalendarHosts() {
  return (Deno.env.get("SWIFTAIR_WEBCAL_ALLOWED_HOSTS") || "icloud.com")
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);
}

function normalizeCalendarUrl(value: string) {
  const url = new URL(value.trim());
  if (url.protocol === "webcal:" || url.protocol === "webcals:") url.protocol = "https:";
  if (url.protocol !== "https:" || url.username || url.password) {
    throw new Error("El enlace debe ser webcal o HTTPS y no puede incluir credenciales.");
  }
  const hostname = url.hostname.toLowerCase();
  if (!allowedCalendarHosts().some((host) => hostname === host || hostname.endsWith(`.${host}`))) {
    throw new Error("El proveedor del calendario no está autorizado.");
  }
  return url;
}

async function downloadCalendar(rawUrl: string) {
  let url = normalizeCalendarUrl(rawUrl);
  for (let redirect = 0; redirect <= MAX_REDIRECTS; redirect += 1) {
    const response = await fetch(url, {
      redirect: "manual",
      headers: { Accept: "text/calendar, text/plain;q=0.9" },
      signal: AbortSignal.timeout(20_000),
    });
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get("location");
      if (!location || redirect === MAX_REDIRECTS) throw new Error("Demasiadas redirecciones al descargar el calendario.");
      url = normalizeCalendarUrl(new URL(location, url).toString());
      continue;
    }
    if (!response.ok) throw new Error("No se ha podido descargar el calendario de Swiftair.");
    const contentLength = Number(response.headers.get("content-length") || 0);
    if (contentLength > MAX_CALENDAR_BYTES) throw new Error("El calendario supera el tamaño permitido.");

    const text = await response.text();
    if (new TextEncoder().encode(text).length > MAX_CALENDAR_BYTES || !text.includes("BEGIN:VCALENDAR")) {
      throw new Error("La respuesta no contiene un calendario ICS válido.");
    }
    return { text, normalizedUrl: url.toString() };
  }
  throw new Error("No se ha podido descargar el calendario de Swiftair.");
}

async function getUserId(request: Request) {
  const token = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token || !supabaseUrl || !getPublishableKey()) return null;
  const client = createClient(supabaseUrl, getPublishableKey(), {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data, error } = await client.auth.getUser(token);
  return error ? null : data.user?.id || null;
}

async function syncCalendar(userId: string, rawUrl: string, saveSource: boolean) {
  const { data: knownSource, error: sourceError } = await admin
    .from("swiftair_calendar_sources")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();
  if (sourceError) throw sourceError;

  const { text, normalizedUrl } = await downloadCalendar(rawUrl);
  const now = new Date();
  const recentEvents = filterRecentEvents(parseSwiftairCalendar(text), now);
  if (!recentEvents.length) throw new Error("No se han encontrado actividades posteriores al primer día del mes anterior.");

  if (saveSource) {
    const { error } = await admin.from("swiftair_calendar_sources").upsert({
      user_id: userId,
      webcal_url: normalizedUrl,
      updated_at: now.toISOString(),
    });
    if (error) throw error;
  }

  const { data: syncedEventReferences, error: syncedEventsError } = await admin
    .from("swiftair_synced_events")
    .select("schedule_event_id, starts_at, day, month, year")
    .eq("user_id", userId);
  if (syncedEventsError) throw syncedEventsError;

  // Reemplazo completo: se borran todos los eventos importados desde el enlace
  // y se cargan los nuevos desde cero. Los eventos añadidos por otros medios
  // (sin referencia en swiftair_synced_events) no se tocan. Las referencias se
  // limpian en cascada al borrar los eventos.
  const idsToDelete = ((syncedEventReferences || []) as SyncedEventReference[])
    .map((event) => event.schedule_event_id);
  if (idsToDelete.length) {
    const { error } = await admin.from("schedule_events").delete().in("id", idsToDelete);
    if (error) throw error;
  }

  const eventsToInsert = recentEvents;
  if (eventsToInsert.length) {
    const { data: insertedEvents, error } = await admin
      .from("schedule_events")
      .insert(asScheduleRows(userId, eventsToInsert))
      .select("id");
    if (error) throw error;

    const { error: referenceError } = await admin
      .from("swiftair_synced_events")
      .insert(
        (insertedEvents || []).map((event, index) => ({
          schedule_event_id: event.id,
          user_id: userId,
          uid: eventsToInsert[index].uid || scheduleEventKey(eventsToInsert[index]),
          starts_at: eventsToInsert[index].startsAt,
          day: eventsToInsert[index].day,
          month: eventsToInsert[index].month,
          year: eventsToInsert[index].year,
        })),
      );
    if (referenceError) {
      await admin
        .from("schedule_events")
        .delete()
        .in("id", (insertedEvents || []).map((event) => event.id));
      throw referenceError;
    }
  }

  return { ...buildSchedule(recentEvents), syncedEvents: eventsToInsert.length };
}

async function runCronSync() {
  const { data: sources, error } = await admin
    .from("swiftair_calendar_sources")
    .select("user_id, webcal_url");
  if (error) throw error;

  let syncedSources = 0;
  const failures: string[] = [];
  for (const source of (sources || []) as CalendarSource[]) {
    try {
      await syncCalendar(source.user_id, source.webcal_url, false);
      syncedSources += 1;
    } catch (syncError) {
      console.error("No se pudo sincronizar una programación Swiftair", {
        userId: source.user_id,
        message: syncError instanceof Error ? syncError.message : "Error desconocido",
      });
      failures.push(source.user_id);
    }
  }
  return { syncedSources, failedSources: failures.length };
}

Deno.serve(async (request) => {
  const corsHeaders = corsHeadersFor(request);
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return responseJson({ error: "Método no permitido." }, 405, corsHeaders);

  try {
    const body = await request.json().catch(() => ({})) as { mode?: string; webcalUrl?: string };
    if (body.mode === "cron") {
      if (!constantTimeEquals(request.headers.get("x-swiftair-cron-secret"), Deno.env.get("SWIFTAIR_CRON_SECRET"))) {
        return responseJson({ error: "No autorizado." }, 401, corsHeaders);
      }
      return responseJson(await runCronSync(), 200, corsHeaders);
    }

    const userId = await getUserId(request);
    if (!userId) return responseJson({ error: "Sesión no válida." }, 401, corsHeaders);
    if (!body.webcalUrl || typeof body.webcalUrl !== "string") {
      return responseJson({ error: "Falta el enlace webcal." }, 400, corsHeaders);
    }
    return responseJson(await syncCalendar(userId, body.webcalUrl, true), 200, corsHeaders);
  } catch (error) {
    console.error("Error al sincronizar Swiftair", error instanceof Error ? error.message : error);
    return responseJson({
      error: error instanceof Error ? error.message : "No se ha podido sincronizar el calendario.",
    }, 502, corsHeaders);
  }
});
