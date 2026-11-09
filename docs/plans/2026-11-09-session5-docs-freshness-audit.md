# Session 5 — The Docs-Freshness Audit (2026-11-09)

## Context

Session 4 pushed `124f105` (the phantom-reference round); the owner added
`b5261b5` (`docs/session_4.md`, the session log). This round re-runs the
standing instruction against the merged tree: docs review → codebase
validation → fresh audit (repo skills: `web-application` §15/§16,
`security-and-hardening`) → parity re-verification → remediation → gate →
captures → push.

The S4 round's cures were commentary-level (test-file comments + a fixture
URL) and its docs-lockstep step deliberately updated only the worklog and
the plan ("no count changes"). This round's audit asks the follow-up
question: did anything else in the doc set go stale while the sessions
shipped? Answer: yes — the session-tracking surfaces and one env table.

## Verified-clean (no action)

| Surface | Evidence |
|---|---|
| Baseline gates on `b5261b5` | lint 0/0 · tsc 0 · unit 405/405 (29 files) — matches documented counts; `db:census` MATCH (1 user + 0 messages) |
| S4 cures in-tree | typography comment (the unit suite IS the contract), vitest surface description, e2e-port single-consumer shape, `viralpost.example.com` fixture, captures 15/16 — all as documented |
| `.env` / `.env.example` | Contract-correct (`file:../db/custom.db`, `VIRALPOST_*` knobs, AUTH_SECRET guidance); `.env.example` mirrors the full contract |
| Sitemap / robots / manifest | Route handlers pinned to the reference's byte formats (`force-static`, /Home alias handled by the 308, `siteUrl()` seam) |
| Marker / relic sweep | Zero TODO/FIXME in src/; the only `neo-crm` mention in tests is type-gate's documented evaluation-report provenance |
| Reference parity (live, this round) | Mobile menu at 390×844 — closed state (links hidden, burger visible), open state (the 5 destinations: Home/Tool/Pricing/Contact/Upgrade to Pro – $19), click-through navigation (/Pricing + title) — byte-matching the reference; /Tool (title + h1 + Generate Post + 3-free), /login (Welcome card + Continue with Google), /Dashboard (404 + "Dashboard \| ViralPost AI" + Page Not Found) — no drift |
| Tailwind v4 doctrine | `@custom-variant hover`, literal-hex `@theme`, shadow-sm/blur-sm re-pins, vendored `tw-animate.css` — all in place and pinned by `tests/design-tokens.test.ts` |
| Key hygiene | No key material in the tree (the wrapper's OPENSSH markers are format constants); no `/tmp` key residue |

## Findings

All four are documentation-freshness gaps — no source-code defect. The
S4 round's "docs lockstep = worklog + plan" posture was correct for
counts but left the session-tracking surfaces and one env table behind.

| # | Finding | Severity |
|---|---|---|
| F5-1 | `viralpost-ai_SKILL.md` — the session-tracking surfaces are frozen mid-history: the `project_state` frontmatter says "Session-3 ship" (S4 shipped after), and Appendix A's round history lists only Sessions 1–2 (the rename-completion round and the phantom-reference round are missing entirely). The SKILL is the distilled engineering memory — a maintainer reading it would misdate the project by two rounds. | MED |
| F5-2 | `README.md` — the Project status table lists only Sessions 1–2; the gate line below it is labeled "session-3 ship". Sessions 3 and 4 shipped without a row. | LOW |
| F5-3 | `AGENTS.md` — the docs-map enumerates `docs/plans/` as "(session-1 build, session-2 audit)" while four plan docs exist (sessions 1–4). | LOW |
| F5-4 | `docs/DEPLOYMENT.md` §3's env table omits `VIRALPOST_PROXY_HOPS` and the `VIRALPOST_DISABLE_IN_APP_OTP`/`_RESET` kill-switches — the only contract-bearing doc that doesn't carry them (README/AGENTS/CLAUDE/`.env.example` all do). The doc's own §2 discusses HTTPS-terminating reverse proxies and §7 rate-limited logins — exactly the audience that needs the proxy-hop knob for correct per-client rate limiting. | LOW |

## Remediation

- **R5-1** (F5-1): SKILL.md — append Session 3 + Session 4 rows to
  Appendix A's round history; bump the `project_state` frontmatter to the
  session-4 ship (counts unchanged — the label and round reference move);
  add the S3/S4 gate re-certification line to Appendix B's ledger (the
  counts held; the label stays honest about what the ledger documents).
- **R5-2** (F5-2): README.md — append Session 3 + Session 4 rows to the
  Project status table; relabel the gate line to the session-4 ship.
- **R5-3** (F5-3): AGENTS.md — update the `docs/plans/` enumeration to
  the four real plans.
- **R5-4** (F5-4): DEPLOYMENT.md §3 — add the three `VIRALPOST_*` rows
  with production-facing guidance (proxy depth behind reverse proxies;
  the in-app delivery kill-switches when a mail transport owns delivery),
  cross-referenced from §7's rate-limit row.
- **R5-5**: docs lockstep — worklog Task 5 + this file's execution
  record. No count changes (the cures are doc-only; the unit/e2e counts
  stay 405/48/15).
- **R5-6**: dev-server captures 17/18 (the standing ask — landing + the
  open mobile menu). Captured BEFORE the gate's `bun run build` (the S4
  lesson: building under a live dev server sends it into Fast-Refresh
  churn).
- **R5-7**: full gate on the exact commit tree (dev server stopped
  first).
- **R5-8**: Conventional Commit on `main` → SSH-wrapper push (dry-run
  first).

## Execution record

(filled during execution — one refinement: the session labels advance to
the SESSION-5 ship, one round beyond the plan's S4 target, because this
round itself ships; the round-history tables therefore carry a Session 5
row alongside the S3/S4 backfill)

- **R5-1**: done — Appendix A now carries Sessions 1–5 (S3: the
  rename-completion guard round; S4: the phantom-reference round; S5:
  this docs-freshness round); the `project_state` frontmatter names the
  session-5 ship at the same counts; Appendix B gains the sessions-3–5
  re-certification line and a re-certified heading; the SKILL version
  bumped 1.0.0 → 1.1.0.
- **R5-2**: done — the status table carries Sessions 1–5; the gate line
  relabeled to the session-5 ship.
- **R5-3**: done — the docs-map enumerates the five plan docs
  (session-1 build, session-2 parity audit, session-3 rename completion,
  session-4 phantom references, session-5 docs freshness).
- **R5-4**: done — §3's table carries `VIRALPOST_PROXY_HOPS` (behind a
  reverse proxy) and the two in-app delivery kill-switches (production,
  when a mail transport owns delivery), with the fail-closed semantics
  stated and verified against `src/lib/rate-limit.ts` + the auth routes
  (unset = 1; unparsable/negative fails closed onto 1; `="1"` nulls
  in-response delivery); §7's rate-limit row cross-references the knob.
- **R5-5**: this record + worklog Task 5. Counts unchanged
  (405/48/15 — the cures are doc-only).
- **R5-6**: captures 17/18 — the dev-server landing (1280×800) and the
  open mobile menu (390×844), both PIL-verified non-blank (99.7%/99.9%);
  captured before the gate build per the S4 churn lesson, the open-state
  verified through the nav links (the S4 relabel lesson).
- **R5-7**: **FULL GATE GREEN** on the exact commit tree — lint 0/0 ·
  tsc 0 · unit 405/405 (29 files) · build · smoke 15/15 · e2e 48/48
  (8 specs) · census MATCH (1 user + 0 messages).
- **R5-8**: Conventional Commit on `main` → SSH-wrapper push (dry-run
  first).
