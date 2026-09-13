create table if not exists swiftair_calendar_sources (
  user_id uuid primary key references auth.users(id) on delete cascade,
  webcal_url text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table swiftair_calendar_sources enable row level security;

create policy "swiftair_calendar_sources_owner" on swiftair_calendar_sources
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists swiftair_synced_events (
  schedule_event_id uuid primary key references schedule_events(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  uid text not null,
  starts_at timestamptz,
  day int not null,
  month int not null,
  year int not null,
  created_at timestamptz not null default now()
);

alter table swiftair_synced_events enable row level security;
