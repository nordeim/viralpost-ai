# Session 46 — The force-dynamic Route Census + The Mobile-Menu Censused-Parity e2e Pins + The cwdFallbackUrl Wiring Pin + The Comment-Truth Batch (2026-11-13)

## Context

Session 45 shipped `e3d071a` (the cwd-fallback seam pins, the bun-header
truth hedge, the dep-count & model-list census, the reference 404-title
drift record, the censused-parity batch); the owner's narration commit
`1cb15e2` followed (session_46.md carries the round-45 narration — this
round replaces it with the formal log). The standing instruction re-ran
end to end: docs review → baseline gate → the comprehensive audit (three
parallel subagents) → the live reference parity walk → the neo-crm
currency check → the TDD cures → the gate → captures → push.

**Baseline (the tree at `1cb15e2`, verified in place):** lint 0/0 · tsc 0 ·
unit 701/701 (40 files) · build · smoke 16/16 · e2e 65/65 (9 specs) ·
census MATCH · the `.env` `DATABASE_URL="file:../db/custom.db"` contract
with `db/` at the repo root (recreated on the fresh clone; census MATCH
after db:push + db:seed) ✓ · the vitest + playwright suites in place and
current — the chromium-1248 gap cured again with the documented one-time
`bunx playwright install chromium` ✓ · the sitemap/robots/manifest/OG
family verified live against the reference in this round's walk ✓ ·
`skills/` excluded from every gate ✓ · `.env.example` present, committed,
matching the six-knob contract ✓.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib seams,
AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs — every
load-bearing finding hand-verified in source by the lead: the force-dynamic
grep across tests/ (only a login-views comment names it), the join-math
trace of the S45-1 artifact-only sentence (candidate =
`join(cwd, "prisma", "../db/custom.db")` → dirname `<cwd>/db` — the trace
EXCLUDES `db/**`, ships `prisma/`; the on-disk artifact confirms `prisma/`
present, `db/` absent), the PAD §11 citation drift (the useLayoutEffect
now at navbar.tsx:111), the prisma-env.ts un-hedged header, and the
mobile-navigation spec's full read (6 tests; no Logo/outside-tap pins)):
**AUDIT-1: 0C/0H/1M/4L/5I · AUDIT-2: 0C/0H/0M/1L/2I · AUDIT-3:
0C/0H/0M/2L/2I** — combined **0 Critical / 0 High / 1 Medium / 7 Low /
9 Info**. The session-45 diff itself verified correct and complete on all
three passes (the cwdFallbackUrl extraction behavior-equivalent, consumed
at one site, pinned; the census arms single-tooth).

**The parity walk** (live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`; viewport confirmed 390×844 before every
mobile probe, computed styles as ground truth): **ALL CLONE FACES MATCH —
the nineteenth consecutive clean walk, no clone-side drift, no new
reference-side drift** (the session-45 404-title bare posture persists —
four probed unknown routes all ship the bare "ViralPost AI" title,
re-confirmed; ours keeps the derived title as the documented superset).
The mobile menu works exactly as expected (the owner's standing
concern): the panel byte-identical both sides (the four nav links —
Home's teal rgb(45,212,191) active face, the siblings' rgb(203,213,225)
— plus the Gumroad pill "Upgrade to Pro – $19" at the templixco href,
14px/500-600, display block + max-height none, transparent-over-hero
bg); the hamburger cursor pointer both sides (the Tailwind v4 standing
concern holding); the reference's hamburger still ships NO aria family
(our superset); Escape leaves the reference's panel open (our F11-11
superset closes with the focus returned, live-verified to the toggle);
the same-route Logo click leaves the panel open on BOTH sides (ours
pathname-inert through the /Home→308→/ round-trip — re-censused live);
the outside-tap face leaves it open on BOTH sides (a real click on the
hero paragraph — re-censused live); the route-change close + auto-close
verified; the desktop nav byte-identical (brand + 4 links + the Upgrade
pill, the active face following the route); the five-route head census
identical modulo origin (the reference's og/canonical render
client-side — its SPA posture; ours ship SSR); sitemap 4 URLs both +
robots identical modulo origin; the generator probe symmetrically
dead/live (R: "Generation failed, so this attempt didn't use one of
your free tries. Please try again." — the failure toast is a NEW
observed detail on the reference's dead face; zero hashtags, no Copy;
L works — 7 hashtags + the copy button, the documented superset); the
login round-trip both landing the landing (R `/Home`, L `/` — the
documented 308 deviation), the clone session verified live via
/api/auth/me (sepnetflix2023@outlook.com, role admin).

**The neo-crm reference repo re-checked** (the standing instruction):
its latest round (its session-217 / file session_459.md) continues the
semantic-prose census genus with its mutation-battery discipline
catching a THIRD consecutive pin birth-defect — the REDUNDANT ARM (a
new census arm duplicating an existing pin's coverage; cured by removal
at birth). Patterns current (stack pins identical: Next 16.4.2, React
19.3.1, Tailwind 4.3.3, Prisma 6.19.3, Vitest 5.0.5, Playwright 1.64.1);
the redundant-arm lesson APPLIED this round: every new arm below is
checked for single-tooth ownership (the one-owner doctrine, this repo's
own N12-2), and the batteries prove it.

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S46-1 | **MEDIUM** (AUDIT-1 M1) | `src/app/api/**/route.ts` (all 13 files) vs `tests/` | No pin enforces `force-dynamic` on the API route family. All 13 files carry the export today (read-verified), but nothing catches a dropped export or a new route without one — the SEO family's force-static IS pinned (S37-4), the API family's force-dynamic is not. Sharpest exposure: `/api/health`'s GET takes no request input, so a dropped export lets `next build` freeze it as a static 200 — the db-down-at-200 incident class its own comment cites. Cure: a disk-derived route census arm in `tests/api-robustness.test.ts` (the file already censuses route sources with stripComments) — recursively enumerate `src/app/api/**/route.ts` from disk, assert each carries `export const dynamic = "force-dynamic";` (comment-stripped, the S38-7f idiom). Battery: drop one route's export → exactly the arm RED. |
| S46-2 | **LOW** (AUDIT-1 L1) | `src/lib/db-path.ts:143-151` (the S45-1 cwdFallbackUrl docblock) | The artifact-only reachability sentence states a wrong mechanism: "the traced prisma/ dir satisfies the dirname check → `<standalone>/db/custom.db`". Join math: for the mandated `file:../db/custom.db` ref, `candidate = join(cwd, "prisma", "../db/custom.db")` normalizes to `<cwd>/db/custom.db`, so `dirname(candidate)` is `<cwd>/db` — NOT the traced `<cwd>/prisma`. The trace excludes `db/**` (next.config.ts:31) and the on-disk artifact ships `prisma/` but no `db/` (verified). The traced-prisma mechanism only holds for a `file:custom.db`-style ref. In a fresh artifact-only deploy the arm returns null (raw pass-through); it yields `<s>/db/custom.db` only when the operator pre-creates the db folder. Cure: comment-truth re-spell (the sentence, not the code — the seam's never-mkdir posture is itself the documented, correct behavior). |
| S46-3 | **LOW** (AUDIT-3 L2) | `scripts/prisma-env.ts:4-9` (strongest); weaker same-genus sites: `prisma/seed.ts:16-17`, `scripts/e2e-prune.ts:17-18` | prisma-env.ts's header still states the bun rewrite as an unconditional fact ("bun loads the repo .env for every `bun run`/`bun x` process AND rewrites a relative `file:` DATABASE_URL into an absolute path…") — the exact claim session-45's S45-2 re-spelled to the invocation/version-conditional truth one file over (the lead's fresh probe on the pinned bun 1.3.14 saw the RAW relative value through every probed shape). Cure: apply the S45-2 hedge wording to prisma-env.ts; soften the two weaker sites to the historical/conditional form. |
| S46-4 | **LOW** (AUDIT-3 L1) | `Project_Architecture_Document.md:687` (PAD §11, the eslint off-switches row) | The register cites the third exhaustive-deps flag at "navbar.tsx:103"; session-45's 12-line navbar comment block moved the `useLayoutEffect` to line 111 (its dep array at ~115). The count claim ("exactly 3 flags") is still live-true. Cure: re-anchor the citation (drop the brittle line number in favor of the effect's own name — the S43-2 row already names "the S31-2 pathname-keyed focus-return arm"; keep the particle-text.tsx:313 form where still current). |
| S46-5 | **LOW** (AUDIT-2 L1) | `src/components/marketing/navbar.tsx:30-40` (the S45-3/S45-4 censused-parity comment); `tests/e2e/mobile-navigation.spec.ts` | The censused same-route-Logo and outside-tap postures (the do-not-"fix" faces) are guarded by comment only — no automated pin. A future "helpful" close-arm addition ships green. Cure: +2 e2e pins in mobile-navigation.spec.ts — (a) the same-route Logo face: open the menu on `/`, click the Logo (`ViralPost AI — Home`), assert the toggle still reads "Close menu" and `#mobile-menu` stays visible through the /Home→308→/ round-trip; (b) the outside-tap face: open the menu, click the hero paragraph below the panel, assert still open. Both faces walk-verified live on BOTH sides this round (the reference re-censused). |
| S46-6 | **INFO→cure** (AUDIT-1 I1) | `src/lib/db-path.ts:223-224` vs `tests/db-path.test.ts` | The cwdFallbackUrl seam logic is pinned (session-45), but its WIRING — that `resolveDatabaseUrl` actually calls `cwdFallbackUrl(process.cwd(), pathRef, query)` and honors null → raw fall-through — is unpinned (the unit env's module anchor always wins, so no behavioral test reaches it; the S29-2 source-census idiom is the cheap owner). Cure: +1 source pin in db-path.test.ts — read db-path.ts, assert the call shape and the null fall-through. Battery: inline the arm back (remove the seam consumption) → exactly the pin RED. |
| S46-7 | **INFO→cure** (AUDIT-1 L3) | `src/lib/api.ts:65-93` vs `src/app/api/health/route.ts:21` | Two error-code vocabularies for the 503 family: the shared transient classifier answers `UNAVAILABLE`, the health route's db-down answers `SERVICE_UNAVAILABLE` (both individually pinned as contract — a re-pin would be a wire change). Cure: comment-truth — one line in api.ts naming the two-code taxonomy as deliberate (health's own pinned code). |
| S46-8 | **INFO→cure** (AUDIT-1 L4) | `src/lib/auth.ts:20` (the password-trio re-export) vs the auth route family | Two import idioms for the password trio: signup/login import via the `@/lib/auth` re-export, the other four routes import `@/lib/password` directly. Both are contract (the re-export is pinned as existing); the divergence is the S23-7 genus hazard. Cure: comment-truth — extend the re-export's note naming its two live consumers (the cheapest form; unifying the imports would touch 2 route files for zero behavior change — deferred to a wire-compatible round if ever). |
| S46-9 | **INFO→cure** (AUDIT-1 L2) | `src/lib/db-path.ts:321-327` (readDatabaseUrlFromEnvAt) | The bun-signature guard reads only `.env` — knobs in `.env.local`/`.env.<NODE_ENV>` would be honored as "intentional overrides" by the signature arms. The repo contract mandates a single `.env` (DEPLOYMENT.md §4); the rewrite itself is conditional (S45-2). Cure: comment-truth — one line in the helper's docblock naming the `.env`-only face as deliberate. |
| S46-10 | **INFO→cure** (AUDIT-3 I1) | `tests/docs-counts.test.ts:809,833` (the two S13-10 local stripComments copies) | Three stripComments definitions in one test file: the new module-level S45-9 helper plus two pre-existing local copies inside the S13-10 forms-guard arms. Cure: retire the two locals, delegate to the module-level helper (the one-idiom doctrine; zero count change). |
| S46-11 | **THE WALK'S OBSERVATION** (reference-side detail; not a drift) | `docs/reference-investigation.md` §5 D-1 | The reference's dead generator now surfaces a failure toast — "Generation failed, so this attempt didn't use one of your free tries. Please try again." — with the button settling back to "Generate Post" (the D-1 row's "no error UI, no recovery" posture is stale on the toast detail; the core defect stands: no generation ever lands, zero hashtags). Cure: a bracketed re-verification note on D-1 (the house evidence-ledger form); our superset rationale re-anchored (ours generates AND settles with error UI — the reference now settles too, with a failure toast; the working generation remains ours alone). No code change. |

**Accepted/observed register (this round's tail, with reasons):** AUDIT-1
I3 — `detectNiche`'s bidirectional substring match lets a ≥3-char idea
keyword containing a 2-letter niche key trigger that niche ("hair"
contains "ai" → the tech bank); deterministic, contract-compliant,
content-quality only — the reference's own prompt faces the same class;
AUDIT-1 I4 — `proxyHopDepth`'s parseInt semantics accept odd spellings
silently ("0x2" → 0); the boot gate deliberately mirrors the seam's
parse (S22-18) and unparsable values fail closed — the mirror is the
contract; AUDIT-1 I2 — `setSessionCookie` is the one exported seam
with zero direct unit references (a thin next/headers adapter
exercised end-to-end by the e2e auth/session specs — behavior covered,
no unit pin owns its flag set; the cookie-flag family is
source-pinned); AUDIT-1 I5 — the standing accepted residuals (the
signup first-admin race S44-7, the verify/resend read-then-write pair,
the by-design enumeration faces, the single-node limiter) carried
forward unchanged; AUDIT-2 I2 — the 404/error main-landmark posture
(censused parity, the reference ships none); AUDIT-3 I2 — the
smoke-leg prose census stays presence-form (the S28-6 constant census
owns the number; a doc carrying both forms would still re-anchor on a
17th leg — the retired-form negative guards a theoretical shape no
round has produced); AUDIT-3's PAD §11 line-citation genus — this
round re-anchors the one stale site (S46-4) and notes the genus in the
row (the citation-drift hazard is inherent to line-number citations;
the S46-4 cure prefers the stable effect-name form where possible).

## The cure set (TDD — every pin RED first or battery-planted, the mutation batteries per the house doctrine; the neo-crm session-217 redundant-arm lesson applied — every new arm checked for single-tooth ownership)

**Batch 1 — the new pins:**
- **S46-1a**: `tests/api-robustness.test.ts` — the force-dynamic route
  census arm (born GREEN against the live truth — the planted-removal
  battery is the proof). Disk-derived: recursively enumerate
  `src/app/api/**/route.ts` (never a hardcoded list — a NEW route
  missing the export must trip it), comment-stripped assertion of
  `export const dynamic = "force-dynamic";`.
- **S46-5a**: `tests/e2e/mobile-navigation.spec.ts` — the two
  censused-parity pins (the same-route Logo face + the outside-tap
  face), modeled on the spec's own idioms; both faces walk-verified
  live on both sides this round. No e2e battery per the house
  precedent (the e2e legs added at sessions 12–31 shipped walk-verified;
  the mutation-battery doctrine is the unit census arms' form — the
  pins' teeth are construction-direct: any close arm on either face
  flips the toggle/panel state the assertions hold).
- **S46-6a**: `tests/db-path.test.ts` — the cwdFallbackUrl wiring pin
  (born GREEN — the inline-back battery is the proof): the call shape
  `cwdFallbackUrl(process.cwd(), pathRef, query)` + the
  `if (fallback) return fallback;` → `return rawUrl;` fall-through,
  asserted textually (the S29-2 source-census idiom).

**Batch 2 — the comment-truth cures (no behavior change):**
- **S46-2**: the db-path.ts artifact-only sentence re-spell (the join
  math stated correctly: the dirname check tests `<cwd>/db`, which the
  trace excludes — the arm fires only when the operator supplies the db
  folder; a fresh artifact passes the raw URL through).
- **S46-3**: the prisma-env.ts header hedge (the S45-2 conditional
  form) + the seed.ts/e2e-prune.ts softer sites.
- **S46-4**: the PAD §11 citation re-anchor (the stable effect-name
  form).
- **S46-7**: the api.ts two-code 503 taxonomy note.
- **S46-8**: the auth.ts re-export consumer note.
- **S46-9**: the db-path.ts `.env`-only-face note.
- **S46-10**: the docs-counts local stripComments retirement (delegate
  to the module-level helper).
- **S46-11**: the reference-investigation D-1 bracketed note (the
  reference's failure-toast observation).

**Batch 3 — the mutation batteries (planted defect → exactly the
designed pin RED → restore → GREEN):**
- S46-1: drop the force-dynamic export from one route file
  (health/route.ts — the sharpest-exposure face) → exactly the census
  arm RED.
- S46-6: inline the CWD arm back into resolveDatabaseUrl (remove the
  cwdFallbackUrl consumption) → exactly the wiring pin RED.
- The redundant-arm check (the neo-crm session-217 lesson): S46-1a
  owns the API family's dynamic-posture axis (the S37-4 arm owns the
  SEO family's — disjoint file sets, documented in the arm's comment);
  S46-6a owns the wiring face (the session-45 seam pins own the logic
  faces — the arm's comment documents the split); S46-5a owns the two
  interaction faces (no existing e2e touches them — the spec's six
  tests enumerated).

**Batch 4 — the docs batch + the count re-anchor (constants FIRST —
the session-29..33 lesson):**
- `tests/docs-counts.test.ts`: the count-ladder comment's session-46
  entry; UNIT 701 → **703** (+1 api-robustness: the force-dynamic
  census arm; +1 db-path: the wiring pin), SUITES 40 unchanged, E2E
  65 → **67** (+2 mobile-navigation: the censused-parity pins), E2E_SPECS
  9 unchanged, SMOKE 16 unchanged, BADGE 766 → **770**.
- README: badge 770, the "40 files / 703 tests" rows, the "9 specs /
  67 tests" rows, the session-46 status row (appended to the continuous
  table), the re-anchored footer counts.
- AGENTS: the counts (703 / 67); the plans map's forty-sixth round.
- CLAUDE: the counts (703 / 67).
- PAD: §8.1 table (40 files / 703 tests; 67 e2e); §8.3's counts;
  §12's db-path/api/auth rows re-anchored to the live `wc -l` if the
  comment cures move them (measured post-cure); §11's S46-4 citation
  re-anchor; Last Updated stays 2026-11-13.
- SKILL v1.41.0 → v1.42.0: frontmatter (version, project_state), §0.5's
  range 1..45 → 1..46, Appendix A's session-46 row, Appendix B's header
  + counts, the pre-ship checklist counts.
- The ten provenance sites re-anchored `session_1..45` →
  `session_1..46` (.env.example, the five test files, db-path.ts,
  health/route.ts, toast.tsx, SKILL §0.5 — the S30-4 convention; this
  cures AUDIT-2's designed lag-1 transient too; lag 0 at ship).
- `docs/reference-investigation.md` §5 D-1 (the S46-11 bracketed note).
- worklog Task 46; `docs/session_46.md` (this round's formal log,
  replacing the owner-carried round-45 narration); this plan's
  post-execution record.

**Batch 5 — the verification + the captures:**
- The full gate on the exact commit tree: lint → typecheck → unit
  703/703 (40 files) → build → smoke 16/16 → e2e 67/67 (9 specs) →
  census MATCH.
- The parity walk RE-RUN post-cure: the standing faces hold (the
  nineteenth walk's battery), no drift.
- Captures 99/100 on the dev server (the owner-instructed posture, the
  session-29..45 precedent): the mobile-menu open clean-walk at
  390×844 + the landing hero at 1280×800, PIL-verified, under
  `docs/screenshots/`.

**Batch 6 — the commit + the push:**
- Conventional Commit on main: `fix: the force-dynamic route census +
  the mobile-menu censused-parity e2e pins + the cwdFallbackUrl wiring
  pin + the comment-truth batch (session-46 audit)`;
  `.env.example` rides the commit (tracked, six-knob current, the
  provenance note re-anchored to 1..46).
- Push via `docs/ssh_git_wrapper_v3.py` (the runbook is the
  authority): the Appendix-A shim on PATH, the operator key
  materialized 0600 OUTSIDE the repo (never printed), dry-run first,
  real push, remote ref verified, key + temp material shredded.

## Acceptance criteria

1. The API route census arm derives the route list from disk and
   asserts force-dynamic on every file; the planted-removal battery on
   record (exactly the arm RED).
2. The two mobile-menu censused-parity e2e pins GREEN (both faces
   walk-verified live this round); no existing pin duplicated.
3. The cwdFallbackUrl wiring pin GREEN textually; the inline-back
   battery on record (exactly the pin RED).
4. The five comment-truth cures in (S46-2/3/7/8/9) + the PAD §11
   re-anchor (S46-4) + the stripComments retirement (S46-10) + the D-1
   note (S46-11) — each states the current truth.
5. Full gate GREEN: lint 0/0 · tsc 0 · unit 703/703 (40 files) ·
   build · smoke 16/16 · e2e 67/67 (9 specs) · census MATCH.
6. The walk re-run: no clone-side drift; the standing faces hold.
7. Captures 99/100 PIL-verified under `docs/screenshots/` (post-cure).
8. Docs lockstep: six documents + worklog + session log + this plan's
   post-execution record, all in the same commit; the constants
   re-anchored FIRST; the ten provenance sites at 1..46 — lag 0 at
   ship.
9. Conventional Commit to main; SSH-wrapper push (dry-run first, key
   shredded after).

## ToDo list (execution order)

- [x] 1. Batch 1: the force-dynamic census arm (api-robustness), the
      two mobile-nav e2e pins, the cwdFallbackUrl wiring pin
      (db-path.test.ts)
- [x] 2. Verify Batch 1 state (the census arm + wiring pin born GREEN
      against live truth; the e2e pins GREEN on the current build; the
      701 existing unit GREEN)
- [x] 3. Batch 2: the comment-truth cures (S46-2 db-path sentence,
      S46-3 prisma-env/seed/e2e-prune hedges, S46-7 api.ts note,
      S46-8 auth.ts note, S46-9 .env-only note, S46-10 stripComments
      retirement, S46-4 PAD §11 re-anchor, S46-11 D-1 note)
- [x] 4. Intermediate gate check (lint/tsc/unit — all GREEN at 703)
- [x] 5. Batch 3: the mutation batteries (S46-1 export-removal,
      S46-6 inline-back — each exactly its designed pin RED, restores
      verified)
- [x] 6. Batch 4: constants FIRST (UNIT 703, E2E 67, BADGE 770), the
      census doc-site walk RED→GREEN, PAD §12 rows, SKILL v1.42.0, the
      ten provenance sites 1..46, worklog Task 46, README/AGENTS/CLAUDE
      rows, session_46.md, the plan record
- [x] 7. Batch 5: the full gate + the walk re-run + captures 99/100
- [x] 8. Batch 6: commit + SSH-wrapper push (dry-run first, remote
      verified, key shredded)

## Post-execution record

Executed as planned, with the round's shape on record:

- **One e2e calibration at birth (S46-5a)**: the same-route Logo
  pin's first shape tripped Playwright strict mode — the Logo
  renders in BOTH the navbar and the footer (the same
  aria-label "ViralPost AI — Home" twice); the locator scoped to
  the navigation (the multi-subtree DOM trap the AGENTS testing
  conventions name). The outside-tap pin was born GREEN.
- **One arithmetic slip caught by the census itself (Batch 4)**: the
  badge was walked to 769 first; the badge-drift pin demanded
  770 = 703+67 — the census's own arithmetic guard (BADGE = UNIT +
  E2E) working exactly as designed. The plan's two badge mentions
  corrected in the same stroke.
- **The S42-9/S43-5 footer regexes re-pinned in the same commit**:
  both census arms pin the footer's FULL shape including the e2e
  count — the 65/65 literal in the regexes re-anchored to 67/67
  (the pinned-shape-updates-with-the-count doctrine).
- **The single-tooth split battery-proven (S46-6)**: the inline-back
  battery kept the 3 seam-logic pins GREEN while exactly the wiring
  pin RED — the wiring face and the logic faces have disjoint
  owners, the N12-2 doctrine held at birth.

**Final state:** lint 0/0 · tsc 0 · unit **703/703** (40 files) ·
build · smoke **16/16** · e2e **67/67** (9 specs) · census MATCH ·
badge **770**. Captures 99/100 PIL-verified on the dev server
(post-cure, the menu functionally verified open before the shot).
Docs lockstep: README + AGENTS + CLAUDE + PAD + SKILL v1.41.0 →
v1.42.0 + the ten provenance sites re-anchored to 1..46 + worklog
Task 46 + docs/session_46.md + this post-execution record. Pushed to
main via the SSH wrapper (dry-run first, key shredded after).
