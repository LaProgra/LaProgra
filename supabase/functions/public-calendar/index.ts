import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders as supabaseCorsHeaders } from "npm:@supabase/supabase-js@2/cors";

const headers = { ...supabaseCorsHeaders, "Content-Type": "application/json" };
const attempts = new Map<string, { count: number; until: number }>();
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers });
const genericError = () => json({ error: "No se puede mostrar este calendario." }, 401);

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers });
  if (request.method !== "POST") return genericError();
  try {
    const { username, pinHash } = await request.json();
    const normalized = String(username || "").trim().toLowerCase();
    if (!/^[a-z0-9_-]{3,30}$/.test(normalized)) return genericError();
    const key = `${request.headers.get("x-forwarded-for") || "unknown"}:${normalized}`;
    const current = attempts.get(key);
    if (current && current.until > Date.now() && current.count >= 5) return genericError();
    const admin = createClient(Deno.env.get("SUPABASE_URL") || "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "", { auth: { persistSession: false } });
    const { data: profile } = await admin.from("profiles").select("id, username, base, base_city, display_time_zone, include_manual_events_in_pdf, show_rest_day_events, public_calendar_enabled, public_calendar_pin_hash").eq("username", normalized).maybeSingle();
    if (!profile?.public_calendar_enabled || !profile.public_calendar_pin_hash || profile.public_calendar_pin_hash !== pinHash) {
      const next = current && current.until > Date.now() ? { count: current.count + 1, until: current.until } : { count: 1, until: Date.now() + 15 * 60 * 1000 };
      attempts.set(key, next);
      return genericError();
    }
    attempts.delete(key);
    const { data: rows } = await admin.from("schedule_events").select("day, month, year, label, description, starts_at, ends_at, type, flight_number, situated, firma_at, source, visibility").eq("user_id", profile.id);
    const events: Record<string, unknown[]> = {};
    for (const row of rows || []) {
      if (row.source === "manual" && row.visibility === "private") continue;
      (events[row.day] ||= []).push({ day: row.day, month: row.month, year: row.year, label: row.label, desc: row.description, startsAt: row.starts_at, endsAt: row.ends_at, type: row.type, flightNumber: row.flight_number, situated: row.situated, firmaAt: row.firma_at, source: row.source, visibility: row.visibility });
    }
    return json({ profile: { username: profile.username, base: profile.base, baseCity: profile.base_city }, events, period: null, timeZone: profile.display_time_zone, includeManualEventsInPdf: profile.include_manual_events_in_pdf !== false, showRestDayEvents: profile.show_rest_day_events === true });
  } catch { return genericError(); }
});
