alter table schedule_events
  add column if not exists source text not null default 'imported',
  add column if not exists visibility text not null default 'private';
