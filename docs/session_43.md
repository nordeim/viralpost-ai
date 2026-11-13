# Session 43 — The Boot-Gate Trailing-Dot Loopback Cure + The Exhaustive-Depths Register Truth + The README Table Reflow + The Count-Site Census Batch (2026-11-13)

The round opened on the shipped tree (`6e25166` — session-42's commit;
the owner's narration commit `ad3ec75` followed, carrying session_43.md
as the round-42 narration — replaced now by this round's formal log).
The core docs read in full (AGENTS, CLAUDE, README, PAD, SKILL
v1.38.0), then the session-42 set (session_42.md, the session-42 plan,
worklog Task 42, the owner narration). This round is session 43.
Baseline gate GREEN at the documented counts (lint 0/0 · tsc 0 · unit
686/686, 40 files · build · smoke 16/16 · e2e 65/65, 9 specs · census
MATCH); the standing asks re-verified up front (the `.env`
`DATABASE_URL="file:../db/custom.db"` contract with `db/` at the repo
root; the vitest + playwright suites in place and current; the
sitemap/robots/manifest/OG family verified live against the reference
in this round's walk; `skills/` excluded from every gate; the
committed `.env.example` matching the six-knob contract).

The web-application skill + the skills catalog internalized; tdd,
clone-app-pat-pro, and the agent-browser doctrine (computed styles as
ground truth, never eyeballs) applied throughout. The neo-crm
reference repo re-checked for pattern currency per the standing
instruction (its latest sessions — its own 216–217, the files at
455–459 — continue the semantic-prose census genus on its own docs,
the genus this repo adopted at session-12 and polices as its
comment-truth batches; its empirical set-state-in-effect eslint-ERROR
verification is already this repo's documented CLAUDE.md posture;
patterns current, nothing new to adopt).

## The audit

Three parallel dispatched subagents (AUDIT-1 API/lib seams, AUDIT-2
components/pages/effects, AUDIT-3 SEO/configs/tests/docs — every
load-bearing finding hand-verified in source by the lead: a live
URL-parse probe that confirmed the trailing-dot loopback family the
S42-6 predicate lost (and the LOCALHOST-case gain it made), a live
eslint dry-run that re-counted the exhaustive-deps flags at exactly
**3** (the PAD register claimed 2 at a line that drifted), and a
structural map of the README status-table region that found the
S17-2 fragmentation genus re-accumulated): **AUDIT-1: 0C/0H/0M/1L/2I
· AUDIT-2: 0C/0H/0M/1L/2I · AUDIT-3: 0C/0H/0M/2L/3I** — combined
**0 Critical / 0 High / 0 Medium / 4 Low / 7 Info**. The session-42
diff itself verified correct and complete on all three passes (the
S42-5 ok()/ERR.RATE_LIMITED() call-site counts, the S42-3 subsumption
annotations, the S42-7 toast census — all re-derived mechanically
true); the residuals are pre-existing debt this round claims.

## The parity walk

Live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`, viewport confirmed 390×844 before every
mobile probe, computed styles as ground truth. **ALL FACES MATCH, NO
DRIFT — the sixteenth consecutive fully-clean walk.** The mobile menu
works as expected (the owner's standing concern): the reference panel
enumerated live (the four nav links — Home's teal `text-teal-400`
rgb(45,212,191) active face, the siblings' `text-slate-300`
rgb(203,213,225) — plus the Gumroad pill "Upgrade to Pro – $19", the
same templixco href) and byte-verified against ours; panel mechanics
identical both sides (display block + max-height none; the reference's
`bg-slate-900/98` still computing `rgba(0,0,0,0)` — dead in its own
build, the transparent-over-hero posture replicated); the hamburger
cursor pointer both sides (the Tailwind v4 standing concern holding);
the reference's hamburger still ships NO aria family (our expanded
aria-expanded/controls/label is the documented superset); Escape
leaves the reference's panel open (our F11-11 superset — ours verified
closing: panel display none after Escape). The desktop nav
byte-identical (brand + 4 links + the Upgrade pill); the five-route
head census byte-identical modulo origin (titles, og:title, canonicals;
the unprefixed family on / and /login; the reference's OG family is
client-injected SPA metadata — ours SSR-correct, the documented
superset; the reference leaves og/canonical stale on client-side nav,
also its SPA posture); sitemap 4 URLs both (identical modulo origin —
the changefreq/priority format byte-parity, re-verified live both
sides); robots identical modulo origin (allow-all + the Sitemap line
— byte-parity pinned at three layers); the generator probe
symmetrically dead/live (R: no generation lands — the 402-dead
posture; L works — the documented superset); the login round-trip both
landing the landing (R `/Home`, its duplicate-of-`/` route; L `/` —
the documented 308 deviation), the clone session verified live via
/api/auth/me (`sepnetflix2023@outlook.com`, role admin).

## The cures (TDD — every pin RED first or battery-planted, the mutation batteries per the house doctrine)

- **S43-1 (LOW, AUDIT-1 A1)** — the boot-gate trailing-dot loopback
  cure: the S42-6 parsed-hostname predicate went SILENT on the FQDN
  spelling — `new URL("http://localhost.:3000").hostname` keeps the
  trailing dot (`"localhost."`), so the equality test failed where
  the old substring form warned (live-probed: old true / new false).
  The dot-strip (`hostname.replace(/\.$/, "")`) restores the family
  while keeping the false-alarm cure; the annotation re-spelled to
  name both the restored family AND the cure's gain (URL parsing
  lowercases the host, so `http://LOCALHOST:3000` now warns — the old
  case-sensitive regex missed it). +1 RED-first pin; the revert
  battery on record (exactly the one pin RED, 48 GREEN).
- **S43-6 (INFO→cure, AUDIT-1 A2)** — the db-path query-tail cure: a
  `?query`/`#fragment` tail on a relative `file:` ref baked into the
  resolved FILENAME at both consumption sites (live-probed:
  `file:../db/custom.db?connection_limit=1` answered
  `<repo>/db/custom.db?connection_limit=1`) — the `?params` grammar
  is Prisma's PostgreSQL connector's, never the SQLite connector's.
  Stripped at the one-home boundary; the absolute/`:memory:`
  pass-through arms keep their documented pass-through-by-design
  contract. +1 RED-first pin; the revert battery on record (1 RED /
  39 GREEN).
- **S43-3 (LOW, AUDIT-3 L1)** — the README table reflow: the Project
  status GFM table was fragmented AGAIN — 25 interior blank lines +
  six interleaved per-session gate footers (sessions 26–31), the
  table terminating as a table after the session-22 row, sessions
  23–42 rendering as header-less prose on GitHub — the repo's own
  S17-2 defect class (repaired once, prescribed "one continuous table
  + the single post-table gate line"), silently re-accumulated. The
  reflow: one continuous 43-row table + the single closing footer
  (the six legacy footers retired — their gate state lives in the
  session rows and logs); the NEW table-integrity census arm keeps it
  retired (no non-table line between the header row and the last
  session row; exactly one gate footer in the file). +1 RED-first
  pin; BOTH re-fragmentation batteries on record (the re-inserted
  blank line REDs; the planted second footer REDs).
- **S43-2 (LOW, AUDIT-2 L1)** — the exhaustive-deps register truth:
  the PAD §11 accepted-register row claimed "a dry run surfaces
  exactly 2 exhaustive-deps flags, both particle-text.tsx:293" for 26
  sessions while the live dry-run counts exactly 3 — particle-text ×2
  (at `:313`, the cited line drifted) + `navbar.tsx:95` (the S31-2
  pathname-keyed focus-return arm's deliberate `menuWasOpen`
  omission, added after the session-17 re-verification the register
  cited). The register re-spelled to the 3-flag truth + the navbar
  effect carries its deliberate-omission note (the reveal.tsx
  S31-5b contract-note precedent).
- **S43-4 (LOW, AUDIT-3 L2)** — the count-site census batch: the two
  unpinned live-tense count sites join the disk-derived family —
  DEPLOYMENT.md's "the 13 API route files (11 verb handlers … plus
  the two JSON-envelope 404 catch-alls)" (drift precedent:
  session-18's stale 11) and SKILL Appendix B's "The title
  derivation: 13 unit pins" (exactly 13 `it(` arms on disk). Two NEW
  census arms derive both from the disk; both planted-defect
  batteries on record (a planted 14th route file REDs the first; the
  SKILL re-spelled to 12 REDs the second).
- **S43-5 (INFO→cure, AUDIT-3 I2)** — the footer session-label
  lockstep pin: the S42-9a footer pin asserted the unit count but
  never the session label — a closing footer left saying
  "session-42" after the session-43 ship passed while stale-labeled.
  The label is now tied to the SKILL §0.5 range bound through its
  OWN pin (the unit count and the session label are two contracts,
  two owners — the N12-2 one-owner doctrine; this is also why the
  round's unit projection walked +6 rather than the planned +5: the
  label tie shipped as a new pin, not an in-place edit). Born GREEN
  at 42 === 42; the label-bump battery on record (exactly the one
  pin RED).

**Accepted/observed register (this round's tail, with reasons):** the
IPv6/`127.0.0.2+` loopback spellings (AUDIT-1 A3 — `[::1]` and the
wider 127/8 block never warned in ANY prior form, old or new: parity,
not a regression; the extension is documented for a future round);
the four zero-external-importer exported types (AUDIT-2 I1 —
`ToastVariant` rides the S41-6 BY-DESIGN kit-face adjudication;
`IridescenceProps`, `ParticleTextProps`, `NavRoute` are the
conventional React component API face — the dead-surface doctrine
censuses runtime surface, not type exports); the three cosmetic
formatting nits (AUDIT-2 I2 — no formatter rides the gate, and
touching source-pinned files for cosmetics risks pin churn); the
robots allow-all posture (AUDIT-3 I1 — the audit brief's "disallows
/api/" clause was the mis-statement; the repo's allow-all body is
byte-parity with the reference and pinned at three layers); the
vitest isolate perf note (AUDIT-3 I3 — ~3.4s/run of worker startup;
the file-isolated runner is the conservative posture, trustworthy
over fast); the session-42 plan's compressed "no-lastmod/changefreq
posture" phrasing (the sitemap route's docbook + the seo-surfaces
byte pin own the format contract — changefreq weekly byte-parity,
re-verified live both sides this round; the historical plan is
immutable provenance).

## The count re-anchor

UNIT 686 → **692** (+1 the S43-1a trailing-dot pin in boot-env; +1
the S43-6a query-tail pin in db-path; +4 in docs-counts — the S43-3a
table-integrity arm, the S43-4a API-route census, the S43-4b
route-title-pins census, the S43-5a footer-label pin), SUITES 40
unchanged, E2E 65 unchanged, SMOKE 16 unchanged, badge 751 → **757**.
The plan projected 691/756 — the reality census corrected it to
692/757 in-round (the S43-5 label tie shipped as its own pin per the
one-owner doctrine); constants re-anchored FIRST; the census walked
the doc sites RED→GREEN (PAD §12: db-path 349→362, navbar 260→265;
the S43-2/S43-6 comment blocks carried the growth); the ten
provenance sites re-anchored to 1..43 — lag 0 at ship.

## Verified

- The full gate on the exact commit tree (below)
- The six mutation batteries on record: S43-1 (the dot-strip reverted
  → exactly the one pin RED, 48 GREEN), S43-6 (the tail strip
  reverted → exactly the one pin RED, 39 GREEN), S43-3 (the
  re-inserted blank line → exactly the table-integrity arm RED; the
  planted second footer → the same arm RED on the footer clause),
  S43-4a (the planted 14th route file → exactly the API-route census
  RED), S43-4b (the SKILL re-spelled to 12 → exactly the
  route-title-pins census RED), S43-5 (the footer label bumped
  without the SKILL §0.5 bound → exactly the label-tie pin RED)
- The parity walk post-cure: all faces hold, the superset faces
  adjudicated as documented — no drift
- Captures 93/94 on the dev server (the owner-instructed posture, the
  session-29..42 precedent): the mobile-menu open clean-walk at
  390×844 + the landing hero at 1280×800, PIL-verified
- Docs lockstep: README (badge 757, the 40/692 rows, the session-43
  row on the reflowed continuous table, the re-anchored footer);
  AGENTS (counts, the plans map's forty-third round); CLAUDE (counts);
  PAD (§8.1 40/692, §8.3 692/65/16, §11's exhaustive-deps register
  row, §12 rows); SKILL v1.38.0 → v1.39.0 (frontmatter, §0.5 1..43,
  Appendix A's session-43 row, Appendix B's header + counts, the
  pre-ship checklist); worklog Task 43; this session log; the plan's
  post-execution record

**Gate at the session-43 ship: lint 0/0 · tsc 0 · unit 692/692 (40
files) · build · smoke 16/16 · e2e 65/65 (9 specs) · census MATCH.**
