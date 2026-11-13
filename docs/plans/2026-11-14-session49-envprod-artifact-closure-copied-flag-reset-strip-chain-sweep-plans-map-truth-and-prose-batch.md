# Session 49 — The .env.production Artifact Closure + The Copied-Flag Reset + The Strip-Chain Sweep + The Plans-Map Truth + The Prose Batch

## Context

Session 48 shipped `5b3b87d` (the stripComments one-idiom cure, the
shadow-env cascade mirror, the toast dep-array pin, the CLS IHDR face, the
Appendix-B header census, the count interpolation); the owner's narration
commit `0046fc4` followed, carrying session_49.md as the round-48
narration — replaced now by this round's formal log. The standing
instruction re-ran end to end: docs review → baseline gate → the
comprehensive audit (three parallel subagents + the neo-crm currency
check) → the live reference parity walk → the TDD cures → the gate →
captures → push.

**Baseline (the tree at `0046fc4`, verified in place):** lint 0/0 · tsc 0 ·
unit 718/718 (40 files) · build · smoke 16/16 · e2e 70/70 (9 specs) ·
census MATCH · the `.env` `DATABASE_URL="file:../db/custom.db"` contract
intact with `db/` at the repo root ✓ · the vitest + playwright suites in
place and current (chromium-1248 present) ✓ · the sitemap/robots/manifest/
OG family verified live against the reference in this round's walk ✓ ·
`skills/` excluded from every gate ✓ · `.env.example` committed, matching
the six-knob contract ✓.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib
seams, AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs —
every load-bearing finding hand-verified in source by the lead, the
decisive probes below): **AUDIT-1: 0C/0H/1M/2L/3I · AUDIT-2:
0C/0H/1M/0L/4I · AUDIT-3: 0C/0H/1M/2L/2I** — combined
**0 Critical / 0 High / 3 Medium / 4 Low / 9 Info**. The session-48 diff
itself verified correct and complete on all three passes — all three
Medium findings are standing gaps the prior rounds left open (a Next-16
copy path no round probed, a state-reset edge on the core surface, and
the S48-1 presence arm's enumeration-vs-family gap).

**The decisive hand-verifications:**
- **S49-1 (AUDIT-1 M1)**: Next 16.4.2's `writeStandaloneDirectory`
  (node_modules/next/dist/build/index.js:321-330, read in the installed
  source) copies BOTH `.env` AND `.env.production` into
  `.next/standalone/` (the loadedEnvFiles reduce filter is exactly
  `['.env', '.env.production']`) — immune to outputFileTracingExcludes.
  The build script's hygiene tail removes only `.env`
  (`rm -f .next/standalone/.env`), the excludes list carries neither
  production-family name, and smoke leg 16's mirror checks neither. The
  standard-convention operator the S47-2/S48-2 shadow seam exists to
  serve (a `.env.production` carrying the real AUTH_SECRET + an absolute
  DATABASE_URL per DEPLOYMENT.md §4) silently ships that file inside the
  deployable artifact — where the standalone server LOADS it (cascade
  file 3 of 4; the `.env` copy is rm'd, so `.env.production` is the only
  env file present). The default repo posture carries no
  `.env.production`, which is why every gate stays green today — the gap
  is the convention posture, exactly the S48-2 genus one layer deeper.
- **S49-2 (AUDIT-2 M1)**: `generator-card.tsx`'s `generate()` clears the
  post (`setPost("")`, line 83) but never clears `copied` or its 2s reset
  timer — a user who copies post A and regenerates within the window
  sees post B's button read "Copied!" (a state for content never copied;
  pasting within the window yields post A's text). No test or session doc
  covers the edge (searched tests/ and docs/).
- **S49-3 (AUDIT-3 M1)**: the S48-1 presence arm asserts the hardened
  two-pass sequence only for the 10 CARRIERS (the named-helper files);
  the inline carriers — boot-env, design-tokens, effects-motion,
  generator, landing-page, login-views, page-titles, password-seam,
  rate-limit, typography — carry ~25 further two-pass sites no presence
  arm owns (probe-counted: 20 files carry the line-pass signature, 36
  sites total; 19 files carry the anchored block-pass; every block-pass
  site is chain-preceded by the line-pass EXCEPT the four documented
  CSS-only strips — design-tokens ×2, typography ×2, where a `//` line
  pass would eat `https://` URLs). A future edit dropping only the line
  pass from an inline carrier re-opens the phantom-open genus while the
  ban stays green — the "family-wide" claim in the docs is over-broad
  relative to what is mechanically enforced.

**The parity walk** (live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`; viewport confirmed 390×844 before every
mobile probe; computed styles as ground truth, Playwright as the engine):
**ALL CLONE FACES MATCH — the twenty-second consecutive clean walk, no
clone-side drift, no NEW reference-side drift.** The mobile menu works
exactly as expected (the owner's standing concern): the panel
byte-identical both sides (link count 5; Home's teal rgb(45,212,191)
14px/500 block, the siblings' rgb(203,213,225) 14px/500 block, the
Gumroad pill "Upgrade to Pro – $19" 14px/600 at the templixco href; the
container px-6 py-4 display block + max-height none + transparent bg);
the hamburger cursor pointer both sides (the Tailwind v4 standing concern
holding); the reference's hamburger still ships NO aria family (our
expanded family the documented superset); Escape leaves the reference's
panel open (our superset closes); the same-route Logo click and the
outside-tap face leave it open on BOTH sides; route-change close
verified both sides (panel closed, /Pricing both); the desktop nav
byte-identical (6 links, the active face following the route); the
five-route head census identical (titles + descriptions); sitemap 4 URLs
both + robots identical modulo origin; the generator probe
symmetrically dead/live (R: the failure text + no copy button; L: a
5-hashtag post + the copy button — the D-1 documented superset,
re-probed targeted); the login round-trip both landing the landing
(R /Home, L / — the documented 308 deviation); the clone session
verified live via /api/auth/me (Demo Creator, role admin).

The neo-crm reference repo re-checked per the standing instruction:
unchanged since the session-48 check (HEAD b3d0fbe; its latest round is
still its session-217 / file session_459.md); stack pins identical; no
new lessons this round.

## The cures (TDD — every new arm battery-planted, the mutation
batteries per the house doctrine; every new arm single-tooth, the
redundant-arm check enumerated at birth)

- **S49-1 (MEDIUM, AUDIT-1 M1)** — the .env.production artifact
  closure, three sites + the census pin: (1) the build script's tail
  becomes `rm -f .next/standalone/.env .next/standalone/.env.production`
  (the exact pair Next's writeStandaloneDirectory copies — read in the
  installed build/index.js); (2) `next.config.ts`'s
  outputFileTracingExcludes gains `.env.production` + `.env.local`
  (belt-and-braces with the existing `.env`/`.env.example` pair) and the
  "double-cure" comment re-spells to name BOTH copied files; (3) smoke
  leg 16's mirror list gains `.env.production` + `.env.local` (the
  S34-7 mirror doctrine). The existing gate-script hygiene it extends
  IN PLACE (its `rm -f .next/standalone/.env` substring assertion stays
  green — the target list only grows): + the build's
  `.next/standalone/.env.production` target, + the excludes-list entry,
  + the smoke-mirror entry — one it owning one face (the artifact can
  never ship an env file) across its three co-pinned sites, documented
  in the it's comment per the N12-2 doctrine. The gate-script header's
  "double-cure" sentence re-spells to the pair. Battery: each site's
  defect planted separately (the rm target dropped / the excludes entry
  dropped / the smoke entry dropped) → exactly the one it RED, each
  time.
- **S49-2 (MEDIUM, AUDIT-2 M1)** — the copied-flag reset:
  `generate()` clears the stale copied state before the fetch —
  `if (resetTimer.current) clearTimeout(resetTimer.current);
  setCopied(false);` alongside `setPost("")` (the S17-6 unmount-hygiene
  idiom applied to the regeneration edge). NEW PIN in landing-page
  (beside the copy round-trip it): the generate body carries the reset
  sequence before the post clear. Battery: the cure removed → exactly
  the pin RED.
- **S49-3 (MEDIUM, AUDIT-3 M1)** — the strip-chain sweep: the S48-1
  presence arm (the CARRIERS enumeration) is REDESIGNED into a
  family-wide chain invariant — for every unit test file, EVERY
  occurrence of the anchored block-pass must be immediately
  chain-preceded by the line-pass (flattened; at most one space
  between), with the four documented CSS-only sites exempted by an
  exact per-file count map (design-tokens ×2, typography ×2 — a `//`
  line pass would eat `https://` URLs in CSS). The ban arm stays
  unchanged. The one-idiom doctrine is now enforced mechanically
  family-wide — future files cannot escape (the enumeration gap closed
  the way the ban closed the naive form). Probe-verified green at birth
  (19 files fully chained, 2 files carrying exactly the exempted
  orphans). Batteries: (a) the line pass dropped from an inline carrier
  (rate-limit) → exactly the sweep RED naming the file; (b) a block-only
  strip planted in a file that carries none → exactly the sweep RED;
  (c) an exemption entry removed → the design-tokens orphans trip the
  sweep (the exemption is load-bearing, never vacuous).
- **S49-4 (LOW, AUDIT-3 L1)** — the plans-map truth: the session-48
  round (missed at the session-48 ship — the plans-map enumeration
  ended at session-47 while session_48.md's lockstep list claimed the
  update, the docs-lie genus) and this round's session-49 entry both
  append to AGENTS.md's `docs/plans/` map. NEW PIN in docs-counts: the
  plans-map tail-currency arm — the map's LAST `session-N` token must
  equal the count of plan files on disk (the map enumerates every round
  1:1; a lag or a skip REDs with the fix named). Battery: the map's
  last entry removed → exactly the arm RED.
- **S49-5 (LOW, AUDIT-3 L2)** — the logs-prose truth: the .gitignore's
  F9-11 closing comment re-spells to the actual rules (db/ keeps its
  binary rules above; skills/ is the owner's TRACKED catalog, never
  ignored; log files are the file-level dev.log/server.log rules above)
  — the current sentence implies a `logs/` rule that exists nowhere
  (`git check-ignore logs/foo.log` exits 1). The SKILL §11 checklist's
  `git status` comment line re-spells to the same truthful enumeration.
  No new dead rules (the F9-11 doctrine: never-existing paths get no
  entries). Prose only.
- **S49-6 (LOW, AUDIT-1 L1)** — the cascade mode-derivation comment
  hedge: the S48-2 docblock in boot-env.ts gains the one-sentence truth
  (Next derives the cascade's mode from the dev flag with NODE_ENV only
  gating the "test" case; bun's own loader keys off NODE_ENV — the
  mirror matches both engines on the three canonical postures, and the
  "mirror Next's ACTUAL cascade" claim is scoped to the file list, not
  the mode mechanism). Comment only.
- **S49-7 (LOW, AUDIT-1 L2)** — the transient-classifier scope comment:
  isTransientDbFailure's docblock gains the one-sentence deliberate-
  scoping note (P2024/P2028 only — the pool/timeout family; P1001/P1002
  answer 500 by design, health's own 503 owns the outage signal).
  Comment only.
- **S49-8 (INFO→cure, AUDIT-2 I1)** — the Resend pending face: the
  verify view's Resend button relabels in flight
  (`{resending ? "Please wait…" : "Resend"}`), joining the four sibling
  submits' family (the verify view is platform-inherited — no reference
  face constrains it). The S22-6 pending-family it extends IN PLACE
  with the face assertion. Battery: the relabel removed → exactly the
  extended arm RED.
- **S49-9 (INFO→cure, AUDIT-3 I1)** — the smoke ok-16 message re-spell:
  the summary names the actual families without the duplicated "docs"
  (env files/.git/db/skills/docs/uploads/logs/configs/scripts/tests).
  Prose only, in place.
- **S49-10 (INFO→cure, AUDIT-3 I2)** — the worklog Task-48 heading
  normalized to the family form ("## Task 48 — …"), the content
  unchanged.
- **S49-11 (INFO→cure, AUDIT-1 I1)** — the shadow-warning regime
  clause: the S48-3 docblock gains the rewrite-regime hedge (in the
  pinned-bun 1.3.14 regime a relative shadow value reaches process.env
  raw and re-anchors inside the repo — live-verified; a future
  absolutizing runtime would honor it verbatim, potentially outside the
  repo — the db-path header's invocation/version-conditional note is
  the deep contract). The operator message stays as-is (true in the
  shipped regime, pinned by the S48-3 pins). Comment only.

**Accepted/observed register (this round's tail, with reasons):** the
nav links' UA-default focus outline (WCAG 2.4.7 passes — focus is
visible; the keyboard-only ring superset family covers buttons, the
links' posture documented-deliberate — the parity class list stays
class-for-class); the reduced-motion live-toggle gap (sampled at mount;
CSS-vectored motion collapses live, the canvas loops remount-refresh —
industry-standard posture, the reference identical); the quota store's
midnight rollover (numbers compare by value; the reference's SPA
counter identical); the classifier's P1001/P1002 500 face (documented
by S49-7 instead of widened — a deleted db file is not transient);
the api-robustness census's route.ts-only matcher (carried forward);
the hero-portrait weight/resize (carried forward); the workspace's
ambient absolute DATABASE_URL (the F11-18 recovery re-anchors it — the
documented intentional-override contract); the standing accepted
residuals (the detectNiche substring shape, the proxyHopDepth parse
mirror, the setSessionCookie unit gap, the signup first-admin race,
the verify/resend read-then-write pair, the enumeration faces, the
single-node limiter, the 404/error main-landmark posture, the
smoke-leg retired-form negatives, the in-process limiter, the 404
client-render body, the formula-driven generator, the in-app OTP
delivery, the footer © build-time year) carried forward unchanged.

## The count re-anchor (draft — the census's own guards own the truth)

UNIT 718 → **720** (+1 landing-page: the S49-2 reset pin; +1
docs-counts: the S49-4 plans-map arm; the S49-1 closure extends
gate-script's hygiene it in place; the S49-3 sweep redesigns the S48-1
presence it in place; the S49-8 face extends the S22-6 it in place),
SUITES 40 unchanged, E2E 70 unchanged, E2E_SPECS 9 unchanged, SMOKE 16
unchanged, badge 788 → **790** (= 720 + 70 — the BADGE = UNIT + E2E
guard arbitrates). PAD §12's api row + generator-card row re-anchor to
the live wc -l (the comment cures add lines). The ten provenance sites
re-anchor to 1..49 — lag 0 at ship; SKILL v1.44.0 → v1.45.0.

## Docs lockstep at ship

README (badge 790, the 40/720 + 9/70 rows, the session-49 row on the
continuous table); AGENTS (counts, the plans map's forty-eighth AND
forty-ninth rounds); CLAUDE (counts); PAD (§8.1 40/720 + 70, §8.3
720/70/16, §12's api + generator-card rows, Last Updated); SKILL
v1.44.0 → v1.45.0 (frontmatter, §0.5 1..49, Appendix A's session-49
row, Appendix B's header + counts, the pre-ship checklist's git-status
line + counts); the ten provenance sites at 1..49; worklog Task 49
(the Task-48 heading normalized); docs/session_49.md (the formal log
replacing the owner's narration); this plan's post-execution record.

## The tree check, commit, and push

The designed change set only — no stray files; `git status` clean of
.env/.db/.key. Conventional Commit to `main` only, push via the SSH
wrapper runbook (docs/how-to-git-push-using-ssh-wrapper_SKILL.md):
the wrapper, the dry-run, the real push, the remote verification, the
key destruction.

---

## Post-execution record

Executed as designed, with two material deviations, both
battery-driven or census-corrected:

1. **The S49-3 sweep's battery caught a birth defect** (the FOURTH
   consecutive round, the neo-crm genus): the S48-1 runtime-constructed
   needles carry no leading dot (the order check they were built for
   never needed one), so the first sweep form — asserting the text
   before each block pass ENDS with the line pass — could never see
   the method-chain dot that always sits between the two passes. The
   redesigned check asserts the gap itself: the line pass's last
   occurrence before the block pass must sit exactly one method-dot
   away ("." single-line, " ." multi-line flattened). Proven green at
   birth on the full family (19 chained files, 2 files carrying
   exactly the exempted CSS-only orphans), then all three batteries
   fired exactly their designed REDs.
2. **The mid-round census trips** (both cured in the same commit, the
   censuses working as designed): the design-tokens step-less census
   caught the new "shadow-file" English compound in the S49-11
   docblock (the S17-5 allowlist genus — "file" joined NON_COLOR with
   its own provenance comment), and the error-boundaries full-line
   smoke pin demanded the 31-entry re-anchor (the pinned-shape-
   updates-with-the-list doctrine).

The S49-1 closure's three sites are co-pinned in ONE gate-script it
(one face — the artifact can never ship an env file — across the
build rm, the nft excludes, and the smoke mirror; documented in the
it's comment per the N12-2 doctrine; the three-site battery planted
each defect separately and each tripped exactly the one it). The
S49-3 sweep REPLACED the S48-1 CARRIERS presence arm (the
one-face-one-pin doctrine — never co-pinned; the ban arm stays
unchanged).

The gate ran green on the exact shipped tree: lint 0/0 · tsc 0 ·
unit 720/720 (40 files) · build · smoke 16/16 · e2e 70/70 (9 specs) ·
census MATCH. Captures 105/106 PIL-verified. Pushed to main via the
SSH wrapper; remote verified.
