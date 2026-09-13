import {
  getAirportCity,
  getAirportTimeZone,
  importIberiaSchedule,
} from "./iberiaScheduleImporter";
import { importSwiftairSchedule } from "./swiftairScheduleImporter";

export { getAirportCity, getAirportTimeZone };

const scheduleImporters = {
  Iberia: importIberiaSchedule,
  Swiftair: importSwiftairSchedule,
};

export function importSchedule(text, airline) {
  const importer = scheduleImporters[airline];
  if (!importer) {
    throw new Error(`No hay un importador disponible para ${airline}.`);
  }
  return importer(text);
}
