alter table profiles
  add column if not exists public_calendar_enabled boolean not null default false,
  add column if not exists public_calendar_pin_hash text;

update profiles set username = lower(trim(username));

create unique index if not exists profiles_username_unique_idx on profiles (username);

alter table profiles enable row level security;
