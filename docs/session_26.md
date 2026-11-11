The workspace exists from the previous session. Let me refresh it and check the current state.
Workspace refreshed — session 25 doc is new since the last session. Let me set up the task plan and review the core documentation.
Session 24 shipped `939358a`; `docs/session_25.md` confirms this round is **session 25** opening from `20c8468`. Let me review the remaining core docs.
Now let me review the PAD key sections and validate the baseline against the documented session-24 ship.
Core docs reviewed. Now validating the baseline gate and standing asks.
Standing asks verified. Now running the baseline gate (lint → typecheck → unit).
Baseline GREEN — lint 0/0 · tsc 0 · unit 613/613 (38 files), matching the session-24 ship. Running the census + verifying SEO surfaces.
Baseline fully verified: census MATCH, SEO surfaces present (sitemap.xml, robots.txt, manifest.json as route handlers), 9 e2e specs. Now loading the repo skills for the audit phase.
Skills loaded. Now let me examine the recent session-24 changes to focus the audit.
Session-24 changes mapped. Dispatching three parallel audit subagents per the established session pattern.
All three audits returned: combined **0C / 0H / 1M / 6L / 9I**. Now hand-verifying the load-bearing findings in source before adjudication.
M-1 and L-1 confirmed in source. Now verifying the remaining findings.
L-1 confirmed — the true retired form was `599/599` but the pin computes `606/606`. Verifying the remaining findings.
All findings verified. Let me double-check the teal-600 contrast figure claim (AUDIT-2 I-1) with a quick computation.
Figure confirmed wrong (3.74:1 actual). Now examining the established focus-map and status-announcement patterns for the planned cures.
All findings verified and the family patterns mapped. Now the **parity walk** — live comparison against the reference site. Let me check the agent-browser tooling first.
Now starting the parity walk. Setting up a session and logging into the reference site.
Logged in — landed on `/Home` (expected). Running the five-route head census on the reference.
Head census: **NO DRIFT** — session-19 description family holds. Now the critical mobile-menu census at 390×844.
Reference hamburger still carries **NO aria family** — session-23 superset stance holds. Opening the menu for the control census.
Reference mobile-menu census captured. Now the desktop nav family on the reference.
Desktop family captured. Checking footer CTA, sitemap/robots on the reference.
Reference census complete. Now booting our clone's dev server for the side-by-side comparison.
Dev server died between calls. Restarting with a persistent approach.
The log shows requests served — possibly an IPv6/IPv4 mismatch. Testing 127.0.0.1 directly.
The harness kills the process tree between commands. Let me try proper daemonization options.
The harness reaps background processes between commands. I'll run the clone-side census in a single command block that starts the server, walks it, and stops it.
Desktop nav, head family, generator, Escape+focus-return all verified. Two selector misses (footer, menu classes) — let me check the navbar/footer markup to fix my probes.
Our menu omits `bg-slate-900` over the hero (the documented S22-5 transparent-panel replication) — my selector was wrong. Re-running the two missed probes with correct selectors.
Menu census + auto-close + footer verified. One difference to check: our footer has 11 links (includes Contact), the reference showed 10. Re-probing the reference footer carefully.
The dossier documents the reference footer Product column as Home/Tool/Pricing — ours maps all 4 NAV_ROUTES including Contact. Let me verify this drift definitively with a fuller probe.
**Drift confirmed (S25-1)**: reference footer Product column = Home/Tool/Pricing only; ours ships Contact too. Let me complete the walk with a heading-tree comparison on both sides.
Heading trees **identical**. Parity walk complete — one drift found (footer Product column). Now examining the fix targets before writing the plan.
All anchors verified. Now writing the session-25 remediation plan.
Pin landscape mapped. Writing the session-25 remediation plan.
Plan written and anchors validated. Now executing **Batch 1: the parity cure (S25-1)** — RED pin first.
Let me refine the pin — the broad regex would false-positive against the cure's own filter line. Fixing it now.
Now the S25-2/S25-3 RED pins in a11y-controls.test.ts. Let me read the file structure first.
All tools (Bash, Read, Glob) are now consistently failing — 7 consecutive failures across different tools. I have to pause the execution here.

## Session 25 progress so far (work is preserved on disk)

**Completed:**
1. **Workspace refreshed** — `git pull` → `20c8468` (session_25.md handoff confirmed this round as session 25, opening from session-24's `939358a`)
2. **Docs reviewed in full** — AGENTS, CLAUDE, README, PAD, SKILL v1.20.0, session-24 set, worklog
3. **Baseline verified GREEN** — lint 0/0 · tsc 0 · unit **613/613** (38 files) · census MATCH · all standing asks re-verified (`.env` `DATABASE_URL="file:../db/custom.db"` with `db/` at repo root, vitest+playwright suites current, sitemap/robots/manifest/OG live-verified, `skills/` excluded from every gate, neo-crm unchanged at `b3d0fbe`)
4. **Audit complete** (3 parallel subagents + hand-verification): **0 Critical / 0 High / 1 Medium / 6 Low / 9 Info** — the Medium is the generator-card's silent success states (WCAG 4.1.3, the S24-3 genus one file over)
5. **Parity walk (both sides, live)**: head census, desktop nav, mobile menu + behaviors, sitemap/robots, heading tree, generator round-trip — all identical. **ONE DRIFT FOUND**: the footer's Product column — the reference ships Home/Tool/Pricing (3 links), ours maps all 4 NAV_ROUTES (extra Contact, shipped since session 1)
6. **Session-25 remediation plan written and validated** — `docs/plans/2026-11-11-session25-footer-column-parity-generator-status-superset-paywall-focus-landing-and-audit-batch.md` (13 findings, 6 TDD batches)
7. **Batch 1 RED pin written** — the footer Product-column parity pin in `tests/landing-page.test.ts`

**Remaining:** the GREEN cures (S25-1…S25-13), full gate, screenshots, docs lockstep, commit + push via SSH wrapper.

The tool calls are timing out frequently. Please click the **restart** button in the top right corner to restart the session and try again — the plan document and the RED pin are already on disk, so the next run can resume from Batch 1's GREEN cure (the `FOOTER_ROUTES` fix in `footer.tsx`).

Cloned at `20c8468` — the documented session-25 opening point. Now the neo-crm reference clone (shallow) and dependency install.
Database seeded (1 user). Environment up. Now the docs review phase — starting with the session-25 handoff and the docs structure.
`docs/session_25.md` confirmed: it's the session-24 round log with the standing handoff — this round is **session 25** opening from `20c8468`. Now reading the core docs.
Docs review complete — everything matches the session-24 ship. Now the baseline gate.
One unit failure on the fresh clone — unexpected against the documented 613/613. Investigating.
The failure is my own setup artifact: `npm install` minted a `package-lock.json`, violating the single-lockfile doctrine (F-174c pins bun.lock only). Removing it and using the sanctioned installer.
Baseline GREEN: **lint 0/0 · tsc 0 · unit 613/613 (38 files) · census MATCH** — matches the session-24 ship. Verifying the standing asks.
All standing asks verified. Now the audit phase — loading the repo skills first.
Web-application skill loaded. Now mapping the session-24 change surface to focus the audits.
Session-24 change surface mapped. Dispatching the three parallel audit subagents (the established session pattern).
All three audits returned: combined **0C / 0H / 5M / 12L / 13I**. Now hand-verifying the load-bearing findings in source before adjudication.
Both Mediums confirmed. Verifying the toast const, siteUrl query escape, and the test-suite findings.
All findings hand-verified in source. Adjudication complete — the working register: **0C/0H/5M/12L/13I**, with the five Mediums and a curated set of Lows/Infos to cure. Now the parity walk against the live reference.
Logged in — landed on `/Home`. Running the parity census, footer Product column first (the previous session's drift finding).
**Drift re-confirmed live (S25-1)**: the reference footer Product column = Home / Tool / Pricing — 3 links, no Contact. Checking our clone's footer source.
Confirmed: our footer maps all 4 NAV_ROUTES; the reference ships 3. Now the rest of the reference census — head family, then the mobile menu at 390×844.
Reference hamburger: `md:hidden p-2 text-slate-300`, **no aria family** — the session-23 superset stance holds. Opening the reference menu for the control census.
Reference mobile-menu census captured — menu links/pill match our S22-3/S21-1 re-anchors, nav keeps all 4 links, footer Product = 3 links. Now booting our clone's dev server for the side-by-side.
Server persists across commands. Running the clone-side census — footer first.
Both sides confirmed: clone ships 4 Product links (extra Contact), reference ships 3. Now the clone's mobile-menu census + behaviors.
Clone menu family byte-identical (links + pill); hamburger carries our documented aria superset. Verifying Escape-close + focus return.
Clone nav is a fixed element (offsetParent null — expected). Desktop family captured. Now the reference's desktop census for byte-comparison.
Heading trees identical; desktop links byte-identical. Completing the walk — sitemap/robots on both sides + generator round-trip.
Sitemap/robots identical (origin-difference only). Now the generator round-trip on our clone.
Generator round-trip green. **Parity walk complete — ONE drift (S25-1 footer Product column)**. Now examining the fix targets and pin landscape before writing the plan.
The generator-card cure sites are clear. Let me check the login-card's S19-10 focus-map idiom to mirror for the paywall swap.
The S19-10 idiom is clear. Checking the remaining cure targets — http-headers pins, FREE_LIMIT placement, and the dossier's footer record.
All targets surveyed. Now writing the session-25 remediation plan — first checking the house plan format.
All cure sites mapped. One last survey — where siteUrl is pinned, then writing the plan.
Survey complete. Writing the session-25 remediation plan.
Plan written. Now validating the execution anchors against the codebase before executing.
All anchors validated — the plan is executable as written. Starting **Batch 1: the parity cure (S25-1)** — RED pin first.
**S25-1 RED confirmed** — exactly the new pin, exactly the right reason. Now the GREEN cure.
**Batch 1 GREEN** (32/32; mutation battery proven by the RED run). Now **Batch 2: the a11y cures** — reading the pin homes first.
Writing the Batch-2 RED pins. First checking the error-boundaries and toast-anatomy structures.
Now the S25-8 and S25-9 pins in their homes.
**Batch 2 RED confirmed** — 7 new pins RED, 52 others GREEN. Applying the GREEN cures — generator-card first.
Order bug — the effect's dep array references `limitReached` before its declaration (TDZ). Fixing the order.
Now the S25-3 ring cures, S25-8 boundary alerts, S25-9 glyph, and S25-16 navbar focus.
Two pin bugs to fix: toast-anatomy's `read` scope and the S25-3 ban catching the DOM-record comment.
The ternary's closing `)}` is missing before `</>`. Fixing.
**Batch 2 GREEN** — tsc clean, 91/91. Running the full suite to catch any co-pin trips.
The two census trips are the designed mid-round REDs (count re-anchor comes in Batch 6). Proceeding to **Batch 3: the correctness cures** — RED pins first.
Writing the Batch-3 RED pins — siteUrl, boot-env, toast store.
**Batch 3 RED confirmed.** Applying the cures — site.ts guard first.
Now the toast store init (S25-7) — restructuring the declaration order.
**Batch 3 GREEN** — 73/73, tsc clean. Now **Batch 4: the pin-doctrine cures**.
S25-5 done (−4 retired, 17/17). Now S25-6 — the OG_IMAGE pin and cure.
Expected co-update — the S24-11 arm's declared-side literal moved into the const. Updating it.
S25-6 GREEN. Now the remaining Batch-4 items in docs-counts, http-headers, and the e2e spec.
Now S25-11 — the Appendix-B guard fix.
**S25-11 mutation battery RED→restored** — the guard now fires for real. Now S25-12 — retiring the http-headers trio.
Now S25-17 (e2e og:url fold-in) and S25-18d (skip-link redundant assertion).
Only the two designed census REDs remain — **Batch 4 complete**. Now **Batch 5: maintainability cures** — S25-13 ContactSection first.
Now updating both pages to render the shared component.
Now the S25-13 pin + order-pin co-update in landing-page.test.ts.
S25-13 GREEN, but the `/s` regex flag trips the pre-es2018 target. Replacing with `[\s\S]`.
tsc clean, 7/7. Now **S25-14 — the FREE_LIMIT boundary move**.
S25-14 RED confirmed. Applying the move.
S25-14 GREEN. Now the S25-18 hygiene batch.
Now S25-18e — the SKILL Appendix A chronological re-sort.
Batches 1–5 complete — lint 0/0, tsc 0, only the two designed census REDs remain (live count: **620**). Now **Batch 6: the count re-anchor**. Checking the PAD §12 rows first.
PAD §12 GREEN. Now the count constants and every doc site.
The census walks the doc sites RED as designed. Updating every site.
**Census GREEN — 25/25.** Now the remaining docs lockstep: SKILL version, Appendix A row, README/AGENTS rows, worklog, session log.
Census GREEN. Now the full gate on the exact tree — stopping the dev server first (the session-4 lesson).
E2E setup failed — investigating.
The fresh sandbox lacks the Playwright chromium build. Installing it.
My S25-2 status node collides with the e2e quota locator (strict-mode: two matches). Fixing the e2e locator with the house idiom.
**FULL GATE GREEN — lint 0/0 · tsc 0 · unit 620/620 · build · smoke 15/15 · e2e 63/63.** Now the captures — restarting the dev server.
Footer cure live-verified — 3 links, no Contact. Taking the captures.
Paywall + status + silent mount-settle all verified live. Capturing 58.
Both PIL-verified. Quick visual check of the cured footer region in capture 57.
Vision isn't available here — the DOM-level live verification (3-link footer confirmed from the running remediated code) plus PIL non-blank checks stand as the capture evidence. Final live check of the status announcement, then the round documents.
Node A live-verified ("Post generated — 2 free generations remaining today."); node B shares the identical mechanism (source-pinned; the copy round-trip is e2e-green under proper clipboard permissions — the headless clipboard denial correctly took the toast.error catch path). Now the round documents — worklog first.
Now the plan's post-execution record and the session log.
Now replacing `docs/session_25.md` with this round's log.
Round documents written. Final verification pass on the exact commit tree.
Tree is clean — 40 modified + 3 new (plan, 2 captures), no secrets. Checking the house commit format, then committing.
Commit `8856303` created on main. Now the SSH wrapper push — reading the runbook first.
No `ssh` binary — checking the paramiko shim path (Appendix A of the runbook).
I have the complete shim. Executing the field-tested push sequence — shim, key, sanity check, dry-run.
Dry-run green — `20c8468..8856303` would land on main. Executing the real push.
**Session 25 complete — pushed `8856303` to main, remote verified, keys shredded, working tree clean.**

Note: the sandbox had been recycled since the last session (the old `/tmp` workspace was wiped), so I re-cloned at `20c8468` and re-executed the full round from scratch, re-verifying every finding live rather than trusting the prior session's uncommitted work.

**The round:**
- **Baseline** GREEN at the documented counts (613/613 · census MATCH); all standing asks re-verified (.env `file:../db/custom.db`, vitest/playwright, SEO surfaces, `skills/` excluded, neo-crm unchanged)
- **Audit** (3 subagents + hand-verification): 0C / 0H / 5M / 12L / 13I
- **Parity walk** (both sides, live): **one drift** — footer Product column shipped 4 links vs the reference's 3 (Home/Tool/Pricing); everything else byte-identical, mobile menu family + Escape/focus-return verified
- **Cures (TDD, +14 pins −7 retired, mutation batteries on record)**: footer parity (S25-1), generator status announcements (S25-2, live-verified "Post generated — 2 free generations remaining today."), auth-ring AA upgrade (S25-3), siteUrl non-bare-origin guard + boot warning (S25-4), pin-doctrine sweep (S25-5/6/11/12), toast store seed + glyph contrast (S25-7/9), boundary role=alert (S25-8), paywall + menu-click focus landings (S25-15/16, mount-settle verified silent), ContactSection dedup (S25-13), FREE_LIMIT client-boundary move (S25-14), hygiene batch (S25-18)
- **Final gate**: lint 0/0 · tsc 0 · unit **620/620** (38 files) · build · smoke 15/15 · e2e **63/63** · census MATCH · badge 683
- **Deliverables**: captures 57/58 (PIL-verified), `.env.example` verified exact, six docs + SKILL v1.21.0 + worklog + session log + plan post-execution record all in lockstep — 42 files, +1115/−255

The standing instruction can run again as session 26 on `8856303`.
