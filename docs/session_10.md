I'll start by setting up my task plan and refreshing the workspace.
Repo cloned successfully — it's at session-9 state. Now let me review the core documentation.
The repo is at session-9 shipped state. This is the standing session-10 round. Let me read the remaining core docs and start the environment setup in parallel.
Bun is available. Let me install dependencies (foreground — the sandbox reaps background processes).
`.env.example` exists and matches the six-knob contract. Now the §15 pristine-clone verification sequence:
Baseline green at documented counts. Now the production build (long-running) while I continue reading docs in parallel:
Build succeeded. Let me finish the SKILL doc and check the skills catalog:
Now let me check the skills catalog and run the smoke test:
Let me run the smoke ladder and read the web-application skill in parallel:
Playwright browsers are cached. Running the e2e suite to complete the baseline gate:
Version mismatch — the sandbox cache has chromium-1200 but Playwright 1.64.1 needs 1248. Installing:
**Full baseline gate GREEN**: lint 0/0 · tsc 0 · unit 442/442 · build · smoke 15/15 · e2e 48/48 · census MATCH — all at documented counts. Let me update progress and validate the codebase structure:
Structure matches the docs. Now let me examine the recent session-9 changes and dispatch a comprehensive audit:
Session-9 diff is consistent with its plan. Now let me check the agent-browser tooling and dispatch the comprehensive audit in parallel:
Excellent audit — 0 Critical / 0 High / 2 Medium / 9 Low / 5 Informational. Per the meticulous approach, let me verify the load-bearing findings myself before planning:
F10-1 confirmed — six color families used in src/ but not pinned in `@theme`. Let me verify the actual v4 default values against v3:
F10-1 quantified: `green-700` v4 #008236 vs v3 #15803d, `blue-600` #155dfc vs #2563eb — visible drift on reference-parity callout surfaces. Let me do an exhaustive census of color usage vs pins:
The census found more than the audit: `emerald-200`, `red-200`, `red-700` also unpinned. Let me locate their consumers:
All 11 unpinned steps quantified — `green-700`, `blue-600`, `red-700` have visible drift. Now verifying the other findings:
All findings verified against source. Now let me read the files I'll need for cures — `boot-env.ts`, `api.ts`, the verify route, and `site.ts`:
现在让我查看 `agent-browser` 技能并进行实时的参考一致性走查：
Logged in to the reference — redirected to `/Home` with the expected nav. Now the mobile menu walk at 390×844:
Menu opens with the 5 destinations, hamburger still unlabeled (our aria superset holds). Let me check the panel's computed style and navigation behavior:
Reference panel confirmed: `bg-slate-900/98` computes transparent (the dead class — documented). Now menu navigation + auto-close:
SPA stale-title on soft-nav confirmed (title stays "ViralPost AI" — our documented superset). Now the light-page menu panel check on /Pricing:
Light-page dead-class confirmed (transparent panel — our dark-panel superset correct). Now the 404 + OG head on the reference:
Reference verified — no drift since session 9 (derived titles, OG family, dead-class panel, SPA stale-title). Now let me boot our clone's dev server (setsid-detached, per session-9's lesson):
The sandbox reaps detached processes between calls. Running the entire dev-server walk in ONE invocation (session-9's solution):
Clone-side walk fully green — titles, OG family, auth, generator all correct. Now the mobile-menu verification on our clone (single invocation with the dev server alive):
The menu didn't open — likely clicked before hydration completed. Let me re-run with hydration-aware waits:
The synthetic click isn't opening the menu. Let me read the navbar to understand the toggle mechanism:
The navbar code is correct — the issue must be with synthetic clicks. Let me try agent-browser's native click command instead:
The page might not be at mobile width. Let me verify the viewport actually applied:
Viewport is correct, burger visible. Let me click by ref:
Clicks succeed but state doesn't change — suspecting a hydration failure. Let me check the browser console:
The console shows the Tailwind CDN warning — from the earlier reference-app walk. This daemon has stale browser state (SKILL §9.11 — stale browser chunks across dev-server restarts). Let me restart the browser daemon fresh:
Fresh daemon started. Re-running the full menu walk with a clean browser:
The button has NO React props attached — **the page is not hydrating**. Let me capture the full console including errors and network failures:
Let me verify with the accessibility snapshot (not eval) after a native click — and test another interactive element to isolate the issue:
Dev server doesn't hydrate under agent-browser, but e2e (production build + Playwright) passes. Let me test the production build under agent-browser to isolate:
**Production build hydrates perfectly** — the menu works (burger relabels, 5 destinations, React props attached). The dev server under agent-browser is the documented "dev server lies about hydration" case. Let me verify with a longer dev wait + reload:
Dev server never hydrates under agent-browser (environment quirk — production build hydrates fine). Let me check the existing screenshots and test dev hydration via Playwright instead:
Session 9 delivered the menu-open capture, so it's feasible — likely via Playwright. Let me test dev hydration with Playwright's chromium:
Playwright also fails to hydrate dev. Let me capture the actual console/page errors during dev load:
Root cause: the HMR WebSocket handshake fails (`ERR_INVALID_HTTP_RESPONSE`) — likely a Bun-runtime quirk in this sandbox; the Turbopack dev client blocks hydration on it. Let me try Node's dev server:
WebSocket works via curl (101 + HMR messages flow). The browser failure must be something else. Let me capture the browser console under the Node dev server:
Same error under Node. curl gets a valid 101 but Chromium rejects it. Let me probe the exact response bytes with browser-like headers (Origin + deflate):
The server's upgrade response is malformed when the client negotiates `permessage-deflate` (which browsers always do). Let me capture the raw bytes:
The raw response is the literal string `Unauthorized` — not even valid HTTP. Let me isolate which request header triggers it:
**Pinpointed**: `Origin: http://127.0.0.1:3000` → "Unauthorized"; `localhost` → clean 101. This is Next 16's `allowedDevOrigins` dev protection. This may be the very mobile-menu symptom the user flagged — anyone opening dev at `127.0.0.1` gets NO hydration. Let me confirm localhost works:
**ROOT CAUSE CONFIRMED**: dev via `localhost` hydrates and the menu works; dev via `127.0.0.1` is blocked by Next 16's origin protection → no hydration → menu dead. This is a genuine DX bug. Let me check the `allowedDevOrigins` config shape in the installed Next:
The full mechanism is decoded from Next's source. Let me check the matcher to get the config entry format exactly right:
Docs decoded: entries are bare hostnames, no scheme/port. The cure is `allowedDevOrigins: ["127.0.0.1"]`. Now let me complete the picture — neo-crm review and next.config.ts:
I now have the complete picture. Let me validate the remaining edit targets before writing the plan:
Let me verify the sitemap content quickly (the user's explicit SEO item):
All context gathered. Now let me write the session-10 remediation plan:
Plan written. Let me validate the remaining details before executing:
The generator test file contains a stray null byte — let me investigate:
A literal NUL byte inside a string literal (works, but makes the file binary to text tooling). Let me scan for other control characters:
Only that one site — added to the sweep (F10-18). Now executing **R10-1 (RED)** — the dev-origins pins:
Now the R10-2 RED pins (design-tokens census + step pins):
Now the R10-3 RED pins (siteUrl fallback + boot-env malformed warning):
Now the boot-env RED pins for the malformed-URL warning:
Now the R10-4 e2e RED pin (history-nav menu close):
Now the R10-6 RED pin (hashtag window 5-7 variation). Let me check the generator test's current hashtag property first:
The flow is clear. Now the RED pin for hashtag-count variation:
Now let me run the RED verification — all new pins must fail against the current tree:
**RED confirmed** — exactly the 11 new pins fail, all 442 existing tests still pass. Now the GREEN cures. R10-1 — the allowedDevOrigins entry:
R10-2 GREEN — the 11 palette pins in `@theme`:
R10-3 GREEN — `siteUrl()` shape validation + the boot-env warning:
Now the boot-env malformed-shape warning:
R10-4 GREEN — the navbar closes on any pathname change (adjust-during-render doctrine):
R10-6 GREEN — the seeded hashtag target 5-7:
Now R10-5 — the raw-anchor → Link swap. Let me check the three files:
The import is already in place. Now the anchor swap:
Now sections.tsx (the PT CTA):
Now let me run the unit suite to check GREEN progress:
**GREEN — 456/456 across 32 files** (+14 tests). Now R10-7, the phantom/comment/doc sweep. First, page-layout.ts and the NOT_FOUND_LAYOUT pins:
Now the NOT_FOUND_LAYOUT pins in login-views.test.ts:
Now the toast-anatomy and type-gate header re-attributions:
Now the type-gate header:
Now CLAUDE.md, api.ts, DEPLOYMENT.md, and the dompurify override:
Now the dompurify override removal and the NUL-byte fix:
460/460 across 32 files. Now R10-8 — fix the three stale count sites and extend the docs-counts gate:
Now extend the docs-counts gate with the three new pins + update its constants:
Now the full docs lockstep at the new counts (460/32 unit, 49/8 e2e, badge 509):
Docs-counts gate green. Now the SKILL Appendix A session-10 row and remaining lockstep:
Now the README status table, AGENTS plans map, worklog, and the plan execution record:
Now the worklog Task 10 entry (prepended):
Now the acceptance-criteria sweeps, then the full gate:
All sweeps clean. Now the live A/B verification of the dev-origin cure (acceptance criterion 2):
**The cure is live-verified** — 101 on the loopback origin, hydration + menu open at 127.0.0.1. Now the full gate on the remediated tree:
463 tests now (the +3 docs-counts pins landed after my count). Re-anchoring all sites 460→463, badge 509→512:
The new history-nav test failed. Let me see the detail:
Test bug — I clicked the desktop "Tool" link at phone width without opening the menu first. Fixing the spec:
All 7 mobile-navigation tests pass. Full e2e suite:
**FULL GATE GREEN** — lint 0/0 · tsc 0 · unit 463/463 · build · smoke 15/15 · e2e 49/49. Now captures 27/28 (dev server via 127.0.0.1 — proving the cure end-to-end):
Let me visually verify the menu-open capture:
Capture verified — dark slate-900 panel + amber Upgrade pill visible. Now the plan execution record:
Now the final pre-commit checks — git status and hygiene:
All pre-ship checks green. Now let me read the SSH wrapper runbook and prepare the push:
Runbook internalized. Committing the session-10 remediation:
Commit `b86c98c` landed. No ssh binary — deploying the runbook's Appendix A paramiko shim path:
Dry-run clean (`b325ef9..b86c98c`). Real push:
**Session 10 shipped and verified.** Let me finalize the task list:
**Session 10 complete — pushed `b86c98c` to main, remote-verified, key shredded.**

**What shipped:** The audit found the mobile-menu root cause the owner has been asking about — **the dev server at `http://127.0.0.1:3000` never hydrated**. Next 16's dev-origin protection rejects the loopback origin's HMR WebSocket (raw-socket-probed: a bare `Unauthorized` instead of the `101`), so the page renders inert SSR with zero console errors — the menu and every interactive island look dead. Cured with `allowedDevOrigins: ["127.0.0.1"]` (TDD-pinned) and verified live: hydration + menu-open now work at the loopback IP.

**The rest of the register (all TDD, +21 unit / +1 e2e):** the Tailwind v4 palette re-pin completed — 11 used-but-unpinned color steps (green-700 visibly drifted to v4's `#008236` on the reference-parity callout text) now pinned at v3 hexes, plus a mechanical census pin so any future unpinned family fails `bun run test`; the malformed-`NEXT_PUBLIC_SITE_URL` whole-site brick cured (fallback + boot warning); the menu now closes on history navigation too; the hashtag window exercised (seeded 5–7); CTAs → `next/link`; `NOT_FOUND_LAYOUT` pinned; CRM-lineage test headers re-attributed; three stale count sites fixed and gated; the dead dompurify override and a raw NUL byte retired.

**Verified:** full gate green (lint 0/0 · tsc 0 · unit 463/463 · build · smoke 15/15 · e2e 49/49 · census MATCH); reference parity re-walked live (no drift); captures 27/28 in `docs/screenshots/` (taken via 127.0.0.1, proving the cure end-to-end); badge 512 = 463+49; docs lockstep at SKILL v1.6.0.

**Next:** the owner's `docs/session_10.md` log, then the standing re-run whenever you're ready.
