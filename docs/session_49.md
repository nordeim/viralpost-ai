# Session 49 — The envprod Artifact Closure + The Copied-Flag Reset + The Strip-Chain Sweep + The Plans-Map Truth + The Prose Batch (2026-11-14)

The round opened on the shipped tree (`5b3b87d` — session-48's commit;
the owner's narration commit `0046fc4` followed, carrying session_49.md
as the round-48 narration — replaced now by this round's formal log).
The core docs read in full (AGENTS, CLAUDE, README, PAD, SKILL
v1.44.0), then the session-48 set (session_48.md, the session-48 plan,
worklog Task 48, the owner narration). This round is session 49.
Baseline gate GREEN at the documented counts (lint 0/0 · tsc 0 · unit
718/718, 40 files · build · smoke 16/16 · e2e 70/70, 9 specs · census
MATCH); the standing asks re-verified up front (the `.env`
`DATABASE_URL="file:../db/custom.db"` contract intact with `db/` at
the repo root — census MATCH; the vitest + playwright suites in place
and current — chromium-1248 present; the sitemap/robots/manifest/OG
family verified live against the reference in this round's walk;
`skills/` excluded from every gate; the committed `.env.example`
matching the six-knob contract).

The web-application skill + the skills catalog internalized; tdd,
clone-app-pat-pro, and the agent-browser doctrine (computed styles as
ground truth, never eyeballs) applied throughout. The neo-crm
reference repo re-checked per the standing instruction: unchanged
since the session-48 check — its latest round is still its
session-217 (file session_459.md, HEAD b3d0fbe); stack pins identical;
no new lessons this round.

## The audit

Three parallel dispatched subagents (AUDIT-1 API/lib seams, AUDIT-2
components/pages/effects, AUDIT-3 SEO/configs/tests/docs) — every
load-bearing finding hand-verified in source by the lead.
**AUDIT-1: 0C/0H/1M/2L/3I · AUDIT-2: 0C/0H/1M/0L/4I · AUDIT-3:
0C/0H/1M/2L/2I** — combined **0 Critical / 0 High / 3 Medium / 4 Low /
9 Info**. The session-48 diff itself verified correct and complete on
all three passes — all three Medium findings are standing gaps the
prior rounds left open.

The decisive hand-verifications: **S49-1 (AUDIT-1 M1)** — Next 16.4.2's
`writeStandaloneDirectory` (read in the installed
node_modules/next/dist/build/index.js:321-330) copies BOTH `.env` AND
`.env.production` into `.next/standalone/` (the loadedEnvFiles reduce
filter is exactly the pair) — immune to outputFileTracingExcludes; the
build script's hygiene rm covered only `.env`, and the standard-
convention operator the S47-2/S48-2 shadow seam exists to serve (a
`.env.production` carrying the real AUTH_SECRET + an absolute
DATABASE_URL per DEPLOYMENT.md §4) silently shipped that file inside
the deployable artifact, where the standalone server LOADS it. **S49-2
(AUDIT-2 M1)** — generator-card's `generate()` cleared the post but
never the `copied` flag or its 2s timer: a regeneration inside the
window mounted the NEW post's button already reading "Copied!" (a
state for content never copied; pasting within the window yielded the
OLD post's text). **S49-3 (AUDIT-3 M1)** — the S48-1 presence arm
asserted the hardened two-pass shape only for the 10 CARRIERS while
~25 further inline two-pass sites (probe-counted: 20 files, 36 sites)
carried no presence owner: a future line-pass drop in an inline
carrier re-opened the phantom-eating genus with the ban still green.

## The parity walk

Live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`, viewport confirmed 390×844 before every
mobile probe, computed styles as ground truth. **ALL CLONE FACES
MATCH — the twenty-second consecutive clean walk — no clone-side
drift, no NEW reference-side drift** (the session-45 404-title bare
posture and the D-1 dead-generator posture both persist as the
documented supersets). The mobile menu works exactly as expected (the
owner's standing concern): the panel byte-identical both sides (5
links; Home's teal rgb(45,212,191) 14px/500 display block, the
siblings' rgb(203,213,225) 14px/500, the Gumroad pill "Upgrade to Pro
– $19" 14px/600 at the templixco href; the container px-6 py-4
display block + max-height none + transparent bg); the hamburger
cursor pointer both sides (the Tailwind v4 standing concern holding);
the reference's hamburger still ships NO aria family (our expanded
family the documented superset); Escape leaves the reference's panel
open (our superset closes with focus returned); the same-route Logo
click and the outside-tap face leave it open on BOTH sides;
route-change close verified both sides (panel closed, /Pricing both);
the desktop nav byte-identical (6 links, the active face following
the route); the five-route head census identical (titles +
descriptions); sitemap 4 URLs both + robots identical modulo origin;
the generator probe symmetrically dead/live (R: the failure text, no
copy button; L: a 5-hashtag post + the copy button — re-probed
targeted after the walk's element-scoped hashtag selector proved
blind to the single-text-block post); the login round-trip both
landing the landing (R `/Home`, L `/` — the documented 308
deviation), the clone session verified live via /api/auth/me (Demo
Creator, role admin).

## The cures (TDD — four mutation batteries on record; the battery caught a birth defect for the FOURTH consecutive round)

- **S49-1 (MEDIUM, AUDIT-1 M1)** — the .env.production artifact
  closure, three sites + the census pin: the build script's tail
  rm now covers the exact copy pair
  (`.env .env.production`); the nft excludes gain `.env.production` +
  `.env.local`; smoke leg 16's mirror gains the same pair (the S34-7
  doctrine); the next.config "double-cure" comment re-spells to name
  BOTH copied files. The gate-script hygiene it extends IN PLACE —
  one face (the artifact can never ship an env file) across its three
  co-pinned sites, documented per the N12-2 doctrine. Battery: each
  site's defect planted separately → exactly the one it RED, each
  time.
- **S49-2 (MEDIUM, AUDIT-2 M1)** — the copied-flag reset:
  `generate()` clears the copied state + its armed timer before the
  fetch (the S17-6 unmount-hygiene idiom applied to the regeneration
  edge). NEW PIN in landing-page (beside the copy round-trip it).
  Battery: the cure removed → exactly the pin RED.
- **S49-3 (MEDIUM, AUDIT-3 M1)** — the strip-chain sweep: the S48-1
  presence arm (the CARRIERS enumeration) REDESIGNED into a
  family-wide chain invariant — every anchored block-pass site in
  EVERY unit file must sit exactly one method-dot after a preceding
  line-pass, the four documented CSS-only sites (design-tokens ×2,
  typography ×2) exactly exempted. The one-idiom doctrine is now
  mechanically enforced family-wide — future files cannot escape.
  The battery caught the pin's own birth defect: the S48-1 needles
  carry no leading dot (the order check never needed one), so the
  first sweep form asserted a gap the needles could never see — the
  dot-gap redesign, the neo-crm genus a FOURTH consecutive round.
  Batteries: the line-drop in an inline carrier → exactly the sweep
  RED naming the file; the block-only plant in a fresh file → exactly
  the sweep RED; the exemption-entry removal → the live orphans trip
  (the exemption is load-bearing, never vacuous).
- **S49-4 (LOW, AUDIT-3 L1)** — the plans-map truth: the session-48
  round (missed at the session-48 ship — the map's enumeration ended
  at session-47 while session_48.md's lockstep list claimed the
  update, the docs-lie genus) and this round's entry both appended to
  AGENTS's `docs/plans/` map. NEW PIN in docs-counts: the
  tail-currency arm — the map's last session-N must equal the
  plan-file count on disk, no skipped middles. Battery: the tail
  entry removed → exactly the arm RED.
- **S49-5 (LOW, AUDIT-3 L2)** — the logs-prose truth: the .gitignore
  F9-11 closing comment + the SKILL §11 checklist's git-status line
  re-spelled to the actual rules (db/'s binary rules; skills/ the
  owner's TRACKED catalog; log files the file-level dev.log/server.log
  rules — no phantom `logs/` rule; the F9-11 never-existing-paths
  doctrine held, no new dead entries).
- **S49-6 (LOW, AUDIT-1 L1)** — the cascade mode-derivation hedge:
  the S48-2 docblock names the mechanism truth (the FILE LIST mirrors
  Next exactly; the MODE derivation differs at the edges — Next uses
  the dev flag, bun and the mirror use NODE_ENV; the three canonical
  postures agree on both engines).
- **S49-7 (LOW, AUDIT-1 L2)** — the classifier scope note:
  isTransientDbFailure's docblock documents the deliberate
  P2024/P2028-only scoping (P1001/P1002 are outage shapes, not
  transient — health's own 503 owns the signal; P2034 unreachable
  without interactive transactions).
- **S49-8 (INFO→cure, AUDIT-2 I1)** — the Resend pending face: the
  verify view's Resend button relabels "Please wait…" in flight,
  joining the four sibling submits (the platform-inherited view — no
  reference face constrains it). The S22-6 family it extended in
  place. Battery: the relabel removed → exactly the extended arm RED.
- **S49-9 (INFO→cure, AUDIT-3 I1)** — the smoke ok-16 message
  re-spell (the actual family set, no duplicate "docs").
- **S49-10 (INFO→cure, AUDIT-3 I2)** — the worklog Task-48 heading
  normalized to the family form, content unchanged.
- **S49-11 (INFO→cure, AUDIT-1 I1)** — the shadow-warning
  rewrite-regime clause (the docblock hedge: the pinned-bun regime
  re-anchors relative values inside the repo — live-verified; a future
  absolutizing runtime would honor them verbatim, potentially outside
  — db-path's header is the deep contract). The operator message
  stays as-is: true in the shipped regime, pinned by the S48-3 pins.

**Accepted/observed register (this round's tail, with reasons):** the
nav links' UA-default focus outline (WCAG 2.4.7 passes — the
keyboard-only ring superset family covers buttons; the links'
class-for-class parity posture documented-deliberate); the
reduced-motion live-toggle gap (sampled at mount; the reference
identical); the quota store's midnight rollover (the reference's SPA
counter identical); the classifier's P1001/P1002 500 face (documented
by S49-7, not widened); the api-robustness census's route.ts-only
matcher (carried forward); the hero-portrait weight/resize (carried
forward); the workspace's ambient absolute DATABASE_URL (the F11-18
recovery re-anchors it — the documented intentional-override
contract); the standing accepted residuals (the detectNiche substring
shape, the proxyHopDepth parse mirror, the setSessionCookie unit gap,
the signup first-admin race, the verify/resend read-then-write pair,
the enumeration faces, the single-node limiter, the 404/error
main-landmark posture, the smoke-leg retired-form negatives, the
in-process limiter, the 404 client-render body, the formula-driven
generator, the in-app OTP delivery, the footer © build-time year)
carried forward unchanged.

## The count re-anchor

UNIT 718 → **720** (+2 — the S49-2 copied-reset pin + the S49-4
plans-map arm; the S49-1 closure, the S49-3 sweep, and the S49-8 face
extend existing its in place, the one-face-one-pin doctrine), SUITES
40 unchanged, E2E 70 unchanged, E2E_SPECS 9 unchanged, SMOKE 16
unchanged, badge 788 → **790**. Constants re-anchored FIRST; the
census walked the doc sites RED→GREEN. PAD §12's api row re-anchored
315 → 323 + generator-card row 273 → 279; the ten provenance sites
re-anchored to 1..49 — lag 0 at ship; SKILL v1.44.0 → v1.45.0. The
mid-round census trips cured in the same commit: the design-tokens
step-less census caught the new "shadow-file" English compound (the
S17-5 allowlist genus — "file" joined NON_COLOR), and the
error-boundaries full-line smoke pin re-anchored to the 31-entry list.

## Verified

- The full gate on the exact commit tree (below)
- The four mutation batteries single-tooth on record: the
  copied-reset revert → exactly its pin; the three strip-chain plants
  → exactly the sweep (each); the three envprod site-defects →
  exactly the closure it (each); the plans-map tail removal → exactly
  the arm
- The redundant-arm check: every new arm verified single-tooth (the
  S49-3 sweep REPLACED the CARRIERS arm — never co-pinned; the S49-1
  closure's three sites co-pinned in ONE it, documented in its
  comment)
- The parity walk post-cure: the standing faces hold, no drift
- Captures 105/106 on the dev server (the owner-instructed posture,
  the session-29..48 precedent): the mobile-menu open clean-walk at
  390×844 + the landing hero at 1280×800, PIL-verified
- Docs lockstep: README (badge 790, the 40/720 + 9/70 rows, the
  session-49 row on the continuous table, the re-anchored footer);
  AGENTS (counts, the plans map's forty-eighth AND forty-ninth
  rounds); CLAUDE (counts); PAD (§8.1 40/720 + 70, §8.3 720/70/16,
  §12's api + generator-card rows); SKILL v1.44.0 → v1.45.0
  (frontmatter, §0.5 1..49, Appendix A's session-49 row, Appendix B's
  header + counts, the pre-ship checklist's git-status line +
  counts); the ten provenance sites at 1..49; worklog Task 49 (the
  Task-48 heading normalized); this session log; the plan's
  post-execution record

**Gate at the session-49 ship: lint 0/0 · tsc 0 · unit 720/720 (40
files) · build · smoke 16/16 · e2e 70/70 (9 specs) · census MATCH.**
