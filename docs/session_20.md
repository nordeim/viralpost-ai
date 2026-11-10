I'll start by internalizing the operating instructions and setting up the workspace. This is a large multi-phase task, so let me create a structured plan first.
Repo cloned. Now let me read the core documentation files to understand the project.
Now let me read the persisted PAD and SKILL files, and locate the repo skills catalog.
Now let me check the specific skills mentioned by the user (tdd, agent-browser, clone-app-pat-pro, tailwind) and the current codebase state.
Workspace state confirmed: fresh clone, no `.env`, `db/` empty. Let me install dependencies and set up the environment.
DATABASE_URL contract verified end-to-end (`file:../db/custom.db` → repo-root `db/custom.db`, census MATCH). Now running the baseline gate.
Baseline GREEN: lint 0/0 · tsc 0 · unit 550/550 (37 files). Now validating the codebase against the user's specific focus areas.
All focus areas verified in the documented state. Let me update progress and check the neo-crm reference repo for drift, then dispatch the audit.
neo-crm unchanged at `b3d0fbe` — recorded decisions stand. Now let me read the agent-browser skill for the parity walk methodology.
agent-browser available. Now dispatching the comprehensive audit — three parallel subagents covering different areas (session-18 pattern), while I run the live reference parity walk myself.
Three audit reports received: **AUDIT-1: 0C/0H/2M/2L/6I · AUDIT-2: 0C/0H/0M/4L/10I · AUDIT-3: 0C/0H/0M/4L/10I**. Now hand-verifying the load-bearing findings in source before the parity walk.
L-4 confirmed. All load-bearing findings hand-verified. Now the live parity walk — starting the clone's dev server and walking the reference side by side.
Logged into the reference. Now checking the mobile menu at 390×844.
**Drift detected**: the reference's `og:description` is now **prefixed** ("Tool on ViralPost AI. …") on /Tool, /Pricing, /Contact — the session-8 census recorded the plain unprefixed paragraph, and the clone retired the prefix (F8-1). Let me confirm the exact shape.
Precise drift confirmed on all three sub-routes. Let me analyze the exact truncation rule with code.
The reference now ships `"<Page> on ViralPost AI. " + 70-char word-boundary-truncated description` on the three sub-routes. Let me do a full head census on /Tool to catch any other drift.
Drift is confined to the description family. Now checking the clone's current output for the delta, plus sitemap/robots on the reference.
**Second drift detected**: the reference's landing no longer renders the PT (Portuguese) monetization section — no Portuguese text anywhere in the DOM, and a Contact h2 appears. Let me walk the clone's landing to compare.
The reference swapped the PT monetization section for an **EN** version ("Download Free. If It Helps You, Help Us Too."). Let me extract its full structure.
Let me extract the reference's benefit icons and check the reference-investigation dossier for the PT section's original form.
The section has more icons than expected. Let me map the full structure.
Ten floating icons — this is a full section redesign. Let me check if other reference sections have floaters too, and get exact icon sizes/animation.
Full reference contract captured. Now walking the clone's dev server at 390×844 — the mobile menu family.
Mobile menu family fully verified on the clone (Escape + focus return + auto-close + derived title). Let me check remaining details: whether the monetization section appears on other reference routes, and what the clone's tests pin.
Strict parity confirmed: reference pricing cards reveal, header doesn't. Now checking the clone's test pins for these surfaces.
I have the complete findings picture. Let me check the remaining small items before writing the plan.
All details confirmed. Now writing the session-19 remediation plan with the detailed ToDo list.
Plan written. Now validating it against the codebase — checking the four test files where pins will land.
All structures confirmed. Executing **R19-1 (description family)** — RED pins first in page-titles.test.ts.
**RED confirmed** — exactly the 3 rewritten pins fail. Now the GREEN cure in site.ts.
GREEN 16/16. Now the e2e leg pinning the live `/Tool` description family.
I need to fix the /login assertion — it must expect the full plain description, not a slice.
Now the R19-1 mutation battery — break the truncation, expect the pins RED.
R19-1 complete (mutation battery: 2 RED → restored GREEN). Now **R19-2** — RED pins for the monetization redesign.
**RED confirmed** — exactly the 4 pins fail. Now the GREEN cure: the FloatingIcons client island first.
Before writing the section, let me verify the icon order inside the CTAs and badge on the live reference.
Exact structure captured (icons precede text in CTAs; heart + trailing arrow in CTA 2). Now writing the `MonetizationSection`.
Now update the landing page import and the e2e heading pin.
The pin expects an unwrapped string but Prettier breaks the line. Splitting the pin at the natural break.
GREEN 23/23. Now the R19-2 mutation battery.
R19-2 complete (2 mutation batteries RED→restored→GREEN). Now **R19-3** — the RED regression for the stream-error closure.
**RED confirmed** — the errors reject past the seam. Now the GREEN cure in api.ts.
R19-3 GREEN (44/44). Now **R19-4** — the verify lockout burn pin.
R19-4 GREEN. Now **R19-5** — toast a11y pins (RED first).
The import is `AlertCircle`, not `AlertCircle2` — fixing both the edit and my test pin.
R19-5 GREEN (12/12). Now **R19-6** — the particle resize pin (RED first).
R19-6 GREEN. Now **R19-7** — the login view-swap focus map. Let me examine the card structure.
The pin counts 6 because the querySelector + comment also contain the string. Tightening the count to JSX attribute form.
R19-7 GREEN. Now the remaining batch cures (R19-8 → R19-13).
R19-9/R19-10 verified (`.mts` back in the tsc program). Now **R19-11** — the proxyless shared-bucket warning.
Now the PAD/SKILL runtime-deps re-anchor and the PAD §12 header.
Expected census fallouts. Let me see all 5 failures, then fix systematically.
My own comment tripped the census ("auto-answer" → "to-answer", the session-18 genus). Rephrasing.
Censuses GREEN. Now the count re-anchors: UNIT 550→561, E2E 56→57, badge 606→618, PAD §12 rows.
The count-lockstep gate is now enforcing the docs update. Re-anchoring all count sites.
Full unit suite GREEN: **561/561 (37 files)** · lint 0/0 · tsc 0. Now live-verifying the cured surfaces on the dev server.
`og:description` is cured but the plain `meta description` inherits the root layout — `pageMetadata()` must also set the top-level `description` field.
Unit suite GREEN. Now the visual comparison of the cured monetization section against the reference.
Structure matches the reference exactly. Verifying the animation runs, then taking captures.
Animation verified (bob/rotate/pulse in the observed envelope). Taking captures 45/46.
Capture 46 came out at the wrong viewport. Let me find the right viewport command and retake.
The menu toggled closed (it was left open from the 1280 capture). Reopening and verifying before the shot.
Captures verified via DOM-state + PIL (this session's model can't view images directly). Now stopping the dev server and running the full gate.
Playwright browsers need installing in this fresh sandbox (same as session 18). Installing and re-running e2e.
E2E GREEN 57/57. Re-running the complete gate in one clean pass on the exact tree.
**FULL GATE GREEN**: lint 0/0 · tsc 0 · unit 561/561 (37 files) · build · smoke 15/15 · e2e 57/57. Now the docs lockstep. Checking the dossier's OG/PT entries first.
Census MATCH. Updating the evidence dossier with the session-19 re-captures.
Now the session_19.md round log and the plan's post-execution record.
All green. Final pre-commit review — checking the tree and reading the SSH wrapper runbook.
Runbook internalized. Creating the commit, then executing the push sequence.
Dry-run clean (fast-forward `dab5aef..a47c50b`). Executing the real push.
**Session 19 complete — pushed `a47c50b` to `main`, remote-verified, key shredded, tree clean.**

**What this round found (live parity walk, logged into the reference):** the reference changed since session 18 —
1. **The description family**: `/Tool` `/Pricing` `/Contact` now ship `"<Page> on ViralPost AI. " + a 70-char truncated tail` on meta/og/twitter description (the session-8 plain-paragraph finding re-anchored).
2. **The monetization section redesigned EN** — the PT copy replaced (new badge/H2/paragraph/benefits, both CTAs → Gumroad, lock trust line) plus **ten floating animated icons**.

**The audit** (3 parallel subagents, findings hand-verified): 0 Critical / 0 High / 2 Medium / 10 Low / 26 Info.

**All cured with TDD** (RED→GREEN, 5 mutation batteries): both parity drifts (`pageDescription()` + `MonetizationSection` + the `FloatingIcons` rAF island, pink-400/sky-400 palette pins), the **reader-envelope stream-error closure** (a live-reproduced raw-500 class), the verify-lockout scrypt burn, the toast aria-hidden + polite live region, the reduced-motion resize repaint, the login view-swap focus map, the pricing-header reveal retirement, the `vitest.config.mts` tsc-program hole, and the docs/lockstep batch (runtime-deps 8, `install_packages.sh` retired, smoke `GATE_PID` trap, proxyless shared-bucket warning).

**Your standing asks verified**: `.env` `DATABASE_URL="file:../db/custom.db"` + `db/` at root ✓ · vitest + playwright suites in place (hole closed) ✓ · sitemap/robots/OG/SEO cured to the live family ✓ · mobile nav parity confirmed both sides ✓ · Tailwind v4 censuses green ✓.

**Gate**: lint 0/0 · tsc 0 · unit **561/561** (37 files) · build · smoke 15/15 · e2e **57/57** · census MATCH. Captures 45/46 PIL-verified; six docs + SKILL v1.15.0 + badge 618 in lockstep; `session_19.md`, worklog Task 19, and the plan's post-execution record written.

Rerun the standing instruction anytime — it will pick up as session 20 against `a47c50b`.
