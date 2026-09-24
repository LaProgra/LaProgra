import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  LogOut,
  Pencil,
  Plus,
  Settings,
  X,
} from "lucide-react";
import airlinesCsv from "../../../airlines.csv?raw";
import { activityStyles } from "../../data/activityStyles";
import { LaPrograMark } from "../../components/shared";
import {
  getEventDayIndicator,
  getDateInTimeZone,
  formatEventTimeRange,
  formatFirmaTime,
  getEventDisplayDate,
  zonedDateTimeToUtc,
} from "../../lib/timeZone";

function toDateInput(date) {
  return `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
}

function ManualEventModal({ theme, timeZone, onClose, onSave }) {
  const now = getDateInTimeZone(timeZone);
  const [form, setForm] = useState({
    title: "", description: "", startDate: toDateInput(now), startTime: "09:00", timeZone,
    endDate: toDateInput(now), endTime: "10:00", visibility: "private",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const set = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));
  const submit = async (event) => {
    event.preventDefault();
    if (!form.title.trim()) return setError("Escribe un título.");
    const start = new Date(`${form.startDate}T${form.startTime}`);
    const end = new Date(`${form.endDate}T${form.endTime}`);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
      return setError("La finalización debe ser posterior al comienzo.");
    }
    setSaving(true); setError("");
    try {
      const [sy, sm, sd] = form.startDate.split("-").map(Number);
      const startsAt = zonedDateTimeToUtc({ year: sy, month: sm, day: sd }, form.startTime, form.timeZone);
      const [ey, em, ed] = form.endDate.split("-").map(Number);
      const endsAt = zonedDateTimeToUtc({ year: ey, month: em, day: ed }, form.endTime, form.timeZone);
      await onSave({ label: form.title.trim(), desc: form.description.trim(), startsAt, endsAt, type: "manual", source: "manual", visibility: form.visibility, day: getDateInTimeZone(form.timeZone, startsAt).day, month: getDateInTimeZone(form.timeZone, startsAt).month, year: getDateInTimeZone(form.timeZone, startsAt).year });
      onClose();
    } catch (saveError) { setError(saveError.message || "No se pudo guardar el evento."); }
    finally { setSaving(false); }
  };
  const field = "mt-1 w-full rounded-[10px] border border-black/[.1] bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-white/[.1] dark:bg-white/[.06]";
  return <>
    <button aria-label="Cerrar nuevo evento" onClick={onClose} className="fixed inset-0 z-50 bg-black/25 backdrop-blur-[2px]" />
    <form onSubmit={submit} className="fixed inset-x-3 bottom-3 z-[51] max-h-[calc(100vh-24px)] overflow-y-auto rounded-[22px] bg-white p-5 shadow-2xl dark:bg-[#181B20] sm:inset-x-auto sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:w-[480px] sm:-translate-x-1/2 sm:-translate-y-1/2">
      <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-semibold">Nuevo evento</h2><button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 dark:bg-white/[.08]"><X size={18}/></button></div>
      <label className="block text-xs font-semibold">Título<input autoFocus value={form.title} onChange={set("title")} className={field} /></label>
      <label className="mt-3 block text-xs font-semibold">Descripción<textarea value={form.description} onChange={set("description")} rows={2} className={field} /></label>
      <div className="mt-3 grid grid-cols-2 gap-2"><label className="text-xs font-semibold">Comienzo<input type="date" value={form.startDate} onChange={set("startDate")} className={field}/><input type="time" value={form.startTime} onChange={set("startTime")} className={field}/></label><label className="text-xs font-semibold">Finalización<input type="date" value={form.endDate} onChange={set("endDate")} className={field}/><input type="time" value={form.endTime} onChange={set("endTime")} className={field}/></label></div>
      <label className="mt-3 block text-xs font-semibold">Uso horario<select value={form.timeZone} onChange={set("timeZone")} className={field}><option value={timeZone}>{timeZone} (actual)</option><option value="UTC">UTC</option><option value={Intl.DateTimeFormat().resolvedOptions().timeZone}>{Intl.DateTimeFormat().resolvedOptions().timeZone}</option></select></label>
      <fieldset className="mt-4"><legend className="text-xs font-semibold">Visibilidad</legend><div className="mt-2 grid grid-cols-3 gap-2">{[["private","Oculto"],["friends","Solo amigos"],["public","Visible"]].map(([value,label]) => <label key={value} className={`cursor-pointer rounded-[10px] border px-2 py-2 text-center text-xs font-semibold ${form.visibility === value ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-200" : "border-black/[.1] dark:border-white/[.1]"}`}><input type="radio" name="visibility" value={value} checked={form.visibility === value} onChange={set("visibility")} className="sr-only"/>{label}</label>)}</div></fieldset>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}<button disabled={saving} className="mt-5 min-h-11 w-full rounded-[12px] bg-[#176BFF] font-semibold text-white disabled:opacity-60">{saving ? "Guardando…" : "Crear evento"}</button>
    </form>
  </>;
}

function parseCsvRows(text) {
  return text
    .trim()
    .split(/\r?\n/)
    .map((line) => line.split(",").map((cell) => cell.trim()));
}

const airlineNameByIata = new Map(
  parseCsvRows(airlinesCsv)
    .slice(1)
    .map(([iata, , name]) => [iata.trim().toUpperCase(), name || ""]),
);

function getAirlineNameFromFlightNumber(flightNumber) {
  const prefix = (flightNumber || "").trim().slice(0, 2).toUpperCase();
  return airlineNameByIata.get(prefix) || "";
}

export function Slab({
  event,
  theme,
  onClick,
  compact = false,
  showTime = false,
  timeZone,
}) {
  const s = activityStyles[event.type];
  const dayIndicator = getEventDayIndicator(event, timeZone);
  const showsTime = !compact || showTime;
  return (
    <button
      onClick={onClick}
      className={`slab flex w-full flex-col justify-center overflow-hidden rounded-[8px] border px-0.5 py-1 text-center transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${showsTime ? "min-h-[36px]" : "min-h-[22px]"} ${theme === "dark" ? s.dark : s.light}`}
    >
      <div className="slab__label whitespace-nowrap font-extrabold leading-tight tracking-wide">
        {event.label}
      </div>
      {showsTime && (
        <div className="slab__time mt-0.5 whitespace-nowrap font-medium opacity-75">
          {formatEventTimeRange(event, timeZone)}
          {dayIndicator && (
            <sup className="slab__day-indicator ml-0.5 font-bold leading-none">
              {dayIndicator}
            </sup>
          )}
        </div>
      )}
    </button>
  );
}

function CalendarDay({
  date,
  index,
  isToday,
  isPast,
  isLastRow,
  events,
  theme,
  showSlabTimes,
  timeZone,
  onSelect,
}) {
  const day = date?.day;
  const isOutsideMonth =
    date && (date.month !== date.visibleMonth || date.year !== date.visibleYear);
  return (
    <div
      className={`relative min-h-[82px] border-b border-r border-black/[.055] p-1 dark:border-white/[.06] sm:min-h-[116px] sm:p-1.5 lg:min-h-[132px] ${index % 7 === 6 ? "border-r-0" : ""} ${isLastRow ? "border-b-0" : ""} ${isToday ? "bg-blue-50/40 dark:bg-blue-950/10" : ""}`}
    >
      {date && (
        <>
          <div
            className={`mb-1 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold sm:text-xs ${isToday ? "bg-[#176BFF] text-white" : isOutsideMonth ? "text-slate-400 dark:text-slate-600" : "text-slate-600 dark:text-slate-300"}`}
          >
            {day}
          </div>
          <div className="space-y-1">
            {events.map((event, eventIndex) => (
              <Slab
                key={eventIndex}
                event={event}
                theme={theme}
                compact
                showTime={showSlabTimes}
                timeZone={timeZone}
                onClick={() => onSelect({ ...event, day, month: date.month, year: date.year })}
              />
            ))}
          </div>
          {isPast && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 bg-black/[.1] dark:bg-black/[.32]"
            />
          )}
        </>
      )}
    </div>
  );
}

export function CalendarView({
  theme,
  schedule,
  profile,
  showSlabTimes = false,
  showRestDayEvents = false,
  timeZone,
  onToggleSlabTimes,
  onOpenSettings,
  onLogout,
  onAddManualEvent,
}) {
  const [view, setView] = useState("mes");
  const [selected, setSelected] = useState(null);
  const [profileMenu, setProfileMenu] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const userInitial = (profile?.username || "U").charAt(0).toUpperCase();
  const selectedAirlineName = getAirlineNameFromFlightNumber(selected?.flightNumber);
  const scheduleEvents = schedule.events || schedule;
  const now = new Date();
  const schedulePeriod =
    schedule.period || { month: now.getMonth() + 1, year: now.getFullYear() };
  const [visiblePeriod, setVisiblePeriod] = useState(schedulePeriod);

  useEffect(() => {
    setVisiblePeriod(schedulePeriod);
  }, [schedulePeriod.month, schedulePeriod.year]);

  const monthDate = new Date(visiblePeriod.year, visiblePeriod.month - 1, 1);
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
    visiblePeriod.year,
    visiblePeriod.month,
    0,
  ).getDate();
  const gridLength = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;
  const monthDays = Array.from({ length: gridLength }, (_, index) => {
    const gridDate = new Date(
      visiblePeriod.year,
      visiblePeriod.month - 1,
      index - firstWeekday + 1,
    );
    return {
      day: gridDate.getDate(),
      month: gridDate.getMonth() + 1,
      year: gridDate.getFullYear(),
      visibleMonth: visiblePeriod.month,
      visibleYear: visiblePeriod.year,
    };
  });
  const weekdays = ["L", "M", "X", "J", "V", "S", "D"];
  const fullWeekdays = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sáb", "Dom"];
  const today = getDateInTimeZone(timeZone);
  const moveMonth = (offset) => {
    const nextMonth = new Date(
      visiblePeriod.year,
      visiblePeriod.month - 1 + offset,
      1,
    );
    setVisiblePeriod({
      month: nextMonth.getMonth() + 1,
      year: nextMonth.getFullYear(),
    });
  };
  const eventsByVisibleDay = Object.entries(scheduleEvents).reduce(
    (eventsByDay, [sourceDay, dayEvents]) => {
      dayEvents.forEach((event) => {
        if (!showRestDayEvents && event.type === "rest") return;
        const datedEvent = {
          ...event,
          day: event.day || Number(sourceDay),
          month: event.month || schedulePeriod.month,
          year: event.year || schedulePeriod.year,
        };
        const eventDate = getEventDisplayDate(datedEvent, timeZone);
        const eventKey = `${eventDate.year}-${eventDate.month}-${eventDate.day}`;
        if (!eventsByDay[eventKey]) eventsByDay[eventKey] = [];
        eventsByDay[eventKey].push(datedEvent);
      });
      return eventsByDay;
    },
    {},
  );

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
            Tu programación de un vistazo.
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => setShowManualModal(true)} aria-label="Crear evento" className="grid h-10 w-10 place-items-center rounded-full bg-[#176BFF] text-white shadow-sm transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"><Plus size={20}/></button>
          <button
            onClick={onToggleSlabTimes}
            aria-pressed={showSlabTimes}
            className={`grid h-10 w-10 place-items-center rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${showSlabTimes ? "bg-blue-50 text-[#176BFF] dark:bg-blue-950/50 dark:text-blue-300" : "text-slate-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/[.07]"}`}
            aria-label={
              showSlabTimes
                ? "Ocultar horarios en los slabs"
                : "Mostrar horarios en los slabs"
            }
          >
            <Clock3 size={19} />
          </button>
          <div className="relative ml-1">
            <button
              onClick={() => setProfileMenu(!profileMenu)}
              className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 text-xs font-bold text-white"
              aria-label="Abrir menú de usuario"
              aria-expanded={profileMenu}
            >
              {userInitial}
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
      <div className="mt-5 flex flex-wrap items-end justify-between gap-3 sm:mt-7">
        <div>
          <div className="flex items-center gap-0">
            <button
              onClick={() => moveMonth(-1)}
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/[.07]"
              aria-label="Mes anterior"
            >
              <ChevronLeft size={19} />
            </button>
            <h2 className="min-w-0 px-1 text-center text-xl font-semibold capitalize tracking-[-0.025em] sm:text-2xl">
              {monthLabel}
            </h2>
            <button
              onClick={() => moveMonth(1)}
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/[.07]"
              aria-label="Mes siguiente"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </div>
        <div className="flex rounded-[12px] bg-slate-200/70 p-1 dark:bg-white/[.07]">
          {["mes", "agenda"].map((value) => (
            <button
              key={value}
              onClick={() => setView(value)}
              className={`min-h-8 rounded-[9px] px-3 text-xs font-semibold capitalize transition ${view === value ? "bg-white text-slate-950 shadow-sm dark:bg-white/15 dark:text-white" : "text-slate-500"}`}
            >
              {value}
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
            {weekdays.map((day, index) => (
              <div
                key={day}
                className={`py-2.5 text-center text-[11px] font-semibold ${index > 4 ? "text-slate-400" : "text-slate-500"}`}
              >
                <span className="sm:hidden">{day}</span>
                <span className="hidden sm:inline">{fullWeekdays[index]}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {monthDays.map((day, index) => (
              <CalendarDay
                key={index}
                date={day}
                index={index}
                isToday={
                  day.day === today.day &&
                  day.month === today.month &&
                  day.year === today.year
                }
                isPast={
                  Date.UTC(day.year, day.month - 1, day.day) <
                  Date.UTC(today.year, today.month - 1, today.day)
                }
                isLastRow={index >= monthDays.length - 7}
                events={eventsByVisibleDay[`${day.year}-${day.month}-${day.day}`] || []}
                theme={theme}
                showSlabTimes={showSlabTimes}
                timeZone={timeZone}
                onSelect={setSelected}
              />
            ))}
          </div>
        </motion.section>
      ) : (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 space-y-2"
        >
          {Object.entries(eventsByVisibleDay)
            .filter(([dateKey]) =>
              dateKey.startsWith(`${visiblePeriod.year}-${visiblePeriod.month}-`),
            )
            .map(([dateKey, visibleEvents]) => {
            const day = Number(dateKey.split("-")[2]);
            return (
              <div
                key={dateKey}
                className="flex gap-3 rounded-[16px] border border-black/[.06] bg-white p-3 dark:border-white/[.07] dark:bg-[#14171A]"
              >
                <div className="w-10 shrink-0 text-center">
                  <span className="block text-[10px] font-semibold uppercase text-slate-400">
                    {monthShortLabel}
                  </span>
                  <span className="text-xl font-semibold">{day}</span>
                </div>
                <div className="flex-1 space-y-2">
                  {visibleEvents.map((event, index) => (
                    <Slab
                      key={index}
                      event={event}
                      theme={theme}
                      compact
                      showTime={showSlabTimes}
                      timeZone={timeZone}
                      onClick={() => setSelected({ ...event, day })}
                    />
                  ))}
                </div>
              </div>
            );
          })}
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
                  {selected.situated && selectedAirlineName && (
                    <div className="inline-flex rounded-lg bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700 dark:bg-white/[.1] dark:text-slate-200">
                      {selectedAirlineName}
                    </div>
                  )}
                  {selected.flightNumber?.startsWith("GRD") && (
                    <div className="inline-flex rounded-lg bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700 dark:bg-white/[.1] dark:text-slate-200">
                      Por carretera
                    </div>
                  )}
                  {selected.flightNumber?.endsWith("P") && (
                    <div className="inline-flex rounded-lg bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700 dark:bg-white/[.1] dark:text-slate-200">
                      En vacío
                    </div>
                  )}
                </div>
                {selected.desc && (
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                    {selected.desc}
                  </h3>
                )}
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
                  <p className="text-sm font-semibold">
                    {formatEventTimeRange(selected, timeZone)}
                    {getEventDayIndicator(selected, timeZone) &&
                      ` ${getEventDayIndicator(selected, timeZone)}`}
                  </p>
                </div>
              </div>
              {(selected.firmaAt || selected.firmaTime) && (
                <div className="flex items-center gap-3">
                  <Pencil size={18} className="text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Firma</p>
                    <p className="text-sm font-semibold">
                      {formatFirmaTime(selected, timeZone)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
      {showManualModal && <ManualEventModal theme={theme} timeZone={timeZone} onClose={() => setShowManualModal(false)} onSave={onAddManualEvent} />}
    </div>
  );
}
