create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  airline text not null default 'Iberia',
  base text not null default 'MAD',
  base_city text,
  username text not null,
  display_time_zone text not null default 'base',
  include_manual_events_in_pdf boolean not null default true,
  public_calendar_enabled boolean not null default false,
  public_calendar_pin_hash text,
  updated_at timestamptz not null default now()
);

create table if not exists schedule_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  day int not null,
  month int not null,
  year int not null,
  label text not null,
  description text,
  starts_at timestamptz,
  ends_at timestamptz,
  type text,
  flight_number text,
  situated boolean default false,
  firma_at timestamptz,
  source text not null default 'imported',
  visibility text not null default 'private',
  created_at timestamptz not null default now()
);

-- Añade los campos al esquema si la tabla se creó con una versión anterior.
alter table profiles
  add column if not exists display_time_zone text not null default 'base',
  add column if not exists include_manual_events_in_pdf boolean not null default true,
  add column if not exists public_calendar_enabled boolean not null default false,
  add column if not exists public_calendar_pin_hash text;
alter table schedule_events
  add column if not exists starts_at timestamptz,
  add column if not exists ends_at timestamptz,
  add column if not exists firma_at timestamptz,
  add column if not exists source text not null default 'imported',
  add column if not exists visibility text not null default 'private';

-- No hay datos heredados que migrar: los instantes se guardan únicamente en UTC.
alter table schedule_events
  drop column if exists time_range,
  drop column if exists firma_time;

alter table profiles enable row level security;
alter table schedule_events enable row level security;

-- cada usuario solo ve y modifica sus propios datos
create policy "profiles_owner" on profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "schedule_events_owner" on schedule_events
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create unique index if not exists profiles_username_unique_idx on profiles (username);
