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
