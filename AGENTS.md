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
| Smoke ladder | `./scripts/smoke-test.sh` (15 legs) |
| **The whole gate** | `bun run gate` |
| DB push / seed / census | `bun run db:push` / `db:seed` / `db:census` |
| DB generate (Prisma client) | `bun run db:generate` |
| Production server | `bun run start` (standalone build) |
| Unit tests, watch mode | `bun run test:watch` |
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
  `@theme` (bare HSL triplets resolve to transparent), the
  `@custom-variant hover` unwrap for touch devices. No
  `tailwind.config.js` — CSS-first only. (Session-11: the vendored
  `tw-animate.css` is RETIRED — it shipped dead keyframes on a phantom
  Radix claim; the step-less color census + the dead-token census in
  tests/design-tokens.test.ts are now the guard rails.)
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

- Unit tests live in `tests/*.test.ts` (37 files, 550 tests) — Vitest,
  node env, `@` alias; TDD at the pure seams.
- Several suites are **source-pinned** (they read source files textually
  to pin contracts: page-titles, design-tokens, typography) — when you
  change markup/classes, update those pins in the same commit.
- E2E: 9 specs / 56 tests in `tests/e2e/*.spec.ts`; multi-subtree
  responsive DOM needs `.filter({ visible: true }).first()`.
- Docs count-lockstep: when test/route/model counts change, update
  README/AGENTS/CLAUDE/PAD in the same commit.
- Mutation battery (session-11, the neo-crm discipline): every NEW pin
  ships with a planted-defect proof — revert the cure (or plant the
  defect), confirm exactly the new pin REDs, restore, GREEN. A pin that
  cannot be made to fail is vacuous. Session-12 (N12-2): each live
  face is owned by EXACTLY ONE pin — a redundant arm trips six pins on
  one defect and hides which one matters; co-pinned faces are
  documented in the pin's comment.
- `bun audit` is a PERIODIC pre-ship duty (never inside the gate — the
  gate must stay offline-runnable): triage advisories into runtime
  request-path vs dev-toolchain, record the outcome in the session plan.

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
- `docs/plans/` — per-session round plans (session-1 build, session-2 parity audit, session-3 rename completion, session-4 phantom references, session-5 docs freshness, session-6 clean-tree re-certification, session-7 dev-script loop + phantom comments, session-8 live OG parity + evidence provenance, session-9 rate-limiter trust warning + phantom-claim retirement + the docs-counts gate, session-10 dev-origin hydration lock + palette re-pin completion + phantom-reference tail, session-11 standalone-launch DB re-anchor + dead-CSS retirement + verification-funnel closure, session-12 count-reality census + reset-funnel e2e + UX-boundary batch, session-13 in-app-delivery polarity warning + OTP log gate + from_url seam, session-14 from_url escape closure + resend equalizer + UX-boundary batch, session-15 resend P2025 sibling arm + null-body vocabulary + API-envelope 404, session-16 parse-vocabulary completion + bare-/api envelope + polish batch, session-17 comment-truth batch + README table repair + CSRF media-type parse + timer hygiene)
- `docs/reference-investigation.md` — the evidence dossier behind every parity claim
- `worklog.md` — the per-session audit trail
- **Historical-record layer (retained provenance, not live docs — superseded by the set above):** `neo-crm_SKILL.md` (the CRM's v1.207 skill — the session-1 input that session 2 distilled into `viralpost-ai_SKILL.md`), `docs/worklog.md` (the CRM-era worklog), `docs/prompt-to-*.md` (the owner's prompt templates), `docs/Tailwind-V4-Validation-Report.md`, `docs/web-app-codebase-evaluation-report.md`. Read for archaeology, never as current-state contracts.
