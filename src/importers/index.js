import { getAirportCity, importIberiaSchedule } from "./iberiaScheduleImporter";

export { getAirportCity };

const scheduleImporters = {
  Iberia: importIberiaSchedule,
};

export function importSchedule(text, airline) {
  const importer = scheduleImporters[airline];
  if (!importer) {
    throw new Error(`No hay un importador disponible para ${airline}.`);
  }
  return importer(text);
}
