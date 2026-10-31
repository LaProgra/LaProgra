create or replace function public.remove_friendship(friend_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null
     or friend_user_id is null
     or not exists (
       select 1
       from public.friend_requests
       where status = 'accepted'
         and (
           (sender_id = auth.uid() and receiver_id = friend_user_id)
           or
           (sender_id = friend_user_id and receiver_id = auth.uid())
         )
     )
  then
    raise exception 'friendship_not_found' using errcode = 'P0002';
  end if;

  delete from public.friend_requests
  where status = 'accepted'
    and (
      (sender_id = auth.uid() and receiver_id = friend_user_id)
      or
      (sender_id = friend_user_id and receiver_id = auth.uid())
    );
end;
$$;

grant execute on function public.remove_friendship(uuid)
to authenticated;