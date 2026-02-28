# Creature Codex — Animal Encyclopedia

An educational animal encyclopedia and conservation platform built with Next.js 15, featuring a comprehensive database of animal species.

## Architecture

- **Framework**: Next.js 15.3.2 (App Router, webpack) with React 19
- **Styling**: Tailwind CSS v3 with PostCSS
- **Database**: SQLite via custom HTTP proxy (`@kilocode/app-builder-db`)
- **Auth**: NextAuth.js v5 (credentials-based)
- **ORM**: Drizzle ORM with SQLite dialect
- **Runtime**: Node.js 20 for Next.js, Bun 1.2 for SQLite proxy server

## Key Files

- `sqlite-server.ts` — Local SQLite HTTP proxy server (runs on port 3001)
- `start.sh` — Dev startup script (starts SQLite server, then Next.js on port 5000)
- `start-prod.sh` — Production startup script
- `src/db/schema.ts` — Database schema (users, submittedAnimals)
- `src/db/index.ts` — Database client initialization
- `src/lib/animals.ts` — Static animal dataset (175KB, ~250 species)
- `src/lib/auth.ts` — NextAuth configuration

## Database

Uses a SQLite proxy pattern via `@kilocode/app-builder-db`:
- SQLite file stored at `./data/app.db`
- HTTP proxy server runs locally on port 3001
- Env vars: `DB_URL=http://localhost:3001`, `DB_TOKEN=local-dev-token`
- Migrations auto-run at startup via `sqlite-server.ts`

## Environment Variables

- `AUTH_SECRET` — NextAuth.js session encryption secret (set in Replit Secrets)
- `DB_URL` — SQLite proxy URL (set to `http://localhost:3001`)
- `DB_TOKEN` — SQLite proxy auth token (set to `local-dev-token`)

## User Roles

- `user` — Standard user, can submit animals
- `moderator` — Can approve/reject animal submissions
- `admin` — Full access including user role management

## Running

```bash
bun run dev     # Starts SQLite server + Next.js on port 5000
bun run build   # Production build
bun run start   # Start production server
```

## Important Notes

- Tailwind CSS was downgraded from v4 to v3 to fix webpack compilation hangs
- Next.js uses webpack (not Turbopack) due to stability issues in this environment  
- Node.js 20 is used to run Next.js (not Bun) for runtime compatibility
- The `allowedDevOrigins` config allows requests through Replit's proxy
