Task ID: 21
Agent: main (Z.ai)
Task: The session-21 CTA-class re-anchor + oklab→sRGB gradient cure +
mobile-menu pill + audit batch round — re-run the standing instruction
against the post-session-20 tree (8c2fdcf = b280189 + the session-20
round log): docs review, the baseline gate on the merged tree (lint 0/0
· tsc 0 · unit 571/571 (37 files) · census MATCH; the DATABASE_URL
contract re-verified end-to-end on a clean clone), the comprehensive
audit (0 Critical / 0 High / 1 Medium / 11 Low / 14 Info — dispatched
wide across three parallel subagents (API/lib seams,
components/pages/effects, SEO/configs/tests/docs), every load-bearing
finding hand-verified in source), the neo-crm repo re-review (HEAD
b3d0fbe — UNCHANGED since session 12; the recorded decisions stand),
the live reference parity walk (logged-in; the five-route head census,
the full computed-style control census at desktop + 390×844, the
monetization floaters, sitemap/robots, the generator superset) — FIVE
LIVE CLASS-LEVEL DRIFTS found (the first since session 19), the TDD
cures (R21-1..R21-19, +15 unit pins, 1 mutation battery, +1 e2e leg),
the gate, captures 49/50, push #21 to main via the SSH wrapper.

Details:
- THE FIVE DRIFTS (all live-verified on both sides, all cured +
  re-verified live): S21-1 the footer "Upgrade – $19" CTA (our
  from-teal-400/text-slate-900//25 form vs the reference's
  from-teal-500/text-white//30 — re-anchored, pinned); S21-2 the
  Pro-card CTA's hover family (our hover:bg-teal-50 tint vs its
  hover:shadow-lg + lift — re-anchored, pinned); S21-3 the mobile-menu
  pill (the reference's text is now "Upgrade to Pro" — the priced form
  was its session-1-era capture; re-anchored + the hover family,
  pinned, the e2e name re-pinned); S21-4 the menu links (the
  reference's dropdown re-renders the desktop LINK_BASE underline
  family; adopted, our block/py-2 touch-target layout kept as the
  documented superset); S21-5 THE OKLAB GRADIENT CURE (the audit's one
  Medium, elevated by the walk: every v4 bg-gradient-to-* compiles `in
  oklab` while the reference blends sRGB — the hue-crossing
  teal-400→amber-400 brand family drifted ΔR≈26 midband on the wordmark,
  the monetization headline, and the Get-Unlimited-Access CTA; the
  house doctrine's inline-style cure landed on all three (the exact
  `linear-gradient(to right, #2dd4bf, #fbbf24)`), the utility pair is
  BANNED from src/ by the design-tokens census, and the
  Tailwind-V4-Validation-Report's false arbitrary-form claim was
  re-anchored; mutation battery RED→restored→GREEN; live-verified
  byte-identical to the reference)
- S21-6: the reset screen's success-swap focus map — the S19-10 genus
  missed on this surface (the done-swap unmounted the focused submit;
  the h1 now carries data-view-focus + the prev-state ref guard);
  pinned
- S21-7 (refined mid-round): the OTP keystroke/paste/autofill triage
  — onChange cannot tell a keystroke from a paste from a browser
  AUTOFILL, so typing into an already-filled box SMEARED the old digit
  forward (the two-char append rode the distribution path); the first
  strict split broke the funnel e2e legs AND would have broken the
  one-time-code autofill, so the landed contract triages: append-onto-
  own-digit or single digit → replace in place + auto-advance; longer
  values (paste-via-onChange, autofill) → the shared distributeCodeFrom
  arm; real pastes intercepted by onPaste (preventDefault — the F12-6
  stale-prefix genus); pinned ×3 (re-anchored to the refined shape)
- S21-8: parseEnvFile strips unquoted inline comments — bun's loader
  does (live-verified isolated: `K=v # note` → v; `K=abc#def` → abc;
  quoted hashes survive), and a disagreeing parser broke the
  bun-absolutization signature check (the DB silently landing outside
  the repo — the Error-code-14 class); the parser now mirrors bun's
  scan order exactly; pinned ×4 (incl. the quoted-hash + the
  after-quote-comment faces)
- S21-9: the /signup route's FIRST runtime coverage — a UI-orphaned
  direct-nav surface with zero e2e legs (a render-time break would
  ship through a green gate); the leg asserts the title + the signup
  card + the canonical (e2e 57 → 58)
- S21-10: /reset-password's pageMetadata consumption pinned (the one
  unpinned factory consumer)
- The docs/comment batch: ADR-004's stale "488-test gate" re-anchored
  (S21-11); the PAD's §7-less heading ladder TOC renumbered + the
  Last-Updated date + the public/ tree entry (S21-14); the
  donor-ledger lineage notes (S21-12 — the CRM family's OWN session-20
  S20-P1..P4 describes in http-headers.test.ts re-attributed to this
  repo's session-8; the F10-4 note pattern applied to .env.example,
  DEPLOYMENT.md, playwright.config.ts, boot-env/error-boundaries/
  login-views/auth-reset test headers, the login/signup/reset-password
  page comments; the SKILL's new §0.5 Citation Provenance section maps
  the two ledgers); the PT reword + the page-titles S20-15 prose
  alignment (S21-13); the eslint phantom-ignore prune (S21-16 —
  examples/delivery/research/tool-results/mini-services/.zscripts/out/
  build never existed here; skills stays); the x-real-ip warning face
  (S21-17); the tolerant-email posture documented (S21-18); the
  findUnique + single-hash refactor (S21-19 — the S20-2 @unique index
  expressed structurally; the auth-reset pins re-anchored + the
  vacuous ordering arm fixed); the Copy button joins the focus-visible
  family (S21-20); the floating-icons matchMedia guard (S21-21); the
  SKILL Appendix B header re-certified through session 21 (S21-22)
- Deferred (the honest register): the signup admin-bootstrap race (an
  empty-DB edge behind the IP limiter), the logout-CSRF nuisance (the
  adjudicated S13-8 posture), the landing's section-header duplication
  (byte-identical; the CARD family is shared so the S21-2 cure landed
  on both routes), the Reveal no-JS trade-off (the reference's SPA is
  worse), the offscreen-rAF pause + the mid-session reduced-motion
  toggle (parity-neutral), the non-signin views' h2-only headings (the
  reference's own swap DOM), the per-account login lockout (carried),
  scryptSync-on-the-request-path (carried), the toast nested
  live-region trade-off (carried), the error.tsx axe battery (carried),
  the start tee pipe (carried)
- Count lockstep: UNIT 571 → 586 (+15: landing-page +4, design-tokens
  +3, a11y-controls +1, login-views +3, db-path +4), E2E 57 → 58 (the
  /signup leg), badge 628 → 644; the PAD §12 rows re-anchored (db-path
  254, navbar 196, generator-card 206, floating-icons 122); SKILL
  v1.16.0 → v1.17.0 (frontmatter, §0.5, §5 item 5's cure note,
  Appendix A's session-21 row, Appendix B re-certified); README's
  session-21 row + gate line; AGENTS counts + the plans map's
  twenty-first round; CLAUDE counts; PAD §8.1 + §12 + the hygiene
  batch; worklog Task 21 (this entry); docs/session_21.md (the
  pre-round transcript replaced by the round log); the plan's
  post-execution record
- Verified: lint 0/0 · tsc 0 · unit 586/586 (37 files) · build ·
  smoke 15/15 · e2e 58/58 (9 specs) · census MATCH · the five cured
  surfaces live-verified against the reference (the computed styles
  byte-match: the sRGB gradients, the footer/pro-card CTA classes, the
  menu pill text + hover family, the menu links' underline family) ·
  captures 49/50 PIL-verified

Task ID: 20
Agent: main (Z.ai)
Task: The session-20 ledger-count closure + resetToken index + limiter
namespace + hygiene batch round — re-run the standing instruction
against the post-session-19 tree (d6e17f4 = a47c50b + the session-19
transcript handoff): docs review, the baseline gate on the merged tree
(lint 0/0 · tsc 0 · unit 561/561 (37 files) · census MATCH; the
DATABASE_URL contract re-verified end-to-end on a clean clone), the
comprehensive audit (0 Critical / 0 High / 1 Medium / 9 Low / 16 Info
— dispatched wide across three parallel subagents (API/lib seams,
components/pages/effects, SEO/configs/tests/docs), every load-bearing
finding hand-verified in source), the neo-crm repo re-review (HEAD
b3d0fbe — UNCHANGED since session 12; the recorded decisions stand),
the live reference parity walk (logged-in; the five-route head census,
the mobile menu at 390x844 on BOTH sides, the monetization floaters,
sitemap/robots, the generator superset) — NO DRIFT (the session-19
description family + monetization redesign + mobile menu family all
hold byte-for-byte), the TDD cures (R20-1..R20-16, +10 unit pins, 2
mutation batteries), the gate, captures 47/48, push #20 to main via
the SSH wrapper.

Details:
- The one MEDIUM: the SKILL's Appendix-B verification ledger still
  said "e2e 56/56" — the session-19 commit re-anchored the unit count
  in the same paragraph but missed the e2e count, and the docs-counts
  gate's SKILL pin was satisfied by the frontmatter (not scoped to
  Appendix B). Cured: 57/57 + the parenthetical extended + the scoped
  pin with the retired-form negative (the README retired-badge ladder
  pattern); mutation battery RED→restored→GREEN
- R20-2: resetToken String? @unique (the funnel's two token lookups
  were the schema's only unindexed path; SQLite uniques treat NULLs
  as distinct so the no-pending rows coexist) + db:push; pinned
- R20-3: the smoke trap's GATE_PID="" init (the S19-17 trap
  referenced an uninitialized variable under set -u — an early-leg
  failure aborted cleanup mid-trap and leaked the temp files);
  pinned (the init must precede the trap registration)
- R20-4: the hero's superfluous "use client" retired — it composes
  client islands (Iridescence/ParticleText/Reveal) with serializable
  props and zero hooks; the static subtree now renders as server
  HTML; live-verified on the dev server (h1 + 2 canvases + WebGL
  context + the floaters all hydrating); pinned
- R20-5: the S19-9 mount residual — init() still built the
  never-drawn particle field in reduced mode; guarded (mirrors
  onResize); pinned
- R20-6: the toast focus-pause pair (onFocus/onBlur mirror the hover
  pair — keyboard/AT users keep the card while reading); pinned
- R20-7: the generate limiter's uid/ip namespace split (the shared
  `generate:${user?.id ?? clientKey(req)}` form let a
  mis-declared-proxy attacker collide with a victim's bucket via a
  forged XFF cuid); pin re-anchored in place; mutation battery
  RED→restored→GREEN
- R20-8/9/14/15: the comment-truth batch (the verify route's fsync
  write-residual documented — the resend S19-18 precedent; the seed's
  tokenVersion claim made precise; the type-gate lineage note's
  three install_packages sites re-anchored to the three-file scripts/
  reality; the site.ts truncation comment describes the hard slice +
  comma normalization, not a word-boundary algorithm)
- R20-10: the two bare CSPRNG calls (forgot-password's randomBytes,
  generate's randomInt) moved inside their try blocks — envelope
  absoluteness, belt-and-braces
- R20-11: the generator's paragraph count bank-capped (Math.min) —
  the used-set dedupe terminated only while bodyBank.length >= count;
  a future bank edit below 3 entries would have spun the request
  thread forever; pinned
- R20-12: the iridescence webglcontextlost guard (a lost GPU context
  span the rAF loop forever) + the loseContext-why comment (the
  StrictMode remount invariant, pinned by negative)
- R20-13: the SKILL §7 PT present-tense reworded to the EN
  monetization section + the semantic-prose census negative
- R20-16: vitest.config.mts gains the explicit skills/** exclude —
  the three-config exclusion doctrine (tsconfig/eslint/vitest) now
  mechanical
- Deferred (the honest register): the per-account login lockout (a
  per-email counter is itself an enumeration oracle unless carefully
  shaped — needs its own design round), the landing's inline
  pricing/contact duplication (byte-identical DOM today, verified;
  a maintainability refactor with pin churn), the malformed-hash
  scrypt fast-fail, scryptSync-on-the-request-path (the family
  convention), the toast nested-live-region trade-off, the toast
  subscribe race (dormant), the skip link, the error.tsx axe battery,
  the start tee pipe
- Count lockstep: UNIT 561 → 571 (+10 pins), E2E 57/9 unchanged,
  badge 618 → 628; PAD §12 rows re-anchored (schema 64, smoke 183,
  particle-text 330, iridescence 241, generator 453, site 173);
  SKILL v1.14.0 → v1.16.0 (the session-19 plan's 1.15.0 bump never
  landed in the frontmatter — this round's bump covers both, noted
  in the plan's record); README session-20 row + gate line; AGENTS
  counts + the plans map's twentieth round; CLAUDE counts; PAD §8.1;
  worklog Task 20 (this entry); docs/session_20.md (the pre-round
  transcript replaced by the round log); the plan's post-execution
  record
- Verified: lint 0/0 · tsc 0 · unit 571/571 (37 files) · build ·
  smoke 15/15 · e2e 57/57 (9 specs) · census MATCH · the cured
  surfaces live-verified on the dev server (the hero server
  composition + both islands hydrating, the generator round-trip,
  the five-route head census, the mobile menu family) · captures
  47/48 PIL-verified

Stage Summary:
- THE AUDIT ROUND at 0 Critical / 0 High / 1 Medium / 9 Low / 16
  Info with every load-bearing finding hand-verified; NO parity
  drift for the first time since session 17 (the reference held
  steady through this walk)
- THE CURES: the ledger-count closure (the gate's own coverage hole
  closed with it), the schema's last unindexed lookup path, the
  smoke trap's unbound variable, the hero's client-bundle waste, the
  S19-9 mount residual, the toast keyboard pause, the limiter
  collision class, the envelope belt-and-braces, the generator's
  latent hang, the WebGL context-loss spin, the comment-truth batch,
  the vitest exclusion symmetry
- SHIPPED: the remediated codebase + the six docs in lockstep
  committed to main and pushed via docs/ssh_git_wrapper_v3.py (the
  remote verified; no new branches)

Task ID: 19
Agent: main (Z.ai)
Task: The session-19 description-family re-anchor + monetization
redesign + reader-envelope closure + a11y batch round — re-run the
standing instruction against the post-session-18 tree (dab5aef): docs
review, the baseline gate on the merged tree (lint 0/0 · tsc 0 · unit
550/550 (37 files) · census MATCH; the DATABASE_URL contract
re-verified end-to-end on a clean clone), the comprehensive audit (0
Critical / 0 High / 2 Medium / 10 Low / 26 Info — dispatched wide
across three parallel subagents (API/lib seams, components/pages/
effects, SEO/configs/tests/docs), every load-bearing finding
hand-verified in source; the M-1 stream-error escape live-reproduced
with an errored ReadableStream), the neo-crm repo re-review (HEAD
b3d0fbe — UNCHANGED since session 12; the recorded decisions stand),
the live reference parity walk (logged-in: /Home; the mobile menu at
390x844 — the no-aria hamburger md:hidden p-2 text-slate-300, 5
destinations, auto-close; the FIVE-ROUTE head census; sitemap/robots
unchanged) + the clone's dev-server walk (hydration clean via
localhost; the menu family — Escape WITH the focus return, navigate +
auto-close + the derived title) — TWO LIVE DRIFTS FOUND: the
description family (the reference's platform adopted the
"<Page> on ViralPost AI. " prefix + a 70-char word-boundary-truncated
tail on meta/og/twitter description alike on /Tool /Pricing /Contact;
/ and /login keep the plain 170-char paragraph) and the monetization
section redesign (the PT face replaced by a redesigned EN section:
new badge/H2/paragraph, 4 EN benefit cards, BOTH CTAs external
Gumroad anchors, a lock-icon trust line at mt-6, and TEN floating
lucide icons with JS-driven bob/rotate/opacity), the TDD cures, the
mutation batteries (5), the gate, captures 45/46, push #19 to main
via the SSH wrapper.

Work Log:
- THE AUDIT (0 Critical / 0 High / 2 Medium / 10 Low / 26 Info): the
  API/lib subagent (13 route files + 20 seams + prisma/scripts, unit
  suite executed 550/550) surfaced the readBoundedJson stream-error
  escape (MEDIUM, live-reproduced — the seam's one unguarded await) and
  the proxyless shared-bucket documentation gap (MEDIUM); the
  components subagent surfaced the toast icon aria-hidden + live-region
  pair, the reduced-motion resize blank (particle title up to ~3s),
  and the login view-swap focus drop (all LOW); the configs/docs
  subagent surfaced the vitest.config.mts tsc-program hole (verified
  live with --listFiles), the 405-vs-204 comment drift, the stale
  .mts names in next.config/playwright comments, and the stale
  runtime-deps-nine claim (prisma moved to devDeps at session 15).
- THE DESCRIPTION-FAMILY RE-ANCHOR (S19-1, TDD + mutation battery):
  the page-titles pins rewritten FIRST (RED: exactly the 3 new pins
  failed), then pageDescription() joined site.ts — the prefix + the
  SITE_DESCRIPTION-derived 70-char word-boundary tail (trailing comma
  normalized to a period) — consumed by pageMetadata() for
  description/og/twitter on the three inner routes. The live dev
  re-verification caught the top-level-field gap (og was prefixed
  while meta description still inherited the layout's plain paragraph
  — Next's shallow merge); the description field joined the factory
  and the pins extended to all three surfaces. The e2e leg added
  (the /Tool byte-exact family + the /login plain paragraph; e2e
  56 → 57). Mutation battery: slice(0,70) → slice(0,60) REDs exactly
  the 2 derivation pins → restored → GREEN.
- THE MONETIZATION REDESIGN (S19-2, TDD + 2 mutation batteries): the
  landing-page pins rewritten FIRST (RED: exactly 4), then PtSection
  → MonetizationSection in sections.tsx (the live-extracted EN copy,
  the benefit cards, BOTH CTAs as external Gumroad anchors with the
  reference's exact classes — gift/heart/arrow-right icons, the
  px-8 py-4 text-base w-full sm:w-auto family — and the lock-icon
  trust line at mt-6 flex gap-2) + src/components/effects/
  floating-icons.tsx (the new client island: TEN pinned lucide icons
  at the reference's exact left/top percentages, color steps and
  18-28px sizes; one rAF loop writing per-frame translateY
  (-45±25px) / rotate (±10deg) / opacity (0..1) with staggered
  phases; prefers-reduced-motion collapses to the static render;
  full cleanup). pink-400 (#f472b6) + sky-400 (#38bdf8) joined the
  v3 palette re-pin in globals.css. The e2e landing heading pin
  re-anchored ("Baixe Agora de Graça." → "Download Free."). Mutation
  batteries: the badge copy and a floater icon identity each RED
  exactly their pins → restored → GREEN. Live structure walk: the
  clone's section byte-matches the reference's (section classes, 10
  floaters at pinned positions, CTA texts, trust line) and the
  animation live-samples inside the observed envelope.
- THE READER-ENVELOPE CLOSURE (S19-3, MEDIUM, TDD): an errored body
  stream rejected PAST readBoundedJson (live-reproduced by the audit
  and re-verified in the RED run — the raw Error crossed the handler
  boundary). CURED: the Layer-3 reader loop wrapped — a stream error
  cancels the producer and resolves { tooLarge: false, value: null }
  (an unreadable body is an unparseable one; the sites' 400
  vocabulary answers). 2 regression pins (the mid-body error + the
  error-after-valid-JSON-prefix arm).
- THE VERIFY LOCKOUT BURN (S19-5, TDD): the locked-out 429 burned no
  scrypt while the miss and wrong-code branches each burned one — a
  ~100ms timing oracle on "exists AND unverified AND >= 5 failures".
  The equalizer burn now precedes the lockout return (source-pinned
  the S14-2 way).
- THE TOAST A11Y PAIR (S19-7/S19-8, TDD): the ICONS map + the
  dismiss X carry aria-hidden (the S15-4 doctrine completed on the
  last unattributed family) and the Toaster viewport is a polite live
  region (dynamically inserted role="status" cards announce reliably;
  the sonner/Radix pattern).
- THE REDUCED-MOTION RESIZE (S19-9, TDD): layout() clears the canvas
  and the reduced face had no repaint until the next phrase timer
  (up to ~3s blank on resize/rotate). onResize now drawPlain()s
  immediately in reduced mode and skips the wasted buildParticles().
- THE VIEW-SWAP FOCUS MAP (S19-10, TDD): the login card's in-place
  swaps (Forgot password? / Need an account? / Back) dropped focus to
  <body>. The view effect now lands focus on the incoming view's
  heading (tabIndex={-1} + data-view-focus, 4 headings; verify keeps
  the code-box focus; the prev-view guard keeps initial mount from
  stealing focus).
- THE PARITY MOTION CURE (S19-11): the live walk showed the
  reference's pricing header UNFADED on BOTH routes (the cards
  reveal on both) — the /Pricing header <Reveal> retired (the
  audit's add-Reveal-to-the-landing reading inverted by the live
  evidence).
- THE LOCKSTEP BATCH (S19-12..S19-18): "**/*.mts" re-admitted
  vitest.config.mts to the tsc program (verified: --listFiles);
  the seo.spec S18-2 comment re-anchored 405 → the live-observed
  204; the next.config excludes + the playwright comment renamed
  .mts; the PAD/SKILL runtime-deps claims re-anchored (8 runtime
  packages + the prisma CLI devDep); scripts/install_packages.sh
  retired (the vestigial floating npm one-liner); the smoke trap now
  kills GATE_PID; the known-path OPTIONS-204 exception documented in
  the catch-all comment family (the CORS-preflight rationale); the
  proxyless shared-bucket consequence joined the boot warning +
  DEPLOYMENT §3 (any proxyless deployment — declared 0 or the unset
  default — shares one bucket per route for honest browser traffic);
  the resend fsync residual documented; CLAUDE's tw-animate.css
  spelling fixed; the .gitignore duplicate node_modules line
  removed; the PAD §12 header + rows re-anchored (site.ts 169,
  api.ts 252, globals.css 222, particle-text 323, api/route.ts 51,
  smoke-test.sh 178, + the floating-icons.tsx row at 117).
- THE CENSUS FALLOUT (in-commit, the session-18 lesson): the color
  census flagged pink-400/sky-400 (cured: the v3 pins) and my own
  "auto-answer" comment (the to-answer genus — rephrased to
  "built-in reply"); the docs-counts gate re-anchored UNIT 550 →
  561, E2E 56 → 57, badge 606 → 618 across README/AGENTS/CLAUDE/
  PAD/SKILL + the PAD §12 line rows.
- THE SHIP: full gate GREEN (lint 0/0 · tsc 0 · unit 561/561 (37
  files) · build · smoke 15/15 · e2e 57/57 (9 specs)) on the exact
  commit tree; census MATCH; captures 45/46 PIL-verified (the
  landing 1280x800 + the OPEN mobile menu 390x844 — menu DOM-open
  confirmed before the shot); the dossier re-captures recorded
  (D-4's session-19 note + the PT section's SUPERSEDED note); SKILL
  v1.14.0 → v1.15.0 (frontmatter, §7, Appendix A's session-19 row,
  Appendix B re-certified through session 19 with the re-walk
  narrative); README session-19 row + gate line + badge; AGENTS
  plans map; PAD §3/§8/§12; docs/session_19.md (this round's log);
  the plan's post-execution record.

---

Task ID: 18
Agent: main (Z.ai)
Task: The session-18 OPTIONS-envelope closure + DEPLOYMENT count
re-anchor + config-loader silence round — re-run the standing
instruction against the post-session-17 tree (1a0f801): docs review,
the baseline gate on the merged tree (lint 0/0 · tsc 0 · unit 550/550
(37 files) · the e2e --list census 56/9 · census MATCH), the
comprehensive audit (0 Critical / 0 High / 0 Medium / 1 Low /
10 Informational — dispatched wide across three parallel subagents
(API/lib seams, components/pages/effects, SEO/configs/tests/docs),
every load-bearing finding hand-verified in source; the audit's one
Zod-leak candidate — signupSchema.name.max(80) possibly leaking
default text — DISPROVED live against the pinned zod 4.6.7: the
constructor's { message } inherits to .max()), the neo-crm repo
re-review (HEAD b3d0fbe — UNCHANGED since session 12's review; its
adoption and deferral decisions stand), the live reference parity walk
(logged-in: /Home with the "ViralPost AI" title; the mobile menu at
390x844 — the no-aria hamburger md:hidden p-2 text-slate-300, 5
destinations, auto-close on navigation; the landing's 10-section
composition INCLUDING the PT monetization section + the
templixco.gumroad.com/l/znzbnd link family; the OG family re-captured
on ALL FIVE routes via DIRECT loads — prefixed og:title + per-route
canonical on /Tool /Pricing /Contact, the unprefixed family on / and
/login: the clone matches, NO drift; sitemap/robots unchanged) + the
clone's dev-server walk (hydration clean at 390x844 via localhost; the
menu open — 5 destinations + brand; Escape WITH the focus return;
navigate + auto-close + the derived "Tool | ViralPost AI" title) + the
live cure probes (the S17-5 media-type gate, the generator round-trip,
the bare-/api envelope 404), the TDD cures, the mutation batteries
(2), the gate, captures 43/44, push #18 to main via the SSH wrapper.

Work Log:
- THE AUDIT (0 Critical / 0 High / 0 Medium / 1 Low / 10
  Informational): three parallel subagents read the API family + the
  20 lib seams, the components/pages/effects family, and the SEO/
  configs/tests/docs surface in full; all session-17 cures re-verified
  in source AND live. The one Low finding is a documentation-drift
  item; the ten Info findings are hardening/edge notes — the four
  actionable ones cured this round, the six verified-no-action items
  recorded in the plan's register (admin-bootstrap TOCTOU theoretical,
  /api/health unthrottled by design, no CSP = documented parity, the
  toast store's legacy-but-pinned pattern, the landing shell
  consistency nuance, the OTP digit-distribution semantics pinned as
  intended).
- THE OPTIONS-ENVELOPE CLOSURE (S18-2, INFO — TDD): both envelope-404
  catch-alls exported only the five-method family, so an OPTIONS probe
  of an unknown path fell to Next's OWN auto-answer — a bare 204
  (live-observed in the RED run; not the 405 the audit first
  hypothesized) — a non-envelope response on a path that does not
  exist. CURED by TDD: the S15-7 e2e leg extended in place (both faces
  co-pinned — the [...path] subtree and the bare /api), RED against
  the five-method tree (exactly the extended test failed, 204
  observed), then the OPTIONS export joined both catch-alls with the
  TRACE exclusion documented (not a supported route-handler method) —
  GREEN post-cure. MUTATION BATTERIES: removing either catch-all's
  OPTIONS export REDs exactly the pin (one battery per face) →
  restored → GREEN.
- THE DEPLOYMENT COUNT RE-ANCHOR (S18-1, LOW): DEPLOYMENT.md §1 still
  said "the 11 API route files (11 verb handlers)" — sessions 15-16
  added the two envelope-404 catch-alls; 13 route files on disk now.
  The sentence re-anchored with the two catch-alls named.
- THE LOGOUT COMMENT (S18-3, INFO): logout is the only cookie-mutating
  route without a try/catch — the comment now documents WHY the bare
  call is safe (clearSessionCookie performs no crypto and no DB work,
  cookies() cannot throw in a route handler; login/verify wrap their
  MINT because secret() and the DB read CAN throw) and what would
  change the answer.
- THE E2E_PORT DOC FACE (S18-4, INFO): the e2e port knob
  (E2E_PORT ?? "3100", single source tests/e2e/e2e-port.ts) appeared
  in no live doc — an operator with a :3100 conflict could not
  discover it. The AGENTS e2e note now carries it (test-infra tooling;
  the six-knob app env contract is complete and untouched).
- THE CONFIG-LOADER SILENCE (S18-5, INFO): vitest.config.ts →
  vitest.config.mts — Vite's "ESM syntax in a file loaded as
  CommonJS" warning printed on EVERY gate run and names a real future
  break (configLoader: 'native' becomes the default in a future Vite
  major). Verified: no test pin names the file, the suite runs clean,
  the SKILL config table lockstepped.
- THE LOCKSTEP: counts UNCHANGED (the OPTIONS leg extended an existing
  e2e test — unit 550/37 files, e2e 56/9 specs, badge 606); PAD §12's
  two catch-all rows re-anchored 34 → 43 lines; README (the session-18
  row + the gate line); AGENTS (the plans map's eighteenth round + the
  E2E_PORT note); the SKILL v1.13.0 → v1.14.0 (frontmatter, the
  config table's .mts, Appendix A's session-18 row, Appendix B
  re-certified through session 18 with the OPTIONS closure in the
  ledger); worklog Task 18 (this entry); the session-18 plan's
  post-execution record.
- THE GATE: lint 0/0 · tsc 0 · unit 550/550 (37 files) · build ·
  smoke 15/15 · e2e 56/56 (9 specs) · census MATCH — on the exact
  commit tree.
- Captures 43/44 (the landing 1280x800 + the OPEN mobile menu
  390x844, dev server via localhost, hydration awaited), PIL-verified.
- Push #18 to main via the SSH wrapper (dry-run first, key shredded
  after).

Task ID: 17
Agent: main (Z.ai)
Task: The session-17 comment-truth + README-table + CSRF-media-type +
timer-hygiene round — re-run the standing instruction against the
post-session-16 tree (81b3ada): docs review, the baseline gate on the
merged tree (lint 0/0 · tsc 0 · unit 548/548 (37 files) · the e2e
--list census 56/9), the comprehensive audit (0 Critical / 0 High /
0 Medium / 2 Low / 6 Informational — the cleanest audit yet; every
finding hand-verified in source; F17-8's Assumed tail closed by a live
warn-level exhaustive-deps dry-run: exactly 2 flags, both
particle-text.tsx:293, config restored clean), the neo-crm repo
re-review (HEAD b3d0fbe — UNCHANGED since session 12's review; its
adoption and deferral decisions stand), the live reference parity walk
(logged-in: /Home with the "ViralPost AI" title; the mobile menu at
390x844 — the no-aria hamburger md:hidden p-2 text-slate-300, 5
destinations, auto-close on navigation; the OG family re-captured on
ALL FIVE routes via DIRECT loads — prefixed og:title + per-route
canonical on /Tool /Pricing /Contact, the unprefixed family on / and
/login: the clone matches byte-for-byte, NO drift; the reference's SPA
soft-navigation head quirk observed and excluded — its client-side
router leaves the previous page's canonical/og in the head, so only
direct loads are the parity evidence; sitemap/robots unchanged) + the
clone's dev-server walk (hydration clean at 390x844 via localhost; the
menu open — 5 destinations + brand; Escape WITH the focus return;
navigate + auto-close + the derived "Tool | ViralPost AI" title) + the
live cure probes (the S16-1 non-object vocabulary, the field-level
messages, the S16-2 bare-/api envelope 404, the generator round-trip),
the TDD cures, the mutation batteries (3), the gate, captures 41/42,
push #17 to main via the SSH wrapper.

Work Log:
- THE AUDIT (0 Critical / 0 High / 0 Medium / 2 Low / 6 Informational):
  the wide dispatch read every lib module, all 16 API route files, the
  components, the SEO surface, ~30 suites in full, the configs, and the
  docs; all six session-16 claims re-verified in source; all 20 PAD §12
  rows live-matched; all 8 runtime deps + 14 devDeps carry live
  consumers. Both Low findings are documentation-accuracy items; the
  six Info findings are hardening/cosmetic notes — all cured or
  verified this round.
- THE COMMENT TRUTH (S17-1, LOW): the forgot-password no-enumeration
  rationale cited "signup's 409 openly enumerates by design" — but
  signup's already-exists branch answers ERR.BAD_REQUEST → HTTP 400
  (signup/route.ts:66,120). A future auditor reasoning from the comment
  would mis-model the sibling surface. CURED: the comment now says 400
  (with the S17-1 provenance note naming the retired phantom).
- THE README TABLE REPAIR (S17-2, LOW): the Project status table's
  interior blank lines (after the session-12 row, around the two
  "Gate at the session-N ship" fragment lines) terminated the GFM
  table at session 12 — the session 13-16 rows rendered as header-less
  prose on GitHub, the session-16 row (the table's most recent
  history) among them. CURED: one continuous table (sessions 1-17),
  the stale fragment gate lines superseded by the single post-table
  gate line at the session-17 counts. The pinned strings (badge,
  architecture table, quickstart lines, env table) untouched — the
  docs-counts census green throughout.
- THE CSRF MEDIA-TYPE PARSE (S17-5, INFO — TDD): the content-type
  gate substring-matched — .includes("application/json") accepted
  text/x-application/json and application/jsonx. Not exploitable for
  the defended class (cross-site forms send only the three enctype
  types; a JS-set Content-Type trips CORS preflight, which fails
  closed) — pure gate hygiene on a security gate. CURED by TDD: the
  pin FIRST (one behavioral pin owning both hostile faces, co-pinned
  and documented in the pin's comment), RED against the .includes()
  tree (exactly the new pin failed), then the api.ts gate parses the
  media type (split ";", trim, lowercase, strict equality) — the
  charset/case/absent/plain/multipart arms unchanged (the family's
  42/42 green post-cure). MUTATION BATTERY: the gate reverted to
  .includes REDs exactly the pin → restored → GREEN.
- THE TIMER HYGIENE (S17-6, INFO): the two fire-and-forget marketing
  resets (generator-card's copy flip at 2s, contact-form's sent flip
  at 2.6s) weren't ref-tracked — a setState after unmount is a React
  19 silent no-op (no leak), but the toast component already carries
  the useRef + unmount-clearTimeout idiom (toast.tsx:91-99). CURED:
  both components mirror the toast's idiom (the ref, the
  clear-before-re-arm — which also gives a rapid re-copy its full 2s
  window, the toast's timer-reset shape — and the unmount clear).
  Pinned by ONE co-pinned source pin in landing-page.test.ts
  (comment-stripped needles). MUTATION BATTERIES: removing either
  component's unmount clear REDs exactly the pin (one battery per
  face) → restored → GREEN.
- THE POLISH BATCH: S17-3 — the generate route's guests-allowed wiring
  also discards requireSession's 500 envelope (under a DB outage a
  logged-in user silently degrades to the per-IP bucket; generation
  still answers — the stateless engine needs no DB): the one-line
  comment documenting the accepted degradation, the S14-3 401-discard's
  twin. S17-4 — the DEPLOYMENT.md re-seed note (the seed's upsert
  update-path resets the demo password to the publicly documented
  $Abcd1234 and tokenVersion to 0, re-validating pre-reset v0 cookies).
  S17-7 — the dead noValidate={false} removed from contact-form (an
  explicit no-op default; the login family's bare noValidate is the
  deliberate idiom). S17-8 — the PAD §11 S15-6 row's "exactly 2
  exhaustive-deps flags" claim carries an independent live
  re-verification (this round's dry-run).
- THE LOCKSTEP: unit 548 → 550/37 files (+1 the S17-5 media-type pin,
  +1 the S17-6 timer source pin), e2e 56 unchanged, badge 604 → 606;
  the count-history comment; README (badge, architecture/testing
  counts, the repaired table + the session-17 row, the gate line);
  AGENTS (counts, the plans map's seventeenth round); CLAUDE; PAD
  (§8.1 distribution, §8.3 doctrine line, §11's re-verified row, §12
  header + the api.ts 230→239 and generator-card 191→203 rows); the
  SKILL v1.12.0 → v1.13.0 (frontmatter, the §11 checklist counts,
  Appendix A's session-17 row, Appendix B re-certified through
  session 17); worklog Task 17 (this entry); the session-17 plan's
  post-execution record.
- THE GATE: lint 0/0 · tsc 0 · unit 550/550 (37 files) · build ·
  smoke 15/15 · e2e 56/56 (9 specs) · census MATCH — on the exact
  commit tree.
- Captures 41/42 (the landing 1280x800 + the OPEN mobile menu
  390x844, dev server via localhost, hydration awaited), PIL-verified.
- Push #17 to main via the SSH wrapper (dry-run first, key shredded
  after).

Task ID: 16
Agent: main (Z.ai)
Task: The session-16 parse-vocabulary completion + bare-/api envelope +
polish-batch round — re-run the standing instruction against the
post-session-15 tree (de6e238): docs review, the baseline gate on the
merged tree (GREEN at the documented 543/37 + 56/9 + 15 counts — MATCH;
census MATCH), the comprehensive audit (0 Critical / 0 High / 1 Medium /
2 Low / 8 Informational; the load-bearing finding live-confirmed on FIVE
dev-API probes; the session-15 cures re-verified clean), the neo-crm
repo re-review (HEAD b3d0fbe — UNCHANGED since session 12's review; its
adoption and deferral decisions stand), the live reference parity walk
(logged-in: /Home with the "ViralPost AI" title; the mobile menu at
390x844 — 5 destinations, auto-close on navigation (the post-nav
visible /Tool link is the FOOTER's — the panel itself closed), the
no-aria hamburger byte-identical to the clone's base classes; the OG
family live re-captured on ALL FIVE routes — prefixed og:title +
per-route canonical on /Tool /Pricing /Contact, the unprefixed family on
/ and /login, the plain description everywhere: the clone matches
byte-for-byte, NO drift; sitemap/robots unchanged) + the clone's
dev-server walk (hydration clean at 390x844; the menu open — 5
destinations + brand; Escape WITH the focus return; navigate +
auto-close + the derived "Tool | ViralPost AI" title; the hamburger
carries the reference's base classes + the S15-8 slate-300 ring), the
TDD cures, the mutation batteries (5), the gate, captures 39/40, push
#16 to main via the SSH wrapper.

Work Log:
- THE PARSE-VOCABULARY COMPLETION (S16-1, MEDIUM — live-confirmed ×5):
  the S15-2 cure guarded raw === null only, so a JSON body that PARSES
  to a string/array/number/boolean fed safeParse and leaked Zod's
  dev-facing "Invalid input: expected object, received string|array"
  on the whole auth family (parseBody) AND contact's route-local site
  (curl '"hello"' / '[1,2]' reproduced both); the three schema fields
  without { message } (verifySchema.code, resetPasswordSchema.
  new_password, passwordSchema at signup) leaked "Invalid input:
  expected string, received number|undefined" for type errors (curl
  {"code":12345} / {"reset_token":"abc"} / {"password":12345678}
  reproduced all three). CURED by TDD: parseBody's guard widened to
  the whole malformed-SHAPE class (null OR non-object OR array → the
  pinned "Invalid request body"), contact mirrors the same arm, and
  the three fields gain { message } type-faces carrying their own
  pinned vocabularies ("Please enter all 6 digits" via
  verificationIncompleteMessage(), "Password must be at least 8
  characters long", "Password must be at least 8 characters").
  Generate deliberately UNTOUCHED — its narrowing bypasses the issue
  message (the pinned describe-first contract). +1 parse-body
  behavioral pin (the four non-object forms co-pinned), +3 schema
  field pins, +1 contact object-guard source pin; all 5 mutation
  batteries RED exactly their pins (arm removal ×2, { message }
  removal ×3) → restored → GREEN.
- THE BARE-/API ENVELOPE 404 (S16-2, LOW): the exact zero-segment path
  /api is the one shape a REQUIRED [...path] catch-all can never
  match — it fell through to the page tree's [...catchAll] and
  answered the HTML 404 (title "Api | ViralPost AI"). CURED:
  src/app/api/route.ts — the same five-method envelope-404 family,
  force-dynamic; the S15-7 e2e leg extended IN PLACE with the bare-path
  assertions (RED proven against the pre-cure build — content-type
  text/html — GREEN post-cure; no count change, the leg's purpose IS
  this doctrine).
- THE POLISH BATCH: the dead reducedRef retired from particle-text
  (S16-4 — assigned, never read, visible only because no-unused-vars
  is off); the footer ©-year build-time freeze documented as a
  deviation (S16-5 — the (site) pages are statically prerendered, the
  reference's SPA computes it live; divergence opens only past a
  calendar-year boundary crossed by the last deploy; the in-code
  comment + the PAD §11 row, a client-side island rejected on
  hydration-risk grounds); the generate-429 deviation comment (S16-7 —
  the family's ONE deliberate ERR.RATE_LIMITED deviation, the
  generator's own client-facing copy); the PAD §11 S15-6 row
  re-recorded with the TRUE blast radius (S16-3 — exhaustive-deps +
  no-console + no-unused-vars + no-undef + no-unreachable are ALL off
  tree-wide, not just the 2 documented flags; the deferral stands,
  scoping requires restructuring particle-text's join-key idiom
  first); the PAD §12 header's stale "session-11 ship" phrase
  refreshed to the session-16 ship (S16-6).
- THE VERIFICATION: lint 0/0 · tsc 0 · unit 548/548 (37 files, +5:
  the S16-1 family) · build · smoke 15/15 · e2e 56/56 (9 specs — the
  S16-2 assertions extended the existing S15-7 leg, no count change)
  · census MATCH · the reality census re-anchored FIRST (UNIT 543 →
  548; the PAD §12 inventory rows: api.ts 222 → 230, particle-text
  315 → 313, + the new api/route.ts row at 34).
- THE DOCS LOCKSTEP: README (badge 604 = 548+56, the architecture +
  testing counts, the API table's catch-all row naming both routes,
  the session-16 status row, the gate line) · AGENTS (counts, the
  plans map's sixteenth round) · CLAUDE (counts) · PAD (§8.1
  distribution, §8.3, §11's re-recorded S16-3 row + the new S16-5
  deviation row, §12's inventory + header) · the SKILL v1.11.0 →
  v1.12.0 (frontmatter, the §11 checklist counts, Appendix A's
  session-16 row, Appendix B re-certified through session 16) · this
  worklog Task 16 · the session-16 plan's execution record.
- SHIPPED: the remediated tree + the six docs in lockstep + the plan
  doc (docs/plans/2026-11-10-session16-parse-vocabulary-completion-
  bare-api-envelope-and-polish-batch.md) + captures 39/40, committed to
  main and pushed via docs/ssh_git_wrapper_v3.py

Task ID: 15
Agent: main (Z.ai)
Task: The session-15 resend P2025 sibling arm + null-body vocabulary +
API-envelope 404 round — re-run the standing instruction against the
post-session-14 tree (a73e941): docs review, the baseline gate on the
merged tree (GREEN at the documented 538/37 + 55/9 + 15 counts — MATCH;
census MATCH), the comprehensive audit (0 Critical / 0 High / 0 Medium /
3 Low / 6 Informational; every load-bearing finding hand-verified in
source; S15-2 and S15-7 live-confirmed on the dev API pre-cure), the
neo-crm repo re-review (HEAD b3d0fbe — UNCHANGED since session 12's
review; its adoption and deferral decisions stand), the live reference
parity walk (logged-in: /Home, the mobile menu at 390x844 — 5
destinations, auto-close, the no-aria hamburger byte-identical to the
clone's base classes, /Tool's hard-nav title + OG family + root
canonical — NO drift since session 14) + the clone's dev-server walk
(hydration clean, the menu open/close, Escape WITH the focus return,
navigate + auto-close, the from_url=/Tool round-trip, the S14-1 escape
REGRESSION check — the protocol-relative from_url lands on / post-cure),
the TDD cures, the mutation batteries (5), the gate, captures 37/38,
push #15 to main via the SSH wrapper.

Work Log:
- THE RESEND P2025 SIBLING ARM (S15-1, LOW): the vanished-row
  findUnique→update race fell into resend's blanket catch → the raw
  500, while verify maps the same race to its 400 (S13-5) and
  forgot-password to stored=false. CURED by TDD: the arm returns the
  SAME no-op 200 the unknown-account branch serves (the timing already
  matches — the scrypt burn happened building the update data before
  the throw). ONE pin iteration the battery forced: the first pin form
  (P2025-in-source + noOp>=2) survived a `false &&` sabotage — the
  condition-form face (instanceof + the code literal, regex-pinned)
  added; BOTH mutation forms (disabled + fully removed) then RED
  exactly the pin.
- THE NULL-BODY VOCABULARY (S15-2, LOW — live-confirmed pre-cure): the
  two route-local parse sites fed readBoundedJson's null (the
  content-type CSRF gate's unparseable-by-policy class, or unparseable
  JSON) straight to safeParse — contact leaked Zod's dev-facing
  "Invalid input: expected object, received null" to the client (curl
  -H "content-type: text/plain" POST /api/contact reproduced it), and
  generate answered the over-length message for a non-string idea
  (String(999) is non-empty) and the describe-first message for a
  malformed body. CURED by TDD: both sites null-check read.value ahead
  of safeParse with the parseBody vocabulary ("Invalid request body"),
  and the over-length arm gates on typeof rawIdea === "string". Both
  mutation forms (arm removal, typeof-gate removal) RED exactly their
  pins.
- THE API-ENVELOPE 404 (S15-7, INFO — live-confirmed pre-cure): unknown
  /api paths answered the HTML 404 body (the root page catch-all wins
  where no route exists; content-type text/html on
  /api/nonexistent-endpoint). CURED: src/app/api/[...path]/route.ts —
  the envelope's JSON 404 (NOT_FOUND, "Unknown API endpoint") across
  GET/POST/PUT/PATCH/DELETE (a single-method route would hand POST
  /api/typo a 405 for a path that does not exist), force-dynamic for
  the api family's uniform shape. RED first (the e2e leg against the
  pre-cure build), GREEN after the route; the e2e leg covers GET on two
  unknown paths + POST.
- THE A11Y/AUDIT POLISH: the signin view's Mail/Lock input icons gained
  aria-hidden="true" (S15-4 — the file's only two stragglers; every
  sibling view carried it); the mobile hamburger gained the house
  keyboard focus ring (S15-8 — focus-visible:outline-none ring-2
  ring-SLATE-300: the house ring-ring #0f172a is invisible on the dark
  navbar, slate-300 is the toggle's OWN ink per the reference's own
  class; keyboard-only visibility, the reference's base classes
  untouched); the Escape e2e leg gained the toBeFocused assertion
  (S15-9 — the focus return is now behavioral, not just source-pinned).
- THE DEPENDENCY HYGIENE (S15-3): prisma moved to devDependencies (the
  runtime import is @prisma/client; the CLI is a dev/build duty — the
  audit graph now honest); eslint-config-next 16.4.2 → 16.4.6 (targeted,
  lint+tsc re-verified); the nested zod@4.6.5 under eslint-plugin-
  react-hooks retired via the resolutions pin (zod: 4.6.7 — the
  lockfile's stale nested entry deduped away, the stale physical copy
  pruned) — bun audit 10 → 9 advisories, ALL dev-toolchain (minimatch/
  eslint lint-time, deepmerge-ts/prisma-CLI build-time, vite/launch-
  editor test-runner; zero runtime request-path exposure).
- THE DEFERRALS (documented in the PAD §11 register with evidence):
  S15-5 the logout CSRF nuisance (a cross-site page can force a logout
  — Set-Cookie clears regardless of SameSite sending rules; nuisance
  only; an Origin check risks breaking self-hosted proxy topologies
  where Origin ≠ Host) and S15-6 the eslint off-switches (dry-run
  evidence: exhaustive-deps surfaces exactly 2 flags, both
  particle-text's deliberate texts.join("|") stability idiom;
  re-enabling requires restructuring that idiom first).
- THE VERIFICATION: lint 0/0 · tsc 0 · unit 543/543 (37 files, +5: the
  S15-1 sibling pin, +2 the S15-2 vocabulary pins, +1 the S15-4 icon
  pin, +1 the S15-8 ring pin) · build · smoke 15/15 · e2e 56/56 (+1
  the api-envelope 404 leg; the S15-9 focus assertion strengthened an
  existing leg) · census MATCH · the reality census re-anchored FIRST
  (the constants 538→543, 55→56; the PAD §12 inventory rows: navbar
  174→179 + the new api-catch-all row).
- THE DOCS LOCKSTEP: README (badge 599 = 543+56, the architecture +
  testing counts, the API table's catch-all row, the session-15 status
  row, the gate line) · AGENTS (counts, the plans map's fifteenth
  round) · CLAUDE (counts) · PAD (§8 test distribution + §8.3 + §11's
  two deferral rows + §12's inventory) · the SKILL v1.10.0 → v1.11.0
  (frontmatter, the §11 checklist counts, Appendix A's session-15 row,
  Appendix B re-certified through session 15) · this worklog Task 15 ·
  the session-15 plan's execution record.
- SHIPPED: the remediated tree + the six docs in lockstep + the plan
  doc (docs/plans/2026-11-10-session15-resend-p2025-sibling-null-body-
  vocabulary-and-api-envelope-404.md) + captures 37/38, committed to
  main and pushed via docs/ssh_git_wrapper_v3.py

Task ID: 14
Agent: main (Z.ai)
Task: The session-14 from_url escape closure + resend equalizer +
UX-boundary round — re-run the standing instruction against the
post-session-13 tree (acec9aa): docs review, pristine-clone verification
(the full baseline gate green at the documented 528/37 + 54/9 + 15
counts — MATCH; one fresh-sandbox gap: the Playwright browser binaries
needed `bunx playwright install chromium`, an environment note, not a
code defect), the comprehensive audit (0 Critical / 1 High / 3 Medium /
4 Low / 3 Informational; every load-bearing finding hand-verified in
source; the audit's H-1 re-attributed to the RECORDED S13-1 posture —
warn, never fatal, the session-13 decision stands), the neo-crm repo
re-review (HEAD b3d0fbe — UNCHANGED since session 12's review; its
adoption and deferral decisions stand), the live reference parity walk
(logged-in: /Home, the mobile menu at 390x844 — 5 destinations,
auto-close, the no-aria hamburger, /Tool's hard-nav title + OG family —
NO drift since session 13) + the clone's dev-server walk (hydration
clean, the menu open/close, Escape WITH the focus return, navigate +
auto-close, the from_url round-trip + the foreign-origin fallback — and
the protocol-relative escape LIVE-CONFIRMED pre-cure: the sign-in at
/login?from_url=http://127.0.0.1:3000//evil.com?x=1 landed the browser
on https://evil.com/?x=1), the TDD cures, the mutation batteries (9),
the gate, captures 35/36, push #14 to main via the SSH wrapper.

Work Log:
- THE FROM_URL PROTOCOL-RELATIVE ESCAPE (S14-1, HIGH — live-verified):
  a same-origin ABSOLUTE from_url whose path starts with "//"
  (http://host//evil.com?x=1) passed the session-13 seam's origin check
  (the url IS same-origin) but the returned "//evil.com?x=1" is
  protocol-relative AT THE ROUTER — the live repro on the clone's dev
  server signed in and landed the browser on https://evil.com/?x=1.
  The existing pins covered the RAW "//evil" input (a different shape)
  but not the same-origin-absolute-with-//-path form. CURED by TDD: the
  leading-// pathname arm (backslash paths normalize to "//" in the URL
  parser and hit the same arm; a backslash DIRECTLY after the host
  normalizes to a SAFE single-slash path — pinned as such; an INNER //
  ("/a//b") stays a plain same-origin path — the control pin) + 3
  behavioral pins + the e2e leg (the mirror of the live repro). MUTATION
  BATTERY: killing the arm REDs exactly the 2 escape pins -> restored
- THE RESEND/VERIFY NO-ENUMERATION EQUALIZER (S14-2, MED): resend's
  no-op branch (unknown OR already-verified email) returned
  {resent, message} with NO verificationCode key while the
  known-unverified branch returned {resent, message, verificationCode}
  — the key's PRESENCE distinguished known-unverified emails even in
  the production knob-off posture (signup's duplicate-email 400 can
  only reveal "exists", never "unverified"), and both routes answered
  the miss branch immediately while the known branch burned a scrypt —
  a timing oracle on the same state. CURED by TDD: the uniform shape
  (the no-op branch ships verificationCode: null) + one scrypt burned
  on every miss branch (resend: hashVerificationCode on the module-const
  equalizer input; verify: verifyVerificationCode(code,
  timingEqualizerHash()) — login's exact S72-C shape). Unlike
  forgot-password's documented residual (where the known branch has NO
  scrypt and a naive burn would INVERT the signal), these routes' known
  branches ALREADY burn scrypt — the equalizer burn equalizes, never
  inverts. MUTATION BATTERIES: un-shaping REDs the shape pin; removing
  either burn REDs exactly its pin -> restored
- THE GUESTS-ALLOWED WIRING PIN (S14-3): the generate route's
  requireSession call read like an auth wall but its 401 branch was
  dead code — anonymous generation is BY DESIGN (ADR-003), the session
  read only SELECTS the limiter bucket. CURED: the intent comment (the
  guard never rejects; user degrades to null for the IP bucket) + the
  api-robustness wiring pin (the null-fallback face pinned; a planted
  401 wall REDs it). MUTATION BATTERY: planting the wall REDs the pin
- THE PASSWORD CEILING SYMMETRY (S14-4): signup's shared passwordSchema
  had NO max while reset capped at 200 — a 201+ char password set at
  signup (the 16KB body cap allowed it) could never be REPLACED at
  reset (the reset form dead-ended while the old password still
  verified). CURED by TDD: the shared schema gains the 200-char max
  with reset's own message; login's password stays unbounded (the
  tolerant posture). MUTATION BATTERY: dropping the max REDs the pin
- THE INFOCALLOUT POLITE ROLE (S14-5): the green resend confirmation
  used the assertive role="alert" — the house doctrine reserves it for
  errors (the toast family's F11-17 rule). CURED: role="status" + the
  login-views pin re-anchored (alert 2->1, status pinned at 1). ONE
  iteration: the component's cure comment first quoted both role
  literals, which the RAW-source pin would have double-counted — the
  comment now describes the doctrine without quoting the attributes.
  MUTATION BATTERY: the revert REDs the pin -> restored
- THE TOAST DISMISS FOCUS RING (S14-6): the dismiss control was
  hover-only — no visible keyboard focus on the ONE control each toast
  carries. CURED: the OTP inputs' own focus-visible family
  (focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-ring) + the toast-anatomy pin. MUTATION BATTERY:
  stripping the arm REDs the pin -> restored
- THE REDUCED-MOTION INCLUSIVE BOUNDARY (S14-7): the swap boundary used
  a strict > on an exactly-on-schedule timer — an on-time arrival
  (measure-zero but real) missed the swap and held the phrase a second
  full window (the S13-3 symptom recurring at the boundary). CURED: the
  inclusive >= + the effects-motion boundary pin. MUTATION BATTERY: the
  revert REDs the pin -> restored
- THE DEPTH-0 AVAILABILITY NOTE (S14-8): the shared-bucket tradeoff at
  VIRALPOST_PROXY_HOPS=0 was documented (code comment + .env.example)
  but the availability side — the whole deployment shares one per-route
  ceiling (10 logins/15 min for ALL users combined) — was not stated
  where the operator acts. CURED: the DEPLOYMENT.md hops-row one-liner
  (depth 0 suits single-user/test; multi-user direct exposure should
  front the app with a proxy and declare depth 1)
- DEFERRED (documented in the plan): S14-9 (the signup count-derived
  role race — unreachable in the seeded shape), S14-10 (the reveal SSR
  opacity-0 — the reference's own posture), S14-11 (the delivery
  polarity — the RECORDED S13-1 residual: warn, never fatal)
- LOCKSTEP: unit 538/37 files (+10: +3 from-url, +3 auth-contract,
  +1 api-robustness, +1 schemas, +1 toast-anatomy, +1 effects-motion),
  e2e 55/9 specs (+1), badge 593 = 538+55; README (badge, architecture
  table, testing section, the session-14 status row, the gate line);
  AGENTS (counts, the plans map's fourteenth round); CLAUDE; PAD (§8
  test distribution, §12 re-anchor: from-url 26->36, password 67->68,
  particle-text 311->315); the SKILL v1.9.0 -> v1.10.0 (frontmatter,
  §11 checklist, Appendix A session-14 row, Appendix B re-certification
  + the session-14 re-walk); DEPLOYMENT.md (the hops row); worklog Task
  14; the plan's execution record

Result: gate GREEN at the session-14 ship — lint 0/0, tsc 0, unit
538/538 (37 files), build, smoke 15/15, e2e 55/55 (9 specs), census
MATCH; 9 mutation batteries; captures 35/36 PIL-verified; pushed to
main via the SSH wrapper (dry-run first, key shredded after).


Task ID: 13
Agent: main (Z.ai)
Task: The session-13 in-app-delivery polarity warning + OTP log gate +
from_url seam round — re-run the standing instruction against the
post-session-12 tree (5f22be0): docs review, pristine-clone verification
(the full baseline gate green at the documented 507/36 + 52/9 + 15
counts — MATCH, no fresh-sandbox gaps this round), the comprehensive
audit (0 Critical / 1 High / 1 Medium / 3 Low / 6 Informational, every
load-bearing finding hand-verified in source), the neo-crm repo re-review
(HEAD b3d0fbe — UNCHANGED since session 12's review; its adoption and
deferral decisions stand), the live reference parity walk (logged-in:
/Home, the mobile menu at 390x844 — 5 destinations, auto-close, the
no-aria hamburger, /Tool's hard-nav title + OG family — NO drift since
session 12) + the clone's dev-server walk (hydration clean, the menu
open/close, Escape WITH the focus return — focusIsToggle verified,
navigate + auto-close, the from_url round-trip BOTH directions), the TDD
cures, the mutation batteries (7), the gate, captures 33/34, push #13 to
main via the SSH wrapper.

Work Log:
- THE DELIVERY-POLARITY BOOT WARNING (S13-1, HIGH — the audit's first
  High since session 9): both in-app delivery kill-switches ship ""
  (ENABLED) in .env.example — a default-configured PRODUCTION deploy
  returns a LIVE reset link for any known email (forgot-password ->
  resetUrl) and a fresh OTP for any unverified account (resend -> the
  code; verify then signs in). The boot gate already warned for the
  strictly-less-dangerous unset-hops hazard (F9-1) but not these. CURED
  by TDD: the per-knob production warning (unset or empty), mirroring
  the hops precedent exactly — warn, never fatal (the mail-less demo
  posture is a legitimate deployment); the off-vocabulary values stay
  owned by the off-vocab arm (one-owner doctrine). The env() test
  builder now carries both knobs at "1" (the healthy-production
  declares-delivery posture, the session-9 hops precedent). MUTATION
  BATTERY: killing the arm REDs exactly the 3 warning pins -> restored
- THE OTP LOG GATE (S13-2, MED): signup/resend logged the live
  verification code to server stdout UNCONDITIONALLY — with
  VIRALPOST_DISABLE_IN_APP_OTP=1 (a real mail transport owns delivery)
  every user's OTP still landed in the logs (the skill's "secrets never
  in logs" line; the route's own comment documented the gap as intended
  behavior). CURED by TDD: the console.info rides the SAME
  inAppOtpEnabled gate as the response payload — the demo posture keeps
  its log AND payload together; the mail-transport posture writes no
  codes to stdout. The PAD's "documented demo exception" prose
  re-anchored. MUTATION BATTERY: un-gating one route REDs exactly its
  pin -> restored
- THE FROM_URL SEAM (S13-4): the open-redirect resolver lived
  module-private in login-card.tsx reading window.location.origin
  inline — ZERO behavioral coverage (source regex pins only; a
  regression in its logic passed the whole gate; live-verified in this
  round's walk first). CURED by TDD: the pure seam src/lib/from-url.ts
  (resolveFromUrl(raw, origin) — origin a parameter, no DOM access) +
  8 behavioral pins (same-origin relative, path+search, the reference's
  own ABSOLUTE auth-wall form, foreign origin, the protocol-relative //
  bypass, foreign schemes, malformed, empty/bare-origin); the card
  wiring pinned (both call sites pass window.location.origin); the
  login-views pins re-anchored in the same commit (the card-level
  origin-comparison pin -> the wiring pin; the F12-4 pin re-anchored to
  the verify submit's own site — the both-sites face now owned by the
  session-147 pin, one-owner). PLUS 2 e2e legs in auth.spec: the
  /login?from_url=/Tool round-trip (lands /Tool + the title) and the
  foreign-origin fallback (lands /). One census iteration: the
  design-tokens step-less census flagged the from-url MODULE PATH as a
  from-<word> "utility" — "url" joined the documented NON_COLOR
  English-fragment set (the from-scratch precedent). MUTATION BATTERY:
  killing the origin check REDs exactly the 3 guard pins -> restored
- THE MOTION CADENCE CURE (S13-3): the particle title's reduced-motion
  branch drew BEFORE advancing — every timer fire painted the phrase
  about to retire (the first phrase held ~2x its window; each swap one
  frame late). CURED: advance-then-draw (each phrase exactly one
  window), source-pinned on the branch's internal order. MUTATION
  BATTERY: the revert REDs the pin -> restored
- THE VERIFY P2025 MAPPING (S13-5): a row vanishing between the
  findUnique and either update threw P2025 into the generic catch — a
  raw 500 where the no-pending-code branch answers the 400
  VERIFICATION_INVALID (the forgot-password route's own known-error
  doctrine, its :117). CURED by TDD: the catch maps P2025 -> the 400
  envelope. Unreachable today (no user-delete surface) — the doctrine
  gap, not a live defect. MUTATION BATTERY: removing the branch REDs
  the pin -> restored
- THE FONT-FAMILY HOIST (S13-7): both font-fit loops re-read
  getComputedStyle(document.body).fontFamily per shrink iteration (up
  to ~42 redundant computed-style reads per rasterize, per undebounced
  resize). CURED: one read per draw call, outside both loops,
  source-pinned. MUTATION BATTERY: reverting one hoist REDs the pin ->
  restored
- THE CENSUS FORMS-GUARD (S13-10): the reality census counts it(/test(
  source blocks — a registration form the regex cannot see (.each(
  registers N per block; .skip(/.only( change what runs; .todo(
  neither) would decouple the constants from the runner's executed
  count (the badge-drift genus one notch deeper). NEW census arm: no
  uncountable registration form in any unit suite or e2e spec
  (comment-stripped). Zero live instances at birth (verified before the
  pin landed). MUTATION BATTERY: a planted .skip( in a scratch test
  file REDs the guard (+ the SUITES/UNIT censuses — the scratch file
  itself) -> removed -> GREEN
- THE LOCKSTEP: unit 528/37 files (+21: +6 boot-env, +3 auth-contract,
  +2 effects-motion, +8 from-url, +1 docs-counts), e2e 54/9 specs
  (+2), badge 582 = 528+54; README (badge, architecture table, testing
  section, file tree, the session-13 status row, the gate line, the
  env-table guidance); AGENTS (counts, the plans map's thirteenth
  round); CLAUDE (counts + the env row); PAD (§12 re-anchor + the new
  from-url row, the delivery-polarity security row, the secrets-in-logs
  prose re-anchor); the SKILL v1.8.0 -> v1.9.0 (frontmatter, §11,
  Appendix A session-13 row, Appendix B re-certification); .env.example
  (the production-warning guidance); worklog Task 13; this record
- bun audit RUN (the periodic duty): the same advisory set as sessions
  11-12 (all dev/test/build toolchain; the direct runtime zod patched
  at 4.6.7 — no override warranted)

Stage Summary:
- THE POLARITY ROUND: the audit's first High since session 9 — the
  delivery family's default-ON posture now WARNS at boot in production
  (the live-token-in-response hazard, the unset-hops precedent
  extended), the OTP log rides the delivery gate, and the from_url
  open-redirect guard got its first behavioral coverage (the seam + 8
  pins + 2 e2e legs, both directions live-verified before the cure)
- THE VERIFICATION: lint 0/0 · tsc 0 · unit 528/528 (37 files, +21) ·
  build · smoke 15/15 · e2e 54/54 (9 specs, +2) · census MATCH; 7
  mutation batteries (every new pin proven non-vacuous); the reference
  walk found NO drift (title/OG/canonical/mobile menu); captures 33/34
  PIL-verified
- SHIPPED: the remediated codebase committed to main and pushed via
  docs/ssh_git_wrapper_v3.py (the remote verified; no new branches)

Task ID: 12
Agent: main (Z.ai)
Task: The session-12 count-reality census + reset-funnel e2e + UX-boundary
batch round — re-run the standing instruction against the post-session-11
tree (0de6e1a): docs review, pristine-clone verification (the full
baseline gate green at the documented 488/34 + 50/8 + 15 counts, after
the cp .env.example .env + db:push/db:seed + the Playwright chromium
install — the fresh-sandbox gap, not a code defect), the comprehensive
audit (0 Critical / 0 High / 2 Medium / 8 Low / 7 Informational, every
load-bearing finding hand-verified), the neo-crm repo re-review (HEAD
b3d0fbe, session-217-era — the semantic-prose census family + the
one-owner doctrine ADOPTED scoped; the count-ladder scripts,
probe:ref, and the pixel sweep gates DEFERRED with reasons), the live
reference parity walk (logged-in: /Home, the mobile menu at 390x844 —
5 destinations, auto-close, the no-aria hamburger, /Tool's hard-nav
title + OG family — NO drift since session 11) + the clone's
dev-server menu walk (open/close, Escape WITH the focus return,
navigate + auto-close), the TDD cures, the mutation batteries (6), the
gate, captures 31/32, push #12 to main via the SSH wrapper.

Work Log:
- THE REALITY CENSUS (F12-1, MED — the audit's first Medium): the
  docs-counts constants were pinned to doc SITES, never to test
  reality — a test added without bumping UNIT left every doc stale
  while the gate stayed green (the badge-drift genus the suite's own
  header claimed to have retired; three prior recurrences). CURED by
  TDD: the constants now count the LIVE SUITES ON DISK (suite files +
  it/test blocks regex-counted; the e2e total = source test() blocks
  with the a11y spec's width-loop expansion COMPUTED from the
  extracted tests/e2e/a11y-matrix.ts — the pure-data module both the
  spec and the census import — plus the width-loop-stays-a11y-only
  guard). MUTATION BATTERY: a scratch test file REDs the census
  (37 files vs SUITES 36), removal restores GREEN
- THE RESET-FUNNEL E2E (F12-2, MED — the audit's second Medium): the
  password-reset funnel had ZERO behavioral coverage (no spec
  navigated /reset-password?token=…; the reset API was pinned only by
  source regexes) while its verification sibling got the full e2e at
  session 11. NEW tests/e2e/reset-funnel.spec.ts (3 tests): signup →
  verify (the in-app hint) → forgot → the sent view's
  "Open your password reset link" → the set-new-password form → sign
  in with the NEW password → /api/auth/me → the SAME-TOKEN REPLAY →
  400; plus the invalid-link state (no token → the designed card).
  One iteration: the link is RELATIVE, so the replay's URL parse
  carries a dummy base. Rate budget: 1 signup / 1 verify / 1 forgot /
  2 resets / 1 login per run — every bucket ≤ 20% of its wall
- THE UX-BOUNDARY BATCH (F12-3/F12-4/F12-6/F12-10 — all audit Lows,
  all live-traced): the 403 re-entry now CLEARS the stale demo-code
  hint (a hint minted for a previous email/code used to render as
  "Demo code: …" for the newly-entered email — the route returns no
  code on the 403); BOTH authed submits honor from_url (the verify
  submit's bare "/" retired — a guest sent to /login?from_url=/Tool
  who completed signup→verification now lands back on /Tool; the
  s145 pin re-anchored in the same commit); the OTP paste takes the
  TRAILING six digits through the new pure seam src/lib/otp.ts (a
  paste into a filled box used to shift right and drop the last
  digit — mutation-batteried: the naive form REDs exactly the 2
  trailing-window pins); the expired-code 400 answers the NEW
  verificationInvalidMessage() ("This verification code is no longer
  valid. Please request a new one." — the lockout copy used to tell a
  user who never failed once that they had failed five times; the 429
  VERIFICATION_LOCKED keeps the attempts copy, pinned both ways)
- THE EFFECTS HYGIENE (F12-8/F12-9): the particle title's
  reduced-motion branch now DRAWS ONCE and schedules the phrase swap
  by setTimeout (the old shape kept a 60 fps rAF loop redrawing
  identical static text all day — the reduced intent is LESS motion;
  the timer is cleared on dispose, pinned); the WebGL hero re-reads
  devicePixelRatio INSIDE resize() (the boot-time capture rendered a
  cross-monitor move at the stale DPR until remount). Both
  source-pinned comment-stripped (the needle-in-own-doc lesson bit
  THREE times this round — the cure comments name the retired APIs)
- THE CENSUS + RETIREMENT SWEEP: the stepped-semantic census arm
  (F12-7 — a text-success-500-shaped class escapes BOTH existing
  censuses: the stepped one exempts semantic families, the step-less
  one can't see the numeric step; zero live instances, planted-defect
  proof: a scratch text-success-500 REDs it); hero's dead React
  import; ERR.FORBIDDEN/NOT_FOUND (zero call sites); the
  verification-server generateVerifyCode re-export ("for any
  stragglers" — zero importers); the Logo → next/link (the last raw
  internal anchor — a full document load + the 308 hop); the
  duplicate verification assertion dedup (F12-14 — two tests with
  identical bodies proved nothing the first didn't)
- THE DOC SWEEP (F12-5 + the neo-crm adoptions): the PAD's stale
  tw-animate references retired (ADR-005's Decision + the file tree
  described the session-11-deleted file as LIVE architecture for a
  full session) + the "409+" prose cured; THE SEMANTIC-PROSE CENSUS
  STARTER adopted from neo-crm's s208–s217 family (negative pins: the
  PAD carries no tw-animate/vendor/409+ forms; the README quickstart
  keeps the cp .env.example .env line BEFORE the first db command —
  the fresh-clone leg; AGENTS carries the one-owner doctrine);
  AGENTS's mutation-battery convention gained the ONE-OWNER rule
  (each live face owned by EXACTLY ONE pin; co-pinned faces
  documented in the pin's comment). DEFERRED with notes: the
  count-ladder scripts (the reality census centralizes the
  constants), probe:ref + the pixel sweep gates (the gate stays
  offline-runnable), A-14 (the resend double-mint race — inherent,
  retry heals), A-11 (the lint-disable posture — tsc strict is the
  gate)
- bun audit RUN (the periodic duty): 10 advisories (4 high, 5
  moderate, 1 low) — the SAME set as session 11's triage, ALL
  dev/test/build toolchain (minimatch under eslint, deepmerge-ts
  under the prisma CLI, the vite family under vitest, the
  NESTED zod <4.6.6 under eslint-plugin-react-hooks — the direct
  runtime zod is the patched 4.6.7, source-map-js under postcss);
  zero runtime request-path advisories; no override warranted

Result:
- Gate: lint 0/0 · tsc 0 · unit 507/507 (36 files, +19) · build ·
  smoke 15/15 · e2e 52/52 (9 specs, +2) · census MATCH
- Badge 559 = 507 + 52; captures 31/32 (dev server via 127.0.0.1,
  hydration awaited + PIL-verified: 100.0%/99.9% non-white, the
  menu-open strip 99.1% dark, 3105 amber + 7370 teal content pixels);
  SKILL v1.8.0
- Verified: all six mutation batteries (the scratch-file census RED,
  the naive-OTP RED, the planted stepped-semantic class RED, the
  verify-route message revert RED, the login-card cure reverts RED,
  the effects cure reverts RED — each restored to GREEN); the
  reset-funnel e2e green end-to-end including the single-use replay;
  the reference re-walked live (no drift); the clone's dev-server
  menu walk (Escape focus return live-verified via
  activeElement/aria-expanded/panelHidden evals). Reasoned: the
  reduced-motion timer behavior (source-pinned, not
  AT/motion-profile-tested). Assumed: none
- Deferred debt: F11-14 (the landing's inline PricingSection markup),
  F10-14 (the particle reduced-motion rAF — NOW CURED at F12-8),
  A-14 (the resend double-mint race), the neo-crm
  drift-sweep/dead-code-hygiene/count-ladder families, probe:ref

====================================================================

Task ID: 11
Agent: main (Z.ai)
Task: The session-11 standalone-launch DB re-anchor + dead-CSS
retirement + verification-funnel closure round — re-run the standing
instruction against the post-session-10 tree (b1424f3): docs review,
pristine-clone verification (the full baseline gate green at the
documented 463/32 + 49/8 + 15 counts), the comprehensive audit (0
Critical / 0 High / 3 Medium / 10 Low / 4 Informational + F11-18 found
via the neo-crm re-review), the neo-crm patterns re-review (the s212
db-path cure + the gate-script/doctrine/inventory censuses + the
mutation-battery discipline + the bun audit duty ADOPTED), the live
reference parity walk (logged-in: /Home redirect, the mobile menu at
390x844 — 5 destinations, no-aria hamburger, the dead-/98 transparent
panel, auto-close on navigation, the stale-title soft-nav, the OG
family — NO drift since session 10), the TDD cures, the gate, captures
29/30, push #11 to main via the SSH wrapper.

Work Log:
- THE HEADLINE (F11-18 — live, reproduced, root-caused): `bun run
  start` with the default relative .env could NOT open the database.
  Mechanism: bun loads <repo>/.env at launch and ABSOLUTIZES the
  relative file: value against the repo root (parent-of-repo path);
  the standalone server.js chdirs into .next/standalone; the
  session-34 launch-dir recovery sat NESTED inside
  `isRelativeFileUrl(envFileUrl)` — a guard requiring a .env at the
  post-chdir cwd, exactly the file the session-7 build hygiene step
  (`rm -f .next/standalone/.env`) deletes — so the recovery was dead
  code in the launch shape it was written for and the parent-of-repo
  URL passed through as an "intentional override" (Error code 14 on a
  clean machine; a SILENT EMPTY WRONG db where the parent db/ exists).
  The smoke ladder and e2e never saw it (both pin their own
  DATABASE_URL). This is neo-crm's session-212 defect class; their fix
  is the cure. CURED by TDD (+2 hygiene-shape pins): the launch-dir
  signature check HOISTED out of the cwd-.env guard (the session-35
  absolute-value guard preserved), mutation-batteried (revert -> RED ->
  restore -> GREEN), and LIVE A/B verified: the same boot now answers
  {"ok":true,"db":"up"} and holds <repo>/db/custom.db open
  (fd-verified via /proc); the parent-of-repo db never created
- THE TAILWIND v4 BUGS THIS ROUND (F11-1 + F11-2 + F11-5): (1)
  `border border-input` on the verify-view OTP inputs compiled to
  NOTHING — Tailwind v4 generates no utility for an undefined
  --color-input, and the session-10 color census only enumerated
  family-STEP utilities so single-word semantic utilities escaped the
  "every color utility resolves to a @theme literal" invariant. CURED:
  --color-input: #e2e8f0 (the value the class always rendered via the
  base-layer fallback) + THE STEP-LESS CENSUS PIN. (2) The vendored
  tw-animate.css shipped dead @keyframes/@property bytes in every
  build on the phantom "the Radix dialog family rides it" claim (no
  Radix since the session-2 diet; the consumers retired at s131). (3)
  13 dead @theme tokens + the fade-in/reveal keyframes + the
  input-base/scrollbar-thin utilities + components.json — all
  zero-consumer. ALL RETIRED + THE DEAD-TOKEN CENSUS PIN (every
  semantic token must have a live consumer; the built CSS now carries
  no enter/exit/accordion-down keyframes)
- THE VERIFICATION-FUNNEL CLOSURE (F11-3 + F11-4): email verification
  was ADVISORY — once the 15-minute code TTL passed, a never-verified
  account signed in freely (the login gate keyed only on
  isVerificationPending), and the return-visitor had no path back to
  the verify view (the 403 rendered a banner on the signin form; the
  signup route answers "already exists"; resend was wired only inside
  the verify view — the only escape was waiting out the TTL, which the
  advisory gate then let bypass). CURED by TDD (+4 unit pins on the new
  unverifiedAccount() seam + 4 source pins + THE FULL-FUNNEL e2e):
  the login gate keys on the STORED HASH (any expiry); resend re-mints
  for any unverified account (the resend IS the re-arm); the login
  card swaps to the verify view on the 403; the pasted code
  distributes across the six boxes (F11-15); the funnel e2e proves
  signup -> refused login -> verify view -> resend -> code -> session
- THE CONSISTENCY BATCH: F11-13 the signup findUnique->create race now
  maps P2002 to the 400 duplicate (the reset-password route's Prisma
  pattern); F11-7 an over-length idea answers the shorter-message (the
  Zod max used to answer "Describe your post idea first." for a
  >1000-char paste); F11-12 the in-flight double-submit guard on all
  four login-card submits; F11-17 error toasts announce with
  role="alert"; F11-11 the menu a11y increments (aria-controls + the
  panel id + the Escape focus return — the standing-concern surface);
  F11-6 the auth-contract uploadRoute phantom retired
- THE NEO-CRM ADOPTIONS: the s212 db-path cure (the headline); the
  gate-script pins (the gate chain order + the CI=1 fresh boot +
  the build hygiene tail, mutation-batteried); the doctrine census
  (every AGENTS Commands-table command exists in package.json, read
  LIVE — the start/test:watch/db:generate rows added); the PAD §12
  inventory census (every Key Files row pinned to the live wc -l —
  F11-8's 9 drifted rows re-anchored); the mutation-battery convention
  (every new pin ships with a planted-defect proof) + the bun audit
  duty documented in AGENTS. bun audit RUN: 10 advisories, ALL
  dev/test/build toolchain (the runtime zod is the patched 4.6.7 and
  the bounded reader pre-gates every Zod input); zero runtime
  request-path advisories; no override warranted. DEFERRED with note:
  the screenshot drift-sweep family, the dead-code-hygiene suite, the
  count-ladder scripts (heavier than this round's scope)
- THE DOC SWEEP: F11-9 the SKILL's "2-3 idea-derived hashtags" -> "up
  to 2" (the code caps at 2); F11-10 the PAD's lint line qualified
  (exhaustive-deps/purity deliberately off — the SKILL's honest form);
  the SKILL v1.6.0 -> v1.7.0 (§3 the DATABASE_URL launch note, §4 the
  token block + the tw-animate retirement, §6 the verification seam);
  full count lockstep at 488/34 + 50/8 + badge 538

Result:
- Gate: lint 0/0 · tsc 0 · unit 488/488 (34 files, +25) · build ·
  smoke 15/15 · e2e 50/50 (8 specs, +1 the funnel) · census MATCH
- Badge 538 = 488 + 50; captures 29/30 (dev server via 127.0.0.1, the
  hydration explicitly awaited + PIL-verified); SKILL v1.7.0
- Verified: the F11-18 cure live (health ok + the repo db open via
  /proc fd); the funnel e2e green; the built CSS free of the retired
  keyframes; the censuses green. Reasoned: the a11y focus-return
  behavior (source-pinned + axe-clean, not AT-tested). Assumed: none.
- Deferred debt: F11-14 (the landing's inline PricingSection markup),
  the neo-crm drift-sweep/dead-code-hygiene/count-ladder families,
  F10-14 (the particle-text reduced-motion rAF — standing).

====================================================================

Task ID: 10
Agent: main (Z.ai)
Task: The session-10 dev-origin hydration lock + palette re-pin
completion + phantom-reference tail round — re-run the standing
instruction against the post-session-9 tree (b325ef9): docs review,
pristine-clone verification (the full baseline gate green at the
documented counts after installing the Playwright chromium the fresh
sandbox lacked), the comprehensive audit (web-application dimensions;
every load-bearing finding hand-verified before planning), the neo-crm
tech-stack-patterns re-review (nothing new to adopt — the docs-counts
gate was session 9's adoption; its s213-217 semantic-prose censuses
carry nothing transferable), the live reference parity walk (logged-in:
the mobile menu at 390x844, /Dashboard, the OG family — no drift since
session 9), the clone-side dev walk, the TDD cures, the gate, dev-server
captures 27/28, push #10 to main via the SSH wrapper.

Work Log:
- THE HEADLINE FINDING (F10-17, HIGH — live, reproduced, root-caused):
  the dev server opened at http://127.0.0.1:3000 NEVER HYDRATES. Next
  16's blockCrossSiteDEV (default allowlist: localhost + subdomains +
  the start hostname) rejects the HMR WebSocket upgrade from the
  127.0.0.1 origin with a bare "Unauthorized" body — not even a status
  line (Chromium logs ERR_INVALID_HTTP_RESPONSE) — while the page's
  HTML/chunks/CSS all load (same-origin sec-fetch passes), so the page
  LOOKS fine while the Turbopack dev client silently never boots and
  React never attaches: the mobile menu and EVERY client island (the
  generator, the login form, the toasts) render as inert SSR with ZERO
  console errors. Root-caused by raw-socket probes (Origin
  127.0.0.1:3000 -> "Unauthorized"; Origin localhost:3000 -> clean
  101), confirmed in BOTH available browsers (agent-browser's Chrome
  156 and Playwright's chromium 1248) under BOTH `bun run dev` and
  `node next dev`; production is immune (the block is dev-only — the
  e2e suite's 5/5 mobile-navigation pins run against the standalone
  build). This is the most plausible root cause of the owner's
  standing "mobile menu must work" concern: an operator (or agent)
  opening dev via the loopback IP sees a dead menu. CURED by TDD
  (+2 RED pins, the new tests/dev-origins.test.ts):
  allowedDevOrigins: ["127.0.0.1"] in next.config.ts — Next's
  documented knob (BARE HOSTNAME entries; only the Origin's hostname
  is matched) — then verified LIVE end-to-end: the raw WS probe now
  answers 101 for the 127.0.0.1 origin, and a browser at
  127.0.0.1:3000 hydrates and opens the menu
- THE TAILWIND v4 BUG THIS ROUND (F10-1, MED): the v3 palette re-pin
  was INCOMPLETE — an exhaustive census (color utilities in src/ vs
  @theme literals) found 11 used-but-unpinned steps (green-50/200/700,
  emerald-200/600, blue-600/700, rose-200, red-200/700, neutral-900)
  compiling to v4's re-derived oklch palette; the oklch->sRGB
  conversions quantified the drift (green-700 v4 #008236 vs the v3
  #15803d the reference renders on the login/reset callout TEXT —
  a DOM-extracted parity surface; blue-600 #155dfc vs #2563eb on the
  login-card reset link — globals.css's OWN canonical example of the
  bug class, sat unpinned). CURED by TDD (+5 pins): all 11 steps
  pinned at the v3 hexes + THE MECHANICAL CENSUS PIN —
  design-tokens.test.ts now enumerates every color utility used in
  src/ and fails on any (family, step) without a @theme literal, so
  the "every literal pair" invariant is TESTED, not asserted (a
  future unpinned family fails `bun run test`)
- THE ROBUSTNESS CURE (F10-11, LOW): a malformed NEXT_PUBLIC_SITE_URL
  (a schemeless typo like "example.com") used to reach new URL() in
  the ROOT LAYOUT's metadataBase and throw — EVERY route 500s from
  one operator typo, the whole-site blast radius the boot gate exists
  to prevent. CURED by TDD (+6 pins): siteUrl() falls back to the
  dev default on input that does not parse as an absolute http(s)
  URL, and the boot gate warns on the malformed shape in dev AND
  production (malformed is always wrong — unlike the
  unset/localhost family, a production-posture issue)
- THE MENU-CLOSE GAP (F10-10, LOW): "closes on route change" rode
  ONLY the per-link onClick — a history back/forward navigation (no
  click) left the menu open over the new page. CURED: the navbar
  closes on ANY pathname change via the adjust-during-render
  prev-pathname pattern (the CLAUDE.md React-19 doctrine — never
  useEffect(() => setState)) + the e2e pin (open menu -> goBack ->
  closed, aria-expanded=false; e2e 48 -> 49)
- THE HONEST-CLAIM CURES: F10-13 the hashtag window exercised — the
  seeded target now varies 5-7 (the reference prompt's "5-8 relevant
  hashtags" was satisfied only at exactly 5; +1 pin over 100 seeds);
  F10-7 VERIFICATION_LOCKED's missing Retry-After documented as the
  ONE deliberate exception (that lockout lifts on RESEND, not time —
  a Retry-After value would be a lie); F10-6 DEPLOYMENT.md gained the
  first-signup-admin rule (an unseeded production DB's first verified
  signup becomes admin — seed before exposing)
- THE PHANTOM-REFERENCE TAIL (F10-3/F10-4, the s7/s8/s9 genus
  finished at the TEST layer): page-layout.ts cited a phantom
  tests/page-layout.test.ts while NOT_FOUND_LAYOUT had ZERO unit
  pins — the comment now cites the real pin home and
  login-views.test.ts gained the 404 body's class-vocabulary pins
  (+4); toast-anatomy's and type-gate's headers narrated the CRM
  scaffold's reference walks (tabs.tsx/mobile-nav.tsx/sweep.ts,
  walk22, the profile-page toast census) as THIS reference's
  evidence — both re-attributed to template-family lineage (the F8-6
  precedent), the claims restated for what actually holds here
- THE SMALLER CURES: F10-8 the highest-traffic CTAs (hero "Try the
  Tool", the PT CTA, the footer Product column) swapped raw <a> ->
  next/link (DOM-identical output, soft nav like the navbar); F10-9
  the dead dompurify override dropped (no dependency resolves it — a
  scaffold relic implying a sanitization story that doesn't exist) +
  bun install synced; F10-18 a raw NUL control byte inside
  generator.test.ts's sanitizeIdea string literal replaced with the
  \x00 escape (identical semantics; the file is portable text again —
  rg had been treating it as binary); F10-5 CLAUDE.md's
  symptom-table pointer fixed (the SKILL §10 + DEPLOYMENT §7, not
  "AGENTS and PAD §10") + the no-hydration symptom row added
- THE COUNT-LOCKSTEP GAP (F10-2, MED): three live-tense sites the
  session-9 docs-counts gate missed still carried pre-s9 numbers —
  README's file-hierarchy "29 unit suites" (its OWN table said 31:
  internally inconsistent), the PAD's file tree "29", and the SKILL
  §11 pre-ship checklist "409 unit" (the checklist that exists to
  enforce lockstep, itself stale). All three fixed AND pinned
  (docs-counts +3) — the genus is now mechanically retired at every
  live-tense site. Badge 490 -> 512 = 463 unit + 49 e2e
- THE PARITY RE-CHECK (live, logged-in on the reference — no drift
  since session 9): the login funnel; /Home's landing; the mobile
  menu at 390x844 (the same 5 destinations; the reference's panel
  computes rgba(0,0,0,0) on dark AND light pages — the dead
  bg-slate-900/98 class; our dark-panel light-page superset intact;
  the reference's hamburger still ships NO aria — our labeled
  superset holds); menu navigation + auto-close; the SPA
  stale-title-on-soft-nav (our ledgered superset); /Dashboard's
  derived title + 404 h1; the OG/Twitter family (the plain 170-char
  description). Clone-side: the dev walk green via localhost
  (routes, titles, the login/me round-trip, the generate
  round-trip); the production-build walk green via agent-browser
  (the menu opens — burger relabels "Close menu", expanded=true,
  all 5 destinations)
- THE STANDING-ITEM RE-VERIFICATION: DATABASE_URL="file:../db/custom.db"
  with db/ at the repo root (the seam + fixtures hold; census MATCH);
  the vitest + playwright configs unchanged and green; the SEO
  surface re-verified (sitemap/robots/manifest byte-parity formats,
  per-route pageMetadata, the catch-all 404 noindex);
  .env.example <-> the six-knob contract both directions
- DEFERRED/DECLINED (recorded in the plan): F10-12 ERR.FORBIDDEN/
  NOT_FOUND kept (envelope vocabulary completeness — unlike resetLive
  they document the 403/404 status family for future routes); F10-14
  the reduced-motion rAF loop deferred (particle-engine timing risk
  the e2e layer can't catch); F10-15 the toast store idiom kept (not
  persisted state — the useSyncExternalStore rule doesn't apply);
  F10-16 the build-time footer year accepted (static-site semantics);
  the Next 16.4.2->16.4.6 patch upgrade deferred (out of
  blast-radius for this round; the allowedDevOrigins cure doesn't
  need it)

Result: push #10 to main (the session-10 commit), the full gate green
on the exact commit tree: lint 0/0 · tsc 0 · unit 463/463 (32 files,
+21) · build · smoke 15/15 · e2e 49/49 (8 specs, +1) · census MATCH.
Captures 27/28 regenerated on the remediated tree (the dev-server
landing 1280x800 + the OPEN mobile menu 390x844 — via 127.0.0.1,
proving the dev-origin cure end-to-end), PIL-verified.

Task ID: 9
Agent: main (Z.ai)
Task: The session-9 rate-limiter trust warning + phantom-claim retirement
+ docs-counts gate round — re-run the standing instruction against the
post-session-8 tree (80bcb2f): docs review, fresh audit (web-application
§15/§16 + security-and-hardening + tdd, this round aimed at the
trust-default configuration class, the docs/code count-and-claim layer,
and the dead-code/dependency census), the neo-crm tech-stack-patterns
review (its docs-counts.test.ts adopted), reference parity
re-verification (logged-in walk: the mobile menu at 390×844, /Tool,
/Dashboard, the OG family), the TDD cures, the gate, dev-server captures
25/26, push #9 to main via the SSH wrapper. (The workspace was reset, so
the round organically re-ran the §15 pristine-clone verification: fresh
clone → install → cp .env.example .env → db:push → db:seed → census
MATCH → the full gate green at the documented counts, after installing
the Playwright browser the fresh sandbox lacked.)

Work Log:
- THE HEADLINE FINDING (F9-1, HIGH): VIRALPOST_PROXY_HOPS unset (the
  shipped default) means trust depth 1 — but under DIRECT exposure (the
  self-hosted quickstart's own shape) the entire x-forwarded-for header
  is client-supplied, and rotating one fake value per request mints a
  fresh limiter bucket every time: every per-IP wall (login, signup,
  resend, verify, forgot/reset, contact, generate) bypassable. The
  seam's own comment documents the hazard; the boot gate warned on bad
  values but was silent on the unset-under-direct-exposure case. CURED
  by TDD (+4 RED pins first): the production boot warning when unset
  (the NEXT_PUBLIC_SITE_URL warn precedent — never fatal; dev exempt;
  the message names the 0-for-direct-exposure fix and the proxy-chain
  alternative). The healthy-env test builder now DECLARES hops=1 —
  declaring the topology IS the healthy posture the warning teaches
- THE PHANTOM-CLAIM RETIREMENT (F9-2..F9-5, the docs/code claim layer):
  F9-2 the @theme-inline doc drift — four docs (six sites) claimed
  `@theme inline` while the code and its own design-tokens pin use
  `@theme` (inline emits no :root custom properties; @layer base
  consumes var(--color-line) etc. — "fixing" the CSS toward the docs
  would break the base layer) — all six sites cured
  F9-3 the phantom provider — GENERATOR_PROVIDER/OPENAI_API_KEY
  advertised as live knobs (generate route, generator.ts, README
  deviations, implementation-plan S-9 + three rows) while ZERO code
  reads either var — reworded to the documented WIRE-IN POINT
  (generatorPrompt() preserves the exact prompt; a future
  generator-provider.ts could slot in; no provider env is read today)
  F9-4 DEPLOYMENT.md was still ORBITAL-era — the wrong app's name,
  a 29-route/41-handler census (actual: 11/11), the RETIRED
  pre-boot-gate AUTH_SECRET semantics ("falls back to the dev
  constant" — since session-170 production fails hard at boot),
  orbital.example.com origins, a stale health shape — rewritten for
  ViralPost AI at the current facts, with the F9-1 warning
  cross-referenced
  F9-5 the phantom property-suite claim — the PAD cited "property
  tests (fast-check) on the generator contract" and rate-limit.ts
  cited tests/property.test.ts while neither existed (fast-check:
  zero imports) — the suite LANDED (15 properties: determinism, the
  5-8 hashtag window, the <200-word bound, the hook-first shape, the
  hashtag-line form, the paragraph shape, sanitize bounds; the
  fixed-window crossing, the retryAfter ceiling, remaining
  monotonicity, computeWatermark minimality) — the claim is now TRUE
  and the dependency earns its keep (one property self-inflicted bug
  caught in RED: the ceiling probe must stay strictly inside the
  window — a drift past the reset legitimately reopens the bucket)
- THE CODE CURES (F9-7..F9-9): F9-7 the reset funnel's read-path
  honesty — forgot-password's .catch(()=>null) swallowed a DB outage
  into the no-enumeration 200 and reset-password misclassified it as
  the invalid-token 400; both reads now classify P2024/P2028 as the
  503 envelope (the update path's own doctrine), and the bare
  `throw error` residuals answer ERR.INTERNAL() (the envelope is
  absolute; reset-password's own "never a bare 500" comment is now
  literal) — TDD (+2 RED pins)
  F9-8 contact/generate joined the sweep family (their key families
  never swept — unbounded bucket growth under rotating keys with zero
  auth traffic; the module comment's "13+ call sites" corrected to the
  actual census, the phantom upload-route line dropped)
  F9-9 the signup role CRM relic — non-first signups got role "rep"
  (the CRM's sales vocabulary, outside the schema's documented
  "user | admin") — now the schema's own "user" — TDD (+2 RED pins:
  the vocabulary pin + the no-"rep" absence pin)
- THE DEAD-CODE CENSUS (F9-10, with a lesson): src/types/index.ts
  (zero importers — components hand-roll their wire types) and
  resetLive (documented "escape hatch," no test ever called it)
  retired with notes; the unused tw-animate-css devDep removed via
  `bun remove` (the vendored ./vendor/tw-animate.css stays the import);
  install_packages.sh synced. extractHashtags was NOT retired — the
  type gate caught the audit's error: tests/generator.test.ts imports
  it (the audit's "zero callers" claim was wrong; kept with a
  live-caller note — the build-as-type-gate doctrine proving itself
  mid-session)
- THE ADOPTED PATTERN (F9-13, from the neo-crm tech-stack review):
  tests/docs-counts.test.ts — the neo-crm session-102 docs-counts
  gate, adopted for this repo. The badge-drift genus had recurred
  THREE times (450→455 at session 8, 455→457 caught this round)
  because the count-lockstep was prose discipline; now every
  live-tense count site (the README badge arithmetic, the suite
  counts across README/AGENTS/CLAUDE/PAD/SKILL, the six-knob env
  table, the plans census) sits under the unit gate with stale-form
  negatives — a future stale count fails `bun run test`. Badge now
  490 = 442 unit + 48 e2e
- THE STALE-COMMENT SWEEP (F9-11/F9-12): next.config's phantom
  uploads/F-170a commentary re-attributed to this repo's artifact
  hygiene (+ the uploads/** exclude dropped — no uploads dir exists);
  tsconfig's sweep.ts and .jsx-alias notes rewritten to the doctrine
  form; .gitignore's inert uploads/sweep-shots/walk5x block retired;
  db-census.test's CRM seed-count prose re-anchored to the pristine
  contract; the navbar's "animation-safe" comment now honest (the
  hidden swap makes the transitions inert — SKILL §9 item 13);
  PAD login-card "3 views"→5, the secrets/logs row gained the
  documented OTP-console nuance; README's public/ tree fixed; SKILL's
  hook-rules and FAQ claims corrected
- THE PARITY RE-CHECK (live, logged-in on the reference — no drift
  since session 8): the login funnel; /Home's landing (same nav +
  sections + generator card); the mobile menu at 390×844 (the same 5
  destinations + brand; the reference's panel computes rgba(0,0,0,0)
  on light pages — the dead /98 class; our dark-panel superset
  intact; the reference's hamburger still ships NO aria — our
  labeled superset holds); menu navigation + auto-close; fresh /Tool
  "Tool | ViralPost AI"; the SPA stale-title-on-soft-nav (our
  ledgered superset); /Dashboard derived title + 404 h1; the OG
  family (plain 170-char description). Clone-side dev-server walk
  green: burger relabels "Close menu"/expanded=true → Pricing click
  → auto-close + "Pricing | ViralPost AI"; /Tool; /Dashboard 404;
  robots/sitemap/manifest shapes
- THE STANDING-INSTRUCTION ITEMS VERIFIED ALREADY-SATISFIED:
  DATABASE_URL="file:../db/custom.db" with db/ at the repo root (the
  seam + fixture tests hold, census MATCH); the vitest + playwright
  configs healthy (442 unit / 48 e2e green against the build); the
  sitemap/robots/manifest + per-route OG surface (e2e seo specs +
  smoke legs green); .env.example ↔ the six-knob contract both
  directions
- THE CAPTURES (25/26): the dev-server landing (1280×800) and the
  open mobile menu (390×844), PIL-verified non-blank (99.7%/99.9%),
  regenerated on the remediated tree
- THE VERIFICATION: full gate on the exact commit tree — lint 0/0 ·
  tsc 0 · unit 442/442 (31 files, +33: +4 F9-1, +2 F9-9, +2 F9-7,
  +15 property, +10 docs-counts) · build · smoke 15/15 · e2e 48/48
  (8 specs) · census MATCH
- SHIPPED: the round-history lockstep (SKILL v1.5.0 with the Session
  9 row + Appendix B advanced, README's status table + gate line +
  badge, AGENTS' nine-plan map + the 442 count, CLAUDE/PAD counts) +
  captures 25/26 + the plan doc
  (docs/plans/2026-11-09-session9-rate-limiter-trust-warning-and-docs-counts-gate.md)
  + this worklog entry, committed to main and pushed via
  docs/ssh_git_wrapper_v3.py

---

Task ID: 8
Agent: main (Z.ai)
Task: The session-8 live OG-parity + evidence-provenance round — re-run
the standing instruction against the post-session-7 tree (262db32):
docs review, fresh audit (web-application §15/§16 +
security-and-hardening, this round aimed at the evidence-provenance
layer — every "live-verified/census" claim read against what THIS
repo's dossier actually observed, plus a full live re-census of the
reference's SEO surface), reference parity re-verification, the TDD
cures, the gate, dev-server captures 23/24, push #8 to main via the
SSH wrapper. (The workspace had been reset, so the round also
organically re-ran the §15 pristine-clone verification: fresh clone →
install → cp .env.example .env → db:push → db:seed → census MATCH →
lint/tsc/unit green at the documented counts.)

Work Log:
- THE HEADLINE FINDING (F8-1, HIGH, live): the reference NOW ships the
  full per-route OG/Twitter family — live census on /, /Tool, /Pricing,
  /Contact, /login (og:title mirrors the title scheme; og:description
  is the PLAIN 170-char paragraph; og:url absolute; canonical on every
  route; the twitter family mirrors; one static 1200×630 og:image; the
  PWA metas). This SUPERSEDES dossier D-4 ("no per-route canonical/OG
  beyond title tag") — whether the app updated intra-day or the
  morning DOM probe over-generalized is undetermined; live truth
  governs. The clone's inner-page OG description carried the
  CRM-family's "<Page> on <App>. " prefix (adopted under D-4) — a live
  OG-card drift. CURED by TDD: two RED pins first (the plain-description
  parity pin + the prefix-retirement absence pin), then the GREEN cure —
  pageOgDescription retired (zero external callers, the S7 api.ts
  precedent), pageMetadata ships SITE_DESCRIPTION on every route.
  Live-verified on the dev server: our /Tool head now byte-matches the
  reference's OG family (modulo the documented og-image stand-in)
- THE PHANTOM-EVIDENCE LONG TAIL (F8-2..F8-8, the S7 class applied to
  the VERIFICATION-CLAIM layer — comments asserting censuses of the
  reference that this repo never ran, all inherited from the CRM
  scaffold whose own reference was also a base44 app):
  F8-2 (MED) site.ts — the header cited phantom test files
  (tests/metadata.test.ts, tests/pwa-metadata.test.ts — neither
  exists; the real pin home is tests/page-titles.test.ts) and the
  retired serializer forms (app/sitemap.ts / app/robots.ts); the
  header + factory blocks claimed "live-verified on all 10 routes
  2026-10-01" (CRM route count, CRM date, and after F8-1 wrong about
  the description shape) — the F7-2 claim surviving in the blocks S7
  never reached; all rewritten to the live contract
  F8-3 (MED) verification.ts + verify route — "every string
  live-verified (2026-10-01, eleven wrong-code submissions across two
  throwaway signups)" contradicted by the dossier (§2: the one
  throwaway signup was platform-rejected, "success path not
  exercised") — re-attributed to the base44 platform-family
  inheritance (Reasoned); the signin banner IS live-true
  F8-4 (MED) next.config.ts + http-headers.test.ts — "three-header
  set on EVERY response (curl-verified 10+ responses, 2026-10-01)" +
  nosniff "on the same census" + CRM routes in the census list
  (/Leads /settings /Reports). Live census this round:
  referrer-policy + bare HSTS on every probed response; nosniff on
  the HTML/SSR routes ONLY (absent on sitemap.xml, robots.txt, the
  CSS asset). Ours ships all three everywhere — the documented
  superset, kept; both comment blocks rewritten to the live truth
  F8-5 (LOW) manifest/robots/sitemap routes — phantom dates + CRM
  session labels; content re-verified LIVE this round (manifest
  field-for-field through the 302→/api/apps/manifests hop — identical
  key order and values, the byte delta is the documented icon-src
  stand-in; robots byte-IDENTICAL origin-substituted; sitemap
  identical modulo route order, now noted)
  F8-6 (LOW) the auth-funnel verify-view claims (login/signup/resend
  routes, login-card.tsx, login-reset.ts, login-views.test.ts) —
  "live-verified/live-measured/live-extracted" for a view that never
  rendered on this reference (dossier-documented rejection) —
  re-attributed to Reasoned platform-family; the wrong-password
  banner re-verified LIVE this round ("Invalid email or password",
  correct login → 200)
  F8-7 (LOW) typography.test.ts — "79.5KB … 2026-10-01" → the
  session-8 re-fetch: 79,690 bytes, zero @font-face, stock stack
  (the reference's minifier leaves "Segoe UI Symbol" unquoted —
  computed-identical), no smoothing, no ::selection
  F8-8 (LOW) README badge — "450 checks" (session-2 math: 402+48)
  → 455 (407+48 at session 7; the S7 count-lockstep swept 405→407 so
  this different-number drift escaped)
- THE EVIDENCE LEDGER: dossier D-4 annotated with the session-8
  re-verification (SUPERSEDED; the live census; the cure; the
  undetermined cause) — evidence ledgers annotate, never silently
  rewrite
- THE PARITY RE-CHECK (live): the reference's mobile menu at 390×844
  walked first (closed → open: the same 5 destinations + brand), the
  clone's second (closed → open [expanded=true, the burger relabeled]
  → click-through Pricing → AUTO-CLOSE + "Pricing | ViralPost AI"
  title); /Tool (h1 + title), /Dashboard (404 + derived title + the
  message pin); our served /Tool head byte-matches the reference's OG
  family post-cure; sitemap/robots/manifest byte-diffed against the
  reference (robots IDENTICAL origin-substituted; manifest identical
  key-order/values; sitemap identical modulo route order)
- THE CAPTURES (23/24): the dev-server landing (1280×800) and the
  open mobile menu (390×844), both PIL-verified non-blank
  (99.7%/99.9%); captured on the S7-fixed dev script (stable, no
  reload loop) before the gate build
- THE VERIFICATION: full gate on the exact commit tree — lint 0/0 ·
  tsc 0 · unit 409/409 (29 files, +2 the session-8 pins) · build ·
  smoke 15/15 · e2e 48/48 (8 specs, the SEO specs green against the
  cured build) · census MATCH
- SHIPPED: the round-history lockstep (SKILL v1.4.0 with the Session
  8 row, README's status table + gate line + badge, AGENTS' eight-plan
  map + the 409 count, CLAUDE/PAD counts) + the D-4 annotation +
  captures 23/24 + the plan doc
  (docs/plans/2026-11-09-session8-live-og-parity-and-evidence-provenance.md)
  + this worklog entry, committed to main and pushed via
  docs/ssh_git_wrapper_v3.py

---

Task ID: 7
Agent: main (Z.ai)
Task: The session-7 dev-script feedback loop + phantom-comment round —
re-run the standing instruction against the post-session-6 tree (927a0b2):
docs review, fresh audit (web-application §15/§16 +
security-and-hardening, this round aimed at the src/ comment layer read
claim-by-claim against the actual tree), reference parity re-verification,
the TDD cures, the gate, dev-server captures 21/22, push #7 to main via
the SSH wrapper.

Work Log:
- The intake: the workspace pulled to 927a0b2 (the owner's session_6.md
  log on top of the prior session-6 ship 23783e5); the S6 artifacts
  verified in-tree (SKILL v1.2.0 with six round rows, captures 19/20,
  the six-plan map); baseline gates green at the documented counts
  (lint 0/0 · tsc 0 · unit 405/405 · census MATCH)
- THE HIGH FINDING (F7-0, live-diagnosed): the parity walk BLOCKED —
  the clone's mobile menu would not stay open, window markers never
  survived 3s, navType=reload repeated at ~3.3 loads/s while idle.
  Root cause: the scaffold's dev script (next dev -p 3000 2>&1 |
  tee dev.log) wrote every request log INSIDE the Turbopack-watched
  repo root → each request triggered a Fast-Refresh rebuild → a full
  page reload → more request logs — a self-sustaining feedback loop
  under any open browser tab. A/B-verified live: with the tee, the
  loop; booting next dev directly, the page held stable and the menu
  worked. Cured: the tee retired ("dev": "next dev -p 3000" —
  nothing reads dev.log; the gate boots the standalone artifact
  directly), the exact script form pinned by type-gate
  (the session-7 watch-root contract). The S4 "Fast-Refresh churn"
  lesson gains its second member: log files inside the watched root
  are loop fuel, not just build outputs
- THE PHANTOM-COMMENT LONG TAIL (F7-1..F7-5, the S4 class applied
  file-by-file to the deep comment blocks the earlier sweeps never
  reached — all inherited from the CRM scaffold at session-1's
  transform, which textually substituted NEO CRM → ViralPost AI and
  corrupted the claims' meaning):
  F7-1 (MED) src/lib/api.ts — "the family is THIRTEEN routes
  (accounts/activities/contacts/events/leads…)", "the twelve body
  routes", "asString/asDate survive on the URL-param surfaces —
  events' from/to windows, the reports/export/search parses",
  "tests/coercion-guards.test.ts, the living record" — none of those
  surfaces exist here (the real family: six parseBody auth routes +
  generate/contact route-local; body-pregate.test.ts is the living
  record); the ten-function coercion helper family had ZERO callers —
  dead code retired (~87 lines) with an accurate retirement note
  F7-2 (MED) src/lib/site.ts — pageOgDescription's comment claimed
  the reference ships per-route OG live-verified on the CRM's route
  vocabulary with a 405-char paragraph; the reference ships NO
  per-route OG at all (dossier D-4 — the clone's documented superset),
  our routes are /Tool /Pricing /Contact, SITE_DESCRIPTION is 170
  chars — re-attributed to the D-4 superset
  F7-3 (MED) src/app/not-found.tsx — the session-194 block claimed
  the reference's current build (bundle 46bc2d9c — not this
  reference's index-DwiT4li9) ships bare titles on 404s and redirects
  anon unknown-routes to /login — contradicted by this repo's own
  live-verified derived-title architecture; rewritten to the true
  mechanics (the dormant root boundary; the catch-all owns unknown
  routes)
  F7-4 (LOW) src/app/not-found-body.tsx — the walk67/CRM-session
  evidence citations re-attributed to this repo's pins (dossier §3.7,
  the e2e message pin, the a11y superset doctrine)
  F7-5 (LOW) the description's char labels — "141-char" (×3:
  page-titles.test.ts, layout.tsx, (site)/page.tsx) and "405-char"
  (×2: site.ts, manifest route) all corrected to 170 (live
  re-verified: the reference's meta description is byte-identical)
- THE TDD LEDGER: two RED pins first — body-pregate's
  coercion-family retirement pin (absence, over the api.ts source) and
  type-gate's dev-script watch-root contract (the exact script form);
  both failed against the pre-cure tree, both green after
- THE KEEP-AND-DOCUMENT FIND: the reference's SPA leaves
  document.title STALE on soft navigation (live-verified: menu-click
  → /Pricing keeps the landing's bare title for 6s+; per-route titles
  appear only on full loads); the clone's Next.js Metadata API updates
  on every navigation — the correct behavior, ledgered as a Deviations
  row (implementation-plan.md §6)
- THE DOCS-MAP CURE (F7-6, LOW): AGENTS' Key docs gains the
  historical-record layer line (neo-crm_SKILL.md — the CRM's v1.207
  skill, the session-1 input distilled into viralpost-ai_SKILL.md at
  session 2; docs/worklog.md — the CRM-era worklog; the prompt
  templates; the validation/evaluation reports) — retained provenance,
  explicitly never a current-state contract, so no future round
  re-adjudicates those files
- THE PARITY RE-CHECK (live, on the FIXED dev script): the mobile
  menu at 390×844 — closed, open (the 5 destinations + brand,
  expanded=true), click-through navigation with auto-close and the
  correct "Pricing | ViralPost AI" title — byte-matching the
  reference's walk (closed/open/navigate on the reference first, the
  clone second); /Tool (h1 + Free Tool), /login (Welcome + Continue
  with Google), /Dashboard (404 + derived title + the message pin),
  landing hero; sitemap/robots/manifest live-verified (byte formats,
  the 170-char description)
- THE CAPTURES (21/22): the dev-server landing (1280×800) and the
  open mobile menu (390×844), both PIL-verified non-blank
  (99.7%/99.9%); captured BEFORE the gate build with the open state
  verified through the nav links (both S4 capture lessons applied)
- THE VERIFICATION: full gate on the exact commit tree — lint 0/0 ·
  tsc 0 · unit 407/407 (29 files, +2 the session-7 pins) · build ·
  smoke 15/15 · e2e 48/48 (8 specs) · census MATCH
- SHIPPED: the round-history lockstep (SKILL v1.3.0 with the Session
  7 row, README's status table + gate line, AGENTS' seven-plan map +
  the historical-record layer + the 407 count, CLAUDE/PAD counts) +
  the Deviations row + captures 21/22 + the plan doc
  (docs/plans/2026-11-09-session7-devscript-feedback-loop-and-phantom-comments.md)
  + this worklog entry, committed to main and pushed via
  docs/ssh_git_wrapper_v3.py

---

Task ID: 6
Agent: main (Z.ai)
Task: The session-6 clean-tree re-certification — re-run the standing
instruction against the post-session-5 tree (194920c): docs review,
fresh audit (web-application §15/§16 + security-and-hardening) widened
to never-yet-deep-read surfaces, reference parity re-verification, the
gate, dev-server captures 19/20, push #6 to main via the SSH wrapper.

Work Log:
- The intake: the workspace pulled to 194920c (the owner's session_5.md
  log on top of the session-5 ship 3264da1); the S5 artifacts verified
  in-tree (SKILL at the session-5 ship with five round rows, the
  DEPLOYMENT knobs, captures 17/18); baseline gates green (lint 0/0 ·
  tsc 0 · unit 405/405 · census MATCH)
- THE AUDIT, WIDENED (the surfaces never yet deeply read): the
  session-1-era secondary docs (implementation-plan.md — a historical
  Stack Decision Record + Deviations Ledger with no live-state claims;
  reference-investigation.md — the clone-time evidence dossier, past
  tense throughout), the scripts/ directory (census, smoke ladder,
  prisma-env wrapper, install helper — all exercised every gate run,
  comments accurate), and the tool configs (playwright's isolation
  contract with the S3 F3-2 pins in place, vitest's S4-corrected
  surface description, package.json's gate chain)
- THE FINDINGS: ZERO — no Critical/High/Medium/Low/Info. After four
  consecutive rounds of narrowing findings (S3 guard-layer rename gaps
  → S4 comment relics → S5 docs staleness), the long tail is
  exhausted; per audit discipline, a clean tree is reported as clean
- THE PARITY RE-CHECK (live): the mobile menu at 390×844 — closed
  state, open state (the 5 destinations + brand), close-again,
  click-through navigation with menu auto-close on route change —
  byte-matching the reference; /Tool (h1 + Generate Post + 3-free),
  /login (Welcome + Continue with Google + Need an account),
  /Dashboard (404 + derived title + Page Not Found), landing (hero h1
  + Try the Tool + Upgrade to Pro) — no drift; sitemap/robots/manifest
  live-verified on the dev server (byte formats, force-static)
- THE CAPTURES (19/20): the dev-server landing (1280×800) and the open
  mobile menu (390×844), both PIL-verified non-blank (99.7%/99.9%);
  captured BEFORE the gate build (the S4 churn lesson) with the
  open-state verified through the nav links (the S4 relabel lesson)
- THE VERIFICATION: full gate on the exact commit tree — lint 0/0 ·
  tsc 0 · unit 405/405 (29 files) · build · smoke 15/15 · e2e 48/48
  (8 specs) · census MATCH
- SHIPPED: the round-history lockstep (SKILL v1.2.0 with the Session 6
  row, README's status table + gate line, AGENTS' six-plan map) +
  captures 19/20 + the plan doc
  (docs/plans/2026-11-09-session6-clean-tree-recertification.md) +
  this worklog entry, committed to main and pushed via
  docs/ssh_git_wrapper_v3.py

---

Task ID: 5
Agent: main (Z.ai)
Task: The session-5 docs-freshness audit — re-run the standing
instruction against the post-session-4 tree (b5261b5): docs review,
fresh audit (web-application §15/§16 + security-and-hardening),
reference parity re-verification, the doc-freshness cures, the gate,
dev-server captures 17/18, push #5 to main via the SSH wrapper.

Work Log:
- The intake: the workspace pulled to b5261b5 (the owner's session_4.md
  log on top of the session-4 ship 124f105); the session-4 plan +
  execution record validated against the tree (all four cures verified
  in place — the typography comment, the vitest surface description,
  e2e-port's single-consumer shape, the viralpost.example.com fixture —
  and captures 15/16 present); baseline gates green (lint 0/0 · tsc 0 ·
  unit 405/405 · census MATCH)
- THE AUDIT (web-application §15 + §16 + security-and-hardening): the
  doc set read with fresh eyes for STALENESS rather than phantom
  pointers this round; the marker/relic sweep clean (zero TODO/FIXME in
  src/; the one neo-crm mention in tests is type-gate's documented
  evaluation-report provenance); sitemap/robots/manifest verified
  unchanged (the reference's byte formats, force-static); key hygiene
  verified (no key material in tree, no /tmp residue)
- THE FINDINGS: four documentation-freshness gaps, no source defect.
  (F5-1, MED) viralpost-ai_SKILL.md's session-tracking surfaces frozen
  mid-history — project_state said "Session-3 ship", Appendix A's round
  history listed only Sessions 1–2; (F5-2, LOW) README's status table
  listed only Sessions 1–2 with the gate line labeled session-3;
  (F5-3, LOW) AGENTS' docs-map enumerated two plan docs while four
  exist; (F5-4, LOW) DEPLOYMENT.md §3's env table omitted the three
  VIRALPOST_* hardening knobs — the one contract-bearing doc without
  them, and the exact reverse-proxy audience that needs
  VIRALPOST_PROXY_HOPS (its own §2 discusses TLS-terminating proxies,
  §7 rate-limited logins)
- THE CURES: SKILL.md — Appendix A now carries Sessions 1–5, the
  frontmatter state bumped to the session-5 ship at the same counts,
  Appendix B gains the sessions-3–5 re-certification line (v1.0.0 →
  v1.1.0); README — the status table carries Sessions 1–5 and the gate
  line relabeled; AGENTS — the plans map enumerates all five rounds;
  DEPLOYMENT.md — §3 gains the three knob rows (semantics verified
  against src/lib/rate-limit.ts and the auth routes: unset = 1,
  unparsable/negative fails closed onto 1; ="1" nulls in-response
  delivery) and §7's rate-limit row cross-references the proxy-hop
  knob
- THE PARITY RE-CHECK (live): the mobile menu at 390×844 — closed
  state, open state (the 5 destinations), click-through navigation
  (/Pricing + title) — byte-matching the reference; /Tool (title, h1,
  Generate Post, 3-free), /login (Welcome card + Continue with Google),
  /Dashboard (404 + derived title + Page Not Found) — no drift
- THE CAPTURES (17/18): the dev-server landing (1280×800) and the open
  mobile menu (390×844), both PIL-verified non-blank (99.7%/99.9%);
  captured BEFORE the gate build (the S4 churn lesson) with the
  open-state verified through the nav links (the S4 relabel lesson)
- THE VERIFICATION: full gate on the exact commit tree — lint 0/0 ·
  tsc 0 · unit 405/405 (29 files) · build (clean compile, 11/11
  static pages) · smoke 15/15 · e2e 48/48 (8 specs) · census MATCH
- SHIPPED: the doc-freshness cures + captures 17/18 + the plan doc
  (docs/plans/2026-11-09-session5-docs-freshness-audit.md) + this
  worklog entry, committed to main and pushed via
  docs/ssh_git_wrapper_v3.py

---

Task ID: 4
Agent: main (Z.ai)
Task: The session-4 phantom-reference audit — re-run the standing
instruction against the post-session-3 tree (909d84c): docs review,
fresh audit (web-application + security-and-hardening), reference
parity re-verification, the commentary-relic cures, the gate, DEV-SERVER
captures (the standing ask this round), push #4 to main via the SSH
wrapper.

Work Log:
- The intake: the workspace pulled to 909d84c (the owner's session_3.md
  log on top of the session-3 ship bce6e1b); the session-3 plan +
  execution record validated against the tree (15 files, all as
  documented); baseline gates green (lint 0/0 · tsc 0 · unit 405/405)
- THE AUDIT (web-application §15 + security-and-hardening): the
  session-3 changes re-audited through edge cases (prefix
  disjointness, NODE_ENV/NEST_* non-collisions — clean); the
  error-boundary family + chunk-recovery + health + manifest surfaces
  read in full (solid); a doc-reference integrity sweep found every
  docs/*.md pointer in src/tests resolves on disk — but the SPEC-FILE
  cross-references exposed the round's findings
- THE FINDINGS: (F4-1, MED) typography.test.ts claimed computed-style
  parity was "pinned by the e2e typography checks (tests/e2e/
  crm.spec.ts)" — a PHANTOM FILE (no e2e spec has ever asserted
  fonts; verified by rg); (F4-2, LOW) vitest.config.ts described
  the unit surface as "the CRM's seams (…currency/date formatting,
  CSV codec…)" — the template's inventory, not this app's; (F4-3,
  LOW) e2e-port.ts claimed "both consumers import this module" —
  the 401-probe consumer died with the CRM spec family, only
  playwright.config imports it; (F4-4, LOW) the boot-env fixture
  https://crm.example.com; (F4-5, INFO — left intentionally) the
  login-views pre-s142 provenance (same class as type-gate's
  evaluation-report citation)
- THE CURES: the typography comment now states the truth (THIS SUITE
  IS the typography contract; the e2e layer pins titles/SEO/a11y,
  never font rendering); vitest.config.ts describes the actual
  surface (db-path, auth, generator, route-title, rate limiting,
  login/reset views, boot gate, sitemap/SEO); e2e-port.ts updated to
  the single-consumer shape; the fixture → viralpost.example.com
- THE VERIFICATION: full gate on the exact tree — lint 0/0 · tsc 0 ·
  unit 405/405 · build · smoke 15/15 · e2e 48/48 · census MATCH
- THE DEV-CAPTURE SAGA (the round's live debugging): the mobile-menu
  capture fought back — first the agent-browser daemon thrashed
  (respawning the page mid-click), then the click itself timed out on
  a "visible, enabled, stable" button. ROOT CAUSE 1: the full-gate
  `bun run build` had overwritten .next/ UNDER the running dev server
  — it recompiled/fast-refreshed in an endless loop (4,300 log lines
  of churn); a clean restart silenced it. ROOT CAUSE 2 (the real
  blind spot): the burger RELABELS on open (navbar.tsx:
  aria-label={open ? "Close menu" : "Open menu"}) — every
  "did it open?" probe through the "Open menu" locator was doomed by
  construction; the earlier "button vanished" readings were the
  RELABELED button all along. The cure: verify through the nav links
  (the e2e contract) — captured clean on the first honest attempt
- THE PARITY RE-CHECK: the reference spot-checked live (landing
  mobile + the 5-destination menu · /Tool's full content · /login's
  auth card · /Dashboard's 404 + derived title) — no drift since
  session 3
- SHIPPED: the remediated tree + captures 15/16 (dev-server landing
  desktop + the open mobile menu, both PIL-verified non-blank) + the
  plan doc (docs/plans/2026-11-09-session4-phantom-reference-audit.md)
  + worklog, committed to main and pushed via docs/ssh_git_wrapper_v3.py

---

Task ID: 3
Agent: main (Z.ai)
Task: The session-3 rename-completion audit — re-run the standing
instruction against the post-session-2 tree (a822770): docs review,
fresh codebase audit with the repo skills, parity re-verification,
the TDD cures for the rename's incomplete tail, the gate, captures,
push #3 to main via the SSH wrapper.

Work Log:
- The intake: the workspace pulled to a822770 (the owner's
  session_2.md log on top of the session-2 ship 1e6a341 — which HAD
  been pushed; the session-2 summary's "uncommitted" state was
  mid-flight, the round actually completed: screenshots 09–12 + the
  commit + the push all landed)
- The docs validated against the tree (all five in count-lockstep:
  29 files/402 unit · 8 specs/48 e2e · 9 runtime deps — each verified
  live); the skills for the round: web-application (§2 env contract +
  §15 gate) + security-and-hardening (the three-tier boundary)
- THE AUDIT'S FINDING — the session-2 `NEO_*` → `VIRALPOST_*` rename
  was incomplete at the GUARD layer: the knob values were renamed but
  the machinery protecting them still spoke the old dialect. Three
  live defects: (F3-1, HIGH) boot-env's flag-typo guard still scanned
  only the `NEO_` prefix — a typo'd `VIRALPOST_DISABLE_INAPP_OTP`
  silently no-opped with NO warning, defeating the guard's entire
  purpose; (F3-2, HIGH) playwright.config's D-195a3 e2e-isolation
  pins still set the dead `NEO_DISABLE_*` spellings — the pin was
  inert against exactly the hazard it exists to prevent; plus the
  `KNOWN_NEO_VARS` export name, stale comments, the catch-all page's
  dead generateMetadata (probe-verified discarded by notFound() — a
  session-2 iteration leftover), the neo-crm-homepage.png exclude
  relic, and the local .env's stale spellings
- THE CURES (TDD): the guard rewritten as a dual-prefix scan — unknown
  `VIRALPOST_*` keys get the typo warning, ANY `NEO_*` key gets the
  legacy warning that maps its live spelling (`NEO_PROXY_HOPS` → "Set
  VIRALPOST_PROXY_HOPS instead"); RED first (3 failing pins on the old
  guard) then GREEN (23/23); the export renamed
  `KNOWN_NEO_VARS` → `KNOWN_VIRALPOST_VARS`; the playwright pins
  re-armed with the live spellings; the dead page metadata deleted
  (its comment now attributes the title to the segment layout — the
  architecture that actually renders it)
- THE VERIFICATION: lint 0/0 · tsc 0 · unit 405/405 (29 files, +3 net:
  the typo-form, the legacy-mappable, the legacy-unmappable pins)
  · build · smoke 15/15 (leg 06 re-proves the derived title) · e2e
  48/48 (the mobile-navigation 5/5 + seo 7/7 among them) · census
  MATCH · the live production curl: /Dashboard → 404 + "Dashboard |
  ViralPost AI" + noindex, and foo-bar/userSettings/page2/nonexistent
  all byte-matching the reference's scheme; the new capture 14 is
  PIXEL-IDENTICAL to session-2's 09 (0.0000% diff — the layout-only
  title path renders byte-for-byte the same 404)
- THE PARITY RE-CHECK: the reference spot-checked live (landing
  structure, the 390×844 mobile menu, /Dashboard's 404 + derived
  title) — no drift since session 2
- SHIPPED: the remediated tree + the five docs in lockstep + the plan
  doc (docs/plans/2026-11-09-session3-rename-completion-audit.md) +
  captures 13/14, committed to main and pushed via
  docs/ssh_git_wrapper_v3.py

---

Task ID: 2
Agent: main (Z.ai)
Task: The session-2 parity-audit round — the /Dashboard decode (the
unknown-route title architecture) + the codebase audit/remediation + the
docs rebuild + the SKILL distillation — TDD cures, the gate, captures,
push #2 to main via the SSH wrapper.

Work Log:
- The intake: the workspace pulled to 414596c (the owner's session_1.md
  post on top of the session-1 ship 12d8a80); the interrupted session-1
  tail completed first — the 11-package dead-dep removal (zustand,
  recharts, jspdf, html2canvas-pro, cva, 6× radix) verified through the
  full gate INCLUDING the e2e battery that the tool outage had cut off
  (47/47 — the gate now fully re-certified on the diet)
- The docs internalized (session_1.md + the two plans + the worklog +
  the four root docs' CRM-era state confirmed) and validated against the
  tree; the skills read for the round (web-application §0–§20 + the
  appendices · tdd · agent-browser · tailwind-patterns ·
  distill-codebase-skill · to-distill-project-into-skill — all four
  doc-creation skills from session 1 already internalized)
- THE /DASHBOARD DECODE (the round's key discovery, live-verified in
  BOTH auth states with the operator's demo credentials): the reference's
  /Dashboard is its 404 page — heading "404", "Page Not Found", the
  quoted-pathname message, the bare centered body, Go Home; the clone's
  body already matched. THE REAL GAP: the reference derives
  `<StartCase(last segment)> | ViralPost AI` for unknown routes while
  the clone shipped the bare root default. The derivation table pinned
  live across 17 path shapes (camelCase splits, XMLHttp → "XML Http",
  digits NEVER split — /page2 → "Page2", NOT lodash semantics; the
  empty derivation → the bare title; /a/b/c → the LAST segment)
- The audit (Mode C, the web-application skill's dimensions): 8 findings
  — F-1 the unknown-route title gap (Medium) · F-2 the missing
  data-scroll-behavior (Low) · F-3 a generator comment typo (Low) ·
  F-4 the NEO_ env prefix relics (Medium) · F-5/F-6/F-7 the stale root
  docs / the missing viralpost-ai_SKILL.md / the stale worklog (High,
  docs) · F-8 the neo_crm postgres example (Low). Verified at parity,
  no action: the mobile menu (re-walked live at 390×844 against the
  reference — structure/classes/behavior, no drift since session 1),
  the login→/ redirect, /Home 308, sitemap/robots/manifest, the .env
  DATABASE_URL contract, vitest+playwright, the Tailwind v4 doctrine
  state, the console
- The remediation plan (docs/plans/2026-11-09-session2-parity-audit-
  remediation.md): the findings ledger + the R-1..R-8 sequence + the
  acceptance criteria, validated against the codebase before execution
- R-1 THE TITLE SEAM (TDD): RED — tests/route-title.test.ts, 13 pins
  over the live-verified table; GREEN — src/lib/route-title.ts (the
  derivation). THE ARCHITECTURE JOURNEY (three probes, each
  live-verified): (1) a client-side effect in NotFoundBody — STOMPED by
  React's metadata hydration (title set at load, reverted a beat later);
  (2) the catch-all page's generateMetadata + notFound() — DISCARDED by
  Next when the page throws (probe-verified: the same metadata applied
  while the page rendered); (3) THE CURE — the derivation lives in the
  catch-all SEGMENT LAYOUT's generateMetadata (layouts render around
  the not-found boundary, so the metadata survives): layout (title) +
  page (notFound()) + segment not-found (the body). Verified: all 11
  live path shapes byte-match the reference's titles, the true-404
  status preserved, noindex now shipped, every real route untouched
  (curl precedence walk). The curl-layer cost, honestly recorded: the
  404 body renders through the client stream (Next's dynamic-boundary
  fallback — the SAME client-rendered posture as the reference's SPA
  404); the rendered-body contract moved to the e2e layer (the heading
  assertions), the smoke leg 06 re-anchored to status + derived title +
  noindex
- R-2/R-3: data-scroll-behavior="smooth" on <html> (the typography pin
  updated in the same commit) · the generator comment typo
- R-4 THE RELIC SWEEP: NEO_PROXY_HOPS/NEO_DISABLE_IN_APP_* →
  VIRALPOST_* (10 files: boot-env, rate-limit, three auth routes,
  login-card, three test suites, .env.example) · the user-facing
  "Enter your new password for NEO CRM" → "ViralPost AI" (a genuine UI
  relic) · the chunk-reload flag → "viralpost:chunk-reload-at" · the
  Prisma globalThis key · the timing-equalizer constant · the stale
  login-page comments · the db-path test scratch names · the .env
  postgres example → viralpost. Zero NEO/neo references remain in src/
  tests/prisma/scripts/.env.example (rg-swept)
- R-5/R-6 THE DOCS REBUILD: README.md (the readme-md skill: badges,
  features, architecture + mermaid, hierarchy, quickstart, env, testing,
  API, deviations, status) · AGENTS.md (the agents-md skill: the
  commands table, the facts you'd guess wrong — the catch-all
  architecture, the db-path contract, the e2e discipline, the VIRALPOST_
  env names) · CLAUDE.md (the claude-md skill: the six-phase Meticulous
  Approach, the implementation standards, the Tailwind trap catalog,
  the anti-patterns) · Project_Architecture_Document.md v2.0 (the PAD
  skill: 8 ADRs — the stack, the local generator, the quota posture,
  the cookie auth, the Tailwind doctrine, THE CATCH-ALL 404 (ADR-006),
  the contact persistence, the db-path seam — plus topology, layers,
  patterns, data, design, security, testing, deployment, known issues,
  key files, glossary) · viralpost-ai_SKILL.md v1.0.0 (the distill
  skills' 16-section form + the round history + the verification
  ledger) · this worklog entry
- R-7: the census restored to MATCH after pruning the round's probe
  users (3 signup-probe rows out; the seed's upsert kept the demo row)

Stage Summary:
- THE PARITY ROUND: the operator's /Dashboard ask decoded (the
  reference's own 404 + its title scheme — never a dashboard surface),
  the title architecture shipped SSR-correct through the layout-owns-
  the-metadata cure, and every CRM-era relic swept from the tree
- THE LIVE FINDS: the React metadata stomp (the effect approach) · the
  Next generateMetadata/notFound discard (the page approach) · the
  digits-never-split derivation rule (NOT lodash) · the user-facing
  "NEO CRM" reset-password text
- THE VERIFICATION: lint 0/0 · tsc 0 · unit 402/402 (29 files, +13 the
  route-title suite) · build (the catch-all route present) · smoke
  15/15 (leg 06 re-anchored to the new 404 contract) · e2e 48/48 (+1
  the derived-title pin) · the census MATCH · the mobile menu + the
  derivation table + the route precedence live-verified
- SHIPPED: the remediated codebase + the five rebuilt docs committed to
  main and pushed via docs/ssh_git_wrapper_v3.py (the remote verified;
  no new branches)
