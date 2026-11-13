# Session 48 — The stripComments One-Idiom Cure + The Shadow-Env Cascade Mirror + The Toast Dep-Array Pin + The CLS IHDR Face + The Appendix-B Header Census + The Count Interpolation (2026-11-14)

The round opened on the shipped tree (`2a48ce8` — session-47's commit;
the owner's narration commit `6912da2` followed, carrying session_48.md
as the round-47 narration — replaced now by this round's formal log).
The core docs read in full (AGENTS, CLAUDE, README, PAD, SKILL
v1.43.0), then the session-47 set (session_47.md, the session-47 plan,
worklog Task 47, the owner narration). This round is session 48.
Baseline gate GREEN at the documented counts (lint 0/0 · tsc 0 · unit
711/711, 40 files · build · smoke 16/16 · e2e 70/70, 9 specs · census
MATCH); the standing asks re-verified up front (the `.env`
`DATABASE_URL="file:../db/custom.db"` contract recreated on the fresh
clone with `db/` at the repo root — db:push + db:seed → census MATCH;
the vitest + playwright suites in place and current — the
chromium-1248 preflight cured with the documented one-time
`bunx playwright install chromium`; the sitemap/robots/manifest/OG
family verified live against the reference in this round's walk;
`skills/` excluded from every gate; the committed `.env.example`
matching the six-knob contract).

The web-application skill + the skills catalog internalized; tdd,
clone-app-pat-pro, and the agent-browser doctrine (computed styles as
ground truth, never eyeballs) applied throughout. The neo-crm
reference repo re-checked per the standing instruction: unchanged
since the session-47 check — its latest round is still its
session-217 (file session_459.md); stack pins identical; its three
lessons were already adopted at session 47, no new lessons this round.

## The audit

Three parallel dispatched subagents (AUDIT-1 API/lib seams, AUDIT-2
components/pages/effects, AUDIT-3 SEO/configs/tests/docs) — every
load-bearing finding hand-verified in source by the lead.
**AUDIT-1: 0C/0H/2M/2L/3I · AUDIT-2: 0C/0H/0M/3L/2I · AUDIT-3:
0C/0H/0M/1L/4I** — combined **0 Critical / 0 High / 2 Medium / 6 Low /
9 Info**. The session-47 diff itself verified correct and complete on
all three passes — both Medium findings are genus-gaps the S47-10
cure left open (the hardened stripComments idiom landed in ONE file
while the family kept the phantom-open form) and the S47-2
shadow-warning seam checked two of Next's four cascade files.

The decisive hand-verifications: **S48-1 (AUDIT-1 M1)** — the
byte-level naive-vs-hardened comparison proved live phantom-eating on
the scanned files (719 chars on design-tokens.test.ts — a whole
describe + importSymbols body eaten; 271 on password-seam.test.ts —
the phantom opens at the `/*` inside a live it-title string; 2295 on
docs-counts itself — the `tests/*` glob prose inside a live template
literal; zero count impact today, but the forms-guards read these
files through the mangling strip: a violating form planted inside an
eaten span ships GREEN — the exact comment-blind genus S47-10 cured
for one file after it live-REDDed there). **S48-2 (AUDIT-1 M2)** —
Next's real cascade, read from the installed @next/env
loadEnvConfig: `[.env.${d}.local, d!=="test"&&.env.local,
.env.${d}, ".env"]` — the seam checked `.env.local` +
`.env.${NODE_ENV}` only, so the standard-convention operator (a
DATABASE_URL in `.env.production.local`, the FIRST file loaded)
got ZERO warning, the exact case S47-2 exists to name.

## The parity walk

Live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`, viewport confirmed 390×844 before every
mobile probe, computed styles as ground truth. **ALL CLONE FACES
MATCH — the twenty-first consecutive clean walk — no clone-side
drift, no NEW reference-side drift** (the session-45 404-title bare
posture persists — /NoSuchRoute re-probed: the bare "ViralPost AI"
title + the 404 h1 body both sides; ours keeps the derived title as
the documented superset). The D-1 failure-toast posture re-verified at
THREE layers this round: the network face (POST
`/api/apps/…/integration-endpoints/…` → **402**), the DOM face (an
inline `DIV.mt-3.flex.items-start.gap-2.text-xs.text-red-500` under
the form — not a portal toast; the exact text "Generation failed, so
this attempt didn't use one of your free tries. Please try again."),
and the settle face (button enabled "Generate Post", zero hashtags,
no Copy).

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
hero paragraph); route-change close verified both sides; the desktop
nav byte-identical (brand + 4 links + the Upgrade pill, the active
face following the route); the five-route head census identical
modulo origin; sitemap 4 URLs both + robots identical modulo origin;
the generator probe symmetrically dead/live; the login round-trip
both landing the landing (R `/Home`, L `/` — the documented 308
deviation), the clone session verified live via /api/auth/me (Demo
Creator, role admin).

## The cures (TDD — six mutation batteries on record; the battery caught a birth defect for the THIRD consecutive round, the neo-crm genus)

- **S48-1 (MEDIUM, AUDIT-1 M1+L2 folded, the ban deepened beyond the
  audit's enumeration)** — the stripComments one-idiom cure: the
  hardened form (line pass first; block opener anchored `(^|\s)`)
  propagated family-wide — the 10 named helpers (api-robustness,
  auth-contract, auth-reset, body-pregate, db-census, db-path
  [already], dev-origins the partial variant, docs-counts,
  seo-surfaces, toast-anatomy), 4 inline sites in design-tokens, 9
  further inline-pair files (docs-counts' e2e bare reader,
  effects-motion, generator, landing-page, login-views ×9 sites,
  page-titles, password-seam, rate-limit ×2), and typography's 3
  sites (2 CSS-only anchored + the layout pair) — 27 sites in all;
  the BAN surfaced them where the audit's census found 10. NEW PIN
  PAIR in docs-counts: the flattened RAW read bans the naive
  block-first signature (runtime-constructed needle — the s216
  ban-safe-paraphrase doctrine's code form) + the presence arm
  asserts the hardened two-pass sequence in order per carrier. The
  battery caught the pin's own birth defect: the needle was missing
  its closing `)` — the ban could NEVER trip (the vacuous-pin genus);
  and the RAW-read redesign after proving a comment-stripped read
  line-eats the needle's own `//` tail. Batteries: the naive-plant in
  a non-carrier → exactly the ban RED; the order-swap in a carrier →
  exactly the presence RED.
- **S48-2 (MEDIUM, AUDIT-1 M2)** — the shadow-env cascade mirror:
  the candidates mirror Next's real cascade minus `.env` itself
  (`.env.${mode}.local` first; `.env.local` skipped under
  NODE_ENV=test). NEW PIN PAIR in boot-env (the `.env.production.local`
  face + the test-mode skip face); the two existing S47-2 pins stayed
  GREEN unchanged. Battery: the candidate-drop → exactly the pair
  (co-pinned on the shared candidate — documented in the describe per
  the N12-2 doctrine; the shared candidate IS the cascade mirror).
- **S48-3 (LOW, AUDIT-1 L1)** — the warning prose truth: the docblock
  + the message re-spelled to the traced resolution chain (a relative
  value re-anchors inside the repo, an absolute one honored verbatim —
  the by-design intentional-override contract); the "reads only .env"
  doctrine sentence kept.
- **S48-4 (LOW, AUDIT-2 L1)** — the toast dep-array pin: the
  `[paused, item.id]` re-arm joined toast-anatomy as its own it (the
  plan counted it in-place — the census's disk-walk corrected the
  arithmetic, below); the generator.spec comment re-worded to name its
  true owner. Battery: the dep regression (`[item.id]`) → exactly the
  pin RED.
- **S48-5 (LOW, AUDIT-2 L2)** — the hero PNG IHDR square-ratio pin
  (born-green — the asset is 1024×1024 square today). Battery: the
  non-square header (640×480) planted on the asset → exactly the pin
  RED; restored byte-identical. The ~0.93MB weight and the optional
  512px resize stay in the accepted register (parity-neutral per the
  dossier — an independently created equivalent, our own asset).
- **S48-6 (LOW, AUDIT-2 L3)** — the reveal e2e leg's structural
  anchor: `toHaveClass(/transition-all/)` before the opacity
  assertion (a future intermediate wrapper div can no longer leave the
  leg vacuously green). In-place — +0 e2e.
- **S48-7 (INFO→cure, AUDIT-2 I1)** — the S47-4 reveal pin joined the
  suite's bare() strip idiom.
- **S48-8 (LOW, AUDIT-3 L1)** — the Appendix-B header census: a NEW it
  ties the SKILL Appendix-B header's `re-certified through session
  (\d+)` bound to the §0.5 `session_1..(\d+)` bound (the S43-5 form) —
  the header shipped stale at session 47 while the ship record claimed
  the re-anchor; the genus is now mechanically impossible. Battery:
  the header re-stale → exactly the arm RED.
- **S48-9 (INFO→cure, AUDIT-3 I1)** — the README e2e re-run advice
  re-spelled to the contact bucket's 60-minute window.
- **S48-10 (INFO→cure, AUDIT-3 I2)** — the docs/worklog.md donor
  banner (the .env.example S21-12 provenance-note form).
- **S48-11 (INFO→cure, AUDIT-3 I4)** — the footer-census count
  interpolation: GATE_FOOTER_RE built from the SMOKE/E2E constants (the
  constant-interpolation pin form) — the last manual e2e-literal
  re-pin was session-47's. The exec/match /g calibration (a /g regex
  through String.match returns bare strings, no groups).
- **S48-12 (INFO→cure, AUDIT-1 I3)** — the smoke-leg regime note (the
  `node` boot by design; the bun launch is the start script's regime).

**Accepted/observed register (this round's tail, with reasons):** the
hero-portrait weight/resize (the pin owns the ratio; a visual-asset
change mid-audit-round is not surgical — deferred to a dedicated
round if wanted); the api-robustness census's `route.ts`-only matcher
(a future `route.tsx` escapes the census; this repo's TS convention
never produced one; awareness only); the shadow warnings'
fatal-precede unreachability (by design, documented in-comment); the
type-gate state machine coexisting with the hardened idiom (the
string-aware genus serves its own pins; the canonical FAMILY idiom is
the hardened form); the toast.tsx ledger-range lag invariant (re-
anchored to 1..48 this round, lag 0 at ship); the standing accepted
residuals (the detectNiche substring shape, the proxyHopDepth parse
mirror, the setSessionCookie unit gap, the signup first-admin race,
the verify/resend read-then-write pair, the enumeration faces, the
single-node limiter, the 404/error main-landmark posture, the
smoke-leg retired-form negatives, the in-process limiter, the 404
client-render body, the formula-driven generator, the in-app OTP
delivery, the footer © build-time year) carried forward unchanged.

## The count re-anchor

UNIT 711 → **718** (+7 — the census's own disk-walk corrected the
plan's draft +6/717: the toast dep-array pin shipped as its OWN it,
the plan had counted it in-place; the badge-drift guard caught the
slip, the sessions-46/47 genus a THIRD consecutive round), SUITES 40
unchanged, E2E 70 unchanged (the S48-6 anchor is in-place), E2E_SPECS
9 unchanged, SMOKE 16 unchanged, badge 781 → **788**. Constants
re-anchored FIRST; the census walked the doc sites RED→GREEN. PAD
§12's smoke row re-anchored 269 → 275 (the S48-12 note's six lines);
the ten provenance sites re-anchored to 1..48 — lag 0 at ship; SKILL
v1.43.0 → v1.44.0.

## Verified

- The full gate on the exact commit tree (below)
- The six mutation batteries single-tooth on record: the naive-plant
  → exactly the ban RED / presence GREEN; the order-swap → exactly
  the presence RED / ban GREEN; the candidate-drop → exactly the
  co-pinned pair (documented); the dep regression → exactly the
  dep-array pin; the header re-stale → exactly the header arm; the
  non-square IHDR → exactly the square pin
- The redundant-arm check: every new arm verified single-tooth
  (enumerated against the existing pins at birth; the S48-1 ban found
  27 sites where the audit's census saw 10 — the census's teeth, not
  a redundant arm)
- The parity walk post-cure: the standing faces hold, no drift
- Captures 103/104 on the dev server (the owner-instructed posture,
  the session-29..47 precedent): the mobile-menu open clean-walk at
  390×844 + the landing hero at 1280×800, PIL-verified
- Docs lockstep: README (badge 788, the 40/718 + 9/70 rows, the
  session-48 row on the continuous table, the S48-9 re-spell, the
  re-anchored footer); AGENTS (counts, the plans map's forty-eighth
  round); CLAUDE (counts); PAD (§8.1 40/718 + 70, §8.3 718/70/16,
  §12's smoke row); SKILL v1.43.0 → v1.44.0 (frontmatter, §0.5 1..48,
  Appendix A's session-48 row, Appendix B's header + counts, the
  pre-ship checklist); the ten provenance sites at 1..48; worklog
  Task 48; this session log; the plan's post-execution record

**Gate at the session-48 ship: lint 0/0 · tsc 0 · unit 718/718 (40
files) · build · smoke 16/16 · e2e 70/70 (9 specs) · census MATCH.**
