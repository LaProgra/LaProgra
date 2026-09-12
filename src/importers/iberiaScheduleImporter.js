import airportsCsv from "../../airports.csv?raw";
import { zonedDateTimeToUtc } from "../lib/timeZone";

const IBERIA_SCHEDULE_TIME_ZONE = "Europe/Madrid";

function parseCsvRows(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const character = text[i];
    if (character === '"' && text[i + 1] === '"' && quoted) {
      cell += '"';
      i += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      row.push(cell.trim());
      cell = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && text[i + 1] === "\n") i += 1;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += character;
    }
  }

  row.push(cell.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function buildAirportCityMap(text) {
  const rows = parseCsvRows(text);
  const cityByIata = new Map();

  rows.slice(1).forEach(row => {
    const iata = (row[0] || "").trim().toUpperCase();
    const city = (row[1] || "").trim();
    if (iata && city) cityByIata.set(iata, city);
  });

  return cityByIata;
}

const airportCityByIata = buildAirportCityMap(airportsCsv);

function buildAirportTimeZoneMap(text) {
  const rows = parseCsvRows(text);
  const timeZoneByIata = new Map();

  rows.slice(1).forEach((row) => {
    const iata = (row[0] || "").trim().toUpperCase();
    const timeZone = (row[2] || "").trim();
    if (iata && timeZone) timeZoneByIata.set(iata, timeZone);
  });

  return timeZoneByIata;
}

const airportTimeZoneByIata = buildAirportTimeZoneMap(airportsCsv);

export function getAirportCity(iata) {
  return airportCityByIata.get(iata.trim().toUpperCase()) || "";
}

export function getAirportTimeZone(iata) {
  return airportTimeZoneByIata.get(iata.trim().toUpperCase()) || "";
}

function parseDate(value) {
  const match = value.match(/^(?:(\d{4})[-/]((?:0?[1-9])|(?:1[0-2]))[-/](\d{1,2})|(\d{1,2})[-/]((?:0?[1-9])|(?:1[0-2]))[-/](\d{4}))/);
  if (!match) return null;
  return {
    year: Number(match[1] || match[6]),
    month: Number(match[2] || match[5]),
    day: Number(match[3] || match[4]),
  };
}

function splitActivitySubject(subject) {
  const separatorIndex = subject.search(/-|:/);
  if (separatorIndex === -1) {
    return { label: (subject || "ACT").slice(0, 8).toUpperCase(), description: subject || "ACT" };
  }

  return {
    label: subject.slice(0, separatorIndex).trim().toUpperCase(),
    description: subject.slice(separatorIndex + 1),
  };
}

function nextDay(date) {
  const next = new Date(Date.UTC(date.year, date.month - 1, date.day + 1));
  return {
    year: next.getUTCFullYear(),
    month: next.getUTCMonth() + 1,
    day: next.getUTCDate(),
  };
}

export function importIberiaSchedule(text) {
  const rows = parseCsvRows(text);
  if (rows.length < 2) return { events: {}, period: null };

  const importedEvents = {};
  let firstPeriod = null;
  let pendingFirma = { at: null };

  rows.slice(1).forEach(row => {
    const subject = (row[0] || "").trim();
    const startDate = (row[1] || "").trim();
    const start = (row[2] || "").trim();
    const endDate = (row[3] || "").trim();
    const end = (row[4] || "").trim();
    const date = parseDate(startDate);
    if (!date) return;
    let endDateParts = parseDate(endDate) || date;
    const startsAt = zonedDateTimeToUtc(
      date,
      start,
      IBERIA_SCHEDULE_TIME_ZONE,
    );
    let endsAt = zonedDateTimeToUtc(
      endDateParts,
      end,
      IBERIA_SCHEDULE_TIME_ZONE,
    );
    if (startsAt && endsAt && new Date(endsAt) <= new Date(startsAt)) {
      endDateParts = nextDay(endDateParts);
      endsAt = zonedDateTimeToUtc(
        endDateParts,
        end,
        IBERIA_SCHEDULE_TIME_ZONE,
      );
    }

    const routeMatch = subject.match(/([A-Z]{2,3})(\d{3,4})\s+([A-Z]{3})\d{4}-([A-Z]{3})\d{4}/i);
    const activitySubject = splitActivitySubject(subject);
    const label = routeMatch ? `${routeMatch[3].toUpperCase()}-${routeMatch[4].toUpperCase()}` : activitySubject.label;
    const flightNumber = routeMatch ? `${routeMatch[1].toUpperCase()}${routeMatch[2]}` : "";
    const lowerSubject = subject.toLowerCase();
    const type = lowerSubject.includes("libre") || lowerSubject.includes("rest") ? "rest" : lowerSubject.includes("reserva") || lowerSubject.includes("reserve") ? "reserve" : lowerSubject.includes("form") || lowerSubject.includes("train") || lowerSubject.includes("alumno") ? "training" : "duty";

    if (lowerSubject.includes("firma")) {
      const firmaAt = zonedDateTimeToUtc(
        date,
        start,
        IBERIA_SCHEDULE_TIME_ZONE,
      );
      pendingFirma = {
        at: firmaAt,
      };
    }

    const routeCities = routeMatch
      ? `${getAirportCity(routeMatch[3]) || routeMatch[3].toUpperCase()} - ${getAirportCity(routeMatch[4]) || routeMatch[4].toUpperCase()}`
      : "";
    const description = routeMatch ? routeCities : activitySubject.description;

    if (!lowerSubject.includes("firma")) {
      if (!importedEvents[date.day]) importedEvents[date.day] = [];
      importedEvents[date.day].push({ day: date.day, label, desc: description, flightNumber, situated: flightNumber.startsWith("VS"), firmaAt: pendingFirma.at, startsAt, endsAt, type, month: date.month, year: date.year });
      pendingFirma = { at: null };
    }
    if (!firstPeriod) firstPeriod = { month: date.month, year: date.year };
  });

  return { events: importedEvents, period: firstPeriod };
}
