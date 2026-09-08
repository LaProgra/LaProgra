import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Clock3,
  LogOut,
  MapPin,
  Moon,
  Pencil,
  Plus,
  Search,
  Settings,
  Sun,
  Upload,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { getAirportCity } from "../importers";
import { activityStyles } from "../data/schedule";
import { Button, Input, LaPrograMark } from "../components/shared";

export function Slab({ event, theme, onClick, compact = false, showTime = false }) {
  const s = activityStyles[event.type];
  return (
    <button
      onClick={onClick}
      className={`w-full overflow-hidden rounded-[8px] border px-1.5 py-1 text-center transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${theme === "dark" ? s.dark : s.light}`}
    >
      <div className="truncate text-[10px] font-extrabold leading-tight tracking-wide md:text-[11px]">
        {event.label}
      </div>
      {(!compact || showTime) && (
        <div className="mt-0.5 truncate text-[9px] font-medium opacity-75 md:text-[10px]">
          {event.time}
        </div>
      )}
    </button>
  );
}

export function AppNav({ active, setActive, desktop = false }) {
  const items = [
    ["calendar", CalendarDays, "Calendario"],
    ["compare", Users, "Comparar"],
    ["settings", Settings, "Ajustes"],
  ];
  if (desktop)
    return (
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[236px] flex-col border-r border-black/[.06] bg-white px-4 py-5 dark:border-white/[.07] dark:bg-[#101216] lg:flex">
        <div className="px-2">
          <LaPrograMark />
        </div>
        <nav className="mt-10 space-y-1">
          {items.map(([id, Icon, label]) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`flex min-h-11 w-full items-center gap-3 rounded-[13px] px-3 text-sm font-semibold transition ${active === id ? "bg-blue-50 text-[#176BFF] dark:bg-blue-950/50 dark:text-blue-300" : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/[.06]"}`}
            >
              <Icon size={19} />
              {label}
            </button>
          ))}
        </nav>
        <div className="mt-auto rounded-[16px] bg-slate-50 p-3 dark:bg-white/[.04]">
          <p className="text-xs font-semibold">Horario</p>
          <p className="mt-1 text-xs text-slate-500">Madrid Â· UTC+2</p>
        </div>
      </aside>
    );
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-black/[.08] bg-white/90 px-3 pb-[max(8px,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur-xl dark:border-white/[.08] dark:bg-[#101216]/90 lg:hidden">
      <div className="mx-auto flex max-w-md justify-around">
        {items
          .filter(([id]) => id === "compare")
          .map(([id, Icon, label]) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`flex min-h-13 min-w-20 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${active === id ? "text-[#176BFF]" : "text-slate-500 dark:text-slate-400"}`}
            >
              <Icon size={21} strokeWidth={active === id ? 2.5 : 2} />
              {label}
            </button>
          ))}
      </div>
    </nav>
  );
}

export function CalendarView({ theme, schedule, showSlabTimes = false, onOpenSettings, onLogout }) {
  const [view, setView] = useState("mes");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const scheduleEvents = schedule.events || schedule;
  const schedulePeriod = schedule.period || { month: 9, year: 2026 };
  const monthDate = new Date(schedulePeriod.year, schedulePeriod.month - 1, 1);
  const monthLabel = new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  })
    .format(monthDate)
    .replace(" de ", " ");
  const monthShortLabel = new Intl.DateTimeFormat("es-ES", { month: "short" })
    .format(monthDate)
    .replace(".", "")
    .toUpperCase();
  const firstWeekday = (monthDate.getDay() + 6) % 7;
  const daysInMonth = new Date(
    schedulePeriod.year,
    schedulePeriod.month,
    0,
  ).getDate();
  const monthDays = Array.from(
    { length: Math.ceil((firstWeekday + daysInMonth) / 7) * 7 },
    (_, index) => {
      const day = index - firstWeekday + 1;
      return day > 0 && day <= daysInMonth ? day : null;
    },
  );
  const weekdays = ["L", "M", "X", "J", "V", "S", "D"];
  const fullWeekdays = ["Lun", "Mar", "MiÃ©", "Jue", "Vie", "SÃ¡b", "Dom"];
  return (
    <div className="mx-auto max-w-[1500px] px-3 pb-24 pt-3 sm:px-5 lg:px-7 lg:pb-8 lg:pt-5">
      <header className="flex min-h-12 items-center justify-between gap-3">
        <div className="lg:hidden">
          <LaPrograMark compact />
        </div>
        <div className="hidden lg:block">
          <h1 className="text-2xl font-semibold tracking-[-0.03em]">
            Calendario
          </h1>
          <p className="text-sm text-slate-500">
            Tu programaciÃ³n de un vistazo
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSearch(!search)}
            className="grid h-10 w-10 place-items-center rounded-full text-slate-600 hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-300 dark:hover:bg-white/[.07]"
            aria-label="Buscar"
          >
            <Search size={19} />
          </button>
          <div className="relative ml-1">
            <button
              onClick={() => setProfileMenu(!profileMenu)}
              className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 text-xs font-bold text-white"
              aria-label="Abrir menÃº de usuario"
              aria-expanded={profileMenu}
            >
              PL
            </button>
            {profileMenu && (
              <div className="absolute right-0 top-11 z-30 min-w-44 overflow-hidden rounded-[14px] border border-black/[.08] bg-white p-1 shadow-lg dark:border-white/[.1] dark:bg-[#181B20]">
                <button
                  onClick={() => {
                    setProfileMenu(false);
                    onOpenSettings();
                  }}
                  className="flex min-h-10 w-full items-center rounded-[10px] px-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/[.08]"
                >
                  <Settings size={16} className="mr-2" />
                  Ajustes
                </button>
                <button
                  onClick={() => {
                    setProfileMenu(false);
                    onLogout();
                  }}
                  className="flex min-h-10 w-full items-center rounded-[10px] px-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                >
                  <LogOut size={16} className="mr-2" />
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <AnimatePresence>
        {search && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 flex items-center gap-2 rounded-[14px] border border-black/10 bg-white px-3 dark:border-white/10 dark:bg-white/[.05]">
              <Search size={17} className="text-slate-400" />
              <input
                autoFocus
                className="min-h-11 flex-1 bg-transparent text-sm outline-none"
                placeholder="Buscar una actividadâ€¦"
              />
              <button
                onClick={() => setSearch(false)}
                aria-label="Cerrar búsqueda"
              >
                <X size={17} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-3 sm:mt-7">
        <div>
          <div className="flex items-center gap-0">
            <button
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/[.07]"
              aria-label="Mes anterior"
            >
              <ChevronLeft size={19} />
            </button>
            <h2 className="min-w-0 px-1 text-center text-xl font-semibold capitalize tracking-[-0.025em] sm:text-2xl">
              {monthLabel}
            </h2>
            <button
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/[.07]"
              aria-label="Mes siguiente"
            >
              <ChevronRight size={19} />
            </button>
          </div>
          <p className="ml-10 mt-0.5 text-xs text-slate-500">
            Horario local de Madrid
          </p>
        </div>
        <div className="flex rounded-[12px] bg-slate-200/70 p-1 dark:bg-white/[.07]">
          {["mes", "agenda"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`min-h-8 rounded-[9px] px-3 text-xs font-semibold capitalize transition ${view === v ? "bg-white text-slate-950 shadow-sm dark:bg-white/15 dark:text-white" : "text-slate-500"}`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      {view === "mes" ? (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 overflow-hidden rounded-[18px] border border-black/[.07] bg-white shadow-sm dark:border-white/[.08] dark:bg-[#14171A] sm:rounded-[22px]"
        >
          <div className="grid grid-cols-7 border-b border-black/[.06] dark:border-white/[.07]">
            {weekdays.map((d, i) => (
              <div
                key={i}
                className={`py-2.5 text-center text-[11px] font-semibold ${i > 4 ? "text-slate-400" : "text-slate-500"}`}
              >
                <span className="sm:hidden">{d}</span>
                <span className="hidden sm:inline">{fullWeekdays[i]}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {monthDays.map((day, i) => (
              <div
                key={i}
                className={`relative min-h-[82px] border-b border-r border-black/[.055] p-1 dark:border-white/[.06] sm:min-h-[116px] sm:p-1.5 lg:min-h-[132px] ${i % 7 === 6 ? "border-r-0" : ""} ${i >= monthDays.length - 7 ? "border-b-0" : ""} ${day === 3 ? "bg-blue-50/40 dark:bg-blue-950/10" : ""}`}
              >
                {day && (
                  <>
                    <div
                      className={`mb-1 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold sm:text-xs ${day === 3 ? "bg-[#176BFF] text-white" : "text-slate-600 dark:text-slate-300"}`}
                    >
                      {day}
                    </div>
                    <div className="space-y-1">
                      {(scheduleEvents[day] || []).map((event, idx) => (
                        <Slab
                          key={idx}
                          event={event}
                          theme={theme}
                          compact
                          showTime={showSlabTimes}
                          onClick={() => setSelected({ ...event, day })}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </motion.section>
      ) : (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 space-y-2"
        >
          {Object.entries(scheduleEvents).map(([day, dayEvents]) => (
            <div
              key={day}
              className="flex gap-3 rounded-[16px] border border-black/[.06] bg-white p-3 dark:border-white/[.07] dark:bg-[#14171A]"
            >
              <div className="w-10 shrink-0 text-center">
                <span className="block text-[10px] font-semibold uppercase text-slate-400">
                  {monthShortLabel}
                </span>
                <span className="text-xl font-semibold">{day}</span>
              </div>
              <div className="flex-1 space-y-2">
                {dayEvents.map((e, i) => (
                  <Slab
                    key={i}
                    event={e}
                    theme={theme}
                    compact
                    showTime={showSlabTimes}
                    onClick={() => setSelected({ ...e, day })}
                  />
                ))}
              </div>
            </div>
          ))}
        </motion.section>
      )}
      {selected && (
        <>
          <motion.button
            aria-label="Cerrar detalle"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
          />
          <motion.aside
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-[28px] bg-white p-5 pb-[max(24px,env(safe-area-inset-bottom))] shadow-2xl dark:bg-[#181B20] sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[380px] sm:rounded-[24px]"
          >
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-slate-200 dark:bg-white/15 sm:hidden" />
            <div className="flex items-start justify-between">
              <div>
                <div className="flex flex-wrap gap-2">
                  <div
                    className={`inline-flex rounded-lg px-2 py-1 text-xs font-bold ${theme === "dark" ? activityStyles[selected.type].dark : activityStyles[selected.type].light}`}
                  >
                    {selected.flightNumber || selected.label}
                  </div>
                  {selected.situated && (
                    <div className="inline-flex rounded-lg bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700 dark:bg-white/[.1] dark:text-slate-200">
                      Situado
                    </div>
                  )}
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                  {selected.desc}
                </h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 dark:bg-white/[.07]"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <Clock3 size={18} className="text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">
                    Horario local de Madrid
                  </p>
                  <p className="text-sm font-semibold">{selected.time}</p>
                </div>
              </div>
              {selected.firmaTime && (
                <div className="flex items-center gap-3">
                  <Pencil size={18} className="text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Firma</p>
                    <p className="text-sm font-semibold">
                      {selected.firmaTime}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </div>
  );
}

export function CompareView({ onBack }) {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-8 lg:px-8 lg:pb-8">
      <button
        onClick={onBack}
        className="mb-6 grid h-10 w-10 place-items-center rounded-full text-slate-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/[.07]"
        aria-label="Volver al calendario"
      >
        <ArrowLeft size={20} />
      </button>
      <h1 className="text-3xl font-semibold tracking-[-0.04em]">Comparar</h1>
      <p className="mt-2 text-slate-500">
        Encuentra coincidencias con tus amistades.
      </p>
      <div className="mt-10 flex min-h-[360px] flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-white px-6 text-center dark:border-white/15 dark:bg-[#14171A]">
        <div className="grid h-14 w-14 place-items-center rounded-[18px] bg-blue-50 text-[#176BFF] dark:bg-blue-950/50">
          <Users size={25} />
        </div>
        <h2 className="mt-5 text-lg font-semibold">
          Todavía no has añadido a ninguna amistad.
        </h2>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-500">
          Cuando conectes con alguien, podrás ver aquí vuestros días y
          actividades coincidentes.
        </p>
        <Button className="mt-6">
          <Plus size={17} />
          Añadir amistad
        </Button>
      </div>
    </div>
  );
}

export function SettingsView({
  theme,
  setTheme,
  profile,
  setProfile,
  showSlabTimes,
  setShowSlabTimes,
  onLogout,
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
    const nextValue = !showSlabTimes;
    setShowSlabTimes(nextValue);
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
                {profile.airline} Â· {profile.baseCity || profile.base} (
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
                onChange={(e) =>
                  setUsername(e.target.value.replace(/\s/g, "").toLowerCase())
                }
              />
              <Input
                label="Base"
                icon={MapPin}
                value={base}
                maxLength={3}
                onChange={(e) =>
                  setBase(e.target.value.toUpperCase().replace(/[^A-Z]/g, ""))
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
            {["light", "dark"].map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`grid h-8 w-9 place-items-center rounded-[7px] ${theme === t ? "bg-white shadow-sm dark:bg-white/15" : "text-slate-400"}`}
                aria-label={t === "light" ? "Modo claro" : "Modo oscuro"}
              >
                {t === "light" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="mt-7 overflow-hidden rounded-[20px] border border-black/[.06] bg-white dark:border-white/[.07] dark:bg-[#14171A]">
        <div className="flex items-center gap-4 p-5">
          <div className="flex-1"><p className="text-sm font-semibold">Horarios en los slabs</p><p className="text-xs text-slate-500">Muestra la hora dentro de cada actividad del calendario</p></div>
          <button type="button" role="switch" aria-checked={showSlabTimes} onClick={toggleSlabTimes} className={`relative h-7 w-12 rounded-full transition ${showSlabTimes ? "bg-[#176BFF]" : "bg-slate-200 dark:bg-white/[.15]"}`} aria-label="Mostrar horarios en los slabs"><span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${showSlabTimes ? "left-6" : "left-1"}`} /></button>
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
