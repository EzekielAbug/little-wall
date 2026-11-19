# Little Wall — Project Specification

**Tagline:** A little place to share.

A simple, public message wall where visitors write short messages that appear in a realtime feed.

## Stack

- JavaScript, React, Next.js (App Router)
- Tailwind CSS
- Supabase (PostgreSQL + Realtime)
- `@supabase/supabase-js`
- Deployed on Vercel

## Features

- Public feed — no authentication required.
- Write a message (1–280 characters) as "Guest".
- Select a mood: Happy 😊, Chill 😎, Tired 🥱, Gaming 🎮 (default: Chill).
- Realtime: new posts appear for all viewers without refresh.
- Messages persist across page reloads.

## Database

One table: `posts`

| Column     | Type         | Notes                                 |
|------------|--------------|---------------------------------------|
| id         | UUID         | PK, auto-generated                    |
| author     | TEXT         | Default `Guest`                       |
| message    | TEXT         | Required, 1–280 chars                 |
| mood       | TEXT         | Allowed values enforced; default Chill |
| created_at | TIMESTAMPTZ  | Default `now()`                       |

## Security

- RLS enabled: anon can SELECT and INSERT only.
- Message length and mood values enforced by CHECK constraints.
- Only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` on the client.
- `service_role` key never exposed.

## UI

Classic Facebook-wall layout: blue navbar, left profile sidebar, main content with composer and feed. Responsive. Clean, lightweight design.

## Scope Restrictions

No auth, likes, comments, friends, messaging, editing/deleting posts, admin, search, pagination, or analytics.
