# Session 18 — The OPTIONS-Envelope Closure + The DEPLOYMENT Count Re-Anchor + The Config-Loader Silence (2026-11-10)

## Context

Session 17 pushed `0880e6a` (the comment-truth batch + the README table
repair + the CSRF media-type parse + the timer hygiene); the owner added
`1a0f801` (the session-17 log). This round re-ran the standing instruction
against the merged tree: docs review → baseline gate → the comprehensive
audit → the neo-crm re-review → the live reference parity walk → the TDD
cures → the gate → captures → push.

**Baseline (the merged tree, verified in place):** lint 0/0 · tsc 0 ·
unit 550/550 (37 files) · e2e census 56 tests / 9 specs (the `--list`
walk; the build/smoke/e2e legs re-run at ship inside the full gate).
Census MATCH (1 user + 0 contact messages). `.env` re-created from
`.env.example` (AUTH_SECRET set for dev), `db/` at the repo root with
`custom.db` pushed + seeded — the DATABASE_URL contract
(`file:../db/custom.db` resolving against `prisma/schema.prisma`)
re-verified end-to-end.

**The audit** (three parallel dispatched subagents — API/lib seams,
components/pages/effects, SEO/configs/tests/docs — every load-bearing
finding hand-verified in source): **0 Critical / 0 High / 0 Medium /
1 Low / 10 Informational.** The session-17 cures re-verified in source
AND live (the media-type parse answering "Invalid request body" on
`text/x-application/json` and `application/jsonx`; the generator
round-trip; the bare-`/api` envelope 404). The clean areas: the envelope
discipline across all handlers, the bounded reader's three layers, the
auth posture, the rate-limit buckets, the race-condition family
(P2002/P2025 arms), the mobile-menu family, the 404 architecture, the
effects cleanup, the Tailwind v4 token discipline (censuses green), the
SEO surface (independently recounted), and the docs-counts discipline
(22/22 live). The audit's one candidate Low on the Zod surface
(`signupSchema.name.max(80)` possibly leaking Zod default text) was
DISPROVED live against the pinned zod 4.6.7 — the constructor's
`{ message }` inherits to `.max()`; do not re-report.

**neo-crm re-review:** HEAD `b3d0fbe` — UNCHANGED since session 12's
re-review; the recorded adoption/deferral decisions stand.

**The parity walk (live, both sides):** the reference (login → `/Home`
with the "ViralPost AI" title; the mobile menu at 390×844 — the no-aria
hamburger `md:hidden p-2 text-slate-300`, 5 destinations, auto-close on
navigation; the landing's 10-section composition INCLUDING the PT
monetization section with the `templixco.gumroad.com/l/znzbnd` link
family; the OG family on ALL FIVE routes via direct loads — prefixed
`og:title` + per-route canonical on `/Tool` `/Pricing` `/Contact`, the
unprefixed family on `/` and `/login`; sitemap.xml + robots.txt
unchanged) and the clone's dev server (hydration clean at 390×844 via
`localhost`; the menu open — 5 destinations + the brand link; Escape
WITH the focus return; navigate → auto-close + the derived
`Tool | ViralPost AI` title; the hamburger carries the reference's base
classes + the S15-8 slate-300 focus ring; the cure probes green).
**NO drift since session 17.**

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S18-1 | **LOW** (docs drift) | `docs/DEPLOYMENT.md:17` | **The build section says "the 11 API route files (11 verb handlers)" — 13 route files exist on disk.** Sessions 15–16 added the two envelope-404 catch-alls (`src/app/api/[...path]/route.ts`, `src/app/api/route.ts`); the DEPLOYMENT §1 sentence was never re-anchored. The verb-handler enumeration stays accurate; the file count is the drift. The site is outside the docs-counts gate's pinned set. |
| S18-2 | INFO→cured (gate hygiene, TDD) | `src/app/api/route.ts`, `src/app/api/[...path]/route.ts` | **OPTIONS on unknown API paths escapes the envelope 404.** Both catch-alls export only the five-method family (GET/POST/PUT/PATCH/DELETE); an `OPTIONS /api/typo` matches the route (path matches, method doesn't) and Next answers its own 405 + `Allow` — a non-envelope response on an UNKNOWN path, outside the doctrine's letter. HEAD is auto-derived from GET (covered); TRACE is not a supported route-handler method (Next rejects it at the router level — cannot be owned). Cure: the OPTIONS export joins the family on both catch-alls; the TRACE exclusion is documented in the comment. |
| S18-3 | INFO→cured (comment truth) | `src/app/api/auth/logout/route.ts` | **Logout is the only cookie-mutating route without a try/catch.** login and verify wrap their cookie writes in try → `ERR.INTERNAL()`; logout calls `clearSessionCookie()` bare. No realistic throw path exists today (the clear performs no crypto — never calls `secret()` — and no DB work), but the asymmetry is undocumented. Cure: the S17-3 precedent — the one-line comment documenting the no-throw reasoning. |
| S18-4 | INFO→cured (docs gap) | `tests/e2e/e2e-port.ts` + `AGENTS.md` | **The `E2E_PORT` env knob has no doc face.** The e2e port is env-overridable (`E2E_PORT ?? "3100"`) but the knob appears in no live doc — an operator with a `:3100` conflict cannot discover it. It is test-infra tooling, not an app env var (the six-knob app contract is complete). Cure: a line in AGENTS.md's e2e testing note. |
| S18-5 | INFO→cured (config hygiene) | `vitest.config.ts` | **The Vite config-loader warning prints on every `bun run test`.** "ESM syntax in a file loaded as CommonJS (vitest.config.ts:1:1). Use a `.mjs` extension…" — cosmetic, but it pollutes every gate run and names a real future break (configLoader: 'native' becomes the default in a future Vite major). Cure: rename to `vitest.config.mts` (verified: no test pin names the file; the docs-counts census comment says "The vitest config" generically; SKILL's config table carries the one live name to lockstep). |
| S18-6 | INFO (verified, no action) | `src/app/api/auth/signup/route.ts:69-92` | **The first-signup admin bootstrap is a read-then-write (TOCTOU).** Two concurrent first-ever signups on an empty DB can both read `count === 0` and both mint admin. Purely theoretical (simultaneous signups on a fresh deploy); the bootstrap form is deliberate and pinned. Demo posture: accepted. |
| S18-7 | INFO (verified, no action) | `src/app/api/health/route.ts` | **`/api/health` is unthrottled.** The accepted monitoring pattern (the Playwright webServer probes it; the 503-on-down honesty is pinned). Throttling health checks breaks probes. |
| S18-8 | INFO (verified, no action) | `next.config.ts` | **No CSP header ships.** Documented reference parity ("the reference's edge security set, live census at session 8") — Referrer-Policy + X-Content-Type-Options + HSTS, pinned by tests/http-headers.test.ts. The posture is on the record. |
| S18-9 | INFO (verified, no action) | `src/components/ui/toast.tsx:56-64` | **The toast store uses the legacy useState + effect-subscribe pattern** rather than the quota counter's `useSyncExternalStore`. No practical defect (synchronous module store, pushes are user-event-driven); the anatomy is pinned by tests/toast-anatomy.test.ts. Optional modernization only. |
| S18-10 | INFO (verified, no action) | `src/lib/otp.ts` + `login-card.tsx` | **Typing a digit into a filled OTP box distributes instead of replacing.** Documented and pinned as intended ("the F11-15 semantics, unchanged" — tests/otp.test.ts); paste flows are strictly correct. |

## Remediation (TDD where a contract changes)

- **R18-1 (S18-1)**: the DEPLOYMENT.md §1 sentence re-anchored — "13 API
  route files (11 verb handlers + the two JSON-envelope 404 catch-alls)".
- **R18-2 (S18-2, TDD + mutation battery)**: the e2e pin FIRST — the
  seo.spec.ts API-404 family test gains the OPTIONS leg (both
  `/api/nonexistent-endpoint` and the bare `/api` answer the envelope
  404, not Next's 405). RED against the five-method tree (build + run),
  then the OPTIONS export joins both catch-alls (the envelope 404, the
  same `notFound()`), the comment documenting the TRACE exclusion.
  Rebuild → GREEN. Mutation battery: remove one OPTIONS export → the
  pin REDs → restore → GREEN.
- **R18-3 (S18-3)**: the logout comment — why the bare call is safe
  (no crypto, no DB, `cookies()` cannot throw in a route handler) and
  what would change the answer.
- **R18-4 (S18-4)**: the AGENTS.md e2e note gains the `E2E_PORT` knob.
- **R18-5 (S18-5)**: `git mv vitest.config.ts vitest.config.mts` —
  verify the suite still runs, the warning is gone, and the gate chain
  is untouched; SKILL's config table lockstepped.
- **R18-6–R18-10**: no code change — each verified in source and
  recorded here (the audit's honest-deferred register).
- **R18-11 (lockstep)**: e2e 56 → 57 (+1 the OPTIONS leg); unit 550/37
  files unchanged; badge 606 → 607; the count-history comment; README
  (badge, testing counts, the session-18 row, the gate line); AGENTS
  (counts, the plans map's eighteenth round, the E2E_PORT note); CLAUDE
  (counts); PAD (§8.1 distribution, the §12 catch-all rows 34 → 39,
  §11 if touched); SKILL v1.13.0 → v1.14.0 (frontmatter, the §11
  checklist counts, the config table's `.mts`, Appendix A's session-18
  row, Appendix B re-certified); worklog Task 18; this plan's
  execution record.
- **R18-12**: captures 43/44 on the remediated tree (dev server: the
  landing 1280×800 + the OPEN mobile menu 390×844, via `localhost`,
  hydration awaited), PIL-verified.
- **R18-13**: the full gate on the exact commit tree → the Conventional
  Commit on `main` → the SSH-wrapper push (dry-run first).

## Acceptance criteria

1. The full gate green at the final counts (550/37 files · 57/9 specs ·
   15 legs); census MATCH.
2. `OPTIONS /api/<unknown>` and `OPTIONS /api` answer the JSON envelope
   404 (e2e-pinned; the mutation battery REDs exactly its pin); the
   TRACE exclusion documented in both catch-alls' comments.
3. DEPLOYMENT §1 says 13 route files; the logout reasoning comment in;
   the AGENTS E2E_PORT note in; `vitest.config.mts` in place with the
   warning gone.
4. Docs lockstep at the final counts (550/57, badge 607); SKILL v1.14.0;
   captures 43/44 PIL-verified.

## Execution record

- **Baseline**: lint 0/0 · tsc 0 · unit 550/550 (37 files) on the
  merged tree; the e2e census 56/9 specs; census MATCH.
- **The audit**: 0 Critical / 0 High / 0 Medium / 1 Low / 10
  Informational; the Low + the four cured Info findings hand-verified
  in source; the Zod-leak candidate disproved live.
- **The parity walk**: the reference live (NO drift — the five-route OG
  family, the mobile menu, the PT section + Gumroad links, sitemap/
  robots) + the clone's dev server (the menu family, the derived
  titles) + the live cure probes.

## Post-execution record (appended at ship)

- **R18-1 (S18-1)**: the DEPLOYMENT.md §1 sentence re-anchored — "the
  13 API route files (11 verb handlers … plus the two JSON-envelope 404
  catch-alls: `src/app/api/[...path]/route.ts` and the bare-`/api`
  `src/app/api/route.ts`)".
- **R18-2 (S18-2)**: the e2e pin FIRST — the S15-7 family test extended
  in place with the OPTIONS leg (both faces co-pinned: the
  `/api/nonexistent-endpoint` subtree face and the bare `/api` face;
  the S16-2 precedent — a commented leg inside the existing family
  test, so the e2e COUNT stays 56). **RED** against the five-method
  tree: exactly the extended test failed, and the observed status was
  **204** — Next's own auto-answer for an un-exported method, not the
  405 the audit first hypothesized (the plan's finding text corrected
  by this observation). **GREEN** after the OPTIONS export joined both
  catch-alls (the same `notFound()`, the TRACE exclusion documented in
  both comments). **Mutation batteries**: removing `[...path]`'s
  OPTIONS export REDs exactly the pin; removing the bare-`/api`'s REDs
  exactly the pin (one battery per face) → restored → GREEN (9/9).
  Both files 34 → 43 lines (the PAD §12 rows re-anchored).
- **R18-3 (S18-3)**: the logout comment in — the no-throw reasoning
  (no crypto, no DB, `cookies()` cannot throw in a route handler) and
  the trigger that would change the answer (a throwing dependency on
  the clear path).
- **R18-4 (S18-4)**: the AGENTS e2e note gained the `E2E_PORT` knob
  (default 3100, single source `tests/e2e/e2e-port.ts`) alongside the
  pinned-db-isolation reminder.
- **R18-5 (S18-5)**: `git mv vitest.config.ts vitest.config.mts` — the
  suite runs clean, the config-loader warning is gone (verified in the
  run output), the gate chain untouched; the SKILL config table
  lockstepped with the provenance note.
- **R18-6–R18-10**: no code change — each recorded in the findings
  register above (the audit's honest-deferred set: TOCTOU theoretical,
  health unthrottled by design, no-CSP documented parity, the toast
  store's pinned legacy pattern, the OTP digit-distribution semantics
  pinned as intended).
- **Census fallout cured in-commit**: the color census flagged the new
  catch-all comment's "auto-answers" (scanned as a `to-answers`
  utility — the "auto-dismiss → to-dismiss" genus). Rephrased to
  "replies to OPTIONS" rather than growing the allowlist ("auto-
  answers" is casual phrasing, not a technical term like session-17's
  "substring-matched"); the PAD §12 line-count pin re-anchored in the
  same commit.
- **R18-11 (lockstep)**: counts UNCHANGED — the OPTIONS leg extended an
  existing e2e test, so unit 550/37 files, e2e 56/9 specs, smoke 15
  legs, badge 606 all stand (the plan's draft arithmetic "56 → 57" was
  wrong — the leg is not a new registration; the census re-verified
  56/10 files). README (the session-18 row + the gate line); AGENTS
  (the plans map's eighteenth round + the E2E_PORT note); PAD (§12's
  two catch-all rows 34 → 43); the SKILL v1.13.0 → v1.14.0
  (frontmatter, the config table's `.mts`, Appendix A's session-18
  row, Appendix B re-certified through session 18 with the OPTIONS
  closure in the ledger); worklog Task 18; `docs/session_18.md`; this
  record.
- **R18-12**: captures 43/44 on the remediated tree (dev server: the
  landing 1280×800 + the OPEN mobile menu 390×844, via `localhost`,
  hydration awaited), PIL-verified.
- **R18-13**: the full gate on the exact commit tree → the Conventional
  Commit on `main` → the SSH-wrapper push (dry-run first).
- **Deferred (none)**: every finding cured or verified this round; the
  standing PAD §11 deferrals (S16-3's eslint off-switch scoping,
  S16-5's footer-year freeze) unchanged.
