# Session 43 — The Boot-Gate Trailing-Dot Loopback Cure + The Exhaustive-Depths Register Truth + The README Table Reflow + The Count-Site Census Batch (2026-11-13)

## Context

Session 42 shipped `6e25166` (the boot-gate localhost false-alarm cure, the
subsumed-arm annotations, the toast call-site census, the comment-truth
batch); the owner's narration commit `ad3ec75` followed (session_43.md
carried the round-42 narration — this round replaces it with the formal
log). The standing instruction re-ran end to end: docs review → baseline
gate → the comprehensive audit (three parallel subagents) → the live
reference parity walk → the TDD cures → the gate → captures → push.

**Baseline (the tree at `ad3ec75`, verified in place):** lint 0/0 · tsc 0 ·
unit 686/686 (40 files) · build · smoke 16/16 · e2e 65/65 (9 specs) ·
census MATCH · `.env`'s `DATABASE_URL="file:../db/custom.db"` with `db/` at
the repo root ✓ · the vitest + playwright suites in place and current ✓ ·
the sitemap/robots/manifest/OG family verified live against the reference
in this round's walk ✓ · `skills/` excluded from every gate ✓ ·
`.env.example` present, committed, matching the six-knob contract ✓.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib
seams, AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs —
every load-bearing finding hand-verified in source by the lead, including
a live URL-parse probe that confirmed the trailing-dot family, a live
eslint dry-run that re-counted the exhaustive-deps flags at exactly 3,
and a structural map of the README status-table region):
**AUDIT-1: 0C/0H/0M/1L/2I · AUDIT-2: 0C/0H/0M/1L/2I · AUDIT-3:
0C/0H/0M/2L/3I** — combined **0 Critical / 0 High / 0 Medium / 4 Low /
7 Info**. The session-42 diff itself verified correct and complete on all
three passes (the S42-5/S42-7/S42-3 count and subsumption claims all
re-derived mechanically true); the residuals are pre-existing debt this
round claims.

**The parity walk** (live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`; viewport confirmed 390×844 before every
mobile probe, computed styles as ground truth): **ALL FACES MATCH, NO
DRIFT — the sixteenth consecutive fully-clean walk.** The mobile menu
works as expected (the owner's standing concern): the reference panel
enumerated live (the four nav links — Home's teal `text-teal-400`
rgb(45,212,191) active face, the siblings' `text-slate-300`
rgb(203,213,225) — plus the Gumroad pill "Upgrade to Pro – $19", same
templixco href) and byte-verified against ours; panel mechanics identical
(display block + max-height none; the reference's `bg-slate-900/98`
still computing `rgba(0,0,0,0)` — dead in its own build, the transparent
over-hero posture replicated on our side); the hamburger cursor pointer
both sides (the Tailwind v4 standing concern holding); the reference's
hamburger still ships NO aria family (our expanded
aria-expanded/controls/label is the documented superset); Escape leaves
the reference's panel open (our F11-11 superset — ours verified closing:
panel display none after Escape). The desktop nav byte-identical (brand +
4 links + the Upgrade pill); the five-route head census byte-identical
modulo origin (titles, the unprefixed family on / and /login; the
reference's OG family is client-injected SPA metadata, ours SSR — the
documented superset; the reference leaves og/canonical stale on
client-side nav, also the SPA posture); sitemap 4 URLs both (identical
modulo origin, the changefreq/priority format byte-parity — the route
docbook owns the format contract); robots identical modulo origin
(allow-all + the Sitemap line — the byte-parity posture pinned at three
layers); the generator probe symmetrically dead/live (R no generation
lands — the 402-dead posture, L works — the documented superset); the
login round-trip both landing the landing (R `/Home`, its
duplicate-of-`/` route; L `/` — the documented 308 deviation), the clone
session verified live via /api/auth/me (`sepnetflix2023@outlook.com`,
role admin).

**The neo-crm reference repo re-checked** (the standing instruction):
its latest sessions (its own 216–217, files 455–459) continue the
semantic-prose census genus on its own docs — the same genus this repo
adopted at session-12 and polices every round as its comment-truth
batch; the set-state-in-effect eslint-ERROR claim it verified
empirically is already this repo's documented CLAUDE.md posture —
patterns current, nothing new to adopt.

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S43-1 | **LOW** (AUDIT-1 A1) | `src/lib/boot-env.ts:147-164` (the S42-6 predicate) | The session-42 parsed-hostname cure lost a true-positive family: `new URL("http://localhost.").hostname` keeps the trailing dot, so the FQDN spelling `http://localhost.:3000` (and bare `http://localhost.`) no longer warns — the old substring form caught both. The S42-6 annotation's "Input-equivalent for every true positive" claim is therefore false (and the probe also shows the cure GAINED the `http://LOCALHOST:3000` true positive the case-sensitive regex missed — URL parsing lowercases the host). Warn-only, production-only — but a silent loopback origin in production is exactly the hazard the warning exists for. Cure: dot-strip the parsed hostname (`host.replace(/\.$/, "")`) — restores the trailing-dot family while keeping the false-alarm cure; the annotation re-spelled to name both the restored family and the case gain. +1 RED-first pin; the revert battery on record. |
| S43-2 | **LOW** (AUDIT-2 L1) | `Project_Architecture_Document.md` §11 (the eslint off-switches register row), `src/components/marketing/navbar.tsx:91-95` | The accepted-issues register's evidence base is stale: it claims "a dry run surfaces exactly 2 exhaustive-deps flags, both particle-text.tsx's … both flags at particle-text.tsx:293" — the live dry run (repo config, rule re-warned, whole-tree scope) surfaces exactly **3**: particle-text ×2 (now at `:313` — the cited line drifted) + `navbar.tsx:95` (the S31-2 pathname-keyed focus-return `useLayoutEffect`'s deliberate `menuWasOpen` omission, added AFTER the session-17 re-verification the register cites). The code itself is correct (the effect must fire per-navigation; `menuWasOpen` only ever changes alongside `pathname`), but the omission is annotated nowhere in the file and a future per-file scoping effort scoped from the register would hit an unbudgeted third site. Cure: the register row re-spelled to the 3-flag truth (particle-text ×2 at :313 + the navbar arm named) + the one-line deliberate-omission note beside the navbar effect (the reveal.tsx S31-5b contract-note precedent). |
| S43-3 | **LOW** (AUDIT-3 L1) | `README.md:248-302` (the Project status table region) | The Project status GFM table is fragmented AGAIN: 25 interior blank lines + SIX interleaved per-session gate footers (sessions 26–31, lines 255/260/265/270/275/280) — the table terminates as a table after the session-22 row, and sessions 23–42 (20 of 42 rows) render as header-less prose on GitHub. This is a recurrence of the repo's own S17-2 defect class (repaired once, prescribed "one continuous table + the single post-table gate line"), silently re-accumulated over sessions 23–42. All counts inside the rows are correct — rendering only. Cure: the reflow (every interior blank line removed, the six legacy footers retired — their gate state already lives in the session rows and logs), leaving one continuous table + the single closing footer; the NEW docs-counts table-integrity arm makes the genus mechanically impossible (no non-table line between the header row and the last session row; exactly one `Gate at the session-` line in the file). +1 RED-first pin (RED today against the fragmented region); the re-fragmentation battery on record. |
| S43-4 | **LOW** (AUDIT-3 L2) | `docs/DEPLOYMENT.md:17-18`, `viralpost-ai_SKILL.md:619` (Appendix B) | Two live-tense count sites no census arm owns (the S42-9 genus, two sites deeper): (a) DEPLOYMENT.md's "the 13 API route files (11 verb handlers … plus the two JSON-envelope 404 catch-alls …)" — live-true today (13 `route.ts` files under src/app/api, recursive) with DRIFT PRECEDENT (session-18 re-anchored it from a stale 11); (b) SKILL Appendix B's "The title derivation: 13 unit pins" — live-true today (exactly 13 `it(` arms in tests/route-title.test.ts). Both ship green through a drift (a 14th route file or a 14th route-title pin). Cure: two NEW census arms in docs-counts.test.ts — (a) counts `route.ts` files under `src/app/api` recursively on disk and asserts DEPLOYMENT.md's total derives from it (the verb/catch-all arithmetic rides the same number); (b) counts route-title.test.ts's `it(` arms and asserts Appendix B's phrase derives from it. Both born GREEN against the live truth — the planted-defect batteries are the proof (a 14th route file planted → RED; the SKILL re-spelled to 12 → RED). |
| S43-5 | **INFO→cure** (AUDIT-3 I2) | `tests/docs-counts.test.ts:288-294` (the S42-9a footer pin) | The footer lockstep pin's session label is unpinned: the regex captures `session-(\d+)` but never asserts it — a closing footer left saying "session-42" after the session-43 ship passes while stale-labeled (the unit count is pinned; the label is not). The first-match form is also shadow-prone (mitigated separately by S43-3's exactly-one-footer arm). Cure: the pin hardened in place — last-match anchoring + the session label tied to the SKILL §0.5 range bound (both sites update in the same Batch-4 commit; the tie makes a stale label mechanically impossible). Born GREEN (footer 42 === §0.5 42 today) — the planted-defect battery is the proof (bump the footer session without touching §0.5 → exactly this pin RED). |
| S43-6 | **INFO→cure** (AUDIT-1 A2) | `src/lib/db-path.ts:87,131,144` (`urlForRoot` / `resolveDatabaseUrl`) | A query/fragment-carrying relative `file:` ref bakes the tail into the resolved filename: `resolveDatabaseUrl("file:../db/custom.db?connection_limit=1")` answers `file:<repo>/db/custom.db?connection_limit=1` (live-probed) — the `?`-suffix is Prisma's PostgreSQL grammar, never the SQLite connector's, so the operator gets a junk-suffixed filename the engine cannot open. The S30/S31/S33 wrong-DB normalization genus, one input family deeper. Cure: strip the `?…`/`#…` tail at the one-home boundary (the relative branch's two consumption sites — the validated anchors and the CWD last resort; the absolute/`:memory:` pass-through arms keep their documented pass-through-by-design contract). +1 RED-first pin in db-path.test.ts; the revert battery on record. |

**Accepted/observed register (this round's tail, with reasons):** the
IPv6/`127.0.0.2+` loopback spellings (AUDIT-1 A3 — `[::1]` and the wider
127/8 block never warned in ANY prior form, old or new: parity, not a
regression; the extension is documented here for a future round); the
four zero-external-importer exported types (AUDIT-2 I1 — `ToastVariant`
rides the S41-6 BY-DESIGN kit-face adjudication; `IridescenceProps`,
`ParticleTextProps`, `NavRoute` are the conventional React component API
face — the dead-surface doctrine censuses runtime surface, not type
exports); the three cosmetic formatting nits (AUDIT-2 I2 — hero.tsx's
trailing space, generator-card's double blank, not-found.tsx's
in-function comment placement: no formatter rides the gate, and touching
source-pinned files for cosmetics risks pin churn — the S42-5 affordable-
form precedent); the robots allow-all posture (AUDIT-3 I1 — the audit
brief's "disallows /api/" clause was the mis-statement; the repo's
allow-all body is byte-parity with the reference and pinned at three
layers — seo-surfaces byte pin, e2e leg, smoke leg; the route-file
docbook is the authority); the vitest isolate perf note (AUDIT-3 I3 —
~3.4s/run of worker startup; the file-isolated runner is the conservative
posture and the gate must stay trustworthy over fast); the session-42
plan's compressed "no-lastmod/changefreq posture" phrasing (the sitemap
route's docbook + the seo-surfaces byte pin own the format contract —
changefreq weekly byte-parity, re-verified live both sides this round;
the historical plan is immutable provenance); the standing register
carried forward unchanged.

## The cure set (TDD — every pin RED first or battery-planted, the mutation batteries per the house doctrine)

**Batch 1 — the RED pins:**
- **S43-1a**: `tests/boot-env.test.ts` — inside the session-170
  NEXT_PUBLIC_SITE_URL describe, one pin: production +
  `http://localhost.:3000` (the trailing-dot FQDN spelling) produces the
  localhost warning (the advertised-origin trap). RED now (the parsed
  hostname keeps the dot; no warning fires).
- **S43-6a**: `tests/db-path.test.ts` — inside the resolveDatabaseUrl
  describe, one pin: `file:../db/custom.db?connection_limit=1` resolves
  to a URL containing `/db/custom.db` and carrying NO `?` (the fragment
  spelling `#frag` likewise). RED now (the tail bakes into the filename).
- **S43-3a**: `tests/docs-counts.test.ts` — a new arm: the README
  Project status region (from `## Project status` to `## License`) must
  render as ONE table — every line from the `| Phase` header row through
  the last `| Session` row starts with `|` (no interior blank lines, no
  interleaved prose) — and the whole file carries exactly ONE
  `Gate at the session-` footer line. RED now (25 interior blanks + 7
  footer lines).
- **S43-4a/S43-4b**: the two derive-from-disk census arms (born GREEN
  against the live truth — the batteries below are the proof).

**Batch 2 — the GREEN cures:**
- **S43-1**: the dot-strip in boot-env's siteUrlIsLoopback
  (`host.replace(/\.$/, "")` before the comparisons) + the annotation
  re-spell (the trailing-dot FQDN family restored; the LOCALHOST-case
  gain named — URL parsing lowercases, the old case-sensitive regex
  missed it).
- **S43-6**: the `?`/`#` tail strip at resolveDatabaseUrl's relative
  branch (one `cleanRef` derivation consumed by both the anchor join and
  the CWD last-resort join) + the S43-6 comment.
- **S43-3**: the README reflow — the 25 interior blank lines removed,
  the six legacy gate footers (sessions 26–31) retired, one continuous
  table + the single closing footer.
- **S43-2**: the PAD §11 register row re-spelled (3 flags: particle-text
  ×2 at :313 + the navbar S31-2 arm; the scoping note updated) + the
  one-line deliberate-omission note beside the navbar effect.
- **S43-5**: the S42-9a footer pin hardened in place (last-match
  anchor + the session label tied to the SKILL §0.5 bound).

**Batch 3 — the mutation batteries (planted defect → exactly the
designed pin RED → restore → GREEN):**
- S43-1: revert the dot-strip → exactly the S43-1a pin RED (the two
  standing true-positive pins and the S42-6a false-alarm pin stay GREEN).
- S43-6: revert the tail strip → exactly the S43-6a pin RED.
- S43-3: re-insert one blank line inside the table region → exactly the
  S43-3a arm RED; plant a second `Gate at the session-` line → the
  same arm RED on the footer clause.
- S43-4a: plant a 14th `route.ts` under src/app/api → exactly the
  S43-4a arm RED (14 ≠ the "13 API route files" phrase).
- S43-4b: re-spell SKILL Appendix B's "13 unit pins" to 12 → exactly
  the S43-4b arm RED.
- S43-5: bump the README footer's session label without touching SKILL
  §0.5 → exactly the hardened S42-9a pin RED on the label tie.

**Batch 4 — the docs batch + the count re-anchor (constants FIRST —
the session-29..33 lesson):**
- `tests/docs-counts.test.ts`: the count-ladder comment's session-43
  entry; UNIT 686 → **691** (+1 S43-1a in boot-env, +1 S43-6a in
  db-path, +3 S43-3a/S43-4a/S43-4b in docs-counts), SUITES 40
  unchanged, E2E 65 unchanged, SMOKE 16 unchanged, badge 751 → **756**.
- README: badge 756, the "40 files / 691 tests" rows, the session-43
  status row (appended to the now-continuous table), the re-anchored
  footer ("Gate at the session-43 ship: … unit 691/691 …").
- AGENTS: the counts (691); the plans map's forty-third round.
- CLAUDE: the counts (691).
- PAD: §8.1 table (40 files / 691 tests); §8.3's 686/65/16 → 691/65/16;
  §11's exhaustive-deps register row (the S43-2 cure); §12's affected
  rows re-anchored to the live `wc -l` (navbar, db-path — measured
  post-cure); Last Updated stays 2026-11-13.
- SKILL v1.38.0 → v1.39.0: frontmatter (version, date, project_state),
  §0.5's range 1..42 → 1..43, Appendix A's session-43 row, Appendix
  B's header + counts, the pre-ship checklist counts.
- The ten provenance sites re-anchored `session_1..42` →
  `session_1..43` (.env.example, the five test files, db-path.ts,
  health/route.ts, toast.tsx, SKILL §0.5 — the S30-4 convention; lag 0
  at ship).
- worklog Task 43; `docs/session_43.md` (this round's formal log,
  replacing the owner-carried round-42 narration); this plan's
  post-execution record.

**Batch 5 — the verification + the captures:**
- The full gate on the exact commit tree: lint → typecheck → unit
  691/691 (40 files) → build → smoke 16/16 → e2e 65/65 → census MATCH.
- The parity walk RE-RUN post-cure: the standing faces hold (the
  sixteenth walk's battery), no drift.
- Captures 93/94 on the dev server (the owner-instructed posture, the
  session-29..42 precedent): the mobile-menu open clean-walk at
  390×844 + the landing hero at 1280×800, PIL-verified, under
  `docs/screenshots/`.

**Batch 6 — the commit + the push:**
- Conventional Commit on main: `fix: the boot-gate trailing-dot loopback
  cure + the exhaustive-deps register truth + the README table reflow +
  the count-site census batch (session-43 audit)`;
  `.env.example` rides the commit (tracked, six-knob current, the
  provenance note re-anchored to 1..43).
- Push via `docs/ssh_git_wrapper_v3.py` (the runbook is the
  authority): the Appendix-A shim on PATH, the operator key
  materialized 0600 OUTSIDE the repo (never printed), dry-run first,
  real push, remote ref verified, key + temp material shredded.

## Acceptance criteria

1. The parsed-hostname predicate dot-strips; the trailing-dot spelling
   warns (+1 RED-first pin; the standing true-positive and false-alarm
   pins untouched); the battery on record.
2. The relative `file:` resolution never bakes a `?`/`#` tail into the
   filename (+1 RED-first pin; the absolute/`:memory:` pass-throughs
   untouched); the battery on record.
3. The README status table renders as ONE table (no interior blank
   lines, no interleaved footers, exactly one closing gate line) and a
   census arm owns the shape (+1 RED-first pin); the batteries on
   record.
4. DEPLOYMENT.md's API-route count and SKILL Appendix B's route-title
   pin count both derive from the disk through new census arms (both
   batteries on record).
5. The S42-9a footer pin asserts the session label against the SKILL
   §0.5 bound (the battery on record).
6. The PAD §11 register carries the 3-flag truth and the navbar effect
   carries its deliberate-omission note.
7. Full gate GREEN: lint 0/0 · tsc 0 · unit 691/691 (40 files) ·
   build · smoke 16/16 · e2e 65/65 (9 specs) · census MATCH.
8. The walk re-run: no drift.
9. Captures 93/94 PIL-verified under `docs/screenshots/` (post-cure).
10. Docs lockstep: six documents + worklog + session log + this plan's
    post-execution record, all in the same commit; the constants
    re-anchored FIRST; the ten provenance sites at 1..43 — lag 0 at
    ship.
11. Conventional Commit to main; SSH-wrapper push (dry-run first, key
    shredded after).

## ToDo list (execution order)

- [x] 1. Batch 1: place the RED pins — S43-1a in boot-env.test.ts;
      S43-6a in db-path.test.ts; S43-3a in docs-counts.test.ts; the
      born-GREEN S43-4a/S43-4b census arms
- [x] 2. Verify Batch 1 RED state (exactly the three designed REDs —
      S43-1a, S43-6a, S43-3a — and the two census arms born GREEN; the
      686 existing GREEN)
- [x] 3. Batch 2: S43-1 (the dot-strip + annotation re-spell) + S43-6
      (the tail strip) + S43-3 (the README reflow) — the three REDs
      GREEN
- [x] 4. S43-2 (the PAD register re-spell + the navbar note) + S43-5
      (the footer pin hardening)
- [x] 5. Intermediate gate check (lint/tsc/unit — expect all GREEN)
- [x] 6. Batch 3: the six mutation batteries (S43-1, S43-6, S43-3 ×2,
      S43-4a, S43-4b, S43-5)
- [x] 7. Batch 4: constants FIRST (UNIT 691, badge 756), the census
       doc-site walk RED→GREEN, PAD §11/§12, SKILL v1.39.0, the ten
       provenance sites 1..43, worklog Task 43, README/AGENTS/CLAUDE
       rows, session_43.md, the plan record
- [x] 8. Batch 5: the full gate + the walk re-run + captures 93/94
- [x] 9. Batch 6: commit + SSH-wrapper push (dry-run first, remote
       verified, key shredded)

## Post-execution record

Executed as planned, with the mid-round corrections on record:

- **The unit projection walked +6, not +5**: the plan projected
  UNIT 691 / badge 756 counting the S43-5 label tie as an in-place
  hardening of the S42-9a pin; it shipped as its OWN pin (S43-5a) —
  the unit count and the session label are two contracts, two owners
  (the N12-2 one-owner doctrine). The reality census caught it
  in-round ("it/test blocks on disk: 692 (UNIT says 691)") and the
  constants re-anchored to the disk truth before any doc site was
  touched.
- **All six mutation batteries proved single-tooth**: S43-1 (1 RED /
  48 GREEN), S43-6 (1 RED / 39 GREEN), S43-3 (both forms — the
  re-inserted blank line and the planted second footer each RED
  exactly the table-integrity arm), S43-4a (the planted 14th route
  file), S43-4b (the SKILL re-spelled to 12), S43-5 (the label bump).
- **The README reflow**: 42 rows + the new session-43 row = 43
  contiguous rows, the six legacy footers (sessions 26–31) retired,
  exactly one closing footer; the table-integrity arm born RED
  against the fragmented region and GREEN after the reflow.
- **The provenance re-anchor walked all ten sites** to 1..43 in one
  pass; lag 0 at ship.

**Final state:** lint 0/0 · tsc 0 · unit **692/692** (40 files) ·
build · smoke **16/16** · e2e **65/65** (9 specs) · census MATCH ·
badge **757**. Captures 93/94 PIL-verified on the dev server
(post-cure, the menu functionally verified open before the shot).
Docs lockstep: README + AGENTS + CLAUDE + PAD + SKILL v1.38.0 →
v1.39.0 + the ten provenance sites re-anchored to 1..43 + worklog
Task 43 + docs/session_43.md + this post-execution record. Pushed to
main via the SSH wrapper (dry-run first, key shredded after).
