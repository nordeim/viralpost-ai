I'll start by internalizing the operating instructions and setting up the workspace. Let me create a task plan first, then get the repo.
Repo cloned. Now let me review the core documentation. These are large files, so I'll read them in parallel batches:
Now let me check the docs folder structure and read the session documents:
Now let me read the session documents:
The current `session_38.md` is the owner's narration log — the previous round (session 37) is delivered at commit `30bdec6`. This round is **session 38**. Let me read the session-37 plan and worklog tail, then the remaining core docs:
Session 37 is fully delivered. This round is **session 38** following the established pattern. Let me review the remaining core docs — README, PAD, and SKILL:
Now let me read the web-application skill (the audit rubric) and tdd skill:
I now have a complete picture. This round is **session 38** following the established pattern. Let me update my tracking and set up the environment:
DB setup complete with census MATCH. Now the baseline gate — lint, typecheck, unit first:
Lint 0/0, tsc 0, unit 671/671 (39 files) — matches the documented session-37 state. Now the build:
**FULL BASELINE GATE GREEN** — lint 0/0 · tsc 0 · unit 671/671 (39 files) · build · smoke 16/16 · e2e 65/65 (9 specs). Let me verify the standing asks (SEO family, cursor rule in the built sheet, skills exclusion):
The cursor rule is in the built sheet (minified form). All standing asks verified. Now the audit phase — first, the session-37 diff scope:
Baseline verified. Now dispatching the three parallel audit subagents per the established session pattern, focused on the session-37 diff:
All three audits returned: **combined 0C / 0H / 0M / 6L / 9I**. The session-37 diff verified correct on all three passes. Now the lead's hand-verification of every load-bearing finding before adjudication:
A1 confirmed in source. Let me verify the logout route and the remaining findings:
A2-1 verified — refs off by exactly +6. Now A3-1, A3-2, A3-3, A3-4:
A3-1 and A3-2 verified — 8 live range sites (not "nine"), and six stale both-land recordings in sessions 32/33/34 docs. Now A3-3, A3-4, and A1's comment overclaim in CLAUDE.md:
All findings hand-verified in source. The cure set is taking shape. Now the parity walk phase — first let me check the agent-browser tooling and prior walk methodology:
agent-browser v0.42.0 is ready. Let me start the dev server and run the parity walk — first the server, then the reference login:
Logged in — reference lands on `/Home` (the documented duplicate-of-`/` route). Now the mobile viewport and the nav calibration:
Reference escape-close confirmed: panel stays open (our escape-close is the documented F11-11 superset). Now desktop nav at 1280×800:
Reference faces captured. Now the generator probe on the reference:
Reference generator: disabled + not-allowed (the documented 402-dead face). Now the same battery on our side:
Head census matches modulo origin. Now the mobile battery on our side:
Panel anchors byte-identical, but I notice the reference panel carries `bg-slate-900/98` while ours doesn't. Let me probe the computed backgrounds on both sides:
Our panel bg is transparent while the reference carries `bg-slate-900/98`. Let me check the reference's computed background and our navbar source:
Both panels compute to `rgba(0,0,0,0)` — the reference's `bg-slate-900/98` class is dead in its own build (non-standard opacity modifier), so both render transparent: observably identical. Now our desktop nav + generator probe:
Generator probe symmetric. Now our login round-trip — checking seed credentials first:
Seed password is `$Abcd1234` (same as reference). Retrying:
**Walk verdict: NO DRIFT — all faces match** (mobile menu at confirmed 390×844 works as expected: panel block, 5 links + Gumroad pill byte-identical, cursors pointer both sides; head census, sitemap 4/4, robots, generator probe, login round-trip at the documented precise form). Now let me check the corpus-register sites for the A2-4 wording before writing the plan:
The register form is confirmed at five sites. Now let me check the S38-4 "eleven sites" wording sites and the miscount records:
All cure sites located. Let me examine the test structures for pin placement before writing the plan:
I have everything needed. Now writing the session-38 remediation plan:
Plan written. Now the pre-execution validation pass — reading the remaining target regions:
All targets validated. Executing **Batch 1 — the RED pin** (S38-1a, the seam adoption pin):
**Batch 1 verified — the S38-1 pin is exactly RED as designed.** Now Batch 2 — the GREEN cures. First S38-1, the requireSession arm:
S38-1 GREEN. Now S38-2 — the login-card line refs re-pointed:
My edit lengthened the note block, shifting the cites below. Let me verify the actual positions now:
The refs drifted +3 from my own edit growth — line numbers are inherently fragile. The robust cure is the audit's alternative: cite IDs (unique, search-stable) instead of line numbers:
Let me verify my cite descriptions are accurate:
S38-2 done — cites now referenced by ID with accurate descriptions. Verifying the `:74` ref held, then S38-4:
Let me check the S37-7 re-spell pattern used in the 35/36-era records:
Applying the S38-4 re-spells to all six sites with the established pattern:
Six sites re-spelled. Now the three "all eleven" scoping re-spells:
S38-4 complete. Now S38-5 (auth.setup limiter) and S38-6 (utils.test claim):
Now the S38-7 hygiene batch — (a) census.ts in-main disconnect retirement, (b) signup import order, (c) toast.tsx census-legible range:
Let me verify the census actually scans toast.tsx (src/ must be in SITE_ROOTS) and the regex form matches:
Census confirms: `>= 8` sites, toast.tsx becomes the ninth, owned automatically. Now S38-7(d) — the corpus register label at five sites:
The fifth site (s35-plan:77) carries its own enumeration — completing its label too, then (e) reveal re-word and (f) the force-static pin comment-strip:
Verifying `stripComments` exists in seo-surfaces.test.ts:
`stripComments` isn't defined in this file. Let me check the sibling's helper and add it:
Three failures: two are the designed census REDs (constants + PAD §12 rows — Batch 4 re-anchors). The design-tokens one needs diagnosis:
Found it — my own "remount-via-key" comment scans as a `via-key` utility (the S28-4 prose-safe lesson applies to my own edit). Fixing:
Only the two designed census REDs remain (672 on disk vs 671 constants; PAD §12 rows). **Batch 2 complete.** Now **Batch 3 — the S38-1 mutation battery**:
**Battery verified** — exactly the S38-1 pin REDs, the sibling pins stay GREEN (ownership separation proven). Restoring:
**Batch 3 complete.** Now **Batch 4 — constants FIRST**. Getting the live counts:
Now let me find the PAD §12 rows and the docs-counts constants to re-anchor:
Updating PAD §12 rows (api.ts 303, globals.css 253) and the constants:
The census is walking the doc sites RED as designed. Updating all count sites — README first:
Appendix B updated. Now the SKILL frontmatter, §0.5 range, and the session-38 Appendix A row:
Now the eight provenance sites and the four "nine" re-spells:
**Census 29/29 GREEN.** Now the remaining docs lockstep — AGENTS plans map, PAD Last Updated, README session-38 row:
Now the README session-38 status row:
Now the worklog Task 38 and the formal session_38.md:
Now the formal session_38.md, replacing the owner narration:
Now the plan's post-execution record:
Marking the plan's ToDo list complete, then **Batch 5 — the full gate**:
**FULL GATE GREEN** — lint 0/0 · tsc 0 · unit 672/672 (39 files) · build · smoke 16/16 · e2e 65/65. Now the post-cure walk re-run and captures 83/84. First check the dev server survived the build:
Mobile menu verified open post-cure. Capturing 83 (mobile menu open) and 84 (landing hero):
Captures PIL-verified. Quick visual check of the mobile menu capture:
Capture 83 verified: menu open with the amber pill + teal link rendered. **Batch 5 complete.** Now **Batch 6 — commit + push**. First the tree status and the SSH runbook:
Runbook understood. Committing the session-38 tree:
Committed `e79caba`. No ssh binary/paramiko (same as prior session) — installing paramiko and reading the Appendix-A shim:
Deploying the shim outside the repo and materializing the operator key (0600, never printed):
Dry-run authenticated, fast-forward confirmed. Executing the real push:
**Session 38 — complete and delivered.** Remote verified: `refs/heads/main @ e79caba == local HEAD`, key shredded, branch up to date.
**Session 38 — delivered** (commit `e79caba`, pushed to main via the SSH wrapper, remote verified, key shredded):

- **Baseline gate GREEN** at `8b39add` — lint 0/0 · tsc 0 · unit 671/671 · build · smoke 16/16 · e2e 65/65 · census MATCH; all standing asks re-verified (`.env` db-path contract, vitest+playwright suites, SEO family, `skills/` exclusion, `.env.example`).
- **Audit** (3 parallel subagents, hand-verified): 0 Critical / 0 High / 0 Medium / 6 Low / 9 Info — the session-37 diff verified correct on all three passes. Headline: `requireSession`'s catch missed the transient classifier (logout answered 500 where `/api/auth/me` answered 503).
- **Parity walk: NO DRIFT** — 11th consecutive clean walk; mobile menu verified at confirmed 390×844 (links + pill byte-identical, cursors pointer). Found the reference's `bg-slate-900/98` panel class is dead in its own build — computed transparent both sides.
- **TDD cures**: the requireSession transient arm (+1 RED-first pin, arm-removal battery on record), lineage-note refs re-pointed by ID (line refs had drifted +6 — and re-drifted +3 mid-cure, proving the lesson), "nine→eight" provenance-count truth + eight sites re-anchored 1..38, six stale both-land recordings re-spelled, limiter summary + utils-claim completions, seven-genera hygiene batch.
- **Final state**: lint 0/0 · tsc 0 · **unit 672/672** (39 files) · build · smoke 16/16 · e2e 65/65 · census MATCH · badge 737; captures 83/84 PIL-verified; docs lockstep (SKILL v1.34.0, session_38.md, worklog Task 38, plan record).

Everything is on `main`; no new branches. Next natural step: the next round (session 39) against `e79caba` whenever you're ready.
