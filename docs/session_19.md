# Session 19 — The Description-Family Re-Anchor + The Monetization Redesign + The Reader-Envelope Closure + The A11y Batch (2026-11-10)

The round opened on a fresh `git clone` (the standing instruction's
reset path), `bun install`, `.env` re-created from `.env.example`
(AUTH_SECRET set for dev), `db:push` + `db:seed` + `db:census`
(MATCH). The operator's standing asks were re-verified up front:
`.env`'s `DATABASE_URL="file:../db/custom.db"` with `db/` at the repo
root (the contract re-verified end-to-end on the clean machine), the
vitest + playwright suites in place and current, the sitemap/robots/
manifest/OG family in place, `skills/` excluded from every gate.

The core docs read in full (AGENTS, CLAUDE, README, PAD, SKILL), then
the session-18 set (session_18.md, the session-18 plan, worklog Task
18, and the pre-round session_19.md handoff). This round is session
19. Baseline gate GREEN at the documented counts (lint 0/0 · tsc 0 ·
unit 550/550 (37 files)). neo-crm re-cloned at HEAD `b3d0fbe` —
UNCHANGED since session 12's review; the recorded decisions stand.

The web-application skill + the skills catalog internalized; the TDD
skill consulted for the loop discipline. Three parallel audit
subagents dispatched (API/lib seams, components/pages/effects,
SEO/configs/tests/docs) while the findings were hand-verified in
source. The audit returned **0 Critical / 0 High / 2 Medium / 10 Low /
26 Info** — the two Mediums being the bounded-reader stream-error
escape (live-reproduced with an errored ReadableStream: the seam's one
unguarded await rejected past the handler boundary as a raw 500) and
the proxyless shared-bucket documentation gap.

The parity walk (live, both sides) found **TWO DRIFTS** — the
reference changed between the session-18 and session-19 walks:

1. **The description family** — the reference's platform adopted the
   per-route description prefix: `/Tool`, `/Pricing`, `/Contact` now
   ship `"<Page> on ViralPost AI. " + "An AI-powered social media
   generator that helps creators, influencers."` (a 70-char
   word-boundary-truncated tail of the root paragraph, the trailing
   comma normalized to a period) on `meta[name=description]`,
   `og:description` AND `twitter:description` alike (byte-identical
   across the three surfaces; measured 93/95/95 chars). `/` and
   `/login` keep the plain 170-char paragraph. og:title, og:url,
   canonical, og:image — unchanged. This is the exact prefix the
   session-8 census found absent (F8-1 retired it from the clone);
   the reference has since adopted its own prefixed+truncated shape.

2. **The monetization section redesign** — the reference's landing
   section 3 replaced the PT (Portuguese) copy with a redesigned EN
   face: badge "Free Access — No Strings Attached", H2 "Download
   Free. / If It Helps You, Help Us Too.", a new paragraph, four EN
   benefit cards, BOTH CTAs as external Gumroad anchors ("Get Free
   Access Now" — a white/10 bordered pill with a leading gift icon;
   "Support & Unlock Pro" — an amber-gradient pill with heart +
   trailing arrow-right), a lock-icon trust line ("100% secure
   payment via Gumroad · Instant Pro access after contribution", at
   `mt-6` flex gap-2), and **ten floating lucide icons** (hash, star,
   trending-up, instagram, twitter, sparkles, message-circle, hash,
   zap, star — pinned left/top percentages, pinned color steps,
   18–28px, JS-driven bob/rotate/opacity with per-icon phases,
   live-sampled translateY ≈ −20..−70px, rotate ≈ ±10°, opacity
   pulsing 0↔1). The mobile menu, the OG title/url/canonical family,
   sitemap and robots — NO other drift.

The session-19 plan written and validated against the codebase (the
pin placements, the census mechanics, the count sites), then executed
with TDD throughout:

- **S19-1 (the description re-anchor)**: the page-titles pins RED
  first (exactly 3 failed), then `pageDescription()` joined site.ts —
  the prefix + the derivation — consumed by `pageMetadata()`. The
  live dev re-verification caught the top-level-field gap (og
  prefixed while the plain meta description still inherited the
  layout's — Next's shallow merge); the `description` field joined
  the factory and the pins extended to all three surfaces. The e2e
  leg added (the `/Tool` byte-exact family + the `/login` plain
  paragraph). Mutation battery: the truncation broken → exactly the
  2 derivation pins RED → restored → GREEN.
- **S19-2 (the monetization redesign)**: the landing pins RED first
  (exactly 4), then `PtSection` → `MonetizationSection` (the
  live-extracted copy/classes/CTA family/trust line) + the new
  `FloatingIcons` client island (ten pinned icons, one rAF loop,
  staggered phases, reduced-motion static, full cleanup).
  pink-400/sky-400 joined the v3 palette re-pin. The e2e heading pin
  re-anchored. Two mutation batteries (the badge copy, a floater
  identity). The live structure walk: the clone's section matches the
  reference's — section classes, the ten floaters at their pinned
  positions, both CTA texts, the trust line — and the animation
  live-samples inside the observed envelope.
- **S19-3 (the reader envelope)**: 2 regression pins RED (the raw
  Error crossed the boundary), then the Layer-3 reader loop wrapped —
  a stream error cancels the producer and resolves the null contract
  (an unreadable body is an unparseable one).
- **S19-5 (the lockout burn)**: the equalizer scrypt now precedes the
  locked-out 429 (the route's last timing asymmetry closed).
- **S19-7/S19-8 (the toast pair)**: the icons' `aria-hidden` + the
  viewport's `aria-live="polite"`.
- **S19-9 (the reduced-motion resize)**: `drawPlain()` on resize in
  reduced mode (was: a ≤3s blank window); the wasted particle build
  skipped.
- **S19-10 (the view-swap focus)**: the per-view focus map on the
  login card (4 headings, `data-view-focus`; verify keeps the
  code-box focus; the prev-view guard keeps initial mount quiet).
- **S19-11 (the pricing-header reveal)**: retired — the live walk
  showed the reference's header unfaded on BOTH routes (the audit's
  add-Reveal reading inverted by the live evidence; the cards'
  Reveals stay).
- **S19-12..S19-18 (the lockstep batch)**: `**/*.mts` re-admitted
  `vitest.config.mts` to the `tsc` program (verified with
  `--listFiles`); the seo.spec comment re-anchored 405 → the
  live-observed 204; the `.mts` renames in next.config/playwright
  comments; the PAD/SKILL runtime-deps claims re-anchored to 8;
  `install_packages.sh` retired; the smoke trap kills `GATE_PID`; the
  known-path OPTIONS-204 exception documented; the proxyless
  shared-bucket consequence joined the boot warning + DEPLOYMENT §3;
  the resend fsync residual documented; the CLAUDE spelling, the
  .gitignore duplicate, and the PAD §12 header + rows re-anchored.

The expected census fallout cured in-commit: the color census flagged
pink-400/sky-400 (cured with the v3 pins) and one "auto-answer"
comment (the to-answer genus — rephrased); the docs-counts gate
drove the count lockstep (UNIT 550 → 561, E2E 56 → 57, badge
606 → 618).

The full gate on the exact commit tree: **lint 0/0 · tsc 0 · unit
561/561 (37 files) · build · smoke 15/15 · e2e 57/57 (9 specs)** ·
census MATCH. Captures 45/44+2 = 45/46 taken on the dev server (the
landing 1280×800 + the OPEN mobile menu 390×844, via `localhost`,
hydration awaited, the menu DOM-confirmed open before the shot),
PIL-verified. The dossier re-captures recorded (D-4's session-19
note + the PT section's SUPERSEDED note); SKILL v1.15.0; README
session-19 row + gate line + badge 618; AGENTS plans map; PAD §3/§8/
§12; worklog Task 19; this log. The Conventional Commit and the
SSH-wrapper push follow (dry-run first, key shredded after).

## The round (summary)

**Baseline:** the merged tree (`dab5aef`) passed lint 0/0 · tsc 0 ·
unit 550/550 (37 files); census MATCH. neo-crm unchanged (`b3d0fbe`).

**The audit** (three parallel subagents, every load-bearing finding
hand-verified): **0 Critical / 0 High / 2 Medium / 10 Low / 26 Info.**

**The parity walk (both sides, live):** the mobile menu family (no
drift), the five-route head census (**TWO DRIFTS** — the description
family re-anchored prefixed+truncated on the three inner routes, and
the monetization section redesigned EN with ten floating icons),
sitemap/robots unchanged.

**The cures (TDD, 5 mutation batteries):** the description re-anchor
(byte-pinned + the e2e leg + the top-level-field catch), the
monetization redesign (MonetizationSection + FloatingIcons +
pink-400/sky-400 palette pins), the reader-envelope closure
(live-reproduced → caught → cancelled → the null contract), the
verify lockout burn, the toast a11y pair, the reduced-motion resize
repaint, the view-swap focus map, the pricing-header reveal
retirement, the tsconfig `.mts` re-admission, and the lockstep batch.

**Verified:** unit **561/561** (37 files) · e2e **57/57** (9 specs) ·
smoke 15/15 · census MATCH · badge 618 · captures 45/46 PIL-verified
· the cured surfaces re-verified live on the dev server (the
prefixed descriptions on all three surfaces, the EN section
structure + animation, the plain /login family) · six docs + SKILL
v1.15.0 in lockstep. **Deferred: none** — every finding cured or
verified; the honest-deferred register (26 Info items) recorded in
the plan.
