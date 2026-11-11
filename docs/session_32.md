I'll start by checking the current workspace state and refreshing the repository.
Repo cloned successfully. Prior sessions (27-30) already made substantial progress — `.env.example`, `db/`, vitest/playwright configs exist. Let me set up my task plan and start the deep document review.
Core contracts understood. Now reading README and the architecture document.
The project is mature — 30 sessions done. Now let me read the session docs (30, 31, plan, worklog tail) and check git state.
The session pattern is clear: `docs/session_31.md` currently holds session-30's execution narration and will be replaced by this round's (session 31) log. Let me read the session-30 plan and worklog tail.
Now reading the PAD (architecture blueprint) in full.
Now reading the viralpost-ai_SKILL.md (the distilled engineering memory).
Docs fully internalized. Now validating understanding against the codebase — checking structure, key seams, and configs.
Codebase matches docs. Now setting up the environment: creating `.env` with the standing DATABASE_URL contract, installing dependencies, and pushing the DB.
DB ready — census MATCH. Running the baseline gate (lint → typecheck → unit).
Baseline GREEN at documented counts (lint 0/0 · tsc 0 · unit 644/644, 38 files). Now reading the repo skills for the audit.
The web-application skill is internalized. Now reading the mobile-navigation doctrine and Tailwind v4 / TDD skills for the audit focus areas.
Doctrine internalized. Now checking the recent commits to focus the audit, then dispatching parallel audit subagents.
Session-30 changes confirmed. Dispatching three parallel audit subagents per the established pattern (AUDIT-1 API/lib seams, AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs + full gate).
All three audits returned: **combined 0 Critical / 0 High / 0 Medium / 3 Low / 8 Info** (AUDIT-3 also ran the full gate live: build PASS, smoke 15/15, e2e 63/63). Now hand-verifying the load-bearing findings in source before adjudication.
A1-L1 confirmed in source — the `|| undefined` normalization only catches `""`, not whitespace. Let me probe it live to verify.
A1-L1 VERIFIED live — whitespace leaks as `" "`. Now verifying A2-L1 (history-close focus gap) in navbar.tsx.
A2-L1 VERIFIED — the history-close arm (lines 65-69) lacks the focus return its two sibling arms have. Now verifying A1-I1 (donor marker) and A3-L1 (playwright install docs gap).
All findings hand-verified:
- **A1-L1** (whitespace DB URL leak): VERIFIED live — `" "` passes through as a set override
- **A2-L1** (history-close focus gap): VERIFIED in source — the third close arm lacks its siblings' focus return
- **A1-I1** (missing donor marker): VERIFIED — convention violated at auth.ts:159
- **A3-L1** (playwright install gap): VERIFIED — zero doc mentions + trustedDependencies excludes playwright (AUDIT-3 hit it live)

Now the parity walk phase — booting the dev server and walking both sides against the live reference.
The `/98` literal lives in two src/ comment sites (the CSS-emitting ones) plus docs. The cure will re-spell src/ and verify by compiling. Now booting the dev server for the parity walk.
Dev server healthy. Writing the parity walk script (outside the repo tree, per the session-30 lint lesson).
**Parity walk verdict: NO DRIFT — the fifth consecutive fully-clean walk.** All deltas are the documented deviations (origin-only canonical/og:url, the D-4 og:image stand-in, our og-dims superset, the aria/focus-ring supersets, the dead /98 token, the oklab/rgba same-color spelling). The clone's mobile menu passed the full functional battery, and the login round-trip works (200 → `/` → cookie → me envelope).

Now reading the test files I'll extend for the cures, plus the SSH runbook, before writing the plan.
All research complete (SSH shim path needed; neo-crm unchanged at `b3d0fbe`). Checking a few remaining design details for the cures — the reset error banner DOM and the import shapes the census must parse.
All details confirmed. Now writing the session-31 remediation plan.
Plan written. Now validating its anchors against the codebase before executing (per the standing instruction).
All plan anchors validated. Executing now — **Batch 1: the RED pins**. First checking design-tokens.test.ts helpers for the census implementation.
`src/instrumentation.ts` has a dynamic import (safe — no clause to parse). Writing Batch 1 — the RED pins.
Now the S31-2 pin in a11y-controls.test.ts.
Now the S31-6 general dead-import census in design-tokens.test.ts.
The `walkSourceFiles` helper exists. Appending the S31-6 census describe.
Census GREEN on the clean tree. Now confirming the RED states of the S31-1/S31-2 pins.
RED confirmed — exactly the 3 designed pins. **Batch 2: the GREEN cures.** First S31-1 (db-path trim).
Now S31-2 (history-close focus arm) + S31-5a (prose-safe /98 re-spell) in navbar.tsx.
Now S31-4 (auth.ts donor marker) and S31-5b (reveal.tsx docstring contract).
All Batch-2 cures applied. Verifying GREEN (typecheck + unit).
Two expected failures (count re-anchor) + one unexpected: the S25-16 pin. Investigating.
The S25-16 pin asserts exactly 2 focus-return call sites; the S31-2 cure adds a third. Updating the pin in the same commit (the sanctioned pin-update doctrine).
Now running Batch 3 — the mutation batteries. First: verify unit cures GREEN on the affected suites, then mutate.
All GREEN. Running the mutation batteries — first S31-1 (revert the trim).
S31-1 battery proven (2 RED → restored GREEN). Now S31-2 battery (remove the focus arm).
The restore script's anchor mismatched. Let me inspect the current state and fix with Edit.
The battery proved RED (both pins). Restoring the effect properly.
S31-2 restored (28/28 GREEN). The footer already imports Link — choosing a symbol it doesn't use for the plant.
Census battery proven — precise RED with the file + symbol named. Removing the plant.
All three batteries proven. Now the S31-5a verification — compiling the real stylesheet to confirm the dead `/98` rule is gone.
The `/98` rule still emits — the src/ comments are fixed, so another source feeds it. Testing whether .md files are scanned by Tailwind v4's auto source detection.
**S31-5a verdict:** the isolated test proves `.md` files feed the scanner — the residual `/98` rule emits from the immutable historical-record docs (worklog, session logs), which the records doctrine forbids re-spelling. The src/ face is cured; the residual goes to the accepted register with this compile evidence (the plan's pre-registered branch).

**Batch 4: the e2e legs.** Reading the spec insertion points.
Writing the three e2e legs.
All e2e legs written. Now **Batch 5: the count re-anchor** — first the reality check on disk.
Reality: 38 files / 648 unit, 9 specs / 65 e2e — exactly the plan's projection. Re-anchoring the constants FIRST.
No duplicate — the s30/s31 entries fill the ladder gap. Now running the census to see which doc sites need the walk.
10 RED doc sites — walking them all now. First the live line counts for PAD §12.
5 remaining REDs — the README e2e line's tail must keep its pinned shape, and auth.ts's line count changed. Fixing precisely.
Census fully GREEN (27/27). Now the full gate on the cure tree — stopping the dev server first (the session-4 lesson).
Unit 648/648 ✓ but lint failed. Investigating.
The `react-hooks/refs` rule rejects render-phase ref writes. Redesigning the cure with a state-flag shape (no ref writes during render).
Now updating the S31-2 pin to match the state-flag mechanism.
Re-verifying: lint, navbar line count (PAD row), and re-running the S31-2 mutation battery on the new shape.
Lint clean, battery v2 proven (2 RED). Restoring the effect + fixing the PAD row (260 lines).
Full gate now: lint → typecheck → unit → build → smoke → e2e.
The new reset-banner leg failed. Investigating.
The banner works — the assertion hit Next's route announcer (a second `role="alert"`). Scoping the locator to the form.
**FULL GATE GREEN: lint 0/0 · tsc 0 · unit 648/648 (38 files) · build · smoke 15/15 · e2e 65/65 (9 specs).**

Now the captures (69/70 on the dev server, per the standing instruction).
Both captures PIL-verified (390×844, rich color depth, functionally confirmed). Now the round documents — first the plan's post-execution record.
Now the SKILL frontmatter + Appendix A session-31 row.
Now appending the session-31 row to Appendix A.
Fixing the escaped-quote artifacts in the new row.
Now the README session-31 row + gate line, and AGENTS plans map.
Now worklog Task 31.
Now replacing docs/session_31.md with this round's log.
Session log written. Final verification — checking the tree state, then the complete final gate.
Tree carries exactly the expected changes. Running the complete final gate on the exact commit tree.
**FINAL GATE GREEN: lint 0/0 · tsc 0 · unit 648/648 · build · smoke 15/15 · e2e 65/65 · census MATCH.**

Now the commit + push phase. Reading the runbook's Appendix A shim (no ssh binary, no paramiko here).
Deploying the Appendix-A shim path: install paramiko, create the workspace bin/ssh outside the repo.
Shim deployed. Writing the operator key to a 0600 file outside the repo (never printed), then sanity-checking.
Key verified (ed25519). Making the Conventional Commit on main.
Commit `bee936d` on main, tree clean. Dry-run push first.
Dry-run green. Executing the real push.
Push verified (`main @ bee936d`), but my shred script had a bug — fixing it now.
Session 31 complete and shipped. Final handoff:

## Round summary

**Baseline:** cloned to `98912fa` (the owner's session-30 log update); gate GREEN at the documented counts (unit 644/644 · e2e 63/63 · smoke 15/15 · census MATCH); all standing asks re-verified (`.env` `DATABASE_URL="file:../db/custom.db"` with `db/` at repo root, vitest + playwright configs, sitemap/robots/manifest/OG family, `skills/` excluded from every gate, `.env.example` six-knob contract). neo-crm unchanged (`b3d0fbe`).

**Audit** (3 parallel subagents + hand-verification of every load-bearing finding): **0 Critical / 0 High / 0 Medium / 3 Low / 8 Info.**

**Parity walk** (live, both sides, logged into the reference — mobile menu at 390×844 with the full functional battery, five-route head census, sitemap/robots, desktop nav, login round-trip): **NO DRIFT — the fifth consecutive fully-clean walk.** The mobile menu works as expected; all deltas were the documented deviations (origin-only canonical/og:url, the D-4 og:image stand-in, the superset arms, the oklab/rgba same-color spelling, the reference's dead 98-percent panel token). The Tailwind v4 trap catalog verified mitigated in the **compiled output** (zero `(hover: hover)` queries, literal-hex `@theme`, zero unmatched v4 classes).

**Cures (TDD, +4 unit pins + 2 e2e legs, every mutation battery on record):**
- **S31-1** db-path whitespace normalization — a `" "` DATABASE_URL still masked valid values post-S30-1; live-probed pre-cure, cured with a one-home `trim()`
- **S31-2** history-close focus return — the mobile menu's third close arm now returns focus like its siblings; the first cure shape (render-phase ref) was **rejected by the lint gate** (`react-hooks/refs`) and redesigned to the state-flag shape — the round's design lesson, on record
- **S31-3** the undocumented `bunx playwright install chromium` prerequisite (bun's trustedDependencies never runs it — a fresh clone's gate fails opaquely) documented at three operator sites
- **S31-4** donor-ledger marker on auth.ts's colliding citation · **S31-5** prose-safe `/98` comments + Reveal's mount-time contract (the .md-scanner residual accepted on compile evidence) · **S31-6** the dead-import census generalized tree-wide (planted-defect battery names file + symbol) · **S31-7** e2e superset: og:image dims on the served head, the authed `/login` no-redirect posture, the reset-screen error banner

**Verified:** full gate GREEN on the exact commit tree — lint 0/0 · tsc 0 · unit **648/648** (38 files) · build · smoke 15/15 · e2e **65/65** (9 specs) · census MATCH · badge 713. Captures **69/70** PIL-verified under `docs/screenshots/`. Six docs + SKILL v1.27.0 + the five provenance sites in lockstep.

**Reasoned:** the reference's post-login `/Home` destination (its own duplicate-content posture; ours 308-redirects — the documented deviation).

**Deferred (accepted register, with reasons):** the in-app-delivery default flip (standing owner-level), me-route unthrottled read, 36px touch targets (parity doctrine), cross-tab quota staleness, formatting nits, the signup admin-bootstrap race (standing session-27 adjudication), and the ~100-byte dead CSS rule emitted from the immutable history docs (compile-evidence acceptance).

**Shipped:** commit `bee936d` on **main** (no new branches), pushed via `docs/ssh_git_wrapper_v3.py` (dry-run first, remote ref verified `main @ bee936d`, operator key + temp material shredded) — 25 files.
