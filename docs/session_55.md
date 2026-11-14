# Session 55 — The Float-Field Motion-Arm Pin + The Audit-Triage Record + The Sitemap Comment Symmetry + The Register Batch (2026-11-14)

The round opened on the shipped tree (`62220d9` — the owner's narration
commit carrying session_55.md as the round-54 working narration;
session-54's own commit was `dca1ff2`). The core docs re-read and
re-verified (AGENTS, CLAUDE, README, PAD, SKILL v1.50.0 — every
lockstep site confirmed at the session-54 ship counts), then the
session-54 set (the formal session_54.md log, the session-54 plan's
post-execution record, worklog Task 54, the owner's narration). This
round is session 55, the standing instruction on the shipped tree.

Baseline gate GREEN at the documented counts (lint 0/0 · tsc 0 · unit
724/724, 40 files · build · smoke 16/16 · e2e 70/70, 9 specs · census
MATCH) — exactly the session-54 ship record, no drift; the standing
asks re-verified up front (the `.env`
`DATABASE_URL="file:../db/custom.db"` contract intact with `db/` at
the repo root; `.env.example` committed at provenance 1..54; the
vitest + playwright suites in place and current; the
sitemap/robots/manifest/OG family verified live against the reference
in this round's walk; `skills/` excluded from every gate). The
workspace re-cloned between rounds (the sandbox reset): `.env`
restored, the schema pushed, the seed re-run, the one-time
`bunx playwright install chromium` re-run. The neo-crm reference repo
re-cloned and re-checked per the standing instruction: unchanged since
the session-48..54 checks — its latest round is still its session-217
(HEAD b3d0fbe); no new lessons this round (the eighth consecutive
no-change check). The web-application skill + the skills catalog
internalized; tdd, clone-app-pat-pro, and the agent-browser doctrine
(computed styles as ground truth, never eyeballs) applied throughout.

## The audit

Three parallel dispatched subagents (AUDIT-1 API/lib seams, AUDIT-2
components/pages/effects, AUDIT-3 SEO/configs/tests/docs) — every
load-bearing finding hand-verified in source by the lead.
**AUDIT-1: 0C/0H/0M/1L/2I · AUDIT-2: 0C/0H/0M/1L/0I · AUDIT-3:
0C/0H/0M/1L/1I** — combined **0 Critical / 0 High / 0 Medium /
3 Low / 3 Info**. The session-54 diff itself verified correct on all
three lanes at its shipped boundaries (AUDIT-1 re-verified the S54-1
fully-bounded icon regex + the S54-6 precondition pin in source and
empirically — a11y-controls 29 + boot-env 55 GREEN; AUDIT-2 verified
all seven Tailwind v4 mitigations present, exact, and test-pinned, the
complete mobile-menu mechanic set, and the React 19 discipline —
166/166 across the eight named suites; AUDIT-3 re-derived every count
in the lockstep census from disk and declared the docs five-way
lockstep clean at 724/40/70/9/16/794, the plans map 1:1 with the 54
plan files, the ten provenance sites at 1..54 — lag 1, inside the
designed owner-narration window).

The decisive hand-verifications (all reproduced by the lead in source):
**S55-1 (AUDIT-2 F-1)** — `src/components/effects/floating-icons.tsx`
is the ONE effects file whose motion arms carry no pin: the suite's own
S47-4 header enumerates it as covering particle-text + iridescence
(+ reveal at S47-4), and tests/landing-page.test.ts pins only the
10-icon DOM contract. Verified live: neither `if (reduced) return;`
(line 78 — the reduced-motion static face; a deletion would run a
perpetual rAF transform loop for prefers-reduced-motion users,
invisible to axe and toBeVisible) nor `return () =>
cancelAnimationFrame(raf);` (line 99 — the cleanup; a deletion would
leak a per-frame loop per mount) appears in any `expect()` across the
test tree. Blast radius small (decorative, aria-hidden, one call site)
hence Low — but the S47-4 genus exactly: the fourth effects file joins
the suite's own convention.
**S55-2 (AUDIT-1 I2)** — `bun audit` (the AGENTS.md PERIODIC pre-ship
duty) reports 9 advisories: minimatch (moderate, eslint chain),
deepmerge-ts (high, prisma CLI › @prisma/config), the vite
8.3.0–8.3.2 family incl. three launch-editor advisories (vitest ›
@vitest/mocker › vite), source-map-js (high, the postcss chain —
reached via next and @tailwindcss/postcss). Lead triage verified: NONE
ride the runtime request path (the postcss/source-map usage is
build-time CSS compilation; prisma CLI/vitest/vite/eslint are
devDependencies; the runtime dependency diet unaffected). Recorded in
the session-55 plan per the duty's own form; no runtime action.
**S55-3 (AUDIT-3 I1)** — the sitemap.xml route's header comment omits
the one operator-critical sentence its two sibling routes carry
(robots.txt and manifest.json both state the build-time-inlining
posture); comment-only family symmetry.
**S55-4 (AUDIT-1 L1, register)** — the password/verify-code crypto seam
uses synchronous `scryptSync` (password.ts:15,23): every
login/verify/resend burns 1–2 scrypts, each stalling the whole event
loop. Under honest keying the per-route fixed-window limits bound the
aggregate; the amplification face requires the already-registered
XFF-rotation hazard. REGISTERED with the reason: the async-scrypt swap
at the pure seam is a sound future lift (the timing-equalizer doctrine
survives — both branches would pay the same awaited work), deliberately
not taken this round (the blast radius spans five routes + the
password seam's test family for a demo-posture performance face the
limiter already bounds).
**S55-5 (AUDIT-1 I1, register)** — the tech niche's `"ai"` keyword
(generator.ts:329) is unreachable as a bare token (keywordsOf's
`length >= 3` floor) but LIVE as a substring ("email".includes("ai") →
tech — live-probed: "AI is changing everything" → evergreen). REGISTERED
as the detectNiche substring-shape genus's own bare-token face: the
keyword is not dead weight, and niche-detection changes are a product
decision for a dedicated round.
**S55-6 (AUDIT-3 L1, reconcile-the-ask)** — the standing ask's
"robots.txt (the disallow /api/ family)" description never matched the
tree: robots.txt is deliberately Allow-all + the Sitemap line —
byte-parity with the reference's own 75-byte body (re-verified in this
round's walk), triple-pinned. The ask RE-SPELLED in this record;
adding a Disallow would be a deviation from the reference requiring a
Deviations-Ledger entry — not taken.

## The parity walk

**ALL CLONE FACES MATCH — the twenty-eighth consecutive clean walk, no
clone-side drift, no NEW reference-side drift.** The panel: inner
`px-6 py-4 space-y-3` byte-identical (24px/16px padding, block,
maxHeight none, transparent background both sides — the reference's
`bg-slate-900/98` dead-class render); linkTexts identical (Home, Tool,
Pricing, Contact, Upgrade to Pro – $19); Home teal rgb(45,212,191)
14px/500 block; the siblings rgb(203,213,225) 14px/500 block; the pill
rgb(15,23,42) 14px/600 block. The hamburger cursor pointer both sides
with the `md:hidden p-2 text-slate-300` base identical (the reference
still ships NO aria family — our expanded family the documented
superset). Escape leaves the reference's panel open / closes ours with
focus returned to the toggle (the documented superset, a REAL key
press). The outside-tap face (a genuine non-nav H1 tap,
pathname-checked) leaves it open on BOTH sides. Route-change close
verified both sides at /Pricing (the reference UNMOUNTS the closed
panel — panelCount 0; ours hides it in-DOM — the S26-1 design, hidden
attr true, aria false). The desktop census: 6 VISIBLE links IDENTICAL
both sides, CLONE total 11 = 6 visible + 5 hidden panel anchors. The
brand wordmark gradient byte-identical both sides (linear-gradient(to
right, rgb(45,212,191), rgb(251,191,36)), 18px/700, transparent fill).
The five-route head census identical (titles + descriptions +
canonicals). Sitemap 4 URLs both (weekly, 1.0/0.8/0.8/0.8) + robots
identical modulo origin. The generator probe symmetrically dead/live
(R: no copy button, no generation lands; L: a 6-hashtag post + the
copy button, quota 0→1 — the D-1 documented superset). The login
round-trip both landing the landing (R settled /Home; L / — the
documented 308 deviation). Walk-protocol note: the session-53/54
protocol held throughout (settle waits, visibility-checked panel
probes, real key presses, settled-path recording, hydration-aware
generator with the quota cleared); the walk's first panel probe read
the outer flex bar before the targeted panel-scoped div probe landed
(the session-50/51 precedent — resolved by the targeted probe, no
finding).

## The cures (TDD — the battery on record; the ownership divisions enumerated at birth)

- **S55-1 (LOW, AUDIT-2 F-1)** — the float-field motion-arm pin: one
  describe + one it added to tests/effects-motion.test.ts, mirroring
  the S47-4 form (the S48-7 comment-stripped bare() read): pins
  `if (reduced) return;` (the reduced-motion static face — NO rAF
  registration may sit in the reduced shape), `return () =>
  cancelAnimationFrame(raf);` (the cleanup — the effects lifecycle
  law), and the static render's `style={{ left: f.left, top: f.top,
  opacity: 1 }}` (the reduced face never paints opacity 0). Born GREEN
  against the cured source. Battery: (a) the reduced plant — line 78
  removed → exactly the new it REDs (the other 13 green); restored →
  GREEN; (b) the cleanup plant — the return gutted to `return () =>
  {};` → exactly the new it REDs; restored → GREEN; the source
  byte-identical through the round (the empty post-restore diff).
- **S55-2 (INFO, AUDIT-1 I2)** — the bun-audit triage recorded in the
  session-55 plan (all dev-toolchain/build-time; none on the runtime
  request path; no runtime action) — the AGENTS.md duty's own required
  form. No code change.
- **S55-3 (INFO, AUDIT-3 I1)** — the sitemap route's header comment
  gains the two sibling routes' exact sentence: "Static content:
  prerendered at build time (NEXT_PUBLIC_SITE_URL is inlined — set it
  before `bun run build` in production)." Comment-only (the
  seo-surfaces S37-4 pins read comment-stripped; no §12 row).
- **S55-4 (register)** — the scryptSync blocking posture, registered
  with the reason (the async-swap lift documented for the provider
  face).
- **S55-5 (register)** — the "ai" bare-token gap, registered as the
  detectNiche substring-shape genus's own face.
- **S55-6 (reconcile)** — the robots.txt standing ask re-spelled in
  the session-55 plan's record: byte-parity (Allow-all + Sitemap line)
  is the doctrine.

**Accepted/observed register (the standing residuals carried forward
unchanged — the session-54 register plus S55-4/S55-5):** the nav links'
UA-default focus outline; the reduced-motion live-toggle gap; the quota
store's midnight rollover; the classifier's P1001/P1002 500 face; the
api-robustness census's route.ts-only matcher; the hero-portrait
weight/resize; the workspace's ambient absolute DATABASE_URL; the
detectNiche substring shape; the proxyHopDepth parse mirror; the
setSessionCookie unit gap; the signup first-admin race; the
verify/resend read-then-write pair; the enumeration faces; the
single-node limiter; the 404/error main-landmark posture; the smoke-leg
retired-form negatives; the in-process limiter; the 404 client-render
body; the formula-driven generator; the in-app OTP delivery; the footer
© build-time year; the forgot-password link-clobber (PAD §11);
ContactMessage.email's unindexed readback scan; the
failed-regeneration post discard; the verify-digits wipe while a resend
is in flight; the two sanctioned window.location.origin reads; the
novel strip idioms escaping the textual arms; the implementation-plan
§4 unticked checkboxes; the symlinkSync Windows-portability face; the
route-tier exact-500 e2e arm; the failed re-submit inside the 2.6s
window keeping the stale "Message Sent!" label; the ok-16 partial
family summary; the `.env` provenance register entry re-scope; the REF
body fallback ink; the oklab-vs-rgba `/60` serialization family; the
dev-server flapping transient + the settle protocol; the parseEnvFile
unclosed-quote divergence (S53-6); the bind-mount alias dedupe
direction (S53-7); the stripComments JSX-brace family gap (S53-7); the
walk-protocol lessons (S53-7); the post-unmount error/catch toasts
(S54-7); the scryptSync blocking posture (S55-4); the "ai" bare-token
gap (S55-5).

## The count re-anchor

UNIT 724 → 725 (the S55-1 pin is ONE new it), SUITES 40 unchanged,
E2E 70 unchanged, E2E_SPECS 9 unchanged, SMOKE 16 unchanged, BADGE
794 → 795. The s55 ladder entry written (with the s51..s54 held-run
summarized — no growth in those rounds, the ladder's own convention).
No §12 row touched (floating-icons.tsx's line count unchanged — the
cure is test-only; sitemap.xml/route.ts is not a §12 file). The ten
provenance sites re-anchored to 1..55 — lag 0 at ship; SKILL v1.50.0 →
v1.51.0.

## Verified

- The full gate on the exact commit tree (below)
- The mutation battery on record: the reduced plant (RED exactly the
  new it, restored GREEN) and the cleanup plant (RED exactly the new
  it, restored GREEN) — the source byte-identical through the round
- The parity walk post-cure: the standing faces hold, no drift
- Captures 117/118 on the dev server (the owner-instructed posture,
  the session-29..54 precedent): the mobile-menu open clean-walk at
  390×844 + the landing hero at 1280×800, PIL-verified
- Docs lockstep: README (badge 795, the two 40-files/725-tests sites,
  the session-55 row on the continuous table, the gate footer); AGENTS
  (the unit counts; the plans map's fifty-fifth round); CLAUDE (the
  unit counts); PAD (§8.1's unit row + the §8.3 lockstep sentence);
  SKILL v1.50.0 → v1.51.0 (frontmatter, §0.5 1..55, project_state, §11
  checklist, Appendix A's session-55 row, Appendix B's header); the
  ten provenance sites at 1..55; worklog Task 55; this session log;
  the plan's post-execution record

**Gate at the session-55 ship: lint 0/0 · tsc 0 · unit 725/725 (40
files) · build · smoke 16/16 · e2e 70/70 (9 specs) · census MATCH.**
