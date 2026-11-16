# Session 74 Plan — The Query-Pass Reorder + The File-Stray-Quote Residue Face + The SiteUrl Redaction + The Touch-Pause Pointer Gate and The Register Batch

Date: 2026-11-16. Round opens on `15d852d` (session-73's ship + the
session-74 narration push). Baseline gate re-run on the refreshed tree:
lint 0/0 · tsc 0 · unit 804/804 (41 files) · build · smoke 16/16 ·
e2e 71/71 — GREEN, lag 0. `bun audit`: the same 9 dev-toolchain
advisories as sessions 55–73 (none on the runtime request path).
neo-crm pattern reference: UNCHANGED at `b3d0fbe` — recorded decisions
stand.

## The standing asks (each verified this round)

- **`.env` / db-folder contract**: held (`DATABASE_URL="file:../db/custom.db"`,
  `db/` at the repo root, census MATCH, every gate leg green).
- **Vitest + Playwright suites**: configs verified current and wired
  (vitest.config.mts `*.test.ts`-only + skills exclusion + `@` alias;
  playwright setup project + storageState + single-source port +
  pinned `db/e2e.db`).
- **Sitemap + SEO**: verified live in walk #47 (both legs) — sitemap
  4 URLs, robots byte-body, manifest composition; per-route heads
  identical modulo origin.
- **Mobile navigation + Tailwind v4**: walk #47's mobile battery clean
  on both legs at 390×844 (hamburger byte-match + aria superset;
  panel height 265 both legs; Escape close-with-focus-return on the
  clone, R-OPEN on the reference — our superset; outside-tap open on
  both; route-change close). **No Tailwind v4 bug in the mobile menu**
  (AUDIT-2's independent read concurs: hover unwrap, md:hidden
  boundary, @theme literal hex all sound in the compiled sheet).
- **`skills/` exclusion**: verified in tsconfig/eslint/vitest excludes
  and the smoke artifact-hygiene leg; the audit lanes excluded it.

## The audit (three parallel lanes + the lead's hand-verification)

Combined profile: **0 Critical / 0 High / 2 Medium / 4 Low / 9 Info**
(AUDIT-1 API/lib seams 0/0/2/2/2 · AUDIT-2 components/pages/effects
0/0/0/1/4 · AUDIT-3 SEO/configs/tests/docs 0/0/0/1/3). Every
load-bearing finding hand-verified by the lead through the REAL
exported seams before any cure was designed:

- **A1-F1 (M, Verified live)**: a URI-query password carrying a raw
  `@` (`?password=Hunter2@Winter2024!`) leaks its post-`@` tail
  through BOTH file-side printers — the residue printer printed
  `***@Winter2024!`, the inert-value printer `postgresql://***@S3cr3t`
  — because the keyword pass's prefix class has no `?`/`&`, and the
  scheme arm's token `lastIndexOf("@")` lands INSIDE the password,
  consuming the `?password=` trigger the query pass (which runs LAST)
  would have needed. The S71-2b keyword-first reorder closed the
  keyword form; the query form was left with the identical leak.
- **A1-F2 (M, Verified live incl. an engine probe)**: the residue
  predicate (`control char || leading quote`) misses a
  NON-leading quote on a `file:` value — `file:../db/custom.db"`
  (the one-keystroke mirrored typo) parses clean, sails past every
  warning arm, and the engine ACCEPTS it: the live probe resolved it
  to a junk-named `custom.db"` file, created it 0-byte, and SELECT 1
  answered OK — a healthy-looking boot against a table-less DB with
  ZERO [boot] signal (the S57-1 junk-file genus, silent again).
- **A1-F3 (L, Verified live)**: the three NEXT_PUBLIC_SITE_URL shape
  arms print the raw value; the queryCarrying arm explicitly covers
  credentials, so `http://user:secretpw@host` printed the password
  verbatim into the boot log.
- **A2-F1 (L, Reasoned)**: a touch tap on a toast fires the compat
  `mouseenter` and arms the pause; the release rides `mouseleave`,
  which on touch fires only at the NEXT tap elsewhere — the pause is
  unbounded, not "a beat longer" as the S70-4 comment spells it.
- **A3-F1 (L, Verified)**: the working `/signup` superset route is
  missing from the implementation plan's route list and the §6
  Deviations Ledger.
- **A1-F4/F5/F6 (L/Info/Info, Verified)**: comment-truth trio — the
  reset-password header overgeneralizes the token-before-password
  claim; the health-route register comment's "fails client
  CONSTRUCTION" mechanism is false (it fails at the first query,
  caught — better than claimed); `redactCredentials` is referenced as
  a routing target but is module-private.

## The cures (TDD — the pins first, born RED, then the batteries)

- **S74-1**: the query pass moves between the keyword pass and the
  scheme arm in `redactCredentials` (keyword → query → scheme). The
  S71-2b disjointness argument inverts cleanly: the keyword output
  never carries `[?&]password=` (a space is neither `?` nor `&`), and
  the query output never carries a bare `@` for the scheme arm to
  misattribute — every currently-pinned shape is byte-identical (the
  263-line fixture suite is the gate); only the leak shapes change.
- **S74-2**: `dbUrlCarriesResidue` gains the file:-scoped stray-quote
  arm (`startsWith("file:") && (includes('"') || includes("'"))` —
  NEVER a blanket includes: libpq's sanctioned quoted keyword
  containers are clean values carrying quotes); the file-residue
  printer gains the stray-quote face with the junk-file mechanism
  (the live probe above), split from the leading-quote unclosed-quote
  face (the P2021-vs-initialization-error split mirrors the S60-1
  control-char mechanism split).
- **S74-3**: the three siteUrl shape arms print through
  `redactCredentials` (the shape stays visible; the userinfo segment
  never prints — the S63-2 doctrine applied to the family's one
  unredacted printer).
- **S74-4**: the toast's pause arm switches `onMouseEnter` →
  `onPointerEnter` gated `e.pointerType === "mouse"` (the mouse path
  is behaviorally identical — pointerenter fires at the same boundary
  crossing with the same enter semantics; the touch path stops arming
  the pause). The S72-4b e2e leg (real Playwright mouse) owns the
  mouse path; the toast-anatomy source pins update in-commit.
- **S74-5**: the `/signup` ledger row + §2 route-list entry.
- **S74-6**: the comment-truth respells (reset-password header,
  health-route register mechanism, redactCredentials seam wording).

## The lockstep

SKILL version bump → v1.70.0 (frontmatter, §0.5 range, Appendix-A
session-74 row, Appendix-B re-cert, pre-ship checklist), README
badge/counts (804→810 with the six new pins), AGENTS/CLAUDE/PAD counts
in the same commit, the formal `docs/session_75.md`, the plan's
post-execution record, worklog Task 75, `.env.example` provenance
re-anchor (1..75).

## The ship

Captures 155/156 (fresh dev-server boot, mobile menu open at 390×844 +
landing at 1440×900, PIL-verified), full gate GREEN, census MATCH,
Conventional Commit on `main`, push via the SSH wrapper, key shredded.

## The post-execution record (the plan vs the execution)

- S74-1..S74-6 executed exactly as planned; the pin count held at
  +4 (S74-1a/2a/3a in boot-env.test.ts, S74-4a in
  toast-anatomy.test.ts — the hover-pause seam pin re-anchored to
  the leave-guard-only face per the one-face-one-pin doctrine).
- The S74-1a pin's process-env face (face 4) was designed with a
  trailing tab and corrected at birth to `\x01` — the S69-4 trim
  consumes edge whitespace, so the trailing-tab residue never
  reached the arm (the designed face would have been vacuous on
  arrival; the corrected face REDs as designed).
- The round opened as "session-75" in the working plan and was
  renumbered to session-74 at the lockstep: the numbering machinery
  decided it — the plans map is 1:1 with plan files (74 on disk
  with this round's, no session-74 file existed because the
  round-73 continuation conversation completed the existing
  session-73 plan without a new one), and the owner's narration
  window (`docs/session_74.md`, pushed at `15d852d`) is the
  round-73 working narration this formal log replaces at ship.
- The battery's ANSI parse bug (phantom GREENs on the first two
  runs) and the mid-round `git checkout` mishap (the boot-env cures
  re-applied verbatim, full suite + battery re-run GREEN) are both
  on record in the formal log's battery section.
- Counts at ship: 808/41 + 71/9 + 16, badge 879, provenance
  1..74 uniform, SKILL v1.70.0, captures 155/156.
