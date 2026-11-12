# Session 41 — The Boot-Gate Exact-Prefix Case Arm + The Dead Stepped-Stock Retirement + The Toast-Kit BY-DESIGN Note + The Comment-Truth Batch (2026-11-13)

## Context

Session 40 shipped `2d7cced` (the boot-gate six-knob case arm, the reveal
count truth, the dead-surface retirement, the comment-truth batch); the
owner's narration commits `74b340c`/`29e47a2` followed (session_41.md
carries the round-40 narration — this round replaces it with the formal
log). The standing instruction re-ran end to end: docs review → baseline
gate → the comprehensive audit (three parallel subagents) → the live
reference parity walk → the TDD cures → the gate → captures → push.

**Baseline (the tree at `29e47a2`, verified in place):** lint 0/0 · tsc 0 ·
unit 681/681 (40 files) · build · smoke 16/16 · e2e 65/65 (9 specs) ·
census MATCH · `.env`'s `DATABASE_URL="file:../db/custom.db"` with `db/`
at the repo root ✓ · the vitest + playwright suites in place and current ✓
· the sitemap/robots/manifest/OG family verified live against the
reference (this round's walk) ✓ · `skills/` excluded from every gate ✓ ·
`.env.example` present, committed, matching the six-knob contract ✓.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib
seams, AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs
— every load-bearing finding hand-verified in source by the lead,
including a dynamic probe of the boot-env arm matrix and an independent
dead-literal census):
**AUDIT-1: 0C/0H/0M/4L/2I · AUDIT-2: 0C/0H/0M/2L/3I · AUDIT-3:
0C/0H/0M/0L/4I** — combined **0 Critical / 0 High / 0 Medium / 6 Low /
9 Info**. The session-40 diff itself verified correct and complete on
all three passes (the six-knob case arm with its ownership separation,
the NEO_ tail uppercase, the keywordsOf guard, the dead-prop
retirements, the login-reset member retirement, the docs batch — all
re-confirmed; the residuals below are pre-existing debt the round's own
doctrine would eventually claim, plus two dead surfaces the S40-1 cure
itself shipped).

**The parity walk** (live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`; viewport confirmed 390×844 before every
mobile probe, computed styles as ground truth): **ALL FACES MATCH, NO
DRIFT — the fourteenth consecutive fully-clean walk.** The mobile menu
works as expected (the owner's standing concern): the panel enumerated
live on the reference and byte-verified against ours — the four nav
links (Home /Tool /Pricing /Contact; the active link's teal
`text-teal-400` face, the siblings' `text-slate-300 hover:text-white`) +
the Gumroad pill ("Upgrade to Pro – $19", the same templixco href),
classes, hrefs, texts, cursor pointer all matching; panel mechanics
identical (display block + max-height none + overflow hidden; the
reference's `bg-slate-900/98` still computing `rgba(0,0,0,0)` — dead in
its own build); the hamburger cursor pointer both sides (the Tailwind v4
standing concern holding); the reference's hamburger still ships NO
aria family (our expanded aria-expanded/controls/label is the documented
superset); Escape leaves the reference's panel open (our F11-11
superset, re-confirmed live). The desktop nav byte-identical (brand + 4
links + the Upgrade pill); the five-route head census byte-identical
modulo origin (titles, og:title, canonicals; the unprefixed family on /
and /login); sitemap 4 URLs both (identical modulo origin); robots
identical modulo origin; the generator probe symmetrically
disabled/not-allowed (R 405 platform-side, L works — the documented
superset); the login round-trip both landing the landing (R `/Home`, L
`/` — the documented 308 deviation), the clone session verified live
via /api/auth/me (`sepnetflix2023@outlook.com`, role admin).

**The neo-crm reference repo re-checked** (the standing instruction):
its latest sessions 213–217 deepen the semantic-prose census genus on
ITS OWN docs; viralpost-ai adopted the genus at session-12 (the
docs-counts semantic-prose arms, 39 toContain pins + the
comment-stripped reality censuses) — patterns current, nothing new to
adopt.

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S41-1 | **LOW** (AUDIT-1 A1) | `src/lib/verification.ts:27-31`, `src/app/api/auth/signup/route.ts:83-86`, `src/app/api/auth/resend/route.ts:30-32` | Stale "never shipped to the client" claims contradict the shipped in-app OTP delivery: since the digma ADR-014 port, signup (:120) and resend (:115) ship `verificationCode: inAppOtpEnabled ? code : null` — ENABLED BY DEFAULT (the demo posture). All three comments predate the port; an operator auditing the seam from them would wrongly conclude the API never returns the OTP. Cure: re-spell all three to the truthful form (stored hashed; delivered in-app by default; `VIRALPOST_DISABLE_IN_APP_OTP=1` hands delivery to a mail transport — and only then is it console-only, never shipped). |
| S41-2 | **LOW** (AUDIT-1 A2) | `src/app/api/auth/resend/route.ts:64-67` (S14-2 comment), `:79-90` (S40-3 block) | Two comment-truth residuals in resend: (a) the S14-2 equalizer comment claims "ships the SAME response shape … the key's presence no longer leaks the verification state" — true only with `VIRALPOST_DISABLE_IN_APP_OTP=1`; under the default knob the known branch's `verificationCode: "123456"` vs the no-op's `null` is itself the account/verification-state oracle (subsumed by the accepted S13-1 posture, but the comment reads unconditional); (b) the S40-3 block says the account "flips back to unverifiedAccount() once the surviving session's 7-day TTL lapses" — the predicate flips true at the WRITE; only the lockout EFFECT is masked until session expiry. Cure: qualify (a) with the knob condition; reword (b) to "the account again owes verification (the hash is live immediately); the surviving session masks it until its TTL lapses". |
| S41-3 | **LOW** (AUDIT-1 A3) | `src/lib/boot-env.ts:222-228` (the S40-1 cure's own arm) | Dead surface inside the S40-1 cure itself: the third canonical sub-branch's `?? key.toUpperCase()` fallback is unreachable (the arm condition's `some()` guarantees `find()` resolves on that branch — identical predicates), and the maps-ternary's left arm `KNOWN_VIRALPOST_VARS.has(canonical)` is fully subsumed (`SIX_KNOB_NAMES ⊇ KNOWN_VIRALPOST_VARS`, verified) — ironic given S40's own dead-surface-retirement theme. Cure: compute the six-knob `find()` once, lead the canonical ternary with it (no fallback arm exists by construction — proven input-equivalent for every key class), drop the subsumed left arm. |
| S41-4 | **LOW** (AUDIT-1 A4) | `src/lib/boot-env.ts:185-192` (the first branch) | The S40-2 shape on the VIRALPOST_ face: an exact-`VIRALPOST_`-prefix MIXED-TAIL key (`VIRALPOST_proxy_hops`) is caught by the first branch and warns "Unknown VIRALPOST_* … A typo here silently no-ops" (dynamically verified) — the operator configured a REAL knob with wrong casing but gets the generic typo message without the actionable "Set X instead". S40-2 cured the identical shape on the NEO_ face (`NEO_Proxy_Hops`). Cure: in the first branch, test a case-insensitive match against `KNOWN_VIRALPOST_VARS` first and route it to the case-variant vocabulary; +1 RED-first pin (`VIRALPOST_proxy_hops` → "Set VIRALPOST_PROXY_HOPS instead"). |
| S41-5 | **LOW** (AUDIT-2 L1) | `src/app/globals.css:150-166,172-179` (the stepped @theme block), `tests/design-tokens.test.ts:269-275` (the dead-token census comment) | 11 pinned-but-unused stepped literals — donor-template carryover shipping as dead `:root` custom properties in every build: the gray family (gray-50/100/200/400/500/900 — 6 of 11 steps, ZERO consumers of any gray step), `neutral-100`, `red-400`, `red-500`, `emerald-400`, `emerald-500` (incomplete-subset pins beside their used siblings). The dead-token census exempts "stepped stock re-pins" with a "whole families pinned defensively" rationale that covers only the three true whole-family pins (amber/slate/teal 50..950) — the exemption text overclaims. Cure: retire the 11 literals; re-spell the census comment to the accurate doctrine; +1 RED-first stepped dead-literal census arm in design-tokens.test.ts (every stepped literal outside the three whole families must have a live comment-stripped consumer — the census that makes the genus mechanically impossible); battery: re-add gray-100 → the census REDs naming it. |
| S41-6 | **LOW** (AUDIT-2 L2) | `src/components/ui/toast.tsx:77-82` (the toast API) | Zero-consumer toast API members: in src only `toast.error` (×6) and `toast.info` (×1) have call sites; `toast.success` and the public `toast.dismiss` have zero callers, making the success variant's render path unreachable in-app (ICONS.success, the border-emerald-200 arm — pinned only by toast-anatomy's source-string tests). Adjudication: **BY DESIGN, not retirement** — the variant triad is the reference's walk-censused toast anatomy (a parity face of the component kit; retirement would cascade emerald-200's pin and shrink the parity face). Cure: the documented-by-design note at the API (the BRAND.name precedent — "carries no runtime consumer BY DESIGN"; toast-anatomy.test.ts owns the anatomy). |
| S41-7 | **INFO→cure** (AUDIT-2 I1) | `src/components/marketing/generator-card.tsx:244` | The S24-4 comment's ratio cite understates the measurement: "teal-600 (≈3.05:1) clears it" — teal-600 #0d9488 on the card's bg-white computes **3.74:1** (3.58:1 on slate-50; the sibling cites 2.49/2.57/7.5/4.76 all verify exactly). Cure: re-spell to ≈3.74:1. |
| S41-8 | **INFO→cure** (AUDIT-2 I2) | `src/lib/page-layout.ts:55-61` | The S40-8-re-spelled comment sits BETWEEN the `input:` entry and the `submit:` key — it reads as the submit button's docblock while describing the auth inputs (the sibling cure in login-reset.ts is correctly anchored above `resetInput`). Cure: move the block above `input:`. |
| S41-9 | **INFO→cure** (AUDIT-2 I3) | `src/components/marketing/footer.tsx:38` | The icon lookup `SOCIAL_ICONS[s.label as keyof typeof SOCIAL_ICONS]` compiles even for a label with no icon entry (would render `<undefined/>` at runtime); today only test-guarded (nav-config.test.ts pins the five-label array). Cure: the `satisfies Record<(typeof SOCIAL_LINKS)[number]["label"], LucideIcon>` form — the cast dies, the relationship is compile-time exhaustive (a future label without an icon is a typecheck error). |
| S41-10 | **INFO→cure** (AUDIT-3 I1) | `docs/session_40.md:183-184`, `worklog.md:4316-4317` | The provenance re-anchor phrasing "the ten provenance sites + toast's owned tenth re-anchored to 1..40" enumerates 11 where the census finds exactly 10 (toast included) — the session-39 form ("nine sites + toast's owned tenth" = 10) was arithmetically right; the session-40 carryover reused the "+" construction with "ten". The plan's parenthetical form is correct. Cure: re-spell both records to the parenthetical form ("the ten provenance sites (toast.tsx the owned tenth) re-anchored to 1..40"). |
| S41-11 | **INFO→cure** (AUDIT-3 I2) | `README.md:146` | README's Testing block gives plain `bun run test:e2e`; AGENTS/CLAUDE prescribe `CI=1 bun run test:e2e` (the reused server keeps in-memory rate buckets — a second run inside the 15-min window trips LOGIN at the 11th cumulative POST). A user following only README gets confusing 429s on re-runs. Cure: the one-line re-run remedy in README's e2e note. |
| S41-12 | **INFO→cure** (AUDIT-3 I3) | `Project_Architecture_Document.md:568` (§8.1 E2E row) | The row's Location cell `tests/e2e/*.spec.ts` attributes all 65 tests to a directory holding 64 — the 65th lives in `tests/e2e/auth.setup.ts` (the setup project; AGENTS:98 discloses the inclusion). Cure: "(+ auth.setup.ts)" in the Location cell. |
| S41-13 | **INFO→cure** (AUDIT-1 A5) | `src/lib/schemas.ts:26` (`emailSchema`), `src/lib/generator.ts:399` (`countWords` export) | Pin-only exports without the doctrine's "kept" annotation: `emailSchema`'s only non-test consumer is its own pin (the sibling schemas use the internal `emailFormat`); `countWords` is internal-but-exported for its pins. The repo's doctrine either retires such surface (S40-6) or annotates it (`extractHashtags` at generator.ts:405: "Kept: it has a live caller"). Cure: the one-line "Kept: pin-owned" annotation at both (retirement would touch more surface than the note; the pins own real behavior). |
| S41-14 | **INFO→cure** (AUDIT-1 A6) | `src/lib/db-path.ts:40-42` | The S40-12 `node:` normalization (scoped to crypto) leaves this module the only bare-specifier holdout under src/ (`fs`/`path`/`url` — scripts/prisma-env.ts already uses `node:child_process`). Semantically inert; the hygiene genus completion. Cure: `node:fs`/`node:path`/`node:url` (line-in-place; PAD §12's db-path row 335 unchanged). |

**Accepted/observed register (this round's tail, with reasons):** the
vitest e2e separation is include-glob-based, not an exclude entry
(AUDIT-3 I4 — the config's own comment documents the mechanism
accurately; a future `tests/e2e/foo.test.ts` would be counted by the
reality census and ignored by Playwright — observation only, no drift);
the whole-family stepped pins amber/slate/teal 50..950 stay (the
documented defensive doctrine — any future step of those families
renders the v3 value; S41-5 retires only the incomplete-subset/
zero-consumer literals); the standing register carried forward unchanged
(the prefers-reduced-motion live-toggle gap, the JSON-LD/og:locale/
twitter:site family, the `.env.local` unmodeled face, the signup
admin-bootstrap TOCTOU, the scryptSync posture, the login photoUrl
asymmetry, the in-app delivery default, the S26-3 breakpoint-crossing
posture, the ParticleText sr-only duplication, the Reveal SSR opacity,
the worklog's structural inconsistencies, the dual 503 code strings, the
anchor CTAs' UA-default focus, the footer h4 skip, the cross-breakpoint
history-nav focus edge, the rate-limit prose hand-maintained across four
sites, the negative quota text on hand-tampered storage).

## The cure set (TDD — every pin RED first or battery-planted, the mutation batteries per the house doctrine)

**Batch 1 — the RED pins:**
- **S41-4a**: `tests/boot-env.test.ts` — inside the flag-typo-guard
  describe, one pin: an exact-`VIRALPOST_`-prefix mixed-tail
  `VIRALPOST_proxy_hops` warns with the case-variant vocabulary ("env
  keys are case-sensitive … Set VIRALPOST_PROXY_HOPS instead", never
  the "Unknown VIRALPOST_* … A typo here silently no-ops" arm). RED now
  (the first branch labels it Unknown).
- **S41-5a**: `tests/design-tokens.test.ts` — a new describe ("design
  tokens: session-41 — the stepped dead-literal census arm (S41-5)"):
  the stepped dead-literal census (extract every stepped
  `--color-<family>-<step>:` literal from @theme; each must either
  belong to the three whole-family re-pins (amber/slate/teal) or have a
  live consumer in comment-stripped src/ — the S28-4 comment-blind
  form). RED now, naming exactly the 11.

**Batch 2 — the GREEN cures:**
- **S41-4**: the first branch routes case-insensitive matches of
  `KNOWN_VIRALPOST_VARS` to the case-variant vocabulary (a
  `knownCaseVariant` find before the Unknown push).
- **S41-5**: retire the 11 literals from globals.css (the gray family ×6,
  neutral-100, red-400, red-500, emerald-400, emerald-500); re-spell the
  dead-token census comment's exemption text to the accurate doctrine
  (the three whole-family pins exempt; every other stepped literal
  consumer-owned by the new census arm).
- **S41-3**: the six-knob `find()` hoisted and computed once; the
  canonical ternary leads with it (no fallback arm); the maps-ternary
  condition drops the subsumed left arm.
- **S41-1**: the three "never shipped to the client" sites re-spelled to
  the truthful in-app delivery form.
- **S41-2**: the S14-2 comment qualified with the knob condition; the
  S40-3 block re-worded (the hash is live immediately; the session
  masks the lockout until its TTL lapses).
- **S41-6**: the BY-DESIGN note at the toast API (the variant triad +
  dismiss are the reference's censused toast anatomy — the kit face;
  toast-anatomy.test.ts owns them).
- **S41-7**: "≈3.05:1" → "≈3.74:1".
- **S41-8**: the page-layout comment block moved above `input:`.
- **S41-9**: the footer lookup re-typed with `satisfies Record<…,
  LucideIcon>`; the cast dies.
- **S41-13**: the "Kept: pin-owned" annotations at `emailSchema` and
  `countWords`.
- **S41-14**: db-path's three specifiers normalized to `node:` forms.
- **S41-10/S41-11/S41-12**: the three docs micro-truths (the
  provenance phrasing ×2 records; the README CI=1 line; the PAD §8.1
  location cell).

**Batch 3 — the mutation batteries (planted defect → exactly the
designed pin RED → restore → GREEN):**
- S41-4: revert the first-branch routing → exactly the S41-4a pin RED
  (the S40-1a six-knob pins and the S40-2a pin stay GREEN — the
  ownership separation).
- S41-5: re-add `--color-gray-100: #f3f4f6;` to @theme → exactly the
  census RED naming gray-100 (the whole-family pins stay exempt).

**Batch 4 — the docs batch + the count re-anchor (constants FIRST —
the session-29..33 lesson):**
- `tests/docs-counts.test.ts`: the count-ladder comment's session-41
  entry; UNIT 681 → **683** (+1 S41-4a in boot-env, +1 S41-5a in
  design-tokens), SUITES 40 unchanged, E2E 65 unchanged, SMOKE 16
  unchanged, badge 746 → **748**.
- README: badge 748, the "40 files / 683 tests" rows, the session-41
  status row, the gate line; the CI=1 re-run remedy (S41-11).
- AGENTS: the counts (683); the plans map's forty-first round.
- CLAUDE: the counts (683).
- PAD: §8.1 table (40 files / 683 tests; the E2E row's location cell
  S41-12); §8.3's "681/65/16" → 683/65/16; §12's globals.css row
  re-anchored to the live `wc -l` (measure post-retirement); db-path's
  335 row unchanged (line-in-place swap); Last Updated stays 2026-11-13.
- SKILL v1.36.0 → v1.37.0: frontmatter (version, date, project_state),
  §0.5's range 1..40 → 1..41, Appendix A's session-41 row, Appendix
  B's header + counts, the pre-ship checklist counts.
- The ten provenance sites re-anchored `session_1..40` →
  `session_1..41` (.env.example, the five test files, db-path.ts,
  health/route.ts, toast.tsx, SKILL §0.5 — the S30-4 convention; lag 0
  at ship).
- worklog Task 41; `docs/session_41.md` (this round's formal log,
  replacing the owner-carried round-40 narration); this plan's
  post-execution record.

**Batch 5 — the verification + the captures:**
- The full gate on the exact commit tree: lint → typecheck → unit
  683/683 (40 files) → build → smoke 16/16 → e2e 65/65 → census MATCH.
- The parity walk RE-RUN post-cure: the standing faces hold (the
  fourteenth walk's battery), no drift.
- Captures 89/90 on the dev server (the owner-instructed posture, the
  session-29..40 precedent): the mobile-menu open clean-walk at
  390×844 + the landing hero at 1280×800, PIL-verified, under
  `docs/screenshots/`.

**Batch 6 — the commit + the push:**
- Conventional Commit on main: `fix: the boot-gate exact-prefix case
  arm + the dead stepped-stock retirement + the toast-kit by-design
  note + the comment-truth batch (session-41 audit)`;
  `.env.example` rides the commit (tracked, six-knob current, the
  provenance note re-anchored to 1..41).
- Push via `docs/ssh_git_wrapper_v3.py` (the runbook is the
  authority): the Appendix-A shim on PATH, the operator key
  materialized 0600 OUTSIDE the repo (never printed), dry-run first,
  real push, remote ref verified, key + temp material shredded.

## Acceptance criteria

1. The boot gate routes an exact-`VIRALPOST_`-prefix mixed-tail key to
   the case-variant vocabulary (+1 RED-first pin; the S40-1a/S40-2a
   pins untouched); the battery on record.
2. The 11 dead stepped literals are gone from @theme; the stepped
   dead-literal census arm is GREEN and planted-defect-proven (re-add
   gray-100 → RED); the dead-token census comment tells the accurate
   doctrine; the amber/slate/teal whole-family pins stay.
3. The S40-1 arm carries no unreachable fallback and no subsumed
   maps-ternary arm; every existing boot-env pin GREEN through the
   restructure.
4. The three OTP-delivery comments tell the in-app truth; the resend
   S14-2/S40-3 comments tell the knob-qualified truth.
5. The toast API carries the BY-DESIGN note; toast-anatomy stays GREEN.
6. The teal-600 cite reads ≈3.74:1; the page-layout comment anchors
   above `input:`; the footer lookup is cast-free and compile-time
   exhaustive; emailSchema/countWords carry the Kept annotations;
   db-path rides `node:` specifiers.
7. The three docs micro-truths land (provenance phrasing ×2, README
   CI=1, PAD §8.1 cell).
8. Full gate GREEN: lint 0/0 · tsc 0 · unit 683/683 (40 files) ·
   build · smoke 16/16 · e2e 65/65 (9 specs) · census MATCH.
9. The walk re-run: no drift.
10. Captures 89/90 PIL-verified under `docs/screenshots/` (post-cure).
11. Docs lockstep: six documents + worklog + session log + this plan's
    post-execution record, all in the same commit; the constants
    re-anchored FIRST; the ten provenance sites at 1..41 — lag 0 at
    ship.
12. Conventional Commit to main; SSH-wrapper push (dry-run first, key
    shredded after).

## ToDo list (execution order)

- [x] 1. Batch 1: place the RED pins — S41-4a in boot-env.test.ts;
      S41-5a (the stepped dead-literal census describe) in
      design-tokens.test.ts
- [x] 2. Verify Batch 1 RED state (exactly the two new pins RED; the
      681 existing GREEN)
- [x] 3. Batch 2: S41-4 (the first-branch routing, GREEN) + S41-5
      (the 11-literal retirement + the census comment, GREEN)
- [x] 4. S41-3 (the arm's dead-surface restructure — every boot-env
      pin GREEN through it)
- [x] 5. S41-1/S41-2 (the OTP-delivery + resend comment truths)
- [x] 6. S41-6 (the toast BY-DESIGN note) + S41-7/S41-8/S41-9
      (the ratio cite, the anchor move, the footer satisfies)
- [x] 7. S41-13/S41-14 (the Kept annotations, the node: specifiers) +
      S41-10/S41-11/S41-12 (the docs micro-truths)
- [x] 8. Intermediate gate check (lint/tsc/unit — expect only the
      designed Batch-4 census REDs)
- [x] 9. Batch 3: the mutation batteries (S41-4, S41-5)
- [x] 10. Batch 4: constants FIRST (UNIT 683, badge 748), the census
       doc-site walk RED→GREEN, PAD §12 globals.css row, SKILL v1.37.0,
       the ten provenance sites 1..41, worklog Task 41, README/AGENTS/
       CLAUDE rows, session_41.md, the plan record
- [x] 11. Batch 5: the full gate + the walk re-run + captures 89/90
- [x] 12. Batch 6: commit + SSH-wrapper push (dry-run first, remote
       verified, key shredded)

## Post-execution record

Executed as planned, with the mid-round notes on record:

- **The count projection held exactly**: UNIT 681 → 683 (+1 S41-4a in
  boot-env, +1 S41-5a in design-tokens), SUITES 40, badge 746 → 748.
  The reality census confirmed 683 on disk before any doc site was
  touched; the constants were re-anchored FIRST; the census walked the
  doc sites RED→GREEN (PAD §12: generator 467→470, db-path 335→339,
  globals.css 253→250, generator-card 271→273 — the S41-7 comment
  re-spell added the two lines the §12 row caught on the first census
  pass).
- **The S41-5 doctrine boundary held under the lead's independent
  census**: the comment-blind re-census found 18 zero-consumer stepped
  literals (the audit's 11 plus amber-50/200/700/800/950, slate-950,
  teal-800); the extra 7 are the whole-family pins the documented
  defensive doctrine covers (amber/slate/teal 50..950 — "any future
  step renders the v3 value") and stay. The audit's 11 —
  incomplete-subset or zero-consumer-family pins — are exactly what
  the new census arm now makes impossible.
- **The S41-3 restructure is input-equivalent by enumeration**: the
  six-knob face (auth_secret → AUTH_SECRET), the neo_/viralpost_
  prefix faces (neo_proxy_hops → VIRALPOST_PROXY_HOPS,
  viralpost_disable_in_app_otp → VIRALPOST_DISABLE_IN_APP_OTP), and
  the unknown-tail miss (viralpost_unknown_thing → the "no knob maps"
  branch) all produce byte-identical warnings; all 47 boot-env pins
  GREEN through the restructure with zero re-pinning.
- **The provenance re-anchor walked all ten sites** to 1..41 in one
  pass; zero `session_1..40` strings survive anywhere the census
  scans. Lag 0 at ship.

**Final state:** lint 0/0 · tsc 0 · unit **683/683** (40 files) ·
build · smoke **16/16** · e2e **65/65** (9 specs) · census MATCH ·
badge **748**. Captures 89/90 PIL-verified + signature-verified on the
dev server (post-cure, the menu functionally verified open — the
aria-expanded/panel-mechanics/Escape battery re-run — before the shot).
Docs lockstep: README + AGENTS + CLAUDE + PAD + SKILL v1.36.0 →
v1.37.0 + the ten provenance sites re-anchored to 1..41 (toast.tsx the
owned tenth) + worklog Task 41 + docs/session_41.md + this
post-execution record. Pushed to main via the SSH wrapper (dry-run
first, key shredded after).
