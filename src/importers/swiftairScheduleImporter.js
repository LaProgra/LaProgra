import airlinesCsv from "../../airlines.csv?raw";
import swtCodesCsv from "../../swt_codes.csv?raw";
import { getAirportCity } from "./iberiaScheduleImporter";
import { getDateInTimeZone, zonedDateTimeToUtc } from "../lib/timeZone";

function parseCsvRows(text) {
  return text
    .trim()
    .split(/\r?\n/)
    .map((line) => line.split(",").map((cell) => cell.trim()));
}

function buildSwiftairCodeMap(text) {
  const codesByIdent = new Map();

  parseCsvRows(text)
    .slice(1)
    .forEach(([ident, slab, explanation]) => {
      ident
        .toUpperCase()
        .split("/")
        .map((alias) => alias.trim().split(/\s+/)[0])
        .filter(Boolean)
        .forEach((alias) => {
          if (!codesByIdent.has(alias)) {
            codesByIdent.set(alias, { slab, explanation });
          }
        });
    });

  return codesByIdent;
}

function buildAirlineIataMap(text) {
  return new Map(
    parseCsvRows(text)
      .slice(1)
      .map(([iata, icao]) => [icao.toUpperCase(), iata.toUpperCase()]),
  );
}

const swiftairCodesByIdent = buildSwiftairCodeMap(swtCodesCsv);
const airlineIataByIcao = buildAirlineIataMap(airlinesCsv);
const REST_CODES = new Set([
  "D",
  "DH",
  "DT",
  "L",
  "LCB",
  "LN",
  "LR",
  "LT",
  "LTR",
  "LX",
  "V",
  "VB",
  "VL",
  "VN",
  "VR",
  "X",
  "XX",
]);
const RESERVE_CODES = new Set(["IM", "IMI", "N", "RE", "REI"]);
const TRAINING_CODES = new Set(["CM", "CR", "FDM", "FI", "LPC", "MP", "OL", "OPC", "SE", "SI", "SM", "TR"]);

function unfoldIcsLines(text) {
  return text.replace(/\r\n?/g, "\n").split("\n").reduce((lines, line) => {
    if (/^[ \t]/.test(line) && lines.length) {
      lines[lines.length - 1] += line.slice(1);
    } else {
      lines.push(line);
    }
    return lines;
  }, []);
}

function unescapeIcsValue(value) {
  return value
    .replace(/\\n/gi, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\");
}

function parseIcsProperty(line) {
  const separator = line.indexOf(":");
  if (separator === -1) return null;

  const [name, ...parameters] = line.slice(0, separator).split(";");
  const params = Object.fromEntries(
    parameters.map((parameter) => {
      const [key, value = ""] = parameter.split("=");
      return [key.toUpperCase(), value.replace(/^"|"$/g, "")];
    }),
  );

  return {
    name: name.toUpperCase(),
    params,
    value: unescapeIcsValue(line.slice(separator + 1)),
  };
}

function parseVEvents(text) {
  const events = [];
  let properties = null;

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

function parseIcsDateTime(property) {
  if (!property?.value) return null;
  const match = property.value.trim().match(
    /^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})?)?(Z)?$/,
  );
  if (!match) return null;

  const date = {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
  };
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
    ? new Date(
        Date.UTC(
          date.year,
          date.month - 1,
          date.day,
          Number(match[4]),
          Number(match[5]),
          Number(match[6] || 0),
        ),
      ).toISOString()
    : zonedDateTimeToUtc(date, time, property.params.TZID || "UTC");

  return { date, instant, isAllDay: false };
}

function normalizeToken(value) {
  return (value || "")
    .trim()
    .split(/\s+/)[0]
    ?.toUpperCase()
    .replace(/\.+$/, "");
}

function getActivityType(code) {
  if (REST_CODES.has(code)) return "rest";
  if (RESERVE_CODES.has(code)) return "reserve";
  if (TRAINING_CODES.has(code) || /^(CR|LPC|OL|OPC|SM)/.test(code)) {
    return "training";
  }
  return "duty";
}

function normalizeFlightNumber(value) {
  const source = value.toUpperCase();
  if (/^\d+P?$/.test(source)) return `WT${source}`;

  const icaoMatch = source.match(/^([A-Z]{3})(\d.*)$/);
  if (!icaoMatch) return source;
  return `${airlineIataByIcao.get(icaoMatch[1]) || icaoMatch[1]}${icaoMatch[2]}`;
}

function parseReportingTime(description, date) {
  const match = description.match(/reporting\s+time\s*:\s*(\d{2})(\d{2})/i);
  if (!match) return null;
  return new Date(
    Date.UTC(date.year, date.month - 1, date.day, Number(match[1]), Number(match[2])),
  ).toISOString();
}

function parseFlightLocationInterval(location) {
  const match = (location || "").match(/\((\d{2})(\d{2})Z-(\d{2})(\d{2})Z\)/);
  if (!match) return null;
  return {
    departure: { hours: Number(match[1]), minutes: Number(match[2]) },
    arrival: { hours: Number(match[3]), minutes: Number(match[4]) },
  };
}

// Anchors the (HHMMZ-HHMMZ) LOCATION interval to real UTC instants inside [periodStart, periodEnd].
function resolveFlightTimesFromLocation(interval, periodStart, periodEnd) {
  const periodStartMs = new Date(periodStart).getTime();
  const periodEndMs = new Date(periodEnd || periodStart).getTime();
  const anchor = new Date(periodStartMs);
  const anchorYear = anchor.getUTCFullYear();
  const anchorMonth = anchor.getUTCMonth();
  const anchorDay = anchor.getUTCDate();

  const buildCandidate = (dayOffset, time) =>
    Date.UTC(anchorYear, anchorMonth, anchorDay + dayOffset, time.hours, time.minutes);

  const toleranceMs = 60_000;
  let departureMs = null;
  for (let offset = -1; offset <= 2; offset += 1) {
    const candidate = buildCandidate(offset, interval.departure);
    if (candidate >= periodStartMs - toleranceMs && candidate <= periodEndMs + toleranceMs) {
      departureMs = candidate;
      break;
    }
  }
  if (departureMs === null) departureMs = buildCandidate(0, interval.departure);

  const departureDate = new Date(departureMs);
  let arrivalMs = null;
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

function classifySwiftairEvent(summary) {
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

  const flightMatch = summary.match(/^\s*((?=\S*[A-Z])(?=\S*\d)\S+)\s+([A-Z]{3})-([A-Z]{3})\b/i,);
  if (flightMatch) {
    const flightNumber = normalizeFlightNumber(flightMatch[1]);
    const origin = flightMatch[2].toUpperCase();
    const destination = flightMatch[3].toUpperCase();
    return {
      label: `${origin}-${destination}`,
      desc: `${getAirportCity(origin) || origin} - ${getAirportCity(destination) || destination}`,
      type: "duty",
      flightNumber,
      situated: !flightNumber.startsWith("WT") && !flightNumber.startsWith("QY"),
    };
  }

  return {
    label: token || "ACT",
    desc: "",
    type: "duty",
    flightNumber: "",
    situated: false,
  };
}

export function importSwiftairSchedule(text) {
  const eventsByDay = {};
  let period = null;

  parseVEvents(text).forEach((properties) => {
    const start = parseIcsDateTime(properties.DTSTART);
    const end = parseIcsDateTime(properties.DTEND);
    if (!start?.instant) return;

    const summary = properties.SUMMARY?.value.trim() || "";
    const description = properties.DESCRIPTION?.value || "";
    const classified = classifySwiftairEvent(summary);

    let flightTimes = null;
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

    const event = {
      uid: properties.UID?.value || "",
      day: start.date.day,
      month: start.date.month,
      year: start.date.year,
      startsAt: start.isAllDay ? null : flightTimes?.startsAt || start.instant,
      endsAt: start.isAllDay ? null : flightTimes?.endsAt || end?.instant || null,
      firmaAt: start.isAllDay
        ? null
        : parseReportingTime(
            description,
            getDateInTimeZone("UTC", start.instant),
          ),
      ...classified,
    };

    if (!eventsByDay[event.day]) eventsByDay[event.day] = [];
    eventsByDay[event.day].push(event);
    if (
      !period ||
      Date.UTC(event.year, event.month - 1, event.day) <
        Date.UTC(period.year, period.month - 1, period.day)
    ) {
      period = { year: event.year, month: event.month, day: event.day };
    }
  });

  return {
    events: eventsByDay,
    period: period && { month: period.month, year: period.year },
  };
}
