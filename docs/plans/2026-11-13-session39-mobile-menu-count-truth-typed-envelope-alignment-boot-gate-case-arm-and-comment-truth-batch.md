# Session 39 — The Mobile-Menu Count Truth + The Typed-Envelope Alignment + The Boot-Gate Case Arm + The Comment-Truth Batch (2026-11-13)

## Context

Session 38 shipped `e79caba` (the requireSession transient arm, the
lineage-note refs, the provenance-count truth, the comment-truth batch);
the owner's narration commit `7bf6aad` followed (session_39.md carries the
round-38 narration — this round replaces it with the formal log). The
standing instruction re-ran end to end: docs review → baseline gate →
the comprehensive audit (three parallel subagents) → the live reference
parity walk → the TDD cures → the gate → captures → push.

**Baseline (the tree at `7bf6aad`, verified in place):** lint 0/0 · tsc 0 ·
unit 672/672 (39 files) · build (the emitted sheet carries
`button,[role=button]{cursor:pointer}`) · smoke 16/16 · e2e 65/65 (9
specs) · census MATCH · `.env`'s `DATABASE_URL="file:../db/custom.db"`
with `db/` at the repo root ✓ · the vitest + playwright suites in place
and current ✓ · the sitemap/robots/manifest/OG family verified live
against the reference (this round's walk) ✓ · `skills/` excluded from
every gate ✓ · `.env.example` present, committed, matching the six-knob
contract ✓.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib
seams, AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs
— every load-bearing finding hand-verified in source by the lead):
**AUDIT-1: 0C/0H/0M/2L/4I · AUDIT-2: 0C/0H/0M/2L/2I · AUDIT-3:
0C/0H/0M/0L/3I** — combined **0 Critical / 0 High / 0 Medium / 4 Low /
9 Info** plus the lead's own live-verified finding (the fifth Low). The
session-38 diff itself verified correct and complete on all three
passes (the S38-1 arm + pin + battery, the ID-form lineage refs, the
provenance re-anchors, the hygiene genera — all re-confirmed).

**The parity walk** (live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`; the session-35..38 instrument lessons
applied — `set viewport` + innerWidth confirms, nav-anchored selectors,
computed styles as ground truth): **ALL FACES MATCH, NO DRIFT — the
twelfth consecutive fully-clean walk.** The mobile menu works as
expected (the owner's standing concern): open at a confirmed 390×844,
the panel display block + max-height none + overflow hidden, the
hamburger cursor pointer both sides, the link faces byte-identical —
and the walk's anchor enumeration LIVE-SETTLED the round's headline
count question: the reference's open panel carries exactly FIVE
anchors — **the four nav links (Home /Tool /Pricing /Contact) + the
Gumroad pill** — byte-identical to ours (classes, hrefs, texts, cursor
pointer; the active link's teal face; the pill's priced text). The
reference's `bg-slate-900/98` panel class remains dead in its own build
(computed `rgba(0,0,0,0)` both sides). Escape leaves the reference's
panel open (our F11-11 superset, re-confirmed). The desktop nav
byte-identical (4 links + the Upgrade pill, classes + hrefs); the
five-route head census byte-identical modulo origin (titles,
og:title, og:description, descriptions, canonicals); sitemap 4 URLs
both (identical modulo origin); robots identical modulo origin; the
generator probe symmetrically disabled/not-allowed; the login
round-trip both landing the landing (R `/Home`, its duplicate-of-`/`
route; L `/` — the documented 308 deviation).

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S39-1 | **LOW** (the lead's own, live-verified in this round's walk) | The mobile-menu walk records: `docs/session_32.md:51`, `docs/session_33.md:45`/:167, `docs/session_36.md:79`, `docs/session_37.md:50`, `docs/session_38.md:50-51`, the session-32/33/37/38 plans' walk sections, `worklog.md:3320`/:3470/:3555, the README session-31/32/33/38 rows, the SKILL Appendix A session-31/32/33/38 rows (~18 sites) | The sessions-31..38 walk recordings say "the five links + the Gumroad pill byte-identical" — the panel carries **four links + the pill** (five anchors total). Live-verified this round on the reference's open panel (the anchor enumeration: Home/Tool/Pricing/Contact + the Gumroad pill); the e2e spec (`mobile-navigation.spec.ts`: "the 4 links + the Upgrade pill"), the reference dossier (§3.1 "the 4 links + pill"), and the code (NAV_ROUTES = 4 + the pill anchor) all agree. The phrase double-counts the pill — the exact count-truth genus S38-3 cured for the provenance sites. The "5 destinations" phrasing (SKILL/worklog re-certification narrative) counts the five anchors and is CORRECT — untouched. Cure: re-spell to "the four links + the Gumroad pill" at every carrying site. |
| S39-2 | **LOW** (AUDIT-1 A1) | `src/app/api/auth/logout/route.ts:18-19` | The S18-3 comment still says "a DB failure answers the envelope's INTERNAL" — stale in exactly the dimension S38-1 changed: the seam's catch now carries the transient arm, so a P2024/P2028 answers **503 UNAVAILABLE** (only the residual answers INTERNAL). The api.ts comment was re-anchored in session 38; this inline cross-reference was missed. Cure: re-spell to the post-S38-1 truth (503 on the transient family, INTERNAL on the residual). |
| S39-3 | **LOW** (AUDIT-1 A2, the session-34 docs-lockstep miss) | `AGENTS.md:40-42` (primary); `CLAUDE.md` Data Layer bullet, `viralpost-ai_SKILL.md` §3, PAD §4.3 (secondary) | The tree has THREE one-shot scripts constructing their own PrismaClient routed through `runtimeDatabaseUrl()` — `prisma/seed.ts`, `scripts/e2e-prune.ts`, and `scripts/e2e-contact-readback.ts` (added session 34, S34-2). The pin (`tests/db-census.test.ts:100`/:124/:161) and the scripts' own comments are correct and complete; AGENTS.md still enumerates only two, and CLAUDE/PAD state the "constructed in exactly one place" rule with no exemption clause. Cure: complete the AGENTS enumeration; add the three-script exemption clause to CLAUDE's Data Layer bullet and PAD §4.3. |
| S39-4 | **LOW** (AUDIT-2 A1, the S38-7e cure's own count) | `src/components/effects/reveal.tsx:40-41` | The S38-7e re-word says "five sites compute, none re-render past mount" — exactly **four** call sites pass computed delays (`sections.tsx:107` `i * 100`, `:217` `(i % 3) * 100`, `:271` `i * 150`, `:359` `i * 100`); the other three Reveal sites pass literals (`sections.tsx:117`/:422, `generator-card.tsx:186` — `delay={100}`), and the fifth keyed instance (`sections.tsx:307`, STATS) passes no delay. The miscount originated in the session-38 plan and shipped into the comment. Cure: re-spell to "four sites compute". |
| S39-5 | **LOW** (AUDIT-2 A2) | `src/components/layout/login-card.tsx:177`/:223/:261/:290/:329, `src/components/layout/reset-password-screen.tsx:64` | Six client fetch sites read `const body = await res.json().catch(() => null);` UNTYPED — `body` is implicit `any`, gate-blind under the documented S25-18c off-list posture (`@typescript-eslint/no-explicit-any` off), while the sibling fetch islands cast (`generator-card.tsx:95` `as GenerateResponse \| null`; `contact-form.tsx:48` `as {ok, error?} \| null`). CLAUDE's "never `any`" standard is unenforced at exactly these sites. Cure: the typed-envelope alignment — each site gains the local typed cast (the generator-card idiom; a local interface per file — `@/lib/api` is server-side and lib may not be imported by the layer model's client path for a runtime value, but the LOCAL cast is the established idiom); +1 genus census pin (every `res.json()` line in `src/components/` carries an ` as ` cast), RED-first, battery on record. |
| S39-6 | **INFO→cure** (AUDIT-1 A3) | `src/app/api/auth/forgot-password/route.ts:128-141` | The update catch orders the P2025 known-error arm BEFORE the transient arm; the three siblings (verify/resend/signup) order transient-first. Functionally identical (disjoint code sets) but the house one-idiom doctrine prefers one order. Cure: normalize to transient-first (zero behavior change — P2025 ∉ {P2024, P2028}). |
| S39-7 | **INFO→cure** (AUDIT-1 A4) | `src/app/api/auth/resend/route.ts:4`, `src/app/api/auth/me/route.ts:1` | Residual import member-order heterogeneity: `ok, ERR, fail` vs the five-member-majority `ok, fail, ERR`. The S38-7b cure's claim ("every sibling orders it among the leading members") holds, but the exact order differs in two files. Cure: align to the majority order. |
| S39-8 | **INFO→cure** (AUDIT-1 A6) | `src/app/api/auth/verify/route.ts:108-120` | The success-path clear is unconditional by id (a concurrent resend's fresh code is wiped by an in-flight valid-code verify) — arguably correct-by-intent (the user proved possession of a valid code; a conditional WHERE would REJECT a user who did everything right), but the accepted race is undocumented. Cure: the one-line comment documenting the deliberate unconditional clear. |
| S39-9 | **INFO→cure** (AUDIT-2 A4) | `src/components/marketing/nav-config.ts:1-3` (the docblock), `src/components/marketing/footer.tsx:29-31`, `tests/landing-page.test.ts:306` | The docblock claims "the single source every nav/footer/CTA reads" — `BRAND` has ZERO runtime consumers (only tests read it), the footer INLINES the tagline as a literal, and the sitemap carries its own ROUTES array. A footer tagline edit drifts green (the pin pins the footer's copy; `nav-config.test.ts:51` pins BRAND's — two unpinned-against-each-other copies). Cure: wire the footer's one-liner to `{BRAND.tagline}` (component→component import — the legal direction; DOM byte-identical, same string); re-pin `landing-page.test.ts:306` to the wiring (footer source contains `BRAND.tagline`); scope the docblock to the truth (routes + Gumroad = the runtime vocabulary; BRAND.tagline = the footer's source; name/description = the pinned mirror of site.ts's metadata copies — the layer model bars lib←components, the documented reason the strings are two-sided). |
| S39-10 | **INFO→cure** (AUDIT-2 A3) | `src/components/effects/reveal.tsx` (the `as` prop + `setRef` narrowing), `src/components/effects/particle-text.tsx:29`/:33 (the `waitDuration`/`tag` props) | Dead component API: `Reveal`'s `as` prop (plus the setRef callback machinery written solely for it) and `ParticleText`'s `waitDuration`/`tag` props have zero call-site consumers (all 17 Reveal sites use the default div — the count corrected session-40, S40-4: this row originally said 19, double-counting a sections prose mention; hero passes neither). The props are census-blind (the dead-import census walks imports, not signatures) — the F9-10/S30-2 genus's softer form. Cure: retire the three props (Reveal renders a div; ParticleText hardcodes the h1 — its a11y contract — and binds `waitDuration` from `PHASE_SECONDS.wait` internally so the effects-motion pins at :85-86 stay byte-identical); the suites own the behavior. |
| S39-11 | **INFO→cure** (AUDIT-3 A2) | `tests/api-robustness.test.ts:429` | The S38-1a pin's function-slice bound ends at the next `export function` — a future `export async function` wedged between requireSession and the next sync export could widen the slice past it and satisfy the pin with the arm absent from the seam. Cure: harden the bound to the next export of ANY form (`export (async )?function\|export const`). |
| S39-12 | **INFO→cure** (AUDIT-3 A3) | `tests/docs-counts.test.ts:351` | Dead `?? ""` fallback: `read()` is readFileSync (throws on missing) so the fallback can never engage. Cure: drop it. |
| S39-13 | **AUDIT-1 A5 → cure** | `src/lib/boot-env.ts:147-165` (the flag-typo scan loop) | The typo guard is case-sensitive: a lower/mixed-case knob (`viralpost_disable_in_app_otp=1` in `.env`) is invisible to BOTH the exact-case reader and the two scans — the operator believes delivery is disabled while the OTP keeps riding the responses, with NO `[boot]` warning. This is the silent-posture-misconfiguration class the boot gate exists to catch (the S13-1 polarity-warning genus). Cure: the case-variant arm — a key matching `^viralpost_`/`^neo_` case-insensitively but not exactly warns, mapping the canonical ALL-CAPS spelling (warn-only, the exact-case arms untouched); +2 RED-first pins in boot-env.test.ts (the viralpost case-variant; the neo case-variant). |

**Accepted register (this round's tail, with reasons):** AUDIT-3 A1 (the
provenance range rides at lag 1 by design — the owner's narration
window; this round's standard re-anchor cures it, see Batch 4); the
exact-source-shape GL-release regexes (the accepted source-pin
doctrine, the batteries own the defense); the generate route's
guard-envelope discard (the documented S17-3 posture); the standing
register carried forward unchanged (the prefers-reduced-motion
live-toggle gap, the JSON-LD/og:locale/twitter:site family, the
`.env.local` unmodeled face, the signup admin-bootstrap TOCTOU, the
scryptSync posture, the login photoUrl asymmetry, the in-app delivery
default, the footer heading skip, the S26-3 breakpoint-crossing
posture, the ParticleText sr-only duplication, the Reveal SSR opacity,
the worklog's structural inconsistencies).

## The cure set (TDD — every pin RED first or battery-planted, the mutation batteries per the house doctrine)

**Batch 1 — the RED pins:**
- **S39-5a**: `tests/client-envelope.test.ts` (NEW suite, the 40th) —
  the typed-envelope census: walk `src/components/**/*.{ts,tsx}`, find
  every line carrying `res.json()`, assert each carries an ` as ` cast
  on the same line (the generator-card idiom; the S31-6 census form).
  RED now (the six sites are untyped).
- **S39-13a**: `tests/boot-env.test.ts` — inside the flag-typo-guard
  describe: (1) a case-variant `viralpost_disable_in_app_otp` warns
  with the canonical spelling; (2) a case-variant `neo_proxy_hops`
  warns and maps `VIRALPOST_PROXY_HOPS`. RED now (the scan is
  case-sensitive).

**Batch 2 — the GREEN cures:**
- **S39-5**: login-card's five sites + reset-password-screen's one
  gain the typed casts (a local `AuthResponse`-shaped interface per
  file, the union of each file's reads; the cast form
  `(await res.json().catch(() => null)) as AuthResponse | null`).
- **S39-13**: boot-env's scan loop gains the case-variant arm (the
  exact-case VIRALPOST_/NEO_ branches first, the case-insensitive
  fallback arm after — warn-only, maps the canonical spelling, lists
  the known knobs when the uppercased form is unknown).
- **S39-1**: the ~18 "five links" record sites re-spelled to "the four
  links + the Gumroad pill".
- **S39-2**: logout's S18-3 comment re-spelled to the post-S38-1
  truth.
- **S39-3**: AGENTS' one-shot enumeration completed
  (+scripts/e2e-contact-readback); CLAUDE's Data Layer bullet + PAD
  §4.3 gain the exemption clause.
- **S39-4**: reveal's "five sites compute" → "four sites compute".
- **S39-6**: forgot's catch arms reordered transient-first.
- **S39-7**: resend/me import member order aligned.
- **S39-8**: verify's accepted-race comment (the unconditional clear
  is deliberate — a conditional WHERE would reject a user holding a
  valid-at-read code).
- **S39-9**: the footer wires `{BRAND.tagline}`;
  landing-page.test.ts:306 re-pinned to the wiring; the nav-config
  docblock scoped to the truth.
- **S39-10**: Reveal's `as`+setRef retired (renders a div);
  ParticleText's `waitDuration`/`tag` props retired (h1 hardcoded —
  the a11y contract; `waitDuration` bound internally from
  `PHASE_SECONDS.wait`, the effects-motion pins untouched).
- **S39-11**: the S38-1a pin's slice bound hardened to
  `/export (async )?function|export const/`.
- **S39-12**: the dead `?? ""` dropped.

**Batch 3 — the mutation batteries (planted defect → exactly the
designed pin RED → restore → GREEN):**
- S39-5: strip one cast (revert login-card:177 to the untyped form) →
  the census REDs.
- S39-13: remove the case arm → both boot-env pins RED; restore →
  GREEN (the exact-case arms' existing pins stay GREEN through the
  battery — the ownership separation).
- S39-9: revert the footer wiring (restore the inline literal) → the
  re-pinned landing-page assertion REDs.
- S39-11: re-widen the S38-1a slice bound → verify the pin still
  passes on the live source (the hardening is future-proofing, not a
  live-defect cure — the battery plants the wedge shape: insert a
  decoy `export async function` carrying the arm shape between
  requireSession and isGuarded, confirm the OLD bound false-greens and
  the NEW bound REDs on a seam-arm-stripped source).

**Batch 4 — the docs batch + the count re-anchor (constants FIRST —
the session-29..33 lesson):**
- `tests/docs-counts.test.ts`: the count-ladder comment's session-39
  entry; UNIT 672 → **675** (+1 S39-5a in client-envelope, +2 S39-13a
  in boot-env), SUITES 39 → **40**, E2E 65 unchanged, SMOKE 16
  unchanged, badge 737 → **740**.
- README: badge 740, the "40 files / 675 tests" table row, the
  session-39 status row, the gate line; the session-31/32/33/38 rows'
  "five links" re-spells (S39-1).
- AGENTS: the counts (675/40); the plans map's thirty-ninth round;
  the one-shot enumeration (S39-3).
- CLAUDE: the counts; the Data Layer exemption clause (S39-3).
- PAD: §4.3 exemption clause; §8.1 table (40 files / 675 tests); §12
  rows re-anchored to the live `wc -l` (particle-text retires two
  props); Last Updated 2026-11-13.
- SKILL v1.34.0 → v1.35.0: frontmatter (version, date,
  project_state), §0.5's range 1..38 → 1..39, Appendix A's session-39
  row, Appendix B's header + body counts, the pre-ship checklist
  counts; the Appendix A session-31/32/33/38 rows' "five links"
  re-spells (S39-1).
- The nine provenance sites re-anchored `session_1..38` →
  `session_1..39` (the S30-4 convention; lag 0 at ship).
- worklog Task 39; `docs/session_39.md` (this round's formal log,
  replacing the owner narration); this plan's post-execution record.

**Batch 5 — the verification + the captures:**
- The full gate on the exact commit tree: lint → typecheck → unit
  675/675 (40 files) → build → smoke 16/16 → e2e 65/65 → census
  MATCH.
- The parity walk RE-RUN post-cure: the standing faces hold (the
  twelfth walk's battery), no drift.
- Captures 85/86 on the dev server (the owner-instructed posture, the
  session-29..38 precedent): the mobile-menu open clean-walk at
  390×844 + the landing hero at 1280×800, PIL-verified, under
  `docs/screenshots/`.

**Batch 6 — the commit + the push:**
- Conventional Commit on main: `fix: the mobile-menu count truth +
  the typed-envelope alignment + the boot-gate case arm + the
  comment-truth batch (session-39 audit)`; `.env.example` rides the
  commit (tracked, six-knob current, the provenance note re-anchored
  to 1..39).
- Push via `docs/ssh_git_wrapper_v3.py` (the runbook is the
  authority): the Appendix-A shim on PATH, the operator key
  materialized 0600 OUTSIDE the repo (never printed), dry-run first,
  real push, remote ref verified, key + temp material shredded.

## Acceptance criteria

1. The ~18 "five links" sites say "four links" (the live-verified
   count; the "5 destinations" phrasing untouched — it is correct).
2. logout's comment tells the post-S38-1 truth (503 transient /
   INTERNAL residual).
3. AGENTS/CLAUDE/PAD name all three one-shot scripts.
4. reveal's comment says "four sites compute".
5. All six untyped fetch sites carry typed casts; the census pin
   RED-first + battery on record; the typecheck gate green.
6. forgot's catch arms transient-first; resend/me imports aligned;
   verify's accepted race documented.
7. The footer renders `{BRAND.tagline}` (DOM byte-identical); the
   landing-page pin re-pinned to the wiring; the docblock scoped.
8. Reveal's `as`/setRef + ParticleText's `waitDuration`/`tag`
   retired; every suite green (the effects-motion pins untouched).
9. The S38-1a pin's bound hardened; the dead `?? ""` dropped.
10. The boot gate warns on case-variant knobs (+2 RED-first pins,
    battery on record).
11. Full gate GREEN: lint 0/0 · tsc 0 · unit 675/675 (40 files) ·
    build · smoke 16/16 · e2e 65/65 (9 specs) · census MATCH.
12. The walk re-run: no drift.
13. Captures 85/86 PIL-verified under `docs/screenshots/` (post-cure).
14. Docs lockstep: six documents + worklog + session log + this plan's
    post-execution record, all in the same commit; the constants
    re-anchored FIRST; the provenance lag 0 at ship.
15. Conventional Commit to main; SSH-wrapper push (dry-run first, key
    shredded after).

## ToDo list (execution order)

- [x] 1. S39-5a: place the typed-envelope census pin (RED) in the NEW
      tests/client-envelope.test.ts
- [x] 2. S39-13a: place the two boot-env case-variant pins (RED)
- [x] 3. Verify Batch 1 RED state (exactly the three new pins RED)
- [x] 4. S39-5: the six typed casts (GREEN)
- [x] 5. S39-13: the boot-env case arm (GREEN)
- [x] 6. S39-9: the footer wiring + the landing-page re-pin + the
      docblock scope
- [x] 7. S39-10: the dead-prop retirement (Reveal as/setRef;
      ParticleText waitDuration/tag)
- [x] 8. S39-6/S39-7/S39-8: forgot arm order; resend/me imports;
      verify race comment
- [x] 9. S39-2/S39-3/S39-4: logout comment; the three-script
      enumeration; the reveal count
- [x] 10. S39-11/S39-12: the pin hardening; the dead fallback
- [x] 11. Batch 3: the mutation batteries (S39-5, S39-13, S39-9,
       S39-11)
- [x] 12. Batch 4: constants FIRST (UNIT 675, SUITES 40, badge 740),
       the census doc-site walk RED→GREEN, PAD §12 rows, SKILL
       v1.35.0, the nine provenance sites 1..39, the S39-1 re-spells
       (~18 sites), worklog Task 39, README/AGENTS/CLAUDE rows,
       session_39.md, the plan record
- [x] 13. Batch 5: the full gate + the walk re-run + captures 85/86
- [x] 14. Batch 6: commit + SSH-wrapper push (dry-run first, remote
       verified, key shredded)

## Post-execution record

Executed as planned, with the mid-round notes on record:

- **The walk settled the count question live**: the reference's open
  mobile panel enumerated (Home/Tool/Pricing/Contact + the Gumroad
  pill) — five anchors, four links + pill — before any record was
  re-spelled. The twenty-site cure (fifteen by the scripted re-spell
  + five line-wrap variants by hand; the worklog's two unrelated
  "the five" contexts correctly untouched) matches the live face,
  the e2e spec, the dossier, and the code.
- **The S39-13 in-round TDD catch**: the case arm's first draft
  tripped the exact-prefix trap — `/^viralpost_/i` matches the
  healthy ALL-CAPS knobs too, and 33 existing tests went RED on the
  lead's own cure. The load-bearing exclusions
  (`!key.startsWith("VIRALPOST_") && !key.startsWith("NEO_")`) are
  named in the code with the proof reference. The RED pins did
  exactly what pins are for.
- **The S39-5 census's own shape lesson**: the first draft matched
  only the single-line `…) as Type` form — contact-form's multi-line
  cast (the trailing-`as` form) REDed the census on an
  already-correct site. The census now accepts both cast shapes.
- **The S39-9 test-shape fix**: the case-variant pin's first form
  unset the canonical knob via `undefined` (the key survives the
  spread) and tripped the S13-1 polarity warning — the realistic
  shape (the lowercase spelling ADDED alongside the healthy knobs)
  fires exactly one warning.
- **The S39-11 battery's double proof**: on the planted wedge (the
  seam's arm stripped + a decoy `export async function` carrying the
  arm shape), the OLD session-38 bound FALSE-GREENS (the slice runs
  past the decoy) while the NEW bound REDs — the hardening is
  load-bearing, proven on both sides. (The bound also required the
  slice-then-search form: `String.search` silently ignores a start
  index.)
- **The count projection held exactly**: UNIT 672 → 675 (+1 the
  census in the new 40th suite, +2 the boot-env case pins), SUITES
  39 → 40, badge 737 → 740; PAD §12's particle-text row re-anchored
  330 → 333 (the two retired props' net). The reality census
  confirmed 675 on disk before any doc site was touched; the
  constants were re-anchored FIRST.
- **The reveal.tsx doubled-brace slip**: the S39-10 edit briefly
  produced `className)}}` — caught in the same edit session by
  re-reading the diff, before any gate ran.

**Final state:** lint 0/0 · tsc 0 · unit **675/675** (40 files) ·
build · smoke **16/16** · e2e **65/65** (9 specs) · census MATCH ·
badge **740**. Captures 85/86 PIL-verified on the dev server
(post-cure, the menu functionally verified open before the shot).
Docs lockstep: README + AGENTS + CLAUDE + PAD + SKILL v1.34.0 →
v1.35.0 + the nine provenance sites re-anchored to 1..39 (toast.tsx
the owned tenth) + worklog Task 39 + docs/session_39.md + this
post-execution record. Pushed to main via the SSH wrapper (dry-run
first, key shredded after).
