# Session 31 — The db-Path Whitespace Normalization + The History-Close Focus Return + The Import-Census Generalization + The E2E Superset Batch (2026-11-12)

The round opened on the pulled tree (`98912fa` — the owner's session log
update holding the session-30 execution narration, the established
pattern). The core docs read in full (AGENTS, CLAUDE, README, PAD, SKILL
v1.26.0), then the session-30 set (session_30.md, the session-30 plan,
worklog Task 30, the owner's session_31.md narration). This round is
session 31. Baseline gate GREEN at the documented counts (lint 0/0 · tsc
0 · unit 644/644, 38 files); the standing asks re-verified up front (the
.env DATABASE_URL contract with `db/` at the repo root, census MATCH;
the vitest + playwright suites current; the sitemap/robots/manifest/OG
family fresh against the live reference — this round's walk; `skills/`
excluded from every gate, all pinned; the committed `.env.example`
matching the six-knob contract). neo-crm re-checked at HEAD `b3d0fbe` —
UNCHANGED since session 12; the recorded decisions stand.

The web-application skill + the skills catalog internalized (the family
skill every prior round internalized — the repo's own
viralpost-ai_SKILL.md is its distilled project form, read in full);
tdd, clone-app-pat-pro, agent-browser, webapp-testing-journey (the
mobile-navigation Class A–H doctrine), and nextjs16-tailwind4 consulted
for the audit and the walk. Playwright (the repo's own devDependency)
drove the parity walk. Three parallel audit subagents dispatched
(AUDIT-1 API/lib seams, AUDIT-2 components/pages/effects, AUDIT-3
SEO/configs/tests/docs — the last also running the full gate live:
build PASS · smoke 15/15 · e2e 63/63 after the one-time chromium
install, the gap itself becoming finding S31-3) while the findings were
hand-verified in source. The audit returned **AUDIT-1: 0C/0H/0M/1L/2I ·
AUDIT-2: 0C/0H/0M/1L/3I · AUDIT-3: 0C/0H/0M/1L/3I** — combined 0
Critical / 0 High / 0 Medium / 3 Low / 8 Info at the subagent reports.
The lead's adjudication took all three Lows plus five Info items into
the working register (all cured this round — S31-1..S31-7), moving the
rest to the accepted register with reasons (the signup admin-bootstrap
race — the STANDING session-27 adjudication re-confirmed; the two
formatting nits carried forward; the Tailwind .md-scanner residual —
see S31-5a).

The parity walk (live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`) ran the mobile-menu census at 390×844:
the hamburger base classes byte-identical (`md:hidden p-2
text-slate-300` + our documented superset arms; the reference still
ships the bare button, no aria family), all five mobile links + the
Gumroad pill "Upgrade to Pro – $19" byte-identical (classes, hrefs,
texts), the bar `bg-transparent` with the menu open at scrollY=0
(byte-identical classes, both computed `rgba(0, 0, 0, 0)` — the S26-3
cure holds), the scrolled-bar class family byte-identical with the
computed background the same color in its two spellings (our
`oklab(0.207678 -0.00293915 -0.0397103 / 0.95)` = the reference's
`rgba(15, 23, 42, 0.95)`), the open panel computed transparent both
sides at scrollY=0 (the reference's dead 98-percent panel token vs our
S22-5 replication — same render), the desktop nav family, the
five-route head census — **NO DRIFT** (titles, og:title, og:description,
meta description, twitter:card byte-identical across all five routes;
canonical + og:url differ by origin only; og:image the documented D-4
self-hosted stand-in; our og:image:width/height the documented
superset — the reference ships no dims), sitemap.xml + robots.txt
identical modulo origin, and the clone's login round-trip verified
live: 200 → `router.push("/")` → the `viralpost_session` cookie → the
`/api/auth/me` envelope, plus the full mobile-menu functional battery
(the aria family, the link-click navigate+close, the Escape close with
focus return, the history-navigation close). **NO DRIFT FOUND — the
fifth consecutive fully-clean walk.** The Tailwind v4 trap catalog
re-verified mitigated throughout (AUDIT-2 compiled the repo's real
`globals.css` with the installed tailwindcss 4.3.3 and probed the
OUTPUT: zero `(hover: hover)` queries, literal-hex `@theme`, the
re-pinned `--shadow-sm`/`--blur-sm`, no banned gradient pair, zero
unmatched v4 classes across the 475-token census).

The session-31 plan written and validated against the codebase (the
anchor set — the S30-1 pin pair in db-path.test.ts, the S25-16/F11-11
pin family in a11y-controls.test.ts, the walkSourceFiles helper + the
census describes in design-tokens.test.ts, the S29-5 block in
seo.spec.ts, the reset screen's form ids + the route's 400 vocabulary,
the docs-counts constants block, the PAD §12 rows, the five provenance
sites), then executed with TDD throughout:

- **S31-1 (the db-path whitespace normalization, the round's lead
  cure)**: the pins RED first (2 its), then the cure — the S30-1
  `|| undefined` normalization only caught the literal empty string; a
  whitespace-only `DATABASE_URL` (`" "`) was truthy on both boundary
  faces and rode through the tail `??` chain as a SET override — a
  quoted-space process env MASKED a valid `.env` value and a
  whitespace `.env` line skipped the documented `DEFAULT_DATABASE_URL`
  fallback a missing line gets (live-probed pre-cure: the seam answered
  `" "`; no legitimate Prisma URL is whitespace-only — the S30-1
  rationale verbatim). The one-home cure trims both boundaries
  (`?.trim() || undefined`), keeping the bun-signature comparison
  consistent on both faces. Mutation battery: the trim reverted →
  both pins RED.
- **S31-2 (the history-close focus return)**: the pin RED first, then
  the cure — the mobile menu's THIRD close arm (the adjust-during-
  render pathname-change close, F10-10 — browser back/forward) closed
  the panel with NO focus return while its two sibling arms (Escape
  F11-11, link-click S25-16) both restore focus to the toggle — the
  exact WCAG 2.4.3 genus S25-16 documented and cured for the click
  path. THE ROUND'S DESIGN LESSON: the first cure shape (a render-phase
  `closedByNavRef` one-shot flag — the adjust-during-render escape
  hatch) was REJECTED BY THE GATE's lint leg (`react-hooks/refs`:
  "Cannot access refs during render" — the React-Compiler-era rule the
  repo's eslint-config-next carries). The redesigned cure records the
  pre-close open state as STATE (`setMenuWasOpen(open)` in the
  adjust-during-render block — a sanctioned state adjustment, never a
  ref write) and a pathname-keyed `useLayoutEffect` focuses the toggle
  when `menuWasOpen` — before paint, so focus never falls to `<body>`
  with the unloaded panel link. The pin re-anchored to the final
  mechanism; the S25-16 family-count arm re-anchored 2→3 (the census
  face of the focus family). Both mutation batteries on record (the
  effect removed → the S31-2 pin + the S25-16 count pin RED; proven on
  BOTH shapes).
- **S31-3 (the playwright browser-install prerequisite)**: the pins
  are the doc sites — `bunx playwright install chromium` appeared
  NOWHERE in the doc set while bun's `trustedDependencies` (three
  packages, not Playwright) never runs the postinstall, so a fresh
  clone's gate fails at the final leg with an opaque
  `browserType.launch: Executable doesn't exist` (reproduced live by
  the audit's gate leg: 62 tests did not run). Documented at the three
  operator sites: README's testing section, CLAUDE's build-commands
  table, AGENTS' Commands E2E row.
- **S31-4 (the donor marker)**: auth.ts's `Session-30 (S30-P3)`
  citation gained the "(a donor-ledger number)" marker — the S30-4
  convention's rule, resolving the collision with this repo's own
  session-30 finding range (S30-1..S30-5).
- **S31-5 (the hygiene batch)**: (a) the navbar's two verbatim
  dead-class comment mentions re-spelled prose-safe (the S28-4
  doctrine — Tailwind v4's candidate scanner reads comments and the
  compiled output carried a never-matched rule). THE RESIDUAL,
  ADJUDICATED ON COMPILE EVIDENCE: the compiled stylesheet STILL
  carries the rule — the scanner also reads `.md` files
  (isolated-test-verified: a markdown file carrying the literal emits
  it), and the immutable historical-record docs (worklog, the session
  logs — the records doctrine forbids re-spelling them) carry the
  verbatim spelling. The ~100-byte never-matched rule is ACCEPTED with
  that evidence; the src/ face (the app-code doctrine face) is cured.
  (b) Reveal's docstring gained the mount-time-constants contract for
  `direction`/`delay` (the latent stuck-hidden hazard for future
  dynamic call sites — documented, not reachable today).
- **S31-6 (the generalized dead-import census)**: the genus guard —
  the S30-2 pin retired the sections.tsx dead imports but guarded ONE
  file while the genus is gate-blind tree-wide (`noUnusedLocals` off,
  `no-unused-vars` off; struck twice: F12-11, S30-2). The census (a new
  describe in the design-tokens suite — the census owner; SUITES stays
  38) walks every `src/**/*.{ts,tsx}` import clause (named/default/
  namespace/type-only/side-effect aware, multiline-aware, the dynamic
  `import()` in instrumentation excluded by shape) and asserts each
  bound symbol occurs outside its import statement. The planted-defect
  proof (the census-pin doctrine since session-11): a dead
  `WandSparkles` planted in footer.tsx → the census RED with the file
  + symbol named; removed → GREEN (footer.tsx byte-identical after the
  round-trip). The sections.tsx co-pin documented in the census's
  comment (the N12-2 one-owner doctrine's sanctioned co-pinned form).
- **S31-7 (the e2e superset batch)**: the og:image dims
  (`og:image:width` 1200 / `og:image:height` 630) asserted on the
  SERVED head, folded in-place onto the S29-5 block (the S18-2
  precedent — no count change; pinned at the const + asset levels
  before, never the rendered DOM); the authed-visitor `/login`
  no-redirect posture (s23-P2, a donor-ledger number — the reference
  serves the login card to authenticated visitors too) gained its
  first behavioral leg (a `page`-fixture navigation with the setup
  project's storageState: the "Welcome to ViralPost AI" heading at
  `/login`, no redirect); the reset screen's API-rejected banner
  gained its first leg (garbage token → matching passwords → the
  envelope's 400 → the form's `role="alert"` banner carrying "Invalid
  or expired reset token"). One in-flight locator catch: bare
  `getByRole("alert")` resolves to TWO elements — Next's own route
  announcer (`__next-route-announcer__`, aria-live assertive) also
  carries the role; the locator scopes to `form [role="alert"]`.

The count re-anchor: UNIT 644 → 648 (+4 pins — the plan's projection
exact, confirmed by the census before any doc site was touched), E2E
63 → 65 (+2 legs), SUITES 38 unchanged, badge 707 → 713; the
docs-counts constants re-anchored FIRST (the session-29/30 lesson),
the census then walked the doc sites GREEN (the PAD §12 rows the
cures' own line-count deltas produced re-anchored in the same pass:
db-path 292→297, navbar 233→260, auth 188→189).

The full gate on the exact commit tree: **lint 0/0 · tsc 0 · unit
648/648 (38 files) · build · smoke 15/15 · e2e 65/65 (9 specs)** ·
census MATCH. Captures 69/70 taken on the dev server (the
owner-instructed posture, the session-29/30 precedent), PIL-verified
(390×844, ~19k / ~1.5k unique colors): the mobile-menu open clean-walk
(functionally verified open: display block + 5 links + aria-expanded —
the S31-2 surface) + the reset-password error banner (the S31-7c
surface, the exact API-rejected text). The cured surfaces
live-verified through the walk (the login round-trip; the full
mobile-menu battery incl. the history close). README (the session-31
row, the gate line, the badge 713, the counts, the playwright-install
line); AGENTS (counts, the plans map's thirty-first round, the E2E
row's install note); CLAUDE (counts, the install note); PAD (the §8.1
test-distribution table, the §12 rows, the counts); SKILL v1.26.0 →
v1.27.0 (frontmatter, §0.5's range 1..31, Appendix A's session-31 row,
Appendix B, the pre-ship checklist counts); the five provenance sites
re-anchored to `1..31`; worklog Task 31; this log; the plan's
post-execution record. The Conventional Commit and the SSH-wrapper
push follow (dry-run first, key shredded after).

## The round (summary)

**Baseline:** the pulled tree (`98912fa`) passed lint 0/0 · tsc 0 ·
unit 644/644 (38 files); census MATCH. neo-crm unchanged (`b3d0fbe`).

**The audit** (three parallel subagents + the lead's hand-verification
and adjudication): **0 Critical / 0 High / 0 Medium / 3 Low / 8 Info.**

**The parity walk (both sides, live): NO DRIFT** — the fifth
consecutive fully-clean walk. The mobile menu verified working as
expected (the full functional battery, incl. the history close); the
reference's bare hamburger and its dead 98-percent panel token the
documented deviations; the oklab/rgba bar-spelling the documented
same-color conversion; the clone's login round-trip verified live.

**The cures:** +4 unit pins + 2 e2e legs — the db-path whitespace
normalization (S31-1 — the one-home trim, the wrong-DB hazard classes
stay closed), the history-close focus return (S31-2 — the third close
arm's WCAG 2.4.3 completion, the state-flag shape the react-hooks/refs
rule demanded — the gate-caught redesign on record), the playwright
browser-install prerequisite (S31-3 — three operator doc sites), the
donor marker (S31-4), the prose-safe /98 + Reveal contract batch
(S31-5 — with the .md-scanner residual accepted on compile evidence),
the generalized dead-import census (S31-6 — the genus guard,
tree-wide, the planted-defect battery on record), the e2e superset
batch (S31-7 — the og dims, the authed /login posture, the
reset-error banner). Every mutation battery on record.

**Verified:** unit **648/648** (38 files) · e2e **65/65** (9 specs) ·
smoke 15/15 · census MATCH · badge 713 · captures 69/70 PIL-verified ·
the cured surfaces live-verified through the walk. Six docs + SKILL
v1.27.0 + the five provenance sites in lockstep.
**Deferred:** the accepted register carried forward (the in-app
delivery default flip — the standing owner-level deferral; the me-route
unthrottled read; the 36px touch targets — the standing parity-doctrine
adjudication; the cross-tab quota staleness; the formatting nits; the
signup admin-bootstrap race — the standing session-27 adjudication;
the Tailwind .md-scanner residual — this round's compile-evidence
acceptance).
