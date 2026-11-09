# AGENTS.md — ViralPost AI

Single Next.js 16 App Router app that clones `https://viralpostai.base44.app/`
(an AI social-media post generator) as a **functional superset with visual
parity**: marketing site, a working generator (the reference's LLM is
402-dead), the auth funnel, a persisted contact inbox, and true-404 unknown
routes. Prisma/SQLite (`db/` at repo root), scrypt + HMAC cookie auth,
Tailwind v4 CSS-first.
Clone remote: `https://github.com/nordeim/viralpost-ai.git`; pushes go to
the SSH remote via `docs/ssh_git_wrapper_v3.py` (runbook:
`docs/how-to-git-push-using-ssh-wrapper_SKILL.md`). **main only.**

## Commands

| Task | Command |
|---|---|
| Dev server | `bun run dev` (port 3000) |
| Lint (0/0 required) | `bun run lint` |
| Typecheck | `bun run typecheck` |
| Unit tests | `bun run test` |
| E2E (needs build) | `CI=1 bun run test:e2e` |
| Production build | `bun run build` (standalone + copy steps) |
| Smoke ladder | `./scripts/smoke-test.sh` |
| **The whole gate** | `bun run gate` |
| DB push / seed / census | `bun run db:push` / `db:seed` / `db:census` |
| One unit file | `bun run test -- tests/generator.test.ts` |

Run everything from the repo root (the db-path seam anchors on it).
`bun run gate` order is the contract: lint → typecheck → unit → build →
smoke → e2e. There is no hosted CI — the local gate is the only gate.

## Architecture facts you'd guess wrong

- **The db path**: `DATABASE_URL="file:../db/custom.db"` resolves against
  `prisma/schema.prisma`, NOT the CWD. `src/lib/db-path.ts` is the only
  sanctioned runtime resolver (fixture-tested); `src/lib/db.ts` never reads
  `process.env.DATABASE_URL` directly. Symptom of a break:
  `Error code 14: Unable to open the database file`.
- **The e2e suite runs against the production build** (own port, own
  `db/e2e.db`), not the dev server — the dev server lies about hydration.
  Build first (`bun run build`), then `CI=1 bun run test:e2e`.
- **One e2e login, shared**: the setup project signs in once and shares
  `storageState`; per-test logins trip the auth rate limiter
  (login 10 / signup 10 / resend 5 / verify 20 per 15 min per IP).
- **The route vocabulary is capitalized**: `/Tool`, `/Pricing`, `/Contact`,
  `/Home` — the reference's own paths. `/Home` 308-redirects to `/`
  (never list it in the sitemap).
- **Unknown routes**: `src/app/[...catchAll]/` owns them — the segment
  layout's `generateMetadata` derives the title
  (`startCase`-of-last-segment, digits never split), the page calls
  `notFound()`, and the segment `not-found.tsx` renders the 404 body.
  Next DISCARDS a page's generateMetadata when the page calls `notFound()`
  (probe-verified) — that's why the title lives in the LAYOUT. The body
  renders through the client stream (curl won't see "Page Not Found" in
  the HTML; the e2e layer owns that assertion).
- **Tailwind v4 traps are mitigated in `globals.css`**: literal hex in
  `@theme inline` (bare HSL triplets resolve to transparent), the
  `@custom-variant hover` unwrap for touch devices, `tw-animate-css`
  vendored at `src/app/vendor/`. No `tailwind.config.js` — CSS-first only.
- **The generator** (`src/lib/generator.ts`) is a deterministic
  (idea, seed) pure function — same inputs, same post; the API passes a
  crypto-random seed. The free quota is a client localStorage counter
  (3/day) PLUS a server rate limit (20/15 min/IP) — the counter is UX,
  the limiter is the wall.
- **Auth env names are `VIRALPOST_*`**: `VIRALPOST_PROXY_HOPS`,
  `VIRALPOST_DISABLE_IN_APP_OTP`, `VIRALPOST_DISABLE_IN_APP_RESET`
  (renamed from the CRM template's `NEO_*` in session 2). The boot gate
  (`boot-env.ts`) warns on BOTH a typo'd `VIRALPOST_*` name AND any
  legacy `NEO_*` spelling (it maps the live name for you).
- **The marketing pages are public** — no session resolution in the
  `(site)` layout (the reference serves them to guests and logged-in
  visitors alike). `/login` also renders for authenticated visitors.
- **`skills/` is not app code** — excluded from tsconfig/eslint/vitest.
  The smoke test asserts the built artifact carries no `skills/`/`docs/`.

## Testing conventions

- Unit tests live in `tests/*.test.ts` (29 files, 405 tests) — Vitest,
  node env, `@` alias; TDD at the pure seams.
- Several suites are **source-pinned** (they read source files textually
  to pin contracts: page-titles, design-tokens, typography) — when you
  change markup/classes, update those pins in the same commit.
- E2E: 8 specs / 48 tests in `tests/e2e/*.spec.ts`; multi-subtree
  responsive DOM needs `.filter({ visible: true }).first()`.
- Docs count-lockstep: when test/route/model counts change, update
  README/AGENTS/CLAUDE/PAD in the same commit.

## Git conventions

- Conventional Commits; `main` only; never commit `.env`, `*.key`,
  `db/*.db`, `dev.log`, `server.log`, `test-results/`.
- Push with the SSH wrapper (the runbook is the authority):
  `PATH="<shim-dir>:$PATH" python3 docs/ssh_git_wrapper_v3.py --key-file <key> --remote git@github.com:nordeim/viralpost-ai.git`

## Key docs

- `README.md` — user-facing overview, quickstart, env table
- `CLAUDE.md` — the agent contract (principles, workflow)
- `Project_Architecture_Document.md` — the blueprint (ADRs, security, testing)
- `viralpost-ai_SKILL.md` — the distilled engineering memory
- `docs/implementation-plan.md` — the clone's Stack Decision Record + Deviations Ledger
- `docs/plans/` — per-session round plans (session-1 build, session-2 audit)
- `docs/reference-investigation.md` — the evidence dossier behind every parity claim
- `worklog.md` — the per-session audit trail
