# Little Wall

> A little place to share.

A simple, public message wall inspired by classic Facebook walls. Visitors can write short thoughts, choose their mood of the day, and watch the public feed update in realtime.

---

## Tech Stack

- **Framework:** Next.js (App Router, JavaScript)
- **Styling:** Tailwind CSS
- **Database & Realtime:** Supabase (PostgreSQL + Realtime WebSockets)
- **Deployment:** Vercel

---

## Features

- 🌐 **No Login Required:** Anyone can share as `Guest`.
- 📝 **Short Messages:** Max 280 characters with live counter.
- 😎 **Mood of the Day:** Pick from Happy 😊, Chill 😎, Tired 🥱, or Gaming 🎮 (default: Chill).
- ⚡ **Realtime Feed:** Automatically displays incoming posts from other visitors without page refresh.
- 🔒 **Database Security:** Protected by PostgreSQL CHECK constraints and Row Level Security (RLS). Anonymous visitors can only read and insert.

---

## Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- A free account at [Supabase](https://supabase.com/)

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd little-wall
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root of `little-wall`:

```bash
cp .env.example .env.local
```

Fill in your project credentials from your Supabase Dashboard (**Settings** > **API**):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-publishable-anon-key
```

> ⚠️ **Important:** Never use or commit the `service_role` key. Use only the `anon` / `publishable` key.

### 4. Supabase Database Setup

1. Go to your Supabase project dashboard.
2. Open the **SQL Editor** from the left navigation.
3. Open `supabase-setup.sql` from this repository, copy its contents, and run it.
4. Verify in the **Table Editor** that the `posts` table exists with Row Level Security (RLS) enabled.

### 5. Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deploying to Vercel

1. Push this project to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete Little Wall with Supabase Realtime"
   git branch -M main
   git remote add origin https://github.com/<your-username>/little-wall.git
   git push -u origin main
   ```

2. Sign in to [Vercel](https://vercel.com/) and click **Add New** > **Project**.
3. Import your `little-wall` GitHub repository.
4. In the **Environment Variables** section, add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase publishable/anon key
5. Click **Deploy**. Vercel will build and launch your application with a public HTTPS URL!
