import { CalendarDays, Settings, Users } from "lucide-react";
import { LaPrograMark } from "../../components/shared";

function TimeZoneSelector({
  timeZonePreference = "base",
  baseIata,
  onTimeZoneChange,
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
        <option value="base">{baseIata || "Base"} · LT</option>
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
}) {
  const items = [
    ["calendar", CalendarDays, "Calendario"],
    ["compare", Users, "Comparar"],
    ["settings", Settings, "Ajustes"],
  ];

  if (desktop) {
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
        <TimeZoneSelector
          timeZonePreference={timeZonePreference}
          baseIata={baseIata}
          onTimeZoneChange={onTimeZoneChange}
        />
      </aside>
    );
  }

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
