I'll start working on this comprehensive multi-stage task for the viralpost-ai project. Let me set up a TODO plan and begin with Phase 1: workspace refresh.
本地工作区已被重置 —— `viralpost-ai` 目录为空。我将克隆该仓库（以及用于技术栈模式参考的 `neo-crm`）：
两个仓库已克隆。现在让我阅读这 5 个核心文档。让我先检查一下仓库结构：
Repo cloned successfully. I can see this is a mature project with 83 sessions. Now let me read the core docs. Starting with AGENTS.md and CLAUDE.md:
Excellent context. This is a mature project (83 sessions) where many tasks (db path, vitest/playwright, Tailwind v4 mitigations) may already be done. Let me read the remaining core docs strategically — first scan the README structure:
Let me use a more efficient approach to read the remaining docs — extracting sections directly:
The project is highly mature — 82 sessions, 55 consecutive clean parity walks. Now let me read the session records the user specified:
Session 83 is the current round's narration window — my round. Let me read the session-82 records and worklog:
Now I have the full picture. This round is **session-83**: fresh audit + parity walk #56. Let me check the worklog tail and verify the current git state:
State confirmed: HEAD `189dfae5` is the narration push carrying `docs/session_83.md` (this round's window), one-file clean diff from the session-82 ship. Now let me review the skills catalog and key architecture docs:
Skill loaded. Now let me check the PAD structure and SKILL frontmatter, then start dependency installation (long-running) while I continue the review:
Now kicking off `bun install` in the background while I continue the codebase review:
Structure matches the documented architecture. Let me validate key configs while install runs:
Config layer matches docs (8 runtime + 13 devDeps). Let me check install progress and read the audit focus files:
navbar.tsx verified at all documented sites — no drift. Now toast.tsx:
toast.tsx verified — all documented sites present, no drift. Checking install progress and continuing with key source reads:
Sitemap contract verified. Install seems stalled — let me check:
The background process was reaped (the documented sandbox hazard). Running install in the foreground:
427 packages — matches the documented count. Now setting up `.env` and the database (with the ambient `DATABASE_URL` hazard neutralization):
Database setup complete — census MATCH. Now the baseline gate. First lint + typecheck + unit:
Unit 813/813 (41 files) — matches. Now chromium install + production build:
Build succeeded, chromium rev 1248 (matches pinned version). Now smoke + e2e:
**BASELINE GATE FULLY GREEN** — lint 0/0 · tsc 0 · unit 813/813 · build · smoke 16/16 · e2e 71/71 · census MATCH. Exactly the session-82 ship state. Now the audit lanes:
neo-crm unchanged at `b3d0fbe`; hazard sweep clean. Verifying the db seam and config layer:
Config layer verified. Now the compiled-sheet TW4 cures and provenance sites:
TW4 cures verified in the compiled sheet. Now the ten provenance sites and dependency census:
All ten provenance sites at `1..82` uniform. Now the dependency census and `bun audit` duty:
The audit output shows a possible census change. Let me compare against the documented census:
The current `bun audit` output shows 10 advisories (4H/5M/1L) vs the documented 9 (3H/5M/1L) — a possible new advisory. Let me investigate:
A potential NEW advisory (GHSA-587h, launch-editor high). Let me get the complete audit output and count precisely:
**Live audit finding**: the census is now 10 advisories (4H/5M/1L) — one NEW high advisory vs the documented 9 (3H/5M/1L): **GHSA-587h-7wmj-h5pm** (launch-editor). Let me verify it's new and check remediation options:
The advisory is real (published Oct 6, updated Oct 20, 2026 — Windows-only, patched in launch-editor 2.14.2). Let me check the installed version and remediation path:
launch-editor isn't installed directly — the advisory matches `vite@8.3.0` itself (bundled launch-editor). Let me check the remediation path via vitest's vite range:
Key insight: `vite@8.3.3` (patched) satisfies @vitest/mocker's peer range `^8.0.0` — a patch-level transitive bump cures the entire 6-advisory vite block. This is a live audit finding for session-83. Let me apply the smallest correct change:
`bun update vite` cascaded too far (8.3.8 + dozens of unrelated transitive bumps) — not surgical. Reverting and using the resolutions pin (the zod S15-3 precedent) at exactly 8.3.3:
Census dropped 10 → 4. Let me verify the full lockfile diff is confined to the vite subtree:
The cure verified: 10 → 4 advisories (3H/1M, all dev-toolchain, pre-existing accepted family). Now checking if any test pins the resolutions/manifest contract:
No test pins the resolutions block (my change is `resolutions`-only; the 8-runtime-dep contract holds). Per the session-79 bump precedent, the verification is the full gate re-run on the bumped tree:
The S45-6 census pin caught a side effect — `bun update vite` earlier also added vite to `package.json` dependencies. Checking:
The pin worked as designed — catching the manifest drift. Removing the stray runtime dep (vite is dev-toolchain, not runtime), keeping only the resolutions pin:
Unit 813/813 GREEN on the bumped tree. Completing the gate with build + smoke + e2e:
**FULL GATE GREEN on the bumped tree** — the vite 8.3.3 pin is verified. Now the parity walk #56. Let me check the previous round's walk scripts (preserved in the workspace):
The previous round's scripts are preserved. Let me read the full REF and CLONE leg scripts to adapt them:
Let me verify the quota counter key from source before adapting the scripts:
Key confirmed: `viralpost_generations`. Now creating the walk #56 scripts with the session-82 probe fixes built in:
Now the CLONE leg script with the correct quota key and this round's screenshots (173/174):
Now running the REF leg against the live reference:
REF leg mostly at documented states, but the outside-tap arm reads `NO_PANEL_EL` (walk #55 read R-OPEN at the same spot). Let me compare with the walk55-ref3 probe logic before concluding anything:
walk55-ref3's read logic is identical to mine — the difference must be probed directly. Running a targeted re-probe with pre-tap state verification and multiple settle times:
The re-probe resolves it: outside-tap on real content = **R-OPEN** (verified twice). The first run's `NO_PANEL_EL` was my own probe artifact — after the no-op Escape (R-OPEN), the unconditional `openMenu()` call toggled the still-open menu closed. No phantom finding — the s78/s82 selector-doctrine precedent. 

**REF leg COMPLETE — all postures at documented states.** Now the CLONE leg:
CLONE leg postures all at documented states. Let me see the head of the output (login + hamburger census):
Screenshots captured. Now PIL-verifying them (the session-80+ computation family):
Both screenshots PIL-verified at the documented anatomy (82.79% / 99.96% non-white; panel rows ≈ slate-900/95; amber pill at y≈300; the /Pricing own-hero band below). **Walk #56 CLEAN on both legs.**

Now checking where the audit census is documented live (it changed 9 → 4 with the cure):
The README/SKILL matches are frozen historical rows. Checking the docs-counts test pin and any live-tense census claims:
No live-tense census claims — all "9-advisory" references are frozen history. Now writing the session-83 remediation plan:
Plan written. Now validating the plan's lockstep sites against the codebase before executing:
All sites confirmed. Executing the S83-2 lockstep — first the ten provenance sites `1..82` → `1..83`:
Now the SKILL frontmatter + §0.5 + Appendix updates:
Now the SKILL Appendix-A session-83 row and Appendix-B re-cert. Finding the exact sites:
Adding the session-83 Appendix-A row and updating the Appendix-B re-cert:
SKILL lockstep complete. Now the docs-counts s83 rung:
Now the README session-83 row and gate footer:
Now AGENTS plans-map and PAD header date:
Now the worklog Task 83 entry. Checking Task 82's form:
Now the formal session_83.md (replacing the narration window):
Now the plan's post-execution record:
All lockstep edits complete. Verifying the diff is the documented form:
The diff is exactly the documented form. Now the full gate on the final tree:
**FULL GATE GREEN on the final tree.** Now the commit and push. Reading the SSH wrapper runbook:
Runbook understood. First the commit (Conventional Commit on main):
Committed. Now setting up the SSH push per the runbook — key to a 0600 file outside the repo:
No system ssh, but the paramiko shim exists (the runbook's Appendix A form). Verifying the key and shim:
Key verified. Now the dry-run push via the wrapper:
Dry-run clean (fast-forward `189dfae5..0dd95aa4`). Real push:
**Push verified and delivered.** Let me finalize the task list:
The session-83 round is complete and delivered. Summary:

**Baseline (Verified, fresh clone):** Full gate GREEN — lint 0/0 · tsc 0 · unit 813/813 (41 files) · build · smoke 16/16 · e2e 71/71 · census MATCH; neo-crm unchanged at `b3d0fbe`.

**Audit — one live finding:** the fifth consecutive zero-finding code round, plus **AUDIT-1 M-1**: the `bun audit` census had drifted to 10 advisories (newly-matching GHSA-587h HIGH on `vite@8.3.0`, advisory-database lag). Cured with the S83-1 `resolutions` pin `vite: 8.3.3` (the zod S15-3 precedent) — the entire vite family retired, census now 4 advisories (3H/1M, all dev-toolchain). A stray `bun update vite` cascade was rejected and its stray runtime-dep entry caught by the S45-6 pin; the full gate re-ran GREEN on the bumped tree.

**Parity walk #56 — clean (56th consecutive):** mobile menu byte-identical + aria superset + Escape close-with-focus-return; outside-tap both-open (one probe artifact diagnosed and re-probed live — no phantom finding); gradients, sitemap, robots all at documented states; the reference's generator DEAD vs the clone LIVE; **no Tailwind v4 bug in the mobile menu** — verified at source, compiled sheet, and live DOM on both legs.

**Delivery:** commit `0dd95aa4` pushed to `main` via the SSH wrapper (remote verified `refs/heads/main @ 0dd95aa == local HEAD`, operator key shredded). Key artifacts: [session_83.md](/home/z/my-project/viralpost-ai/docs/session_83.md), [remediation plan](/home/z/my-project/viralpost-ai/docs/plans/2026-11-18-session83-vite-family-retirement-and-walk-56.md), screenshots 173/174 PIL-verified, `.env.example` verified, docs lockstep complete (SKILL v1.79.0).

For another round, re-send the work order — the flow resumes at session-84 with a fresh audit + parity walk #57.
