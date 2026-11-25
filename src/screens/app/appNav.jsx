import { useState } from "react";
import { BarChart3, CalendarDays, Clock3, Download, Menu, Plus, Settings, Users, X } from "lucide-react";
import { ProfileMenuMark } from "../../components/shared";

export function TimeZoneSelector({
  timeZonePreference = "base",
  baseIata,
  onTimeZoneChange,
  onLogout,
}) {
  const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const isCustom = !["base", "UTC"].includes(timeZonePreference);
  const selectedMode = isCustom ? "custom" : timeZonePreference;
  const timeZones =
    typeof Intl.supportedValuesOf === "function"
      ? Intl.supportedValuesOf("timeZone")
      : [browserTimeZone];
  const customTimeZone = isCustom ? timeZonePreference : browserTimeZone;
  const availableTimeZones = timeZones.includes(customTimeZone)
    ? timeZones
    : [customTimeZone, ...timeZones];
  const updateTimeZone = (timeZone) => {
    Promise.resolve(onTimeZoneChange?.(timeZone)).catch((error) => {
      console.error("No se pudo guardar el uso horario", error);
    });
  };

  return (
    <div className="mt-auto rounded-[16px] bg-slate-50 p-3 dark:bg-white/[.04]">
      <label className="block text-xs font-semibold" htmlFor="time-zone-mode">
        Uso horario
      </label>
      <select
        id="time-zone-mode"
        value={selectedMode}
        onChange={(event) => {
          const nextMode = event.target.value;
          updateTimeZone(nextMode === "custom" ? browserTimeZone : nextMode);
        }}
        className="mt-1 w-full bg-transparent text-xs text-slate-500 outline-none dark:text-slate-400"
      >
        <option value="base">{baseIata || "Base"}</option>
        <option value="UTC">UTC</option>
        <option value="custom">Otro…</option>
      </select>
      {isCustom && (
        <select
          value={customTimeZone}
          onChange={(event) => updateTimeZone(event.target.value)}
          className="mt-2 w-full rounded-[8px] bg-white px-2 py-1.5 text-xs text-slate-600 outline-none dark:bg-white/[.08] dark:text-slate-300"
          aria-label="Elegir otro uso horario"
        >
          {availableTimeZones.map((timeZone) => (
            <option key={timeZone} value={timeZone}>
              {timeZone}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export function AppNav({
  active,
  setActive,
  desktop = false,
  timeZonePreference,
  baseIata,
  onTimeZoneChange,
  onLogout,
}) {
  const [compactMenuOpen, setCompactMenuOpen] = useState(false);
  const items = [
    ["calendar", CalendarDays, "Calendario"],
    ["summary", BarChart3, "Resumen"],
    ["compare", Users, "Comparar"],
    ["settings", Settings, "Ajustes"],
  ];

  if (desktop) {
    return (
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[236px] flex-col border-r border-black/[.06] bg-white px-4 py-5 dark:border-white/[.07] dark:bg-[#101216] lg:flex">
        <ProfileMenuMark onLogout={onLogout} />
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
        <TimeZoneSelector
          timeZonePreference={timeZonePreference}
          baseIata={baseIata}
          onTimeZoneChange={onTimeZoneChange}
        />
      </aside>
    );
  }

  const runCalendarAction = (action) => {
    setCompactMenuOpen(false);
    window.dispatchEvent(new CustomEvent(`calendar:${action}`));
  };

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-black/[.08] bg-white/90 px-3 pb-[max(8px,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur-xl dark:border-white/[.08] dark:bg-[#101216]/90 lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-3 items-center">
          <div className="justify-self-start"><ProfileMenuMark compact onOpenSummary={() => setActive("summary")} onOpenSettings={() => setActive("settings")} onLogout={onLogout} /></div>
          <button type="button" onClick={() => setActive("compare")} className={`flex min-h-13 min-w-20 flex-col items-center justify-center gap-1 justify-self-center rounded-xl text-[10px] font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${active === "compare" ? "text-[#176BFF]" : "text-slate-500 dark:text-slate-400"}`}><Users size={21} strokeWidth={active === "compare" ? 2.5 : 2} />Comparar</button>
          <button type="button" onClick={() => setCompactMenuOpen((value) => !value)} aria-label="Acciones del calendario" aria-expanded={compactMenuOpen} className="grid h-11 w-11 place-items-center justify-self-end rounded-[14px] text-slate-600 transition hover:bg-black/[.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-300 dark:hover:bg-white/[.07]">{compactMenuOpen ? <X size={22} /> : <Menu size={23} />}</button>
        </div>
      </nav>
      {compactMenuOpen && <>
        <button type="button" aria-label="Cerrar acciones" onClick={() => setCompactMenuOpen(false)} className="fixed inset-0 z-[90] bg-black/25 backdrop-blur-[1px] lg:hidden" />
        <section aria-label="Acciones y uso horario" className="fixed bottom-[calc(72px+env(safe-area-inset-bottom))] right-3 z-[91] w-[min(22rem,calc(100vw-1.5rem))] overflow-hidden rounded-[22px] border border-black/[.08] bg-white p-3 shadow-2xl dark:border-white/[.1] dark:bg-[#181B20] lg:hidden">
          <div className={`grid gap-2 ${active === "calendar" ? "mb-3 grid-cols-3" : "grid-cols-2"}`}>
            <button type="button" onClick={() => runCalendarAction("create")} className="flex min-h-16 flex-col items-center justify-center gap-1.5 rounded-[15px] bg-[#176BFF] text-[11px] font-semibold text-white"><Plus size={19} />Crear</button>
            <button type="button" onClick={() => runCalendarAction("download")} className="flex min-h-16 flex-col items-center justify-center gap-1.5 rounded-[15px] bg-slate-50 text-[11px] font-semibold text-slate-700 dark:bg-white/[.06] dark:text-slate-200"><Download size={19} />PDF</button>
            {active === "calendar" && (
              <button type="button" onClick={() => runCalendarAction("toggle-times")} className="flex min-h-16 flex-col items-center justify-center gap-1.5 rounded-[15px] bg-slate-50 text-[11px] font-semibold text-slate-700 dark:bg-white/[.06] dark:text-slate-200"><Clock3 size={19} />Horarios</button>
            )}
          </div>
          {active === "calendar" && (
            <TimeZoneSelector timeZonePreference={timeZonePreference} baseIata={baseIata} onTimeZoneChange={onTimeZoneChange} />
          )}
        </section>
      </>}
    </>
  );
}
