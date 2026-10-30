-- Supabase no longer auto-exposes new public-schema objects through the Data API.
-- Keep the client tables available to authenticated users while RLS remains the
-- row-level boundary for each user's data.
grant usage on schema public to authenticated;

grant select, insert, update, delete
  on table public.profiles, public.schedule_events,
    public.swiftair_calendar_sources, public.swiftair_synced_events
  to authenticated;

grant execute on function public.is_username_available(text) to authenticated;
