I'll pick up the task pipeline from the beginning. Let me set up the work plan and refresh the workspace first.
Workspace refreshed at session-13 state (`acec9aa`). Now reviewing the core docs.
Repo cloned. Now reading the core docs in parallel.
Session-13 was completed upstream (pushed `d98d24e` + log `acec9aa`). This run is the standing re-run against the merged tree. Reading the session-13 plan, worklog, and remaining core docs.
Session-13 shipped upstream; this round is the standing re-run (session 14). Reading remaining core docs — PAD and SKILL.
Now let me validate key facts: `.env.example`, `package.json`, configs, and the seam files.
State confirmed: `.env.example` committed with the correct `DATABASE_URL`, vitest+playwright configured, sitemap route present. Now the pristine-clone verification — install deps and set up `.env`.
DB anchored at repo root with census MATCH. Running the baseline gate — lint, typecheck, unit first:
Unit 528/528 (37 files) — matches the documented session-13 counts. Now the build:
E2E setup failed in the fresh sandbox — investigating:
Fresh sandbox lacks the Playwright browsers — installing:
**Full baseline gate GREEN** — lint 0/0 · tsc 0 · unit 528/528 (37 files) · build · smoke 15/15 · e2e 54/54 · census MATCH. The pristine clone verifies at the documented session-13 counts. Now the audit phase — reading the repo's skills catalog and web-application skill.
Skill internalized. Now checking neo-crm's HEAD for drift since session-13's review:
neo-crm HEAD unchanged (`b3d0fbe`) — session-13's adoption/deferral decisions stand. Now getting the session-13 diff surface to focus the audit:
Now I'll dispatch the comprehensive audit as a subagent while I run the live parity walk myself. First, checking the agent-browser tooling:
Dispatching the comprehensive audit subagent, then running the parity walk in parallel:
Subagent returned empty — retrying with a tighter prompt:
Audit returned: **0 Critical / 1 High / 3 Medium / 4 Low / 3 Info**. Note H-1 is the documented S13-1 posture (session-13 decided warn-never-fatal — recorded decision). Now hand-verifying the load-bearing NEW findings (M-1…M-3, L-1…L-4, I-1) against source:
M-1 and M-2 verified in source. Now verifying M-3, L-1, L-2 in the routes and schemas:
All findings verified in source. Now the live parity walk — starting the clone's dev server:
Logged into the reference. Now the critical mobile-menu check at 390×844:
Reference hamburger confirmed (no aria — the documented contract). Opening the reference's mobile menu:
Menu auto-closes on navigation (SPA title "ViralPost AI"). Hard-nav to `/Tool` to verify the title/OG/canonical contract:
Reference verified — no drift (title, OG family, canonical all match the documented contract). Now walking the clone's dev server:
Escape closes with focus return verified. Now navigation auto-close + the from_url round-trip:
`from_url=/Tool` round-trip verified live. Now the foreign-origin fallback (open-redirect guard):
**M-1 LIVE-CONFIRMED as a real open redirect** — the browser landed on `https://evil.com/?x=1`. This upgrades to the round's headline finding. Finishing the walk with the SEO endpoints:
Parity walk complete — no reference drift; clone surfaces verified except the live-confirmed open redirect. Now scoping the cures — reading the forgot-password route (M-3 pattern), api.ts (L-1), and pin surfaces:
Critical context — the forgot-password route documents an accepted timing-residual doctrine. Checking signup's enumeration posture (its point c):
Signup's 409 openly enumerates by design (parity-pinned) — so M-3's real leak is the *verification state* (which signup can't reveal). The shape+timing cure follows login's documented pattern. Now checking `api.ts` for the L-1 cure:
All pin surfaces mapped. Checking the from-url test structure and DEPLOYMENT.md proxy guidance:
Scoping nearly complete. Checking two last details — the schemas pins and the login-card's consumption of `verificationCode`:
All scoping complete. Writing the session-14 remediation plan:
Plan written. Validating against the auth-contract pin structure, then executing:
Structure validated. Executing **R14-1 (RED first)** — the from-url escape pins:
RED confirmed (exactly the 2 intended pins). Now the GREEN cure:
One backslash shape normalizes to a SAFE same-origin path (`/evil.com`, single slash) — my pin expectation was wrong, not the cure. Correcting the pin to assert the parser's actual normalization:
R14-1 unit GREEN (11/11). Adding the e2e escape leg — checking the existing from_url legs:
One flaw: `page.url()` is `about:blank` before the first navigation. Fixing to read the origin after landing:
R14-1 complete. Now **R14-2 (RED first)** — the resend/verify equalizer pins:
RED confirmed (exactly 3). Applying the GREEN cures — resend route first:
Now the verify route's equalizer + the password.ts comment update:
R14-2 GREEN. Checking the full unit suite for ripple effects:
The 3 failures are the expected docs-counts lockstep sites (constants + PAD inventory) — fixed at R14-9. Proceeding with **R14-3** (generate route intent pin), **R14-4** (schemas), **R14-5** (role=status), **R14-6** (toast focus), **R14-7** (boundary):
Now the intent comment in the generate route (the S14-3 cure):
R14-3 GREEN. **R14-4 (RED first)** — the password-max pin:
R14-4 GREEN. **R14-5** — InfoCallout to `role="status"` + pin re-anchor:
The pin's source may not be comment-stripped — my new comment mentions both role strings. Checking the helper:
`loginCardSrc()` reads raw source — my comment quoting both role strings would corrupt the counts. Rewriting the comment without the literals:
R14-5 GREEN. **R14-6** — the toast dismiss focus ring + pin:
R14-6 GREEN. **R14-7** — the reduced-motion boundary `>=` + pin:
R14-7 GREEN. **R14-8** — the DEPLOYMENT.md depth-0 availability note:
R14-8 done. Now the **mutation batteries** — proving each new pin non-vacuous. Battery 1 (from-url arm):
**All 9 mutation batteries PASSED.** Now the count re-anchor — establishing disk reality:
Confirmed: **UNIT 538 / SUITES 37 / E2E 55 / 9 specs / badge 593**. Executing the docs lockstep — census constants first:
The census enumerates every stale site. Executing the full lockstep — README first:
Now AGENTS, CLAUDE, PAD test-distribution, and SKILL:
Now the SKILL — v1.9.0 → v1.10.0 with the session-14 record:
The row contains curly quotes — using a shorter anchor for the insert:
Census GREEN. Full unit suite check, then the worklog entry:
My edit consumed the Task-13 header — restoring it between the two entries:
Now the plan's execution record:
Now the full gate on the remediated tree — lint, typecheck, then build:
**Full gate GREEN** — 538/538 · 15/15 · 55/55. Now the census + the periodic `bun audit`:
Same dev-toolchain advisory set as sessions 11–13 (eslint/prisma-CLI/vitest transitives; runtime surface clean). Now captures 35/36 — starting the dev server:
Both captures PIL-verified (menu open: 54.9% dark + amber CTA content). Now the commit — stopping the dev server and checking the tree:
Clean tree — all intentional changes. Reading the SSH wrapper runbook:
Runbook internalized. Committing first:
Committed `f6212a1`. No `ssh` binary — deploying the paramiko shim per the runbook:
Now materializing the operator key to a 0600 file in /tmp (never inside the repo), with a fingerprint sanity check:
Dry-run clean — authenticates and fast-forwards `acec9aa..f6212a1`. Real push:
**Session 14 complete — pushed `f6212a1` to `main`, remote-verified, key shredded.**

**What happened this round:** the pristine clone verified at the documented session-13 counts (full gate green, census MATCH), then the audit found a **live open redirect** — a same-origin `from_url` with a leading `//` path passed the session-13 seam's origin check but landed the browser on `evil.com` (reproduced live on the dev server). Closed by TDD with the leading-`//` pathname arm, 3 unit pins, and an e2e leg. Also cured: the resend/verify enumeration oracle (uniform shape + scrypt timing equalizers), the password ceiling asymmetry, the toast focus ring, the polite InfoCallout role, and the reduced-motion boundary — each backed by mutation batteries.

**Verified:** lint 0/0 · tsc 0 · unit 538/538 · build · smoke 15/15 · e2e 55/55 · census MATCH; parity walk shows no reference drift; docs/SKILL v1.10.0 lockstep; captures 35/36.

**Next:** the standing re-run can be re-issued anytime against the merged tree; deferred debt (delivery polarity posture, signup count race, reveal SSR opacity) is recorded in the session-14 plan.
