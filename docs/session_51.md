# Session 51 — The PWD-Union Normalization + The Unmount-Timer Hygiene + The Sending Precedence + The Busy Announce + The ok-16 Truth + The Entry Ownership + The s29 Catch-up + The Raw-Bound Behavior (2026-11-14)

The round opened on the shipped tree (`3e1f517` — session-50's commit;
the owner's narration commit `48929d8` followed, carrying session_51.md
as the round-50 narration — replaced now by this round's formal log).
The core docs re-read and re-verified (AGENTS, CLAUDE, README, PAD,
SKILL v1.46.0 — every lockstep site confirmed at the session-50 ship
counts), then the session-50 set (the formal session_50.md log, the
session-50 plan's post-execution record, worklog Task 50, the owner
narration). This round is session 51, the standing instruction on the
shipped tree.

Baseline gate GREEN at the documented counts (lint 0/0 · tsc 0 · unit
724/724, 40 files · build · smoke 16/16 · e2e 70/70, 9 specs · census
MATCH) — exactly the session-50 ship record, no drift; the standing
asks re-verified up front (the `.env`
`DATABASE_URL="file:../db/custom.db"` contract intact with `db/` at
the repo root — census MATCH; `.env.example` committed at provenance
1..50; the vitest + playwright suites in place and current; the
sitemap/robots/manifest/OG family verified live against the reference
in this round's walk; `skills/` excluded from every gate). The
neo-crm reference repo re-cloned (the prior clone lived in /tmp,
recycled) and re-checked per the standing instruction: unchanged since
the session-48/49/50 checks — its latest round is still its
session-217 (HEAD b3d0fbe); stack pins identical; no new lessons this
round. The web-application skill + the skills catalog internalized;
tdd, clone-app-pat-pro, and the agent-browser doctrine (computed
styles as ground truth, never eyeballs) applied throughout.

## The audit

Three parallel dispatched subagents (AUDIT-1 API/lib seams, AUDIT-2
components/pages/effects, AUDIT-3 SEO/configs/tests/docs) — every
load-bearing finding hand-verified in source by the lead.
**AUDIT-1: 0C/0H/0M/2L/1I · AUDIT-2: 0C/0H/0M/3L/1I · AUDIT-3:
0C/0H/0M/3L/0I** — combined **0 Critical / 0 High / 0 Medium /
8 Low / 2 Info**. The session-50 diff itself verified correct on all
three passes (the subagents re-probed every S50 cure at its
boundaries: the union's correct faces, the collapse semantics, the
message-bound honesty at raw 1000/1001 and collapse 500/501, the
genEpoch interleavings, the compiled-sheet Tailwind family — zero
`(hover:hover)` media queries, the custom-variant unwrap holding
family-wide); the eight Lows are hardening/truth gaps at the
session-50 cures' own boundaries.

The decisive hand-verifications: **S51-1 (AUDIT-1 L1)** — the S50-1
union dedupes by STRING identity and pushes the PWD face
un-normalized (boot-env.ts:477-478): a symlink-alias PWD of the cwd
emits the same physical shadow file's warning TWICE; a
trailing-slash PWD does the same; a RELATIVE PWD (".") probes the
wrong directory and prints a misleading "exists at ." path —
live-probed in temp dirs (2 warnings per face pre-cure; the PWD-unset
and PWD===cwd faces verified correct in the same probe). **S51-2
(AUDIT-2 L1)** — the S50-4 epoch guard checks only the epoch; an
UNMOUNT never moves it, so a clipboard promise (or the contact fetch)
resolving after the unmount cleanup already ran passes the gate, then
arms a fresh 2s/2.6s timer on the dead ref that nothing will ever
clear — the S17-6 tracked-timer hygiene violated in exactly this
window. **S51-3 (AUDIT-2 L2)** — the S50-11 label ternary gives
`sent` precedence over `sending`, so a re-submit inside the 2.6s
post-success window shows the stale "Message Sent!" through the whole
in-flight round-trip. **S51-4 (AUDIT-2 L3)** — the contact form's
polite status region carries only the sent flip: zero feedback to AT
users through the entire network round-trip (the S26-2 genus, one
surface over). **S51-5 (AUDIT-3 L1)** — the S50-8 ok-16 re-spell
claims "uploads/worklog/test-results are the sanctioned S34-7
tripwires beyond the excludes set" — FALSE: only `uploads` is beyond
the excludes (verified against the S34-7 ship itself, `git show
74bc770:next.config.ts`); the docs-lie genus, introduced by the S50-8
cure itself. **S51-6 (AUDIT-3 L2)** — the
`.next/standalone/$entry` literal pinned by BOTH gate-script:77-80
(with a message mislabeling its face as ".env.production") and
error-boundaries' full-line pin — the N12-2 dual-pin the S50-7 cure
retired for the membership face but left here. **S51-7 (AUDIT-3 L3)**
— the count ladder has no s29 entry: s28 documents 636/38, s30
claims "+3" to 644, but 636+3=639 — session 29 grew the suite +5 to
641/38 and never wrote the entry. **S51-8 (AUDIT-1 L2)** — the
S50-12 message pick is pinned only by source-text regexes; no unit
or e2e drives the raw-length arm BEHAVIORALLY.

## The parity walk

**ALL CLONE FACES MATCH — the twenty-fourth consecutive clean walk,
no clone-side drift, no NEW reference-side drift.** The walk's first
panel reading flagged two faces — link display "inline" (REF) vs
"block" (CLONE), plus a "ViralPost AI" brand entry in the REF panel
census — both resolved by the targeted panel-scoped probe (the
session-50 outer-wrapper precedent): the panel is byte-identical
class-for-class on BOTH sides (container `px-6 py-4 space-y-3` =
px24/py16/block/maxHeight none/transparent; Home teal rgb(45,212,191)
14px/500 **block**; the siblings rgb(203,213,225) 14px/500 **block**;
the pill rgb(15,23,42) 14px/600 **block**; `brandInPanel: null` BOTH
sides — the div-walking probe had matched an outer wrapper on the
reference side). The desktop census split by visibility: 6 VISIBLE
links IDENTICAL both sides (the brand + the four routes + the pill);
CLONE total 11 = 6 visible + 5 hidden panel anchors — the documented
S26-1 design (our closed panel stays hidden in the DOM for the stable
aria-controls target; the reference UNMOUNTS its closed panel — its
inner container reads `exists:false` at 1280). The mobile menu works
exactly as expected (the owner's standing concern): the hamburger
cursor pointer both sides (the Tailwind v4 standing concern holding);
the reference's hamburger still ships NO aria family (our expanded
family the documented superset); Escape leaves the reference's panel
open (our superset closes); the outside-tap face leaves it open on
BOTH sides; route-change close verified both sides at /Pricing; the
five-route head census identical (titles + descriptions); sitemap 4
URLs both + robots identical modulo origin; the generator probe
symmetrically dead/live (R: no copy button, no generation lands; L: a
5-hashtag post + the copy button — the D-1 documented superset); the
login round-trip both landing the landing (R /Home, L / — the
documented 308 deviation); the clone session verified live via
/api/auth/me (Demo Creator, role admin).

## The cures (TDD — the batteries on record; the ownership division enumerated at birth)

- **S51-1 (LOW, AUDIT-1 L1 + I1)** — the PWD-union normalization:
  the PWD leg guards on `isAbsolute` (a relative PWD names the
  SHELL's dir at spawn time — uninterpretable, skipped entirely),
  normalizes with `resolve()` (trailing slashes and `..` segments
  fold onto the canonical form), and dedupes the symlink-alias face
  best-effort through `realpathSync` comparison (a symlink spelling
  of the SAME physical dir as the cwd must not duplicate the probe —
  the cwd leg already covers it). The S50-1 comment block gains the
  PWD-less-posture hedge sentence (a process manager that clears the
  environment falls back to the cwd-only probe — no such posture is
  documented today). The S50-1 boot-env pin extended IN PLACE: the
  alias, trailing-slash, and relative-PWD faces inside the existing
  it (temp dirs + chdir + PWD, restored in finally; a symlink created
  inside the launch dir, cleaned by its rmSync). Battery: the union
  reverted to the un-normalized string-compare push → exactly the new
  faces RED (the S50-1 originals — the launch-dir warn and the
  PWD===cwd dedupe — stayed GREEN through the battery).
- **S51-2 (LOW, AUDIT-2 L1)** — the unmount-timer hygiene: a
  `mounted` ref (flipped false by the unmount cleanup, beside the
  timer clear) + the continuation gates — generator-card's copy
  continuation widens to `if (!mounted.current || epochAtCopy !==
  genEpoch.current) return;`; contact-form's success arm gains
  `if (!mounted.current) return;` before the setSent/timer arm. The
  ownership division (one face one pin, the N12-2 doctrine): the
  landing-page S50-4 sequence pin owns the generator-card GATE (the
  whole continuation sequence, widened in place); the S17-6
  unmount-safe it owns the MECHANISM (the mounted ref + the cleanup
  flip, both files, the loop's unmount regex widened in place) and
  the CONTACT gate. Batteries: A the epoch-only gate planted →
  exactly the S50-4 pin (the mechanism pins GREEN); B the contact
  gate removed → exactly the S17-6 contact expect (the S50-4 pin
  GREEN); C the full deletion (mechanism + gates) → both its — the
  catastrophic case both owners cover, the S50-7 face-2 precedent
  (the intermediate plant — mechanism stripped, gate text left —
  tripped exactly the mechanism pins: the incoherent-source state
  whose own face it is).
- **S51-3 (LOW, AUDIT-2 L2)** — the sending precedence: the label
  ternary becomes `{sending ? "Sending…" : sent ? "Message Sent!" :
  "Send Message"}` and the icon ternary mirrors it (in flight: the
  Send icon; success: the Check). The S50-11 pin updated IN PLACE
  (the new form + the icon-mirror expect). Battery: the old
  precedence planted → exactly the pin.
- **S51-4 (LOW, AUDIT-2 L3)** — the busy announce: the status region
  becomes the three-face form `{sending ? "Sending your message…" :
  sent ? "Message sent" : ""}` (the S26-2 BUSY family, one surface
  over; the reference's contact form is a stub — D-2 — no parity
  face constrains it). The S24-3 it extended IN PLACE. Battery: the
  arm removed → exactly the pin.
- **S51-5 (LOW, AUDIT-3 L1)** — the ok-16 truth re-spell: uploads is
  the ONE sanctioned S34-7 tripwire beyond the excludes set —
  worklog/test-results ride BOTH lists (excludes + mirror); the
  S50-8 re-spell's docs-lie corrected the round after its birth.
  Prose only; the S50-6 set-equality arm already enforces the true
  relation.
- **S51-6 (LOW, AUDIT-3 L2)** — the entry ownership: the gate-script
  `$entry` assertion DELETED (error-boundaries' full-line pin owns
  the literal — one defect, one owner; the mislabeled message gone),
  the handoff documented in the comment. Battery: the loop-variable
  rename trips error-boundaries' literal arms AND gate-script's
  loop-shape — the plan's "exactly error-boundaries, gate-script
  GREEN" wording was WRONG (the loop variable's name is part of the
  loop's shape; the S50-7 face-2 precedent — the observed truth
  kept); the decisive face holds: the $entry literal now has exactly
  ONE owner.
- **S51-7 (LOW, AUDIT-3 L3)** — the s29 catch-up ladder entry,
  written from the session-29 plan's own post-execution record (+5:
  S29-1/2/3/6/7; the S29-5 e2e fold in place — the S25-17 precedent;
  S29-4's comment-truth arm rides the existing loginSchema it), the
  comment-lag genus named in the entry itself (the s49 precedent).
  Prose only.
- **S51-8 (LOW, AUDIT-1 L2)** — the raw-bound behavior: the e2e
  over-length test extended IN PLACE with a second fill —
  `"x".repeat(497) + " ".repeat(504)` (raw 1001, collapse 497 fits
  the seam) must answer the RAW pre-filter's "1000 characters max"
  message, never the seam's; the seam-boundary unit pins extended IN
  PLACE with the 500 boundary (`sanitizeIdea("x".repeat(500))`
  passes — the seam's bound is `>`, never `>=`). Co-pinned faces
  documented at birth: F11-7 owns the branch's SOURCE shape; the e2e
  leg owns the BEHAVIOR. Batteries: the `>=` off-by-one planted in
  the seam → exactly the 500-boundary expect (the 501 pin GREEN);
  the classic single-message revert + build + the generator-spec e2e
  → the fill-2 leg RED alongside F11-7.
- **S51-9 (register)** — the accepted-residual additions, with
  reasons: the copy affordance's own in-flight face (not recommended:
  the reference's own copy is instantaneous, the family has no
  precedent demanding it, and the pending window is measured in tens
  of ms); the walk's two flagged readings (probe artifacts, the
  session-50 outer-wrapper precedent — recorded in the parity
  section above, never to be "fixed" into the panel).

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

## The count re-anchor

UNIT 724 HELD (every S51 pin folds into an existing it IN PLACE; S51-6
DELETES an expect), SUITES 40 unchanged, E2E 70 unchanged (the fill-2
extends the existing test), E2E_SPECS 9 unchanged, SMOKE 16 unchanged,
BADGE 794 unchanged. No s51 ladder entry (no growth — the ladder's own
convention: entries record growth); the s29 catch-up written. PAD §12's
generator-card row re-anchored 292 → 306 (the only drifted row of the
21); the ten provenance sites re-anchored to 1..51 — lag 0 at ship;
SKILL v1.46.0 → v1.47.0.

## Verified

- The full gate on the exact commit tree (below)
- The mutation batteries single-tooth on record: the normalization
  revert → exactly its new faces (the S50-1 originals green through
  it); the unmount A/B/C faces (the epoch-only gate → exactly the
  S50-4 pin; the contact gate removal → exactly the S17-6 contact
  expect; the full deletion → both its); the precedence revert →
  exactly its pin; the busy-arm removal → exactly its pin; the
  loop-variable rename → error-boundaries' literal arms AND
  gate-script's loop-shape (the plan's wording corrected, the
  decisive face held); the `>=` plant → exactly the 500-boundary
  expect; the single-message revert → the e2e fill-2 leg alongside
  F11-7
- The redundant-arm check: every S51 arm verified single-tooth at
  birth (the co-pinned F11-7/e2e division documented in both pins'
  comments)
- The parity walk post-cure: the standing faces hold, no drift
- Captures 109/110 on the dev server (the owner-instructed posture,
  the session-29..50 precedent): the mobile-menu open clean-walk at
  390×844 + the landing hero at 1280×800, PIL-verified
- Docs lockstep: README (the session-51 row on the continuous table,
  the gate footer); AGENTS (the plans map's fifty-first round); CLAUDE
  (counts held — no change needed); PAD (§12's generator-card row,
  Last Updated); SKILL v1.46.0 → v1.47.0 (frontmatter, §0.5 1..51,
  Appendix A's session-51 row, Appendix B's header); the ten
  provenance sites at 1..51; worklog Task 51; this session log; the
  plan's post-execution record

**Gate at the session-51 ship: lint 0/0 · tsc 0 · unit 724/724 (40
files) · build · smoke 16/16 · e2e 70/70 (9 specs) · census MATCH.**
