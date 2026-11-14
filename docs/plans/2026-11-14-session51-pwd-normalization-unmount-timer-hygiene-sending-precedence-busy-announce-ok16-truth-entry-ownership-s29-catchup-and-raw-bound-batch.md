# Session 51 — The PWD-Union Normalization + The Unmount-Timer Hygiene + The Sending Precedence + The Busy Announce + The ok-16 Truth + The Entry Ownership + The s29 Catch-up + The Raw-Bound Behavior Batch

## Context

Session 50 shipped `3e1f517` (thirteen cures: the launch-dir shadow union,
the envprod gitignore closure, the smoke-tail truth, the copy-epoch guard,
the src-sweep closure, the mirror-set pin, the redundant-arm cure, the
prose batch); the owner's narration commit `48929d8` followed, carrying
session_51.md as the round-50 narration — replaced at this round's ship by
the formal log. The standing instruction re-ran end to end: docs review →
baseline gate → the comprehensive audit (three parallel subagents + the
neo-crm currency check) → the live reference parity walk → the TDD cures →
the gate → captures → push.

**Baseline (the tree at `48929d8`, verified in place):** lint 0/0 · tsc 0 ·
unit 724/724 (40 files) · build · smoke 16/16 · e2e 70/70 (9 specs) ·
census MATCH · the `.env` `DATABASE_URL="file:../db/custom.db"` contract
intact with `db/` at the repo root ✓ · the vitest + playwright suites in
place and current ✓ · `skills/` excluded from every gate ✓ · `.env.example`
committed at provenance 1..50 ✓. The neo-crm reference repo re-cloned and
re-checked: unchanged since the session-48/49/50 checks (HEAD b3d0fbe,
still its session-217 / session_459.md); no new lessons.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib seams,
AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs — every
load-bearing finding hand-verified in source by the lead, the decisive
probes below): **AUDIT-1: 0C/0H/0M/2L/1I · AUDIT-2: 0C/0H/0M/3L/1I ·
AUDIT-3: 0C/0H/0M/3L/0I** — combined **0 Critical / 0 High / 0 Medium /
8 Low / 2 Info**. The session-50 diff itself verified correct on all three
passes; all eight Lows are hardening/truth gaps at the session-50 cures'
own boundaries.

**The decisive hand-verifications:**
- **S51-1 (AUDIT-1 L1)** — the S50-1 union dedupes by STRING identity and
  pushes the PWD face un-normalized (boot-env.ts:477-478, read in full):
  a symlink-alias PWD of the cwd emits the same physical shadow file's
  warning TWICE; a trailing-slash PWD does the same; a RELATIVE PWD
  (".") probes the wrong directory and prints a misleading "exists at ."
  path — live-probed by the subagent in temp dirs (2 warnings per face
  pre-cure; the PWD-unset and PWD===cwd faces verified correct in the
  same probe). The PWD-less-posture hedge (AUDIT-1 I1): the union's
  launch-dir face rides on the launch shell setting PWD — verified live
  (`env -u PWD bun run` re-sets it through the shell; INIT_CWD is null on
  bun 1.3.14); no PWD-less posture is documented today.
- **S51-2 (AUDIT-2 L1)** — the S50-4 epoch guard checks only the epoch;
  an UNMOUNT never moves it, so a clipboard promise (or the contact
  fetch) resolving after the unmount cleanup already ran passes the
  gate, calls the no-op setState, then arms a fresh 2s/2.6s timer on the
  dead ref that nothing will ever clear — the S17-6 tracked-timer
  hygiene violated in exactly this window (generator-card.tsx:126-143 +
  the cleanup at :56-58; contact-form.tsx:38-64 + the cleanup at :33-35,
  both read in full).
- **S51-3 (AUDIT-2 L2)** — the S50-11 label ternary gives `sent`
  precedence over `sending` (contact-form.tsx:130), so a re-submit fired
  inside the 2.6s post-success window shows the stale "Message Sent!"
  through the whole in-flight round-trip — the pending-face family's
  guarantee silently fails on this face. The icon ternary (:119-123)
  mirrors it.
- **S51-4 (AUDIT-2 L3)** — the contact form's polite status region
  carries only the sent flip (contact-form.tsx:140-142): zero feedback
  to AT users through the entire network round-trip — the S26-2 genus
  (the generator card's BUSY arm), one surface over.
- **S51-5 (AUDIT-3 L1)** — the S50-8 ok-16 re-spell claims
  "uploads/worklog/test-results are the sanctioned S34-7 tripwires
  beyond the excludes set" — FALSE: only `uploads` is beyond the
  excludes (verified against the S34-7 ship itself, `git show
  74bc770:next.config.ts` — worklog.md and test-results/** are IN the
  excludes list and were at S34-7 too); the smoke list = the excludes +
  uploads (31 vs 30), the relation the S50-6 set-equality arm enforces
  and the same commit's own S50-6 arm comment states correctly — the
  ok-16 message contradicts it (the docs-lie genus, introduced by the
  S50-8 cure itself).
- **S51-6 (AUDIT-3 L2)** — the `.next/standalone/$entry` literal is
  pinned by BOTH gate-script.test.ts:77-80 (with a message that
  mislabels its face as ".env.production") and error-boundaries'
  S36-5a full-line pin (:142) — the N12-2 dual-pin the S50-7 cure
  retired for the membership face but left here; a `$entry` rename
  trips two arms with two failure messages for one defect.
- **S51-7 (AUDIT-3 L3)** — the docs-counts count ladder has no s29
  entry: s28 documents 636/38, s30 claims "+3" to 644, but 636+3=639
  — session 29 grew the suite +5 to 641/38 (README:256) and that entry
  was never written; the ladder's arithmetic chain cannot close without
  it (the s49 catch-up's "contiguous" claim holds for s49 but the range
  is not in fact contiguous).
- **S51-8 (AUDIT-1 L2)** — the S50-12 message pick is pinned only by
  source-text regexes (api-robustness F11-7 + the S15-2 typeof gate);
  no unit or e2e drives the raw-length arm BEHAVIORALLY — a refactor
  that inverts the comparison or collapses the branch to a single
  message passes the full 724-test gate silently whenever it keeps the
  source text (the branch itself verified correct at every boundary by
  the subagent's live probes: raw 1000/1001, collapse 500/501,
  whitespace-only, NUL-only).

**The parity walk** (live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`; viewport confirmed 390×844 before every
mobile probe; computed styles as ground truth): **ALL CLONE FACES MATCH —
the twenty-fourth consecutive clean walk, no clone-side drift, no NEW
reference-side drift.** The mobile menu works exactly as expected (the
owner's standing concern): the walk's first panel reading flagged two
faces — link display "inline" (REF) vs "block" (CLONE) plus a "ViralPost
AI" brand entry in the REF census — both resolved by the targeted
panel-scoped probe (the session-50 precedent): the panel is
byte-identical class-for-class on BOTH sides (container `px-6 py-4
space-y-3` = px24/py16/block/maxHeight none/transparent; Home teal
rgb(45,212,191) 14px/500 **block**; the siblings rgb(203,213,225)
14px/500 **block**; the pill rgb(15,23,42) 14px/600 **block**;
`brandInPanel: null` BOTH sides — the walk's readings were the
outer-wrapper artifact of the div-walking probe); the desktop census
split by visibility: 6 VISIBLE links IDENTICAL both sides (the brand +
the four routes + the pill), CLONE total 11 = 6 visible + 5 hidden panel
anchors — the documented S26-1 design (our closed panel stays hidden in
the DOM for the stable aria-controls target; the reference UNMOUNTS its
closed panel — its inner container reads `exists:false` at 1280). The
remaining faces all match the documented posture: the hamburger cursor
pointer both sides (the Tailwind v4 standing concern holding; the
compiled-sheet probe found zero `(hover:hover)` media queries with 51
bare `:hover` rules — the custom-variant unwrap holds family-wide); the
reference's hamburger still ships NO aria family (our expanded family
the documented superset); Escape leaves the reference's panel open (our
superset closes); the outside-tap face leaves it open on BOTH sides;
route-change close verified both sides at /Pricing; the five-route head
census identical; sitemap 4 URLs both + robots identical modulo origin;
the generator probe symmetrically dead/live (R: no copy button, no
generation lands; L: a 5-hashtag post + the copy button — the D-1
documented superset); the login round-trip both landing the landing
(R /Home, L / — the documented 308 deviation); the clone session
verified live via /api/auth/me (Demo Creator, role admin).

## The cures (TDD — every new arm battery-planted; the ownership division enumerated at birth)

- **S51-1 (LOW, AUDIT-1 L1 + I1)** — the PWD-union normalization:
  `shadowingEnvFileWarningsForServer`'s PWD leg guards on `isAbsolute`,
  normalizes with `resolve()` (kills the trailing-slash and `..`-segment
  faces), and dedupes the symlink-alias face best-effort through
  `realpathSync` comparison (a symlink spelling of the SAME physical dir
  as the cwd must not duplicate the probe — the cwd leg already covers
  it); a relative PWD is uninterpretable (it names the SHELL's dir at
  spawn time, unknowable) and is skipped entirely. The S50-1 comment
  block gains the PWD-less-posture hedge sentence (a process manager
  that clears the environment falls back to the cwd-only probe — no
  such posture is documented today). The S50-1 boot-env pin extended IN
  PLACE: the alias, trailing-slash, and relative-PWD faces inside the
  existing it (temp dirs + chdir + PWD, restored in finally). Battery:
  the union reverted to the un-normalized string-compare push → exactly
  the new faces RED (the S50-1 original faces — the launch-dir warn and
  the PWD===cwd dedupe — stay GREEN through the battery).
- **S51-2 (LOW, AUDIT-2 L1)** — the unmount-timer hygiene: a `mounted`
  ref (flipped false by the unmount cleanup, beside the timer clear) +
  the continuation gates — generator-card's copy continuation widens to
  `if (!mounted.current || epochAtCopy !== genEpoch.current) return;`;
  contact-form's success arm gains `if (!mounted.current) return;`
  before the setSent/timer arm. The ownership division (one face one
  pin): the landing-page S50-4 sequence pin (:252) owns the
  generator-card GATE (the whole continuation sequence, widened); the
  S17-6 unmount-safe it (:488 loop) owns the MECHANISM (the mounted
  ref + the cleanup shape, both files) and the CONTACT gate. Batteries:
  the generator-card gate narrowed back to the epoch-only check →
  exactly the :252 pin RED; the contact gate removed → exactly the
  S17-6 contact expect RED; the mounted ref deleted outright → the
  S17-6 mechanism pins AND the :252 pin (the catastrophic case both
  owners cover, the S50-7 face-2 precedent — recorded honestly).
- **S51-3 (LOW, AUDIT-2 L2)** — the sending precedence: the label
  ternary becomes `{sending ? "Sending…" : sent ? "Message Sent!" :
  "Send Message"}` and the icon ternary mirrors it (sending → the Send
  icon in flight; sent → the Check) — the in-flight label can no longer
  be masked by the lingering success flag inside the 2.6s window. The
  S50-11 pin (a11y-controls:115) updated IN PLACE to the new form.
  Battery: the precedence reverted → exactly the pin RED.
- **S51-4 (LOW, AUDIT-2 L3)** — the busy announce: the contact status
  region becomes the three-face form `{sending ? "Sending your
  message…" : sent ? "Message sent" : ""}` (the S26-2 BUSY family, one
  surface over; the reference's form is a stub — D-2 — no parity face
  constrains it). The S24-3 it (a11y-controls:91) extended IN PLACE
  with the new face. Battery: the arm removed → exactly the pin RED.
- **S51-5 (LOW, AUDIT-3 L1)** — the ok-16 truth re-spell: only
  `uploads` is the sanctioned S34-7 tripwire beyond the excludes set —
  worklog/test-results ride BOTH lists (excludes + mirror). Prose
  only; the S50-6 set-equality arm already enforces the true relation.
- **S51-6 (LOW, AUDIT-3 L2)** — the entry ownership: the gate-script
  `$entry` assertion (:77-80) DELETED — error-boundaries' S36-5a
  full-line pin owns the literal (one defect, one owner), gate-script's
  S50-7 arm owns the loop-shape face; the handoff documented in the
  comment. Battery: a `$entry` rename in smoke-test.sh → exactly
  error-boundaries RED, gate-script GREEN (the redundancy retired).
- **S51-7 (LOW, AUDIT-3 L3)** — the s29 catch-up ladder entry: `s29:
  641/38 (+5 — the logout session-gate (S29-1), the shared shape-guard
  (S29-2), the parse mirror (S29-3), the db operator-script wiring
  census (S29-6), and the icon IHDR pins (S29-7); S29-4's
  comment-truth arm and S29-5's head-DOM superset ride existing its in
  place) and the e2e 63 unchanged (the S29-5 fold in place). Written at
  session-51, the comment-lag genus — the s49 catch-up precedent.`
  Prose only.
- **S51-8 (LOW, AUDIT-1 L2)** — the raw-bound behavior: the e2e
  over-length test (generator.spec.ts:81-89) extended IN PLACE with a
  second fill — `"x".repeat(497) + " ".repeat(504)` (raw 1001, collapse
  497 fits the seam) must answer the RAW pre-filter's "1000 characters
  max" message, never the seam's; the seam-boundary unit pins (the
  existing sanitizeIdea it in generator.test.ts) extended IN PLACE
  with the 500 boundary (`sanitizeIdea("x".repeat(500))` passes) beside
  the existing 501-throw. Co-pinned faces documented: F11-7 owns the
  branch's SOURCE shape; the e2e leg owns the branch's BEHAVIOR (the
  class a textual pin cannot catch). Battery: the branch reverted to
  the single-message form → the F11-7 pin AND the e2e fill-2 leg RED
  (both owners trip on the classic revert — the e2e leg's added value
  is the source-preserving behavioral drift); the seam bound `>`
  planted as `>=` → exactly the new 500-boundary expect RED (the 501
  pin stays GREEN).
- **S51-9 (register)** — the accepted-residual additions, with
  reasons: the copy affordance's own in-flight face (AUDIT-2 I1 — not
  recommended: the reference's own copy is instantaneous, the family
  has no precedent demanding it, and the pending window is measured in
  tens of ms); the walk's two flagged readings (probe artifacts, the
  session-50 outer-wrapper precedent — recorded in the parity section
  above, never to be "fixed" into the panel).

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
escaping the textual arms; the local .env's stale provenance note
(untracked-only); the implementation-plan §4 unticked checkboxes.

## The count re-anchor (draft — the census's own guards own the truth)

UNIT 724 HELD (every S51 pin folds into an existing it IN PLACE — the
S50-1 boot-env extension, the S17-6 mechanism extension, the S50-4
sequence widening, the S50-11/S24-3 a11y updates, the F11-8 e2e fill,
the seam-boundary unit pins; S51-6 DELETES an expect), SUITES 40
unchanged, E2E 70 unchanged, E2E_SPECS 9 unchanged, SMOKE 16 unchanged,
BADGE 794 unchanged. No s51 ladder entry (no growth — the ladder's
own convention: entries record growth). PAD §12's rows re-anchor to the
live wc -l for every changed file. The ten provenance sites re-anchor to
1..51 — lag 0 at ship; SKILL v1.46.0 → v1.47.0.

## Docs lockstep at ship

README (the session-51 table row, the re-anchored footer if any counts
move); AGENTS (the plans map's fifty-first round; the counts stay 724 —
no count-site change); CLAUDE (unchanged — counts held); PAD (§12's
re-anchored rows, Last Updated); SKILL v1.46.0 → v1.47.0 (frontmatter,
§0.5 1..51, Appendix A's session-51 row, Appendix B's header if counts
move); the ten provenance sites at 1..51; worklog Task 51;
docs/session_51.md (the formal log replacing the owner's narration);
this plan's post-execution record.

## The tree check, commit, and push

The designed change set only — no stray files; `git status` clean of
.env/.db/.key. Conventional Commit to `main` only, push via the SSH
wrapper runbook (docs/how-to-git-push-using-ssh-wrapper_SKILL.md): the
wrapper, the dry-run, the real push, the remote verification, the key
destruction.

## The post-execution record (session-51 ship)

Executed as planned, with the deviations the record owes the truth:

- **S51-1 through S51-8 all landed** exactly as specified above (the
  RED→GREEN→battery cycle at each cited step; the designed count-lag
  faces — the PAD §12 inventory census and the plans-map tail
  currency — stayed RED through the cures exactly as designed and
  went GREEN at the lockstep).
- **The S51-6 battery's wording, corrected**: the plan claimed "a
  `$entry` rename → exactly error-boundaries RED, gate-script GREEN."
  Observed: the rename trips error-boundaries' literal arms AND
  gate-script's loop-shape arm — the loop variable's name IS part of
  the loop's shape, so the rename is the catastrophic case for the
  shape face (the S50-7 face-2 precedent — the plan's wording was the
  docs-lie genus caught at its own verification step; the record
  keeps the observed truth). The DECISIVE face held: the `$entry`
  literal now has exactly ONE owner — pre-deletion the same rename
  tripped the deleted duplicate beside them with a mislabeled
  message; post-deletion every trip is on a genuinely distinct face
  with an accurate message.
- **The S51-2 battery's third face, refined**: the plan documented
  "the mounted ref deleted outright → the S17-6 mechanism pins AND
  the :252 pin". Observed in two stages: the full coherent deletion
  (mechanism + gates) trips both its — the catastrophic case both
  owners cover; the intermediate plant (mechanism stripped, gate
  text left) tripped exactly the mechanism pins — the recorded
  sequence is the restoremiss-then-repair note below.
- **The restore miss**: the battery-C restore first re-anchored on a
  pre-comment block (the `resetTimer` → `useEffect` span) and missed
  — the repair re-anchored on the bare `useEffect` head and landed
  both files byte-exact (verified GREEN 39/39 + the region reads).
- **The S51-8 e2e battery** needed the classic single-message revert
  (which changes the source text) — the fill-2 leg tripped exactly
  as designed alongside F11-7 (the co-pinning documented at birth);
  the source-preserving behavioral drift class (the inverted
  comparison) remains the e2e leg's added value, reasoned from the
  pin texts, not run as a plant (the classic revert already proves
  the leg's teeth; a second plant would re-prove the same class at
  a full build's cost).
- Counts at ship: UNIT 724 / SUITES 40 / E2E 70 / E2E_SPECS 9 /
  SMOKE 16 / BADGE 794 — ALL HELD; the ten provenance sites at 1..51
  (lag 0); SKILL v1.47.0; captures 109/110; push to main via the SSH
  wrapper runbook.
