alter table profiles
  add column if not exists show_rest_day_events boolean not null default false;
