# Session 47 — The Artifact-Anchor Truth + The Reveal-Settle Pins + The Shadow-Env Boot Warning + The Stale-Prose Batch (2026-11-14)

The round opened on the shipped tree (`151eb6f` — session-46's
commit; the owner's narration commit `77ca641` followed, carrying
session_47.md as the round-46 narration — replaced now by this
round's formal log). The core docs read in full (AGENTS, CLAUDE,
README, PAD, SKILL v1.42.0), then the session-46 set (session_46.md,
the session-46 plan, worklog Task 46, the owner narration). This
round is session 47. Baseline gate GREEN at the documented counts
(lint 0/0 · tsc 0 · unit 703/703, 40 files · build · smoke 16/16 ·
e2e 67/67, 9 specs · census MATCH); the standing asks re-verified up
front (the `.env` `DATABASE_URL="file:../db/custom.db"` contract
recreated on the fresh clone with `db/` at the repo root — db:push +
db:seed → census MATCH; the vitest + playwright suites in place and
current — the chromium-1248 gap cured with the documented one-time
`bunx playwright install chromium`, the neo-crm s212/s217 preflight
lesson applied proactively; the sitemap/robots/manifest/OG family
verified live against the reference in this round's walk; `skills/`
excluded from every gate; the committed `.env.example` matching the
six-knob contract).

The web-application skill + the skills catalog internalized; tdd,
clone-app-pat-pro, agent-browser (computed styles as ground truth,
never eyeballs), and the Tailwind v4 doctrine applied throughout.
(The round survived a mid-execution sandbox reset — the tree was
rebuilt from the validated plan and every battery re-proven on the
rebuilt tree; the gate below ran on the exact shipped tree.)

## The audit

Three parallel dispatched subagents (AUDIT-1 API/lib seams, AUDIT-2
components/pages/effects, AUDIT-3 SEO/configs/tests/docs) + the
neo-crm currency check — every load-bearing finding hand-verified in
source by the lead. **AUDIT-1: 0C/0H/1M/2L/1I · AUDIT-2:
0C/0H/1M/3L/3I · AUDIT-3: 0C/0H/0M/1L/3I** — combined
**0 Critical / 0 High / 2 Medium / 6 Low / 7 Info**. The session-46
diff itself verified correct and complete on all three passes.

The decisive hand-verification (S47-1, AUDIT-1's Medium): the
cwdFallbackUrl docblock's artifact-deploy claim was LIVE-FALSIFIED
on the built artifact — `.next/standalone` copied to `/tmp/vp-artifact`,
booted with a clean env, `/api/health` answered healthy while
`/tmp/vp-artifact/db/custom.db` was created as a 0-byte file. In the
artifact-only shape the MODULE anchor owns resolution (Turbopack
compiles `import.meta.url` into the runtime getter
`e.F("src/lib/db-path.ts")` — verified in the shipped chunks —
which resolves to the real file path at boot; the artifact ships
both `src/lib/` and `prisma/schema.prisma`), `urlForRoot` mkdirs
`<artifact>/db` on demand, and a fresh artifact answers a healthy
200 against a table-less empty DB (SELECT 1 succeeds; the first
User query P2021s) — NOT the documented raw pass-through + Error-14
posture.

## The parity walk

Live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`, viewport confirmed 390×844 before every
mobile probe, computed styles as ground truth. **ALL CLONE FACES
MATCH — the twentieth consecutive clean walk — no clone-side drift,
no NEW reference-side drift** (the session-45 404-title bare posture
persists — /NoSuchRoute, /Dashboard, /page2 re-probed: HTTP 200 +
the bare "ViralPost AI" title + the 404 h1 body; ours keeps the
derived title as the documented superset; the D-1 failure-toast
posture re-verified — the same toast text, zero hashtags, the button
settled back).

The mobile menu works exactly as expected (the owner's standing
concern): the panel byte-identical both sides (the four nav links —
Home's teal rgb(45,212,191) active face, the siblings'
rgb(203,213,225) — plus the Gumroad pill at the templixco href,
14px/500-600, display block + max-height none, the
transparent-over-hero bg chain); the hamburger cursor pointer both
sides (the Tailwind v4 standing concern holding); the reference's
hamburger still ships NO aria family (our expanded family the
documented superset); Escape leaves the reference's panel open (our
F11-11 superset verified closing with focus returned to the toggle);
the same-route Logo click leaves the panel open on BOTH sides; the
outside-tap face leaves it open on BOTH sides (the hero paragraph);
route-change close + auto-close verified; the desktop nav
byte-identical (the active face following the route); the five-route
head census identical modulo origin; sitemap 4 URLs both + robots
identical modulo origin; the generator probe symmetrically
dead/live; the login round-trip both landing the landing (R `/Home`,
L `/` — the documented 308 deviation), the clone session verified
live via /api/auth/me (Demo Creator, role admin).

The neo-crm reference repo re-checked (the standing instruction):
its latest round (its session-217 / file session_459.md) continues
the semantic-prose census genus; stack pins identical (all 8). Three
lessons ADOPTED this round: the semantic-prose doc-claim census
idiom (S47-9b at birth), the constant-interpolation pin form, the
Playwright browser-binary preflight (applied at baseline).

## The cures (TDD — four mutation batteries on record, each exactly its designed pin RED, restores verified; every new arm single-tooth, the neo-crm redundant-arm lesson applied)

- **S47-1 (MEDIUM, AUDIT-1 M1)** — the artifact-anchor truth: the
  db-path.ts header + the cwdFallbackUrl docblock re-spelled to the
  probed truth (the module anchor owns the artifact-only shape; a
  fresh artifact serves healthy-200 on a 0-byte table-less DB; the
  CWD arm fires only when BOTH validated anchors miss) + the
  DEPLOYMENT.md §7 fresh-artifact row (the live probe recorded —
  the operator's playbook: db:push at `<artifact>/db/custom.db` or
  an absolute DATABASE_URL). The optional health-route schema probe
  DEFERRED (the accepted register carries the reason: the e2e
  webServer's fresh-boot probe deliberately passes on the empty
  auto-created file — a schema-aware SELECT would 503 that leg).
- **S47-4 (MEDIUM, AUDIT-2 M1)** — the reveal-settle pins: the
  scroll-reveal (17 live call sites) was unpinned and BOTH existing
  oracles are blind to the stuck-hidden regression (toBeVisible
  passes on opacity: 0; axe does not fail headings at opacity 0).
  Cure: the source pin (both hidden forms, both settle arms, the
  reduced/no-IO early return, the disconnect pair, the []-deps arm)
  + the e2e computed-opacity leg on the WRAPPER div (the child's own
  computed opacity reports 1 under a 0-opacity parent — the wrapper
  is the element that carries the hidden inline style; the "How It
  Works" head is the below-fold target — the S19-11 pricing head is
  deliberately unfaded, never a Reveal target). Battery: the settle
  break (the opacity line dropped) → exactly the source pin RED.
- **S47-2 (LOW, AUDIT-1 L2)** — the shadowing-env boot warning: a
  `shadowingEnvFileWarnings(dir, env, exists)` pure seam (the
  injectable-exists pattern; candidates `.env.local` +
  `.env.<NODE_ENV>`, never `.env` itself) + the instrumentation.ts
  wiring (warn-only, the [boot] family, the S13-1 doctrine) + 3
  pins (found/not-found, the doctrine sentence, the wiring source
  pin). Battery: the wiring removal → exactly the wiring pin RED.
  The EDGE-COMPILE CALIBRATION (born in the same round): a direct
  `process.cwd()` in instrumentation.ts's body trips Turbopack's
  edge compile ("a Node.js API is used … not supported in the Edge
  Runtime") — the cwd read lives in the dynamically-imported
  `shadowingEnvFileWarningsForServer` wrapper (boot-env.ts), behind
  the next-runtime guard, so the edge compile never statically sees
  it; the wiring pin asserts the wrapper call AND the no-direct-cwd
  negative (comment-stripped).
- **S47-3 (LOW, AUDIT-1 L3)** — the anchor-order pin: the validated
  array's order (standalone-CWD before module) + the CWD arm's
  post-loop position, source-pinned — the reachability contract
  S47-1 exposed as unpinned. Battery: the anchor swap → exactly the
  order pin RED.
- **S47-5/S47-6/S47-7 (LOW, AUDIT-2 L1/L2/L3)** — the testing-gap
  batch: the hero portrait CLS pin (the 512×512 geometry), the
  skip-link keyboard e2e leg (Tab → the revealed pill → activate →
  #main-content focused — the S23-3 WebKit face, runtime-pinned per
  the S32-6 doctrine), the toast auto-dismiss e2e leg (the over-
  length error toast renders then dismisses at ~4s; hover-pause
  stays source-pinned — a hover-hold e2e is timing-flaky by nature).
- **S47-9 (LOW, AUDIT-3 L1)** — the stale-prose batch: the FIVE
  live-tense sites that still described the reference's failure
  posture as an infinite hang (the implementation-plan Deviations
  row, the README deviations table, CLAUDE's error-handling section,
  SKILL §1, the generator spec comment) re-spelled to the D-1
  settled posture + the wrap-blind stale-prose census pair (the
  neo-crm s213–s217 idiom at birth: the flattened read bans the
  stale spellings in the five files + asserts the corrected form
  present). Battery: the phrase re-plant → exactly the ban arm RED.
- **S47-8 (INFO→cure)** — the globals.css HOYVER → HOVER comment fix.
- **S47-10 (INFO→cure)** — the stripComments birth-defect cure: the
  naive block regex phantom-OPENS on the `db/**` glob prose inside
  db-path.ts's line comments (the lazy match pairs the glob's `/**`
  with a distant real `*/` closer and eats ~5KB of live code
  including the export the pins assert) — live-caught at birth when
  the S46-6 wrap false-REDDed. Cure: the line-first order + the
  whitespace-anchored block opener, proven on the exact file; the
  S46-6 pin's read moved onto it (the one-idiom doctrine).

**Accepted/observed register (this round's tail, with reasons):**
the health-route schema probe (deferred — the e2e webServer
fresh-boot race); the footer heading-order skip (parity-protected);
the toast viewport's mobile clip edge (the 4-card cap bounds it; no
parity constraint — the reference ships no toast); the provenance
lag-1 transient (re-anchored to 1..47 this round); the footer census
regexes' count literals (the documented trade-off, re-pinned to
70/70); the standing accepted residuals (the detectNiche substring
shape, the proxyHopDepth parse mirror, the setSessionCookie unit
gap, the signup first-admin race, the verify/resend read-then-write
pair, the enumeration faces, the single-node limiter, the 404/error
main-landmark posture, the smoke-leg retired-form negatives)
carried forward unchanged.

## The count re-anchor

UNIT 703 → **711** (+3 boot-env: the shadow seam pair + the wiring
pin; +1 db-path: the anchor-order pin; +1 effects-motion: the
reveal pin; +1 landing-page: the CLS pin; +2 docs-counts: the
stale-prose census pair), SUITES 40 unchanged, E2E 67 → **70** (+2
landing: the settle + skip-link legs; +1 generator: the
toast-dismiss leg), E2E_SPECS 9 unchanged, SMOKE 16 unchanged, badge
770 → **781**. Constants re-anchored FIRST; the plan's draft
arithmetic (+7 unit / 710 / 780) was corrected by the census's own
BADGE = UNIT + E2E guard at the constants walk (the S47-9 census is
a PAIR — 711 + 70 = 781; the session-46 769→770 genus, caught by
the same guard two rounds running). PAD §12's db-path row re-anchored
453 → 477; the two footer census regexes re-pinned 67/67 → 70/70;
the ten provenance sites re-anchored to 1..47 — lag 0 at ship; SKILL
v1.42.0 → v1.43.0.

## Verified

- The full gate on the exact commit tree (below)
- The four mutation batteries single-tooth on record: S47-2 (the
  wiring removal → exactly the wiring pin RED), S47-3 (the anchor
  swap → exactly the order pin RED), S47-4 (the settle break →
  exactly the reveal pin RED), S47-9 (the phrase re-plant → exactly
  the ban arm RED)
- The redundant-arm check: every new arm verified single-tooth
  (enumerated against the existing pins at birth)
- The artifact boot probe (the decisive audit evidence, live): the
  copied artifact, the clean env, the healthy 200, the 0-byte db
- The parity walk post-cure re-run: the standing faces hold, no
  drift
- Captures 101/102 on the dev server (the owner-instructed posture,
  the session-29..46 precedent): the mobile-menu open clean-walk at
  390×844 + the landing hero at 1280×800, PIL-verified
- Docs lockstep: README (badge 781, the 40/711 + 9/70 rows, the
  session-47 row, the re-anchored footer); AGENTS (counts, the plans
  map's forty-seventh round); CLAUDE (counts); PAD (§8.1 40/711 +
  70, §8.3 711/70/16, §12's db-path row, Last Updated 2026-11-14);
  SKILL v1.42.0 → v1.43.0 (frontmatter, §0.5 1..47, Appendix A's
  session-47 row, Appendix B's header + counts, the pre-ship
  checklist); the ten provenance sites at 1..47; the D-1
  re-verification bracket; the DEPLOYMENT §7 fresh-artifact row;
  worklog Task 47; this session log; the plan's post-execution
  record

**Gate at the session-47 ship: lint 0/0 · tsc 0 · unit 711/711 (40
files) · build · smoke 16/16 · e2e 70/70 (9 specs) · census MATCH.**
