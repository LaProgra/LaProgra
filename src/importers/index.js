import {
  getAirportCity,
  getAirportTimeZone,
  importIberiaSchedule,
} from "./iberiaScheduleImporter";
import { importSwiftairSchedule } from "./swiftairScheduleImporter";

export { getAirportCity, getAirportTimeZone };
window.getAirportCity = getAirportCity;
const scheduleImporters = {
  Iberia: importIberiaSchedule,
  Swiftair: importSwiftairSchedule,
};

// Cómo se importa la programación de cada aerolínea. Las aerolíneas nuevas sin
// entrada usan CSV por defecto.
const scheduleImportMethods = {
  Iberia: "csv",
  Swiftair: "webcal",
};

export function getScheduleImportMethod(airline) {
  return scheduleImportMethods[airline] || "csv";
}

export function importSchedule(text, airline) {
  const importer = scheduleImporters[airline];
  if (!importer) {
    throw new Error(`No hay un importador disponible para ${airline}.`);
  }
  return importer(text);
}
