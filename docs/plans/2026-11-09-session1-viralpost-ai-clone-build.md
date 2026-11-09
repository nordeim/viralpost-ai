# Session 1 Round Plan — The ViralPost AI Clone Build (2026-11-09)

**Trigger:** the operator's standing create-prompt (docs/prompt-to-create.md,
updated 2026-11-09 by the owner): clone `https://viralpostai.base44.app/`
using this repo (the NEO-CRM template at its session-198 ship state) as the
scaffold. The repo is re-purposed as **ViralPost AI** — a different app from
the CRM the template cloned.

**Companion documents:**

- `docs/reference-investigation.md` — the full evidence dossier (routes,
  structures, generator contract, design tokens, defects, unknowns).
- `docs/implementation-plan.md` — Stack Decision Record, architecture,
  feature sequence, acceptance criteria, risks, Deviations Ledger,
  verification plan.

**Execution record** (filled as the round progresses):

1. ✅ Fresh clone, env rebuild (bun 1.3.14, deps, `.env` with
   `DATABASE_URL="file:../db/custom.db"`, db push + seed, census MATCH).
2. ✅ Reference investigation (agent-browser: all routes, login, mobile nav,
   bundle deobfuscation of the generator + prompt + quota contract; VLM
   screenshot review; computed-style token extraction).
3. ✅ Plans saved (this file + the two companions above).
4. ✅ Schema/lib/API layer (TDD: generator contract + counter first).
5. ✅ App shell + effects + pages.
6. ✅ Parity walk (agent-browser, desktop + 390×844, mobile menu). Findings
     and resolutions (all verified live against the reference site):
   - **Mobile menu (the operator's priority)**: the reference's panel class
     `bg-slate-900/98` is a DEAD class in its Tailwind build (computed
     backgroundColor transparent — /98 is not a generated opacity step), so
     over the hero its menu shows the WebGL glow through the panel. Replicated:
     panel transparent on the hero route; SUPERSET: dark slate-900/95 + blur
     on light pages where the reference leaves slate-300 links unreadable.
     Links/structure/geometry match exactly (265px panel at y=64, verified).
   - **Hero desktop**: shader driven to Δ(7,6,8) mean RGB vs the reference
     (radial teal burst + left mist + upper diagonal band; teal-duotoned the
     AI portrait to the reference's (28,146,130) average).
   - **Hero mobile**: the reference's shader renders differently at portrait
     aspect — near-black field + one horizontal teal flow-band at uv.y≈0.85
     + teal pooled at the bottom. Implemented as an aspect-aware composition
     mix; row profile now within Δ≤(3,14,17) worst-case, most rows Δ≤10.
   - **Subpages**: /Tool, /Pricing, /Contact, /login all at meanAbsDiff
     (2,2,2) vs fresh live reference captures — near pixel-perfect.
   - **Generator (functional superset)**: the reference's LLM endpoint is
     402-exhausted and hangs at "Generating..." forever with no error state;
     ours generates instantly (verified live: post + Copy button + counter
     decremented 3→2).
7. ✅ Test suite rebuilt; gate green (lint 0/0 · tsc 0 · 389 unit · build ·
   smoke 15/15 · e2e 47/47) — re-certified after the parity fixes.
8. ✅ Screenshots to `docs/screenshots/` (8 captures: desktop hero/tool/
   pricing/contact/login, mobile landing/menu-open/generator-result);
   first push via the SSH wrapper.
9. ⬜ Root docs (AGENTS / CLAUDE / README / PAD) via their skills;
   `docs/session_1.md`; worklog; final push.

**Standing operator asks verified this round:** `.env` DATABASE_URL contract ·
`db/` at repo root · vitest + playwright configs present and green · mobile
navigation compared live vs the reference · Tailwind v4 state clean (the
`@custom-variant hover` unwrap and literal-hex `@theme` doctrine carried
over) · sitemap/robots/manifest · screenshots · worklog · main-branch-only
pushes via `docs/ssh_git_wrapper_v3.py`.
