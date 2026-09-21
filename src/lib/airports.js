import airportsCsv from "../../airports.csv?raw";

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

const airportRows = parseCsvRows(airportsCsv).slice(1);
const airportCityByIata = new Map();
const airportTimeZoneByIata = new Map();

airportRows.forEach((row) => {
  const iata = (row[0] || "").trim().toUpperCase();
  if (!iata) return;

  const city = (row[1] || "").trim();
  const timeZone = (row[2] || "").trim();
  if (city) airportCityByIata.set(iata, city);
  if (timeZone) airportTimeZoneByIata.set(iata, timeZone);
});

export function getAirportCity(iata) {
  return airportCityByIata.get(iata.trim().toUpperCase()) || "";
}

export function getAirportTimeZone(iata) {
  return airportTimeZoneByIata.get(iata.trim().toUpperCase()) || "";
}
