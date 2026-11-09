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
