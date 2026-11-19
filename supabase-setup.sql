-- ============================================
-- Little Wall — Database Setup
-- Run this in Supabase SQL Editor (all at once)
-- ============================================

-- 1. Create the posts table
create table public.posts (
  id         uuid         primary key default gen_random_uuid(),
  author     text         not null default 'Guest',
  message    text         not null
    constraint message_length check (char_length(message) between 1 and 280),
  mood       text         not null default 'Chill'
    constraint valid_mood check (mood in ('Happy', 'Chill', 'Tired', 'Gaming')),
  created_at timestamptz  not null default now()
);

-- 2. Grant table permissions to anon (public) and authenticated roles
grant select, insert on table public.posts to anon;
grant select, insert on table public.posts to authenticated;

-- 3. Enable Row Level Security
alter table public.posts enable row level security;

-- 4. Allow anyone to read posts
create policy "Anyone can read posts"
  on public.posts
  for select
  to anon
  using (true);

-- 5. Allow anyone to insert posts
create policy "Anyone can insert posts"
  on public.posts
  for insert
  to anon
  with check (true);

-- Note: No UPDATE or DELETE policies = anon users cannot modify or remove posts.

-- 6. Enable Realtime for the posts table
alter publication supabase_realtime add table public.posts;
