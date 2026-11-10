# Deployment Guide

ViralPost AI ships as a single Next.js **standalone** build with a SQLite
file database — one process, zero external services. This guide covers the
supported production paths and the environment contract. (Rewritten at
session 9, F9-4 — the previous text still described the scaffold's ORBITAL
era: its name, its 29-route/41-handler census, and the pre-boot-gate
AUTH_SECRET semantics that session-170 retired.)

## 1. Build

```bash
bun install
bun run build          # next build + standalone assembly (.next/standalone)
```

The build compiles the page shell and the 13 API route files (11 verb
handlers — the auth family's eight, contact, generate, health — plus
the two JSON-envelope 404 catch-alls: `src/app/api/[...path]/route.ts`
and the bare-`/api` `src/app/api/route.ts`), then
copies `.next/static` and `public/` into `.next/standalone/` (see the
`build` script in `package.json`). `next.config.ts` pins
`outputFileTracingRoot` to the repo root — keep it; the standalone trace
depends on it.

## 2. Run

```bash
bun run start          # NODE_ENV=production bun .next/standalone/server.js
```

The server listens on port 3000 by default (`PORT` overrides). Always
start it from the repo root via the npm/bun script — the scripts
guarantee the working directory that the SQLite path resolution and the
standalone trace rely on. **Cookie scheme note (session-67):** the
session cookie's `Secure` flag derives from `NODE_ENV` (set in
production boots) — the app NEVER reads `X-Forwarded-Proto` or any other
request header to decide it. Behind an HTTPS-terminating reverse proxy
that speaks plain HTTP to the app, `NODE_ENV=production` is what marks
the cookie `Secure`; a plain-HTTP production boot still sets `Secure`,
and browsers will silently drop the cookie (a login loop) — serve the
app over HTTPS end-to-end or terminate TLS at the app process if you
must run without the flag.

## 3. Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | Yes | SQLite connection string. See §4. |
| `AUTH_SECRET` | **Yes in production** | HMAC secret for session cookies. Generate with `openssl rand -hex 32`. Must be at least 16 characters — in production a missing or shorter value FAILS HARD AT BOOT (session-170: `src/instrumentation.ts` → `src/lib/boot-env.ts` refuses to serve; the `[boot]` message names this file and the openssl command). Never ship the dev fallback constant. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical public origin, used for metadataBase, the OG/Twitter cards, `robots.txt` and `sitemap.xml` (e.g. `https://viralpost.example.com`). **Inlined at build time** — set it BEFORE `bun run build`; the boot gate warns when production would advertise a localhost origin. |
| `VIRALPOST_PROXY_HOPS` | **Declare it in production** | Trusted proxy depth for the rate-limit IP keying (unset = 1 — exactly one appending proxy; 0 = direct exposure; N ≥ 2 = N trusted appending proxies). Unparsable/negative values fail closed onto 1. **Session-9, F9-1:** the boot gate WARNS when this is unset in production — under DIRECT exposure (no proxy in front of the app) the default lets a client rotating a forged `x-forwarded-for` value mint a fresh rate-limit bucket per request; set `0` for direct exposure or the hop count behind a proxy chain. **Session-14, S14-8 (the availability side of `0`):** depth 0 keys every caller into ONE shared per-route bucket (the header family is untrustworthy without a proxy), so the whole deployment shares a single ceiling — 10 logins / 15 min for ALL users combined. Depth 0 suits single-user and test deployments; a multi-user direct-exposure deployment should front the app with a proxy (any TLS terminator) and declare depth 1. |
| `VIRALPOST_DISABLE_IN_APP_OTP` | Production with a mail transport | Set to `1` when a real mail transport owns verification-code delivery — the signup/resend responses stop carrying the code. Leave unset for the self-hosted demo posture (the code rides the response). |
| `VIRALPOST_DISABLE_IN_APP_RESET` | Production with a mail transport | Set to `1` when a real mail transport owns reset-link delivery — the forgot-password response stops carrying the link (the no-enumeration 200 is unchanged either way). |

## 4. Database location (§4 — the `.env.example` reference)

`DATABASE_URL` accepts three forms:

1. **Relative `file:` URL (the default, zero-config local story).**
   ```
   DATABASE_URL="file:../db/custom.db"
   ```
   Relative URLs resolve against the **`prisma/` directory that owns
   `schema.prisma`** — exactly like the Prisma CLI — so this string points
   at `<repo>/db/custom.db` for `prisma db push`, `prisma/seed.ts`,
   `next build` and the running server alike, regardless of the process
   working directory. The resolution rule lives in `src/lib/db-path.ts`
   and is pinned by `tests/db-path.test.ts`.

2. **Absolute `file:` URL (recommended for production).**
   ```
   DATABASE_URL="file:/var/lib/viralpost/custom.db"
   ```
   Absolute paths pass through untouched — immune to any working-directory
   ambiguity across service managers, containers, or cron wrappers. Point
   them at a persisted volume and back the file up.

3. **PostgreSQL.** Switch `provider = "postgresql"` in
   `prisma/schema.prisma`, set a `postgresql://` URL, then
   `bun run db:push && bun run db:seed`.

Initialize (or reset) the database with:

```bash
bun run db:push        # apply schema (db push — no migrations folder)
bun run db:seed        # idempotent demo user (wipes the contact inbox)
```

`db/*.db` is gitignored; every fresh clone recreates it from the two
commands above.

**Re-seeding restores the demo credentials (session-17):** the seed's
upsert update-path resets every seeded field — the demo password back to
the publicly documented `$Abcd1234` and `tokenVersion` back to 0 (which
re-validates any pre-reset v0 session cookies). An operator who changed
the demo password (or reset it via the forgot-password funnel) and later
runs `db:seed` reverts both. On an internet-exposed deployment, either
delete the demo row after seeding or never re-seed.

**Seed before exposing (the first-signup admin rule, noted session 10):**
signup assigns `role: "admin"` to the account created when the user table
is EMPTY and `"user"` to everyone after — an UNSEEDED production database
therefore makes its first verified signup the admin. Run `db:seed` (or
create your own account first) before the app is reachable by anyone you
don't trust with the admin row. No authorization gate reads `role` today;
the value is the self-hosted operator's affordance.

## 5. Updating

```bash
git pull
bun install
bunx prisma generate   # after schema changes
bun run db:push
bun run build
# restart the server process
```

## 6. Verification checklist

```bash
curl -s https://your-host/api/health
# {"ok":true,"data":{"status":"healthy","db":"up"}}
bun run lint && bun run typecheck && bun run test
bun run gate                                  # the one-command gate (local)
bun run test:e2e                              # Playwright suite (local)
```

## 7. Common production issues

| Symptom | Cause | Fix |
|---------|-------|-----|
| `Error code 14: Unable to open the database file` | Server started from a directory that has no `prisma/schema.prisma` and no absolute `DATABASE_URL` | Start via `bun run start`, or set an absolute `file:` URL (§4) |
| The server refuses to boot, the log names `AUTH_SECRET` | The production boot gate (session-170): missing/short secret | Generate one with `openssl rand -hex 32`, set `AUTH_SECRET`, restart |
| Logins loop back to `/login` | `AUTH_SECRET` changed between restarts | Keep the secret stable across restarts |
| Rate-limited logins (429) | 10 attempts/IP/15 min fixed window | Wait for `Retry-After`, or restart to clear the in-memory buckets (single-node). Behind a reverse proxy, verify `VIRALPOST_PROXY_HOPS` matches the chain (§3) — a wrong depth merges every client into one bucket |
| `[boot] VIRALPOST_PROXY_HOPS is unset in production` | The session-9 trust-default warning (F9-1) | Declare the topology: `0` under direct exposure, or the proxy hop count behind a chain (§3) |
