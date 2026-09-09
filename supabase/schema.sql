create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  airline text not null default 'Iberia',
  base text not null default 'MAD',
  base_city text,
  username text not null,
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
  time_range text,
  type text,
  flight_number text,
  situated boolean default false,
  firma_time text,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table schedule_events enable row level security;

-- cada usuario solo ve y modifica sus propios datos
create policy "profiles_owner" on profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "schedule_events_owner" on schedule_events
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
