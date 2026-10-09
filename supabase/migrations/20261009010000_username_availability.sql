create or replace function public.is_username_available(candidate_username text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  normalized_username text := lower(trim(coalesce(candidate_username, '')));
begin
  if normalized_username !~ '^[a-z0-9_-]{3,30}$' then
    return false;
  end if;

  return not exists (
    select 1
    from public.profiles
    where username = normalized_username
  );
end;
$$;

revoke all on function public.is_username_available(text) from public;
grant execute on function public.is_username_available(text) to authenticated;
