# Session 17 — The Comment-Truth Batch + The README Table Repair + The CSRF Media-Type Parse + The Timer Hygiene (2026-11-10)

## Context

Session 16 pushed `943572c` (the parse-vocabulary completion + the
bare-/api envelope + the polish batch); the owner added `81b3ada` (the
session-16 log). This round re-ran the standing instruction against the
merged tree: docs review → baseline gate → the comprehensive audit →
the neo-crm re-review → the live reference parity walk → the TDD cures
→ the gate → captures → push.

**Baseline (the merged tree, verified in place):** lint 0/0 · tsc 0 ·
unit 548/548 (37 files) · e2e census 56 tests / 9 specs (the `--list`
walk; the build/smoke/e2e legs re-run at ship inside the full gate).

**The audit** (dispatched wide; every load-bearing finding hand-verified
in source; F17-8's Assumed tail closed by a live warn-level dry-run —
config patched, counted, restored): 0 Critical / 0 High / **0 Medium** /
2 Low / 6 Informational. The session-16 cures re-verified clean in
source AND live (the non-object vocabulary on login/contact, the three
field-level messages, the bare-/api envelope 404, the generator
round-trip — all probed on the dev API). The clean areas: the envelope
discipline across all 14 handlers + 2 catch-alls, the bounded reader's
three layers, the auth posture (cookie flags, timing equalizers,
enumeration boundaries, reset-token single-use), the effects cleanup,
the Tailwind v4 token discipline, the SEO surface, and the PAD §12
inventory (all 20 rows live-matched). All 8 runtime deps + 14 devDeps
carry live consumers.

**neo-crm re-review:** HEAD `b3d0fbe` — UNCHANGED since session 12's
re-review; the recorded adoption/deferral decisions stand.

**The parity walk (live, both sides):** the reference (login → `/Home`
with the "ViralPost AI" title; the mobile menu at 390×844 — the no-aria
hamburger `md:hidden p-2 text-slate-300`, 5 destinations, auto-close on
navigation; the OG family re-captured on ALL FIVE routes via direct
loads — prefixed `og:title` + per-route canonical on `/Tool` `/Pricing`
`/Contact`, the unprefixed family on `/` and `/login`, the plain
description everywhere; the SPA soft-navigation head quirk observed and
excluded — the reference's client-side router leaves the previous page's
canonical/og in the head, so only direct loads are the parity evidence;
sitemap.xml + robots.txt unchanged) and the clone's dev server
(hydration clean at 390×844 via `localhost`; the menu open — 5
destinations + the brand link; Escape WITH the focus return; navigate →
auto-close + the derived `Tool | ViralPost AI` title; the hamburger
carries the reference's base classes + the S15-8 slate-300 focus ring).
NO drift since session 16.

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S17-1 | **LOW** (comment truth) | `src/app/api/auth/forgot-password/route.ts:65` | **The no-enumeration rationale cites "signup's 409" — signup answers 400.** The comment's clause (c) says "signup's 409 openly enumerates by design", but signup's already-exists branch answers `ERR.BAD_REQUEST` → HTTP 400 (`signup/route.ts:66,120`). A future auditor reasoning from the comment would mis-model the sibling surface. Comment-only fix. |
| S17-2 | **LOW** (docs rendering) | `README.md:224,228,231,233` | **The Project status table is broken by interior blank lines.** GFM tables terminate at a blank line — the session 13–16 rows sit in header-less fragments and render as prose on GitHub; the table proper covers only sessions 1–12. The two "Gate at the session-N ship" fragment lines compound it. |
| S17-3 | INFO (undocumented degradation) | `src/app/api/generate/route.ts:33-36` | **The guests-allowed wiring discards `requireSession`'s 500 envelope too.** The S14-3 comment documents only the 401 discard; under a DB outage a logged-in user silently degrades to the per-IP bucket (generation still works — graceful, but the 500-discard is the family's only undocumented envelope drop). One comment line, the S14-3 precedent. |
| S17-4 | INFO (docs gap) | `prisma/seed.ts` + `docs/DEPLOYMENT.md:85` | **Re-seeding re-arms the publicly-documented demo password.** The upsert's update branch resets `passwordHash` to the README-documented `$Abcd1234` and `tokenVersion` to 0 — an operator who changed the demo password (or reset it, bumping tokenVersion) and later runs `db:seed` reverts both, re-validating pre-reset v0 cookies. A DEPLOYMENT.md note closes the gap. |
| S17-5 | INFO→cured (gate hygiene, TDD) | `src/lib/api.ts:131` | **The content-type CSRF gate substring-matches.** `contentType.toLowerCase().includes("application/json")` accepts `text/x-application/json` and `application/jsonx` — not exploitable for the CSRF class it defends (cross-site forms can only send the three enctype types; JS-set Content-Types trigger CORS preflight, which fails closed), but the loose match is hygiene debt on a security gate. Cure: parse the media type (split `;`, trim, lowercase, strict equality). |
| S17-6 | INFO→cured (idiom consistency) | `src/components/marketing/generator-card.tsx:82`, `src/components/marketing/contact-form.tsx:48` | **The two fire-and-forget reset timers aren't ref-tracked.** `setTimeout(() => setCopied(false), 2000)` / `setTimeout(() => setSent(false), 2600)` — a setState-after-unmount is a React 19 silent no-op (no leak; the timer fires once and is GC'd), but the toast component already carries the `useRef` + unmount-`clearTimeout` idiom (`toast.tsx:91-99`); the marketing pair mirrors it. |
| S17-7 | INFO→cured (dead attribute) | `src/components/marketing/contact-form.tsx:57` | **`noValidate={false}` — an explicit no-op default** (a refactor leftover; the login family's bare `noValidate` attributes are the deliberate idiom). Remove. |
| S17-8 | INFO (verified live, no code change) | `eslint.config.mjs` + PAD §11 | **The "exactly 2 exhaustive-deps flags" register claim re-verified independently.** The warn-level dry-run (config patched to `warn`, `bunx eslint src`, config restored clean) surfaces exactly 2 flags, both `particle-text.tsx:293`'s deliberate `texts.join("\|")` stability idiom — the PAD §11 row's claim now carries an independent verification (this session). |

## Remediation (TDD where a contract changes)

- **R17-1 (S17-1)**: the comment's `409` → `400`.
- **R17-2 (S17-2)**: the README table repair — remove the interior
  blank lines so all rows (1–17) render as ONE table; the two stale
  fragment gate lines are superseded by the single post-table gate line
  at the session-17 counts. The pinned strings (badge, architecture
  table, quickstart lines, env table) are untouched.
- **R17-3 (S17-3)**: the generate route's discarded-500 comment line.
- **R17-4 (S17-4)**: the DEPLOYMENT.md re-seed note (one line at the
  `db:seed` row).
- **R17-5 (RED→GREEN, S17-5)**: the pin first — bounded-reader.test.ts
  gains ONE behavioral pin owning the substring-hostile media types
  (`text/x-application/json` + `application/jsonx` — the two faces of
  the loose-match genus, co-pinned and documented in the pin's comment)
  → both are unparseable-by-policy (the null-on-unparseable contract).
  RED against the `.includes()` tree, then the api.ts gate parses the
  media type (`split(";")[0].trim().toLowerCase() === "application/json"`).
  Mutation battery: revert the gate to `.includes` → exactly the new
  pin REDs → restore → GREEN.
- **R17-6 (S17-6)**: the timer hygiene — generator-card + contact-form
  mirror the toast's ref idiom (the ref, the assignment, the unmount
  clear). Pinned by ONE source pin in landing-page.test.ts (co-pinned
  faces — both components' idiom, one owner; the planted-defect proof:
  removing either unmount clear REDs the pin).
- **R17-7 (S17-7)**: `noValidate={false}` removed from contact-form.
- **R17-8 (S17-8)**: the PAD §11 S15-6 row refreshed with the
  session-17 independent re-verification.
- **R17-9 (lockstep)**: unit 548 → 550 (+1 the media-type pin, +1 the
  timer source pin; 37 files unchanged); badge 604 → 606; the
  count-history comment; README (badge, architecture/testing counts,
  the repaired table + the session-17 row, the gate line); AGENTS
  (counts, the plans map's seventeenth round); CLAUDE (counts); PAD
  (§8.1 distribution, §8.3 doctrine line, §11's row, §12 header +
  the api.ts/generator-card rows re-anchored to the live `wc -l`);
  SKILL v1.12.0 → v1.13.0; worklog Task 17; this plan's execution
  record.
- **R17-10**: captures 41/42 on the remediated tree (dev server: the
  landing 1280×800 + the OPEN mobile menu 390×844, via `localhost`,
  hydration awaited), PIL-verified.
- **R17-11**: the full gate on the exact commit tree → the Conventional
  Commit on `main` → the SSH-wrapper push (dry-run first).

## Acceptance criteria

1. The full gate green at the final counts (550/37 files · 56/9 specs ·
   15 legs); census MATCH.
2. The substring-hostile media types answer the null-on-unparseable
   contract (behaviorally pinned; the mutation battery REDs exactly its
   pin); the charset/case/absent/plain/multipart arms unchanged.
3. The two marketing reset timers carry the ref-tracked unmount clear
   (source-pinned; the planted-defect proof REDs the pin).
4. The comment truth in place (400, not 409); the README status table
   renders as one table; the generate-500 comment in; the DEPLOYMENT
   re-seed note in; `noValidate={false}` gone.
5. Docs lockstep at the final counts (550/56, badge 606); SKILL v1.13.0;
   captures 41/42 PIL-verified.

## Execution record

- **Baseline**: lint 0/0 · tsc 0 · unit 548/548 (37 files) on the
  merged tree; the e2e census 56/9 specs.
- **The audit**: 0 Critical / 0 High / 0 Medium / 2 Low / 6
  Informational; both Low + the four cured Info findings hand-verified
  in source; S17-8's claim re-verified live.
- **The parity walk**: the reference live (NO drift — the five-route
  OG family, the mobile menu, sitemap/robots) + the clone's dev server
  (the menu family, the derived titles) + the live cure probes.

## Post-execution record (appended at ship)

- **R17-1 (S17-1)**: the comment's `409` → `400`, with the S17-1
  provenance note naming the retired phantom status.
- **R17-2 (S17-2)**: the README table repaired — one continuous table
  (sessions 1–17), the two stale fragment gate lines superseded by the
  single post-table gate line at the session-17 counts; the docs-counts
  census green throughout (the pinned strings untouched).
- **R17-3 (S17-3)**: the generate route's discarded-500 comment in (the
  S14-3 401-discard's graceful-degradation twin).
- **R17-4 (S17-4)**: the DEPLOYMENT.md re-seed note in (the demo
  password re-arm + the tokenVersion reset + the operator guidance).
- **R17-5 (S17-5)**: the pin FIRST (one behavioral pin owning both
  hostile faces — `text/x-application/json` + `application/jsonx`,
  co-pinned and documented in the pin's comment) — RED against the
  `.includes()` tree (exactly the new pin failed, 11/12), then the
  api.ts gate parses the media type (`split(";")[0].trim().
  toLowerCase() === "application/json"`) — the reader family 42/42
  post-cure (charset/case/absent/plain/multipart arms unchanged).
  **Mutation battery**: the gate reverted to `.includes` → exactly the
  pin RED → restored → GREEN (12/12).
- **R17-6 (S17-6)**: the timer hygiene — generator-card + contact-form
  mirror the toast's idiom (the `React.useRef<ReturnType<typeof
  setTimeout> | null>(null)`, the clear-before-re-arm — a rapid re-copy
  now gets its full 2s window — and the unmount clear). ONE co-pinned
  source pin in landing-page.test.ts (comment-stripped needles).
  **Mutation batteries**: removing generator-card's unmount clear REDs
  exactly the pin; removing contact-form's REDs exactly the pin (one
  battery per face) → restored → GREEN (21/21).
- **R17-7 (S17-7)**: `noValidate={false}` removed from contact-form.
- **R17-8 (S17-8)**: the PAD §11 S15-6 row refreshed with the
  session-17 independent re-verification (the warn-level dry-run
  re-count: exactly 2 flags, both particle-text.tsx:293).
- **R17-9 (lockstep)**: unit 548 → 550/37 files (+1 the media-type
  pin, +1 the timer source pin), e2e 56 unchanged, badge 604 → 606;
  the count-history comment; README (badge, architecture/testing
  counts, the repaired table + the session-17 row, the gate line);
  AGENTS (counts, the plans map's seventeenth round); CLAUDE; PAD
  (§8.1 distribution, §8.3 doctrine line, §11's row, §12 header +
  the api.ts 230→239 and generator-card 191→203 rows re-anchored to
  the live `wc -l`); the SKILL v1.12.0 → v1.13.0 (frontmatter, the
  §11 checklist counts, Appendix A's session-17 row, Appendix B
  re-certified through session 17 with the new pins in the ledger);
  worklog Task 17; this record.
- **R17-10**: captures 41/42 on the remediated tree (dev server: the
  landing 1280×800 + the OPEN mobile menu 390×844, via `localhost`,
  hydration awaited), PIL-verified.
- **R17-11**: the full gate on the exact commit tree → the Conventional
  Commit on `main` → the SSH-wrapper push (dry-run first).
- **Deferred (none)**: every finding cured or verified this round; the
  standing PAD §11 deferrals (S16-3's eslint off-switch scoping,
  S16-5's footer-year freeze) unchanged.
