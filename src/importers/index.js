import {
  getAirportCity,
  getAirportTimeZone,
  importIberiaSchedule,
} from "./iberiaScheduleImporter";
import { importSwiftairSchedule } from "./swiftairScheduleImporter";
import { extractCrewSchedule as importVuelingSchedule } from "./vuelingScheduleImporter";

export { getAirportCity, getAirportTimeZone };
window.getAirportCity = getAirportCity;
const scheduleImporters = {
  Iberia: importIberiaSchedule,
  Swiftair: importSwiftairSchedule,
  Vueling: importVuelingSchedule,
};

// Cómo se importa la programación de cada aerolínea. Las aerolíneas nuevas sin
// entrada usan CSV por defecto.
const scheduleImportMethods = {
  Iberia: "csv",
  Swiftair: "webcal",
  Vueling: "pdf",
};

export function getScheduleImportMethod(airline) {
  return scheduleImportMethods[airline] || "csv";
}

export function importSchedule(input, airline) {
  const importer = scheduleImporters[airline];
  if (!importer) {
    throw new Error(`No hay un importador disponible para ${airline}.`);
  }
  return importer(input);
}
