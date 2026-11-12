I'll start by internalizing the operating instructions from the pasted content, then set up a structured plan for this complex multi-phase task.
**Phase 0: Workspace Setup**
Repo cloned, on `main`, clean tree. Now **Phase 1: Core documentation review**. Reading the five core docs:
The docs are large. I'll parallelize: subagents distill the big documents while I read the most current-state-critical files myself. Also cloning neo-crm for later reference.
Both distillations complete. Now reading the most recent session docs (31, 32) and the session-31 plan myself:
The session-log convention is now clear. Reading the session-31 plan and the full session_31.md formal log:
I now have full context on sessions 30-31. **Phase 2: Validate understanding against the codebase.** Setting up the environment and running the baseline gate, which is the executable truth for the documented status:
DB ready, census MATCH. Running the baseline gate (lint → typecheck → unit) and reading the repo skills catalog:
Baseline matches docs exactly: lint 0/0 · tsc 0 · unit 648/648 (38 files). Now completing the gate (build, smoke, e2e) and reading the web-application skill:
**FULL BASELINE GATE GREEN — exactly as documented**: lint 0/0 · tsc 0 · unit 648/648 · build · smoke 15/15 · e2e 65/65 · census MATCH. Understanding validated. Now **Phase 3: audit prep** — locating the repo skills for the audit:
web-application skill is 60KB — the audit subagents will read it in full as their rubric. Dispatching the three parallel audits per the established session pattern (recent changes focus):
All three audits returned: **combined 0C/0H/0M/5L/6I**. Now hand-verifying the load-bearing findings in source before adjudication:
A1-1 confirmed in source: the launch-recovery arm compares untrimmed faces while the S31-1 trim lives only in `effectiveDatabaseUrl`. Verifying the remaining findings:
All findings verified in source. Now reading the SSH wrapper runbook (needed for the final push phase) and the smoke script header:
Smoke script fully understood; leg-reference sites identified (PAD:517, next.config.ts:20). Now **Phase 4: the live reference parity walk** — the user's priority. Booting the local dev server and writing the walk script (outside the repo tree, per the session-30 lesson):
Parity walk verdict analysis — all mobile-menu families **MATCH byte-for-byte**; every DIFF is a documented deviation (aria superset, oklab/rgba same-color spelling, icon conventions, localStorage-vs-cookie auth). The SITEMAP "DIFF" looks like a script artifact (JS `.replace` only replaces the first occurrence). Verifying sitemap/robots equivalence directly:
**NO DRIFT — the sixth consecutive fully-clean walk.** All deltas are the documented deviations/supersets (aria superset family, oklab/rgba same-color spelling, file-convention icons, localStorage-vs-cookie auth, origin-only canonical/og:url). The mobile menu matches byte-for-byte in every class family.

Now **Phase 5: the remediation plan.** Reading the remaining implementation anchors (db-path internals, existing pins, 429 envelope shape):
All anchors confirmed. Reading the last two skill references (clone-app-pat-pro, tdd) before writing the plan:
Verifying the me-envelope shape and the remaining anchors before writing the plan:
All anchors verified. Reading the existing standalone-launch test describe to design the S32-1 pins precisely:
All anchors verified. Writing the session-32 remediation plan (the deliverable plan with detailed TODO list):
Plan written. Now the **plan-validation pass** (the user's explicit ask: validate the plan against the codebase before executing). Verifying the last mechanical anchors — the login 401 shape and the 429 body:
Plan validated — all anchors confirmed (rate limit fires first; wrong password → 401; 429 carries Retry-After + RATE_LIMITED). **Executing Batch 1: the RED pins + fixture hygiene.** Viewing the S27-2 test insertion point:
Now S32-8 — the rate-limit.test.ts fixture hygiene. Viewing the describe structure:
Batch 1 applied. Confirming the RED states (exactly the 2 new S32-1 pins RED; rate-limit suite GREEN):
Exactly the 2 designed pins RED; rate-limit GREEN at 21 (vacuous it() dropped). **Batch 2 — the GREEN cures.** First S32-1 (the db-path trim):
Now S32-4 — the prose-safe re-spells. Reading the exact comment sites:
Now S32-5 (CLAUDE.md hover mechanism fix) and S32-1's pin verification:
All GREEN. **Batch 3 — mutation batteries.** S32-1 battery (revert the trims → RED):
Battery proven — exactly the 2 pins RED. Restoring:
S32-1 restored (35/35). Now the S32-4 compile probe — the per-file recompile verification:
All CLEAN — S32-4 battery proven. **Batch 4 — the smoke ladder** (S32-2 + S32-3). Editing the script:
Smoke script updated. Now the leg-number references in next.config.ts and PAD:
**Batch 5 — the e2e folds.** S32-6 (history-close focus assertion):
S32-7 (rendered-head icon links):
Both folds applied. Now the count-re-anchor sequence — reality check on disk first:
Reality: 649 tests / 16 legs / badge 714 — the 3 REDs are the census catching the stale constants (by design). Re-anchoring constants FIRST:
The census is walking the doc sites (9 REDs). Getting the live line counts for the PAD §12 rows first:
Applying all count-site edits — README first:
The README session-32 row I just wrote spells the banned class tokens verbatim — that would re-demand dead rules (`.opacity-0` etc.) from a fresh source. Re-spelling the row prose-safe before it becomes immutable history:
Now AGENTS, CLAUDE, PAD, and SKILL count sites:
Adding the SKILL Appendix A session-32 row:
Re-running the census + full unit suite:
Unit 649/649 GREEN. Now the full gate (build → smoke 16 → e2e 65), stopping the dev server first per the session-4 lesson:
SMOKE 16/16 PASS — the live-429 leg works exactly as designed. Now e2e (validating the S32-6/S32-7 folds):
e2e 65/65 GREEN. Now the two e2e mutation batteries. Viewing the navbar focus-arm code first:
The file is intact (the rg output was a display artifact). Running the S32-6 battery (remove the focus arm → e2e RED):
The battery exposed a flaw in my e2e arm — the test never focused INSIDE the panel, so focus was already on the toggle and `toBeFocused` passed without the arm (a vacuous pin — exactly the genus the house doctrine bans). Redesigning the arm to focus a panel link first:
I placed the focus step after the panel closed — sequencing error. Restructuring correctly (focus inside the OPEN panel before goBack):
Now the S32-6 battery on both states — clean tree first, then arm removed:
Still GREEN with the arm removed — my mental model is wrong somewhere. Debugging directly with an activeElement probe:
Found it — the e2e runs against the standalone BUILD, so the mutation never reached the served code. The battery requires a rebuild after mutating. Rebuilding now (source currently has the arm removed):
**S32-6 battery proven** — with the arm removed from the build, the test REDs (1 failed). Restoring the arm and rebuilding:
S32-6 GREEN. Now the S32-7 battery (plant `metadata.icons` → RED). Viewing layout.tsx's metadata:
**S32-7 battery proven** — the planted `metadata.icons` REDs the test. Restoring:
S32-7 GREEN (11 passed). Now the round documents — worklog Task 32 first:
Now replacing docs/session_32.md with the formal session-32 log:
Now the plan's post-execution record:
Round documents complete. **Batch 7 — captures 71/72** on the dev server:
The menu state reads closed — the click didn't open it. Debugging directly:
The page self-reloads during load (dev-mode Fast Refresh full reload). Making the probe wait for quiescence:
The page is stuck in a self-reload loop on the dev server. Checking the dev log and the tree state — the e2e (65/65) and smoke (16/16) prove the production build is healthy, so this is dev-server specific:
The code is byte-identical where expected (navbar.tsx not even modified). The production build is proven green — this is a dev-server artifact. Checking the dev server startup log:
Found it — **EADDRINUSE ghost**: the original dev server from the parity-walk phase survived, and my captures hit the documented "stale server serves OLD html against NEW chunk names" anti-pattern (the reload loop is stale-chunk fetch failures). Killing the ghost properly:
Fresh dev server up. Retrying captures 71/72:
Menu opens correctly (display block, 5 links, aria-expanded true). Copying captures and PIL-verifying:
**Batch 8 — the final full gate on the exact commit tree.** Stopping the dev server first:
**FULL GATE GREEN: lint 0/0 · tsc 0 · unit 649/649 · census MATCH · build · smoke 16/16 · e2e 65/65.** Now the commit + push phase. Verifying the tree, then committing:
Committed `dd98b3d` on main. Now the SSH push infrastructure (paramiko + the Appendix-A shim in a workspace bin/, outside the repo):
Key parses (ed25519). Dry-run push first:
The wrapper already verified the remote ref (`main @ dd98b3d == local HEAD`). The bare `ls-remote` failed only because the key is shredded (as designed). Verifying the shred and final state:
**Session 32 is SHIPPED.** Final verification of the commit contents (per the user's explicit .env.example requirement):
All requirements verified. Marking the round complete:
## Session 32 — Round Complete and Shipped

**Shipped:** commit `dd98b3d` on **main** (no new branches), pushed via `docs/ssh_git_wrapper_v3.py` (dry-run first, remote ref verified `main @ dd98b3d`, operator key + temp material shredded). The tree is clean and `origin/main` is in sync.

**The audit** (three parallel subagents, web-application skill as rubric, every finding hand-verified): 0 Critical / 0 High / 0 Medium / 5 Low / 6 Info → four Lows + four Infos cured (S32-1..S32-8), the rest accepted with reasons.

**The parity walk** (live, both sides, logged into the reference): **NO DRIFT — the sixth consecutive fully-clean walk.** The mobile navigation menu matches byte-for-byte (hamburger, panel, links, pill, bar families) and works as expected; all deltas are the documented deviations. All eight Tailwind v4 traps verified mitigated **in the compiled output**.

**The cures (all TDD, all mutation batteries on record):** the launch-db trim (db-path, +2 pins), the smoke session-arm strengthening, the live 429 leg (SMOKE 15→16), the prose-safe + comment-truth batch (probe-verified clean), the CLAUDE hover-unwrap doc fix, the two e2e superset folds (history-close focus return + head-level icon links), and the rate-limit fixture hygiene. The S32-6 battery caught its own first shape being vacuous — redesigned and re-proven; the round's design lesson (e2e batteries must rebuild) is on record.

**Verified:** full gate green on the exact commit tree — lint 0/0 · tsc 0 · unit **649/649** (38 files) · build · smoke **16/16** · e2e **65/65** · census MATCH · badge 714. Captures 71/72 PIL-verified. Sitemap/SEO confirmed contract-complete and identical to the reference modulo origin. `.env` holds the standing `DATABASE_URL="file:../db/custom.db"` contract with `db/` at the repo root; `.env.example` rides the commit.

**Deferred (accepted register):** the bun-absolutization model's non-reproduction on this sandbox's bun 1.3.14 (re-verify on the deployment bun first), the natural-English prose-collision dead rules, the test-pin literal face, plus the standing register (in-app delivery default, me-route throttle, 36px targets, cross-tab quota staleness, formatting nits, admin-bootstrap race, Tailwind .md-scanner residual).

Next steps: the owner's post-ship "update session log" commit will hold this narration as `docs/session_33.md`; the following round can re-run the standing instruction as-is. Nothing is left broken.
