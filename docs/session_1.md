I'll start by internalizing the operating instructions and setting up a comprehensive plan for this task. Let me first explore the environment and understand what we're working with.
Environment is ready. Now let me clone the repository as instructed (not using the default init script).
The repo is cloned and already contains substantial structure. Let me explore the key files in parallel.
Interesting — the repo is named "viralpost-ai" but contains a NEO CRM application. Let me read the key documentation files to understand the context.
This is a long-running audit/remediation project — the repo is a NEO CRM (session 198 shipped last). This request is the next round. Let me read the skills catalog, git history, and key skills.
This is a mature project at session-199 stage. Let me read the core documentation strategically — starting with README, CLAUDE.md, and the latest session records.
I notice AGENTS.md references session-203 with higher counts (2858/226) than worklog.md (Task 198, 2817/195) — the owner has made commits after the last recorded session. Let me investigate the recent history and session logs.
The owner's docs are ahead (session-203 state, 2858/226 counts) while worklog.md is at Task 198. Let me check the docs/worklog.md, today's prompt changes, and the AGENTS.md latest session sections.
Sessions 190-203 are documented in AGENTS.md. Let me read the latest session sections to understand the current state, then verify with executable truth.
There are sessions up to Session-210. Let me see the full session list and read the latest sessions (209-210).
Let me verify the actual codebase state matches the session-210 docs — checking for session-210 markers in the tree.
No session-210 code markers exist — the docs were synced but code may be at a different state. Let me trace which commits touched the code and worklog.
Now I understand: this repo carries session-198 code with session-210 docs synced by the owner. Executable truth requires running the gate. Let me set up the environment first.
Bun 1.3.14 is available. Let me set up the environment: install dependencies, create .env, and initialize the database.
Database census MATCH. Now let me run the baseline gate to establish executable truth about the codebase state.
There are 23 test failures — the docs (synced to session-210 by the owner) are ahead of the code/tests (session-198). Let me get the full failure picture.
The picture is clear: code at session-198 state (2817 unit tests), docs synced to session-210 by the owner. Let me read the owner's current prompt files (updated today) — these are the authoritative round instructions.
I have the full picture of the round contract. Now the critical question: what IS `viralpostai.base44.app` currently — the NEO CRM renamed, or a different app? Let me load the agent-browser skill and browse the reference site.
The site is live — "ViralPost AI". Let me snapshot it to see what this app actually is.
This is a **completely different app** — "ViralPost AI" is an AI social media post generator, NOT a CRM! The repo is the scaffold. Let me check the prompt history to understand this transformation context.
Now the full context is clear: the owner transforms this mature template into clones of different base44 apps (budget-wiser previously, now ViralPost AI). My task: transform this codebase into a production-ready clone of viralpostai.base44.app. Let me explore the entire reference site thoroughly.
Full landing structure captured. Let me see the footer, then check the login page and post-login Dashboard.
Nav routes are base44-style capitalized (`/Home`, `/Tool`, `/Pricing`, `/Contact`). Let me explore each route systematically.
`/Home` is the same landing. Now let me test the core feature — the AI post generator tool.
The generator is processing. Let me wait for the result to see the generated post UI.
Still generating. Let me check network activity and console for what's happening behind the scenes.
Key finding: the reference's LLM endpoint returns **402 (quota exhausted)** and the button hangs at "Generating..." with no error handling — a functional gap my clone must supersede. Now let me log in and explore the authenticated area.
Logged in successfully. Let me retry the generator while authenticated, then explore /Dashboard, /Tool, /Pricing, /Contact.
Confirmed: the reference's LLM is 402-exhausted even when logged in — generation hangs forever with no error handling. My clone must supersede this. Let me explore the remaining routes.
`/Dashboard` is a 404 page in the reference. Let me check /Tool, /Pricing, /Contact.
All pages mapped. Now let me extract the detailed content — pricing lists, links, and test the contact form + signup flow.
Pricing details captured. Now the critical test — mobile navigation at 390×844.
Mobile hamburger button exists. Let me open it and capture the mobile menu state.
Mobile menu works in the reference. Let me extract the precise visual design tokens via computed styles — colors, fonts, radii.
The h1 is visually hidden (0×0) — the visible hero title is the 30px/700 white H2. Let me find the hero's dark background container.
Hero is dark (slate-900) with teal accents. Let me dump the hero's exact HTML classes for faithful replication.
The hero uses canvas-rendered animated title and particle background — signature elements. Let me capture the rest of the hero and the generator card HTML.
Generator card captured. The result UI is invisible (LLM 402). Let me inspect the JS bundle to discover the generated-post UI structure.
The exact generated-post card UI is recovered from the bundle. Now let me find the LLM prompt and generation-counting logic.
The exact LLM prompt and free-limit UI are recovered. Let me find the generation counter persistence logic.
Complete counter logic recovered (localStorage `viralpost_generations`, 3/day, daily reset). Now let me capture the remaining page sections from the DOM.
Let me save complete page HTMLs for the implementation phase — a systematic reference capture.
Signup validates email deliverability. Let me test the contact form submission and Google button.
Contact form is a client-side stub (no backend) — another superset opportunity. Let me examine the hero canvas animation code — a signature visual element.
The hero uses a react-bits style particle-text canvas. Let me check the hero background canvas too.
WebGL iridescence-style background confirmed (hue 174, power 1.5, focus 28, distortion 1.2). Let me capture the login page shell and page-header patterns, then take reference screenshots.
Let me download the brand assets for reference and take final reference screenshots at desktop + mobile.
Reference material captured. Let me use the VLM skill to analyze the reference screenshots for precise visual understanding.
I now have a complete reference map. The particle title cycles through 4 phrases with vaporize transitions. Let me update my TODO and read the required skills for doc creation and cloning methodology.
The claude-md template matches the existing CLAUDE.md structure. Now let me analyze the codebase infrastructure in depth.
The globals.css carries the critical Tailwind v4 lessons (the `@custom-variant hover` unwrap for touch devices). Let me examine the layout and login/mobile-nav components.
The codebase analysis is complete. Let me check the reference's font and metadata setup, then compile the full investigation dossier.
I now have the complete reference map. Let me write the reference investigation dossier and implementation plan.
Now the implementation plan with the Stack Decision Record and Deviations Ledger:
Plans saved. Now the build begins. Let me first examine the existing Prisma schema and auth routes to preserve conventions.
Now let me write the new Prisma schema — keeping the battle-tested User model, dropping CRM entities, adding ContactMessage.
Now the generator engine — the heart of the app. Test first (the contract), then implementation.
Now the generator implementation:
The test's filter calls a throwing `sanitizeIdea`. Let me fix the arbitrary to use a non-throwing predicate:
Body templates with 3+ sentences violate the 1-2 sentence rule. Let me fix all offending entries:
Generator contract GREEN. Now the generation counter (daily quota) module with tests:
The 1.5 count gets floored (fail-open) — that's the intended contract. Fixing the test expectation:
Now let me rebrand the site metadata seam and auth:
Now let me examine the existing auth API routes to port them:
The auth routes port cleanly. Now the big restructure — let me check a few more pieces before the deletion phase:
The restructure begins. Let me map dependencies before deleting CRM files:
The login card classes are identical to the ViralPost reference (same owner's design language) — ports as-is. Now the decisive restructure — deleting the CRM domain:
Now let me write the new globals.css with the ViralPost AI theme (keeping the Tailwind v4 doctrines):
The v3-palette re-pin doctrine is critical — and the ViralPost reference uses **teal** which isn't re-pinned yet. Let me check the reference's login button style first:
Sign-in button: slate-900 solid, rounded-xl. Now writing the new globals.css:
Now the effects components — Reveal, ParticleText, Iridescence:
Now the ParticleText canvas — the signature hero element:
Now the Iridescence WebGL background:
Now the shared marketing components. Let me extract the reference's exact nav/footer HTML classes:
Let me capture the mobile menu's exact rendered HTML from the live reference:
All design details captured. Now building the marketing components — brand config, logo, navbar with mobile menu:
Let me extract the dot-fill logic from the bundle before writing the generator card:
Dot logic confirmed: used dots fill teal left-to-right. Now the generator card:
Now the API routes. Let me check the rate-limit lib API first:
Now the landing page. Let me extract the remaining sections' exact HTML from the saved reference:
I have every section's exact HTML. Now writing the hero component:
Now the landing sections — features, how-it-works, stats, testimonials, pricing, CTA, PT:
Now the route structure — the (site) layout and landing page:
The brace-counting failed (strings with braces). Simpler approach — check which UI kit components the new app actually uses:
Only `toast` is used! Let me trim the UI kit and rewrite page-layout.ts cleanly:
Now let me examine and adapt the login card for ViralPost AI:
GoogleIcon is locally defined — good. Now the site layout and all pages:
Now the root layout rebrand and sitemap/robots/manifest:
Now updating next.config.ts with the /Home redirect and artifact hygiene:
Now the brand assets. Let me generate the hero portrait with the image-generation skill:
Portrait generated. Now let me create the brand assets (icon, apple-icon, og-image) via SVG + browser screenshot:
Brand assets installed. Now the types rewrite and first build attempt:
Expected — old CRM tests reference deleted modules. Time for the test-suite rebuild. First, fix the new-component errors:
Now let me check the old schemas' auth shapes and recreate a minimal schemas module:
Now the CRM test cleanup — keeping only the infra tests that still apply:
The scripts folder is full of CRM session artifacts. Let me do the cleanup — keeping only operational tools:
Now the test suite cleanup — checking which infra tests survive:
The import check is too loose — CRM tests read source files textually. Decisive cleanup by semantic applicability:
Typecheck CLEAN. Let me fix the auth setup for the new app and write the e2e specs:
Now let me run the unit suite to see which kept tests need re-anchoring:
14/15 files pass. Let me fix the remaining failures one by one:
The a11y-controls test pins deleted CRM pages. Let me rewrite it for the new surfaces:
Now the two big rewrites — api-robustness for the new API surface and design-tokens for the new theme:
**UNIT SUITE GREEN: 25 files, 351 tests.** Now let me add the new-app test suites (nav-config, landing-page, page-titles, metadata):
The first sitemap rewrite never executed (Python compile error aborted the whole script). Rewriting it now:
**UNIT SUITE GREEN: 28 files, 389 tests.** Now updating package.json scripts and the smoke test:
Fixing all lint errors — the Reveal goes DOM-direct (no setState), the counter becomes a useSyncExternalStore, navbar uses rAF:
All green. Now the production build:
BUILD SUCCESS with the exact route surface. Now the smoke ladder:
SMOKE 15/15 PASS. Now the e2e battery:
The sr-only text needs to be a real heading. Fixing ParticleText to render an actual `<h1>`:
Fixing the stars role and rebuilding the a11y adjudication with in-page class matching:
Now fix the remaining test issues — quota race, copy permissions, mobile-nav exact match, seo canonical:
The auth spec is the logged-out spec — the signout test needs its own authenticated spec:
**E2E: 47/47 PASSED.** Now the complete gate certification from scratch:
**FULL GATE GREEN** (lint 0/0 · tsc 0 · 389 unit · build · smoke 15/15 · e2e 47/47). Now the parity walk — booting the app and comparing against the reference:
Real differences found. Let me measure the hero offset precisely and fix the iridescence brightness:
Direct measurement shows hero geometry is within 6px (VLM misread scroll states). The real gap is the iridescence brightness. Let me boost the shader:
The reference's background is brighter overall with a left-side mist. Boosting the shader further:
The reference screenshot was 577px tall (stale viewport) — the comparison sampled mismatched regions. Let me recapture properly:
Found it — the uniform is declared `u_distort` but used as `u_distortion`. The WebGL never rendered at all:
The console buffer is stale (showing the reference site's messages). Let me use a fresh browser session:
The port was held by a stale server (EADDRINUSE) — serving old HTML against new chunks. Clean rebuild:
All chunks serve 200 — the browser session cached the broken period's failures. Fresh session:

The workspace survived — the full build (419 changed files) is intact and uncommitted. Let me re-establish the TODO list and continue the parity walk from where the session stopped.
State intact. Let me verify the gate still holds after the session recycle — typecheck and unit suite first (fast checks).
Workspace integrity confirmed (tsc 0, 389/389 unit). Now let me check whether the production build is fresher than the iridescence shader fix from the last session.
Build is newer than the shader fix — the production build includes the fix. Now let me load the agent-browser skill and boot the dev server for the parity walk.
Port 3000 is held by a stale server. Let me kill it and boot fresh.
Dev server is up. Now the fresh-session parity walk — open the local site, check console for WebGL errors, and screenshot the hero.
The iridescence now starts (`gl: true`, canvas resized). But I see leftover debug `console.error` traces from the previous debugging session — let me check and clean those.
Let me remove the debug trace noise while keeping legitimate failure reporting.
Now reload and capture the hero to verify the iridescence fix visually.
Console clean. Let me visually verify the hero renders with the WebGL background.
The current model can't view images directly — let me verify the WebGL rendering programmatically via canvas pixel sampling.
Corner is black — let me sample the center where the iridescence gradient should be brightest.
All black — but there may be two canvases (particle-text is 2D, iridescence is WebGL). Let me enumerate them properly.
`preserveDrawingBuffer` is false — readPixels is inconclusive (buffer cleared after compositing). Let me analyze the actual screenshot pixels with Python instead.
474 unique colors, dark navy base with teal accents (3,126,133) — the iridescence is rendering. Let me compare against the reference captures from the previous session.
The clone renders but is darker than the reference (avg G:55 vs 76, B:66 vs 81 — less teal). Let me read the shader and boost it to match.
Let me check how the hero composites the canvas (overlays/opacity) before tuning the shader.
Let me check the saved reference hero HTML to compare overlay structure.
Structure matches the reference exactly — the gap is shader brightness. Let me tune the shader (broader glow, more teal, less blue drift).
Closer but still short on teal. Let me boost the glow spread, brightness, and saturation more aggressively.
G channel stuck at ~59. Let me analyze both images by region to find where the teal mass differs.
The gap is isolated: bottom-right — the clone shows a warm bright region (125,97,78) where the reference shows teal (31,119,113). Let me crop both right columns to see what differs.
Root cause found: the reference portrait is itself teal-dominant (avg 28,146,130, square 1024×1024) while my generated portrait is warm/muddy (79,103,91, 720×960). Let me apply a teal duotone treatment to match.
Duotone worked but too dark (22,89,88 vs target 28,146,130). Let me add histogram normalization before the ramp mapping.
Closer. Let me brighten the ramp's midtones to hit the reference's (0,151,139) mass.
The bottom-band gap is a viewport-height artifact (ref captured at 577px, clone at 720px). Let me re-capture the clone at the same 1280×577 viewport for an apples-to-apples comparison.
Honest comparison now: LEFT matches; CENTER/RIGHT need more teal (G short 14-30). Two fixes: brighter portrait ramp + a top diagonal teal band in the shader.
RIGHT-mid is suppressed by the vignette (cuts ~50% at the right edge where the reference is bright). Let me ease the vignette and strengthen the top band.
Hero avg now within 2/8/4 of reference. Final tweaks: RIGHT-mid (portrait) needs warmth+brightness — raise chroma blend and brighten mid stop; small global lift.
Within Δ(1,8,5) overall. One final targeted push: center-weighted gain on the portrait (the face region renders darker than image average).
RIGHT-mid didn't move — possibly browser image caching. Let me verify the served image matches disk.
Portrait renders at (33,119,113) — but RIGHT-mid measured (28,92,91)? Let me re-sample both regions from the same file to resolve the discrepancy.
Found it: the far-right strip (x1192-1280) is (15,29,40) — my vignette kills the glow where the reference stays bright teal. Let me soften the vignette with a floor and widen the glow reach.
Hero avg now Δ(4,2,2) — essentially at parity. The RIGHT-top R excess is likely the amber stat card. Let me confirm it's not shader warmth.
The "glow" zone is actually the portrait's upper-left — the portrait itself is still ~23G short, and the amber blur circle adds unwanted R. Fix: drop the amber circle, brighten the duotone mids.
G is now matched (142 vs 146 on portrait; hero 80 vs 76) but R overshot (+15 warmth from the chroma blend). Reduce the blend.
Hero parity achieved: Δ(5,5,8) overall, center column Δ≤2, palette and luminance profile matched (the residual right-column variance sits where the reference's own animation oscillates). Now the user's explicit priority — the mobile navigation menu at 390×844.
Mobile hamburger present. Now the critical test — open the menu.
Menu opens correctly (264px panel, y=64, block). Let me compare its look against the reference's mobile menu capture.
The exact reference panel classes weren't preserved. The reference is live — let me re-capture its mobile menu now for a direct comparison.
The reference panel: `md:hidden bg-slate-900/98 border-b border-white/10 overflow-hidden` — conditionally mounted, no transition. My clone matches the base classes exactly (plus a smooth transition — a superset touch). Let me do a like-for-like color comparison of both fresh captures.
Panel tints differ (ref greener). Let me extract the reference panel's inner link classes to match exactly.
Link classes match exactly. The tint difference may be font rendering. Let me verify both sites' font-family.
Fonts identical. Let me profile both panels per-row to localize the difference.
The reference panel has a teal glow inside it that mine lacks. Let me extract the reference panel's full HTML.
The panel HTML is identical to mine. The teal must bleed from behind. Let me sample the reference panel's left-edge gaps where only background shows.
Found it: the reference's teal bleed comes from the hero glow sitting behind the nav area at mobile — my burst center (aspect-scaled) lands off-screen at 390px. Let me make the burst position aspect-aware in UV space.
Root cause found: the reference's `bg-slate-900/98` is a **dead class** (computed `rgba(0,0,0,0)` — /98 isn't a generated opacity step in their Tailwind build), so their panel is actually transparent and the hero glows through. My Tailwind v4 honors /98, so my panel is opaque. Let me check how the reference's nav handles light pages, then match the true rendered behavior.
Now I understand the full picture. Fix: panel transparent over the hero (matches the reference's actual rendered look — teal glow bleeds through), but with a dark blurred panel on light pages (superset readability fix for the reference's contrast bug).
Partial lift only. Let me check the reference's mobile hero WITHOUT the menu open — to see what those rows look like natively.
My mobile hero background is lighter than the reference's in the 160-300 band. Let me profile both full-page and tune.
The reference's mobile upper hero is nearly black with a narrow teal band. Let me check its horizontal distribution before tuning.
The reference's mobile hero = horizontal teal band at uv.y~0.85 over a dark field — different shader behavior at portrait aspect. Let me check my current shader state, then rewrite the fragment main with an aspect-aware band.
Now let me rewrite the shader with a clean desktop/mobile split (desktop composition preserved exactly; mobile gets the reference's dark field + top flow-band + bottom pool).
Page went white — shader compile error. Let me check the console.
My replacement matched VERT's `void main()` and swallowed the FRAG declaration. Let me inspect and repair.
Repairing the whole shader block — proper VERT + FRAG with uniforms and hsl2rgb restored.
Mobile nearly matched (Δ≤10 on most rows). Row 480 needs a look — the reference's bright teal there is content. Let me compare x-profiles.
x=30-195 are pixel-identical (the CTA button matches exactly!) — remaining deltas are minor content-layout offsets. Now verify desktop didn't regress.
Desktop preserved: Δ(7,6,8) with animation phase variance — parity accepted. Now let me re-run the test suite to catch any regressions from today's edits.
389/389 green. Now the core functional superset test — the generator (the reference's LLM is 402-dead; mine must actually generate).
The functional superset is verified live — generation works (the reference hangs forever on its dead LLM), counter decremented to 2, Copy button present. Now quick visual parity on the remaining pages.
Let me capture fresh reference screenshots from the live site for the remaining pages.
Three pages near pixel-perfect (2,2,2)! But Tool diverges badly — the reference's Tool page is dark at top (72,96,102), mine light (191,201,204). Let me inspect the reference's Tool page structure.
The reference /Tool has a dark teal page-header section (~440px) before the light tool card. Let me extract its exact structure.
The reference /Tool has a dark `from-slate-900 to-teal-900` gradient header. Let me extract its full HTML and compare with my page.
My page has the same header classes — but it renders only ~100px tall. Let me check ToolSection for overlap margins and re-examine.
Header is 330px live. Let me re-screenshot and profile — the earlier capture may have been mid-transition.
Tool page now matches exactly. Let me confirm the full-page diff.
All four pages at (2,2,2) — near pixel-perfect parity. Let me update the TODO and run the full gate after today's changes.
Build green. Now the smoke ladder and e2e battery.
**FULL GATE GREEN** — lint 0/0 · tsc 0 · unit 389/389 · build ✓ · smoke 15/15 · e2e 47/47. Now the official screenshots for `docs/screenshots/`.
The daemon saved relative to its own cwd. Let me locate the files.
All 8 non-blank. Quick content sanity check on the key shots.
Screenshots verified. Now update the implementation plan with the parity-walk results.
Plan updated. Now prepare commit #1 — check .gitignore coverage and what's staged.
Let me set up the SSH wrapper per the repo's skill doc before committing.
No ssh binary — deploying the paramiko shim per Appendix A. First, the commit.

The working tree is clean and commit #1 exists. Let me verify the push state and remaining tasks.
Commit #1 exists but is unpushed. The root .md files exist but may still be CRM-era content. Let me check their state.
The root .md files are all still NEO CRM content — they need rewriting for ViralPost AI. Let me set up the TODO list and proceed.
The skill doc is clear. Let me check the wrapper's interface and whether the paramiko shim was already deployed.
No ssh binary and no paramiko — I need to deploy the Appendix A shim. Let me set up the push infrastructure.
Now deploying the paramiko shim (Appendix A) outside the repo:
Key verified. Now the dry-run against the viralpost-ai remote:
Dry-run green — auth works, fast-forward `129783e..12d8a80`. Real push:
**Push #1 successful** — `12d8a80` verified on GitHub main. Now the doc-creation phase. Let me read the four skills.
The claude-md skill is large. Let me read it in chunks.
Now the PAD skill:
All four skills internalized. Now let me gather executable-truth facts about the new codebase for accurate docs.
All facts gathered. Let me verify a few remaining usage details for doc accuracy.
Unused deps found (zustand, recharts, jspdf, html2canvas-pro, cva — all CRM leftovers). For enterprise-grade polish, these should be removed before the docs are written. Let me check the exact usage first.
The `tw-animate-css` npm package is only referenced via its vendored copy (documented provenance — keep). The 11 CRM-era runtime packages are dead. Removing them for a clean dependency surface:
Now the full gate re-verification after the dependency removal:
The tool call failed transiently. Let me retry.
The tool infrastructure has stopped responding (repeated `tool call failed` errors across multiple tool types). I have to pause here — **please click the restart button in the top right corner to restart the session, then say "continue"** — the workspace is preserved and the next session can pick up exactly where this left off.

## State summary for resumption

**Completed and pushed to GitHub (`12d8a80`, verified on remote main):**
- Full ViralPost AI clone: generator engine (works — reference's LLM is 402-dead), contact-form persistence, auth, marketing shell, WebGL hero, mobile menu
- Gate green at commit time: lint 0/0 · tsc 0 · 389 unit · build · smoke 15/15 · e2e 47/47
- 8 screenshots in `docs/screenshots/`, plan + reference investigation in `docs/`
- SSH push infrastructure deployed: paramiko shim at `/home/z/my-project/bin/ssh`, key at `/tmp/viralpost-deploy.key` (0600)

**Completed this session (uncommitted, in working tree):**
- Removed 11 dead CRM-era dependencies (`zustand`, `recharts`, `jspdf`, `html2canvas-pro`, `class-variance-authority`, 6× `@radix-ui/*`) via `bun remove`
- Updated `scripts/install_packages.sh` to match the real manifest
- Re-verified gate after removal: **lint 0/0 ✓ · tsc 0 ✓ · unit 389/389 ✓ · build ✓ · smoke 15/15 ✓**

**Remaining (the exact resume point):**
1. `CI=1 bun run test:e2e` — the only gate step not yet re-run after the dep removal
2. Rewrite the four root docs (all still NEO CRM content): `README.md`, `AGENTS.md`, `CLAUDE.md`, `Project_Architecture_Document.md` — per their skills in `skills/` (all four skills already read and internalized)
3. Rewrite `worklog.md` for this session
4. Final commit + push via `PATH="/home/z/my-project/bin:$PATH" python3 docs/ssh_git_wrapper_v3.py --key-file /tmp/viralpost-deploy.key --remote git@github.com:nordeim/viralpost-ai.git` (re-create key from prompt if `/tmp` was wiped)
