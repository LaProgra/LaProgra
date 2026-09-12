import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  LogOut,
  Pencil,
  Search,
  Settings,
  X,
} from "lucide-react";
import { activityStyles } from "../../data/schedule";
import { LaPrograMark } from "../../components/shared";
import {
  getEventDayIndicator,
  formatEventTimeRange,
  formatFirmaTime,
  getEventDisplayDate,
} from "../../lib/timeZone";

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
          {formatEventTimeRange(event, timeZone)}
          {dayIndicator && (
            <sup className="ml-0.5 text-[7px] font-bold leading-none">
              {dayIndicator}
            </sup>
          )}
        </div>
      )}
    </button>
  );
}

export function CalendarView({
  theme,
  schedule,
  showSlabTimes = false,
  timeZone,
  onOpenSettings,
  onLogout,
}) {
  const [view, setView] = useState("mes");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const scheduleEvents = schedule.events || schedule;
  const schedulePeriod = schedule.period || { month: 9, year: 2026 };
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
  const monthDays = Array.from(
    { length: Math.ceil((firstWeekday + daysInMonth) / 7) * 7 },
    (_, index) => {
      const day = index - firstWeekday + 1;
      return day > 0 && day <= daysInMonth ? day : null;
    },
  );
  const weekdays = ["L", "M", "X", "J", "V", "S", "D"];
  const fullWeekdays = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sáb", "Dom"];
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
        const datedEvent = {
          ...event,
          day: event.day || Number(sourceDay),
          month: event.month || schedulePeriod.month,
          year: event.year || schedulePeriod.year,
        };
        const eventDate = getEventDisplayDate(datedEvent, timeZone);
        if (
          eventDate.month !== visiblePeriod.month ||
          eventDate.year !== visiblePeriod.year
        ) {
          return;
        }
        if (!eventsByDay[eventDate.day]) eventsByDay[eventDate.day] = [];
        eventsByDay[eventDate.day].push(datedEvent);
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
            Tu programación de un vistazo
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
              aria-label="Abrir menú de usuario"
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
                placeholder="Buscar una actividad"
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
              <div
                key={index}
                className={`relative min-h-[82px] border-b border-r border-black/[.055] p-1 dark:border-white/[.06] sm:min-h-[116px] sm:p-1.5 lg:min-h-[132px] ${index % 7 === 6 ? "border-r-0" : ""} ${index >= monthDays.length - 7 ? "border-b-0" : ""} ${day === 3 ? "bg-blue-50/40 dark:bg-blue-950/10" : ""}`}
              >
                {day && (
                  <>
                    <div
                      className={`mb-1 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold sm:text-xs ${day === 3 ? "bg-[#176BFF] text-white" : "text-slate-600 dark:text-slate-300"}`}
                    >
                      {day}
                    </div>
                    <div className="space-y-1">
                      {(eventsByVisibleDay[day] || []).map((event, index) => (
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
          {Object.entries(eventsByVisibleDay).map(([day, visibleEvents]) => {
            return (
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
    </div>
  );
}
