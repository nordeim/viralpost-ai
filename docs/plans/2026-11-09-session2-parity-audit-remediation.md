# Session 2 Round Plan — The Parity Audit + Dashboard Decode (2026-11-09)

**Trigger:** the operator's session-2 prompt — refresh the workspace, review
the docs/plans/worklog against the codebase, audit the recent (session-1)
changes with the repo skills, then iterate to visual/functional parity with
`https://viralpostai.base44.app/` **and `/Dashboard`**, remediate the
findings TDD-first, rewrite the root docs, distill `viralpost-ai_SKILL.md`,
capture screenshots, and push via the SSH wrapper.

**Companion documents:**
- `docs/reference-investigation.md` (session-1 evidence dossier)
- `docs/implementation-plan.md` (session-1 stack decisions)
- `docs/session_1.md` (the owner-posted session-1 transcript)

---

## 1. Intake findings (verified this session)

- Workspace pulled to `414596c` (the owner's `docs/session_1.md` post);
  session-1 ship `12d8a80` verified on the remote.
- The interrupted session-1 tail completed: the 11-package dead-dependency
  removal (zustand, recharts, jspdf, html2canvas-pro, cva, 6× radix) is in
  the working tree, and the **full gate re-certified green** on it:
  lint 0/0 · tsc 0 · unit 389/389 · build · smoke 15/15 · **e2e 47/47**.
- Session-1 plan item 9 (root docs + worklog + final push) is the
  outstanding tail — folded into this round.

## 2. The /Dashboard decode (the round's key discovery)

Live-verified against the reference (BOTH logged-out and logged-in with the
operator's demo credentials):

- `/Dashboard` is **the reference's 404 page** — heading "404", "Page Not
  Found", `The page "Dashboard" could not be found in this application.`,
  bare centered body (no nav/footer), Go Home control.
- The clone's `/Dashboard` body already matches (session-1's 404 build).
- **The real gap is the title.** The reference derives
  `<StartCase(last segment)> | ViralPost AI` for unknown routes; the clone
  ships the bare root default. Observed derivation table (all live-verified):

  | Path | Reference title |
  |---|---|
  | `/Dashboard` | `Dashboard \| ViralPost AI` |
  | `/foo-bar` | `Foo Bar \| ViralPost AI` |
  | `/userSettings` | `User Settings \| ViralPost AI` |
  | `/XMLHttpRequest` | `XML Http Request \| ViralPost AI` |
  | `/a/b/c` | `C \| ViralPost AI` |
  | `/HELLO` | `HELLO \| ViralPost AI` |
  | `/with_underscore` | `With Underscore \| ViralPost AI` |
  | `/UPPER lowercase` | `UPPER Lowercase \| ViralPost AI` |
  | `/page2` | `Page2 \| ViralPost AI` |
  | `/12ft` | `12ft \| ViralPost AI` |
  | `/a1b2` | `A1b2 \| ViralPost AI` |
  | `/foo--bar` | `Foo Bar \| ViralPost AI` |
  | `/-` | `ViralPost AI` (empty derivation → bare) |

  Rule (NOT lodash startCase — digits never split, verified by `/page2`):
  split the **last** path segment on non-alphanumeric runs AND camelCase
  transitions (`[a-z0-9][A-Z]` boundaries; an uppercase run keeps its final
  letter with the following lowercase run — `XMLHttp` → `XML Http`), then
  `upperFirst` each word. Empty result → the bare `ViralPost AI` title.

- Mechanism: the reference is an SPA — its shell ships a generic title and
  client JS sets the real one after the router resolves. The parity-faithful
  implementation is a client-side title set in the 404 body (the true-404
  HTTP status superset is preserved).

## 3. Audit findings (the remediation ledger)

| # | Severity | Finding | Evidence |
|---|---|---|---|
| F-1 | Medium | Unknown-route title gap (§2) | live reference vs clone, both auth states |
| F-2 | Low | Next dev warning: `scroll-behavior: smooth` without `data-scroll-behavior` | console on every route |
| F-3 | Low | Comment typo "Occasionaally" in generator.ts | source read |
| F-4 | Medium | `NEO_PROXY_HOPS` / `NEO_DISABLE_IN_APP_*` env names carry the CRM-template prefix | rg across src/tests/.env.example |
| F-5 | High (docs) | README/AGENTS/CLAUDE/PAD still describe NEO CRM | headers read |
| F-6 | High (docs) | `viralpost-ai_SKILL.md` does not exist | ls |
| F-7 | Medium (docs) | worklog.md still carries the CRM Task-198 entry | read |
| F-8 | Low (docs) | `.env.example` PostgreSQL example names `neo_crm` | read |

**Verified at parity (no action):** mobile menu (structure/classes/behavior
re-verified live at 390×844 against the reference — no drift since session
1), login→`/` redirect, `/Home` 308, sitemap/robots/manifest, `.env`
DATABASE_URL contract with `db/` at root, vitest+playwright configs, the
Tailwind v4 doctrine state (CSS-first, literal hex, `@custom-variant hover`,
vendored tw-animate), console clean of errors.

## 4. Remediation sequence (TDD where logic is non-trivial)

1. **R-1 (F-1) — the unknown-route title seam.**
   RED: `tests/route-title.test.ts` pins the full §2 table. GREEN: the pure
   seam `unknownRouteTitle(pathname)` + the client-side title set in
   `NotFoundBody`. e2e pin: `/Dashboard` asserts `document.title`.
2. **R-2 (F-2)** — `data-scroll-behavior="smooth"` on `<html>`.
3. **R-3 (F-3)** — the typo fix.
4. **R-4 (F-4, F-8) — the env rename**: `NEO_PROXY_HOPS` →
   `VIRALPOST_PROXY_HOPS`, `NEO_DISABLE_IN_APP_OTP` →
   `VIRALPOST_DISABLE_IN_APP_OTP`, `NEO_DISABLE_IN_APP_RESET` →
   `VIRALPOST_DISABLE_IN_APP_RESET` (src + tests + `.env.example`, where the
   postgres example also loses its `neo_crm` relic). Tests re-pinned in the
   same stroke.
5. **R-5 (F-5) — the four root docs** rewritten via their skills
   (agents-md, claude-md, readme-md, project-architecture-document-md —
   all four skills read and internalized this session).
6. **R-6 (F-6, F-7)** — `viralpost-ai_SKILL.md` distilled via
   to-distill-project-into-skill + distill-codebase-skill; `worklog.md`
   rewritten for this round.
7. **R-7** — fresh screenshots (incl. the /Dashboard 404 parity shot) to
   `docs/screenshots/`.
8. **R-8** — the full gate, the commit, the SSH-wrapper push to `main`.

## 5. Acceptance criteria

- [x] `/Dashboard` (and every unknown route) shows the derived title while
      keeping the 404 body and the true 404 status.
- [x] The derivation table passes as unit tests; the e2e suite pins
      `/Dashboard`'s title.
- [x] No `NEO_` prefix remains in src/tests/.env.example.
- [x] The four root docs + viralpost-ai_SKILL.md + worklog describe the
      ViralPost AI app (zero CRM claims).
- [x] Gate green: lint 0/0 · tsc 0 · unit (389+) · build · smoke · e2e (47+).
- [x] Screenshots captured; `.env.example` committed; pushed via the wrapper.

## 6. Execution record

1. ✅ R-1 — the title seam: RED (13 pins in `tests/route-title.test.ts`) →
   GREEN (`src/lib/route-title.ts`). The architecture journey (three
   probes, each live-verified): the client-effect approach is STOMPED by
   React's metadata hydration; the catch-all page's generateMetadata is
   DISCARDED when the page calls `notFound()` (probe-verified); THE CURE
   — the derivation lives in the catch-all SEGMENT LAYOUT's
   generateMetadata (layouts render around the not-found boundary):
   `[...catchAll]/layout.tsx` (title) + `page.tsx` (notFound()) +
   `not-found.tsx` (body). All 11 live path shapes byte-match the
   reference; true-404 status + noindex preserved; every real route
   untouched (curl precedence walk). The 404 body renders through the
   client stream (Next's dynamic-boundary fallback — the same
   client-rendered posture as the reference's SPA); the rendered-body
   contract lives in the e2e layer; smoke leg 06 re-anchored to
   status + derived title + noindex.
2. ✅ R-2/R-3 — `data-scroll-behavior="smooth"` on `<html>` (the
   typography pin updated in the same commit); the generator comment
   typo.
3. ✅ R-4 — the relic sweep: `NEO_*` → `VIRALPOST_*` env names (10
   files); the user-facing "Enter your new password for NEO CRM" →
   "…ViralPost AI"; the chunk-reload flag; the Prisma globalThis key;
   the timing-equalizer constant; the stale login comments; the db-path
   test scratch names; the .env.example postgres example. Zero
   NEO/neo references remain in src/tests/prisma/scripts/.env.example.
4. ✅ R-5 — README/AGENTS/CLAUDE/PAD rebuilt via their skills (the PAD
   at v2.0 with 8 ADRs incl. ADR-006 the catch-all 404).
5. ✅ R-6 — `viralpost-ai_SKILL.md` v1.0.0 (16 sections + appendices,
   the distill skills' form); `worklog.md` rewritten (Task ID 2).
6. ✅ R-7 — screenshots 09-12 to `docs/screenshots/` (the /Dashboard
   404 desktop+mobile, the reset-password relic fix, the working
   generator with the quota decremented); census restored to MATCH.
7. ✅ R-8 — the gate: lint 0/0 · tsc 0 · unit 402/402 (29 files) ·
   build · smoke 15/15 · e2e 48/48 (8 specs). Commit + the SSH-wrapper
   push to main.
