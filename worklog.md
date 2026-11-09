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
