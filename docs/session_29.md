工作区已存在。我来更新这两个仓库并检查它们的当前状态。
Pull succeeded — `docs/session_28.md` was added (project now at session 28). Let me set up the task plan and begin Phase 1 doc review.
Now reading README, PAD, and SKILL docs.
The persisted output is nesting. Let me read the README tail directly in chunks.
README reviewed. Now the PAD and SKILL docs.
Now the SKILL doc (distilled engineering memory).
I have the SKILL essentials. Let me quickly check its Appendix B tail, then read the session docs.
`docs/session_28.md` holds the session-27 execution narration (the owner's established pattern). Let me confirm the commit and read the session-27 plan + worklog tail.
Now the worklog tail (Task 27 entry).
All Phase 1 docs are reviewed. Now validating understanding against the codebase — the standing asks and the baseline gate.
Standing asks verified in place. Running the baseline gate (lint → typecheck → unit).
Baseline GREEN at documented counts. Now the census + SEO surface verification.
Phase 1 complete — baseline validated (lint 0/0 · tsc 0 · unit 631/631 · census MATCH · all standing asks in place). Now Phase 2: reviewing repo skills for the audit.
The web-application skill family is internalized (the repo's own SKILL.md is its project distillation, which I've read in full). Now dispatching the three parallel audit subagents per the established session pattern, focused on recent changes.
All three audits returned — combined **0 Critical / 0 High / 3 Medium / 8 Low / 10 Info**. Now the lead's hand-verification of every load-bearing finding in source.
A3-M1 and A1-L1 confirmed in source. Checking the boot-env warning posture and the sitemap escaping.
A3-M1 confirmed as an unconsidered gap (the S25-4 doctrine says "anything else is an operator paste error" but pathname wasn't implemented). Verifying the remaining findings.
All findings verified. Let me check the design-tokens census mechanics to scope the A2-L1 cure properly.
All load-bearing findings hand-verified. Now checking neo-crm donor state and booting for the Phase 3 parity walk.
neo-crm unchanged (`b3d0fbe`) — recorded stack decisions stand. Now Phase 3: the live parity walk. Booting the clone's dev server.
Dev server up. Writing the parity walk census script.
The reference has no aria-label on its hamburger (the documented S23-1 posture). Fixing the locator to match by shape.
Head census: **NO DRIFT** (all titles/descriptions/OG byte-identical; og:url/canonical differ by origin only). Footer: documented superset (real social links vs `#` stubs) + Product column 3 links both sides. Mobile menu needs a panel probe fix for the reference (their panel has no id). Focused follow-up:
The reference's mobile links are byte-identical to the clone's. The pill probe caught the desktop pill — isolating the mobile panel pill for both sides.
The browser log confirms the reference still rides the Tailwind CDN (v3-era posture — the documented context). The CLONE leg of this probe crashed; running a minimal dedicated probe for the reference's mobile pill + panel container.
The reference's mobile panel: `md:hidden bg-slate-900/98 border-b border-white/10 overflow-hidden` (the documented dead `bg-slate-900/98` computing transparent — our clone's panel renders identically), max-height none both sides. My oklab conversion had a gamma-encoding bug — redoing it correctly, plus the desktop-nav and sitemap/robots comparison.
oklab→sRGB verified: exact match `rgb(15,23,42)` — same color, different spelling. Sitemap/robots identical modulo origin. Now the desktop nav family probe on the clone.
**PARITY WALK COMPLETE — NO DRIFT** (second consecutive clean walk): desktop nav byte-identical, mobile menu byte-identical, head census clean, sitemap/robots identical modulo origin, scrolled-bar color numerically identical. Now validating cure-site anchors before writing the session-28 plan.
All anchors validated. Checking the `stripComments` helper form used by api-robustness (to reuse in design-tokens), then writing the session-28 plan.
All anchors validated. Writing the session-28 remediation plan.
Plan written. Now executing with TDD — **Batch 1: RED pins first**. Adding the S28-1 pin beside the S25-4 arm.
Now the S28-3 pin — extending the S16-1 describe in api-robustness.test.ts with the generate arm.
Now the S28-4 hardening — comment-stripping the dead-token census in design-tokens.test.ts.
Now the S28-2 and S28-6 pins in docs-counts.test.ts. Viewing the reality-census describe for the insertion point.
Adding the S28-6 smoke census (inside the reality-census describe) and the S28-2 .env.example direction arm.
Now the S28-5 pin — viewing the a11y-controls structure around the reset-password screen arm.
All Batch-1 pins in place. Verifying the RED state — exactly the designed failures must occur.
**RED CONFIRMED** — exactly the 5 designed failures, each for the right reason (the census also confirms 636 source blocks on disk = 631 + 5 new pins). Now **Batch 2: GREEN cures**.
Now the boot-env S22-19 warning-text truth update (the path no longer "flows" — the seam falls back).
Now the S28-3/S28-8 cure in generate/route.ts.
Now the S28-4 cure (retire `--color-subtle`) and the S28-5 cure (minLength).
The comment I added spells `text-subtle` — checking whether the step-less census (reverse direction) is comment-blind, else my own comment will false-RED.
The step-less census scans RAW text including globals.css and picks English fragments out of comments — my new comment AND the existing toast.tsx comment spell `text-subtle`, which would false-RED after the retirement. Rewording both per the S25-3 literal-context discipline.
Now the S28-5 cure — minLength on both reset-password inputs.
Now the S28-7 comment-truth cures (site.ts dashboard bullet + schemas.ts constant-shape).
All cures in place. Verifying the GREEN state.
The step-less census caught a `concat` fragment from my new comments — finding the exact source text.
The scan reads `stRING-concat` as a `ring-concat` utility (the documented S17-5 English-fragment genus). Rewording my comment to the space form.
design-tokens + page-tools GREEN; the two docs-counts REDs are the designed count re-anchors. Now **Batch 3: mutation batteries** — proving each pin can fire.
The chain timed out mid-run (files verified in cured state — restores happened). Re-running the batteries individually.
Battery 6's plant didn't remove the marker (appended text only). Fixing the plant to actually drop a leg.
All 6 mutation batteries proven RED→GREEN. Now **Batch 4: count re-anchor + docs lockstep**. Getting live counts first.
636 unit tests on disk (the 2 failures = the census awaiting re-anchor). site.ts 219, globals.css 226. Re-anchoring the constants.
The census is walking me site by site. Re-anchoring every doc site.
Census GREEN. Now the remaining docs lockstep — the count-ladder comment, README session-28 row, AGENTS plans map, SKILL version/Appendix, PAD ADR-006 reword.
Now the PAD ADR-006 reword (S28-9), README session-28 row + gate line, AGENTS plans map, SKILL version + Appendix A row.
SKILL §4 documents the token block — checking for the `--color-subtle` mention to update in lockstep.
Now the SKILL version bump + Appendix A session-28 row.
Now the README session-28 row + gate line, and the AGENTS plans map entry.
Now running the full unit suite + lint + typecheck before writing the final round documents.
**GREEN: lint 0/0 · tsc 0 · unit 636/636.** Now live-verifying the cured surfaces on the dev server + taking captures. Checking the capture numbering convention first.
**LIVE-VERIFIED** — the generate route answers the parseBody vocabulary for non-object bodies, and the happy path is unchanged. Taking captures 63/64.
The un-tokened view has no password inputs — minting a real reset token via the in-app flow to capture the cured surface.
**LIVE-VERIFIED** — both password inputs carry `minLength: 8`. Now stopping the dev server (the session-4 lesson) and running the full gate.
**FULL GATE GREEN.** Final census + hygiene check, then the round documents.
Census MATCH, tree clean. Writing the round documents — plan post-execution record first.
Now the worklog Task 28 entry and the session_28.md round log.
Round documents complete. Now Phase 8 — reading the SSH wrapper runbook before the push.
I have the full recipe. Deploying the shim outside the repo, then making the Conventional Commit.
Commit created (22 files, +728/−120). Now deploying the operator key outside the repo and running the dry-run push.
Dry-run green — `af63c73..fd6c75b` would land on main. Executing the real push.
The wrapper's own step-6 verification already confirmed the remote (`refs/heads/main @ fd6c75b == local HEAD`) — the direct ls-remote needs the key the wrapper manages internally. Cleaning up the shim.
Session 28 is complete and shipped. Final handoff:

## Round summary

**Baseline:** pulled to `af63c73` (the owner's session-27 execution log); gate GREEN at the documented counts (631/631, census MATCH); every standing ask re-verified — `.env` `DATABASE_URL="file:../db/custom.db"` with `db/` at repo root, vitest + playwright suites current, sitemap/robots/manifest/OG fresh, `skills/` excluded from every gate, `.env.example` matching the six-knob contract. neo-crm unchanged (`b3d0fbe`).

**Audit** (3 parallel subagents + hand-verification): **0 Critical / 0 High / 3 Medium / 8 Low / 10 Info.**

**Parity walk** (live, both sides, logged into the reference — mobile menu at 390×844, five-route head census, footer Product column, sitemap/robots, desktop nav, generator round-trip): **NO DRIFT — the second consecutive fully-clean walk.** The scrolled bar's oklab background was re-derived in-session (gamma-encoding corrected) to exactly `rgb(15,23,42)` — the reference's slate-900; the reference still rides the Tailwind CDN (v3-era posture).

**Cures (TDD, +5 pins, 6 mutation batteries on record):** S28-1 the siteUrl path-carrying fallback (the S25-4 genus closed for the last shape — a path-carrying origin now falls back instead of riding unescaped into the sitemap's `<loc>`); S28-2 the `.env.example` knob census (exact set equality, both directions); S28-3 the generate route's non-object body now answers "Invalid request body" like every sibling (live-verified via `curl -d '"hello"'`) + the S28-8 Retry-After floor; S28-4 the dead-token retirement with a comment-blind census; S28-5 `minLength={8}` on the reset screen's password pair (live-probed via a minted reset token); S28-6 the smoke-leg disk census (the last uncounted count site); S28-7/S28-9 the comment-truth batch.

**Verified:** full gate GREEN — lint 0/0 · tsc 0 · unit **636/636** (38 files) · build · smoke 15/15 · e2e **63/63** (9 specs) · census MATCH · badge 699. Captures 63/64 PIL-verified under `docs/screenshots/`. Six docs + SKILL v1.24.0 in lockstep.

**Shipped:** commit `fd6c75b` on **main** (no new branches), pushed via `docs/ssh_git_wrapper_v3.py` (dry-run first, remote ref verified, key + shim shredded), 22 files +728/−120.

**Deferred to owner:** the in-app delivery default flip (S13-1 posture — an owner-level deviations-ledger decision), the scryptSync async lift, the `__Host-` cookie/no-store hardening notes, and the parseEnvFile unterminated-quote robustness — all recorded in the accepted register with reasons.
