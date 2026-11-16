import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  LucideSmile,
  MapPin,
  MoreHorizontal,
  Plane,
  Plus,
  Search,
  FaceNeutral,
  TowerControl,
  Sun,
  Trash2,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { CalendarView } from "./calendarView";
import { Button, Input } from "../../components/shared";
import {
  compareFriendSchedules,
  MATCH_CATEGORIES,
  cancelFriendRequest,
  groupFriendMatches,
  loadFriendSchedule,
  loadFriendships,
  removeFriend,
  respondToFriendRequest,
  searchProfiles,
  sendFriendRequest,
} from "../../lib/scheduleService";

/* ───────────── Utilidades ───────────── */

const flatten = (schedule) => Object.values(schedule || {}).flat();

const formatDate = (value) =>
  new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(`${value}T12:00:00`));

const formatShortDate = (value) =>
  new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
  }).format(new Date(`${value}T12:00:00`));

const formatDateTime = (value) =>
  new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

const formatDuration = (value) => {
  const minutes = Math.max(0, Math.round(Number(value) || 0));
  if (minutes < 60) return `${minutes} min`;
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const remainingMinutes = minutes % 60;
  if (days > 0) {
    const dayLabel = `${days} ${days === 1 ? "día" : "días"}`;
    return hours ? `${dayLabel} ${hours} h` : dayLabel;
  }
  return remainingMinutes ? `${hours} h ${remainingMinutes} min` : `${hours} h`;
};

const eventSummary = (event) => {
  if (!event) return "actividad";
  const route = event.label && /^[A-Z]{3}-[A-Z]{3}$/i.test(event.label)
    ? event.label
    : event.flightNumber || event.label;
  return route || event.desc || event.description || "actividad";
};

// "12 oct" o, para rangos, "12 - 15 oct" (o "30 sep - 2 oct" si cambia el mes)
const formatShortRange = (start, end) => {
  if (start === end) return formatShortDate(start);
  const sameMonth = start.slice(0, 7) === end.slice(0, 7);
  return sameMonth
    ? `${Number(start.slice(8, 10))} - ${formatShortDate(end)}`
    : `${formatShortDate(start)} - ${formatShortDate(end)}`;
};

const labels = {
  same_flight: "Misma tripulación en vuelo",
  operational_airport: "Ventana operativa en aeropuerto",
  possible_city: "Posible coincidencia en la ciudad",
  safe_city: "Coincidencia segura en la ciudad",
};

/* Una paleta única para toda la pantalla: la misma persona tiene el mismo
   color en el avatar, en los chips y en el calendario comparado. */
const personPalette = [
  {
    light: "bg-sky-50 border-sky-300 text-sky-950",
    dark: "bg-sky-950/70 border-sky-700 text-sky-100",
    avatar: "bg-sky-600 text-white",
    dot: "bg-sky-500",
    ring: "border-sky-500 bg-sky-50 dark:bg-sky-950/30",
  },
  {
    light: "bg-violet-50 border-violet-300 text-violet-950",
    dark: "bg-violet-950/70 border-violet-700 text-violet-100",
    avatar: "bg-violet-600 text-white",
    dot: "bg-violet-500",
    ring: "border-violet-500 bg-violet-50 dark:bg-violet-950/30",
  },
  {
    light: "bg-orange-50 border-orange-300 text-orange-950",
    dark: "bg-orange-950/70 border-orange-700 text-orange-100",
    avatar: "bg-orange-600 text-white",
    dot: "bg-orange-500",
    ring: "border-orange-500 bg-orange-50 dark:bg-orange-950/30",
  },
  {
    light: "bg-teal-50 border-teal-300 text-teal-950",
    dark: "bg-teal-950/70 border-teal-700 text-teal-100",
    avatar: "bg-teal-600 text-white",
    dot: "bg-teal-500",
    ring: "border-teal-500 bg-teal-50 dark:bg-teal-950/30",
  },
  {
    light: "bg-pink-50 border-pink-300 text-pink-950",
    dark: "bg-pink-950/70 border-pink-700 text-pink-100",
    avatar: "bg-pink-600 text-white",
    dot: "bg-pink-500",
    ring: "border-pink-500 bg-pink-50 dark:bg-pink-950/30",
  },
  {
    light: "bg-lime-50 border-lime-300 text-lime-950",
    dark: "bg-lime-950/70 border-lime-700 text-lime-100",
    avatar: "bg-lime-600 text-white",
    dot: "bg-lime-500",
    ring: "border-lime-500 bg-lime-50 dark:bg-lime-950/30",
  },
  {
    light: "bg-indigo-50 border-indigo-300 text-indigo-950",
    dark: "bg-indigo-950/70 border-indigo-700 text-indigo-100",
    avatar: "bg-indigo-600 text-white",
    dot: "bg-indigo-500",
    ring: "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30",
  },
  {
    light: "bg-rose-50 border-rose-300 text-rose-950",
    dark: "bg-rose-950/70 border-rose-700 text-rose-100",
    avatar: "bg-rose-600 text-white",
    dot: "bg-rose-500",
    ring: "border-rose-500 bg-rose-50 dark:bg-rose-950/30",
  },
];

const hashIndex = (id) =>
  [...String(id)].reduce((sum, char) => sum + char.charCodeAt(0), 0) %
  personPalette.length;

const initialsOf = (username = "") =>
  username.replace(/^@/, "").slice(0, 2).toUpperCase() || "?";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#14171A]";

const cardClass =
  "rounded-[24px] border border-black/[.07] bg-white p-5 dark:border-white/[.1] dark:bg-[#14171A]";

/* Tipo de coincidencia a partir de su grupo / marcador. */
const kindOf = (item) =>
  item.safe
    ? "safe"
    : item.flight
      ? "flight"
      : item.possible
        ? "city"
        : "airport";

/* ───────────── Piezas pequeñas ───────────── */

function Avatar({ username, palette, size = "md" }) {
  const sizes = {
    xs: "h-5 w-5 text-[9px]",
    sm: "h-7 w-7 text-[11px]",
    md: "h-10 w-10 text-sm",
  };
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full font-semibold ${sizes[size]} ${palette.avatar}`}
    >
      {initialsOf(username)}
    </span>
  );
}

function Segmented({ value, onChange, options, disabled }) {
  return (
    <div
      role="group"
      className={`inline-flex rounded-full bg-slate-100 p-1 dark:bg-white/[.08] ${disabled ? "opacity-50" : ""}`}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          disabled={disabled}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${focusRing} ${
            value === option.value
              ? "bg-white text-slate-900 shadow-sm dark:bg-white/[.16] dark:text-white"
              : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function MonthSelector({ monthLabel, onPrevious, onNext }) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={onPrevious}
        aria-label="Mes anterior"
        className={`grid h-9 w-9 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/[.07] ${focusRing}`}
      >
        <ChevronLeft size={19} />
      </button>
      <h3 className="min-w-[140px] text-center text-base font-semibold capitalize">
        {monthLabel}
      </h3>
      <button
        type="button"
        onClick={onNext}
        aria-label="Mes siguiente"
        className={`grid h-9 w-9 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/[.07] ${focusRing}`}
      >
        <ChevronRight size={19} />
      </button>
    </div>
  );
}

/* Solo muestra los tipos de coincidencia que realmente aparecen en el mes.
   `kinds` es un Set con valores "flight" | "airport" | "city" | "free". */
function Legend({ kinds }) {
  const items = [
    {
      kind: "flight",
      icon: Plane,
      label: MATCH_CATEGORIES.flight,
      tone: "text-violet-600 dark:text-violet-300",
    },
    {
      kind: "airport",
      icon: TowerControl,
      label: MATCH_CATEGORIES.airport,
      tone: "text-blue-600 dark:text-blue-300",
    },
    {
      kind: "city",
      icon: FaceNeutral,
      label: MATCH_CATEGORIES.city,
      tone: "text-amber-600 dark:text-amber-300",
    },
    {
      kind: "safe",
      icon: LucideSmile,
      label: MATCH_CATEGORIES.safe,
      tone: "text-emerald-600 dark:text-emerald-300",
    },
  ].filter((item) => kinds.has(item.kind));

  if (!items.length) return null;

  return (
    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400">
      {items.map(({ kind, icon: Icon, label, tone }) => (
        <li key={kind} className="flex items-center gap-1.5">
          <Icon size={13} className={tone} aria-hidden="true" />
          {label}
        </li>
      ))}
    </ul>
  );
}

function SkeletonCards() {
  return (
    <div
      className="mt-5 space-y-3"
      aria-busy="true"
      aria-label="Cargando coincidencias"
    >
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-2xl border border-black/[.05] p-4 dark:border-white/[.08]"
        >
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-white/[.1]" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-1/2 rounded bg-slate-200 dark:bg-white/[.1]" />
              <div className="h-3 w-1/3 rounded bg-slate-100 dark:bg-white/[.06]" />
            </div>
          </div>
          <div className="mt-4 h-8 w-2/3 rounded-full bg-slate-100 dark:bg-white/[.06]" />
        </div>
      ))}
    </div>
  );
}

/* ───────────── Coincidencias ───────────── */

/* Cada coincidencia gestiona su propio "expandido", así no se abren todas a la vez. */
function MatchDetail({ match, possible, safe, colorFor }) {
  const [expanded, setExpanded] = useState(false);
  const inFlight = match.locationType === "flight";
  return (
    <div className="mt-3 rounded-xl bg-white/80 p-3 text-sm dark:bg-white/[.06]">
      <div className="hidden">
        <p className="font-semibold">{labels[match.type] || "Coincidencia"}</p>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
            inFlight
              ? "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200"
              : safe
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
                : possible
                ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200"
                : "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200"
          }`}
        >
          {inFlight
            ? MATCH_CATEGORIES.flight
            : safe
              ? MATCH_CATEGORIES.safe
              : possible
                ? MATCH_CATEGORIES.city
                : MATCH_CATEGORIES.airport}{" "}
          · {formatDuration(match.distanceMinutes)}
        </span>
      </div>
      <p className="hidden">
        {formatDateTime(match.startedAt)} → {formatDateTime(match.endedAt)}
      </p>
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
        className={`mt-2 inline-flex items-center gap-1 rounded text-xs font-semibold text-blue-700 dark:text-blue-300 ${focusRing}`}
      >
        {expanded ? "Ocultar detalle" : "Ver vuelos y horarios"}
        <ChevronDown
          size={14}
          className={`transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      {expanded && (
        <div className="mt-3 space-y-3 border-t border-black/5 pt-3 dark:border-white/10">
          {match.participants.map((person) => (
            <div key={person.id} className="flex items-start gap-2.5">
              <Avatar
                username={person.username}
                palette={colorFor(person.id)}
                size="sm"
              />
              <div className="min-w-0">
                <p className="font-medium">
                  @{person.username}{" "}
                  <span className="font-normal text-slate-500 dark:text-slate-400">
                    ·{" "}
                    {person.continuedIntoMatch ? "ya estaba allí" : person.role}
                    {person.continuedIntoMatch &&
                      ` desde ${formatDateTime(person.presenceStartedAt)}`}
                  </span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {person.flightNumber || "Actividad"} · {person.route}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MatchCard({ group, colorFor }) {
  const safe = group.locationType === "safe";
  const possible = group.locationType === "city";
  const inFlight = group.locationType === "flight";
  const people = [
    ...new Map(
      group.matches
        .flatMap((match) => match.participants)
        .map((person) => [person.id, person]),
    ).values(),
  ];
  const range =
    group.date === group.dateEnd
      ? formatDate(group.date)
      : `${formatDate(group.date)} - ${formatDate(group.dateEnd)}`;
  const primaryMatch = group.matches[0];
  const categoryLabel = safe
    ? MATCH_CATEGORIES.safe
    : inFlight
      ? MATCH_CATEGORIES.flight
      : possible
        ? MATCH_CATEGORIES.city
        : MATCH_CATEGORIES.airport;

  const Icon = safe ? LucideSmile : possible ? FaceNeutral : inFlight ? Plane : TowerControl;
  const tone = safe
    ? {
        card: "border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/60 dark:bg-emerald-950/25",
        icon: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200",
      }
    : inFlight
      ? {
          card: "border-violet-200 bg-violet-50/70 dark:border-violet-900/60 dark:bg-violet-950/25",
          icon: "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-200",
        }
      : possible
        ? {
            card: "border-amber-200 bg-amber-50/70 dark:border-amber-900/60 dark:bg-amber-950/25",
            icon: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-200",
          }
        : {
            card: "border-blue-200/70 bg-blue-50/70 dark:border-blue-900/60 dark:bg-blue-950/25",
            icon: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200",
          };

  // const title = safe
  //   ? `Seguro que os veis en ${group.city || "la ciudad"}`
  //   : inFlight
  //     ? `${group.flightNumber} · ${group.route || MATCH_CATEGORIES.flight}`
  //     : possible
  //       ? `Posible coincidencia en ${group.city}`
  //       : `${group.airportIata} · ${group.airportCity}`;
  return (
    <article className={`relative rounded-2xl border p-4 ${tone.card}`}>
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${tone.icon}`}
        >
          <Icon size={18} />
        </span>
        <div className="min-w-0 flex-1">
          {/* <p className="font-semibold">{title}</p> */}
          {/* <p className="mt-0.5 text-xs capitalize text-slate-600 dark:text-slate-300">
            {range}
          </p> */}
          <p className="font-semibold">{range}</p>
          <span className="absolute right-4 top-4 inline-flex rounded-full bg-white/70 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-white/[.08] dark:text-slate-200">
            Duración · {formatDuration(primaryMatch?.distanceMinutes)}
          </span>
        </div>
      </div>

      <ul className="mt-3 flex flex-wrap gap-1.5">
        {people.map((person) => (
          <li
            key={person.id}
            className="flex items-center gap-1.5 rounded-full bg-white/80 py-1 pl-1 pr-2.5 text-xs font-medium dark:bg-white/[.08]"
          >
            <Avatar
              username={person.username}
              palette={colorFor(person.id)}
              size="xs"
            />
            @{person.username}
          </li>
        ))}
      </ul>

      {possible && (
        <p className="hidden">
          Ubicación estimada por vuelos; no confirma que puedan quedar en
          persona.
        </p>
      )}

      {safe ? (
        <>
        <div className="mt-3 rounded-xl bg-white/80 p-3 text-sm dark:bg-white/[.06]">
          {group.matches.flatMap((match) => match.participants).map((person) => (
            <div key={person.id} className="mb-3 last:mb-0">
              <p className="font-medium">
                @{person.username}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Inicio: {eventSummary(person.startEvent || person.event)}
                {" · "}
                Fin: {eventSummary(person.endEvent)}
              </p>
            </div>
          ))}
        </div>
        <div className="hidden">
          {group.matches.map((match, index) => (
            <div key={`${match.startedAt}-${index}`}>
              <p className="font-semibold text-emerald-800 dark:text-emerald-200">
                Intervalo: {formatDateTime(match.startedAt)} - {formatDateTime(match.endedAt)}
              </p>
              <p>Ambos están en {group.city || "la misma ciudad"} y disponibles durante este intervalo.</p>
              <p>La coincidencia termina cuando uno inicia su siguiente actividad o vuelo.</p>
            </div>
          ))}
        </div>
        <div className="hidden">
          {group.matches.map((match, index) => (
            <div key={`${match.startedAt}-${index}`} className="space-y-1">
              <p className="font-semibold text-emerald-800 dark:text-emerald-200">
                Intervalo: {formatDateTime(match.startedAt)} → {formatDateTime(match.endedAt)}
              </p>
              <p>Ambos están en {group.city || "la misma ciudad"} y disponibles durante este intervalo.</p>
              <p>La coincidencia termina cuando uno inicia su siguiente actividad o vuelo.</p>
            </div>
          ))}
          {group.matches.map((match, index) => (
            <p key={`${match.startedAt}-${index}`} className="font-semibold text-emerald-800 dark:text-emerald-200">
              Intervalo: {formatDateTime(match.startedAt)} → {formatDateTime(match.endedAt)}
            </p>
          ))}
          Ambos están en la misma ciudad y disponibles durante este intervalo.
          <p>
            La coincidencia empieza cuando los dos estÃ¡n disponibles y termina
            cuando uno inicia su siguiente actividad o vuelo.
          </p>
        </div>
        </>
      ) : (
        group.matches.map((match, index) => (
          <MatchDetail
            key={`${match.startedAt}-${index}`}
            match={match}
            possible={possible}
            safe={safe}
            colorFor={colorFor}
          />
        ))
      )}
    </article>
  );
}

/* ───────────── Modal para añadir amistades ─────────────
   El estado "open" vive en el padre, así cualquier botón (cabecera o estado
   vacío) puede abrirlo. En móvil se comporta como una hoja inferior. */
function UnifiedMatchDetail({ match, safe, colorFor }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="mt-3 rounded-xl bg-white/80 p-3 text-sm dark:bg-white/[.06]">
      <p className="hidden">
        {formatDateTime(match.startedAt)} → {formatDateTime(match.endedAt)}
      </p>
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
        className={"mt-2 inline-flex items-center gap-1 rounded text-xs font-semibold text-blue-700 dark:text-blue-300 " + focusRing}
      >
        {expanded ? "Ocultar detalle" : "Ver vuelos y horarios"}
        <ChevronDown size={14} className={expanded ? "rotate-180" : ""} />
      </button>
      {expanded && (
        <div className="mt-3 space-y-3 border-t border-black/5 pt-3 dark:border-white/10">
          {match.participants.map((person) => (
            <div key={person.id} className="flex items-start gap-2.5">
              <Avatar username={person.username} palette={colorFor(person.id)} size="sm" />
              <div className="min-w-0">
                <p className="font-medium">@{person.username}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {safe
                    ? <>{person.startEvent?.type === "base" ? `Ya estaba en ${person.airportIata}` : `Llega en ${eventSummary(person.startEvent || person.event)}`} · {`Sale en ${eventSummary(person.endEvent)}`}</>
                    : <>{person.flightNumber || "Actividad"} · {person.route}</>}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function UnifiedMatchCard({ group, colorFor }) {
  const safe = group.locationType === "safe";
  const possible = group.locationType === "city";
  const inFlight = group.locationType === "flight";
  const primaryMatch = group.matches[0];
  const category = safe ? MATCH_CATEGORIES.safe : inFlight ? MATCH_CATEGORIES.flight : possible ? MATCH_CATEGORIES.city : MATCH_CATEGORIES.airport;
  const Icon = safe ? LucideSmile : possible ? FaceNeutral : inFlight ? Plane : TowerControl;
  const tone = safe ? "border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/60 dark:bg-emerald-950/25" : possible ? "border-amber-200 bg-amber-50/70 dark:border-amber-900/60 dark:bg-amber-950/25" : inFlight ? "border-violet-200 bg-violet-50/70 dark:border-violet-900/60 dark:bg-violet-950/25" : "border-blue-200/70 bg-blue-50/70 dark:border-blue-900/60 dark:bg-blue-950/25";
  const iconTone = safe ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200" : possible ? "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-200" : inFlight ? "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-200" : "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200";
  const people = [...new Map(group.matches.flatMap((match) => match.participants).map((person) => [person.id, person])).values()];
  return (
    <article className={"rounded-2xl border p-4 " + tone}>
      <div className="flex items-start gap-3">
        <span className={"grid h-9 w-9 shrink-0 place-items-center rounded-full " + iconTone} aria-hidden="true"><Icon size={18} /></span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <p className="font-semibold">{formatDateTime(primaryMatch.startedAt)} → {formatDateTime(primaryMatch.endedAt)}</p>
            <span className="inline-flex shrink-0 rounded-full bg-white/70 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-white/[.08] dark:text-slate-200">{category} · Duración: {formatDuration(primaryMatch.distanceMinutes)}</span>
          </div>
        </div>
      </div>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {people.map((person) => <li key={person.id} className="flex items-center gap-1.5 rounded-full bg-white/80 py-1 pl-1 pr-2.5 text-xs font-medium dark:bg-white/[.08]"><Avatar username={person.username} palette={colorFor(person.id)} size="xs" />@{person.username}</li>)}
      </ul>
      {group.matches.map((match, index) => <UnifiedMatchDetail key={String(match.startedAt) + "-" + index} match={match} safe={safe} colorFor={colorFor} />)}
    </article>
  );
}

function AddFriendModal({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sendingId, setSendingId] = useState(null);

  // Cerrar con Esc
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Limpiar al cerrar
  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
      setSearched(false);
      setError("");
    }
  }, [open]);

  if (!open) return null;

  const search = async (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      setResults(await searchProfiles(query));
      setSearched(true);
    } catch (searchError) {
      setError(searchError.message || "No se ha podido realizar la búsqueda.");
    } finally {
      setLoading(false);
    }
  };

  const add = async (id) => {
    setSendingId(id);
    setError("");
    try {
      await sendFriendRequest(id);
      setResults((items) =>
        items.map((item) =>
          item.id === id ? { ...item, requestSent: true } : item,
        ),
      );
    } catch (e) {
      setError(e.message || "No se ha podido enviar la solicitud.");
    } finally {
      setSendingId(null);
    }
  };

  return (
    <div
      className="cmp-fade fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 sm:items-center sm:p-5"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-friend-title"
        onClick={(event) => event.stopPropagation()}
        className="cmp-pop max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-t-[24px] bg-white p-6 sm:rounded-[24px] dark:bg-[#14171A]"
      >
        <div className="flex items-center justify-between">
          <h2 id="add-friend-title" className="text-xl font-semibold">
            Añadir amistad
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className={`grid h-9 w-9 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/[.07] ${focusRing}`}
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={search} className="mt-5 flex items-end gap-2">
          <div className="flex-1">
            <Input
              label="Buscar por usuario"
              icon={Search}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="@usuario"
            />
          </div>
          <Button type="submit" disabled={loading || !query.trim()}>
            {loading ? (
              <LoaderCircle className="animate-spin" size={17} />
            ) : (
              "Buscar"
            )}
          </Button>
        </form>
        {error && (
          <p
            role="alert"
            className="mt-3 text-sm text-red-600 dark:text-red-400"
          >
            {error}
          </p>
        )}
        <div className="mt-5 space-y-2">
          {results.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-black/10 p-3 dark:border-white/10"
            >
              <div className="flex min-w-0 items-center gap-3">
                <Avatar
                  username={user.username}
                  palette={personPalette[hashIndex(user.id)]}
                />
                <div className="min-w-0">
                  <p className="truncate font-semibold">@{user.username}</p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {user.airline} · {user.base_city || user.base}
                  </p>
                </div>
              </div>
              {user.requestSent ? (
                <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <Check size={14} /> Solicitud enviada
                </span>
              ) : (
                <Button
                  className="!min-h-9 !px-3"
                  onClick={() => add(user.id)}
                  disabled={sendingId === user.id}
                >
                  {sendingId === user.id ? (
                    <LoaderCircle size={16} className="animate-spin" />
                  ) : (
                    "Añadir"
                  )}
                </Button>
              )}
            </div>
          ))}
          {searched && !loading && !results.length && !error && (
            <p className="rounded-xl bg-slate-50 px-4 py-6 text-center text-sm text-slate-500 dark:bg-white/[.04] dark:text-slate-400">
              No hay ningún usuario que coincida con «{query.trim()}». Revisa
              que esté bien escrito.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ───────────── Pantalla principal ───────────── */

function CompareBody({
  onBack,
  schedule,
  schedulePeriod,
  onPeriodChange,
  profile,
  theme = "light",
  timeZone = "UTC",
}) {
  const [friends, setFriends] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [selected, setSelected] = useState([]);
  const [friendEvents, setFriendEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("any");
  const [activeGroup, setActiveGroup] = useState(null);
  const [removing, setRemoving] = useState(null);
  const [responding, setResponding] = useState(null);
  const [cancelling, setCancelling] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [menuFor, setMenuFor] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarUserIds, setCalendarUserIds] = useState([]);
  const [showCalendarTimes, setShowCalendarTimes] = useState(false);
  const closeAddModal = useCallback(() => setAddOpen(false), []);

  const month = schedulePeriod?.month || new Date().getMonth() + 1;
  const year = schedulePeriod?.year || new Date().getFullYear();
  const monthLabel = new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, 1));

  const refreshNetwork = async () => {
    const network = await loadFriendships();
    setFriends(network.friends || []);
    setReceivedRequests(network.received || []);
    setSentRequests(network.sent || []);
  };

  useEffect(() => {
    loadFriendships()
      .then((network) => {
        setFriends(network.friends || []);
        setReceivedRequests(network.received || []);
        setSentRequests(network.sent || []);
      })
      .catch(() => setError("No se han podido cargar tus amistades."))
      .finally(() => setLoading(false));
  }, []);

  const respondToRequest = async (request, status) => {
    setResponding(request.id);
    setError("");
    try {
      await respondToFriendRequest(request.id, status);
      await refreshNetwork();
    } catch (requestError) {
      setError(
        requestError.message || "No se ha podido responder a la solicitud.",
      );
    } finally {
      setResponding(null);
    }
  };

  const cancelRequest = async (request) => {
    setCancelling(request.id);
    setError("");
    try {
      await cancelFriendRequest(request.id);
      await refreshNetwork();
    } catch (requestError) {
      setError(requestError.message || "No se ha podido retirar la solicitud.");
    } finally {
      setCancelling(null);
    }
  };

  useEffect(() => {
    if (!selected.length) {
      setFriendEvents([]);
      return undefined;
    }
    let cancelled = false;
    setLoadingEvents(true);
    loadFriendSchedule(selected, month, year)
      .then((users) => !cancelled && setFriendEvents(users))
      .catch(
        () =>
          !cancelled &&
          setError("No se han podido cargar los turnos de tus amistades."),
      )
      .finally(() => !cancelled && setLoadingEvents(false));
    return () => {
      cancelled = true;
    };
  }, [selected, month, year]);

  /* Color estable por persona: "Tú" siempre el primero y las amistades en el
     orden en que aparecen en la lista. */
  const colorIndexById = useMemo(() => {
    const map = new Map([["me", 0]]);
    friends.forEach((friend, index) =>
      map.set(friend.id, (index + 1) % personPalette.length),
    );
    return map;
  }, [friends]);
  const colorFor = useCallback(
    (id) => personPalette[colorIndexById.get(id) ?? hashIndex(id)],
    [colorIndexById],
  );

  const matches = useMemo(
    () =>
      compareFriendSchedules(flatten(schedule), friendEvents, {
        mode,
        month,
        year,
        baseIata: profile?.base,
        timeZone,
      }),
    [schedule, friendEvents, mode, month, year, profile?.base, timeZone],
  );
  const allGroups = useMemo(() => groupFriendMatches(matches), [matches]);

  const calendarUsers = useMemo(
    () => [
      { id: "me", username: "Tú", profile, events: flatten(schedule) },
      ...friendEvents
        .filter((friend) => selected.includes(friend.id))
        .map((friend) => ({
          ...friend,
          profile: {
            username: friend.username,
            base: friend.base,
            base_city: friend.base_city,
            airline: friend.airline,
          },
          events: friend.events || [],
        })),
    ],
    [profile, schedule, friendEvents, selected],
  );

  const calendarEvents = useMemo(
    () =>
      calendarUsers
        .filter((user) => calendarUserIds.includes(user.id))
        .flatMap((user) =>
          user.events.map((event) => ({
            ...event,
            calendarColor: colorFor(user.id),
          })),
        )
        .reduce((byDay, event) => {
          const day =
            event.day ||
            (event.startsAt ? new Date(event.startsAt).getDate() : 1);
          (byDay[day] ||= []).push(event);
          return byDay;
        }, {}),
    [calendarUsers, calendarUserIds, colorFor],
  );

  const groups = activeGroup
    ? allGroups.filter((group) => group.key === activeGroup)
    : allGroups;

  const markers = allGroups.map((group) => ({
    key: group.key,
    safe: group.locationType === "safe",
    flight: group.locationType === "flight",
    possible: group.locationType === "city",
    label:
      group.locationType === "free"
        ? formatShortRange(group.date, group.dateEnd)
        : group.matches.length > 1
          ? `${formatShortRange(group.date, group.dateEnd)} · ${group.matches.length}`
          : formatShortRange(group.date, group.dateEnd),
  }));

  /* Tipos de coincidencia presentes este mes: alimentan la leyenda. */
  const legendKinds = useMemo(
    () => new Set(markers.map(kindOf)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allGroups],
  );

  const changeMonth = (offset) => {
    const next = new Date(year, month - 1 + offset, 1);
    onPeriodChange?.({ month: next.getMonth() + 1, year: next.getFullYear() });
    setActiveGroup(null);
  };

  const toggleFriend = (id) =>
    setSelected((ids) =>
      ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id],
    );

  const deleteFriend = async (friend) => {
    setMenuFor(null);
    if (
      !window.confirm(
        `¿Quieres eliminar a @${friend.username} de tus amistades?`,
      )
    )
      return;
    setRemoving(friend.id);
    try {
      await removeFriend(friend.id);
      setFriends((items) => items.filter((item) => item.id !== friend.id));
      setSelected((ids) => ids.filter((id) => id !== friend.id));
    } catch {
      setError("No se ha podido eliminar la amistad.");
    } finally {
      setRemoving(null);
    }
  };

  /* ───── Vista de calendario comparado ───── */
  if (showCalendar && selected.length > 0) {
    return (
      <div className="min-h-screen">
        <div className="mx-auto max-w-[1500px] px-3 pt-3 sm:px-5 lg:px-7">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowCalendar(false)}
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-slate-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/[.07] ${focusRing}`}
              aria-label="Volver a las coincidencias"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-semibold tracking-[-0.02em]">
              Calendario comparado
            </h1>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setCalendarUserIds(calendarUsers.map((user) => user.id))
              }
              className={`rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold dark:bg-white/[.08] ${focusRing}`}
            >
              Todos
            </button>
            <button
              type="button"
              onClick={() => setCalendarUserIds([])}
              className={`rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold dark:bg-white/[.08] ${focusRing}`}
            >
              Ninguno
            </button>
            {calendarUsers.map((user) => {
              const active = calendarUserIds.includes(user.id);
              const palette = colorFor(user.id);
              return (
                <button
                  key={user.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    setCalendarUserIds((ids) =>
                      ids.includes(user.id)
                        ? ids.filter((id) => id !== user.id)
                        : [...ids, user.id],
                    )
                  }
                  className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition-colors ${focusRing} ${
                    active
                      ? palette.ring
                      : "border-transparent bg-white text-slate-500 dark:bg-white/[.08] dark:text-slate-300"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-2.5 w-2.5 rounded-full ${palette.dot} ${active ? "" : "opacity-40"}`}
                  />
                  {user.id === "me" ? "Tú" : `@${user.username}`}
                </button>
              );
            })}
          </div>
        </div>
        <CalendarView
          theme={theme}
          profile={{ ...profile, username: "Programaciones" }}
          schedule={{ events: calendarEvents, period: schedulePeriod }}
          showSlabTimes={showCalendarTimes}
          onToggleSlabTimes={() => setShowCalendarTimes((visible) => !visible)}
          timeZone={timeZone}
          onPeriodChange={onPeriodChange}
          readOnly
        />
      </div>
    );
  }

  if (loading)
    return (
      <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center">
        <LoaderCircle className="animate-spin text-blue-600" />
      </div>
    );

  const hasRequests = receivedRequests.length > 0 || sentRequests.length > 0;

  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-8 lg:px-8 lg:pb-8">
      <style>{`
        @keyframes cmp-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes cmp-pop { from { opacity: 0; transform: translateY(12px) scale(.98) } to { opacity: 1; transform: none } }
        .cmp-fade { animation: cmp-fade .15s ease-out }
        .cmp-pop { animation: cmp-pop .2s ease-out }
        @media (prefers-reduced-motion: reduce) { .cmp-fade, .cmp-pop { animation: none } }
      `}</style>

      <button
        type="button"
        onClick={onBack}
        className={`mb-6 grid h-10 w-10 place-items-center rounded-full text-slate-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/[.07] ${focusRing}`}
        aria-label="Volver al calendario"
      >
        <ArrowLeft size={20} />
      </button>

      <header>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold tracking-[-0.04em]">
            Comparar
          </h1>
          <Button onClick={() => setAddOpen(true)} aria-label="Añadir amistad">
            <Plus size={17} />
            <span className="hidden sm:inline">Añadir amistad</span>
          </Button>
        </div>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Encuentra coincidencias con tus amistades.
        </p>
      </header>

      {error && (
        <p
          role="alert"
          className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300"
        >
          {error}
        </p>
      )}

      {/* ───── Solicitudes ───── */}
      {hasRequests && (
        <section className="mt-6 space-y-3">
          {receivedRequests.length > 0 && (
            <div className="rounded-[24px] border border-blue-200 bg-blue-50/60 p-5 dark:border-blue-900/60 dark:bg-blue-950/20">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">Solicitudes recibidas</h2>
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-blue-600 px-1.5 text-xs font-semibold text-white">
                  {receivedRequests.length}
                </span>
              </div>
              <div className="mt-3 space-y-2">
                {receivedRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 dark:bg-white/[.06]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar
                        username={request.username}
                        palette={personPalette[hashIndex(request.id)]}
                      />
                      <div className="min-w-0">
                        <p className="truncate font-semibold">
                          @{request.username}
                        </p>
                        <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                          {request.airline} ·{" "}
                          {request.base_city || request.base}
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => respondToRequest(request, "accepted")}
                        disabled={responding === request.id}
                        aria-label={`Aceptar solicitud de @${request.username}`}
                        className={`inline-flex h-9 items-center gap-1.5 rounded-full bg-blue-600 px-3.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 ${focusRing}`}
                      >
                        {responding === request.id ? (
                          <LoaderCircle size={16} className="animate-spin" />
                        ) : (
                          <Check size={16} />
                        )}
                        Aceptar
                      </button>
                      <button
                        type="button"
                        onClick={() => respondToRequest(request, "rejected")}
                        disabled={responding === request.id}
                        aria-label={`Rechazar solicitud de @${request.username}`}
                        className={`grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:bg-white/[.08] dark:text-slate-300 dark:hover:bg-red-950/40 dark:hover:text-red-300 ${focusRing}`}
                      >
                        <X size={17} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {sentRequests.length > 0 && (
            <details className={`group ${cardClass} !p-0`}>
              <summary
                className={`flex cursor-pointer list-none items-center justify-between rounded-[24px] px-5 py-4 text-sm font-medium text-slate-600 dark:text-slate-300 ${focusRing}`}
              >
                <span>
                  Solicitudes enviadas{" "}
                  <span className="text-slate-400">
                    ({sentRequests.length})
                  </span>
                </span>
                <ChevronDown
                  size={17}
                  className="transition-transform group-open:rotate-180"
                />
              </summary>
              <div className="space-y-2 px-5 pb-5">
                {sentRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2.5 text-sm dark:bg-white/[.04]"
                  >
                    <div className="min-w-0">
                      <span className="font-medium">@{request.username}</span>
                      <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">
                        Pendiente de respuesta
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => cancelRequest(request)}
                      disabled={cancelling === request.id}
                      className={`shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50 dark:text-red-300 dark:hover:bg-red-950/30 ${focusRing}`}
                    >
                      {cancelling === request.id ? (
                        <LoaderCircle size={15} className="animate-spin" />
                      ) : (
                        "Retirar"
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </details>
          )}
        </section>
      )}

      {friends.length ? (
        <div className="mt-8 space-y-8">
          {/* ───── Lista de amistades ───── */}
          <section>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold">
                Elige con quién comparar
              </h2>
              {friends.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setSelected(
                      selected.length === friends.length
                        ? []
                        : friends.map((friend) => friend.id),
                    )
                  }
                  className={`rounded text-sm font-semibold text-blue-700 dark:text-blue-300 ${focusRing}`}
                >
                  {selected.length === friends.length
                    ? "Quitar selección"
                    : "Seleccionar todas"}
                </button>
              )}
            </div>
            <div className="space-y-2">
              {friends.map((friend) => {
                const isSelected = selected.includes(friend.id);
                const palette = colorFor(friend.id);
                return (
                  <div
                    key={friend.id}
                    className={`relative flex items-center gap-2 rounded-2xl border p-2 pr-2 transition-colors ${
                      isSelected
                        ? palette.ring
                        : "border-black/[.07] hover:bg-slate-50 dark:border-white/[.1] dark:hover:bg-white/[.04]"
                    } ${removing === friend.id ? "opacity-50" : ""}`}
                  >
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={isSelected}
                      onClick={() => toggleFriend(friend.id)}
                      className={`flex min-w-0 flex-1 items-center gap-3 rounded-xl p-1 text-left ${focusRing}`}
                    >
                      <Avatar username={friend.username} palette={palette} />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold">
                          @{friend.username}
                        </span>
                        <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
                          {friend.airline ? `${friend.airline} · ` : ""}
                          {friend.base_city || friend.base}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-colors ${
                          isSelected
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-slate-300 dark:border-white/20"
                        }`}
                      >
                        {isSelected && <Check size={14} strokeWidth={3} />}
                      </span>
                    </button>

                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setMenuFor(menuFor === friend.id ? null : friend.id)
                        }
                        aria-label={`Más opciones de @${friend.username}`}
                        aria-haspopup="menu"
                        aria-expanded={menuFor === friend.id}
                        className={`grid h-9 w-9 place-items-center rounded-full text-slate-400 hover:bg-black/5 hover:text-slate-700 dark:hover:bg-white/[.07] dark:hover:text-slate-200 ${focusRing}`}
                      >
                        <MoreHorizontal size={18} />
                      </button>
                      {menuFor === friend.id && (
                        <>
                          <button
                            type="button"
                            aria-label="Cerrar menú"
                            tabIndex={-1}
                            className="fixed inset-0 z-10 cursor-default"
                            onClick={() => setMenuFor(null)}
                          />
                          <div
                            role="menu"
                            className="cmp-fade absolute right-0 top-full z-20 mt-1 w-48 rounded-xl border border-black/10 bg-white p-1 shadow-lg dark:border-white/10 dark:bg-[#1B1F23]"
                          >
                            <button
                              type="button"
                              role="menuitem"
                              onClick={() => deleteFriend(friend)}
                              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/30 ${focusRing}`}
                            >
                              <Trash2 size={16} />
                              Eliminar amistad
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ───── Coincidencias ───── */}
          <section className={cardClass}>
            <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-3">
              <div>
                <h2 className="text-base font-semibold">Coincidencias</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {selected.length
                    ? `${selected.length} ${selected.length === 1 ? "amistad seleccionada" : "amistades seleccionadas"}`
                    : "Selecciona una o más amistades"}
                </p>
              </div>
              {selected.length > 0 && (
                <div className="flex flex-wrap items-center justify-end gap-2">
                  {selected.length >= 2 && (
                    <Segmented
                      value={mode}
                      onChange={setMode}
                      options={[
                        { value: "any", label: "Cualquiera" },
                        { value: "all", label: "Todos" },
                      ]}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setCalendarUserIds(calendarUsers.map((user) => user.id));
                      setShowCalendar(true);
                    }}
                    disabled={loadingEvents}
                    className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border border-black/10 bg-white px-3 text-sm font-semibold transition hover:bg-slate-50 disabled:opacity-50 dark:border-white/10 dark:bg-white/[.06] dark:hover:bg-white/[.1] ${focusRing}`}
                  >
                    <CalendarDays
                      size={17}
                      className="text-blue-600 dark:text-blue-300"
                    />
                    <span className="hidden sm:inline">Ver calendario</span>
                    <span className="sm:hidden">Calendario</span>
                  </button>
                </div>
              )}
            </div>

            {selected.length > 0 ? (
              <>
                <div className="mt-4 flex justify-end">
                  <MonthSelector
                    monthLabel={monthLabel}
                    onPrevious={() => changeMonth(-1)}
                    onNext={() => changeMonth(1)}
                  />
                </div>

                {!loadingEvents && markers.length > 0 && (
                  <>
                    <Legend kinds={legendKinds} />
                    <div className="mt-3 flex flex-wrap gap-2">
                      {markers.map((marker) => {
                        const Icon = marker.safe
                          ? LucideSmile
                          : marker.flight
                            ? Plane
                            : MapPin;
                        const active = activeGroup === marker.key;
                        return (
                          <button
                            key={marker.key}
                            type="button"
                            aria-pressed={active}
                            onClick={() =>
                              setActiveGroup(active ? null : marker.key)
                            }
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${focusRing} ${
                              active
                                  ? marker.safe
                                  ? "bg-emerald-600 text-white"
                                  : marker.flight
                                    ? "bg-violet-600 text-white"
                                    : marker.possible
                                      ? "bg-amber-600 text-white"
                                      : "bg-blue-600 text-white"
                                : marker.safe
                                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/25 dark:text-emerald-300"
                                  : marker.flight
                                    ? "bg-violet-50 text-violet-700 dark:bg-violet-950/25 dark:text-violet-300"
                                    : marker.possible
                                      ? "bg-amber-50 text-amber-800 dark:bg-amber-950/25 dark:text-amber-200"
                                      : "bg-blue-50 text-blue-700 dark:bg-blue-950/25 dark:text-blue-300"
                            }`}
                          >
                            <Icon size={13} aria-hidden="true" />
                            {marker.label}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                {loadingEvents ? (
                  <SkeletonCards />
                ) : (
                  <div className="mt-5 space-y-3">
                    {groups.map((group) => (
                      <UnifiedMatchCard
                        key={group.key}
                        group={group}
                        colorFor={colorFor}
                      />
                    ))}
                    {!groups.length && (
                      <p className="rounded-xl bg-slate-50 px-4 py-6 text-center text-sm text-slate-500 dark:bg-white/[.04] dark:text-slate-400">
                        No hemos encontrado coincidencias en {monthLabel}.
                        Prueba con otro mes o con otras amistades.
                      </p>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="mt-5 flex flex-col items-center rounded-2xl border border-dashed border-slate-300 px-6 py-10 text-center dark:border-white/15">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">
                  <CalendarDays size={22} />
                </span>
                <p className="mt-4 font-semibold">
                  Aquí verás cuándo coincidís
                </p>
                <p className="mt-1 max-w-xs text-sm text-slate-500 dark:text-slate-400">
                  Marca a alguien de la lista y buscaremos vuelos, ciudades y
                  días libres en común.
                </p>
              </div>
            )}
          </section>
        </div>
      ) : (
        <div className="mt-8 flex min-h-[300px] flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-white px-6 text-center dark:border-white/15 dark:bg-[#14171A]">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">
            <Users size={26} />
          </span>
          <h2 className="mt-5 text-lg font-semibold">
            Todavía no has añadido ninguna amistad
          </h2>
          <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            Añade a tus compañeros para ver cuándo coincidís en vuelos, ciudades
            o días libres.
          </p>
          <Button className="mt-6" onClick={() => setAddOpen(true)}>
            <UserPlus size={17} />
            Añadir amistad
          </Button>
        </div>
      )}

      <AddFriendModal open={addOpen} onClose={closeAddModal} />
    </div>
  );
}

export function CompareView(props) {
  return <CompareBody {...props} />;
}
