I'll continue the multi-phase task on the `viralpost-ai` repository. Note the doc set has been updated again — now **session_28/session_29** (superseding the session_27/28 set from the prior context). Let me set up the task plan and begin Phase 1.
The workspace has been reset — no local repo exists. I'll clone it fresh.
Clone successful — on `main`, clean, up to date (latest: session-28 audit batch). Now let me survey the repo structure and read the core docs.
Repo state is promising — sessions 1–29 exist, `db/` at root, `vitest.config.mts` + `playwright.config.ts` present, `.env.example` exists. Now reading core docs.
Core contracts absorbed. Now reading the session docs (28, 29), the session-28 plan, and the worklog tail.
Session 28 shipped (`fd6c75b`); `docs/session_29.md` holds the session-28 execution narration (the owner's established pattern) — so **this round is session 29**, baseline `edde18f`. Reading the session-28 plan + worklog tail.
All session-28 documents reviewed. Now scanning the remaining core docs (README, PAD, SKILL) strategically and validating key facts against the codebase.
Codebase structure matches docs. Setting up the environment: creating `.env` (per the six-knob contract), installing dependencies, pushing the DB.
DB ready (census MATCH). Running the baseline gate — lint → typecheck → unit first.
Baseline GREEN — lint 0/0 · tsc 0 · unit 636/636 (38 files), exactly the documented counts. Verifying the remaining standing asks (skills/ exclusion, configs, SEO surfaces).
All standing asks verified (skills/ excluded from all three configs). Phase 1 complete. Moving to Phase 2 — the audit. Loading the repo skills first.
Skill family internalized (structure mirrors the contracts already distilled in the repo's own docs). Now examining the recent changes (session-28 commit) to focus the audit.
Now dispatching three parallel audit subagents (the established session pattern), focused on the session-28 changes plus a full-sweep audit.
All three audits returned: combined **0 Critical / 0 High / 0 Medium / 8 Low / 13 Info**. Now hand-verifying every load-bearing finding in source before adjudication.
A1-L4 and A2-L1 confirmed in source. The sub-AA tones are the standing accepted-register family (to be re-verified against the reference in the parity walk). Verifying A3-L1 and A3-L2.
A3-L1 and A3-L2 confirmed. Now examining the logout CSRF vector's cure options — checking the client-side logout call and the auth seam.
Navbar is purely marketing (no logout UI call site — the logout route is exercised only by smoke leg 12 + e2e session spec, both with a valid session, so a session-gate cure keeps them green). Adjudication is forming. Now checking neo-crm donor state (per the standing task) before the parity walk.
neo-crm unchanged (`b3d0fbe`) — recorded stack decisions stand. Now Phase 3: booting the dev server for the live parity walk.
Dev server up (200 on home). Writing the parity-walk census script (kept outside the repo tree's tracked paths).
`test-results/` is gitignored — scratch space confirmed. Writing the parity walk script.
The parity walk is **fully clean — the third consecutive no-drift walk**. Mobile menu (the priority surface): hamburger base byte-identical + our documented superset aria/focus arms; all 5 mobile links + Gumroad pill byte-identical; open-panel and scrolled-bar behaviors identical; the oklab/srgb spelling difference is the documented same-color form. The A2-L1 sub-AA tones are confirmed reference-inherited (byte-identical classes live). Let me verify the og-image deviation is documented, then finalize adjudication.
og-image deviation is documented (D-4 ledger row — self-hosted stand-in by design). **Phase 3 parity walk complete: NO DRIFT.** Now scoping the cure-site anchors for the remediation plan — examining the test files that will host the new pins.
All anchors scoped. Checking `requireSession` (the family's session-gate idiom) before writing the plan.
The cure idiom is clear (`requireSession` + `isGuarded` — the family's own gate). Verifying the census target for S29-2's pin before writing the plan.
Exactly one occurrence per file — the census pin is well-defined. Checking which existing tests census generator-card source (for S29-3's pin home).
The pin homes are set. Checking the PAD §12 line-count pins (which files are censused) so the plan's count-re-anchor is complete.
All anchors validated. Writing the session-29 remediation plan now.
Plan written and aligned (anchors pre-validated during audit). Now executing **Batch 1 — the RED pins**.
The S16-1/S28-3 pins must be re-anchored to the post-cure call form in the same commit (the house doctrine). Examining the exact cure-site code before writing pins.
All cure sites confirmed. Writing **Batch 1 — the RED pins** (plus the S16-1/S28-3 re-anchors to the post-cure form).
Now the S29-3, S29-6, and S29-7 pins.
Now the S29-7 icon IHDR pin in seo-surfaces.test.ts.
Verifying the manifest route's declared-size literals match my pin's expectations, then confirming the RED state.
**RED CONFIRMED** — exactly the 6 designed pin failures + the count census, each for the right reason. Now **Batch 2 — the GREEN cures**. Starting with the api.ts predicate (S29-2).
Now the two route-local call sites (contact + generate) and the logout gate.
Now the logout route cure (S29-1):
Now S29-3 (generator-card) and S29-4 (schemas comment).
Checking the null-safety of the error arm after the type widening.
tsc clean; the cured suites are GREEN. Now S29-4 (schemas comment) and S29-8 (CLAUDE + gitignore).
Now S29-8 — the CLAUDE.md wording cure and the .gitignore re-filing.
Now S29-5 — the e2e seo.spec fold (in-place, no count change).
All cures in place. Running the full unit suite to confirm the only remaining RED is the count census.
Exactly the 2 designed census REDs remain (641 on disk = 636 + 5 pins, matching the plan's projection; api.ts line count pending re-anchor). Now **Batch 3 — the mutation batteries**, proving each pin can fire.
All 5 unit batteries proven RED→GREEN. Now the S29-5 e2e battery — planting the OG_IMAGE defect, building, and running the seo spec against the production build.
Battery 6 proven — the folded og:image arm REDs exactly as designed. **All 6 mutation batteries on record.** Now **Batch 4 — the count re-anchor + docs lockstep**. Getting live counts first.
The plan's projection was exact: UNIT 641, SUITES 38. Two §12 rows to re-anchor (api.ts 252→263, generator-card 266→271). Walking the doc sites now.
All count sites located. Re-anchoring the doc set in lockstep — starting with README.
Now the full README lockstep (badge, counts, session-29 row, gate line).
Captures 65/66 will be correct. Continuing the lockstep — AGENTS, CLAUDE, PAD.
Now the SKILL doc lockstep (v1.24.0 → v1.25.0).
Now the SKILL Appendix A session-29 row.
SKILL lockstep complete. Running the unit suite — the census should now walk GREEN.
The census is walking me site by site. Getting the exact failure messages.
The docs-counts test itself carries the count constants — they need the re-anchor first. Examining the constants block.
docs-counts fully GREEN. Running the complete unit suite.
**Unit GREEN: 641/641 · lint 0/0 · tsc 0.** Now live-verifying the cured surfaces on the dev server (the logout gate's 401 face + happy path).
The 401 gate works. Checking the seeded demo user's actual credentials for the happy-path verification.
All live probes verified (401 gate, 200 happy path, the shared-seam vocabulary intact). Now taking captures 65/66 on the dev server.
Captures PIL-verified. Now writing the round documents — worklog Task 29, the session_29.md round log, and the plan's post-execution record.
Now replacing `docs/session_29.md` with this round's log.
Fixing a typo in the session log (636/631 → 636/636).
Now the plan's post-execution record.
Round documents complete. Stopping the dev server (the session-4 lesson) and running the **full gate**.
**FULL GATE GREEN** — the && chain reached e2e (63/63 passed, including the logout round-trip and the S29-5 folded SEO arms). Confirming the smoke legs and running the final census + hygiene check.
Census MATCH, tree carries exactly the expected 23 changes (test-results scratch is gitignored). **Phase 8 — the git commit + push.** Reading the SSH wrapper runbook.
Runbook internalized. Checking the sandbox's ssh/paramiko availability, then deploying the shim.
Deploying the paramiko shim (Appendix A) outside the repo.
Writing the shim to the workspace scripts dir (outside the repo, inside /home/z).
Key verified (ed25519). Making the Conventional Commit on main.
Commit `04e96f3` on main (23 files, +796/−141), tree clean. Now the wrapper push — dry-run first.
Dry-run green — `edde18f..04e96f3` would land on main. Executing the real push.
Push verified by the wrapper itself (`refs/heads/main @ 04e96f3 == local HEAD`). Shredding the operator key and cleaning up.
Session 29 is complete and shipped. Final handoff:

## Round summary

**Baseline:** cloned to `edde18f` (the owner's session-28 execution log); gate GREEN at the documented counts (636/636, census MATCH); every standing ask re-verified — `.env` `DATABASE_URL="file:../db/custom.db"` with `db/` at repo root, vitest + playwright suites current, sitemap/robots/manifest/OG fresh, `skills/` excluded from every gate, `.env.example` matching the six-knob contract. neo-crm unchanged (`b3d0fbe`).

**Audit** (3 parallel subagents + hand-verification): **0 Critical / 0 High / 0 Medium / 8 Low / 13 Info.**

**Parity walk** (live, both sides, logged into the reference — mobile menu at 390×844, five-route heads, footer, sitemap/robots, desktop nav): **NO DRIFT — the third consecutive fully-clean walk.**

**Cures (TDD, +5 pins, 6 mutation batteries):** S29-1 the logout session-gate (the CSRF-logout class closed — the only ungated side-effecting route; live-verified 401/200 faces), S29-2 the shared shape-guard (`isJsonObject` in the api.ts seam — the three drifted copies collapsed), S29-3 the generator-card `.catch(() => null)` family mirror, S29-4 the loginSchema comment-truth arm, S29-5 the head-DOM SEO superset (og:image/twitter:card/`/Tool` canonical on the rendered head), S29-6 the db:push wrapper wiring pin, S29-7 the icon IHDR pins, S29-8 the docs/hygiene batch.

**Verified:** full gate GREEN — lint 0/0 · tsc 0 · unit **641/641** (38 files) · build · smoke 15/15 · e2e **63/63** (9 specs) · census MATCH · badge 704. Captures 65/66 PIL-verified under `docs/screenshots/`. Six docs + SKILL v1.25.0 in lockstep.

**Shipped:** commit `04e96f3` on **main** (no new branches), pushed via `docs/ssh_git_wrapper_v3.py` (dry-run first, remote ref verified, key + shim shredded), 23 files +796/−141.

**Deferred to owner:** the scryptSync async lift, the in-app delivery default flip, and the sub-AA tone family (the standing parity-doctrine acceptance, now with this round's live captures as evidence) — all recorded in the accepted register with reasons.
