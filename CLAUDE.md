---
IMPORTANT: File is read fresh for every conversation. Be brief and practical.
---

# ViralPost AI

**Tech Stack**: Next.js 16 (App Router, standalone), React 19, TypeScript
strict, Tailwind CSS 4 (CSS-first), Prisma + SQLite, Zod, Vitest + Playwright.

A self-hostable clone of `https://viralpostai.base44.app/` — an AI social
media post generator — that is a **functional superset with visual parity**:
the reference's marketing site, generator, and auth funnel, plus the fixes
for its own defects (a 402-dead generator, a stubbed contact form, an SPA
that answers 200 for unknown routes). Maintained by nordeim; built and
remediated by AI agents under the Meticulous Approach.

## Core Identity & Purpose

- The app does ONE thing well: describe a post idea → get a viral-ready
  post (hook first line, 1-2 sentence paragraphs, 5-8 hashtags, < 200
  words) with a copy round-trip and a 3/day free quota.
- Everything the reference advertises must actually work here (the
  "superset" doctrine); everything the reference shows must look the same
  (the "parity" doctrine). Deviations are recorded, never silent
  (`docs/implementation-plan.md` §6).
- The codebase is the template family's inheritor: auth, db-path, and
  rate-limit seams come from the battle-tested NEO-CRM scaffold; the
  domain is entirely ViralPost AI's.

## Foundational Principles

### Meticulous Approach (Six-Phase Workflow)

1. **ANALYZE** — never surface-level; read files/docs/tests in full;
   prefer executable truth over prose; check what the reference app
   actually does live before assuming.
2. **PLAN** — the smallest correct, sequential, verifiable plan; write it
   to `docs/plans/` for the record.
3. **VALIDATE** — check the plan against acceptance criteria and the
   running codebase before executing.
4. **IMPLEMENT** — small typed increments, TDD at the pure seams, lint
   and types green throughout.
5. **VERIFY** — the full gate (`bun run gate`) + a live parity walk
   against the reference for anything visual.
6. **DELIVER** — atomic Conventional Commit to `main`, docs lockstep,
   push via the SSH wrapper, honest handoff (Verified / Reasoned /
   Assumed / Unverifiable).

### Project-Specific Principles

- **Parity claims need live evidence.** Every "matches the reference"
  claim traces to a capture, a computed style, or a bundle decode
  (`docs/reference-investigation.md` is the evidence ledger).
- **Superset, never regression.** Fix the reference's bugs, keep the
  fixes documented in the Deviations Ledger.
- **Degrade, never fail.** Optional integrations carry deterministic
  fallbacks (the generator works with zero external keys).
- **Pure seams, tested.** Logic that can break silently lives in
  `src/lib/*.ts` with a Vitest spec; route handlers stay thin.
- **Count the things.** Tests, routes, models, env vars — when a count
  changes, `rg "<old number>"` the doc set in the same commit.

## Implementation Standards

### Next.js 16 Specific

- App Router conventions; Server Components by default; `"use client"`
  only where interactivity demands it.
- `output: "standalone"` with the build script's copy steps — the e2e and
  smoke layers run against THIS artifact, never the dev server.
- Metadata API: `pageMetadata()` from `src/lib/site.ts` builds every
  page's metadata (per-route titles, OG/Twitter, canonical). Pages never
  hand-roll metadata.
- `force-dynamic` on every data route.
- The icons ride the `icon.png` / `apple-icon.png` file conventions —
  declaring `metadata.icons` would REPLACE them.

### TypeScript Strict Mode

- `strict: true`; never `any` (`unknown` instead); early returns;
  interfaces for object shapes, types for unions.
- The build is the type gate — `ignoreBuildErrors` is never set.

### Tailwind CSS v4 (the trap catalog — all live in `globals.css`)

- CSS-first: tokens in `@theme` with **literal hex** (a bare HSL
  triplet silently resolves to transparent; v4's default oklch palette
  drifts from intended hexes).
- The `@custom-variant hover` unwrap keeps hover styles off touch devices.
- (Session-11: the vendored `tw-animate-css` is retired — dead bytes on a
  phantom Radix claim; the design-tokens censuses guard the theme.)
- Brand gradients interpolate in oklab — use inline styles where the
  reference's blend must be exact.
- Layout constants live in one test-pinned module (`src/lib/page-layout.ts`).

### React 19

- Never `useEffect(() => setState(...))` to copy props — remount-via-key
  or adjust-during-render.
- Persisted UI state uses `useSyncExternalStore` (see the quota counter).
- Auth navigation uses `router.refresh()`, never `window.location`.
- `<div onClick>` is banned — real buttons, `aria-label` when icon-only.

## Development Workflow

### Environment Setup

```bash
bun install
cp .env.example .env        # set AUTH_SECRET for non-dev work
bun run db:push && bun run db:seed
bun run dev
```

### Build Commands

| Command | Purpose |
|---------|---------|
| `bun run dev` | Dev server (port 3000) |
| `bun run build` | Production standalone build |
| `bun run lint` | ESLint, `--max-warnings 0` |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run test` | Vitest unit suite |
| `CI=1 bun run test:e2e` | Playwright against the build |
| `./scripts/smoke-test.sh` | 15-leg curl ladder |
| `bun run gate` | All of the above, in order |

### Database (Prisma)

```bash
bun run db:push     # schema → db/custom.db (dev; use migrate in prod)
bun run db:seed     # idempotent demo user
bun run db:census   # asserts the pristine contract (1 user, 0 messages)
```

Never `rm` a db file under a running server; a reseed keeps user ids
stable (upsert-by-email) so live sessions survive.

## Testing Strategy

- **Unit (Vitest)**: 37 files / 528 tests at the pure seams. TDD default
  (red → green) for new lib logic. Several suites pin SOURCE contracts
  textually (page-titles, design-tokens, typography) — update pins in the
  same commit as the markup they pin.
- **E2E (Playwright)**: 9 specs / 54 tests against the production build,
  own port + own `db/e2e.db`, one shared login via `storageState`,
  axe-core a11y assertions on every route at two widths.
- **Smoke (bash)**: 15 legs against the standalone artifact with a
  pinned env — health, page renders, auth round-trip, generator
  round-trip, SEO endpoints, the boot gate, artifact hygiene.
- **Parity walks**: agent-browser against the LIVE reference for anything
  visual — screenshots + computed styles, not eyeballs.

## Project-Specific Standards

### API Design

- Every handler: session gate (if needed) → bounded JSON read → Zod
  parse → Prisma → envelope. Never throw across the boundary.
- The envelope is absolute: `{ok, data} | {ok:false, error:{code, message}}`.
- Status discipline: 400 bad input, 401 auth gap, 404 unknown id, 429
  rate limit (+ `Retry-After`).

### Data Layer

- Two models: `User` (auth + verification + reset + tokenVersion) and
  `ContactMessage` (the contact inbox). The generator is stateless by
  design — no Generation row.
- `PrismaClient` is constructed in exactly one place (`src/lib/db.ts`),
  with the URL from `src/lib/db-path.ts` — never a direct env read.

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | `file:../db/custom.db` (SQLite) — resolves against `prisma/schema.prisma` |
| `AUTH_SECRET` | HMAC session key; production boot FAILS without ≥ 16 chars |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin; inlined at build time |
| `VIRALPOST_PROXY_HOPS` | Rate-limit IP trust depth (fails closed) |
| `VIRALPOST_DISABLE_IN_APP_OTP` / `_RESET` | Prod kill-switches for in-response delivery (unset in production warns at boot — session-13) |

## Error Handling & Debugging

- Toasts for user-facing failures; the generator ALWAYS settles (the
  reference hangs forever — our documented superset).
- Symptom table lives in `viralpost-ai_SKILL.md` §10 (the Debugging
  Guide) and `docs/DEPLOYMENT.md` §7 (the production subset); the
  load-bearing rows: db `Error code 14` (wrong anchor), login loops
  (`AUTH_SECRET` changed), sudden 429s (fixed-window limiter), a dev
  page that renders but never hydrates (open the dev server via
  `localhost`, not `127.0.0.1` — `allowedDevOrigins` covers the
  loopback IP since session 10).
- Reproduce before trusting; classify the gate before fixing; never
  weaken a guardrail to pass one.

## Communication & Documentation

- Five documents, five jobs: README (users), AGENTS (operators),
  CLAUDE.md (this contract), the PAD (architecture), the SKILL
  (distilled memory). Same-commit lockstep on behavior changes.
- Session logs (`docs/session_N.md`) + `worklog.md` are the audit trail.
- Comments explain WHY, with the session/finding reference.

## Anti-Patterns to Avoid

- Hand-rolled metadata on pages (use `pageMetadata()`).
- Direct `process.env.DATABASE_URL` reads (use the seam).
- Per-test e2e logins (trips the limiter).
- Marketing claims of parity without a live capture.
- Weakening lint/types/tests to make a gate pass.
- Editing `skills/` (owner's catalog, not app code).
