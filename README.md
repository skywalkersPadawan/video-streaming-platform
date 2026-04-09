# Video streaming platform

A Netflix-style web app with a **Next.js** frontend, **NestJS** API, **PostgreSQL** (via Prisma), and **The Movie Database (TMDB)** for catalog data. Users can browse categories, open a preview modal, manage a personal list, sign in, and watch content via **HLS** when packaged streams exist, with a **YouTube trailer** fallback when they do not.

---

## Repository layout

| Path | Role |
|------|------|
| `frontend/` | Next.js 16 app (App Router, Tailwind CSS, HLS.js) |
| `backend/` | NestJS REST API, Prisma, static HLS under `/streams` |
| `backend/prisma/` | Schema and migrations |
| `backend/streams/` | Optional on-disk HLS output (served as static files) |

---

## Prerequisites

- **Node.js** 18.x or newer (the backend `package.json` targets Node 18; the frontend works on current LTS).
- **npm** (or compatible client) for installing dependencies.
- **PostgreSQL** for Prisma (`DATABASE_URL`).
- A **TMDB API key** ([themoviedb.org](https://www.themoviedb.org/settings/api)) for the catalog and trailer metadata on the frontend.

---

## Environment variables

### Backend (`backend/.env`)

Create `backend/.env` (this file is not committed). Prisma reads it for migrations and the running app.

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string, e.g. `postgresql://USER:PASSWORD@localhost:5432/DATABASE` |
| `PORT` | No | HTTP port for the API (default **3001**) |

JWT signing uses a hardcoded secret in `auth.module.ts` / `jwt.strategy.ts` for local development. For any shared or production deployment, move that to an environment variable and rotate the secret.

### Frontend (`frontend/.env.local` or `frontend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Yes | Base URL of the Nest API, e.g. `http://localhost:3001` (no trailing slash). Used for my list, watch history, and stream checks. |
| `NEXT_PUBLIC_TMDB_API_KEY` | Yes | TMDB API key for movie rows, hero banner, watch-page trailer fallback, and my-list poster lookups. |

Restart the Next dev server after changing these.

---

## Database setup

From the **backend** directory:

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate deploy
```

For a new database (or first-time dev), apply migrations so tables such as `User`, `MyList`, and `WatchHistory` exist. During development you can use `npx prisma migrate dev` instead of `deploy` when you are creating new migrations.

---

## Optional: HLS streams on disk

The API serves static files from `backend/streams/` at the URL prefix **`/streams`** (see `backend/src/main.ts`). The watch page requests:

`{NEXT_PUBLIC_API_URL}/streams/{movieId}/master.m3u8`

If that URL responds successfully, the client plays HLS (native or via **hls.js**). If not, it tries to load a TMDB **YouTube trailer** instead.

Place or generate an HLS package under `backend/streams/<movieId>/` with a `master.m3u8` entry point so IDs line up with TMDB numeric movie IDs used in the UI.

---

## Local development

Run **PostgreSQL**, set `backend/.env`, then start the API and the web app in two terminals.

**Terminal 1 — API**

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate deploy
npm run start:dev
```

Default URL: **http://localhost:3001**  
Interactive API docs (Swagger UI): **http://localhost:3001/api**

**Terminal 2 — Frontend**

```bash
cd frontend
npm install
npm run dev
```

Default URL: **http://localhost:3000**

CORS is configured in `backend/src/main.ts` for **`http://localhost:3000`**. For another origin or production, update `enableCors` accordingly.

---

## Build for production

**Backend**

```bash
cd backend
npm install
npm run build
npm run start:prod
```

Runs the compiled app from `dist/` (`node dist/main`). Set `PORT` and `DATABASE_URL` in the environment of the host or container.

If you see `Cannot find module '.../dist/main'`, run **`npm run build`** in `backend/` first so `dist/main.js` exists. Do not run `node dist/main` or `npm run start:prod` without a successful build.

**Frontend**

```bash
cd frontend
npm install
npm run build
npm run start
```

`next start` serves the production build (default port **3000**). Set `NEXT_PUBLIC_*` at build time so the client bundle points at the correct API and TMDB key.

---

## Linting and tests

**Frontend**

```bash
cd frontend
npm run lint
```

**Backend**

```bash
cd backend
npm run lint
npm run test
npm run test:e2e
```

---

## API overview (high level)

Swagger at **`/api`** lists routes and schemas. Commonly used groups:

- **`/auth`** — Login and session-related endpoints.
- **`/users`** — User registration and listing (see controller for details).
- **`/videos`** — Video CRUD and upload flows (see `videos.controller.ts`).
- **`/my-list`** — Add, remove, and list saved TMDB movie IDs per user.
- **`/watch-history`** — Save and fetch playback progress per `userId` and `movieId`.

Static streaming assets are not under Swagger; they are served as files under **`/streams/...`**.

---

## Frontend features

- **Home** — TMDB-driven rows (e.g. trending, top rated, genres) via `VideoRow`, hero banner, and preview **modal** (backdrop, overview, play / my list).
- **Watch** — HLS playback when `master.m3u8` exists; otherwise embedded YouTube trailer from TMDB.
- **My List** — Persists list entries through the backend; enriches entries with TMDB details where needed.
- **Auth pages** — Login and sign-up flows aligned with the Nest auth API.

---

## Architecture (data flow)

```text
TMDB API  →  Next.js (catalog, images, trailer metadata)
PostgreSQL  ←→  NestJS + Prisma  ←→  Next.js (my list, watch history, auth)
Optional HLS files  →  Nest static `/streams`  →  Next.js video / hls.js
```

---

## License

See individual packages (`backend` / `frontend`) for license fields; the project is under MIT license

