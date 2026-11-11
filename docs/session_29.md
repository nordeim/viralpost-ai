# Session 29 — The Logout Session-Gate + The Shared Shape-Guard + The Head-DOM SEO Superset + The Wiring Pins + The Audit Batch (2026-11-11)

The round opened on the pulled tree (`edde18f` — the owner's session log
update holding the session-28 execution narration, the established
pattern). The core docs read in full (AGENTS, CLAUDE, README, PAD, SKILL
v1.24.0), then the session-28 set (session_28.md, the session-28 plan,
worklog Task 28, the owner's session_29.md narration). This round is
session 29. Baseline gate GREEN at the documented counts (lint 0/0 · tsc
0 · unit 636/636, 38 files); the standing asks re-verified up front (the
.env DATABASE_URL contract with `db/` at the repo root, census MATCH;
the vitest + playwright suites current; the sitemap/robots/manifest/OG
family fresh; `skills/` excluded from every gate, all pinned;
`.env.example` present, committed, matching). neo-crm re-checked at HEAD
`b3d0fbe` — UNCHANGED since session 12; the recorded decisions stand.

The web-application skill + the skills catalog internalized (the family
skill every prior round internalized — the repo's own
viralpost-ai_SKILL.md is its distilled project form, read in full).
Playwright (the repo's own devDependency) drove the parity walk. Three
parallel audit subagents dispatched (AUDIT-1 API/lib seams, AUDIT-2
components/pages/effects, AUDIT-3 SEO/configs/tests/docs) while the
findings were hand-verified in source. The audit returned **AUDIT-1:
0C/0H/0M/4L/3I · AUDIT-2: 0C/0H/0M/2L/6I · AUDIT-3: 0C/0H/0M/2L/4I** —
combined 0 Critical / 0 High / 0 Medium / 8 Low / 13 Info at the
subagent reports. The lead's adjudication took five Lows plus two Info
hardening items into the working register (all cured this round —
S29-1..S29-8), moving the rest to the accepted register with reasons
(the sub-AA tone family RE-ADJUDICATED against fresh live evidence
captured this walk — the reference ships the exact slate-400 /
teal-100/70 classes on the live pricing/landing surfaces; the scryptSync
async lift — the standing owner-level deferral; the first-signup admin
TOCTOU; the forgot-password non-transient residual; the parseEnvFile
unterminated-quote divergence; the noValidate declarative-minLength
note; the dead stepped gray tokens; the rAF offscreen posture; the
once-sampled reduced-motion; the eager hero portrait; the standalone
surfaces' main-landmark gap; the allowedDevOrigins IPv4-only scope).

The parity walk (live, both sides, logged into the reference) ran the
mobile-menu control census at 390×844 (the hamburger base classes with
our documented superset arms; the four links + the Gumroad pill
"Upgrade to Pro – $19" byte-identical; the open panel's max-height none
+ both surfaces transparent at scrollY=0; the bar's bg-transparent with
the menu open — the S26-3 cure holds; the scrolled-bar class family
byte-identical, the computed background the same color in its two
spellings — our oklab form and the reference's rgba(15, 23, 42, 0.95)),
the five-route head census (NO DRIFT — the session-19 description family
holds byte-for-byte; og:url + canonical differ by origin only; og:image
the documented D-4 self-hosted stand-in over the reference's platform
supabase render), the footer social family (our documented real-links
superset over the reference's five dead `#` stubs), sitemap.xml +
robots.txt (identical modulo origin), the desktop nav family
(byte-identical), and the pricing sub-AA class family (byte-identical
both sides — captured live for the A2-L1 adjudication). **NO DRIFT
FOUND — the third consecutive fully-clean walk.**

The session-29 plan written and validated against the codebase (the
anchor set — api-robustness's S15-2/S16-1/me-logout describes,
landing-page's generator-card describe, gate-script's script pins,
seo-surfaces's S24-11 describe, the e2e seo.spec home-head test), then
executed with TDD throughout:

- **S29-1 (the logout session-gate, the round's lead cure)**: the pin
  RED first, then the cure — requireSession owns the clear (the family's
  own session gate; isGuarded returns its response). Logout was the
  ONLY ungated side-effecting route a classic cross-site
  `<form method="POST">` could hit: the family's content-type CSRF gate
  never fires (no body read), and the response's Set-Cookie cleared the
  victim's session regardless of SameSite=Lax (which gates cookie
  SENDING, not SETTING). The Lax cookie never rides a cross-site POST,
  so the gate answers the envelope's 401 — and the no-op call is honest
  now. Live-verified on the dev server post-cure: a no-session POST →
  401 `UNAUTHENTICATED`; the logged-in round-trip → 200 `signedOut`;
  the smoke leg-12 + e2e session-spec faces unchanged. Mutation
  battery: the gate reverted → RED.
- **S29-2 (the shared shape-guard)**: the malformed-shape guard's three
  byte-identical copies (api.ts's parseBody + contact + generate) had
  already drifted once (contact widened in S16-1, generate only in
  S28-3 — twelve sessions of different vocabularies for the same
  malformed body). The predicate is exported from the seam now
  (`isJsonObject`), all three sites consume it, the vocabulary is
  byte-identical (live-verified: the generate `"hello"` probe still
  answers "Invalid request body"), and the S15-2/S16-1/S28-3 pins
  re-anchored to the call form in the same commit. The census pin
  counts exactly one `Array.isArray(` across the three files.
  Mutation battery: one copy re-inlined → RED.
- **S29-3 (the generator-card parse mirror)**: the response parse
  carries the family's `.catch(() => null)` — a non-JSON error body
  (a proxy/CDN 502 HTML page) reaches the `!res.ok` arm and renders
  the server's own failure face, not the catch block's network-error
  toast. Mutation battery: the catch dropped → RED.
- **S29-4 (the loginSchema comment-truth arm)**: the tolerant-email
  posture scoped — the shared 160-char cap answers a third vocabulary
  on a fourth status (400), shared by every emailField consumer, no
  enumeration oracle.
- **S29-5 (the head-DOM SEO superset)**: og:image + twitter:card + the
  /Tool canonical now asserted on the RENDERED head, folded in-place
  into the e2e home-head test (no count change — the S18-2/S25-17
  precedent). The og:image family was pinned only at the
  metadata-object and asset (IHDR) levels; a framework-level rendering
  change would have shipped green while the most-shared URL's preview
  card degraded. Mutation battery: the OG_IMAGE const's url broken →
  the folded arms RED against the build.
- **S29-6 (the db operator-script wiring census)**: db:push's
  prisma-env wrapper (the R-1 wrong-DB hazard's defeat — bun's .env
  absolutization of the relative file: URL) + db:seed's seed mapping
  pinned in gate-script. Born GREEN; the battery reverts the wrapper
  string → RED.
- **S29-7 (the icon IHDR pins)**: icon.png 512×512 + apple-icon.png
  180×180 join the S24-11 asset↔declaration doctrine (both manifest
  size declarations co-pinned). Born GREEN; the battery swaps a
  64×64 header → RED.
- **S29-8 (the docs/hygiene batch)**: CLAUDE's force-dynamic line
  scoped to the SEO routes' deliberate force-static (the build-time
  NEXT_PUBLIC_SITE_URL inlining posture); the .gitignore `.auth`
  entry re-filed under `# playwright`.

The count re-anchor: UNIT 636 → 641 (+5 pins — the plan's projection
exact, confirmed by the census before any doc site was touched),
SUITES 38 unchanged, E2E 63 unchanged (the S29-5 fold in-place), badge
699 → 704; the PAD §12 rows (api.ts 252 → 263, generator-card.tsx
266 → 271); the docs-counts constants re-anchored first (the census's
own reality pointers — UNIT 636 → 641), the census then walked
RED-to-GREEN site by site.

The full gate on the exact commit tree: **lint 0/0 · tsc 0 · unit
641/641 (38 files) · build · smoke 15/15 · e2e 63/63 (9 specs)** ·
census MATCH. Captures 65/66 taken on the dev server (the mobile-menu
open clean-walk re-verification at 390×844 + the generator-card
surface), PIL-verified; the cured surfaces live-verified (the logout
401/200 faces through the real login round-trip; the generate
vocabulary probe through the shared predicate). README (the
session-29 row, the gate line, the badge 704, the counts); AGENTS
(counts, the plans map's twenty-ninth round); CLAUDE (counts + the
S29-8 wording cure); PAD (the §12 rows, the test-distribution table,
the counts); SKILL v1.24.0 → v1.25.0 (frontmatter, Appendix A's
session-29 row, Appendix B both counts + the session-29
re-certification, the pre-ship checklist counts); worklog Task 29;
this log; the plan's post-execution record. The Conventional Commit
and the SSH-wrapper push follow (dry-run first, key shredded after).

## The round (summary)

**Baseline:** the pulled tree (`edde18f`) passed lint 0/0 · tsc 0 ·
unit 636/636 (38 files); census MATCH. neo-crm unchanged (`b3d0fbe`).

**The audit** (three parallel subagents + the lead's hand-verification
and adjudication): **0 Critical / 0 High / 0 Medium / 8 Low / 13 Info.**

**The parity walk (both sides, live): NO DRIFT** — the third
consecutive fully-clean walk. Every control surface byte-identical;
the pricing sub-AA classes captured live for the adjudication (the
reference ships the exact same classes — the standing parity-doctrine
acceptance holds with fresh evidence); the reference still rides the
Tailwind CDN.

**The cures:** +5 unit pins — the logout session-gate (S29-1, the
CSRF-logout class closed), the shared shape-guard (S29-2 — the
one-home predicate), the generator-card parse mirror (S29-3); in-place
— the loginSchema comment-truth arm (S29-4), the head-DOM SEO
superset arms (S29-5, folded into the e2e home-head test), the db
operator-script wiring census (S29-6), the icon IHDR pins (S29-7),
the docs/hygiene batch (S29-8). Every mutation battery on record.

**Verified:** unit **641/641** (38 files) · e2e **63/63** (9 specs) ·
smoke 15/15 · census MATCH · badge 704 · captures 65/66 PIL-verified ·
the cured surfaces live-verified (the logout 401/200 faces; the
generate vocabulary probe). Six docs + SKILL v1.25.0 in lockstep.
**Deferred:** the accepted register carried forward (the scryptSync
async lift — the standing owner-level deferral; the in-app delivery
default flip; the first-signup admin TOCTOU; the parseEnvFile
unterminated-quote robustness; the sub-AA tone family — the standing
parity-doctrine adjudication, now with this round's live captures as
its evidence).
