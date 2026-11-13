# Session 48 — The stripComments One-Idiom Cure + The Shadow-Env Cascade Mirror + The Toast Dep-Array Pin + The CLS IHDR Face + The Appendix-B Header Census + The Count Interpolation

## Context

Session 47 shipped `2a48ce8` (the artifact-anchor truth, the reveal-settle
pins, the shadow-env boot warning, the stale-prose batch); the owner's
narration commit `6912da2` followed, carrying session_48.md as the
round-47 narration — replaced now by this round's formal log. The
standing instruction re-ran end to end: docs review → baseline gate →
the comprehensive audit (three parallel subagents + the neo-crm
currency check) → the live reference parity walk → the TDD cures →
the gate → captures → push.

**Baseline (the tree at `6912da2`, verified in place):** lint 0/0 · tsc 0 ·
unit 711/711 (40 files) · build · smoke 16/16 · e2e 70/70 (9 specs) ·
census MATCH · the `.env` `DATABASE_URL="file:../db/custom.db"` contract
recreated on the fresh clone with `db/` at the repo root (db:push +
db:seed → census MATCH) ✓ · the vitest + playwright suites in place and
current — the chromium-1248 gap cured with the documented one-time
`bunx playwright install chromium` ✓ · the sitemap/robots/manifest/OG
family verified live against the reference in this round's walk ✓ ·
`skills/` excluded from every gate ✓ · `.env.example` present, committed,
matching the six-knob contract ✓.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib
seams, AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs
— every load-bearing finding hand-verified in source by the lead, the
decisive probes below): **AUDIT-1: 0C/0H/2M/2L/3I · AUDIT-2:
0C/0H/0M/3L/2I · AUDIT-3: 0C/0H/0M/1L/4I** — combined
**0 Critical / 0 High / 2 Medium / 6 Low / 9 Info**. The session-47
diff itself verified correct and complete on all three passes — the
two Medium findings are genus-gaps the S47-10 cure left open
(the hardened stripComments idiom was landed in ONE file while the
family's other nine helpers kept the phantom-open form) and the
S47-2 shadow-warning seam checked two of Next's four cascade files.

**The decisive hand-verifications:**
- **S48-1 (AUDIT-1 M1)**: `tests/docs-counts.test.ts:278` still carries
  the naive block-first unanchored `stripComments`. Byte-level
  naive-vs-hardened comparison (the hardened form =
  db-path.test.ts:25's S47-10 idiom): divergence 719 chars on
  design-tokens.test.ts (a whole describe + importSymbols body
  phantom-eaten), 271 on password-seam.test.ts (the phantom opens at
  the `/*` inside the live it-title string `"…no next/*, no prisma, no
  db…"`), 2295 on docs-counts itself (the `tests/*` glob prose inside
  a live template literal), 2 benign on db-path. Zero count impact
  today (the census counts read raw files) — but the S24-2/S46-10
  forms-guards read these files through the mangling strip: a future
  `.only(`/in-loop `it(` planted inside an eaten span ships GREEN.
  The exact comment-blind genus S47-10 cured for one file after it
  live-REDDed there.
- **S48-2 (AUDIT-1 M2)**: Next's real env cascade (verified in
  node_modules/@next/env/dist/index.js, `loadEnvConfig`) is
  `[.env.${d}.local, d!=="test"&&.env.local, .env.${d}, ".env"]` —
  `shadowingEnvFileWarnings` (boot-env.ts:401) checks only
  `.env.local` + `.env.${NODE_ENV}`, so an operator following the
  standard convention (a DATABASE_URL in `.env.production.local`,
  the FIRST file loaded, beating `.env.local` and `.env`) gets ZERO
  warning — the exact case S47-2 exists to name.

**The parity walk** (live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`; viewport confirmed 390×844 before every
mobile probe; computed styles as ground truth, Playwright as the
computed-style engine — the agent-browser doctrine's ground-truth
rule, the engine serving the e2e suite): **ALL CLONE FACES MATCH —
the twenty-first consecutive clean walk, no clone-side drift, no NEW
reference-side drift** (the session-45 404-title bare posture persists
— /NoSuchRoute re-probed: HTTP-equivalent SPA title "ViralPost AI" +
the 404 h1 body both sides; ours keeps the derived title as the
documented superset). The D-1 failure-toast posture re-verified at
THREE layers this round: the network face (POST
`/api/apps/…/integration-endpoints/…` → **402**), the DOM face
(inline `DIV.mt-3.flex.items-start.gap-2.text-xs.text-red-500` — an
inline error div under the form, not a portal toast; the exact text
"Generation failed, so this attempt didn't use one of your free
tries. Please try again."), and the settle face (button enabled
"Generate Post", zero hashtags, no Copy).

The mobile menu works exactly as expected (the owner's standing
concern): the panel byte-identical both sides (Home's teal
rgb(45,212,191) active face 14px/500 display block, the siblings'
rgb(203,213,225) 14px/500 display block, the container
`px-6 py-4 space-y-3` display block + max-height none + transparent
bg — plus the Gumroad pill "Upgrade to Pro – $19" at the templixco
href, 14px/600); the hamburger cursor pointer both sides (the
Tailwind v4 standing concern holding); the reference's hamburger
still ships NO aria family (our expanded family the documented
superset — expanded:"false", controls:"mobile-menu",
label:"Open menu"); Escape leaves the reference's panel open (our
superset closes with focus returned to the toggle); the same-route
Logo click leaves the panel open on BOTH sides (the reference's own
/Home logo on /Home, ours pathname-inert through the /Home→308→/
round-trip); the outside-tap face leaves it open on BOTH sides (the
hero paragraph); route-change close verified both sides (panel
CLOSED, URL at /Pricing both); the desktop nav byte-identical (brand
+ 4 links + the Upgrade pill, the active face following the route);
the five-route head census identical modulo origin (the reference's
og/canonical render client-side — its SPA posture; ours ship SSR);
sitemap 4 URLs both + robots identical modulo origin; the generator
probe symmetrically dead/live (R: the 402 + the failure div; L works
— hashtags + the copy button, the documented superset); the login
round-trip both landing the landing (R `/Home`, L `/` — the
documented 308 deviation), the clone session verified live via
/api/auth/me (Demo Creator, role admin).

The neo-crm reference repo re-checked per the standing instruction:
unchanged since the session-47 check — its latest round is still
session-217 (file session_459.md, commits bc9b982/b3d0fbe); stack
pins identical (all 8); its three lessons were already adopted at
session 47. No new lessons this round.

## The cures (TDD — every new arm battery-planted, the mutation
batteries per the house doctrine; every new arm single-tooth, the
redundant-arm check enumerated at birth)

- **S48-1 (MEDIUM, AUDIT-1 M1 + L2 folded)** — the stripComments
  one-idiom cure: the S47-10 hardened form (line comments first; block
  opener anchored `(^|\s)`) propagates to the whole family — the nine
  naive carriers (api-robustness:16, auth-contract:37, auth-reset:25,
  body-pregate:22, db-census:25, dev-origins:33 the partial variant,
  seo-surfaces:26, toast-anatomy:34, docs-counts:278) swap to the
  db-path.test.ts:25 idiom verbatim (the one-idiom doctrine the
  S46-10 comments already declare); type-gate's string-aware state
  machine stays (different genus, string-literal-aware — the
  hardened form coexists; the canonical idiom for the family is the
  hardened form). NEW PIN PAIR in docs-counts (the S47-9 wrap-blind
  form): the flattened read of tests/*.test.ts BANS the naive
  block-first signature `.replace(/\/\*[\s\S]*?\*\//g, "")` and
  asserts the hardened signature present in every carrier.
  Battery: one carrier (docs-counts) reverted to naive → exactly the
  ban arm RED.
- **S48-2 (MEDIUM, AUDIT-1 M2)** — the shadow-env cascade mirror:
  `shadowingEnvFileWarnings` candidates become Next's actual cascade
  minus `.env` itself: [`.env.${mode}.local`, mode!=="test" &&
  `.env.local`, `.env.${mode}`] (the @next/env loadEnvConfig order,
  verified in the installed dependency). NEW PIN PAIR in boot-env:
  the `.env.production.local` face (the highest-priority member, the
  primary documented case) + the test-mode skip face (`.env.local`
  not a candidate under NODE_ENV=test, mirroring Next exactly). The
  two existing S47-2 pins stay GREEN unchanged (verified: their
  exists-stubs never match the new candidate; the dev/production
  candidate lists grow but their stubs mark only the old faces).
  Battery: the new candidate dropped from the list → exactly the
  production-local pin RED.
- **S48-3 (LOW, AUDIT-1 L1)** — the warning prose truth: the S47-2
  docblock + the warning message re-spell to the traced resolution
  chain — a shadow-file DATABASE_URL is honored as an intentional
  override (never matched against the .env recovery signature): a
  RELATIVE value still re-anchors inside the repo (a different file),
  an ABSOLUTE one is honored verbatim (the seam's by-design
  absolute-override contract, db-path.ts:45). The existing pins'
  message-shape assertions update in place (the "reads only .env"
  doctrine sentence stays).
- **S48-4 (LOW, AUDIT-2 L1)** — the toast dep-array pin: the
  `[paused, item.id]` re-arm (toast.tsx:158) joins the hover-pause
  seam pin in toast-anatomy (the dep-array regression — a "simplified"
  `[item.id]`/`[]` — deletes the pause while every existing pin stays
  green); the generator.spec.ts S47-7 comment re-worded to name its
  true owner (comment truthfulness: the round-47 comment claimed "the
  pause arm's dep-array shape is the cheap owner" while no pin owned
  it). In-place on the existing hover-pause it — +0 count.
- **S48-5 (LOW, AUDIT-2 L2)** — the CLS pin's asset face: a NEW it in
  landing-page decodes public/hero-portrait.png's IHDR and asserts a
  SQUARE intrinsic ratio (the reserved box depends on the attribute
  RATIO; a future non-square replacement reintroduces CLS while the
  S47-5 attributes pin stays green). The asset is 1024×1024 today
  (square — the pin GREENs at birth); the ~0.93MB weight and the
  optional 512px resize stay in the accepted register (parity-neutral
  per dossier:283-286 — an independently created equivalent, our own
  asset; the pin owns the ratio, the resize is a performance nicety).
- **S48-6 (LOW, AUDIT-2 L3)** — the reveal e2e leg's structural
  anchor: the wrapper gains `await expect(wrapper).toHaveClass(
  /transition-all/)` before the opacity assertion (the Reveal base
  class, reveal.tsx:98) — a future intermediate wrapper div (a plain
  div, no transition-all) can no longer leave the leg vacuously
  green. In-place on the existing leg — +0 e2e count.
- **S48-7 (INFO→cure, AUDIT-2 I1)** — the S47-4 reveal pin joins the
  suite's own `bare()` strip idiom (effects-motion:33's form) — the
  raw read retires, the comment-blind convention holds inside the
  file. In-place — +0 count.
- **S48-8 (LOW, AUDIT-3 L1)** — the Appendix-B header census: a NEW it
  in docs-counts ties the SKILL Appendix-B header's
  `re-certified through session (\d+)` bound to the SKILL §0.5
  `session_1..(\d+)` bound (the S43-5 form, applied to the face that
  shipped stale at session 47 while session_47.md:217 claimed the
  re-anchor — the one live-tense site no census arm owned). The
  header re-anchors to this round's ship bound in the same commit.
  Battery: the header re-staled → exactly the new arm RED.
- **S48-9 (INFO→cure, AUDIT-3 I1)** — the README e2e re-run advice
  re-spell: "within 15 minutes" → the contact bucket's 60-minute
  window (playwright.config.ts:76-86's own census — 3 POSTs/run vs
  the 5/hour wall, the limiter ahead of the Zod parse). Docs only.
- **S48-10 (INFO→cure, AUDIT-3 I2)** — the docs/worklog.md donor
  banner: a one-line provenance note at the head (the .env.example
  S21-12 form) — the donor neo-crm repo's worklog, inert history
  layer; this repo's live worklog is the root worklog.md. Docs only.
- **S48-11 (INFO→cure, AUDIT-3 I4)** — the footer-census count
  interpolation: the S42-9a/S43-5a regexes' hardcoded `e2e 70\/70\.`
  literal becomes `new RegExp(…e2e ${E2E}\/${E2E}…)` (the
  constant-interpolation pin form, the neo-crm lesson adopted at
  session 47) — the count families whose pins derive from the
  constants stop needing manual re-pins at every count change. In
  place — +0 count.
- **S48-12 (INFO→cure, AUDIT-1 I3)** — the smoke-leg regime note: the
  artifact-boot line's comment gains the one-line note (the leg boots
  with `node` for determinism — every env explicit; the production
  `start` script's bun launch is the runtime the standalone server
  itself owns). Comment-truth only.

**Accepted/observed register (this round's tail, with reasons):** the
hero-portrait weight/resize (the pin owns the ratio; the resize is
parity-neutral but a visual-asset change mid-audit-round is not
surgical — deferred to a dedicated round if wanted); the
api-robustness census's `route.ts`-only matcher (I1 — a future
`route.tsx` escapes the census; this repo's TS convention never
produced one; awareness only); the shadow warnings' fatal-precede
unreachability (I2 — by design, documented in-comment); the
type-gate state machine coexisting with the hardened idiom (the
string-aware genus serves its own pins; the canonical FAMILY idiom is
the hardened form — the one-idiom doctrine's scope is the
block-first family); the toast.tsx ledger range lag (the S34-5 lag
invariant owns it — re-anchored to 1..48 in this round's lockstep);
the standing accepted residuals (the detectNiche substring shape, the
proxyHopDepth parse mirror, the setSessionCookie unit gap, the signup
first-admin race, the verify/resend read-then-write pair, the
enumeration faces, the single-node limiter, the 404/error
main-landmark posture, the smoke-leg retired-form negatives, the
in-process limiter, the 404 client-render body, the formula-driven
generator, the in-app OTP delivery, the footer © build-time year)
carried forward unchanged.

## The count re-anchor (draft — the census's own guards own the truth)

UNIT 711 → **717** (+2 docs-counts: the S48-1 pair; +1 docs-counts:
the S48-8 Appendix-B arm; +2 boot-env: the S48-2 pair; +1
landing-page: the S48-5 IHDR it), SUITES 40 unchanged, E2E 70
unchanged (S48-6 in place), E2E_SPECS 9 unchanged, SMOKE 16
unchanged, badge 781 → **787** (= 717 + 70 — the BADGE = UNIT + E2E
guard arbitrates; the session-46/47 draft-slip genus is caught by the
same guard). The ten provenance sites re-anchor to 1..48 — lag 0 at
ship; SKILL v1.43.0 → v1.44.0; the footer census regexes interpolate
from this round on (S48-11) — no manual e2e-literal re-pin this
round or after.

## Docs lockstep at ship

README (badge 787, the 40/717 + 9/70 rows, the session-48 row on the
continuous table, the S48-9 re-spell, the re-anchored footer);
AGENTS (counts, the plans map's forty-eighth round); CLAUDE (counts);
PAD (§8.1 40/717 + 70, §8.3 717/70/16, Last Updated); SKILL
v1.43.0 → v1.44.0 (frontmatter, §0.5 1..48, Appendix A's session-48
row, Appendix B's header + counts, the pre-ship checklist); the ten
provenance sites at 1..48; worklog Task 48; docs/session_48.md (the
formal log replacing the owner's narration); this plan's
post-execution record.

## The tree check, commit, and push

The designed change set only — no stray files; `git status` clean of
.env/.db/.key. Conventional Commit to `main` only, push via the SSH
wrapper runbook (docs/how-to-git-push-using-ssh-wrapper_SKILL.md):
the wrapper, the dry-run, the real push, the remote verification, the
key destruction.

---

## Post-execution record

Executed as designed, with three material deviations, all
battery-driven or census-corrected:

1. **The S48-1 cure deepened beyond the plan's scope** — the plan
   enumerated the 10 named-helper carriers (the audit's census); the
   ban arm surfaced 13 MORE sites: design-tokens' 4 inline strips, 9
   further files carrying the inline pair (docs-counts' own e2e bare
   reader, effects-motion, generator, landing-page, login-views ×9
   sites, page-titles, password-seam, rate-limit ×2), and
   typography's 3 sites (2 CSS-only + the layout pair) — 27 sites in
   all. All cured under the same one-idiom doctrine. The audit's
   "8 further suites" was the helper-form census only; the inline
   forms escaped it — the census's teeth went deeper than the
   audit's, as designed.
2. **The S48-1 pair's battery caught a birth defect** (the THIRD
   consecutive round, the neo-crm genus): the runtime-constructed
   needle was missing its closing `)` — the ban could NEVER trip (the
   vacuous-pin genus). A second birth defect followed in the same
   cure: the comment-stripped read line-eats the needle's own `//`
   tail — a stripped read can never trip the ban. The final design:
   a RAW flattened read + runtime-constructed needles + paraphrased
   pin prose (the s216 doctrine's code form). A commented-out helper
   tripping the raw ban is the desired stance (dead code gets
   retired, not commented out).
3. **The count arithmetic was corrected by the census's own guard**:
   the plan's draft said +6 unit / 717 / badge 787; the disk-walk
   said 718 — the toast dep-array pin shipped as its OWN it (the
   plan had counted it in-place on the existing hover-pause it). The
   badge-drift guard caught the slip, the sessions-46/47 genus a
   THIRD consecutive round. Final: 718/40, e2e 70/9 held, badge 788.

The S48-2 pair is co-pinned on the shared `.env.${mode}.local`
candidate (a defect in the candidate trips both pins — the battery
proved exactly 2 RED on the candidate-drop plant); the co-pin is
documented in the describe's comment per the N12-2 doctrine.

The gate ran green on the exact shipped tree: lint 0/0 · tsc 0 ·
unit 718/718 (40 files) · build · smoke 16/16 · e2e 70/70 (9 specs) ·
census MATCH. Captures 103/104 PIL-verified. Pushed to main via the
SSH wrapper; remote verified.
