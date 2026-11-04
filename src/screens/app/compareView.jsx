import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { CalendarView } from "./calendarView";
import { Button, Input } from "../../components/shared";
import {
  compareFriendSchedules,
  groupFriendMatches,
  loadFriendSchedule,
  loadFriendships,
  removeFriend,
  respondToFriendRequest,
  searchProfiles,
  sendFriendRequest,
} from "../../lib/scheduleService";

const flatten = (schedule) => Object.values(schedule || {}).flat();
const formatDate = (value) =>
  new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(`${value}T12:00:00`));
const formatTime = (value) =>
  new Intl.DateTimeFormat("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
const formatDateTime = (value) =>
  new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
const labels = {
  operational_airport: "Ventana operativa en aeropuerto",
  possible_city: "Posible coincidencia en la ciudad",
};
const calendarColorPalette = [
  { light: "bg-sky-50 border-sky-300 text-sky-950", dark: "bg-sky-950/70 border-sky-700 text-sky-100" },
  { light: "bg-violet-50 border-violet-300 text-violet-950", dark: "bg-violet-950/70 border-violet-700 text-violet-100" },
  { light: "bg-orange-50 border-orange-300 text-orange-950", dark: "bg-orange-950/70 border-orange-700 text-orange-100" },
  { light: "bg-teal-50 border-teal-300 text-teal-950", dark: "bg-teal-950/70 border-teal-700 text-teal-100" },
  { light: "bg-pink-50 border-pink-300 text-pink-950", dark: "bg-pink-950/70 border-pink-700 text-pink-100" },
  { light: "bg-lime-50 border-lime-300 text-lime-950", dark: "bg-lime-950/70 border-lime-700 text-lime-100" },
  { light: "bg-indigo-50 border-indigo-300 text-indigo-950", dark: "bg-indigo-950/70 border-indigo-700 text-indigo-100" },
  { light: "bg-rose-50 border-rose-300 text-rose-950", dark: "bg-rose-950/70 border-rose-700 text-rose-100" },
];

function MatchCard({ group }) {
  const [expanded, setExpanded] = useState(false);
  const free = group.locationType === "free";
  const possible = group.locationType === "city";
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
  return (
    <article
      className={`rounded-2xl border p-4 ${free ? "border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/60 dark:bg-emerald-950/25" : possible ? "border-amber-200 bg-amber-50/70 dark:border-amber-900/60 dark:bg-amber-950/25" : "border-black/[.07] bg-blue-50/70 dark:border-white/[.1] dark:bg-blue-950/25"}`}
    >
      <p className="font-semibold">
        {free
          ? "D\u00edas libres compartidos"
          : possible
            ? `${group.city} \u00b7 Posible coincidencia`
            : `${group.airportIata} \u00b7 ${group.airportCity}`}
      </p>
      <p className="hidden">
        {free
          ? "Días libres compartidos"
          : `${group.airportIata} · ${group.airportCity}`}
      </p>
      <p className="mt-1 text-xs capitalize text-slate-600 dark:text-slate-300">
        {range}
      </p>
      <p className="mt-2 text-sm font-medium">
        {people.map((person) => person.username).join(", ")}
      </p>
      {possible && (
        <p className="mt-1 text-xs text-amber-800 dark:text-amber-200">
          Ubicacion estimada por vuelos; no confirma que puedan quedar en persona.
        </p>
      )}
      {possible && (
        <p className="hidden" aria-hidden="true">
          Ciudad inferida por los vuelos; no confirma que estÃ©n juntos.
        </p>
      )}
      {free ? (
        <p className="mt-1 text-xs text-slate-500">
          Ninguno tiene actividad programada durante este intervalo.
        </p>
      ) : (
        group.matches.map((match, index) => (
          <div
            key={`${match.startedAt}-${index}`}
            className="mt-3 rounded-xl bg-white/70 p-3 text-sm dark:bg-white/[.06]"
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold">
                {labels[match.type] || "Coincidencia"}
              </p>
              <span className={possible ? "text-amber-700 dark:text-amber-300" : "text-emerald-600"}>
                {possible ? "Posible" : "Ventana operativa"} - {match.distanceMinutes} min
              </span>
              <span className="hidden" aria-hidden="true">
                {possible ? "Posible" : "Ventana operativa"} Â· {match.distanceMinutes} min
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {formatDateTime(match.startedAt)} → {formatDateTime(match.endedAt)}
            </p>
            <button
              className="mt-2 text-xs font-semibold text-blue-700"
              onClick={() => setExpanded((value) => !value)}
            >
              {expanded ? "Ocultar detalle" : "Ver vuelos y horarios"}
            </button>
            {expanded && (
              <div className="mt-3 space-y-2 border-t border-black/5 pt-3 dark:border-white/10">
                {match.participants.map((person) => (
                  <div key={person.id}>
                    <p className="font-medium">
                      {person.username} · {person.continuedIntoMatch ? "ya estaba allí" : person.role}
                      {person.continuedIntoMatch && (
                        <span className="font-normal text-slate-500">
                          {" "}desde {formatDateTime(person.presenceStartedAt)}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-slate-500">
                      {person.flightNumber || "Actividad"} · {person.route}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </article>
  );
}

/* Modal para buscar y añadir amistades. El estado "open" vive en el padre,
   así cualquier botón (cabecera o estado vacío) puede abrirlo. */
function AddFriendModal({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sendingId, setSendingId] = useState(null);

  if (!open) return null;

  const search = async (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      setResults(await searchProfiles(query));
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
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-5">
      <div className="w-full max-w-lg rounded-[24px] bg-white p-6 dark:bg-[#14171A]">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Añadir amistad</h2>
          <button onClick={onClose} aria-label="Cerrar">
            <X />
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
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <div className="mt-5 space-y-2">
          {results.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between rounded-xl border border-black/10 p-3 dark:border-white/10"
            >
              <div>
                <p className="font-semibold">@{user.username}</p>
                <p className="text-xs text-slate-500">
                  {user.airline} · {user.base_city || user.base}
                </p>
              </div>
              {user.requestSent ? (
                <span className="text-xs text-slate-500">Pendiente</span>
              ) : (
                <Button
                  className="!min-h-9 !px-3"
                  onClick={() => add(user.id)}
                  disabled={sendingId === user.id}
                >
                  {sendingId === user.id ? <LoaderCircle size={16} className="animate-spin" /> : "Añadir"}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CompareBody({ onBack, schedule, schedulePeriod, onPeriodChange, profile, theme = "light", timeZone = "UTC" }) {
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
  const [addOpen, setAddOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarUserIds, setCalendarUserIds] = useState([]);
  const [showCalendarTimes, setShowCalendarTimes] = useState(false);
  const month = schedulePeriod?.month || new Date().getMonth() + 1;
  const year = schedulePeriod?.year || new Date().getFullYear();
  const monthLabel = new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, 1));

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
      const network = await loadFriendships();
      setFriends(network.friends || []);
      setReceivedRequests(network.received || []);
      setSentRequests(network.sent || []);
    } catch (requestError) {
      setError(requestError.message || "No se ha podido responder a la solicitud.");
    } finally {
      setResponding(null);
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

  const matches = useMemo(
    () =>
      compareFriendSchedules(flatten(schedule), friendEvents, {
        mode,
        month,
        year,
        baseIata: profile?.base,
      }),
    [schedule, friendEvents, mode, month, year, profile?.base],
  );
  const allGroups = useMemo(() => groupFriendMatches(matches), [matches]);
  const calendarUsers = useMemo(() => [
    { id: "me", username: "Tú", profile, events: flatten(schedule) },
    ...friendEvents.filter((friend) => selected.includes(friend.id)).map((friend) => ({
      ...friend,
      profile: { username: friend.username, base: friend.base, base_city: friend.base_city, airline: friend.airline },
      events: friend.events || [],
    })),
  ], [profile, schedule, friendEvents, selected]);
  const calendarEvents = useMemo(() => calendarUsers
    .filter((user) => calendarUserIds.includes(user.id))
    .flatMap((user) => user.events.map((event) => ({
      ...event,
      calendarColor: calendarColorPalette[calendarUsers.findIndex((candidate) => candidate.id === user.id) % calendarColorPalette.length],
    })))
    .reduce((byDay, event) => {
      const day = event.day || (event.startsAt ? new Date(event.startsAt).getDate() : 1);
      (byDay[day] ||= []).push(event);
      return byDay;
    }, {}), [calendarUsers, calendarUserIds]);
  const groups = activeGroup
    ? allGroups.filter((group) => group.key === activeGroup)
    : allGroups;
  const markers = allGroups.map((group) => ({
    key: group.key,
    free: group.locationType === "free",
    possible: group.locationType === "city",
    label:
      group.locationType === "free" && group.date !== group.dateEnd
        ? `${group.date.slice(8, 10)} - ${group.dateEnd.slice(8, 10)}`
        : `${group.date.slice(8, 10)} · ${group.matches.length}`,
  }));

  const changeMonth = (offset) => {
    const next = new Date(year, month - 1 + offset, 1);
    onPeriodChange?.({ month: next.getMonth() + 1, year: next.getFullYear() });
    setActiveGroup(null);
  };

  const deleteFriend = async (friend) => {
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

  if (showCalendar && selected.length > 0) {
    return (
      <div className="min-h-screen">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center gap-2 px-3 pt-3 sm:px-5 lg:px-7">
          <button
            onClick={() => setShowCalendar(false)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-slate-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/[.07]"
            aria-label="Volver a las coincidencias"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={() => setCalendarUserIds(calendarUsers.map((user) => user.id))}
            className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold dark:bg-white/[.08]"
          >
            Todos
          </button>
          <button
            onClick={() => setCalendarUserIds([])}
            className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold dark:bg-white/[.08]"
          >
            Ninguno
          </button>
          {calendarUsers.map((user) => (
            <label
              key={user.id}
              className={`flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold ${calendarUserIds.includes(user.id) ? "bg-blue-600 text-white" : "bg-white text-slate-600 dark:bg-white/[.08] dark:text-slate-200"}`}
            >
              <input
                type="checkbox"
                checked={calendarUserIds.includes(user.id)}
                onChange={() => setCalendarUserIds((ids) => ids.includes(user.id) ? ids.filter((id) => id !== user.id) : [...ids, user.id])}
              />
              {user.id === "me" ? "Tú" : `@${user.username}`}
            </label>
          ))}
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

  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-8 lg:px-8 lg:pb-8">
      <button
        onClick={onBack}
        className="mb-6 grid h-10 w-10 place-items-center rounded-full text-slate-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/[.07]"
        aria-label="Volver al calendario"
      >
        <ArrowLeft size={20} />
      </button>
      <header>
        {/* Título y botón en la misma fila: siempre alineados verticalmente */}
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold tracking-[-0.04em]">
            Comparar
          </h1>
          <Button onClick={() => setAddOpen(true)} aria-label="Añadir amistad">
            <Plus size={17} />
            <span className="hidden sm:inline">Añadir amistad</span>
          </Button>
        </div>
        <p className="mt-2 text-slate-500">
          Encuentra coincidencias con tus amistades.
        </p>
        <div className="mt-3 flex items-center gap-1">
          <button
            onClick={() => changeMonth(-1)}
            aria-label="Mes anterior"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/[.07]"
          >
            <ChevronLeft size={19} />
          </button>
          <h2 className="min-w-[170px] text-center text-lg font-semibold capitalize">
            {monthLabel}
          </h2>
          <button
            onClick={() => changeMonth(1)}
            aria-label="Mes siguiente"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/[.07]"
          >
            <ChevronRight size={19} />
          </button>
        </div>
      </header>
      {error && (
        <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}
      {(receivedRequests.length > 0 || sentRequests.length > 0) && (
        <section className="mt-6 rounded-[24px] border border-black/[.07] bg-white p-5 dark:border-white/[.1] dark:bg-[#14171A]">
          <h2 className="font-semibold">Solicitudes de amistad</h2>
          {receivedRequests.length > 0 && (
            <div className="mt-3 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Recibidas</p>
              {receivedRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between gap-3 rounded-xl border border-black/[.06] p-3 dark:border-white/[.08]">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">@{request.username}</p>
                    <p className="text-xs text-slate-500">{request.airline} · {request.base_city || request.base}</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() => respondToRequest(request, "accepted")}
                      disabled={responding === request.id}
                      aria-label={`Aceptar solicitud de @${request.username}`}
                      className="grid h-9 w-9 place-items-center rounded-full bg-emerald-50 text-emerald-700 disabled:opacity-50 dark:bg-emerald-950/40 dark:text-emerald-300"
                    >
                      {responding === request.id ? <LoaderCircle size={17} className="animate-spin" /> : <Check size={18} />}
                    </button>
                    <button
                      onClick={() => respondToRequest(request, "rejected")}
                      disabled={responding === request.id}
                      aria-label={`Rechazar solicitud de @${request.username}`}
                      className="grid h-9 w-9 place-items-center rounded-full bg-red-50 text-red-600 disabled:opacity-50 dark:bg-red-950/40 dark:text-red-300"
                    >
                      <X size={17} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {sentRequests.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Enviadas</p>
              {sentRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 text-sm dark:bg-white/[.04]">
                  <span className="font-medium">@{request.username}</span>
                  <span className="text-xs text-slate-500">Pendiente de respuesta</span>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
      {friends.length ? (
        <div className="mt-8 space-y-8">
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Comparar con
            </h2>
            <div className="space-y-2">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center gap-3 rounded-2xl border border-black/[.07] p-3 dark:border-white/[.1]"
                >
                  <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(friend.id)}
                      onChange={() =>
                        setSelected((ids) =>
                          ids.includes(friend.id)
                            ? ids.filter((id) => id !== friend.id)
                            : [...ids, friend.id],
                        )
                      }
                    />
                    <span className="font-semibold">@{friend.username}</span>
                    <span className="truncate text-xs text-slate-500">
                      {friend.base_city || friend.base}
                    </span>
                  </label>
                  <button
                    onClick={() => deleteFriend(friend)}
                    disabled={removing === friend.id}
                    className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-40 dark:hover:bg-red-950/30"
                    aria-label={`Eliminar a @${friend.username}`}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-[24px] border border-black/[.07] bg-white p-5 dark:border-white/[.1] dark:bg-[#14171A]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">Coincidencias</h2>
                <p className="text-sm text-slate-500">
                  {selected.length
                    ? `${month}/${year}`
                    : "Selecciona una o más amistades"}
                </p>
              </div>
              <select
                value={mode}
                onChange={(event) => setMode(event.target.value)}
                disabled={selected.length < 2}
                className="rounded-xl border border-black/10 bg-transparent px-3 py-2 text-sm"
              >
                <option value="any">Cualquiera</option>
                <option value="all">Todos</option>
              </select>
              {selected.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setCalendarUserIds(calendarUsers.map((user) => user.id));
                    setShowCalendar(true);
                  }}
                  aria-label="Abrir calendario de usuarios seleccionados"
                  title="Ver programaciones en calendario"
                  disabled={loadingEvents}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-black/10 bg-white transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/[.06] dark:hover:bg-white/[.1]"
                >
                  <img src="/favicon.svg" alt="" aria-hidden="true" className="h-6 w-6" />
                </button>
              )}
            </div>
            {selected.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {markers.map((marker) => (
                  <button
                    key={marker.key}
                    onClick={() =>
                      setActiveGroup(
                        activeGroup === marker.key ? null : marker.key,
                      )
                    }
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      activeGroup === marker.key
                        ? marker.free
                          ? "bg-emerald-600 text-white"
                          : marker.possible
                            ? "bg-amber-600 text-white"
                            : "bg-blue-600 text-white"
                        : marker.free
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/25 dark:text-emerald-300"
                          : marker.possible
                            ? "bg-amber-50 text-amber-800 dark:bg-amber-950/25 dark:text-amber-200"
                            : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {marker.label}
                  </button>
                ))}
              </div>
            )}
            {loadingEvents ? (
              <LoaderCircle className="mt-6 animate-spin text-blue-600" />
            ) : (
              <div className="mt-5 space-y-3">
                {groups.map((group) => (
                  <MatchCard key={group.key} group={group} />
                ))}
                {selected.length > 0 && !groups.length && (
                  <p className="text-sm text-slate-500">
                    No hemos encontrado coincidencias este mes.
                  </p>
                )}
              </div>
            )}
          </section>
        </div>
      ) : (
        <div className="mt-8 flex min-h-[300px] flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-white px-6 text-center dark:bg-[#14171A]">
          <Users size={28} className="text-blue-600" />
          <h2 className="mt-5 text-lg font-semibold">
            Todavía no has añadido ninguna amistad.
          </h2>
          <Button className="mt-6" onClick={() => setAddOpen(true)}>
            Añadir amistad
          </Button>
        </div>
      )}
      <AddFriendModal open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
}

export function CompareView(props) {
  return <CompareBody {...props} />;
}
