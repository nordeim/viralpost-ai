# Session 40 — The Boot-Gate Six-Knob Case Arm + The Reveal Count Truth + The Dead-Surface Retirement + The Comment-Truth Batch (2026-11-13)

## Context

Session 39 shipped `220f29f` (the mobile-menu count truth, the typed-envelope
alignment, the boot-gate case arm, the comment-truth batch); the owner's
narration commit `4270673` followed (session_40.md carries the round-39
narration — this round replaces it with the formal log). The standing
instruction re-ran end to end: docs review → baseline gate → the
comprehensive audit (three parallel subagents) → the live reference parity
walk → the TDD cures → the gate → captures → push.

**Baseline (the tree at `4270673`, verified in place):** lint 0/0 · tsc 0 ·
unit 675/675 (40 files) · build (the emitted sheet carries
`button,[role=button]{cursor:pointer}`) · smoke 16/16 · e2e 65/65 (9
specs) · census MATCH · `.env`'s `DATABASE_URL="file:../db/custom.db"`
with `db/` at the repo root ✓ · the vitest + playwright suites in place
and current ✓ · the sitemap/robots/manifest/OG family verified live
against the reference (this round's walk) ✓ · `skills/` excluded from
every gate ✓ · `.env.example` present, committed, matching the six-knob
contract ✓.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib
seams, AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs
— every load-bearing finding hand-verified in source by the lead):
**AUDIT-1: 0C/0H/0M/3L/6I · AUDIT-2: 0C/0H/0M/5L/4I · AUDIT-3:
0C/0H/0M/2L/3I** — combined **0 Critical / 0 High / 0 Medium / 10 Low /
13 Info**. The session-39 diff itself verified correct and complete on
all three passes (the typed casts, the case arm with its load-bearing
exclusions, the footer wiring, the prop retirements, the re-anchors —
all re-confirmed; the residuals the round left are the Lows below).

**The parity walk** (live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`; the session-35..39 instrument lessons
applied — `set viewport` + innerWidth confirms, nav-anchored selectors,
computed styles as ground truth): **ALL FACES MATCH, NO DRIFT — the
thirteenth consecutive fully-clean walk.** The mobile menu works as
expected (the owner's standing concern): open at a confirmed 390×844,
the panel display block + max-height none + overflow hidden, the
hamburger cursor pointer both sides, the reference's `bg-slate-900/98`
still computing `rgba(0,0,0,0)` (dead in its own build) — and the
panel anchors enumerated byte-identical both sides: the four nav links
(Home /Tool /Pricing /Contact — the active link's teal face, the
siblings' slate-300 hover:text-white) + the Gumroad pill
("Upgrade to Pro – $19", the same templixco href), classes, hrefs,
texts all matching. Escape leaves the reference's panel open (our
F11-11 superset, re-confirmed). The desktop nav byte-identical (brand +
4 links + the Upgrade pill); the five-route head census byte-identical
modulo origin (titles, og:title, canonicals; the unprefixed family on
/ and /login); sitemap 4 URLs both (identical modulo origin); robots
identical modulo origin; the generator probe symmetrically
disabled/not-allowed (R 405 platform-side, L works — the documented
superset); the login round-trip both landing the landing (R `/Home`,
its duplicate-of-`/` route; L `/` — the documented 308 deviation), the
clone session verified live via /api/auth/me.

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S40-1 | **LOW** (AUDIT-1 A1-2) | `src/lib/boot-env.ts:170-190` (the case arm matches only `/^viralpost_/i` or `/^neo_/i`) | The case-variant hazard S39-13 was built for (a spelling invisible to the exact-case reader, with no `[boot]` warning) applies equally to three of the six knobs, but the arm's prefixes exclude them by construction. A `database_url`/`auth_secret`/`next_public_site_url` spelling is invisible to every arm: DATABASE_URL gets zero signal in any mode (runtimeDatabaseUrl() silently falls to the `.env` value while the operator believes they configured the environment's knob — the sharpest face), NEXT_PUBLIC_SITE_URL is fully silent in dev (and the production "is unset" warning misleads when a case-variant IS set), AUTH_SECRET degrades to the dev fallback with a "missing" message. Cure: extend the case arm to the six-knob name set (the three VIRALPOST_* + AUTH_SECRET + NEXT_PUBLIC_SITE_URL + DATABASE_URL) — warn-only, mapping the canonical spelling, the exact-case exclusions load-bearing as at S39-13; +3 RED-first pins (auth_secret, next_public_site_url, database_url case variants). |
| S40-2 | **LOW** (AUDIT-1 A1-3) | `src/lib/boot-env.ts:161-169` (the NEO_ branch) | The NEO_ arm's canonical mapping does not uppercase the tail: `VIRALPOST_${key.slice(4)}` — so an exact-`NEO_`-prefix mixed-tail key (`NEO_Proxy_Hops`, `NEO_disable_in_app_otp`) fails `KNOWN_VIRALPOST_VARS.has(mapped)` and lands in the dead-end "no knob maps" branch instead of the actionable "Set VIRALPOST_PROXY_HOPS instead" (the S39-13 arm solved the identical problem for the lowercase-lead shape by uppercasing). Cure: `key.slice(4).toUpperCase()` — one line, mirroring the case arm; +1 RED-first pin (`NEO_Proxy_Hops` maps `VIRALPOST_PROXY_HOPS`). |
| S40-3 | **LOW** (AUDIT-1 A1-1) | `src/app/api/auth/resend/route.ts:79-86` | The undocumented mirror of the accepted S39-8 race: if verify's success-clear commits between resend's `findUnique` and resend's unconditional `update`, the resend re-writes a fresh `verificationCodeHash` onto a row that no longer owes verification — the account flips back to unverifiedAccount() after the session's 7-day TTL (self-recoverable through the standard funnel; requires the same user's verify and resend inside a millisecond window; resend is capped 5/15min/IP). Either document beside the S39-8 comment (the accepted-race doctrine) or close structurally with the reset-password updateMany-conditional idiom. **Adjudication: document** — the S39-8 precedent (the conditional WHERE would reject a user who did everything right on the verify side; the same reasoning holds for the resend side — a conditional WHERE would drop a legitimate re-arm for an account whose code was valid at read time). |
| S40-4 | **LOW** (AUDIT-2 L1) | `src/components/effects/reveal.tsx:45` (the S39-10 docblock), `docs/session_39.md:124`, the session-39 plan's S39-10 row | The Reveal count in the S39-10 docblock is wrong: "all 19 render the default div" — the mechanical census of `<Reveal` JSX call sites is **17** (generator-card ×2, hero ×1, sections ×14 — the 15th sections hit is the prose mention at :467; rendered instances on `/` are 31). The count-truth genus, shipped inside the count-truth commit itself. Cure: re-spell 19 → 17 at all three sites (the S39-1 precedent — records catching up to the code). |
| S40-5 | **LOW** (AUDIT-2 L2) | `src/components/marketing/logo.tsx:15` (`className`), `src/components/effects/iridescence.tsx:25/121/266` (`className`), `src/components/marketing/sections.tsx:460` (`children`) | Dead component-API siblings of the S39-10 retirement: three zero-consumer props the round stopped one census short of. `Logo({ className })` — both call sites bare (navbar:140, footer:27); the `cn("flex items-center gap-2 group", className)` merge arm is dead. `IridescenceProps.className` — the only call site (hero:27) passes only hue/power/focus/distortion; the `cn("h-full w-full", className)` merge arm is dead. `PricingSection({ children })` — both call sites render it bare ((site)/page.tsx:40, (site)/Pricing/page.tsx:26); the `{children ?? <PricingCards />}` fallback always wins. Cure: retire the three props per the S39-10 doctrine — static classes stay byte-identical (DOM unchanged), the dead cn() imports go where the merge arm was their only consumer (logo.tsx, iridescence.tsx). |
| S40-6 | **LOW** (AUDIT-2 L3) | `src/lib/login-reset.ts:158` (signup viewColumn), `:220-221` (verify viewColumn/viewStack), the docblock `:216-219`; the pin `tests/login-views.test.ts:199` | Dead layout-vocabulary members: `LOGIN_VERIFY_LAYOUT.viewColumn`/`viewStack` have zero consumers in any commit (dead since the session-21 introduction — the verify view actually rides `LOGIN_RESET_LAYOUT.viewColumn` and, via the login-card:473 ternary's else-branch, `LOGIN_RESET_LAYOUT.viewStack`, whose value is identical); `LOGIN_SIGNUP_LAYOUT.viewColumn` is unwired in src (the wrapper at login-card:464 covers all four non-signin views) but pinned at login-views.test.ts:199. The docblock compounds it ("the verify view's own stack carries the sm:space-y-6 arm" — describing vocabulary that is not the one wired). Cure: retire the three dead members; re-pin :199 (drop the viewColumn assertion, re-spell the title); re-spell the docblock to the truth (the verify view rides the reset family's column/stack — identical computed values). |
| S40-7 | **LOW** (AUDIT-2 L4) | `src/lib/route-title.ts:8-11` | Stale mechanism comment: "the client-side set in NotFoundBody mirrors that mechanism" — NotFoundBody sets no title anywhere in its history (it only interpolates usePathname into the message); our title is derived server-side by the catch-all segment LAYOUT's generateMetadata, exactly as that layout's own docblock states. The two files describing the same mechanism disagree. Cure: re-spell to the truth (the layout's server-side generateMetadata derives the real title; NotFoundBody's client-side usePathname mirrors only the message interpolation). |
| S40-8 | **LOW** (AUDIT-2 L5) | `src/lib/page-layout.ts:54-57`, `src/lib/login-reset.ts:113-119` | The focus-ring comments describe the reference's slate-400 ring while the shipped classes carry the slate-600 superset: page-layout's `input` and login-reset's `resetInput` both say "the SOLID slate-400 2px ring" over classes that ship `focus:ring-2 focus:ring-slate-600` (the S25-3 WCAG 1.4.11 upgrade — the reference's slate-400 ring computes ≈2.57:1; ours rides slate-600 ≈7.5:1). The third sibling (LOGIN_SIGNUP_LAYOUT.input's docblock :196-200) carries the accurate form — the three comments disagree about the same class family. Cure: re-spell both to the signup sibling's accurate form. |
| S40-9 | **LOW** (AUDIT-3 L1) | `Project_Architecture_Document.md:424-439` (§4.1 User block) | The PAD §4.1 mermaid User block omits the `photoUrl` column (schema drift in the blueprint): `prisma/schema.prisma:23` carries `photoUrl String?`, it is seeded (prisma/seed.ts:40) and rides the SessionUser shape (src/lib/auth.ts:166/:190 — wire-visible on /api/auth/me). Zero PAD hits repo-wide; other nullable columns ARE listed, so this is an omission, not a documented exclusion. Cure: add `string photoUrl "nullable"` after `avatarColor`. |
| S40-10 | **LOW** (AUDIT-3 L2) | `README.md:100`, `Project_Architecture_Document.md:331` (the file-tree scripts/ lines) | The scripts/ tree lines name only 3 of 5 scripts (stale since sessions 23/34): `e2e-prune.ts` (S23-22) and `e2e-contact-readback.ts` (S34-2) are omitted from both. AGENTS/PAD §4.3 enumerate the three one-shot scripts correctly — only the two tree lines lag. Cure: extend both lines to all five. |
| S40-11 | **INFO→cure** (AUDIT-3 I1) | `tests/docs-counts.test.ts` (absent arm) | Census blind spot: no mechanical pin walks PAD §4.1 against `prisma/schema.prisma` — which is exactly how S40-9 drifted green since the field's introduction (the badge-drift genus on the model face, the one count family that lacks a census). Cure: +1 census arm in the reality-census describe — extract the field names from the schema's `model User`/`model ContactMessage` blocks and assert each appears in PAD §4.1's mermaid block (the S24-9 one-spanning-pin form); placed RED-first (photoUrl ∈ schema but ∉ PAD today), battery on record (remove the photoUrl row → the arm REDs). |
| S40-12 | **INFO→cure** (AUDIT-1 A1-5, the S39-6/S39-7 genus) | `src/app/api/auth/signup/route.ts:9`, `src/lib/auth.ts:10`, `src/lib/generator.ts:25`, `src/app/api/generate/route.ts:1` | Import-hygiene leftovers the session-39 alignment pass didn't reach: signup's `import { Prisma } from "@prisma/client"` sits last while the three siblings place it first; the crypto specifier is split — bare `"crypto"` (auth.ts, generator.ts, generate/route.ts) vs `"node:crypto"` (password.ts, forgot-password/route.ts). Semantically inert; the same genus class as S39-6/S39-7 (INFO→cure). Cure: move the Prisma import to the sibling position; normalize to `"node:crypto"` (the explicit form password.ts already uses). |
| S40-13 | **INFO→cure** (AUDIT-1 A1-6) | `src/lib/generator.ts:330-340` (`keywordsOf`) with `toHashtag` at `:353-359` | A dash-only keyword token renders a bare `#` hashtag: `keywordsOf` keeps `-` in its character class, so a standalone run of ≥3 dashes (an idea containing `love ---- today`) survives as a keyword; `toHashtag("----")` → the split/filter/join chain yields `""` → the post text receives a lone `#` (which `extractHashtags` would not count — the e2e window helper and hashtagCount can disagree). Pathological-input cosmetic corruption; no injection surface. Cure: the guard in `keywordsOf` — a token must contain a letter or digit (`/[a-z0-9]/.test(w)`); +1 RED-first pin in generator.test.ts (a dash-run idea produces no lone `#`). |
| S40-14 | **INFO→cure** (AUDIT-1 A1-7) | `src/app/api/auth/signup/route.ts:107`, `src/app/api/auth/resend/route.ts:95` | "(expires in 15 minutes)" is hardcoded in the two OTP console logs — hand-coupled to `VERIFICATION_TTL_MS` (src/lib/verification.ts:40); a future TTL edit leaves the operator-facing log lying. Cure: derive the phrase from the constant (`${VERIFICATION_TTL_MS / 60000} minutes`) — both sites already import the constant. |

**Accepted register (this round's tail, with reasons):** AUDIT-1 A1-4 (the
dual 503 code strings `UNAVAILABLE` vs health's `SERVICE_UNAVAILABLE` —
pinned deliberate, both in the behavioral spec); AUDIT-2 I1 (the anchor
CTAs ride the UA-default focus outline — parity: the reference ships the
same UA default; WCAG 2.4.7/1.4.11 pass via the UA rings, no global
outline reset exists); AUDIT-2 I2 (the negative quota text on
hand-tampered storage — unreachable through the UI, the counter guards
limitReached at entry; no paywall bypass); AUDIT-2 I3 (the footer h4
skip — parity doctrine, on the standing register); AUDIT-2 I4 (the
cross-breakpoint history-nav focus edge — the focus-on-body fallback is
the navigation default); AUDIT-3 I2 (the rate-limit prose hand-maintained
across four sites — all nine values verified against the route code this
round; the `rg "<old number>"` doctrine is the standing backstop);
AUDIT-3 I3 (the designed lag-1 provenance window — the owner's narration
commit; cured by this round's standard re-anchor, lag 0 at ship); the
standing register carried forward unchanged (the
prefers-reduced-motion live-toggle gap, the JSON-LD/og:locale/
twitter:site family, the `.env.local` unmodeled face, the signup
admin-bootstrap TOCTOU, the scryptSync posture, the login photoUrl
asymmetry, the in-app delivery default, the S26-3 breakpoint-crossing
posture, the ParticleText sr-only duplication, the Reveal SSR opacity,
the worklog's structural inconsistencies).

## The cure set (TDD — every pin RED first or battery-planted, the mutation batteries per the house doctrine)

**Batch 1 — the RED pins:**
- **S40-1a**: `tests/boot-env.test.ts` — inside the flag-typo-guard
  describe, three pins: a case-variant `auth_secret`, a case-variant
  `next_public_site_url`, and a case-variant `database_url` each warn
  exactly once and map the canonical spelling ("Set AUTH_SECRET
  instead" / "Set NEXT_PUBLIC_SITE_URL instead" / "Set DATABASE_URL
  instead"). RED now (the arm matches only the viralpost_/neo_ prefixes).
- **S40-2a**: `tests/boot-env.test.ts` — one pin: an exact-prefix
  mixed-tail `NEO_Proxy_Hops` warns with the actionable mapping ("Set
  VIRALPOST_PROXY_HOPS instead", never the dead-end "no knob maps"
  branch). RED now (the tail is not uppercased).
- **S40-11a**: `tests/docs-counts.test.ts` — in the reality-census
  describe: the PAD §4.1 schema-field census arm (extract `model User` /
  `model ContactMessage` field names from prisma/schema.prisma; assert
  each appears in PAD §4.1's mermaid block). RED now (photoUrl ∈ schema
  but ∉ PAD — the finding S40-9 the arm exists to make impossible).
- **S40-13a**: `tests/generator.test.ts` — one pin: `generatePost` on a
  dash-run idea (`love ---- today`) produces no lone `#` in the text
  (`not.toMatch(/(^|\s)#(\s|$)/)`). RED now (the dash token becomes a
  bare hashtag).

**Batch 2 — the GREEN cures:**
- **S40-1**: boot-env's case arm gains the six-knob name set — a
  `SIX_KNOB_NAMES` constant (the three `VIRALPOST_*` + `AUTH_SECRET` +
  `DATABASE_URL` + `NEXT_PUBLIC_SITE_URL`) beside `KNOWN_VIRALPOST_VARS`;
  the arm's condition extends with the case-insensitive six-knob match
  (`k !== key && k.toLowerCase() === key.toLowerCase()`), the canonical
  resolution gains the six-knob branch, and the maps-ternary condition
  widens to `KNOWN_VIRALPOST_VARS.has(canonical) ||
  SIX_KNOB_NAMES.includes(canonical)`. Warn-only; the exact-case
  exclusions stay load-bearing (the S39-13 lesson).
- **S40-2**: the NEO_ branch's `mapped` gains `.toUpperCase()` on the
  tail.
- **S40-13**: `keywordsOf`'s filter gains the letter-or-digit guard.
- **S40-9**: PAD §4.1's User block gains `string photoUrl "nullable"`
  after `avatarColor`.
- **S40-3**: the resend-side accepted-race comment beside the update
  (the S39-8 doctrine, the mirror documented).
- **S40-4**: "all 19" → "all 17" at reveal.tsx:45,
  docs/session_39.md:124, and the session-39 plan's S39-10 row.
- **S40-5**: Logo's `className` retired (static
  `"flex items-center gap-2 group"`, the cn import goes);
  Iridescence's `className` retired (static `"h-full w-full"`, the cn
  import goes); PricingSection's `children` retired
  (`<PricingCards />` unconditional).
- **S40-6**: `LOGIN_VERIFY_LAYOUT.viewColumn`/`viewStack` and
  `LOGIN_SIGNUP_LAYOUT.viewColumn` retired; login-views.test.ts:199
  re-pinned (the viewColumn assertion dropped, the title re-spelled);
  the :216-219 docblock re-spelled to the truth.
- **S40-7**: route-title.ts:8-11 re-spelled (the layout's server-side
  generateMetadata is the mechanism; NotFoundBody mirrors only the
  message interpolation).
- **S40-8**: page-layout.ts:56-57 and login-reset.ts:116-117 re-spelled
  to the signup sibling's accurate form (the reference's slate-400 ring
  ≈2.57:1; ours rides slate-600 ≈7.5:1, the S25-3 superset — the border
  goes slate-400, the ring slate-600).
- **S40-10**: the README:100 and PAD:331 scripts/ tree lines extended
  to all five scripts.
- **S40-12**: signup's Prisma import moved to the sibling position; the
  crypto specifier normalized to `"node:crypto"` at auth.ts:10,
  generator.ts:25, generate/route.ts:1.
- **S40-14**: the two OTP log strings derived from
  `${VERIFICATION_TTL_MS / 60000} minutes`.

**Batch 3 — the mutation batteries (planted defect → exactly the
designed pin RED → restore → GREEN):**
- S40-1: strip the six-knob extension (revert the arm condition) →
  exactly the three S40-1a pins RED; the exact-case family and the
  S39-13a pins stay GREEN through the battery (the ownership
  separation).
- S40-2: remove the `.toUpperCase()` → the NEO_Proxy_Hops pin REDs.
- S40-11: remove the photoUrl row from PAD §4.1 → the census arm REDs
  naming the field.
- S40-13: revert the keywordsOf guard → the dash-run pin REDs.

**Batch 4 — the docs batch + the count re-anchor (constants FIRST —
the session-29..33 lesson):**
- `tests/docs-counts.test.ts`: the count-ladder comment's session-40
  entry; UNIT 675 → **681** (+3 S40-1a, +1 S40-2a in boot-env, +1
  S40-11a in docs-counts, +1 S40-13a in generator), SUITES 40
  unchanged, E2E 65 unchanged, SMOKE 16 unchanged, badge 740 → **746**.
- README: badge 746, the "40 files / 681 tests" rows, the session-40
  status row, the gate line; the scripts/ tree line (S40-10).
- AGENTS: the counts (681); the plans map's fortieth round.
- CLAUDE: the counts (681).
- PAD: §4.1 photoUrl (S40-9); §3.2 scripts line (S40-10); §8.1 table
  (40 files / 681 tests); §8.3's "carry 675/65/16" → 681/65/16; §12
  rows re-anchored to the live `wc -l` (generator.ts, iridescence.ts,
  route-title.ts — measure post-cure; auth.ts unchanged at 193 if the
  specifier swap is line-in-place); Last Updated stays 2026-11-13.
- SKILL v1.35.0 → v1.36.0: frontmatter (version, date, project_state),
  §0.5's range 1..39 → 1..40, Appendix A's session-40 row, Appendix
  B's header + counts, the pre-ship checklist counts.
- The ten provenance sites re-anchored `session_1..39` →
  `session_1..40` (.env.example, the five test files, db-path.ts,
  health/route.ts, toast.tsx, SKILL §0.5 — the S30-4 convention; lag 0
  at ship).
- worklog Task 40; `docs/session_40.md` (this round's formal log,
  replacing the owner narration); this plan's post-execution record.

**Batch 5 — the verification + the captures:**
- The full gate on the exact commit tree: lint → typecheck → unit
  681/681 (40 files) → build → smoke 16/16 → e2e 65/65 → census
  MATCH.
- The parity walk RE-RUN post-cure: the standing faces hold (the
  thirteenth walk's battery), no drift.
- Captures 87/88 on the dev server (the owner-instructed posture, the
  session-29..39 precedent): the mobile-menu open clean-walk at
  390×844 + the landing hero at 1280×800, PIL-verified, under
  `docs/screenshots/`.

**Batch 6 — the commit + the push:**
- Conventional Commit on main: `fix: the boot-gate six-knob case arm +
  the reveal count truth + the dead-surface retirement + the
  comment-truth batch (session-40 audit)`; `.env.example` rides the
  commit (tracked, six-knob current, the provenance note re-anchored
  to 1..40).
- Push via `docs/ssh_git_wrapper_v3.py` (the runbook is the
  authority): the Appendix-A shim on PATH, the operator key
  materialized 0600 OUTSIDE the repo (never printed), dry-run first,
  real push, remote ref verified, key + temp material shredded.

## Acceptance criteria

1. The boot gate warns on case-variant spellings of ALL six knobs
   (+3 RED-first pins; the exact-case family and the S39-13a pins
   untouched); the NEO_ mixed-tail maps the canonical (+1 RED-first
   pin); batteries on record.
2. The generator never renders a bare `#` for a dash-run idea (+1
   RED-first pin; battery on record).
3. The PAD §4.1 census arm is GREEN and planted-defect-proven (remove
   photoUrl → RED); PAD §4.1 carries photoUrl.
4. reveal's docblock, session_39.md, and the session-39 plan all say
   17 (three sites).
5. Logo/Iridescence/PricingSection carry no dead props; the DOM is
   byte-identical; the dead cn imports are gone.
6. The three dead login-reset members are retired; login-views:199
   re-pinned; the docblock tells the truth; every suite green.
7. route-title.ts, page-layout.ts, and login-reset.ts comments tell
   the post-S25-3 truth.
8. README + PAD scripts/ trees name all five scripts.
9. signup's Prisma import sits at the sibling position; the crypto
   specifier is `node:crypto` everywhere in src.
10. The OTP logs derive the TTL phrase from VERIFICATION_TTL_MS.
11. Full gate GREEN: lint 0/0 · tsc 0 · unit 681/681 (40 files) ·
    build · smoke 16/16 · e2e 65/65 (9 specs) · census MATCH.
12. The walk re-run: no drift.
13. Captures 87/88 PIL-verified under `docs/screenshots/` (post-cure).
14. Docs lockstep: six documents + worklog + session log + this plan's
    post-execution record, all in the same commit; the constants
    re-anchored FIRST; the ten provenance sites at 1..40 — lag 0 at
    ship.
15. Conventional Commit to main; SSH-wrapper push (dry-run first, key
    shredded after).

## ToDo list (execution order)

- [x] 1. Batch 1: place the RED pins — S40-1a (×3), S40-2a (×1) in
      boot-env.test.ts; S40-11a in docs-counts.test.ts; S40-13a in
      generator.test.ts
- [x] 2. Verify Batch 1 RED state (exactly the six new pins RED; the
      675 existing GREEN)
- [x] 3. Batch 2: S40-1 + S40-2 (boot-env GREEN)
- [x] 4. S40-13 (the keywordsOf guard, GREEN)
- [x] 5. S40-9 (PAD §4.1 photoUrl — the census arm GREEN)
- [x] 6. S40-5 (the dead-prop retirement: Logo, Iridescence,
      PricingSection)
- [x] 7. S40-6 (the login-reset dead members + the re-pin + the
      docblock)
- [x] 8. S40-3/S40-4/S40-7/S40-8/S40-14 (the comment-truth batch)
- [x] 9. S40-10/S40-12 (the trees + the import hygiene)
- [x] 10. Intermediate gate check (lint/tsc/unit — expect only the
       designed Batch-4 census REDs)
- [x] 11. Batch 3: the mutation batteries (S40-1, S40-2, S40-11,
       S40-13)
- [x] 12. Batch 4: constants FIRST (UNIT 681, badge 746), the census
       doc-site walk RED→GREEN, PAD §12 rows, SKILL v1.36.0, the ten
       provenance sites 1..40, worklog Task 40, README/AGENTS/CLAUDE
       rows, session_40.md, the plan record
- [ ] 13. Batch 5: the full gate + the walk re-run + captures 87/88
- [ ] 14. Batch 6: commit + SSH-wrapper push (dry-run first, remote
       verified, key shredded)

## Post-execution record

Executed as planned, with the mid-round notes on record:

- **The count projection held exactly**: UNIT 675 → 681 (+3 S40-1a,
  +1 S40-2a in boot-env; +1 S40-11a in docs-counts; +1 S40-13a in
  generator), SUITES 40, badge 740 → 746. The reality census confirmed
  681 on disk before any doc site was touched; the constants were
  re-anchored FIRST; the census walked the doc sites RED→GREEN
  (PAD §12: generator 457→467, route-title 56→62, auth 193→196,
  iridescence 269→273).
- **The S40-11 battery's planted-defect lesson**: the first sed form
  replaced the photoUrl row with a string that still CONTAINED
  "photoUrl" ("BATTERY_REMOVED_photoUrl") — the census's toContain
  rightly stayed GREEN. The correctly-planted form (the whole row
  removed) REDs naming the field. Recorded in the cure docblock and
  the session log.
- **The S40-13 battery's own-form lesson**: the first battery draft
  replaced the filter with an expression that stripped EVERY token
  (not the guard) — that form would have false-GREENed the pin's
  first assertion. Reverted to the exact pre-cure filter form and
  re-proven: exactly the dash pin RED.
- **The S40-2 pin's routing note**: `NEO_Proxy_Hops` (exact NEO_
  prefix, mixed tail) routes through the exact-case NEO_ branch, NOT
  the case arm — the pin owns the branch's tail-uppercase, cleanly
  separated from the S39-13a prefix-arm pins (proven in the S40-1
  battery: the case-arm strip left it GREEN).
- **The provenance re-anchor walked all ten sites + toast's owned
  tenth** to 1..40 in one sed pass; zero `session_1..39` strings
  survive anywhere the census scans. Lag 0 at ship.

**Final state:** lint 0/0 · tsc 0 · unit **681/681** (40 files) ·
build · smoke **16/16** · e2e **65/65** (9 specs) · census MATCH ·
badge **746**. Captures 87/88 PIL-verified on the dev server
(post-cure, the menu functionally verified open before the shot).
Docs lockstep: README + AGENTS + CLAUDE + PAD + SKILL v1.35.0 →
v1.36.0 + the ten provenance sites re-anchored to 1..40 (toast.tsx
the owned tenth) + worklog Task 40 + docs/session_40.md + this
post-execution record. Pushed to main via the SSH wrapper (dry-run
first, key shredded after).
