import { useState } from "react";
import {
  ArrowLeft,
  CircleAlert,
  MapPin,
  Moon,
  Sun,
  UserRound,
} from "lucide-react";
import { getAirportCity } from "../../importers";
import { Button, Input } from "../../components/shared";
import { ScheduleSettings } from "./scheduleSettings";

export function SettingsView({
  theme,
  setTheme,
  profile,
  setProfile,
  showSlabTimes,
  setShowSlabTimes,
  schedule,
  onAddSchedule,
  onDeleteSchedule,
  onBack,
}) {
  const [editing, setEditing] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [username, setUsername] = useState(profile.username);
  const [base, setBase] = useState(profile.base);

  const save = () => {
    if (!username.trim() || base.trim().length !== 3) return;
    const normalized = base.trim().toUpperCase();
    setProfile({
      ...profile,
      username: username.trim().toLowerCase(),
      base: normalized,
      baseCity: getAirportCity(normalized),
    });
    setEditing(false);
  };

  const toggleSlabTimes = () => {
    setShowSlabTimes(!showSlabTimes);
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
              PL
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
                disabled={!username.trim() || base.length !== 3}
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
            <p className="text-xs text-slate-500">
              Elige cómo se muestra la interfaz
            </p>
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
      <ScheduleSettings
        airline={profile.airline}
        schedule={schedule}
        onAddSchedule={onAddSchedule}
        onDeleteSchedule={onDeleteSchedule}
      />
      <section className="mt-7 overflow-hidden rounded-[20px] border border-black/[.06] bg-white dark:border-white/[.07] dark:bg-[#14171A]">
        <div className="flex items-center gap-4 p-5">
          <div className="flex-1">
            <p className="text-sm font-semibold">Horarios en los slabs</p>
            <p className="text-xs text-slate-500">
              Muestra la hora dentro de cada actividad del calendario
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={showSlabTimes}
            onClick={toggleSlabTimes}
            className={`relative h-7 w-12 rounded-full transition ${showSlabTimes ? "bg-[#176BFF]" : "bg-slate-200 dark:bg-white/[.15]"}`}
            aria-label="Mostrar horarios en los slabs"
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${showSlabTimes ? "left-6" : "left-1"}`}
            />
          </button>
        </div>
      </section>
      <Button
        variant="ghost"
        onClick={() => setDeleteConfirmation(true)}
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
            <div className="mt-6 flex justify-end gap-2">
              <Button
                variant="ghost"
                onClick={() => setDeleteConfirmation(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="danger"
                onClick={() => setDeleteConfirmation(false)}
              >
                Aceptar
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
