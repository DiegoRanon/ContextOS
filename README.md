## contextOS — Demo-ready Next.js + Supabase App

**contextOS** is a small, production-style web app that demonstrates modern authentication, secure server-side data access, and a simple productivity domain: **Contexts** (projects/areas of focus) and **Sessions** (time-tracked work blocks with notes).

This README is written as a **professional demo presentation** for recruiters and hiring managers: what the app does, how it behaves, and how to walk through it quickly.

## Product pitch (what you can evaluate fast)

- **Authentication**: register, login, change password, view profile (Supabase Auth)
- **CRUD domain model**: create contexts, create sessions inside a context
- **Real-time-ish tracking**: update session duration while working
- **Modern stack choices**: App Router, Server Actions + Route Handlers, SSR-safe Supabase helpers, TypeScript, Tailwind

## Demo flow (3–5 minutes)

Use this as a live walkthrough script:

1. **Landing → Auth**
   - Go to `/register`, create a user, then `/login`.
2. **Profile sanity check**
   - Visit `/my-profile` to confirm the authenticated user identity.
3. **Create a context**
   - Go to `/create-context`, create a context (think “Project: Mobile App”, “Focus: Interview Prep”).
4. **Dashboard overview**
   - Visit `/dashboard` to show the list of contexts and navigation.
5. **Create a session inside a context**
   - Open a specific context at `/context/[id]`.
   - Create a session via `/session/create?contextId=...`.
6. **Track a session**
   - Open `/session/[id]` and demonstrate duration tracking + notes.
   - Explain that duration updates are persisted through `POST /api/session/[id]/duration` for the logged-in user.
7. **Security checkpoint**
   - Log out (or switch accounts) and verify the app respects authenticated access patterns.

## Current features (implemented)

- **Auth**
  - **Register**: create an account (`/register`)
  - **Login**: sign in (`/login`)
  - **Change password**: update credentials (`/change-password`)
  - **My profile**: view logged-in identity (`/my-profile`)
- **Contexts**
  - **Dashboard**: list contexts (`/dashboard`)
  - **Create context**: add a new context (`/create-context`)
  - **Context details**: open a context by id (`/context/[id]`)
- **Sessions**
  - **Create session**: create a session under a context (`/session/create?contextId=...`)
  - **Session details**: view session, notes, duration (`/session/[id]`)
  - **Duration updates API**: route handler to persist duration (`POST /api/session/[id]/duration`)

## Architecture (what’s interesting technically)

- **Next.js App Router**: server-rendered pages + colocated route handlers.
- **Server Actions**: used for mutations from UI to server with minimal client boilerplate.
- **Supabase Auth + SSR**: authentication and session handling via `@supabase/ssr` utilities for server-safe access.
- **TypeScript everywhere**: predictable data shapes and safer refactors.
- **Tailwind CSS v4**: consistent UI styling with reusable UI primitives under `app/components/ui/`.

## Tech stack

- **Next.js 16** (App Router) + **React 19**
- **Supabase Auth** + **@supabase/ssr**
- **Tailwind CSS v4**
- **TypeScript**

## Key routes (for reviewers)

- **Auth**
  - `/register`
  - `/login`
  - `/change-password`
  - `/my-profile`
- **App**
  - `/dashboard` (list contexts)
  - `/create-context`
  - `/context/[id]`
  - `/session/create?contextId=...`
  - `/session/[id]`
- **API**
  - `POST /api/session/[id]/duration` (updates a session’s duration for the logged-in user)

## Local setup (for a quick evaluation)

### Requirements

- **Node.js**: `>= 20` (see `package.json`)
- **npm** (recommended)

### Quick start (local)

1. Install dependencies

```bash
npm install
```

2. Create your env file

```bash
copy env.example .env.local
```

Fill in:

- **NEXT_PUBLIC_SUPABASE_URL**
- **NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY**
- **NEXT_PUBLIC_SITE_URL** (optional but recommended)

3. Run the dev server

```bash
npm run dev
```

App will be available at `http://localhost:3000`.

### Scripts

```bash
npm run dev     # start dev server
npm run build   # production build
npm run start   # start production server (after build)
npm run lint    # eslint
```

## Project structure (high level)

- `app/`: pages, server actions, and route handlers
- `lib/supabase/`: Supabase client helpers (`server.ts`, `client.ts`, `proxy.ts`) and shared types
- `app/components/`: shared UI components

## Author

**Diego Ranon**
LinkedIn: [diego-ranon-986b0120a](https://www.linkedin.com/in/diego-ranon-986b0120a/)
