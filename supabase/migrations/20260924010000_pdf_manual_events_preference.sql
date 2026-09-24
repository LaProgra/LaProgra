alter table profiles
  add column if not exists include_manual_events_in_pdf boolean not null default true;
