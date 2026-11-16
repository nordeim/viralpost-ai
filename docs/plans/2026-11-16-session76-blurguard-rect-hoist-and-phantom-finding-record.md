# Session 76 Plan — The Blur-Guard Rect Hoist + The Phantom-Finding Record

Date: 2026-11-16. Round opens on `873499c` (session-75's ship `de344f1` +
the owner's narration push carrying `docs/session_76.md` as this round's
working narration; the formal log replaces its content at ship). Baseline
gate re-run on the refreshed tree: lint 0/0 · tsc 0 · unit 813/813
(41 files) · build · smoke 16/16 · e2e 71/71 — GREEN, lag 0. `bun audit`:
the same 9 dev-toolchain advisories as sessions 55–75 (3H/5M/1L — none on
the runtime request path). neo-crm pattern reference: UNCHANGED at
`b3d0fbe` — recorded decisions stand.

## The standing asks (each verified this round)

- **`.env` / db-folder contract**: held (`DATABASE_URL="file:../db/custom.db"`
  copied from `.env.example`, `db/` at the repo root, `db:push` + `db:seed`
  + census MATCH — 1 user, 0 contact messages; the ambient-shell
  `DATABASE_URL` pollution (`file:/home/z/my-project/db/custom.db` in this
  sandbox) neutralized with `env -u DATABASE_URL` on every DB-touching
  command, the S63..S75 hazard still present in this shell).
- **Vitest + Playwright suites**: configs verified current and wired
  (vitest `*.test.ts`-only + skills exclusion + `@` alias; playwright
  setup project + storageState + single-source port + pinned `db/e2e.db`;
  the one-time `bunx playwright install chromium` re-run this round after
  the sandbox reset removed the browser binary).
- **Sitemap + SEO**: verified live in walk #49 (both legs) — sitemap 4
  URLs byte-format identical modulo origin, robots byte-body, manifest
  composition, the three security headers on the SEO family (the S75-6
  e2e arm's loop).
- **Mobile navigation + Tailwind v4**: walk #49's mobile battery clean on
  both legs at 390×844 (hamburger byte-match + aria superset; panel at the
  byte-equal 265px; Escape close-with-focus-return on the clone vs R-OPEN
  on the reference — our superset; outside-tap both-open; route-change
  hidden-in-DOM vs the reference's SPA unmount — the documented pair).
  The COMPILED sheet re-verified independently this round: ZERO
  `(hover: hover)` media wraps (the `@custom-variant hover` unwrap is
  live), the button-cursor base rule live, `md\:hidden{display:none}`
  inside `@media (min-width:48rem)` — **no Tailwind v4 bug in the mobile
  menu** at the source, sheet, or live-DOM level.
- **`skills/` exclusion**: verified in the tsconfig/eslint/vitest excludes
  and the smoke artifact-hygiene leg; the audit read no `skills/` file as
  code.

## The audit (direct lead reads — the AUDIT-1 subagent lane returned
corrupted output this round, so the lead performed the lane reads
directly)

Combined profile: **0 Critical / 0 High / 0 Medium / 1 Low / 2 Info**
(boot-env.ts read IN FULL — the S75-1/2/3 cures verified at their exact
sites; toast.tsx read IN FULL — the S75-5 compound guard verified;
navbar.tsx read IN FULL; login-card.tsx read at the S75-4 sites; the
S75 pins located in boot-env/login-views/toast-anatomy/seo.spec; the
db-path/health S75 one-liners diffed; the hazard sweep ran — direct
DATABASE_URL reads confined to db-path.ts, no secrets in logs, the
S51-2 mounted-gate doctrine consistent across generator-card /
contact-form / login-card, reset-password-screen carries no
async-continuation navigation (its router.push arms are click handlers —
clean)).

- **A1-F1 — RETRACTED (the phantom-finding record)**: the round's first
  candidate finding — "the health route's catch log prefix reads
  `ealth]` instead of `[health]`" — was an ARTIFACT of THIS SESSION's
  tool-output channel, not a codebase defect. The diagnosis trail (kept
  for the record): rg/grep printed the source line as
  `console.error("ealth] db probe failed:", error)`, the pin line as
  asserting the same — but `od -c` on the exact lines showed BOTH carry
  the correct `"[health] db probe failed:"` spelling, and a printf probe
  of the channel itself reproduced the corruption mechanically
  (`printf 'A=[health]' renders as `A=ealth]`; `[home]`→`ome]`,
  `[help]`→`elp]`, `[hook]`→`ook]`, `xx[hy]yy`→`xxy]yy`, while `[H]`
  and `[boot]` survive): the Bash stdout rendering STRIPS the literal
  `[h` sequence. The session-74 battery's own lesson (phantom results
  from the unstripped control sequences — "the first two runs reported
  phantom GREENs until the ANSI strip went in") realized one session
  later, on the lead's own diagnostics: every `[h`-carrying string read
  through Bash stdout this session was suspect, and the Read tool +
  `od -c` were the authoritative readers (the Appendix-B #3 doctrine:
  authoritative machine-readable diagnostics beat a wall of possibly
  corrupt text). The health source and the S63-3 pin are both CORRECT;
  no cure ships for this.
- **A2-F1 (L, Verified-code via the Read tool)**:
  `src/components/ui/toast.tsx:369-381` — the S75-5 blur guard calls
  `root.getBoundingClientRect()` FOUR times in its compound condition
  (left/right/top/bottom), while the mount probe it mirrors
  (`toast.tsx:237-243`) hoists ONE `const r =
  root.getBoundingClientRect()` and reads its four fields. Four
  consecutive reads in one task hit the same layout, so the runtime
  cost is negligible — the finding is the IDIOM DRIFT the file itself
  establishes (the mount probe's hoisted form is the house spelling;
  the blur guard's inline form re-resolves the rect per comparison and
  would drift if a field comparison ever moved between reads).
- **Registered postures re-confirmed, NOT defects**: the stray-quote
  arm's interior-quote-on-relative-value face (the S75-3 post-execution
  record's deliberate posture); the same-family gradients' oklab
  interpolation (sub-threshold by doctrine — the CTA's hue-crossing
  gradient is the inline-style byte-identical one, re-verified live on
  both legs); the login-card fetches' no-AbortController posture (the
  ALWAYS-settles doctrine — the toast error arms own the failure face);
  the sandbox's background-server reaping (the single-script battery
  doctrine, applied for the CLONE leg); the S75-1..S75-7 cures at
  every site; the sub-AA contrast family, the toast double live
  regions, the lint off-list, and the manifest e2e looseness (the
  standing registered set).

## The cure (TDD — the re-anchored pin born RED first, then the battery)

- **S76-1**: the blur-guard rect hoist. The S75-5a pin re-anchors to the
  hoisted spelling FIRST (the regex's four inline
  `root.getBoundingClientRect()` comparisons become the `rect.` field
  reads over one hoisted const) — born RED against the current inline
  source — then the source cures (hoist `const rect =
  root.getBoundingClientRect();` after the null guard, read
  `rect.left/right/top/bottom`; the S75-5 comment's "the same four
  comparisons the mount probe runs" tail respells to name the hoisted
  one-read form). The plant battery: revert the hoist alone → exactly
  the re-anchored pin REDs.

## The lockstep

Counts HOLD (the cure is an in-place pin re-anchor, +0 new `it()`
blocks): UNIT 813 / SUITES 41 / E2E 71 / E2E_SPECS 9 / SMOKE 16 /
BADGE 884 — the docs-counts s76 rung records the hold. SKILL version
bump → v1.72.0 (frontmatter, §0.5 range, Appendix-A session-76 row,
pre-ship checklist), the provenance sites 1..75 → 1..76, README's
session-76 row, AGENTS's plans-map seventy-sixth round, CLAUDE/PAD count
sites hold (no count change), PAD header date, worklog Task 76, the
formal `docs/session_76.md` (replacing the owner's narration window),
this plan's post-execution record.

## The ship

Captures (the walk's fresh boot for the evidence trail): 159 (the
mobile menu open at 390×844 on /Pricing — the dark superset panel over
a light page) and 160 (the landing hero at 1440×900) — both saved this
round during walk #49's CLONE leg, PIL-verified at ship. Full gate
GREEN, census MATCH, Conventional Commit on `main`, push via the SSH
wrapper, key shredded.

## The post-execution record (the plan vs the execution)

- The plan's first draft carried TWO cures (a health-log prefix repair
  + the rect hoist); the VALIDATE phase retracted the first live:
  the "typo" was an artifact of the session's own tool-output channel
  (the Bash stdout rendering strips the literal `[h` sequence —
  printf-probed; `od -c` + the Read tool showed both the source and
  the S63-3 pin carry the correct `[health]` spelling). The plan was
  re-anchored to the one-cure scope BEFORE implementation; the
  retraction trail is preserved in the plan body (the
  phantom-finding record) and the session log. The Appendix-B #3
  doctrine (authoritative machine-readable diagnostics) gained a
  concrete new precedent: `[h`-carrying strings read through Bash
  stdout are suspect; the Read tool and `od -c` are the authoritative
  readers.
- S76-1 executed exactly as planned: the S75-5a pin re-anchored to
  the hoisted spelling FIRST (born RED: exactly 1 failed / 24 passed
  — the pin, no collateral), the source hoist applied (one
  `const rect = root.getBoundingClientRect();` after the `:hover`
  guard, four field reads), GREEN 25/25, and the deterministic
  plant battery (the inline four-call form restored alone) REDed
  exactly the re-anchored pin before the restore.
- Counts at ship: 813/41 + 71/9 + 16, badge 884 — ALL HELD (the
  in-place re-anchor form, +0 new its; the docs-counts s76 rung
  records the hold). The ten provenance sites set 1..75 → 1..76
  uniform (lag 0). SKILL v1.72.0. Captures 159/160.
- The parity walk's CLONE leg ran as ONE single script (boot server +
  drive browser + teardown) — the sandbox's background-server reaping
  between bash invocations re-confirmed; the script lives at
  /home/z/my-project/scripts/clone-walk-76.sh (session scratch,
  outside the repo).
