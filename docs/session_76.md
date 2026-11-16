# Session 76 — The Blur-Guard Rect Hoist + The Phantom-Finding Record

**Round:** session-76 (the standing work order executed as the
seventy-sixth round). Opens on `873499c` (session-75's ship `de344f1` +
the owner's narration push carrying this file as the round's working
narration; this formal log replaces that content at ship).

**Continuity state:** the previous conversation delivered session-75
(commit `de344f1` + the narration push `544f724`); this round re-executed
the standing work order fresh.

## The baseline (Verified)

Gate GREEN on the refreshed tree: lint 0/0 · tsc 0 · unit 813/813
(41 files) · build · smoke 16/16 · e2e 71/71 (9 specs) · census MATCH —
lag 0. The one-time `bunx playwright install chromium` re-ran after the
sandbox reset removed the browser binary (the documented prerequisite).
`bun audit`: the same 9 dev-toolchain advisories as sessions 55–75 (none
on the runtime request path). neo-crm UNCHANGED at `b3d0fbe` — recorded
decisions stand.

## The standing asks (each Verified this round)

- `.env` `DATABASE_URL="file:../db/custom.db"` contract held; `db/` at
  the repo root; push + seed + census MATCH (1 user, 0 contact
  messages); the ambient-shell `DATABASE_URL` pollution neutralized with
  `env -u DATABASE_URL` on every DB-touching command.
- Vitest + Playwright suites verified current and wired.
- Sitemap (4 URLs) + robots (byte-body) + manifest + the three security
  headers on the SEO family verified live in walk #49.
- `skills/` excluded from tsconfig/eslint/vitest + the smoke
  artifact-hygiene leg.
- Mobile navigation + Tailwind v4: walk #49's battery clean on both
  legs; the compiled sheet independently re-verified (zero
  `(hover: hover)` wraps — the `@custom-variant hover` unwrap live; the
  `button,[role="button"]{cursor:pointer}` base rule live; the `md`
  boundary at `min-width:48rem`). **No Tailwind v4 bug in the mobile
  menu.**

## The audit (0 Critical / 0 High / 0 Medium / 1 Low / 2 Info)

Direct lead reads — the AUDIT-1 subagent lane returned corrupted output
this round, so the lead performed the lane reads directly: boot-env.ts
IN FULL (the S75-1/2/3 cures verified at their exact sites), toast.tsx
IN FULL (the S75-5 compound guard), navbar.tsx IN FULL, login-card.tsx
at the S75-4 sites, the S75 pins located in all four suites, the
db-path/health S75 one-liners diffed, the hazard sweep clean (direct
DATABASE_URL reads confined to db-path.ts; no secrets in logs; the
S51-2 mounted-gate doctrine consistent across generator-card /
contact-form / login-card; reset-password-screen carries no
async-continuation navigation — its router.push arms are click
handlers).

**The phantom-finding record (the round's diagnostic lesson):** the
audit's first candidate finding — "the health route's catch log prefix
reads `ealth]` instead of `[health]`" — was an artifact of the session's
own tool-output channel, not a codebase defect. The diagnosis trail:
rg/grep printed both the source line and the session-63 S63-3 pin line
missing the `[h`; `od -c` on the exact lines showed BOTH carry the
correct `"[health] db probe failed:"` spelling; a printf probe of the
channel reproduced the corruption mechanically (`A=[health]` renders
`A=ealth]`; `[home]`→`ome]`, `[help]`→`elp]`, `[hook]`→`ook]`,
`xx[hy]yy`→`xxy]yy`; `[H]` and `[boot]` survive) — the Bash stdout
rendering strips the literal `[h` sequence. The finding RETRACTED; no
cure shipped; the lesson registered: every `[h`-carrying string read
through Bash stdout is suspect — the Read tool and `od -c` are the
authoritative readers (the Appendix-B #3 doctrine: authoritative
machine-readable diagnostics beat a possibly-corrupt wall of text; the
session-74 phantom-GREEN lesson — unstripped control sequences reporting
phantom results — realized one session later on the lead's own
diagnostics).

**The one live finding (A2-F1, Low, code-verified via the Read tool):**
the toast's S75-5 blur guard called `root.getBoundingClientRect()`
inline FOUR times (one per field comparison) while the mount probe it
mirrors hoists ONE const and reads its four fields — the mount probe's
hoisted form is the house idiom; the inline form re-resolved the rect
per comparison (an idiom drift, not a behavior change: consecutive
reads in one task hit the same layout).

## The cure (TDD — the re-anchored pin born RED first)

**S76-1 — the blur-guard rect hoist.** The S75-5a source pin in
tests/toast-anatomy.test.ts re-anchored FIRST to the hoisted spelling —
born RED against the current inline source (exactly 1 failed / 24
passed) — then the toast.tsx onBlur guard hoisted its rect
(`const rect = root.getBoundingClientRect();` after the `:hover` guard;
four field reads over the one rect), GREEN (25/25). The plant battery:
the hoist-revert plant (the inline four-call form restored) REDs
exactly the re-anchored pin; restore GREEN. **BATTERY: PASS (1/1).**

## Parity walk #49 — clean (the forty-ninth consecutive)

Both legs at every documented posture:

- **REF leg** (390×844): hamburger `md:hidden p-2 text-slate-300` with
  no aria family (our documented superset); panel at 265px with the
  reference's classes; Escape stays OPEN (R-OPEN); outside-tap stays
  OPEN (R-OPEN); route-change unmounts the panel; desktop CTA gradient
  `linear-gradient(to right, rgb(45, 212, 191), rgb(251, 191, 36))`;
  sitemap/robots byte-format; the generator DEAD at the 30s probe (the
  D-1 silent-rest face, 0 hashtag nodes).
- **CLONE leg** (the production standalone build, one single script —
  boot + drive browser + teardown — after the sandbox's
  background-server reaping was re-confirmed between invocations):
  hamburger byte-match + the aria superset (label/expanded/controls);
  panel at the byte-equal 265px; Escape CLOSES with focus returned to
  the toggle (our superset); outside-tap stays OPEN (parity); route
  -change hidden-in-DOM (the documented pair vs the reference's SPA
  unmount); the CTA gradient byte-identical; the same-family gradients'
  oklab delta sub-threshold (the documented doctrine); the generator
  LIVE with a hashtag node at the 8s probe; screenshots 159 (mobile
  menu open on /Pricing) and 160 (landing hero) captured.

No Tailwind v4 bug in the mobile menu — verified at the source, the
compiled sheet, and the live DOM on both legs.

## The lockstep

Counts HELD (the round's one cure is an in-place pin re-anchor, +0 new
`it()` blocks): UNIT 813 / SUITES 41 / E2E 71 / E2E_SPECS 9 / SMOKE 16
/ BADGE 884. The ten provenance sites set `1..75` → `1..76` uniform;
the docs-counts s76 rung; PAD header date; README's session-76 row +
gate footer; AGENTS's plans-map seventy-sixth round; SKILL v1.71.0 →
v1.72.0 + the Appendix-A session-76 row + the Appendix-B re-cert
through 76; worklog Task 76; this formal log; the plan's post-execution
record.

## The ship

Full gate GREEN on the final tree; census MATCH; captures 159/160;
`.env.example` verified matching the codebase (included in the commit);
Conventional Commit on `main`; push via the SSH wrapper
(`docs/ssh_git_wrapper_v3.py` per the runbook); the operator key
shredded after the verified push.

**Gate at the session-76 ship: lint 0/0 · tsc 0 · unit 813/813 (41
files) · build · smoke 16/16 · e2e 71/71 (9 specs) · census MATCH.**

If you want the next round, re-send the work order — the flow resumes
at session-77 with a fresh audit + parity walk #50.
