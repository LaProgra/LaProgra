import { useEffect } from "react";
import {
  AlarmClock,
  CalendarCheck2,
  Clock3,
  MapPin,
  Moon,
  Plane,
  Route,
  Timer,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { divIcon } from "leaflet";
import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  ZoomControl,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  getDateInTimeZone,
  getEventDisplayDate,
  formatEventTime,
} from "../../lib/timeZone";
import { getAirportCity, getAirportCoordinates } from "../../lib/airports";
import { getEventRoute, isProgrammedActivity } from "../../lib/scheduleAnalysis";

const HOUR = 60 * 60 * 1000;

function periodLabel(period) {
  return new Intl.DateTimeFormat("es-ES", { month: "long", year: "numeric" })
    .format(new Date(period.year, period.month - 1, 1))
    .replace(" de ", " ");
}

function calculateSummary(schedule, period, timeZone, baseIata) {
  const allEvents = Object.values(schedule || {}).flat();
  const events = allEvents.filter((event) => {
    const date = getEventDisplayDate(event, timeZone);
    return date.month === period.month && date.year === period.year;
  });
  const daysInMonth = new Date(period.year, period.month, 0).getDate();
  const programmedDays = new Set(
    events.filter(isProgrammedActivity).map((event) => {
      const date = getEventDisplayDate(event, timeZone);
      return `${date.year}-${date.month}-${date.day}`;
    }),
  );
  const timed = events.filter(
    (event) => event.startsAt && event.endsAt && event.type !== "rest",
  );
  const flights = events.filter(
    (event) => event.flightNumber && getEventRoute(event),
  );
  const routes = new Map();
  const destinations = new Set();
  const destinationCounts = new Map();
  const airports = new Map();
  flights.forEach((event) => {
    const route = getEventRoute(event);
    const [origin, destination] = route.split("-");
    routes.set(route, (routes.get(route) || 0) + 1);
    destinations.add(destination);
    destinationCounts.set(
      destination,
      (destinationCounts.get(destination) || 0) + 1,
    );
    airports.set(origin, (airports.get(origin) || 0) + 1);
    airports.set(destination, (airports.get(destination) || 0) + 1);
  });
  const rankedAirports = [...airports.entries()].sort((a, b) => b[1] - a[1]);
  const base = String(baseIata || "").toUpperCase();
  const skippedBaseAirport =
    rankedAirports[0]?.[0] === base && rankedAirports.length > 1;
  const topAirport = skippedBaseAirport ? rankedAirports[1] : rankedAirports[0];
  const top = (map) => [...map.entries()].sort((a, b) => b[1] - a[1])[0];
  const durations = timed.map((event) => ({
    event,
    hours: Math.max(
      0,
      (new Date(event.endsAt) - new Date(event.startsAt)) / HOUR,
    ),
  }));
  const totalHours = durations.reduce((sum, item) => sum + item.hours, 0);
  const early = events.filter(
    (event) =>
      event.startsAt &&
      getDateInTimeZone(timeZone, event.startsAt) &&
      Number(formatEventTime(event.startsAt, timeZone).slice(0, 2)) < 8,
  ).length;
  const late = events.filter(
    (event) =>
      event.endsAt &&
      Number(formatEventTime(event.endsAt, timeZone).slice(0, 2)) >= 23,
  ).length;
  return {
    events,
    timed,
    flights,
    routes,
    destinations,
    destinationCounts,
    airports,
    topRoute: top(routes),
    topAirport,
    skippedBaseAirport,
    totalHours,
    early,
    late,
    freeDays: daysInMonth - programmedDays.size,
    restDays: events.filter((event) => event.type === "rest").length,
    longest: durations.sort((a, b) => b.hours - a.hours)[0]?.hours || 0,
  };
}

function Metric({ icon: Icon, label, value, detail }) {
  return (
    <article className="rounded-[18px] border border-black/[.06] bg-white p-4 dark:border-white/[.08] dark:bg-[#14171A]">
      <div className="flex items-center gap-2 text-slate-500">
        <Icon size={17} />
        <span className="text-xs font-semibold">{label}</span>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-[-0.04em]">{value}</p>
      {detail && <p className="mt-1 text-xs text-slate-500">{detail}</p>}
    </article>
  );
}

function MapViewport({ destinations }) {
  const map = useMap();
  useEffect(() => {
    if (!destinations.length) return;
    if (destinations.length === 1) {
      map.setView([destinations[0].latitude, destinations[0].longitude], 5, {
        animate: false,
      });
      return;
    }
    map.fitBounds(
      destinations.map(({ latitude, longitude }) => [latitude, longitude]),
      { padding: [36, 36], maxZoom: 5, animate: false },
    );
  }, [destinations, map]);
  return null;
}

function DestinationMap({ destinations }) {
  if (!destinations.length)
    return (
      <div className="flex h-[300px] items-center justify-center rounded-[20px] border border-dashed border-black/[.1] bg-slate-50 text-center dark:border-white/[.12] dark:bg-white/[.03]">
        <div>
          <MapPin className="mx-auto text-slate-400" size={26} />
          <p className="mt-2 text-sm font-semibold">
            No hay destinos con coordenadas
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Los destinos seguirán apareciendo en la lista.
          </p>
        </div>
      </div>
    );
  return (
    <div className="overflow-hidden rounded-[20px] border border-black/[.06] bg-white shadow-sm dark:border-white/[.08] dark:bg-[#14171A]">
      <div className="flex items-center justify-between px-5 pb-3 pt-5">
        <div>
          <h2 className="font-semibold">Mapa de destinos</h2>
        </div>
        <MapPin className="text-[#176BFF]" size={19} />
      </div>
      <MapContainer
        center={[40, -3]}
        zoom={3}
        zoomControl={false}
        scrollWheelZoom={false}
        className="h-[300px] w-full sm:h-[360px]"
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapViewport destinations={destinations} />
        {destinations.map((destination) => {
          const repeated = destination.count > 1;
          const marker = divIcon({
            className: "destination-marker",
            html: `<span class="destination-marker__pin ${repeated ? "destination-marker__pin--repeated" : ""}"><span>${destination.iata}</span>${repeated ? `<b>×${destination.count}</b>` : ""}</span>`,
            iconSize: [42, 42],
            iconAnchor: [21, 38],
          });
          return (
            <Marker
              key={destination.iata}
              position={[destination.latitude, destination.longitude]}
              icon={marker}
            >
              <Tooltip direction="top" offset={[0, -30]}>
                {destination.iata} · {destination.city} · {destination.count}{" "}
                {destination.count === 1 ? "vez" : "veces"}
              </Tooltip>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export function SummaryView({
  schedule,
  schedulePeriod,
  timeZone,
  profile,
  onPeriodChange,
  onBack,
}) {
  const period = schedulePeriod || getDateInTimeZone(timeZone);
  const summary = calculateSummary(
    schedule.events || schedule,
    period,
    timeZone,
    profile?.base,
  );
  const average = summary.timed.length
    ? summary.totalHours / summary.timed.length
    : 0;
  const formatHours = (value) => {
    const totalMinutes = Math.round(value * 60);
    return `${String(Math.floor(totalMinutes / 60)).padStart(2, "0")}:${String(totalMinutes % 60).padStart(2, "0")}`;
  };
  const noData = !summary.events.length;
  const baseIata = String(profile?.base || "").toUpperCase();
  const destinationList = [...summary.destinationCounts.entries()]
    .filter(([destination]) => destination !== baseIata)
    .sort(
      (left, right) => right[1] - left[1] || left[0].localeCompare(right[0]),
    );
  const mappedDestinations = destinationList
    .map(([iata, count]) => ({
      iata,
      count,
      city: getAirportCity(iata) || iata,
      ...getAirportCoordinates(iata),
    }))
    .filter(
      (destination) =>
        Number.isFinite(destination.latitude) &&
        Number.isFinite(destination.longitude),
    );
  const moveMonth = (offset) => {
    const next = new Date(period.year, period.month - 1 + offset, 1);
    onPeriodChange({ month: next.getMonth() + 1, year: next.getFullYear() });
  };
  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-24 pt-7 sm:px-6 lg:px-8 lg:pb-8">
      <header>
        <button
          onClick={onBack}
          className="mb-6 grid h-10 w-10 place-items-center rounded-full text-slate-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/[.07]"
          aria-label="Volver al calendario"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-semibold tracking-[-0.04em]">Resumen</h1>
        <div className="mt-3 flex items-center gap-1">
          <button
            onClick={() => moveMonth(-1)}
            aria-label="Mes anterior"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/[.07]"
          >
            <ChevronLeft size={19} />
          </button>
          <h2 className="min-w-[170px] text-center text-lg font-semibold capitalize">
            {periodLabel(period)}
          </h2>
          <button
            onClick={() => moveMonth(1)}
            aria-label="Mes siguiente"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/[.07]"
          >
            <ChevronRight size={19} />
          </button>
        </div>
      </header>
      {noData ? (
        <div className="mt-8 rounded-[20px] border border-dashed border-black/[.12] bg-white p-8 text-center dark:border-white/[.14] dark:bg-[#14171A]">
          <CalendarCheck2 className="mx-auto text-slate-400" size={28} />
          <p className="mt-3 font-semibold">
            No hay eventos en esta programación
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Importa una programación para ver sus estadísticas.
          </p>
        </div>
      ) : (
        <>
          <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric
              icon={Clock3}
              label="Horas"
              value={formatHours(summary.totalHours)}
            />
            <Metric
              icon={CalendarCheck2}
              label="Días libres"
              value={summary.freeDays}
              detail="Días del mes sin actividad programada"
            />
            <Metric
              icon={Plane}
              label="Vuelos"
              value={summary.flights.length}
              detail={`${summary.routes.size} rutas distintas`}
            />
          </section>
          <section className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric
              icon={AlarmClock}
              label="Madrugones"
              value={summary.early}
              detail="Antes de 08:00"
            />

            <Metric
              icon={Moon}
              label="Llegadas tarde"
              value={summary.late}
              detail="Después de 23:00"
            />

            <Metric
              icon={Timer}
              label="Vuelo más largo"
              value={formatHours(summary.longest)}
              detail={`Media: ${formatHours(average)}`}
            />
          </section>
          <section className="mt-6">
            <DestinationMap destinations={mappedDestinations} />
          </section>
          {/* Destination chips are represented directly by the map markers. */}
          {false && (
            <section className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-[20px] border border-black/[.06] bg-white p-5 dark:border-white/[.08] dark:bg-[#14171A]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold">Destinos</h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Sin contar tu base
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-500 dark:bg-white/[.08]">
                    {destinationList.length} destinos
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {destinationList.length ? (
                    destinationList.map(([destination, count]) => (
                      <span
                        key={destination}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-semibold ${count > 1 ? "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-100" : "border-black/[.06] bg-slate-50 text-slate-500 dark:border-white/[.08] dark:bg-white/[.05]"}`}
                      >
                        {destination}
                        {count > 1 && (
                          <span className="rounded-full bg-blue-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                            ×{count}
                          </span>
                        )}
                      </span>
                    ))
                  ) : (
                    <p className="py-3 text-sm text-slate-500">
                      No hay destinos fuera de la base este mes.
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
