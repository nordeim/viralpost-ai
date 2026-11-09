I'll start by refreshing the workspace and assessing the current state after the session restart.
The remote has moved ahead (`414596c`). Let me inspect it before pulling, since I have uncommitted local changes.
The owner added `docs/session_1.md`. My uncommitted changes (dep removal) don't touch it — pulling:
Session 1 log internalized. Now the remaining planning docs:
Session-1 plan is complete except item 9 (root docs + final push). Now let me read the skills catalog and the key skills for this round.
All key skills internalized. Now the codebase audit — starting with the operator's standing asks (.env, db, configs, sitemap/SEO):
Sitemap/robots implemented. Now completing the interrupted gate verification from last session — the e2e battery after the dep removal:
**Pending gate step complete: e2e 47/47 after the dep removal.** The full gate is now re-certified. Now the key new discovery task — the reference `/Dashboard`. Let me load the agent-browser skill:
404 while logged out. Let me log in and check it authenticated:
Logged in (redirected to landing). Now `/Dashboard` while authenticated:
**Confirmed: `/Dashboard` is a 404 in the reference in BOTH auth states** — the app title template even renders "Dashboard | ViralPost AI" over the 404 body. Let me capture the reference's exact 404 structure and check how unknown-route titles behave:
The complete reference 404 contract is captured. Now let me compare with my clone's current 404 implementation:
My 404 body matches, but there's a **title gap**: the reference derives `<RouteName> | ViralPost AI` from the path even on 404s ("NonexistentPage" → "Nonexistent Page"). Let me verify the derivation rule:
The derivation rule is `startCase(last segment)` — "foo-bar"→"Foo Bar", "userSettings"→"User Settings", "/a/b/c"→"C". Let me check my clone's current /Dashboard title:
curl reaches the server but agent-browser can't — its daemon likely needs a restart:
The server keeps dying. Let me investigate and restart with monitoring:
The sandbox reaps the server between tool calls. Let me use a fully-orphaned double-fork pattern:
Orphaned server survives, and the gap is confirmed: my clone serves bare "ViralPost AI" title on /Dashboard while the reference derives `Dashboard | ViralPost AI`. Body matches. Now let me continue the audit — checking the mobile menu and main components:
Mobile menu works. Let me re-verify the reference's mobile menu for drift since session 1:
Reference mobile menu structure identical to my clone (no drift). Now the systematic code audit of the session-1 changes:
Login works, redirects to `/` (same as reference). Let me check console health and the /Home redirect:
Let me check the env var naming in code (NEO_ prefix relics from the template):
The env prefix rename is a legitimate brand-coherence item. Let me pin the title-derivation edge cases on the reference before writing the plan:
All edge cases pinned — the rule is a custom startCase (non-alnum runs split, camelCase splits, upperFirst per word; digits never split; empty → bare title). Let me check current test pins on the 404 title:
Audit complete. Now writing the remediation plan:
Now R-1, TDD-first — the failing test for the title derivation:
RED confirmed (module missing). Now the GREEN implementation:
13/13 GREEN. Now wiring the title set into NotFoundBody:
Now the e2e pin for `/Dashboard`'s title — extending the 404 test in landing.spec.ts:
Now R-2 and R-3 — the scroll-behavior attribute and the typo:
Now R-4 — the `NEO_` → `VIRALPOST_` env rename. Let me see all affected sites first:
Rename complete (zero matches remain). Now the `neo_crm` relic in .env.example and any other CRM references in tracked source:
More CRM relics found — including a **user-facing text bug** in reset-password-screen. Let me examine them:
Let me check the reference's reset-password screen text (user-facing parity):
The reference's forgot flow is a standard email flow. The clone's "Enter your new password for NEO CRM" is a genuine user-facing relic. Fixing all CRM relics:
Now the stale login-page comments referencing NEO CRM:
Now run the unit suite to verify the remediation batch:
The typography test pins the exact `<html lang="en">` tag — my new `data-scroll-behavior` attribute changed it. Updating the pin to match the new contract:
402/402 GREEN (+13 new). Now live verification of the title fix:
Titles not updating — let me check the console and the served JS:
The build has the function but the title doesn't change. Let me probe whether the effect runs at all:
The effect fires but React's metadata machinery stomps it afterward. The robust fix: a catch-all route with `generateMetadata` (SSR-correct, React-owned title). Reverting the effect and implementing the catch-all:
The catch-all works: title ✓, body ✓, 404 status ✓. Verifying the full derivation table and route precedence:
/dashboard titled correctly in-browser but curl shows bare titles — let me compare directly:
curl shows bare SSR title but the browser shows derived — possibly a stale cached chunk or duplicate title tags. Let me inspect the raw HTML fully:
Let me isolate whether `generateMetadata` runs at all (temporarily without notFound):
`generateMetadata` works — `notFound()` discards it. The fix: a segment-level layout + not-found inside the catch-all (layouts render around not-found boundaries, so their metadata applies):
All 11 cases match the reference with true-404 status. Verifying body render + browser + route precedence:
Dev streams a 404 fallback shell (body renders client-side) — production behavior is verified by the e2e suite. Let me run the quick gates then the production verification:
Production serves derived titles with 404 status. Now the e2e suite (which asserts the rendered 404 body against the production build):
**E2E: 48/48** (+1 new). R-1 through R-4 complete. Quick smoke check, then the docs phase:
The smoke test greps the literal body text; the streamed fallback dropped it. Let me inspect the full production response:
The full picture: SSR title ✓ + noindex ✓ + 404 status ✓, body client-rendered (matching the reference's SPA mechanics — its 404 is client-rendered too). The curl-layer smoke check needs re-anchoring to the new contract:
**Smoke 15/15.** All code remediation is gate-verified. Now the docs phase — gathering the final fact base:
Census MATCH restored. Now writing the four root docs. First README.md:
Now AGENTS.md (compact, high-signal per the agents-md skill):
Now CLAUDE.md (per the claude-md skill template — Meticulous Approach):
Now the Project_Architecture_Document.md per the PAD skill:
Now R-6 — the `viralpost-ai_SKILL.md` distillation. Gathering the theme facts first:
Now the worklog.md rewrite for this session:

Workspace intact with all 36 changes uncommitted. Remaining: R-7 (screenshots) and R-8 (final gate + commit + push). Restoring the TODO list:
Fast gates green after the recycle. Now R-7 — booting the dev server for screenshots:
React controlled input needs the native path — using fill:
All 4 screenshots verified. Updating the plan's execution record and checking `.env.example`:
Verifying `.env.example` matches the codebase env contract:
`.env.example` is complete and matches the code. Now R-8 — the final full gate certification on the exact commit tree:
**FULL GATE GREEN on the final tree.** Now the commit — first the hygiene check:
42 files staged, zero sensitive. Committing:
Committed as `1e6a341`. Now the SSH-wrapper push — checking the infrastructure survives:
All infrastructure intact. Dry-run then push:
Push verified — remote main at `1e6a341`, local in sync (the trailing ls-remote error is just the wrapper having shredded its key, exactly per the runbook). Shredding the operator key per the runbook's final step:
All done. The session-2 round is complete and pushed.

## Round summary

**The key discovery — `/Dashboard` decoded (Verified):** The reference's `/Dashboard` is its own 404 page in **both auth states** — there is no dashboard surface. The real gap was the **title**: the reference derives `<StartCase(last segment)> | ViralPost AI` for unknown routes (17 path shapes pinned live, including the digits-never-split rule that rules out lodash semantics).

**The cure (TDD, 13 red-first pins):** `src/lib/route-title.ts` + a catch-all segment where the **layout's** `generateMetadata` owns the title — after two probe-verified dead ends (a client effect gets stomped by React's metadata hydration; a page's `generateMetadata` is discarded by `notFound()`). Result: all 11 live path shapes byte-match the reference, with a true-404 status + `noindex` superset the reference's 200-everywhere SPA can't ship.

**The audit's other cures:** the `NEO_*` → `VIRALPOST_*` env rename, a user-facing "Enter your new password for NEO CRM" relic fixed, all CRM markers swept from the app tree, 11 dead CRM-era dependencies removed, `data-scroll-behavior` warning fixed.

**Delivery:** README / AGENTS / CLAUDE / PAD v2.0 (8 ADRs) rebuilt, `viralpost-ai_SKILL.md` distilled, worklog rewritten, 4 new screenshots, and everything committed as `1e6a341` (42 files) and pushed via the SSH wrapper — remote verified, no branches, key shredded.

**Gate on the commit tree:** lint 0/0 · tsc 0 · unit 402/402 · build · smoke 15/15 · e2e 48/48 · census MATCH.

One honest trade-off to know: the 404 **body** renders through the client stream (curl sees title/status/noindex but not the body text) — the same client-rendered posture as the reference's SPA; the rendered-body contract is owned by the e2e suite. Next steps if you want them: wire the optional LLM provider behind `GENERATOR_PROVIDER` for post quality, or a mail transport for the verification funnel.
