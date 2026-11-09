The workspace exists with prior progress. Let me set up my task plan and refresh the workspace first.
Workspace refreshed — pulled 1 new commit (`docs/session_10.md`). Now reviewing the core docs.
Session 10 shipped the dev-origin hydration cure and palette re-pin. This is the standing next round. Let me review the core docs now.
Now let me read the session-10 plan and worklog.
Docs reviewed. Now let me validate my understanding against the codebase — checking the key files and environment.
Environment checks pass: `.env` has `DATABASE_URL="file:../db/custom.db"`, `db/` at root, `allowedDevOrigins` cure in place. Now running the baseline gate to confirm pristine state.
Unit suite green at documented counts (463/32). Now the production build.
**Full baseline gate GREEN** — lint 0/0 · tsc 0 · unit 463/463 (32 files) · build · smoke 15/15 · e2e 49/49. Matches documented session-10 counts exactly. Now the census + skills catalog review.
The baseline is verified. Now let me examine the session-10 diff (the recent changes to audit) and dispatch the comprehensive audit.
Session-10 diff is consistent with its plan. Now dispatching the comprehensive audit and neo-crm review in parallel.
Both agents returned. The audit found 0 Critical / 0 High / 3 Medium / 10 Low / 4 Informational. The neo-crm review flags a potentially live db-path defect (the s212 pattern). Per the meticulous approach, let me hand-verify the load-bearing findings myself before planning — starting with the db-path claim.
The neo-crm agent flags a live db-path defect class. Let me verify it and the other load-bearing findings by hand before planning.
My token grep was wrong (searched CSS var names, not utility class forms). Let me redo it properly.
Dead-token and phantom-class findings verified. Now the critical one — the standalone-launch db-path defect. Let me reproduce it live in a single invocation.
The defect reproduced live — `SERVICE_UNAVAILABLE / Error code 14` under the exact `bun run start` shape while the repo db sits untouched. Let me confirm the mechanism (bun's absolutization).
**Defect root-caused and confirmed live**: bun absolutizes the relative `.env` value against the repo root → parent-of-repo path; the server chdirs into `.next/standalone`; the session-34 launch-dir recovery is nested inside `isRelativeFileUrl(envFileUrl)` which requires `.next/standalone/.env` — deleted by the build hygiene step since session 7 — so the recovery is dead and the parent-of-repo URL passes through as an "intentional override". `bun run start` with the default `.env` cannot open the database at all (Error code 14) — or worse, on a machine where the parent dir exists, silently opens an empty wrong DB.

Now let me read the remaining files for the other findings.
Let me check the existing test suites that pin these behaviors.
The verification-funnel picture is complete. Let me finish the remaining verifications before writing the plan.
Fixture style understood. Let me check the smoke script's env pinning and the e2e global-setup, then the PAD §12 table and auth-contract header.
All context gathered. Let me check the playwright webServer env, then write the plan.
All verifications complete. Now writing the session-11 remediation plan.
Now the live reference parity walk. Let me check the agent-browser tooling.
已登录 — 重定向至 `/Home`。现在进行 390×844 分辨率下的移动端菜单跳转。
Reference walk confirms **no drift since session 10**: login → `/Home`, mobile menu opens with the 5 destinations, hamburger still carries no aria (our superset holds), panel computes transparent (the dead `/98` class), menu auto-closes on navigation, SPA stale-title on soft-nav, OG family intact. Now writing the session-11 plan.
Plan written and validated against the codebase (every edit target hand-verified above). Now executing with TDD — starting with R11-1 (the headline db-path cure). First the RED pin.
Now the RED verification — the new hygiene pin must fail against the current tree.
**RED confirmed** — exactly the hygiene pin fails. Now the GREEN cure: the hoist.
GREEN 22/22. Now the mutation battery — prove the pin is non-vacuous by reverting the cure and confirming RED.
Mutation battery passed (revert → RED, restore → GREEN). Now R11-2 — the step-less census RED pin. First let me enumerate the actual step-less utilities in src.
All prose fragments confirmed as comment noise. Now writing the R11-2 + R11-3 RED pins in design-tokens.test.ts.
Now the design-tokens RED pins (step-less census + dead-token census + retirement negatives):
RED confirmed (5 new pins). Let me verify the failure reasons are exactly the intended ones.
The dead-token census RED is exactly the 13 expected. The step-less census has prose noise to tune. Let me find the sources.
The noise comes from the vendor file itself (still present pre-retirement). Let me probe what remains with the vendor excluded.
Found it — my regex can't capture `-500` (digit after hyphen), so every stepped utility leaks a bare family word. The fix: a `(?![\w-])` boundary lookahead so stepped utilities vanish from this census. Let me update the pin.
I dropped the exclusion filter from the loop in that edit. Fixing:
Nearly clean — `input` is the true RED; `base` (font-size utility) needs its exclusion back, and `blink` comes from the retiring vendor file. Fixing both.
**Clean RED** — exactly `input`. Now the GREEN cures: rewrite globals.css (add `--color-input`, retire the dead set, drop the vendor import).
Now retire the dead `@utility` rules at the bottom of globals.css and delete the vendor file + components.json:
Now fix the toast.tsx phantom comment, then run the design-tokens suite:
Classic needle-in-own-doc failures (my retirement comments contain the retired literals). Fixing the pins to be surgical and the comment wording:
Now fix the design-tokens pins to be surgical (import-form, not the bare word) and reword the globals.css comments to avoid needle-in-own-doc:
All green. Full unit suite to catch collateral:
470/470 (+7 from the session-10 baseline). Now R11-4 — the verification funnel. RED pins first: the new `unverifiedAccount` seam suite.
Now the login-views route pins (RED) — the login gate, resend re-mint, card view swap, and double-submit guards:
**RED confirmed** — all 8 fail. Now the GREEN cures. First the seam:
Now the login route gate:
Now the resend route — narrow the no-op gate so expired codes re-mint:
Now the login-card GREEN cure — the view swap, double-submit guards, and OTP paste distribution:
Unit funnel pins GREEN (63/63). Now the e2e full-funnel test. Let me check the verify view's exact markup for robust locators.
Now the e2e full-funnel test in auth.spec.ts:
E2E funnel test written (runs after rebuild). Now R11-5 — the generate route over-length message. RED pin first:
Now the GREEN cures — the exported message in generator.ts and the route branch:
Now R11-6 — navbar a11y. RED pins in a11y-controls.test.ts:
Now the navbar GREEN cure — the ref, id, aria-controls, and Escape focus return:
R11-6 done. Now R11-7 — the sweep: auth-contract phantom cleanup + the signup P2002 cure.
Now the signup route P2002 cure:
481/481 across 33 files. Now R11-8 — the neo-crm adoptions. First the gate-script pin suite:
Pins green. Mutation battery — prove the chain pin is non-vacuous:
Mutation battery passed. Now the PAD §12 re-anchor + docs-counts extensions. Getting final line counts first:
The note landed mid-table. Fixing placement:
Now extend docs-counts.test.ts with the doctrine census + inventory census, and update the count constants:
Let me verify the exact unit count (I estimated 486 — need the real number):
488 tests / 34 files — the 11 failures are all the docs-counts lockstep pins (expected: docs still carry old counts). Updating constants and doing the full docs lockstep now:
PAD table needs lockstep + the census regex is too strict (cells with trailing text). Fixing both:
Now the PAD + SKILL lockstep. Let me find the exact sites:
Now the SKILL doc updates (version, §4, §6, Appendix A/B):
Now the SKILL Appendix A session-11 row + Appendix B re-certification, plus the §3 db-path contract note:
Off-by-one from a missing trailing newline in api.ts. Updating the row to the test's canonical count:
**488/488 GREEN.** Updating the count-ladder comment, then the remaining doc records (worklog, plan):
Now the bun audit duty (A5), then lint/typecheck:
Audit triaged. Let me verify the runtime zod version to be precise:
All advisories are dev/test/build toolchain (the runtime zod is the patched 4.6.7). Now the production build:
Build clean. Now the **live A/B for the F11-18 cure** — boot the standalone server the `bun run start` way with the relative `.env`:
The health is `ok:true` (cure verified!) but the second stat oddly failed. Let me check the db state:
Health answers `ok:true` — but let me make the A/B airtight by proving exactly which file the server opens:
**F11-18 cure live-verified end-to-end**: the standalone server holds `<repo>/db/custom.db` open (fd 21), health `ok:true` — versus the pre-cure `Error code 14`. Now smoke + e2e:
**E2E 50/50** — let me confirm the funnel test specifically, then the captures:
All e2e green including the funnel (test 20). Now the captures (29/30) — dev server via `127.0.0.1` in one invocation:
Captures landed with hydration verified. PIL-verification:
Captures verified (100%/99.9% non-white, dark panel strip, amber pill present). Now the records — first check the session-log authorship pattern:
The owner commits session logs — my records are the worklog + plan execution record. Writing both:
Now the worklog Task 11 entry (prepended):
All records written. Final gate verification on the exact commit tree:
Tree is clean. Removing the scratch capture script from the repo, then reading the SSH push runbook:
Runbook internalized. Committing first:
Committed `250266d`. Now the SSH-wrapper push — deploying the key per the runbook:
The display redacts the BEGIN line (the runbook's documented artifact). Verifying the actual bytes on disk per the runbook:
Dry-run clean — authenticates and fast-forwards `b1424f3..250266d`. Real push:
**Session 11 complete — pushed `250266d` to main, remote-verified, key shredded.**

**What shipped:** The headline discovery (F11-18, live root-caused) — `bun run start` with the default relative `.env` **could not open the database**: bun absolutizes the relative `file:` value to a parent-of-repo path, and the session-34 recovery sat nested behind a guard requiring the `.next/standalone/.env` that the session-7 hygiene step deletes. Cured with the neo-crm session-212 hoist, mutation-batteried, and live-verified (health `ok:true`, the repo db open via `/proc` fd). Also: the dead-CSS retirement (vendored tw-animate.css + 13 dead tokens, all phantom-justified) with two new mechanical censuses (step-less color utilities — `border-input` compiled to nothing — and dead tokens); the **verification funnel closed** (expired codes can no longer bypass email verification; resend re-arms; the 403 re-enters the verify view — full-funnel e2e); the signup race → 400; menu a11y increments; and the neo-crm gate-script/doctrine/inventory censuses.

**Verified:** full gate green (lint 0/0 · tsc 0 · unit **488/488**/34 files · build · smoke 15/15 · e2e **50/50**/8 specs · census MATCH); reference re-walked live (no drift); captures 29/30 via `127.0.0.1` with hydration awaited; `bun audit` run (10 advisories, all dev-toolchain, zero runtime). **Reasoned:** the Escape focus-return (source-pinned + axe-clean, not AT-tested). **Deferred:** the landing's inline PricingSection markup, the drift-sweep/dead-code-hygiene/count-ladder families (noted in the plan).

**Next:** the owner's `docs/session_11.md` log, then the standing re-run whenever you're ready.
