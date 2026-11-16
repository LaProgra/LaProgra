create or replace function public.cancel_friend_request(request_id uuid)
returns public.friend_requests
language plpgsql
security definer
set search_path = public
as $$
declare
  result public.friend_requests;
begin
  if auth.uid() is null then
    raise exception 'not_authenticated' using errcode = '42501';
  end if;

  delete from public.friend_requests
  where id = request_id
    and sender_id = auth.uid()
    and status = 'pending'
  returning * into result;

  if result.id is null then
    raise exception 'friend_request_not_found' using errcode = 'P0002';
  end if;

  return result;
end;
$$;

grant execute on function public.cancel_friend_request(uuid) to authenticated;
