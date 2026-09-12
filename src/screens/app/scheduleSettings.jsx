import { useRef, useState } from "react";
import { Trash2, Upload } from "lucide-react";
import { importSchedule } from "../../importers";
import { Button } from "../../components/shared";

export function ScheduleSettings({
  airline,
  schedule,
  onAddSchedule,
  onDeleteSchedule,
}) {
  const [importingSchedule, setImportingSchedule] = useState(false);
  const [importError, setImportError] = useState("");
  const [importSuccess, setImportSuccess] = useState("");
  const [deleteScheduleConfirmation, setDeleteScheduleConfirmation] =
    useState(false);
  const [deletingSchedule, setDeletingSchedule] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const scheduleFileRef = useRef(null);
  const schedulePeriods = [
    ...new Map(
      Object.values(schedule)
        .flat()
        .filter((event) => event.month && event.year)
        .map((event) => [
          `${event.year}-${event.month}`,
          { month: event.month, year: event.year },
        ]),
    ).values(),
  ].sort((a, b) => b.year - a.year || b.month - a.month);
  const selectedSchedulePeriod = schedulePeriods.find(
    (period) => `${period.year}-${period.month}` === selectedPeriod,
  );
  const formatSchedulePeriod = (period) =>
    new Intl.DateTimeFormat("es-ES", {
      month: "long",
      year: "numeric",
    }).format(new Date(period.year, period.month - 1, 1));

  const importAdditionalSchedule = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImportingSchedule(true);
    setImportError("");
    setImportSuccess("");
    try {
      const parsed = importSchedule(await file.text(), airline);
      const count = Object.values(parsed.events).flat().length;
      if (!count) {
        throw new Error("No se han encontrado actividades en el archivo.");
      }
      await onAddSchedule(parsed.events, parsed.period);
      const month = parsed.period && formatSchedulePeriod(parsed.period);
      setImportSuccess(`Programación de ${month || "este periodo"} añadida.`);
    } catch (error) {
      console.error("No se pudo importar la programación", error);
      setImportError(
        error instanceof Error ? error.message : "No se pudo leer el archivo.",
      );
    } finally {
      setImportingSchedule(false);
      event.target.value = "";
    }
  };

  const deleteSelectedSchedule = async () => {
    if (!selectedSchedulePeriod) return;
    setDeletingSchedule(true);
    setImportError("");
    setImportSuccess("");
    try {
      await onDeleteSchedule(selectedSchedulePeriod);
      setImportSuccess(
        `Programación de ${formatSchedulePeriod(selectedSchedulePeriod)} eliminada.`,
      );
      setSelectedPeriod("");
      setDeleteScheduleConfirmation(false);
    } catch (error) {
      console.error("No se pudo eliminar la programación", error);
      setImportError(
        error instanceof Error
          ? error.message
          : "No se pudo eliminar la programación.",
      );
    } finally {
      setDeletingSchedule(false);
    }
  };

  return (
    <>
      <h2 className="mb-2 mt-7 px-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Programación
      </h2>
      <section className="overflow-hidden rounded-[20px] border border-black/[.06] bg-white dark:border-white/[.07] dark:bg-[#14171A]">
        <div className="flex items-center gap-4 p-5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-[#176BFF] dark:bg-blue-950/50">
            <Upload size={19} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">Añadir programación</p>
            <p className="text-xs text-slate-500">
              Importa otro CSV sin eliminar los meses anteriores.
            </p>
          </div>
          <input
            ref={scheduleFileRef}
            className="hidden"
            type="file"
            accept=".csv,text/csv"
            onChange={importAdditionalSchedule}
          />
          <Button
            onClick={() => scheduleFileRef.current?.click()}
            disabled={importingSchedule}
          >
            <Upload size={16} />
            {importingSchedule ? "Importando…" : "Subir CSV"}
          </Button>
        </div>
        {importSuccess && (
          <p className="border-t border-black/[.06] px-5 py-3 text-sm text-emerald-700 dark:border-white/[.07] dark:text-emerald-400">
            {importSuccess}
          </p>
        )}
        {importError && (
          <p className="border-t border-black/[.06] px-5 py-3 text-sm text-red-700 dark:border-white/[.07] dark:text-red-300">
            {importError}
          </p>
        )}
        {schedulePeriods.length > 0 && (
          <div className="border-t border-black/[.06] p-5 dark:border-white/[.07]">
            <p className="text-sm font-semibold">Borrar una programación</p>
            <p className="mt-1 text-xs text-slate-500">
              Elimina únicamente el mes seleccionado.
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <select
                value={selectedPeriod}
                onChange={(event) => setSelectedPeriod(event.target.value)}
                className="min-h-11 flex-1 rounded-[12px] border border-black/10 bg-white px-3 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 dark:border-white/10 dark:bg-white/[.05] dark:focus:ring-red-950"
                aria-label="Seleccionar programación que borrar"
              >
                <option value="">Selecciona un mes</option>
                {schedulePeriods.map((period) => (
                  <option
                    key={`${period.year}-${period.month}`}
                    value={`${period.year}-${period.month}`}
                  >
                    {formatSchedulePeriod(period)}
                  </option>
                ))}
              </select>
              <Button
                variant="ghost"
                onClick={() => setDeleteScheduleConfirmation(true)}
                disabled={!selectedSchedulePeriod}
                className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
              >
                <Trash2 size={16} />
                Borrar mes
              </Button>
            </div>
          </div>
        )}
      </section>
      {deleteScheduleConfirmation && selectedSchedulePeriod && (
        <>
          <button
            onClick={() => setDeleteScheduleConfirmation(false)}
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px]"
            aria-label="Cerrar confirmación"
          />
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-x-5 top-1/2 z-50 mx-auto max-w-md -translate-y-1/2 rounded-[22px] border border-black/[.08] bg-white p-6 shadow-2xl dark:border-white/[.08] dark:bg-[#181B20]"
          >
            <h2 className="text-xl font-semibold">
              ¿Borrar la programación de {formatSchedulePeriod(selectedSchedulePeriod)}?
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Esta acción no se puede deshacer.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <Button
                variant="ghost"
                onClick={() => setDeleteScheduleConfirmation(false)}
                disabled={deletingSchedule}
              >
                Cancelar
              </Button>
              <Button
                variant="danger"
                onClick={deleteSelectedSchedule}
                disabled={deletingSchedule}
              >
                {deletingSchedule ? "Eliminando…" : "Eliminar"}
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
