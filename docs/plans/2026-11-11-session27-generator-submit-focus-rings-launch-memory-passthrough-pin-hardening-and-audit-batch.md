# Session 27 — The Generator-Submit Focus Rings + The Launch `:memory:` Pass-Through + The Pin-Hardening Batch (2026-11-11)

## Context

Session 26 pushed `0cd72eb`; the owner added `899ec82` (the session-26
execution log held as `docs/session_27.md`, the established pattern). This
round re-ran the standing instruction against the merged tree: docs review
→ baseline gate → the comprehensive audit (three parallel subagents) → the
neo-crm re-review (HEAD `b3d0fbe`, UNCHANGED since session 12 — the
recorded decisions stand) → the live reference parity walk → the TDD cures
→ the gate → captures → push.

**Baseline (the merged tree, verified in place):** lint 0/0 · tsc 0 · unit
629/629 (38 files) · census MATCH · `.env`'s
`DATABASE_URL="file:../db/custom.db"` with `db/` at the repo root ✓ ·
vitest (`vitest.config.mts`) + playwright (`playwright.config.ts`) suites
in place and current ✓ · sitemap.xml / robots.txt / manifest / OG family
verified live against the reference ✓ · `skills/` excluded from every
gate (tsconfig/eslint/vitest, all pinned) ✓ · `.env.example` present,
committed, and matching the codebase's six-knob contract ✓.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib seams,
AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs — every
load-bearing finding hand-verified in source by the lead):
**AUDIT-1: 0C/0H/0M/1L/5I · AUDIT-2: 0C/0H/1M/1L/2I · AUDIT-3: 0C/0H/3L/3I**
— combined **0 Critical / 0 High / 1 Medium / 5 Low / 10 Info** at the
subagent reports. The lead's adjudication holds the Medium, four of the
Lows, and elevates one Info (a one-line guard hardening on a pin this
repo shipped last round) in the working register (all cured this round —
S27-1..S27-7 below), and moves the rest to the accepted register with
reasons (see below).

**The parity walk (live, both sides, logged into the reference):** the
mobile-menu control census at 390×844 — the hamburger base classes
(`md:hidden p-2 text-slate-300`; ours + the documented S15-8/S23
superset arms), the panel class family (the reference's dead
`bg-slate-900/98` vs our S22-5 arm — both computing transparent at
scrollY=0), the open panel's `max-height: none` (the S26-1 cure holds),
the bar's `bg-transparent` with the menu OPEN at scrollY=0 (the S26-3
cure holds), the four links + the Gumroad pill byte-identical, the bar's
scrolled family byte-identical (`bg-slate-900/95 backdrop-blur-xl
border-b border-white/10 shadow-lg shadow-black/20`; the computed
background differs only in color-space spelling — our oklab form
converts to EXACTLY the reference's `rgba(15, 23, 42, 0.95)` slate-900,
numerically verified). The five-route head census — NO DRIFT (the
session-19 description family holds byte-for-byte, origin difference
only). The footer Product column — 3 links both sides (the S25-1 cure
holds). Sitemap.xml + robots.txt — identical (origin-difference only).
The desktop nav family — byte-identical. The clone's generator
round-trip — green, node A announcing "Post generated — 2 free
generations remaining today."
**NO DRIFT FOUND — the first fully-clean walk since session 24.** The
reference's hamburger aria family remains absent (our documented
superset stands); the reference's panel still ignores Escape (our
superset closes it).

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S27-1 | **MEDIUM** (a11y, the house AA focus-ring contract) | `src/components/marketing/generator-card.tsx:206-211` + `src/components/marketing/contact-form.tsx:114-118` | The two highest-traffic submit buttons — Generate Post and Send Message — carry NO focus/focus-visible arm at all (UA-default outline only). Every sibling control one element away carries the house family: the generator textarea (`focus-visible:ring-teal-600`, S23-21), the Copy button one row below (`focus-visible:ring-teal-600`, S21-20), the hamburger (S15-8), the toast-dismiss (S14-6), the auth submits (`ring-ring`, S14-6). The session-25 accepted register scopes the UA-default-focus acceptance to reference-owned LINK families (byte-parity pins); these buttons' pins are `toContain` substrings (`tests/landing-page.test.ts:191`) that survive appended arms. (AUDIT-2 A2-M1.) |
| S27-2 | **LOW** (latent misroute — the S26-9 genus on the launch arm) | `src/lib/db-path.ts:243-266` | The session-26 S26-9 `:memory:` pass-through guards `resolveDatabaseUrl` — but the standalone-launch recovery arm re-anchors DIRECTLY via `urlForRoot(launchDir, ref)`, bypassing that guard. A launch `.env` carrying `file::memory:` (bun absolutizes it to `file:<repo>/:memory:`, matching the arm's signature) re-anchors to a literal `<repo>/prisma/:memory:` file. Live-reproduced in a /tmp sandbox (AUDIT-1 A1-L1). No live caller — latent, the same "no live caller" class S26-9 itself was cured for. |
| S27-3 | **LOW** (comment-truth) | `src/components/layout/login-card.tsx:58-59` | The architecture docblock claims "ZERO toasts fire on the auth flows" — but the card's Google button fires `toast.info("Google sign-in not configured", …)` at :762. The enumerated claims hold; the blanket clause is contradicted by code in the same file. (AUDIT-2 A2-L1.) |
| S27-4 | **LOW** (pin quality — the guard overstates its ban) | `tests/seo-surfaces.test.ts:227-228` | The S26-5 negative arms `/twitter:[\s\S]{0,200}images: \["\/og-image\.png"\]/` are geometrically unreachable at current source: the `images:` line sits 291 chars (site.ts) / 233 chars (layout.tsx) after `twitter:`. The revert mutation stays green through the negative arms (only the positive `toContain` arms RED). The pin's comment credits arms that cannot fire — the S24-9 "pin doesn't pin what its comment claims" genus. (AUDIT-3 A3-L1.) |
| S27-5 | **LOW** (pin quality — a drifting negative) | `tests/docs-counts.test.ts:251` | The S24-1 Appendix-B negative arm `not.toContain(\`unit ${UNIT - 7}/${UNIT - 7} (37 files\`)` bans "unit 622/622 (37 files" — a form that NEVER existed on disk (the actual session-23 miss was "unit 599/599 (37 files"). The dynamic offset drifts with every re-anchor; the sibling arms freeze historical literals. (AUDIT-3 A3-L2.) |
| S27-6 | **LOW** (docs-truth made mechanical) | `tests/e2e/landing.spec.ts:90-96` + 4 doc sites | The 404 `noindex` superset is claimed in README:195, PAD:194/663, SKILL:568/596 — but `rg "noindex" src/ tests/` returns ZERO hits. The face is real today only via Next's built-in not-found meta (present in the built `_not-found.html`); a Next upgrade changing that emission ships through a fully green gate. One e2e arm closes it. (AUDIT-3 A3-L3 + A3-I6.) |
| S27-7 | **INFO→cure** (guard hardening) | `tests/landing-page.test.ts:22` | The S26-4 client-crypto disk census matches only the double-quoted `"use client"` — a single-quoted `'use client'` client component (legal TS/React/Next) is invisible to the census, exempting it from the `@/lib/generator` node:crypto import ban. Zero live instances; the header's "can never miss one" claim overstates. One-line arm. (AUDIT-3 A3-I4.) |

**Accepted register (adjudicated this round, with reasons):** scryptSync on
the request path (AUDIT-1 A1-I2 — the documented pure-seam posture,
bounded by the per-IP limits; the async form is the lift if concurrent
auth load ever matters); the first-signup admin TOCTOU (A1-I3 — no
admin-gated surface exists in the tree today, the seeded demo user makes
`count ≥ 1` anyway); `bun run start`'s pipeline masking the exit status
(A1-I4 — logs + health/smoke carry the real signal); the seed/prune
failure-path disconnect skip (A1-I5 — process death closes the SQLite
handle, the documented sibling idiom); forgot-password's non-transient
read-failure swallow (A1-I6 — the documented no-enumeration posture, the
residual chosen so a failure never mints a link); the reference-inherited
sub-AA text tones (AUDIT-2 A2-I1 — the standing parity-doctrine
adjudication); the quota counter's missing cross-tab `storage` sync
(A2-I2 — reference parity; a superset cure is an owner-level
deviations-ledger decision, recorded here for the ledger); the stripper's
single-quote robustness footnote (AUDIT-3 A3-I5 — a mis-strip there can
only false-RED at gate time, never silently pass; both pinned inputs are
double-quoted). The standing accepted register (the 3rd-generation result
discard, h2-first auth views, S13-1 in-app-delivery, the parity-doctrine
text-ink + UA-default-focus-on-links adjudications, offscreen-rAF pause,
particle resize churn, admin-bootstrap race, Reveal no-JS trade-off,
oklab family, E2E_PORT NaN, scryptSync single-node, stateless logout,
parseInt fail-closed, manifest declared sizes, login-views tautology,
the vitest exclude note) carries unchanged.

## The cure set (TDD — every pin RED first, mutation battery per the house doctrine)

**Batch 1 — the focus-ring family (the round's a11y cure):**
- **S27-1**: both submit buttons gain the S21-20 house family appended —
  `focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-teal-600` (the exact family the Copy button one row
  below and the textarea one element above already carry; teal-600 on
  the white card reads ≈4.5:1; the resting classes byte-untouched, the
  `toContain` pins survive appended arms). Pin (a11y-controls.test.ts, a
  NEW it co-pinning both buttons — the S25-3 family form, co-pinned
  faces documented in the comment): both files' submit class strings
  carry the family. Mutation battery: drop the arm from one button →
  RED.

**Batch 2 — the launch-arm `:memory:` pass-through (the S26-9 sibling):**
- **S27-2**: the launch-recovery arm gains the guard — when the launch
  `.env` value's ref starts with `:memory:`, return the RAW
  `launchEnvUrl` (the arm's own purpose is replacing bun's corrupted
  absolutization with the .env's original value; `file::memory:` is the
  operator's true intent). Pin (db-path.test.ts, the session-34
  standalone describe, a NEW it): the launch shape with
  `DATABASE_URL="file::memory:"` in the repo `.env` and bun's
  absolutized export resolves to `file::memory:` — never a
  `prisma/:memory:` path. Mutation battery: remove the guard → RED.

**Batch 3 — the pin-hardening batch:**
- **S27-4**: the S26-5 negative arms re-anchored to forms that can
  actually reach the face: `/twitter:\s*\{[^}]*images:\s*\["\/og-image\.png"\]/`
  (block-scoped — the match must sit INSIDE the twitter object literal).
  The positive arms keep owning the face. Mutation battery: revert one
  twitter literal in a scratch copy → the re-anchored negative REDs.
- **S27-5**: the S24-1 negative arm frozen at the historical literal —
  `not.toContain("unit 599/599 (37 files")` (the exact miss that shipped
  green through session 23; no dynamic offset). Mutation battery:
  plant the literal in a scratch SKILL copy → RED.
- **S27-7**: the census walker's predicate widened —
  `content.startsWith('"use client"') ||
  content.startsWith("'use client'")`. Mutation battery: plant a
  single-quoted client file importing `@/lib/generator` in a scratch
  src copy → RED.

**Batch 4 — the noindex superset pin + comment truth:**
- **S27-6**: the e2e unknown-route test (`landing.spec.ts`) gains the
  meta-robots arm in place (no new test — the S25-17 fold-in-place
  precedent): `await expect(page.locator('meta[name="robots"]'))` carries
  `noindex`. The PAD ADR-006 wording becomes truthful via the pin. Live
  re-verification: the built 404 HTML carries the meta.
- **S27-3**: the login-card docblock sentence scoped — "zero toasts ride
  the auth flow OUTCOMES; the unconfigured Google button's info notice
  is the card's sole toast call site."

**Batch 5 — the count re-anchor + docs lockstep:**
- Live count walk after the batches: UNIT 629 → 630 (+2 pins: S27-1,
  S27-2 — the S27-4/S27-5/S27-7 hardening folds into existing its in
  place; the S27-6 arm folds into the existing e2e test in place),
  SUITES 38 unchanged, E2E 63 unchanged, badge 692 → 693; the PAD §12
  rows re-anchored for the files whose line counts changed
  (generator-card, contact-form, db-path); the census walked
  RED-to-GREEN site by site.
- SKILL v1.22.0 → v1.23.0 (frontmatter, Appendix A's session-27 row);
  the session-27 plan's post-execution record; worklog Task 27;
  `docs/session_27.md` replaced with this round's log. README (badge,
  gate line, the session-27 row), AGENTS (counts, the plans map's
  twenty-seventh round), CLAUDE (counts), PAD (§12 rows, counts) in the
  same commit.

## Acceptance criteria

1. Every new pin ships RED-first with its mutation battery on record.
2. Full gate GREEN: lint 0/0 · tsc 0 · unit 630/630 (38 files) · build ·
   smoke 15/15 · e2e 63/63 (9 specs) · census MATCH.
3. The two submit buttons render the house focus ring on keyboard focus
   (live-verified on the dev server), resting classes byte-identical.
4. The launch-shape `file::memory:` resolves raw (pin + mutation
   battery); the normal launch re-anchors unchanged (existing session-34
   pins stay green).
5. Captures taken on the dev server (the cured surfaces — the focused
   submit rings), PIL-verified, under `docs/screenshots/`.
6. Docs lockstep: six documents + worklog + session log + this plan's
   post-execution record, all in the same commit.
7. Conventional Commit to main; SSH-wrapper push (dry-run first, key
   shredded after).

## Post-execution record

Executed as planned, with the mid-round deviations on record:

- **The plan's count projection said 630; the executed count is 631.**
  The plan's own cure list names +2 pins (S27-1 + S27-2) — 629 + 2 =
  631; the "629 → 630" line was an arithmetic slip in the plan prose
  (the session-26 precedent: the plan projected +6, shipped +9). The
  reality census caught it exactly as designed: the live count walk is
  the authority, never the plan's arithmetic.
- **One pin-drafting trip, caught by the RED run and fixed in the pin's
  own discipline**: the S27-1 pin initially carried a redundant
  `/…/s`-flag assertion the tsconfig target does not support (TS1501 at
  `tsc --noEmit`) — the assertion was redundant (the toContain arms own
  the face) and was dropped rather than weakening any gate.
- **One S25-3 recurrence, caught by the census the same hour**: the
  session-27 Appendix A row spelled the newly-banned historical literal
  in prose — the S27-5 `not.toContain` arm REDed on the cure's own
  documentation. The row was reworded to describe the literal without
  spelling it (the session-26 S26 lesson: comments may spell retired
  forms only when they cannot false-positive the literal-context bans).
- **The live verification of the Generate button's ring needed the idea
  filled first** — the button is disabled while the idea is empty
  (`disabled={generating || !idea.trim()}`), and a disabled control is
  not tabbable: the naive Tab-walk skipped past it to the CTA anchor.
  The verification filled the idea, then Tabbed — the ring rendered
  (`rgb(13, 148, 136) 0px 0px 0px 2px`, the S21-20 teal-600 family).
  Both buttons live-verified; both captures PIL-verified.

**Final state:** lint 0/0 · tsc 0 · unit **631/631** (38 files; +2
pins) · build · smoke 15/15 · e2e **63/63** (9 specs) · census MATCH ·
badge **694**. Captures 61/62 PIL-verified; the cured surfaces
live-verified on the dev server (the Generate + Send buttons'
teal-600 keyboard rings). Docs lockstep: README + AGENTS (counts + the
plans map's twenty-seventh round) + CLAUDE + PAD (the db-path §12 row
272 → 280, the test-distribution table, the counts) + SKILL v1.22.0 →
v1.23.0 (frontmatter, Appendix A's session-27 row, Appendix B both
counts + the session-27 re-certification, the pre-ship checklist
counts) + worklog Task 27 + the session log. Pushed to main via the
SSH wrapper (dry-run first, key shredded after).
