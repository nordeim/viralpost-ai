I'll internalize the operating instructions and continue with the task. Let me set up the TODO plan first, then begin with Phase 1 (workspace refresh).
The `viralpost-ai` workspace exists. Let me refresh it with `git pull` and check the current state.
`git pull` succeeded and brought in `docs/session_27.md`. Now let me review the core documentation files.
The persisted-output chain nests. Let me read the files directly in paged chunks instead.
现在我来查看会话日志、计划和最新工作日志记录。
I have a thorough understanding of the project. Now let me validate the current codebase state against the documented session-26 ship.
The standing asks are all in place (`.env` DATABASE_URL contract, `db/` at root, vitest+playwright, `.env.example`). Now let me verify the toolchain and run the baseline gate.
Baseline GREEN matching session-26 ship (lint 0/0 · tsc 0 · unit 629/629 in 38 files). Let me verify the DB census and skills exclusion configs.
All standing asks verified. Now let me review the repo-included skills for the audit phase.
The skill is internalized (same family as prior sessions; the repo's own `viralpost-ai_SKILL.md` is its distilled form which I've reviewed). Now let me map the recent-change surface to focus the audit.
Baseline validated. Now Phase 2 — dispatching the three parallel audit subagents per the established session pattern (AUDIT-1 API/lib seams, AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs).
All three audit streams returned — combined **0 Critical / 0 High / 1 Medium / 5 Low / 10 Info**. Now the lead's hand-verification of every load-bearing finding in source:
AUDIT-1 L-1 and AUDIT-2 M-1 confirmed in source. Let me verify the remaining findings.
All load-bearing findings verified in source. Now let me check the neo-crm donor repo state and the browser tooling for the parity walk.
neo-crm HEAD unchanged (`b3d0fbe`, matching the record — the recorded tech-stack decisions stand). Playwright + Chromium are available. Let me quickly re-confirm the neo-crm stack patterns, then run the parity walk.
Stack patterns confirmed. Now Phase 3 — the parity walk. Let me boot the clone's dev server and write the census script.
Outstanding parity walk results — the mobile menu is byte-identical (links, pill, hamburger base classes, panel max-height `none`, transparent bar with menu open), head/sitemap/robots all match modulo origin, generator round-trip green. Two probe items to complete: the footer census (probe bug) and the scrolled-bar state. Let me fix and finish those.
Footer columns byte-identical; scrolled-bar class strings byte-identical. The computed background differs only in color-space representation (`rgba(15,23,42,0.95)` vs `oklab(...)` — the Tailwind v4 oklch palette rendering). Let me verify these are the same color numerically.
Confirmed — the oklab value is EXACTLY #0f172a (slate-900): visually identical, class strings byte-identical. **The parity walk finds NO DRIFT** — all control surfaces hold. Now let me survey the cure sites before writing the remediation plan.
The genus is broader than flagged — but the house already adjudicated part of it (session-25: UA-default focus on reference-owned *link* families = accepted, parity doctrine). Let me check the exact adjudication wording before scoping the cure.
The pin is `toContain` (substring) — appended focus-visible arms won't trip it. All anchors surveyed. Let me validate the remaining cure-site anchors (db-path standalone fixture, e2e 404 test, census walker).
Let me read the remaining db-path helpers to write the exact cure.
All anchors validated — the misroute mechanism is fully understood. Now writing the session-27 remediation plan.
Plan written and anchor-validated. Now executing with TDD — **Batch 1: RED pins first**. Let me find the exact insertion points.
Now writing the RED pins (they must fail before the cures):
That edit clipped the icon-only pin body. Restoring it and inserting the new pin correctly:
Still a leftover fragment from the first bad edit. Let me inspect and repair:
File repaired. Now the S27-2 RED pin in db-path.test.ts (session-34 describe):
Now verifying the RED state — exactly the 2 new pins must fail for the right reasons:
**RED CONFIRMED** — exactly the 2 new pins fail for the right reasons (the misroute reproduces precisely as audited). Now the GREEN cures:
Now the S27-2 cure — the launch-arm `:memory:` guard:
**Batch 1/2 GREEN — 55/55.** Now the mutation batteries (planted-defect proofs):
Both mutation batteries proven. Now **Batch 3 — the pin-hardening batch**:
Now the Batch 3 mutation batteries — verify each hardened arm can actually fire:
The plant didn't match the source form. Let me read the actual twitter block:
Battery proven — but let me confirm the re-anchored *negative* arm itself fires (not just the positive arm):
Negative arm proven independently. Now the S27-5 and S27-7 batteries:
Both batteries proven. Now **Batch 4** — first verify the noindex meta is live on the 404 route:
Live-verified. Now the S27-6 e2e arm and the S27-3 comment fix:
Let me tidy that docblock line-wrap:
Batches 1–4 complete. Now the full unit suite for the live count walk:
The 2 failures are the designed census REDs (the count gates doing their job). Live count: **631** (+2 pins — the plan's "630" arithmetic was off by one; noted for the post-execution record). Let me confirm the other §12 line counts and re-anchor:
Live count: 631, badge 694. Re-anchoring the census constants and ladder:
Now the PAD §12 db-path row (272 → 280):
Now let me walk the census RED-to-GREEN across every doc site:
All sites identified. Walking the lockstep — README first:
Now the README session-27 row + gate line:
README done. Now AGENTS.md and CLAUDE.md:
Now the AGENTS plans map (27th round) and the SKILL:
Now the SKILL pre-ship checklist, Appendix A row, and Appendix B re-certification:
Now the Appendix A session-27 row:
One arm remains — the Appendix B count text. Let me find its exact form:
My own Appendix A row spells the banned literal — the S25-3 lesson (comments must not false-positive literal-context bans). Rewording:
There's an unclosed paren in my rewording. Fixing:
Census GREEN. Full unit suite + lint + typecheck:
TS error on my redundant `/s`-flag assertion. Removing it (the `toContain` arms carry the pin):
All GREEN — lint 0/0 · tsc 0 · unit 631/631. Now live re-verification of the cured focus rings on the dev server + captures:
The Send ring verified live (teal-600, 2px). The generator probe's Tab landed on a different element — let me debug the tab order and probe properly:
The Generate button is disabled while the idea is empty (disabled = skipped in tab order). Fill the idea first, then Tab:
Tab lands on Generate now — the ring value was truncated. Full probe:
**LIVE-VERIFIED** — the Generate button renders the teal-600 house ring on keyboard focus (both cured surfaces confirmed). Now PIL-verify the captures:
Both captures PIL-verified. Now the round documents — the plan's post-execution record first:
Now the worklog Task 27 entry:
Now replacing `docs/session_27.md` with this round's log:
Round documents complete. Now the FULL GATE — stopping the dev server first (the session-4 lesson):
**FULL GATE GREEN** — lint 0/0 · tsc 0 · unit 631/631 · build · smoke 15/15 · e2e 63/63. Let me confirm the new noindex arm ran and re-run the census:
Census MATCH, noindex arm green. Final tree check + hygiene:
Hygiene clean. Now the Conventional Commit and the SSH-wrapper push — reading the runbook first:
I have the shim recipe. First, the Conventional Commit:
Commit created. Now deploying the key + paramiko shim (outside the repo) and pushing:
Dry-run green — `899ec82..0dd57ca` would land on main. Executing the real push:
**Pushed to main — remote verified @ 0dd57ca.** Now shredding the operator key and final verification:
Session 27 is complete and shipped. Final summary:

## Round summary

**Baseline:** pulled to `899ec82` (the owner's session-26 log), gate GREEN at the documented counts (629/629, census MATCH); neo-crm unchanged (`b3d0fbe`); every standing ask re-verified in place — `.env` `DATABASE_URL="file:../db/custom.db"` with `db/` at the repo root, vitest + playwright suites current, sitemap/robots/manifest/OG live-fresh, `skills/` excluded from every gate, `.env.example` present and matching the six-knob contract.

**Audit** (3 parallel subagents + hand-verification): **0 Critical / 0 High / 1 Medium / 5 Low / 10 Info**.

**Parity walk** (live, both sides, logged into the reference — mobile menu at 390×844, head census on 5 routes, footer Product column, sitemap/robots, desktop nav, generator round-trip): **NO DRIFT — the first fully-clean walk since session 24.** The mobile menu is byte-identical (panel max-height `none`, transparent bar with menu open, links + pill exact); the one computed-color difference (oklab vs rgba spelling on the scrolled bar) was numerically verified to be the same color — not a drift.

**Cures (TDD, +2 pins, every mutation battery on record):** S27-1 the Generate Post + Send Message focus rings (the house teal-600 family, live-verified on the dev server), S27-2 the launch-shape `file::memory:` pass-through (the S26-9 sibling on the standalone-launch arm — the misroute was live-reproduced pre-cure), S27-4/S27-5/S27-7 pin-hardening (the unreachable negative arms re-anchored, the drifting literal frozen, the single-quote census arm), S27-6 the 404 `noindex` superset pinned via an e2e arm, S27-3 the login-card comment-truth fix.

**Verified:** full gate GREEN — lint 0/0 · tsc 0 · unit **631/631** (38 files) · build · smoke 15/15 · e2e **63/63** (9 specs) · census MATCH · badge 694. Captures 61/62 PIL-verified. Six docs + SKILL v1.23.0 in lockstep.

**Shipped:** commit `0dd57ca` on **main** (no new branches), pushed via `docs/ssh_git_wrapper_v3.py` (dry-run first, remote ref verified, key + shim shredded), 20 files +628/−137.

**Deferred to owner:** the quota cross-tab `storage` sync (reference parity — a deviations-ledger superset opportunity), the scryptSync async lift, and the `__Host-` cookie/no-store hardening notes — all recorded in the accepted register with reasons.
