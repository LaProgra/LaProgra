create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  airline text not null default 'Iberia',
  base text not null default 'MAD',
  base_city text,
  username text not null,
  display_time_zone text not null default 'base',
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
  created_at timestamptz not null default now()
);

-- Añade los campos al esquema si la tabla se creó con una versión anterior.
alter table profiles
  add column if not exists display_time_zone text not null default 'base';
alter table schedule_events
  add column if not exists starts_at timestamptz,
  add column if not exists ends_at timestamptz,
  add column if not exists firma_at timestamptz;

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
