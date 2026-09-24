import { useState } from "react";
import { CalendarView } from "./app/calendarView";
import { hashPublicPin } from "../lib/scheduleService";
import { getAirportTimeZone } from "../importers";

async function verifyCalendar(username, pin) {
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/public-calendar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, pinHash: await hashPublicPin(pin) }),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || "No se puede mostrar este calendario.");
  return body;
}

export function PublicCalendar({ username }) {
  const [pin, setPin] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSlabTimes, setShowSlabTimes] = useState(false);
  const submit = async (event) => {
    event.preventDefault();
    if (pin.length !== 4) return setError("Introduce un PIN de 4 dígitos.");
    setLoading(true); setError("");
    try { setData(await verifyCalendar(username, pin)); } catch (verifyError) { setError(verifyError.message); }
    finally { setLoading(false); }
  };
  if (!data) return <main className="grid min-h-screen place-items-center bg-[#F5F6F8] px-5 text-slate-950"><form onSubmit={submit} className="w-full max-w-sm rounded-[22px] bg-white p-6 shadow-sm"><h1 className="text-2xl font-semibold">Calendario de @{username}</h1><p className="mt-2 text-sm text-slate-500">Introduce el PIN para continuar.</p><input autoFocus inputMode="numeric" maxLength={4} value={pin} onChange={(event) => setPin(event.target.value.replace(/\D/g, ""))} className="mt-5 min-h-12 w-full rounded-[12px] border border-black/10 px-3 text-center text-xl tracking-[.4em] outline-none focus:border-blue-500" aria-label="PIN" /><button disabled={loading} className="mt-4 min-h-11 w-full rounded-[12px] bg-[#176BFF] font-semibold text-white disabled:opacity-60">{loading ? "Comprobando…" : "Ver calendario"}</button>{error && <p className="mt-3 text-sm text-red-600">{error}</p>}</form></main>;
  const timeZone = data.timeZone === "base" ? getAirportTimeZone(data.profile.base) : data.timeZone || "UTC";
  return <div className="min-h-screen bg-[#F5F6F8] text-slate-950"><CalendarView theme="light" profile={data.profile} schedule={{ events: data.events, period: null }} timeZone={timeZone} includeManualEventsInPdf={data.includeManualEventsInPdf} showRestDayEvents={data.showRestDayEvents} showSlabTimes={showSlabTimes} onToggleSlabTimes={() => setShowSlabTimes((current) => !current)} readOnly /></div>;
}
