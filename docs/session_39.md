# Session 39 — The Mobile-Menu Count Truth + The Typed-Envelope Alignment + The Boot-Gate Case Arm + The Comment-Truth Batch (2026-11-13)

The round opened on the shipped tree (`e79caba` — session-38's commit;
the owner's narration commit `7bf6aad` followed, carrying this file as
the round-38 narration — replaced now by this round's formal log). The
core docs read in full (AGENTS, CLAUDE, README, PAD, SKILL v1.34.0),
then the session-38 set (session_38.md, the session-38 plan, worklog
Task 38, the owner narration). This round is session 39. Baseline gate
GREEN at the documented counts (lint 0/0 · tsc 0 · unit 672/672, 39
files · build with the button-cursor rule in the emitted sheet · smoke
16/16 · e2e 65/65, 9 specs · census MATCH); the standing asks
re-verified up front (the `.env` `DATABASE_URL="file:../db/custom.db"`
contract with `db/` at the repo root; the vitest + playwright suites
in place and current; the sitemap/robots/manifest/OG family; `skills/`
excluded from every gate; the committed `.env.example` matching the
six-knob contract).

The web-application skill + the skills catalog internalized; tdd,
clone-app-pat-pro, and the agent-browser doctrine (computed styles as
ground truth, never eyeballs) applied throughout.

## The audit

Three parallel dispatched subagents (AUDIT-1 API/lib seams, AUDIT-2
components/pages/effects, AUDIT-3 SEO/configs/tests/docs — every
load-bearing finding hand-verified in source by the lead):
**AUDIT-1: 0C/0H/0M/2L/4I · AUDIT-2: 0C/0H/0M/2L/2I · AUDIT-3:
0C/0H/0M/0L/3I** — combined **0 Critical / 0 High / 0 Medium / 4 Low /
9 Info** plus the lead's own live-verified finding (the fifth Low).
The session-38 diff itself verified correct and complete on all three
passes (the S38-1 arm + pin + battery, the ID-form lineage refs, the
provenance re-anchors, the hygiene genera — all re-confirmed; the
S38-7e "five sites compute" miscount and the logout comment's stale
INTERNAL claim were the diff's own residual comment-truth gaps, cured
below). AUDIT-1 caught the one-shot-script enumeration miss and the
boot gate's case-sensitivity blindness; AUDIT-2 caught the untyped
res.json() residue and the dead component API; AUDIT-3 verified every
count claim live and found only designed transients.

## The parity walk

Live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`, on the session-35..38 instrument lessons
applied from the start (`set viewport` + innerWidth confirms,
nav-anchored selectors calibrated against the reference's actual DOM —
no `<header>`, the bar is `<nav>`, the panel a nav div carrying
`md:hidden` + `overflow-hidden`). **ALL FACES MATCH, NO DRIFT — the
twelfth consecutive fully-clean walk.** And the walk LIVE-SETTLED the
round's headline count question: the reference's open mobile panel
carries exactly FIVE anchors — **the four nav links
(Home /Tool /Pricing /Contact) + the Gumroad pill** — byte-identical
to ours (classes, hrefs, texts, cursor pointer; the active link's
teal face; the pill's priced text). The sessions-31..38 records'
"the five links + the Gumroad pill" double-counted the pill — the
exact count-truth genus S38-3 cured for the provenance sites, and the
e2e spec ("the 4 links + the Upgrade pill"), the reference dossier
(§3.1), and the code (NAV_ROUTES + the pill anchor) all agreed with
the live face. The panel mechanics identical both sides (display
block + max-height none + overflow hidden; the reference's
`bg-slate-900/98` still computing `rgba(0,0,0,0)` — dead in its own
build); the hamburger + login submit pointer both sides; Escape
leaves the reference's panel open (our F11-11 superset, re-confirmed).
The desktop nav byte-identical (4 links + the Upgrade pill); the
five-route head census byte-identical modulo origin (titles,
og:title, og:description, descriptions, canonicals); sitemap 4 URLs
both (identical modulo origin); robots identical modulo origin; the
generator probe symmetrically disabled/not-allowed; the login
round-trip both landing the landing (R `/Home`, its duplicate-of-`/`
route; L `/` — the documented 308 deviation).

## The cures (TDD — every pin RED first or battery-planted, the mutation batteries per the house doctrine)

- **S39-1 (LOW, the lead's own, live-verified)** — the mobile-menu
  count truth: twenty record sites re-spelled from "the five links +
  the Gumroad pill" to "the four links + the Gumroad pill" (the
  session logs 32/33/36/37/38, the session-32/33/37/38 plans, three
  worklog rows, the README session-31/32/33/38 rows, the SKILL
  Appendix A session-31/32/33/38 rows — single-line and line-split
  forms both; the correct "5 destinations" phrasing counts the five
  anchors and stays untouched). The executable truth (the e2e
  spec's per-link assertions) already owned the face — no new pin;
  this is the records catching up to the code, the S38-3 precedent.
- **S39-5 (LOW, AUDIT-2 A2)** — the typed-envelope alignment: the six
  untyped client fetch sites (login-card ×5, reset-password-screen
  ×1) gain the typed cast — the generator-card/contact-form idiom —
  via local `AuthResponse`/`ResetResponse` interfaces (the union of
  each file's reads; compile-time only, every `?.` optional-chain
  read unchanged). +1 genus census pin in the NEW
  `tests/client-envelope.test.ts` (the 40th suite): every
  `res.json()` line in src/components/ carries a cast, both cast
  shapes (single-line and the trailing-`as` multi-line form).
  RED-first; the stripped-cast battery on record (one cast reverted →
  the census REDs naming the file and line).
- **S39-13 (AUDIT-1 A5 → cure)** — the boot-gate case arm: env keys
  are case-sensitive, so a lower/mixed-case knob
  (`viralpost_disable_in_app_otp=1`) was invisible to BOTH the
  exact-case reader and the two exact-case scans — the operator
  believes delivery is disabled while the OTP keeps riding the
  responses, with no `[boot]` warning (the S13-1 polarity genus, one
  spelling away). The scan gains the case-variant arm (warn-only,
  after the exact-case branches, mapping the canonical ALL-CAPS
  spelling — `neo_` variants map through the rename). +2 RED-first
  pins (the viralpost case-variant; the neo case-variant); the
  arm-removal battery on record (exactly the two pins RED, the forty
  exact-case tests GREEN through the strip). The in-round lesson on
  the record: the arm's first draft tripped the exact-prefix trap —
  the case-insensitive test matched every healthy exact-case knob —
  and the 33-failure RED caught the lead's own cure before it
  shipped; the load-bearing exclusions are named in the code.
- **S39-9 (INFO→cure, AUDIT-2 A4)** — the footer single-source
  wiring: the one-liner reads `{BRAND.tagline}` (component→component,
  the legal direction; DOM byte-identical — the same string). The
  landing-page footer pin re-pinned to the wiring (the literal would
  be the resurrected unpinned duplicate); the battery on record (the
  wiring reverted → the pin REDs). The nav-config docblock scoped to
  the truth: routes + Gumroad + the tagline are the runtime
  vocabulary; BRAND.name/description are the pinned mirror of
  site.ts's metadata copies (the layer model bars src/lib from
  importing a components module — the documented reason the strings
  are two-sided).
- **S39-10 (INFO→cure, AUDIT-2 A3)** — the dead component-API
  retirement: Reveal's `as` prop (+ the setRef callback-narrowing
  machinery written solely for it) and ParticleText's
  `waitDuration`/`tag` props had zero call-site consumers (all 19
  Reveal sites render the default div; the hero passes neither
  particle prop). Retired; ParticleText binds `waitDuration` from
  `PHASE_SECONDS.wait` internally so the effects-motion reduced-
  cadence pins read unchanged, and the h1 is hardcoded (the a11y
  contract). Props are census-blind — the F9-10/S30-2 dead-surface
  genus's softer form, retired per the house doctrine.
- **S39-11 (INFO→cure, AUDIT-3 A2)** — the S38-1a pin's wedge-proof
  slice bound: the bound now accepts ANY next export form
  (`export (async )?function|export const`, via the slice-then-search
  form — `String.search` takes no start index) and anchors on the
  seam's own `getSessionUser()` call. The battery on record: with a
  decoy `export async function` wedged between the seam and the next
  sync export (carrying the arm shape) and the seam's own arm
  stripped, the OLD bound FALSE-GREENS while the NEW bound REDs —
  the hardening proven load-bearing, not cosmetic.
- **S39-2/S39-3/S39-4 (LOW, the comment/enumeration truths)** —
  logout's S18-3 comment re-spelled to the post-S38-1 status
  vocabulary (503 on the transient family, INTERNAL on the residual);
  the one-shot-script enumeration completed at the three contract
  sites (AGENTS/CLAUDE/PAD now name all three: prisma/seed,
  scripts/e2e-prune, scripts/e2e-contact-readback — the session-34
  docs-lockstep miss); reveal's "five sites compute" corrected to
  four (sections.tsx:107/:217/:271/:359 — the miscount originated in
  the session-38 plan and shipped into the comment).
- **S39-6/S39-7/S39-8 (INFO→cure, the idiom batch)** — forgot's catch
  arms normalized transient-first (the sibling idiom; disjoint code
  sets, zero behavior change); resend/me's import member order
  aligned to the five-member majority; verify's accepted race
  documented (the unconditional clear is deliberate — a conditional
  WHERE would reject a user holding a valid-at-read code).
- **S39-12 (INFO→cure)** — the dead `?? ""` retired from the S28-2
  knob census (read() is readFileSync; the fallback could never
  engage).

**Accepted register (this round's tail, with reasons):** the
provenance range's designed lag-1 window at the baseline (the owner's
narration commit; cured by this round's standard re-anchor — the
S30-4 convention, lag 0 at ship); the exact-source-shape GL-release
regexes (the accepted source-pin doctrine); the generate route's
guard-envelope discard (the documented S17-3 posture); the standing
register carried forward unchanged (the prefers-reduced-motion
live-toggle gap, the JSON-LD/og:locale/twitter:site family, the
`.env.local` unmodeled face, the signup admin-bootstrap TOCTOU, the
scryptSync posture, the login photoUrl asymmetry, the in-app delivery
default, the footer heading skip, the S26-3 breakpoint-crossing
posture, the ParticleText sr-only duplication, the Reveal SSR
opacity, the worklog's structural inconsistencies).

## The count re-anchor

UNIT 672 → **675** (+1 the S39-5a census in the NEW client-envelope
suite, +2 the S39-13a case-variant pins in boot-env), SUITES 39 →
**40**, E2E 65 unchanged, SMOKE 16 unchanged, badge 737 → **740**.
Constants re-anchored FIRST; the census walked the doc sites RED→GREEN
(PAD §12: particle-text 330→333 — the two retired props' net; the
nine provenance sites + toast's owned tenth re-anchored to 1..39 —
lag 0 at ship).

## Verified

- The full gate on the exact commit tree (below)
- The mutation batteries on record: S39-5 (the stripped cast → the
  census REDs naming the site), S39-13 (the arm removed → exactly the
  two case-variant pins RED, the exact-case family GREEN), S39-9 (the
  wiring reverted → the footer pin REDs), S39-11 (the planted wedge:
  the OLD bound false-greens, the NEW bound REDs)
- The in-round TDD catch: the S39-13 arm's first draft warned on
  every healthy exact-case knob — the 33-failure RED forced the
  load-bearing exclusions before the cure shipped
- The parity walk post-cure: all faces hold, the superset faces
  adjudicated as documented — no drift
- Captures 85/86 on the dev server (the owner-instructed posture, the
  session-29..38 precedent): the mobile-menu open clean-walk at
  390×844 + the landing hero at 1280×800, PIL-verified
- Docs lockstep: README (badge 740, the 40/675 rows, the session-39
  row, the gate line); AGENTS (counts, the plans map's thirty-ninth
  round, the three-script enumeration); CLAUDE (counts, the Data
  Layer exemption clause); PAD (§4.3, §8.1, §12 rows, Last Updated
  2026-11-13); SKILL v1.34.0 → v1.35.0 (frontmatter, §0.5 1..39,
  Appendix A's session-39 row, Appendix B's header + counts, the
  pre-ship checklist); worklog Task 39; this session log; the plan's
  post-execution record

**Gate at the session-39 ship: lint 0/0 · tsc 0 · unit 675/675 (40
files) · build · smoke 16/16 · e2e 65/65 (9 specs) · census MATCH.**
