import { useEffect, useRef, useState } from "react";
import { Link2, RefreshCw, Trash2, Upload } from "lucide-react";
import { getScheduleImportMethod, importSchedule } from "../../importers";
import { loadSwiftairCalendarSource } from "../../lib/scheduleService";
import { Button, Input } from "../../components/shared";

function maskCalendarUrl(url) {
  try {
    const parsed = new URL(url.replace(/^webcals?/i, "https"));
    return `webcal://${parsed.host}/••••••••`;
  } catch {
    return "webcal://••••••••";
  }
}

export function ScheduleSettings({
  airline,
  schedule,
  onAddSchedule,
  onDeleteSchedule,
  onSyncSchedule,
  userId,
}) {
  const [importingSchedule, setImportingSchedule] = useState(false);
  const [importError, setImportError] = useState("");
  const [importSuccess, setImportSuccess] = useState("");
  const [deleteScheduleConfirmation, setDeleteScheduleConfirmation] =
    useState(false);
  const [deletingSchedule, setDeletingSchedule] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [storedUrl, setStoredUrl] = useState("");
  const [webcalUrl, setWebcalUrl] = useState("");
  const [loadingSource, setLoadingSource] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [reimportModalOpen, setReimportModalOpen] = useState(false);
  const [reimportDecision, setReimportDecision] = useState(null);
  const [newWebcalUrl, setNewWebcalUrl] = useState("");
  const [currentUrlModalOpen, setCurrentUrlModalOpen] = useState(false);
  const scheduleFileRef = useRef(null);
  const importMethod = getScheduleImportMethod(airline);
  const isWebcal = importMethod === "webcal";

  useEffect(() => {
    if (!isWebcal || !userId) return;
    setLoadingSource(true);
    setStoredUrl("");
    setWebcalUrl("");
    loadSwiftairCalendarSource(userId)
      .then(setStoredUrl)
      .catch((error) => {
        console.error("No se pudo cargar el enlace del calendario", error);
        setImportError("No se pudo cargar el enlace guardado.");
      })
      .finally(() => setLoadingSource(false));
  }, [isWebcal, userId]);

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

  const reimportSchedule = async (overrideUrl) => {
    const effectiveUrl = (overrideUrl || webcalUrl || storedUrl || "").trim();
    if (!effectiveUrl || !onSyncSchedule) {
      if (!storedUrl) {
        setImportError("No hay un enlace guardado para reimportar.");
      }
      return;
    }
    setSyncing(true);
    setImportError("");
    setImportSuccess("");
    try {
      const result = await onSyncSchedule(effectiveUrl);
      if (overrideUrl && overrideUrl.trim()) {
        setStoredUrl(overrideUrl.trim());
        setWebcalUrl("");
      }
      setImportSuccess(
        result?.syncedEvents > 0
          ? `Programación reimportada · ${result.syncedEvents} ${result.syncedEvents === 1 ? "actividad cargada" : "actividades cargadas"}.`
          : "Programación reimportada.",
      );
    } catch (error) {
      console.error("No se pudo reimportar la programación", error);
      setImportError(
        error instanceof Error
          ? error.message
          : "No se pudo sincronizar el calendario.",
      );
    } finally {
      setSyncing(false);
    }
  };

  const closeReimportModal = () => {
    setReimportModalOpen(false);
    setReimportDecision(null);
    setNewWebcalUrl("");
  };

  const handleReimportCurrent = async () => {
    closeReimportModal();
    if (!storedUrl) {
      setImportError("No hay un enlace guardado para reimportar.");
      return;
    }
    await reimportSchedule(storedUrl);
  };

  const handleReimportNew = async () => {
    const nextUrl = newWebcalUrl.trim().replace(/^webcal/i, "https");
    if (!nextUrl) {
      setImportError("Pega el enlace nuevo antes de importar.");
      return;
    }
    closeReimportModal();
    await reimportSchedule(nextUrl);
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
        {isWebcal ? (
          <div className="flex items-center gap-4 p-5">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-[#176BFF] dark:bg-blue-950/50">
              <Link2 size={19} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Enlace webcal</p>
              <p className="text-xs text-slate-500">
                Tu programación se sincroniza automáticamente desde el
                <button
                  type="button"
                  onClick={() => setCurrentUrlModalOpen(true)}
                  className="ml-1 inline-flex items-center font-semibold text-blue-600 underline decoration-2 underline-offset-2 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                enlace
                </button>
                <span> proporcionado.</span>
              </p>
            </div>
            <Button
              onClick={() => setReimportModalOpen(true)}
              disabled={loadingSource || syncing}
            >
              <RefreshCw size={16} className={syncing ? "animate-spin" : ""} />
              {syncing ? "Reimportando…" : "Reimportar"}
            </Button>
          </div>
        ) : (
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
        )}
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
        {!isWebcal && schedulePeriods.length > 0 && (
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
      {reimportModalOpen && (
        <>
          <button
            onClick={closeReimportModal}
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px]"
            aria-label="Cerrar diálogo de reimportación"
          />
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-x-5 top-1/2 z-50 mx-auto w-full max-w-md -translate-y-1/2 rounded-[22px] border border-black/[.08] bg-white p-6 shadow-2xl dark:border-white/[.08] dark:bg-[#181B20]"
          >
            {!reimportDecision ? (
              <>
                <h2 className="text-xl font-semibold">
                  ¿Quieres pegar un nuevo enlace?
                </h2>
                <div className="mt-6 flex justify-end gap-2">
                  <Button variant="ghost" onClick={handleReimportCurrent}>
                    No, reimportar actual
                  </Button>
                  <Button onClick={() => setReimportDecision("new")}>Sí</Button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold">
                  Pega el nuevo enlace
                </h2>
                <div className="mt-4">
                  <Input
                    aria-label="Nuevo enlace webcal"
                    icon={Link2}
                    type="url"
                    value={newWebcalUrl}
                    onChange={(event) => setNewWebcalUrl(event.target.value.trim().replace(/^webcal/i, "https"))}
                    placeholder="webcal://…"
                    disabled={syncing}
                  />
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <Button variant="ghost" onClick={closeReimportModal}>
                    Cancelar
                  </Button>
                  <Button onClick={handleReimportNew} disabled={syncing || !newWebcalUrl.trim()}>
                    Importar eventos del nuevo enlace
                  </Button>
                </div>
              </>
            )}
          </div>
        </>
      )}
      {currentUrlModalOpen && (
        <>
          <button
            onClick={() => setCurrentUrlModalOpen(false)}
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px]"
            aria-label="Cerrar enlace actual"
          />
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-x-5 top-1/2 z-50 mx-auto w-full max-w-lg -translate-y-1/2 rounded-[22px] border border-black/[.08] bg-white p-6 shadow-2xl dark:border-white/[.08] dark:bg-[#181B20]"
          >
            <h2 className="text-xl font-semibold">Enlace actual utilizado</h2>
            <p className="mt-4 break-all rounded-[14px] border border-black/[.08] bg-slate-50 p-3 text-sm text-slate-700 dark:border-white/[.08] dark:bg-white/[.04] dark:text-slate-200">
              {storedUrl || "Todavía no hay un enlace guardado."}
            </p>
            <div className="mt-6 flex justify-end">
              <Button variant="ghost" onClick={() => setCurrentUrlModalOpen(false)}>
                Cerrar
              </Button>
            </div>
          </div>
        </>
      )}
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
