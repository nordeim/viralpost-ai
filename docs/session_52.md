# Session 52 — The StrictMode Mounted Re-Arm + The Comment-Truth Pair + The Icon-Pin Strength + The statSync Identity + The Dotdot Arm + The Donor Marker + The Ladder Arithmetic (2026-11-14)

The round opened on the shipped tree (`e24c803` — session-51's commit;
the owner's narration commit `084fba4` followed, carrying session_52.md
as the round-51 narration — replaced now by this round's formal log).
The core docs re-read and re-verified (AGENTS, CLAUDE, README, PAD,
SKILL v1.47.0 — every lockstep site confirmed at the session-51 ship
counts), then the session-51 set (the formal session_51.md log, the
session-51 plan's post-execution record, worklog Task 51, the owner's
narration). This round is session 52, the standing instruction on the
shipped tree.

Baseline gate GREEN at the documented counts (lint 0/0 · tsc 0 · unit
724/724, 40 files · build · smoke 16/16 · e2e 70/70, 9 specs · census
MATCH) — exactly the session-51 ship record, no drift; the standing
asks re-verified up front (the `.env`
`DATABASE_URL="file:../db/custom.db"` contract intact with `db/` at
the repo root — census MATCH; `.env.example` committed at provenance
1..51; the vitest + playwright suites in place and current; the
sitemap/robots/manifest/OG family verified live against the reference
in this round's walk; `skills/` excluded from every gate). The
workspace was re-cloned between rounds (the sandbox reset); the
one-time `bunx playwright install chromium` re-run (the cache held
chromium-1200; the repo's Playwright 1.64.1 wants 1248). The neo-crm
reference repo re-cloned and re-checked per the standing instruction:
unchanged since the session-48..51 checks — its latest round is still
its session-217 (HEAD b3d0fbe); stack pins identical; no new lessons
this round (the fifth consecutive no-change check). The
web-application skill + the skills catalog internalized; tdd,
clone-app-pat-pro, and the agent-browser doctrine (computed styles as
ground truth, never eyeballs) applied throughout.

## The audit

Three parallel dispatched subagents (AUDIT-1 API/lib seams, AUDIT-2
components/pages/effects, AUDIT-3 SEO/configs/tests/docs) — every
load-bearing finding hand-verified in source by the lead.
**AUDIT-1: 0C/0H/0M/3L/2I · AUDIT-2: 0C/1H/0M/3L/1I · AUDIT-3:
0C/0H/0M/1L/2I** — combined **0 Critical / 1 High / 0 Medium /
7 Low / 5 Info**. The session-51 diff itself verified correct on all
three lanes at its shipped boundaries (AUDIT-1 re-probed every S51-1
normalization face in temp dirs and confirmed the S51-8 seam pins
accurate and non-vacuous; AUDIT-2 traced every async path of both
components and confirmed the S51-3/S51-4 cures correct in production;
AUDIT-3 re-ran the §12 census — 21/21 rows matched at the baseline —
and the provenance census — the ten sites at 1..51, lag 0 at the
e24c803 ship); the one High is a NEW defect the S51-2 cure introduced
at its own mechanism boundary, and the seven Lows are hardening/truth
gaps at the session-51 cures' boundaries (the standing genus).

The decisive hand-verifications: **S52-1 (AUDIT-2 H1 — the round's
decisive finding)** — the S51-2 `mounted` flag is
React-StrictMode-unsafe in BOTH files (generator-card.tsx, 
contact-form.tsx): the effect body is EMPTY
(`React.useEffect(() => () => { mounted.current = false; … })`) and
the cleanup is the only writer. Under React StrictMode — which the
Next 16 App Router enables in dev by default (next.config.ts carries
no `reactStrictMode` override; the repo's own iridescence.tsx
comment documents the live-observed dev remount) — every effect runs
setup → cleanup → setup on mount; the cleanup flips the flag false,
the second (empty) setup never re-arms it, and `mounted.current ===
false` for the component's ENTIRE dev life. The gates then fire their
return on every invocation: the copy continuation never flips
"Copied!", the contact success arm never shows "Message Sent!", never
clears the form, never announces — and since the form stays filled
and the button re-enables in `finally`, a dev user retrying
DOUBLE-WRITES ContactMessage rows. A regression introduced by S51-2
itself (pre-S51 the dev faces worked); production is unaffected (no
double-invoke) and the e2e suite runs the PRODUCTION build — which is
exactly why every gate stayed green while dev was broken: the defect
class no existing pin can see. **S52-2 (AUDIT-2 L1)** —
contact-form.tsx carried the identical four-line S51-2 comment block
TWICE, back-to-back (a double-paste artifact of the S51-2 battery-C
restore). **S52-3 (AUDIT-2 L2)** — the S51-3 comment said "The icon
ternary **below** mirrors the swap" — the icon ternary sits ABOVE the
comment; only the label is below (the docs-lie genus at comment
scale). **S52-4 (AUDIT-2 L3)** — the S51-3 icon pin asserted only
`'{sending ? ('` — that a sending-keyed ternary exists — while its
comment claimed the branch faces; a branch-content swap (a
visible-surface defect) kept the pin green. **S52-5 (AUDIT-1 L1)** —
the S51-1 symlink dedupe compared `realpathSync` outputs as STRINGS:
on case-insensitive filesystems (macOS dev postures) a case-variant
PWD spelling of the cwd survives both the string compare and
(commonly) realpath's output — the probe then double-warns the same
physical `.env.local`: the S51-1 defect genus surviving the cure in
the case face (on Linux the face is harmless — a case-variant
spelling of an existing dir ENOENTs; Verified by the same probe
family). The canonical same-file test is `statSync` dev/ino identity.
**S52-6 (AUDIT-1 L2)** — the S51-1 comment claims the resolve()
`..`-segment fold but no pin asserted it (the battery pinned
alias/trailing/relative only) — the repo's own one-face-one-pin
doctrine. **S52-7 (AUDIT-1 L3)** — the health route's bare
"session-34 incident" cite is collidable with this repo's own session
34 (the contact-persistence round) under the §0.5 anti-collision
doctrine; db-path.ts marks the same donor number explicitly — the
health route's cite was the unmarked sibling. **S52-8 (AUDIT-3 L1)** —
the count ladder's arithmetic chain is still non-contiguous in the
pre-s22 stretch (the S51-7 genus, older instances the s29 catch-up
didn't reach): s13's header read 526 but the session-13 ship record
reads 528 ("final arithmetic: UNIT 528, badge 582" — the 526 was the
mid-iteration stale census number the entry's own note describes);
s14's enumeration sums +11 but the ship arithmetic is +10 (the S14-5
"re-anchor" counted as +1 — a re-anchor updates an existing pin);
s20's enumeration sums +9 but the session-20 record reads "+10 pins";
s21 read "+13" but the session-21 record reads "+15 unit pins" and
571→586=+15. Verified against every session record cited; the
enforced constants (UNIT 724 / SUITES 40) were already correct — the
ladder's PROSE arithmetic was the defect.

## The parity walk

**ALL CLONE FACES MATCH — the twenty-fifth consecutive clean walk, no
clone-side drift, no NEW reference-side drift.** The panel is
byte-identical class-for-class on BOTH sides (container
px24/py16/block/maxHeight none/transparent; Home teal rgb(45,212,191)
14px/500 block; the siblings rgb(203,213,225) 14px/500 block; the
pill rgb(15,23,42) 14px/600 block; `brandInPanel: null` BOTH sides).
The hamburger cursor pointer both sides (the Tailwind v4 standing
concern holding; the `md:hidden p-2 text-slate-300` base identical);
the reference's hamburger still ships NO aria family (our expanded
family the documented superset); Escape leaves the reference's panel
open (our superset closes); the outside-tap face leaves it open on
BOTH sides — the walk's first reading said REF-CLOSED, resolved as
the walk script's OWN toggle-sequencing artifact (Escape had left the
REF panel open, so the script's "re-open" toggle actually closed it,
and the tap then probed an already-closed panel; the targeted non-nav
tap re-probe — the hero heading DIV, pathname-checked — shows the
reference's panel OPEN before and after, the documented posture
holding); route-change close verified both sides at /Pricing (the
clone leg settle-verified — see the transient note below); the
desktop census: 6 VISIBLE links IDENTICAL both sides, CLONE total 11
= 6 visible + 5 hidden panel anchors (the documented S26-1 design;
the reference UNMOUNTS its closed panel); the brand wordmark
gradient byte-identical both sides
(linear-gradient(to right, rgb(45,212,191), rgb(251,191,36)), clip
text, 18px/700; the tile 32×32/radius 12 — the tile's oklab
interpolation the documented v4 compiled family, the wordmark's
sRGB inline the S21-5 cure); the five-route head census identical
(titles + descriptions); sitemap 4 URLs both + robots identical
modulo origin; the generator probe symmetrically dead/live (R: no
copy button, no generation lands; L: a 6-hashtag post + the copy
button — the D-1 documented superset); the login round-trip both
landing the landing (R /Home, L / — the documented 308 deviation);
the clone session verified live (the auth/me guest face pre-login
reads the envelope's honest `{ok:true, data:null}`).

**The walk-protocol findings recorded for the future:** (1) a fresh
dev server + a fresh agent-browser page open exhibits a TRANSIENT
document-reload flapping (~20-35s, self-terminating; the page's own
performance timeline shows 1 navigation once settled; intermittent
NO-NAV windows mid-flap) — a sandbox/dev-client transient, NOT an
app defect (the production build + the Playwright e2e suite are 100%
stable — 70/70); the protocol addition: settle 30s+ after a fresh
open before interactive probes (the standing walk's login-first flow
naturally satisfies it); (2) the reference's BODY fallback ink reads
rgb(10,10,10) (neutral-950) vs our rgb(15,23,42) (slate-900
`--color-foreground`) — sub-visual (every visible text on both sides
carries explicit classes; the brand anchor's ink is fully covered by
the gradient-clipped wordmark) — registered, never chased; (3) the
`/60` opacity-modifier faces serialize oklab() on our v4 build vs
rgba() on the reference's v3-era sheet — the same rendered color,
the documented v4 color-mix family.

## The cures (TDD — the batteries on record; the ownership divisions enumerated at birth)

- **S52-1 (HIGH, AUDIT-2 H1)** — the StrictMode-safe mounted re-arm,
  BOTH files: the effect body re-arms (`mounted.current = true;`) and
  the cleanup keeps the S51-2 flip + timer clear — the canonical
  StrictMode-safe form. Production is behavior-identical (single
  invoke; the body's re-arm writes the already-true value); dev's
  simulated remount re-arms what its cleanup flipped. The S17-6 pin
  (landing-page.test.ts) — which currently ENFORCED the empty-body
  form — widened IN PLACE to the body form (one regex pinning the
  re-arm AND the cleanup flip; the ownership unchanged: the S17-6 it
  owns the MECHANISM both files, the S50-4 sequence pin owns the
  generator-card GATE, the S17-6 contact expect owns the CONTACT
  gate). Batteries: each file reverted to the empty-body form →
  exactly the widened expect RED for that file (the untouched file's
  pass proves the per-file tooth); both observed single-tooth. The
  cure's own birth defect caught by the censuses: the new comment's
  "context-lost" hyphenation scanned as a `text-lost` color utility
  and tripped the step-less census — re-spelled prose-safe (the
  S28-4 doctrine, the third consecutive round a birth defect fell to
  a census).
- **S52-2 (LOW, AUDIT-2 L1)** — the duplicated S51-2 comment block
  DELETED (one copy stays, with the retirement note). Comment-only.
- **S52-3 (LOW, AUDIT-2 L2)** — "below" → "above" in the S51-3
  comment (the direction word now tells the truth; the correction
  noted in place). Comment-only.
- **S52-4 (LOW, AUDIT-2 L3)** — the S51-3 icon pin STRENGTHENED in
  place: `'{sending ? ('` → a regex pinning the branch faces (in
  flight the Send icon; success the Check). Born GREEN against the
  cured source; its comment now tells the truth. Battery: the branch
  contents swapped (in-flight Check / success Send) → exactly the
  strengthened expect RED (the label pin — the important face —
  GREEN through the plant).
- **S52-5 (LOW, AUDIT-1 L1)** — the statSync identity dedupe: the
  realpathSync STRING compare becomes the dev/ino identity compare
  (statSync follows symlinks exactly like realpathSync; the
  missing-dir catch semantics unchanged; the S51-1 comment block
  re-anchored with the case-face honest hedge — the face is
  macOS-only and unobservable in this Linux sandbox). The existing
  S51-1 arms (alias/trailing/relative) stay GREEN through the change
  — the alias arm exercises the statSync path on a real symlink.
  Battery: the string-compare form planted → the S51-1 arms STAY
  GREEN on Linux (the case face is the only distinguishing face —
  the battery's honest result, recorded in the pin's comment; the
  change's Linux-side proof is the arms' pass through the new code
  path plus lint/tsc on the import swap).
- **S52-6 (LOW, AUDIT-1 L2)** — the dotdot arm: the S51-1 battery it
  extended IN PLACE with the `..`-segment face
  (`PWD = ${artifactDir}/sub/..` → resolve() folds it onto the cwd →
  one warning; the sub segment created real so the pre-cure tooth is
  honest — the raw-string form pushed the unfolded spelling and the
  fs probe resolved THROUGH it — Session-53, S53-1: that mechanism
  claim was FALSE, corrected in place — the probe's join() folds the
  .. lexically in userland, the kernel never sees the dotdot, and
  the pre-cure tooth needs no real segment; the arm now spells the
  intermediate NONEXISTENT, which also gives the resolve()-fold its
  own independent RED tooth the sub form could never carry). Born
  GREEN (S51-1's resolve()
  already folds). Battery truth (the S51-6 wording precedent,
  recorded in the arm's comment): the no-dedupe plant (the true
  S50-1 form) trips the it at the FIRST dedupe arm (the alias face)
  — the dotdot arm shares the dedupe-family failure face (co-pinned,
  the N12-2 documented form); its independent value is the
  GREEN-direction pin of resolve()'s fold — the S51-1 comment
  claimed the fold and nothing asserted it. The S52-5 statSync
  identity dedupe folds every alias spelling too, so the
  normalization and the dedupe are belt-and-braces for this face.
- **S52-7 (LOW, AUDIT-1 L3)** — the donor marker on the health
  route's cite: "the session-34 incident" gains the explicit
  donor-ledger attribution (the db-path.ts marker's form; this
  repo's own session 34 named as the contact-persistence round).
  Comment-only; no pin reads the cite; the file's provenance site
  re-anchored 1..52 in the same edit.
- **S52-8 (LOW, AUDIT-3 L1)** — the ladder-arithmetic catch-up (the
  s29/s49 precedent): s13's header re-spelled 526 → **528** (the
  session-13 ship record cited in the entry); s14's enumeration
  annotated (+10 by the ship arithmetic 528→538 — the S14-5
  re-anchor's +1 is the over-count, a re-anchor updates an existing
  pin; the ship count is the authority); s20's entry annotated (+10
  by the session-20 ship record, the enumeration names nine);
  s21 re-spelled "+13" → **+15** (the session-21 record cited).
  Prose-only (the comment block inside docs-counts.test.ts).
- **S52-9 (register)** — the accepted-residual additions, with
  reasons: the symlinkSync Windows-portability face (AUDIT-1 F4 —
  hypothetical: no Windows CI exists, the documented posture is
  bun/Linux); the route-tier exact-500 e2e arm (AUDIT-1 F5 —
  optional: the textual F11-7 pin + the S51-8 fill-2 leg already own
  the family); the failed re-submit inside the 2.6s window keeping
  the stale "Message Sent!" label (AUDIT-2 I1 — defensible: the
  first message WAS sent, the toast carries the failure news); the
  ok-16 partial family summary (AUDIT-3 I1 — the in-loop enumeration
  is the authority by the header's own contract); the `.env`
  provenance register entry re-scope (AUDIT-3 I2 — machine-local by
  design, re-anchor when copying `.env.example`); the walk's observed
  faces (the REF body fallback ink; the oklab-vs-rgba `/60`
  serialization family; the dev-server flapping transient + the
  settle protocol).

**Accepted/observed register (the standing residuals carried forward
unchanged):** the nav links' UA-default focus outline; the reduced-motion
live-toggle gap; the quota store's midnight rollover; the classifier's
P1001/P1002 500 face; the api-robustness census's route.ts-only matcher;
the hero-portrait weight/resize; the workspace's ambient absolute
DATABASE_URL; the detectNiche substring shape; the proxyHopDepth parse
mirror; the setSessionCookie unit gap; the signup first-admin race; the
verify/resend read-then-write pair; the enumeration faces; the
single-node limiter; the 404/error main-landmark posture; the smoke-leg
retired-form negatives; the in-process limiter; the 404 client-render
body; the formula-driven generator; the in-app OTP delivery; the footer
© build-time year; the forgot-password link-clobber (PAD §11);
ContactMessage.email's unindexed readback scan; the failed-regeneration
post discard; the verify-digits wipe while a resend is in flight; the
two sanctioned window.location.origin reads; the novel strip idioms
escaping the textual arms; the implementation-plan §4 unticked
checkboxes.

## The count re-anchor

UNIT 724 HELD (the S17-6 pin and the S50-11 icon pin widen IN PLACE;
the S51-1 battery gains its dotdot arm INSIDE the existing it;
S52-2/S52-3/S52-7/S52-8 are comment-only), SUITES 40 unchanged, E2E 70
unchanged, E2E_SPECS 9 unchanged, SMOKE 16 unchanged, BADGE 794
unchanged. No s52 ladder entry (no growth — the ladder's own
convention). PAD §12's generator-card row re-anchored 306 → 319 (the
only §12 row touched); the ten provenance sites re-anchored to 1..52 —
lag 0 at ship; SKILL v1.47.0 → v1.48.0.

## Verified

- The full gate on the exact commit tree (below)
- The mutation batteries on record: the re-arm A/B plants (each
  file's empty-body form → exactly the widened S17-6 pin, the other
  file GREEN through each plant); the branch-swap plant → exactly the
  strengthened S50-11 arm; the statSync string-compare plant → every
  arm GREEN on Linux (the honest macOS-only case face recorded); the
  no-dedupe plant → the it trips at the alias arm (the dotdot arm's
  co-pinned family documented at birth)
- The redundant-arm check: every S52 arm verified single-tooth at
  birth (the co-pinned dotdot/dedupe family documented in the pin's
  comment)
- The parity walk post-cure: the standing faces hold, no drift; the
  S52-1 dev proof: the contact submit's form-clear landed live in dev
  (formCleared=true — the success arm ran through the gate; pre-cure
  the gate blocked it and a retry double-wrote), and the generator
  copy face's dev probe was blocked by the headless clipboard
  permission itself (navigator.clipboard.writeText rejects
  NotAllowedError in the headless browser — the catch toast fired;
  the face is production-proven by the e2e suite's copy leg, 70/70
  green)
- Captures 111/112 on the dev server (the owner-instructed posture,
  the session-29..51 precedent): the mobile-menu open clean-walk at
  390×844 + the landing hero at 1280×800, PIL-verified
- Docs lockstep: README (the session-52 row on the continuous table,
  the gate footer); AGENTS (the plans map's fifty-second round);
  CLAUDE (counts held — no change needed); PAD (§12's generator-card
  row); SKILL v1.47.0 → v1.48.0 (frontmatter, §0.5 1..52, Appendix
  A's session-52 row, Appendix B's header); the ten provenance sites
  at 1..52; worklog Task 52; this session log; the plan's
  post-execution record

**Gate at the session-52 ship: lint 0/0 · tsc 0 · unit 724/724 (40
files) · build · smoke 16/16 · e2e 70/70 (9 specs) · census MATCH.**
