I'll start by internalizing the operating instructions from the attachment, then set up my task plan. This is a large multi-phase task: repo refresh → doc review → codebase validation → audit → parity iteration → remediation → tests → screenshots → docs → commit/push.
Repo cloned, on main, clean tree. Now reviewing the project structure and core docs.
Repo cloned. Task 1 done. Now let me find and read the core docs.
Found all core docs. Now reading them (Task 2).
Let me read the full contents of these large docs from the persisted outputs.
The docs are large. Let me read them in chunks strategically.
Now the PAD. I'll read it in chunks.
PAD understood. Now the SKILL doc (the distilled engineering memory).
Core docs reviewed. Now the session docs (Task 3).
Now the worklog tail (Task 29).
Session docs reviewed. Current status: session 29 shipped at `250a1b4`; this round is session 30. Now validating my understanding against the codebase (Task 4).
`.env.example` exists and matches; `.env` needs creating; `db/` at root confirmed. Checking key seams now.
Session-29 cures all in place. Checking navbar mobile menu, config exclusions, and remaining SEO routes.
All standing asks verified in code. Now setting up the environment: `.env` with the root contract, install, DB push/seed (this also covers user Task 9).
DB ready — census MATCH. Running baseline gate (lint → typecheck → unit).
Baseline GREEN: lint 0/0 · tsc 0 · unit 641/641 (38 files) — exactly the documented counts. Now locating the repo skills for the audit (Task 5).
All named skills exist. Reading the primary ones for the audit.
Let me check the recent changes (session-29 commit) to focus the audit, then dispatch parallel audit subagents.
Now dispatching the three parallel audit subagents (the established pattern), focused on the session-29 changes plus a full sweep.
All three audits returned: combined **0C/0H/0M/4L/7I**. AUDIT-3 also ran the full gate live (lint 0/0, tsc 0, unit 641/641, build OK, e2e 63/63, smoke 15/15, census MATCH). Now hand-verifying the load-bearing findings in source before adjudication.
All four Low findings hand-verified in source. Now the parity walk phase — first the mobile-navigation doctrine, then boot the dev server.
Doctrine internalized. Booting the dev server and preparing the parity walk.
Dev server up, chromium available. Writing a probe script first to learn the reference's DOM (login form + nav structure), then the full parity walk.
Probe successful — reference login works, nav DOM captured, heads + sitemap scheme confirmed. Now the full parity walk: both sides, mobile 390×844 (menu open/closed, computed styles, scrolled states), desktop nav, five-route heads, sitemap/robots, and functional mobile-menu checks on the clone.
Walk complete — 4 reported "drifts", all of which need adjudication. Let me examine the full report head (reference side) before ruling.
Report and scratch PNGs landed in the repo root — moving them into gitignored `test-results/` immediately.
One item to verify: the clone's post-login URL stayed at `/login` (the reference redirects to its landing). Checking the login card's post-signin behavior.
Seeded user is verified — login should succeed. Re-probing the clone's post-login navigation with generous waits and diagnostics.
Login confirmed working (200 → navigates to `/`, session cookie set, me envelope OK). **Parity walk verdict: NO DRIFT** — all 4 reported items adjudicated as documented deviations (oklab/rgba spelling, dead /98 class) or walk-sequencing artifacts (active-route state at dump time). Mobile menu functional checks all passed.

Now the neo-crm review (Task 7).
neo-crm at `b3d0fbe` — unchanged since session 12, as session-29 recorded. Quick confirmation of its stack docs.
neo-crm confirmed unchanged — stack patterns already inherited. Now scoping the remediation plan (Task 12). First, reading the remaining db-path.ts sections and existing test patterns to anchor the S30-1 cure precisely.
Now checking the docs-counts constants block and landing-page test structure for the plan's anchor set.
All anchors scoped. Now reading the SSH wrapper runbook (needed for the final push phase) before writing the plan.
All anchors confirmed. Writing the session-30 remediation plan now (Task 12).
Plan written. Validating the plan's anchors against the codebase (per the user's instruction: re-validate before executing).
All plan anchors validated. Executing Batch 1 — the RED pins (Task 13).
Both RED pins written. Confirming the RED state.
RED confirmed — exactly the 3 designed pins. Now Batch 2 — the GREEN cures. First S30-1 (db-path normalization).
The edit dropped `envFileDir` from the destructuring — fixing.
Now S30-2 — the dead-import removal in sections.tsx.
GREEN — tsc 0, 67/67 including the 3 new pins. Now Batch 3 — the mutation batteries.
Both batteries proven RED→GREEN. Verifying restoration and running the full unit suite.
Exactly the designed 2 census REDs (644 on disk). Now Batch 4: constants-first re-anchor. Checking the census's exact failures.
Constants + PAD row done; census now RED against the doc sites carrying stale counts. Walking them now.
Now the docs lockstep. First checking README's session-status/gate region and SKILL Appendix B context.
Applying the docs lockstep. README first.
Now PAD: §11 row retirement, §12 phrase, counts.
Now the SKILL doc (frontmatter, §0.5, §15, pre-ship, Appendix A+B).
Now the remaining S30-4 provenance sites (`.env.example` + three test files).
Shell quoting broke on the apostrophe. Using the Edit tool per site instead.
Two sites remain. Fixing auth-reset.test.ts and .env.example.
All five S30-4 sites re-anchored. Verifying no residue and running the census.
Unit 644/644 GREEN — census walked clean (the two remaining `session_1..21` hits are the session-30 rows' own historical narration of the cure, intentional). Now the full gate. First stopping the dev server (the session-4 lesson: never build under a live dev server).
Lint exited code 1 — investigating.
My scratch parity-walk script in gitignored `test-results/` trips lint (it scans that dir). Moving scratch scripts outside the repo tree.
Lint clean. Running smoke + e2e (build already succeeded).
**FULL GATE GREEN** — lint 0/0 · tsc 0 · unit 644/644 · build · smoke 15/15 · e2e 63/63. Now the captures (Task 14): dev server per the user's instruction, continuing the numbering at 67.
Module resolution needs the script inside the repo tree. Copying to gitignored `test-results/`, running, moving back out.
Both captures PIL-verified (390×844, ~19k unique colors each, menu functionally open with 5 links). Now the round documents: worklog Task 30, the session log, the plan's post-execution record.
Now replacing `docs/session_30.md` with this round's log.
Now the plan's post-execution record.
All round documents written. Final verification pass on the exact tree — checking docs-counts doesn't walk worklog/session logs, then the full gate.
Tree carries exactly the expected 20 changes. Running the complete final gate on the exact commit tree.
**FULL GATE GREEN** on the exact tree. Now the commit + SSH-wrapper push (Task 17). First checking ssh/paramiko availability.
No ssh, no paramiko — deploying the Appendix-A shim path (install paramiko, workspace bin/ssh outside the repo).
Shim deployed. Writing the operator key to a 0600 file outside the repo (never printed), then sanity-checking it.
Key verified (ed25519). Making the Conventional Commit on main.
Dry-run green. Executing the real push.
Session 30 complete and shipped. Final handoff:

## Round summary

**Baseline:** cloned to `250a1b4`; gate GREEN at the documented counts (unit 641/641 · e2e 63/63 · smoke 15/15 · census MATCH); all standing asks re-verified (`.env` `DATABASE_URL="file:../db/custom.db"` with `db/` at repo root, vitest + playwright current, sitemap/robots/manifest/OG fresh against the live reference, `skills/` excluded from every gate, `.env.example` matching the six-knob contract). neo-crm unchanged (`b3d0fbe`).

**Audit** (3 parallel subagents + hand-verification): **0 Critical / 0 High / 0 Medium / 4 Low / 7 Info.**

**Parity walk** (live, both sides, logged into the reference — the mobile menu at 390×844 with the full functional battery: aria, navigate+close, /Tool light-page superset, Escape + focus return, history close; five-route heads; sitemap/robots; desktop nav; the clone's login round-trip): **NO DRIFT — the fourth consecutive fully-clean walk.** The Tailwind v4 trap catalog re-verified mitigated. The 4 reported deltas adjudicated as documented deviations (oklab/rgba spelling, dead /98 class) or walk-sequencing artifacts.

**Cures (TDD, +3 pins, both mutation batteries on record):** S30-1 the db-path empty-string normalization (an empty-string `DATABASE_URL` no longer masks a valid `.env` value or skips the default fallback — live-probed with the Prisma nonempty-URL failure pre-cure), S30-2 the sections dead-import retirement (`Link` + `Sparkles`, gate-blind since session-19, + the dead-import census pin), S30-3 the PAD §11 logout-CSRF row retirement, S30-4 the provenance range re-anchor (five sites → `1..30` + donor-marker rule), S30-5 the docs/hygiene batch (PAD §12 phrase + db-path row 280→292, SKILL §15 skip-link row).

**Verified:** full gate GREEN — lint 0/0 · tsc 0 · unit **644/644** (38 files) · build · smoke 15/15 · e2e **63/63** (9 specs) · census MATCH · badge 707. Captures 67/68 PIL-verified under `docs/screenshots/`. Six docs + SKILL v1.26.0 in lockstep.
**Reasoned:** the walk's active-state deltas (class families byte-identical; the active route differed at dump time) — consistent with subsequent in-walk probes.
**Deferred to owner:** the in-app-delivery default flip (standing), the me-route unthrottled read, the 36px touch targets (parity doctrine), the cross-tab quota staleness — all in the accepted register with reasons.

**Shipped:** commit `75b3135` on **main** (no new branches), pushed via `docs/ssh_git_wrapper_v3.py` (dry-run first, remote ref verified `refs/heads/main @ 75b3135`, operator key + shim temp material shredded), 20 files.
