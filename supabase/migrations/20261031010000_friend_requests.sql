create table if not exists public.friend_requests (
  id uuid primary key default gen_random_uuid(), sender_id uuid not null references public.profiles(id) on delete cascade, receiver_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'rejected')), created_at timestamptz not null default now(), updated_at timestamptz not null default now(), constraint friend_requests_not_self check (sender_id <> receiver_id)
);
create unique index if not exists friend_requests_pending_unique_idx on public.friend_requests (least(sender_id, receiver_id), greatest(sender_id, receiver_id)) where status = 'pending';
alter table public.friend_requests enable row level security;
create policy "friend_requests_read_own" on public.friend_requests for select using (auth.uid() = sender_id or auth.uid() = receiver_id);
create policy "friend_requests_insert_own" on public.friend_requests for insert with check (auth.uid() = sender_id);
create policy "friend_requests_update_received" on public.friend_requests for update using (auth.uid() = receiver_id) with check (auth.uid() = receiver_id);

create or replace function public.search_profiles(search_term text) returns table (id uuid, username text, airline text, base text, base_city text) language sql stable security definer set search_path = public as $$ select p.id,p.username,p.airline,p.base,p.base_city from public.profiles p where auth.uid() is not null and p.id <> auth.uid() and lower(p.username) like '%'||lower(trim(coalesce(search_term,'')))||'%' order by p.username limit 8 $$;
create or replace function public.send_friend_request(target_user_id uuid) returns public.friend_requests language plpgsql security definer set search_path = public as $$ declare result public.friend_requests; begin
  if auth.uid() is null or target_user_id is null or auth.uid()=target_user_id then raise exception 'invalid_friend_target' using errcode='22023'; end if;
  if not exists(select 1 from public.profiles where id=target_user_id) then raise exception 'friend_target_not_found' using errcode='P0002'; end if;
  if exists(select 1 from public.friend_requests where status='accepted' and ((sender_id=auth.uid() and receiver_id=target_user_id) or (sender_id=target_user_id and receiver_id=auth.uid()))) then raise exception 'already_friends' using errcode='23505'; end if;
  if exists(select 1 from public.friend_requests where status='pending' and ((sender_id=auth.uid() and receiver_id=target_user_id) or (sender_id=target_user_id and receiver_id=auth.uid()))) then raise exception 'request_already_pending' using errcode='23505'; end if;
  insert into public.friend_requests(sender_id,receiver_id) values(auth.uid(),target_user_id) returning * into result; return result; end $$;
create or replace function public.load_friendships() returns jsonb language sql stable security definer set search_path = public as $$ select jsonb_build_object(
 'friends',coalesce((select jsonb_agg(jsonb_build_object('id',p.id,'username',p.username,'airline',p.airline,'base',p.base,'base_city',p.base_city) order by p.username) from public.friend_requests r join public.profiles p on p.id=case when r.sender_id=auth.uid() then r.receiver_id else r.sender_id end where r.status='accepted' and (r.sender_id=auth.uid() or r.receiver_id=auth.uid())),'[]'::jsonb),
 'received',coalesce((select jsonb_agg(jsonb_build_object('id',r.id,'username',p.username,'airline',p.airline,'base',p.base,'base_city',p.base_city,'created_at',r.created_at) order by r.created_at desc) from public.friend_requests r join public.profiles p on p.id=r.sender_id where r.receiver_id=auth.uid() and r.status='pending'),'[]'::jsonb),
 'sent',coalesce((select jsonb_agg(jsonb_build_object('id',r.id,'username',p.username,'airline',p.airline,'base',p.base,'base_city',p.base_city,'created_at',r.created_at) order by r.created_at desc) from public.friend_requests r join public.profiles p on p.id=r.receiver_id where r.sender_id=auth.uid() and r.status='pending'),'[]'::jsonb)) where auth.uid() is not null $$;
create or replace function public.respond_friend_request(request_id uuid,next_status text) returns public.friend_requests language plpgsql security definer set search_path = public as $$ declare result public.friend_requests; begin
  if next_status not in('accepted','rejected') then raise exception 'invalid_request_status' using errcode='22023'; end if;
  update public.friend_requests set status=next_status,updated_at=now() where id=request_id and receiver_id=auth.uid() and status='pending' returning * into result;
  if result.id is null then raise exception 'friend_request_not_found' using errcode='P0002'; end if; return result; end $$;
grant select,insert,update on table public.friend_requests to authenticated;
grant execute on function public.search_profiles(text),public.send_friend_request(uuid),public.load_friendships(),public.respond_friend_request(uuid,text) to authenticated;

create or replace function public.remove_friendship(friend_user_id uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null or friend_user_id is null or not exists (
    select 1 from public.friend_requests
    where status = 'accepted'
      and ((sender_id = auth.uid() and receiver_id = friend_user_id)
        or (sender_id = friend_user_id and receiver_id = auth.uid()))
  ) then
    raise exception 'friendship_not_found' using errcode = 'P0002';
  end if;
  delete from public.friend_requests
  where status = 'accepted'
    and ((sender_id = auth.uid() and receiver_id = friend_user_id)
      or (sender_id = friend_user_id and receiver_id = auth.uid()));
end;
$$;

grant execute on function public.remove_friendship(uuid) to authenticated;
