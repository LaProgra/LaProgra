import { useState } from "react";
import {
  ArrowLeft,
  Check,
  CircleAlert,
  MapPin,
  Moon,
  Sun,
  UserRound,
} from "lucide-react";
import { getAirportCity } from "../../importers";
import { Button, Input } from "../../components/shared";
import { hashPublicPin, saveProfile } from "../../lib/scheduleService";
import { ScheduleSettings } from "./scheduleSettings";
import { TimeZoneSelector } from "./appNav";

export function SettingsView({
  theme,
  setTheme,
  profile,
  setProfile,
  schedule,
  onAddSchedule,
  onDeleteSchedule,
  onSyncSchedule,
  userId,
  timeZonePreference,
  onTimeZoneChange,
  baseIata,
  showRestDayEvents,
  onToggleShowRestDayEvents,
  includeManualEventsInPdf,
  onToggleIncludeManualEventsInPdf,
  onDeleteAccount,
  onBack,
}) {
  const [editing, setEditing] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [username, setUsername] = useState(profile.username);
  const [base, setBase] = useState(profile.base);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [publicPin, setPublicPin] = useState("");
  const [publicError, setPublicError] = useState("");
  const restDayToggleLabel = "¿Mostrar días libres?";

  const save = async () => {
    if (!username.trim() || base.trim().length !== 3) return;
    const normalized = base.trim().toUpperCase();
    const nextProfile = {
      ...profile,
      username: username.trim().toLowerCase(),
      base: normalized,
      baseCity: getAirportCity(normalized),
    };
    try {
      if (userId) await saveProfile(userId, nextProfile);
      setProfile(nextProfile);
      setPublicError("");
    } catch (error) {
      setPublicError(error.message);
      return;
    }
    setEditing(false);
  };

  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-8 lg:px-8 lg:pb-8">
      <button
        onClick={onBack}
        className="mb-6 grid h-10 w-10 place-items-center rounded-full text-slate-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/[.07]"
        aria-label="Volver al calendario"
      >
        <ArrowLeft size={20} />
      </button>
      <h1 className="text-3xl font-semibold tracking-[-0.04em]">Ajustes</h1>
      <p className="mt-2 text-slate-500">
        Personaliza tu experiencia en LaProgra.
      </p>
      <section className="mt-8 overflow-hidden rounded-[20px] border border-black/[.06] bg-white dark:border-white/[.07] dark:bg-[#14171A]">
        {!editing ? (
          <div className="flex items-center gap-4 p-5">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 font-bold text-white">
              {profile.username.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">@{profile.username}</p>
              <p className="text-sm text-slate-500">
                {profile.airline} · {profile.baseCity || profile.base} (
                {profile.base})
              </p>
            </div>
            <Button variant="ghost" onClick={() => setEditing(true)}>
              Editar
            </Button>
          </div>
        ) : (
          <div className="space-y-4 p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Nombre de usuario"
                icon={UserRound}
                value={username}
                onChange={(event) =>
                  setUsername(
                    event.target.value.replace(/\s/g, "").toLowerCase(),
                  )
                }
              />
              <Input
                label="Base"
                icon={MapPin}
                value={base}
                maxLength={3}
                onChange={(event) =>
                  setBase(
                    event.target.value.toUpperCase().replace(/[^A-Z]/g, ""),
                  )
                }
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setEditing(false)}>
                Cancelar
              </Button>
              <Button
                onClick={save}
                disabled={!/^[a-z0-9_-]{3,30}$/.test(username.trim()) || base.length !== 3}
              >
                Guardar
              </Button>
            </div>
          </div>
        )}
      </section>
      <h2 className="mb-2 mt-7 px-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Apariencia
      </h2>
      <section className="overflow-hidden rounded-[20px] border border-black/[.06] bg-white dark:border-white/[.07] dark:bg-[#14171A]">
        <div className="flex items-center gap-4 p-5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 dark:bg-white/[.07]">
            {theme === "dark" ? <Moon size={19} /> : <Sun size={19} />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Modo de color</p>
          </div>
          <div className="flex rounded-[10px] bg-slate-100 p-1 dark:bg-white/[.06]">
            {["light", "dark"].map((colorTheme) => (
              <button
                key={colorTheme}
                onClick={() => setTheme(colorTheme)}
                className={`grid h-8 w-9 place-items-center rounded-[7px] ${theme === colorTheme ? "bg-white shadow-sm dark:bg-white/15" : "text-slate-400"}`}
                aria-label={
                  colorTheme === "light" ? "Modo claro" : "Modo oscuro"
                }
              >
                {colorTheme === "light" ? (
                  <Sun size={15} />
                ) : (
                  <Moon size={15} />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>
      <h2 className="mb-2 mt-7 px-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Uso horario
      </h2>
      <section className="overflow-hidden rounded-[20px] border border-black/[.06] bg-white p-3 dark:border-white/[.07] dark:bg-[#14171A]">
        <TimeZoneSelector
          timeZonePreference={timeZonePreference}
          baseIata={baseIata}
          onTimeZoneChange={onTimeZoneChange}
        />
      </section>
      <h2 className="mb-2 mt-7 px-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Preferencias
      </h2>
      <section className="overflow-hidden rounded-[20px] border border-black/[.06] bg-white dark:border-white/[.07] dark:bg-[#14171A]">
        <div className="flex items-center gap-4 p-5">
          <div className="flex-1">
            <p className="text-sm font-semibold">{restDayToggleLabel}</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={showRestDayEvents}
            aria-label={restDayToggleLabel}
            onClick={() => onToggleShowRestDayEvents(!showRestDayEvents)}
            className={`flex h-7 w-12 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#14171A] ${showRestDayEvents ? "bg-blue-600" : "bg-slate-200 dark:bg-white/10"}`}
          >
            <span
              className={`grid h-6 w-6 place-items-center rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,.25)] transition-transform duration-200 ease-out ${showRestDayEvents ? "translate-x-5" : "translate-x-0"}`}
            >
              <Check
                size={13}
                strokeWidth={3}
                className={`text-blue-600 transition-opacity duration-150 ${showRestDayEvents ? "opacity-100" : "opacity-0"}`}
              />
            </span>
          </button>
        </div>
        <div className="flex items-center gap-4 border-t border-black/[.06] p-5 dark:border-white/[.07]">
          <div className="flex-1"><p className="text-sm font-semibold">Incluir eventos manuales en el PDF</p></div>
          <button type="button" role="switch" aria-checked={includeManualEventsInPdf} onClick={() => onToggleIncludeManualEventsInPdf(!includeManualEventsInPdf)} className={`flex h-7 w-12 shrink-0 items-center rounded-full p-0.5 ${includeManualEventsInPdf ? "bg-blue-600" : "bg-slate-200 dark:bg-white/10"}`}>
            <span className={`grid h-6 w-6 place-items-center rounded-full bg-white shadow transition-transform ${includeManualEventsInPdf ? "translate-x-5" : ""}`}><Check size={13} className={includeManualEventsInPdf ? "text-blue-600" : "opacity-0"} /></span>
          </button>
        </div>
      </section>
      <h2 className="mb-2 mt-7 px-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Calendario público</h2>
      <section className="overflow-hidden rounded-[20px] border border-black/[.06] bg-white dark:border-white/[.07] dark:bg-[#14171A]">
        <div className="space-y-3 p-5">
          <p className="text-sm text-slate-500">Comparte una versión de solo lectura mediante <span className="font-semibold">/{profile.username}</span>.</p>
          {profile.publicCalendarEnabled && <p className="break-all text-xs text-blue-600">{window.location.origin}/{profile.username}</p>}
          <label className="flex items-center justify-between gap-4 text-sm font-semibold">Activar enlace público
            <input type="checkbox" checked={profile.publicCalendarEnabled === true} onChange={async (event) => { const enabled = event.target.checked; const next = { ...profile, publicCalendarEnabled: enabled }; setProfile(next); try { await saveProfile(userId, next); } catch (error) { setPublicError(error.message); } }} />
          </label>
          <div className="flex gap-2">
            <input inputMode="numeric" maxLength={4} value={publicPin} onChange={(event) => setPublicPin(event.target.value.replace(/\\D/g, ""))} placeholder={profile.publicCalendarPinHash ? "Cambiar PIN" : "PIN de 4 dígitos"} className="min-h-11 flex-1 rounded-[12px] border border-black/10 bg-transparent px-3 dark:border-white/10" />
            <Button disabled={publicPin.length !== 4} onClick={async () => { try { const next = { ...profile, publicCalendarPinHash: await hashPublicPin(publicPin), publicCalendarEnabled: true }; await saveProfile(userId, next); setProfile(next); setPublicPin(""); setPublicError(""); } catch (error) { setPublicError(error.message); } }}>Guardar PIN</Button>
          </div>
          {publicError && <p className="text-sm text-red-600">{publicError}</p>}
        </div>
      </section>
      <ScheduleSettings
        airline={profile.airline}
        schedule={schedule}
        onAddSchedule={onAddSchedule}
        onDeleteSchedule={onDeleteSchedule}
        onSyncSchedule={onSyncSchedule}
        userId={userId}
      />
      <Button
        variant="ghost"
        onClick={() => {
          setDeleteError("");
          setDeleteConfirmation(true);
        }}
        disabled={deleting}
        className="mt-8 w-full text-red-600 dark:text-red-400"
      >
        <CircleAlert size={17} />
        Eliminar cuenta
      </Button>
      {deleteConfirmation && (
        <>
          <button
            onClick={() => setDeleteConfirmation(false)}
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px]"
            aria-label="Cerrar confirmación"
          />
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-x-5 top-1/2 z-50 mx-auto max-w-md -translate-y-1/2 rounded-[22px] border border-black/[.08] bg-white p-6 shadow-2xl dark:border-white/[.08] dark:bg-[#181B20]"
          >
            <h2 className="text-xl font-semibold">
              ¿Estás seguro de eliminar tu cuenta en LaProgra?
            </h2>
            {deleteError && (
              <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">
                {deleteError}
              </p>
            )}
            <div className="mt-6 flex justify-end gap-2">
              <Button
                variant="ghost"
                onClick={() => setDeleteConfirmation(false)}
                disabled={deleting}
              >
                Cancelar
              </Button>
              <Button
                variant="danger"
                disabled={deleting}
                onClick={async () => {
                  setDeleting(true);
                  setDeleteError("");
                  try {
                    await onDeleteAccount();
                    setDeleteConfirmation(false);
                  } catch (error) {
                    setDeleteError(error.message || "No se ha podido eliminar la cuenta.");
                  } finally {
                    setDeleting(false);
                  }
                }}
              >
                {deleting ? "Eliminando..." : "Aceptar"}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
