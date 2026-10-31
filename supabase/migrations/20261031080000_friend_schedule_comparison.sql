alter table public.schedule_events
  add column if not exists firma_airport_iata text;

create table if not exists public.schedule_event_legs (
  id uuid primary key default gen_random_uuid(),
  schedule_event_id uuid not null references public.schedule_events(id) on delete cascade,
  sequence int not null,
  flight_number text,
  origin_iata text not null,
  destination_iata text not null,
  departure_at timestamptz,
  arrival_at timestamptz,
  unique(schedule_event_id, sequence)
);

alter table public.schedule_event_legs enable row level security;
create policy "schedule_event_legs_owner" on public.schedule_event_legs for all using (
  exists (select 1 from public.schedule_events e where e.id = schedule_event_id and e.user_id = auth.uid())
) with check (
  exists (select 1 from public.schedule_events e where e.id = schedule_event_id and e.user_id = auth.uid())
);
grant select, insert, update, delete on public.schedule_event_legs to authenticated;

create or replace function public.load_friend_schedule(friend_user_ids uuid[], requested_month int, requested_year int)
returns jsonb language plpgsql stable security definer set search_path = public as $$
declare result jsonb;
begin
  if auth.uid() is null then raise exception 'not_authenticated' using errcode = '42501'; end if;
  select jsonb_build_object('users', coalesce(jsonb_agg(user_data order by user_data->>'username'), '[]'::jsonb)) into result
  from (
    select jsonb_build_object(
      'id', p.id, 'username', p.username,
      'events', coalesce((select jsonb_agg(jsonb_build_object(
        'id', e.id, 'day', e.day, 'month', e.month, 'year', e.year, 'startsAt', e.starts_at,
        'endsAt', e.ends_at, 'firmaAt', e.firma_at, 'firmaAirportIata', e.firma_airport_iata,
        'label', e.label, 'description', e.description, 'type', e.type, 'flightNumber', e.flight_number,
        'situated', e.situated, 'source', e.source, 'visibility', e.visibility,
        'legs', coalesce((select jsonb_agg(jsonb_build_object('sequence', l.sequence, 'flightNumber', l.flight_number, 'originIata', l.origin_iata, 'destinationIata', l.destination_iata, 'departureAt', l.departure_at, 'arrivalAt', l.arrival_at) order by l.sequence) from public.schedule_event_legs l where l.schedule_event_id=e.id), '[]'::jsonb)
      ) order by e.day, e.starts_at) from public.schedule_events e
      where e.user_id=p.id and e.month=requested_month and e.year=requested_year
        and (e.source <> 'manual' or e.visibility in ('friends','public'))), '[]'::jsonb)
    ) as user_data
    from public.profiles p
    where p.id = any(friend_user_ids)
      and exists (select 1 from public.friend_requests r where r.status='accepted' and ((r.sender_id=auth.uid() and r.receiver_id=p.id) or (r.sender_id=p.id and r.receiver_id=auth.uid())))
  ) users;
  return coalesce(result, jsonb_build_object('users','[]'::jsonb));
end;
$$;
grant execute on function public.load_friend_schedule(uuid[], int, int) to authenticated;
