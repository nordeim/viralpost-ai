# Session 23 — The Hamburger-Aria Superset Re-Anchor + The Census Depth + The AA Focus Superset + The Audit Batch (2026-11-11)

The round opened on the pulled tree (`f4ae48c` — the owner's
session_23.md post holding the session-22 transcript handoff, the
established pattern). The core docs read in full (AGENTS, CLAUDE, README,
PAD, SKILL v1.18.0), then the session-22 set (session_22.md, the
session-22 plan, worklog Task 22). This round is session 23. Baseline
gate GREEN at the documented counts (lint 0/0 · tsc 0 · unit 599/599,
37 files); the standing asks re-verified up front (the .env DATABASE_URL
contract with `db/` at the repo root, census MATCH; the vitest +
playwright suites current; the sitemap/robots/manifest/OG family fresh;
`skills/` excluded from every gate). neo-crm re-checked at HEAD
`b3d0fbe` — UNCHANGED since session 12; the recorded decisions stand.

The web-application skill + the skills catalog internalized; the TDD
skill consulted for the loop discipline. Three parallel audit subagents
dispatched (AUDIT-1 API/lib seams, AUDIT-2 components/pages/effects,
AUDIT-3 SEO/configs/tests/docs) while the findings were hand-verified in
source. The audit returned **AUDIT-1: 0C/0H/0M/3L/4I · AUDIT-2:
0C/0H/4L/3I · AUDIT-3: 0C/0H/0M/6L/7I** — combined 0 Critical / 0 High /
0 Medium / 13 Low / 14 Info at the subagent reports. The lead's
hand-verification then UPGRADED one finding: the INTERNAL-envelope-
answers-400 shape (fail()'s default status) on BOTH the contact and the
generate catch arms — a correctness bug the subagent had framed as a
style note on one site — for a working register of **0 Critical / 0
High / 1 Medium / 12 Low / 14 Info.**

The parity walk (live, both sides, logged into the reference) ran the
five-route head census (NO DRIFT — the session-19 description family
holds byte-for-byte), the computed-style control census at desktop +
390×844 (the desktop nav family, the desktop pill, the footer CTA, the
/Pricing CTA trio, the three sRGB brand gradients, the landing heading
tree, the monetization floaters — same color families, live transforms),
the mobile-menu control census (the pill text "Upgrade to Pro – $19" +
the bare pill classes + the bare link family — ALL byte-identical to
the session-22 re-anchors; the reference's revert held), sitemap +
robots (identical, origin-difference only), and the clone's generator
round-trip (green). The clone's menu supersets live-verified: the
Escape-close with focus return, the route-change close, and the
scrolled-panel darkening (session-22's R22-4 cure).

**But the hamburger census found THE REFERENCE REMOVED ITS ARIA FAMILY**
— the button carries ONLY `class="md:hidden p-2 text-slate-300"` in
both the open and closed states (no aria-label, no aria-expanded, no
aria-controls). Session-22's S22-22 capture ("the LIVE reference now
ships this family itself — ours is parity there") was another transient
deploy state; the reference has now flip-flopped twice (absent sessions
1–21, present 22, absent 23). The decision: KEEP our aria family as a
DOCUMENTED SUPERSET — chasing the reference's deploy state would strip
a WCAG 4.1.2 state/label contract the a11y doctrine holds, and the
Escape-close + route-change-close supersets already ride this genus.
The navbar comment + SKILL §8 re-anchored (S23-1).

The session-23 plan written and validated against the codebase (the pin
landscape — a11y-controls' skip-link + aria pins, toast-anatomy's
source pins, the census's constants/loopShapes/forms-guard arms, the
PAD §12 rows), then executed with TDD throughout:

- **R23-8 (the status discipline, the round's correctness cure)**: the
  pin RED first (a census arm asserting no route answers the INTERNAL
  envelope at the 400 default, over every mutating route), then the
  cures — contact → `ERR.INTERNAL()` (the byte-identical sibling
  idiom), generate → the explicit `fail("INTERNAL", …, 500)` (its
  surface message preserved). A server-side DB failure no longer
  answers as a client error.
- **R23-3 (the skip-link target)**: the pin RED first
  (`tabIndex={-1}`), then the attribute (the old pin co-updated).
  Live-verified: the link reveals on focus, and the click lands focus
  ON the main (`activeElement === main`) — the WebKit fragment-target
  gap closed.
- **R23-4 (the toast store)**: the pin RED first (the
  useSyncExternalStore shape + the old useState-seeded form banned),
  then the conversion — a stable `subscribeToasts` over the listeners
  Set, the reference-stable `() => toasts` snapshot, the empty server
  snapshot (the generator-card precedent); the vestigial
  payload-carrying Listener simplified to the bare change signal. The
  missed-update window and the concurrent-rendering tear risk are
  closed.
- **R23-21 (the AA focus superset)**: the pin RED first, then
  `focus-visible:ring-2 focus-visible:ring-teal-600` (≈3.05:1 on
  white — the 1.4.11 floor) on the generator textarea + the contact
  FIELD, keyboard-only, the reference's base classes untouched (the
  S14-6/S15-8/S22-10 genus). Live-verified: the ring renders.
- **R23-10 (the census depth)**: the planted-defect proof FIRST — a
  nested fixture executed green in the runner while the flat census
  could not see it (the badge-drift genus one directory level deeper,
  demonstrated on record); then the recursive scan (the
  `unitTestFiles()` helper, all three flat arms); the fixture removed
  after the proof; the census REDs walked to GREEN through the count
  ladder.
- **R23-13 (the anti-dodge shapes)**: the loopShapes heads cross
  parens now (same-line greedy — a `paths.filter(x)` head no longer
  evades) and `while`/`for await` joined the family; a five-decoy
  battery pinned IN the census (each decoy asserted to match, the
  assertion-only loop asserted invisible — a guard for the guard).
- **R23-14/R23-15 (the SEO body contracts)**: the new
  `tests/seo-surfaces.test.ts` pins the manifest's nine fields + the
  exact key order + the content-type, the sitemap's declaration +
  xmlns + four-route body + LF-only format, and the ROUTES table's
  source shape (the /Home never-listed negative) — the routes'
  "field-for-field" parity claims now carry their pins (the coverage
  gap the audit flagged on both surfaces).
- **R23-5..R23-9 (the hygiene/comment batch)**: the chunk-recovery
  vestigial `?.` retired (the S22-4 guard owns the null face),
  boot-env's `DISABLE_KNOBS` const (both loops consume it — a third
  knob joins in ONE place), db-path's duplicated bun-signature early
  return consolidated into the tail `effectiveDatabaseUrl` call
  (behavior-neutral, the fixture suite green), the iridescence "t=0"
  precision reword, and the hero portrait's "lazy default" false claim
  cured to the eager truth (a plain `<img>` with no `loading`
  attribute is EAGER — the HTML missing-value default; the reference's
  SPA behaves identically, parity holds).
- **R23-11/R23-17/R23-18 (the smoke batch)**: `--max-time 2` on both
  health-wait loops (a wedged server can no longer hang the ladder
  past its `seq` bound), the db:push/db:seed output captured and
  cat-ed on failure (a locked SQLite file now fails with diagnostics,
  not silence), and `server.log` in both artifact-hygiene lists.
- **R23-12/R23-19 (the manifest batch)**: the bun.lock workspace name
  re-anchored from the scaffold's `"activity-map"` (hand-edit + the
  frozen-lockfile dry-run verification — `bun install` reported no
  changes, the name is metadata-only), and `packageManager:
  "bun@1.3.14"` pinned.
- **R23-20 (the /Home 308)**: the e2e test owns the status now — the
  no-redirect request asserts 308 + `Location: /` (the goto family
  kept below; counts unchanged, the S18-2 precedent).
- **R23-22 (the e2e prune)**: `scripts/e2e-prune.ts` + the
  global-setup call — previous runs' probe signups
  (`e2e-<ts>@example.com`) pruned after the seed, scoped to the
  prefix; the demo user's id-stable upsert untouched.
- **R23-16 (the register)**: the stats band's `text-white` over the
  teal gradient recorded in the SANCTIONED register (the reference's
  own design, ≈2.49:1 on the teal-500 half — the adjudication record
  now matches reality).

The count re-anchor: UNIT 599 → 606 (+7 pins), SUITES 37 → 38 (the
new seo-surfaces file), E2E 63 unchanged (the /Home leg extended in
place), badge 662 → 669; the PAD §12 rows (db-path 267, navbar 210,
iridescence 243, smoke 212); the ladder comment's s23 entry. The
docs-counts census walked RED-to-GREEN site by site.

The full gate on the exact commit tree: **lint 0/0 · tsc 0 · unit
606/606 (38 files) · build · smoke 15/15 · e2e 63/63 (9 specs)** ·
census MATCH. Captures 53/54 taken on the dev server (the landing
1280×800 + the OPEN mobile menu 390×844, via `localhost`, hydration
awaited, the menu DOM-confirmed open before the shot), PIL-verified
(53: 99.9% non-white, 75.1% dark hero; 54: 95.2% dark upper-third).
README (the session-23 row, the gate line, the badge 669, the tree
diagram); AGENTS (counts, the plans map's twenty-third round); CLAUDE
(counts); PAD (§12 rows, the tree diagram); SKILL v1.18.0 → v1.19.0
(frontmatter, §8's aria re-anchor, Appendix A's session-23 row);
worklog Task 23; this log; the plan's post-execution record. The
Conventional Commit and the SSH-wrapper push follow (dry-run first,
key shredded after).

## The round (summary)

**Baseline:** the merged tree (`f4ae48c`) passed lint 0/0 · tsc 0 ·
unit 599/599 (37 files); census MATCH. neo-crm unchanged (`b3d0fbe`).

**The audit** (three parallel subagents + the lead's hand-verification,
which upgraded one finding): **0 Critical / 0 High / 1 Medium / 12 Low /
14 Info.**

**The parity walk (both sides, live): ONE DRIFT** — the reference
removed its hamburger aria family (the session-22 "parity" capture was
a transient deploy state; the flip-flop is now twice-observed). Ours
stays as the documented superset; the comments re-anchored to the
truth. Every other surface byte-identical.

**The cures:** +7 unit pins, +1 suite file — the INTERNAL status
discipline (contact + generate), the census depth (the recursive scan +
the planted-defect proof), the anti-dodge decoy battery, the manifest +
sitemap body contracts, the skip-link target focusability, the
focus-visible AA superset on both input surfaces, the toast store on
useSyncExternalStore, and the config/script batch (the bounded smoke
waits, the push diagnostics, the hygiene lists, the lockfile name, the
packageManager pin, the /Home 308 ownership, the e2e prune, the
SANCTIONED register entry, and the comment-truth batch).

**Verified:** unit **606/606** (38 files) · e2e **63/63** (9 specs) ·
smoke 15/15 · census MATCH · badge 669 · captures 53/54 PIL-verified ·
the cured surfaces live-verified (the skip-link focus landing, the
focus ring, the menu family). Six docs + SKILL v1.19.0 in lockstep.
**Deferred:** the honest register carried from session 22 unchanged
(each with its reason) + the session-23 adjudications (the hex-hops
footnote, the detectNiche design, the whitespace AUTH_SECRET
theoretical, the particle resize churn, the manifest icon-size parity,
the lowercase-/home doctrine).
