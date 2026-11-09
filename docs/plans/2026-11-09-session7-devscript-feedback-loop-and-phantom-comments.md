# Session 7 — The Dev-Script Feedback Loop + The Phantom-Comment Long Tail (2026-11-09)

## Context

Session 6 pushed `23783e5` (the clean-tree re-certification, zero findings);
the owner added `927a0b2` (`docs/session_6.md`, the session log). This round
re-runs the standing instruction against the merged tree: docs review →
codebase validation → fresh audit (repo skills: `web-application` §15/§16,
`security-and-hardening`) → parity re-verification → TDD remediation → gate →
captures 21/22 → push.

The audit's fresh angle this round: the `src/` comment layer read
claim-by-claim against the actual tree (the S4 phantom-reference class,
applied file-by-file to the deep comment blocks the earlier sweeps never
reached), plus the dev-server workflow itself under live browser load.

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| F7-0 | **HIGH** (dev workflow) | `package.json` `dev` script | `next dev -p 3000 2>&1 \| tee dev.log` writes request logs to `dev.log` INSIDE the Turbopack-watched repo root → every request triggers a Fast-Refresh rebuild → a full page reload → more request logs: a self-sustaining reload loop at ~3.3 page loads/s whenever a browser holds a dev-server page open. **A/B-verified live this round**: with the tee, `window` markers never survive 3s and `navType=reload` repeats; without it (direct `next dev`), the marker survives, 2 loads total, page stable. The mobile menu cannot stay open under the loop (the standing parity task is blocked by it). Nothing reads `dev.log` (write-only scaffold convention; gitignored; the gate boots the standalone artifact directly). |
| F7-1 | MED | `src/lib/api.ts` | Two comment blocks claim CRM surfaces as this tree's: "the family is THIRTEEN routes (accounts/activities/contacts/events/leads x[root+[id]] + settings + users + reset…)", "the twelve body routes ride parseBody/safeParse", "asString/asDate survive on the URL-param surfaces — events' from/to windows, the reports/export/search period+q parses", "tests/coercion-guards.test.ts, the living record". Verified false here: the parseBody family is SIX auth routes (+ generate/contact route-local `readBoundedJson` — `tests/body-pregate.test.ts` is the accurate living record); no events/reports/export/search routes exist; `tests/coercion-guards.test.ts` does not exist. The ten-function coercion helper family (`asString`, `isBadFK`, `asFKId`, `isBadString`, `isBadDate`, `isBadNumber`, `isBadBool`, `asNumber`, `asInt`, `asDate` — ~87 lines) has ZERO callers in `src/` and ZERO imports in `tests/` → dead code whose only justification is the phantom comment. Provenance: the file was last touched by the CRM's session-166 (`90ae18e`) — the claims were true THERE. |
| F7-2 | MED | `src/lib/site.ts` | `pageOgDescription`'s comment claims the reference ships per-route OG descriptions "`<Page>` on ViralPost AI. " + the 405-char root paragraph, "live-verified on /Accounts, /Contacts, /Leads, /Calendar, /Activities, /Reports, /Settings, /Profile". False here: the reference ships NO per-route OG at all (dossier D-4: "No SEO per-route canonical/OG on inner pages beyond title tag" — the clone's full metadata is the documented SUPERSET); the route list is the CRM's vocabulary; this app's inner routes are /Tool, /Pricing, /Contact; `SITE_DESCRIPTION` is 170 chars (line 25's "mirrored verbatim (405 chars)" is the same phantom — the CRM's description length). |
| F7-3 | MED | `src/app/not-found.tsx` | The session-194 (D-194a4/a5) comment block describes the CRM reference's 404 behavior as this reference's: "the reference's CURRENT build (bundle 46bc2d9c…) ships bare 'ViralPost AI' on its 404", "both ship bare 'ViralPost AI' on /dashboard", "the reference's auth-first client-router guard redirects anon unknown-routes to /login?from_url=…". All three are false for `viralpostai.base44.app`: it DERIVES unknown-route titles ("Dashboard \| ViralPost AI" — the session-2 live decode that created the catch-all architecture, re-verified live every round since), it serves its designed 404 to anon visitors (dossier: /Dashboard → Public → 404 page), and its bundle is `index-DwiT4li9.js` (dossier), not `46bc2d9c`. The file's MECHANICS are fine (no metadata export; the root layout's `title.default` renders on this dormant boundary) — only the reference claims are phantom. |
| F7-4 | LOW | `src/app/not-found-body.tsx` | D-194a1/a2/a3 cite "the walk67 maiden decode" and CRM-session evidence (span/box geometry, M-82c2/D-186a1/s19 family references) for claims about this app's reference. The behaviors are real and pinned here (the e2e message pin `The page "Dashboard" could not be found`; the dossier §3.7; the anchor-Go-Home a11y superset) — the evidence citations point at another app's verification walks. Cure per the S4 precedent: re-attribute to this repo's own pins. |
| F7-5 | LOW | `tests/page-titles.test.ts:15` | "the reference's 141-char meta description" — the pinned string is 170 chars (live re-verified on the reference this round: its meta description is byte-identical, 170 chars). A numeric label relic. |
| F7-6 | LOW | `AGENTS.md` Key docs | The repo's historical-record layer — `neo-crm_SKILL.md` (the CRM's v1.207.0 skill, the session-1 input that session 2 distilled into `viralpost-ai_SKILL.md`), `docs/worklog.md` (the CRM-era worklog), `docs/prompt-to-*.md` (the owner's prompt templates), `docs/Tailwind-V4-Validation-Report.md`, `docs/web-app-codebase-evaluation-report.md` — is unmapped. Each audit round re-discovers and re-adjudicates these files (this round spent real effort on it). A one-line map entry ends the re-litigation. |

**Verified at parity, no defect (a keep-and-document note):** the reference's
SPA leaves `document.title` STALE on soft navigation (live-verified this
round: menu-click → /Pricing, title stays the landing's bare "ViralPost AI"
for 6s+; per-route titles appear only on full loads). The clone's Next.js
Metadata API updates the title on every navigation ("Tool \| ViralPost AI"
immediately after the same click) — the correct behavior, kept as a superset
and recorded as a Deviations Ledger row.

## Remediation (TDD where a contract changes)

- **R7-1 (RED)**: two new unit pins — (a) `tests/body-pregate.test.ts`: the
  coercion-helper family is RETIRED from `src/lib/api.ts` (absence pin, the
  comment-stripped source), (b) `tests/type-gate.test.ts`: the dev script
  carries NO tee/no in-root log redirection (`dev` === `next dev -p 3000`).
  Both fail against the current tree.
- **R7-2 (GREEN, F7-0)**: `package.json` `"dev": "next dev -p 3000"` (the
  tee retired; `dev.log`'s gitignore + artifact-hygiene excludes +
  never-commit lines stay as defensive). Verified live: page stable, mobile
  menu opens/closes/navigates.
- **R7-3 (GREEN, F7-1)**: delete the dead helper family + rewrite the two
  api.ts comment blocks to the actual tree (the six parseBody auth routes +
  generate/contact route-local; the bounded reader's three layers; the
  envelope family that remains).
- **R7-4 (F7-2)**: site.ts — "405 chars" → 170 (line 25);
  `pageOgDescription`'s comment re-attributed to the D-4 superset (the
  CRM-family pattern adopted as the clone's SEO addition; the reference
  ships no per-route OG; our inner pages are /Tool, /Pricing, /Contact).
- **R7-5 (F7-3)**: not-found.tsx — the session-194 block rewritten to the
  true architecture (the dormant root-level boundary; the catch-all owns
  unknown routes with the segment-layout-derived title; the reference
  serves its 404 publicly; our boundary renders for anon and authenticated
  alike).
- **R7-6 (F7-4)**: not-found-body.tsx — the D-194 citations re-attributed
  to this repo's evidence (dossier §3.7, the e2e message pin, the a11y
  superset doctrine); the walk67 geometry retired.
- **R7-7 (F7-5)**: page-titles.test.ts — "141-char" → "170-char".
- **R7-8 (docs)**: `docs/implementation-plan.md` §6 gains the soft-nav
  titles deviation row; `AGENTS.md` Key docs gains the historical-record
  layer line.
- **R7-9 (lockstep)**: SKILL v1.2.0 → v1.3.0 (Appendix A Session 7 row,
  frontmatter state); README status table + gate line advance; AGENTS plans
  map lists seven plans; worklog Task 7; this plan's execution record.
- **R7-10**: captures 21/22 (the dev-server landing 1280×800 + the open
  mobile menu 390×844) on the FIXED dev script, before the gate build.
- **R7-11**: full gate on the exact commit tree → Conventional Commit on
  `main` → SSH-wrapper push (dry-run first).

## Acceptance criteria

1. Both new pins GREEN; the full gate green (lint 0/0 · tsc 0 · unit
   405+2 · build · smoke 15/15 · e2e 48/48 · census MATCH).
2. `rg "coercion-guards|THIRTEEN|twelve body|405-char|walk67|141-char"` over
   `src/ tests/` returns nothing.
3. The dev server (via `bun run dev`) holds a page stable for 10s+ with the
   mobile menu opening, navigating, and auto-closing — the standing parity
   task unblocked.
4. Live parity re-verified: mobile menu 390×844 (closed/open/navigate),
   /Tool, /login, /Dashboard 404 + derived title, sitemap/robots/manifest.

## Execution record

- **R7-1 (RED)**: both pins written and verified failing against the
  pre-cure tree — body-pregate's coercion-family retirement pin and
  type-gate's dev-script watch-root contract.
- **R7-2 (GREEN, F7-0)**: `"dev": "next dev -p 3000"` — the tee
  retired. Live-verified via `bun run dev`: no `dev.log` created, the
  page marker survives 10s+, one page load total, and the full mobile
  menu walk (open → 5 links + brand → click-through Pricing →
  auto-close → correct title) passes.
- **R7-3 (F7-1)**: the ten dead helpers deleted (~87 lines) with an
  accurate retirement note; the MAX_AUTH_BODY_BYTES comment rewritten
  to the real family (six parseBody auth routes + generate/contact
  route-local). All live exports asserted intact.
- **R7-4..R7-7 (F7-2..F7-5)**: site.ts re-attributed (D-4 superset,
  170 chars); not-found.tsx rewritten (the dormant root boundary, the
  catch-all architecture, no phantom bundle/claims); not-found-body
  re-attributed to the dossier/e2e pins; all five char labels
  (141×3, 405×2) corrected to 170 — the sweep initially caught three
  more label sites than the audit's list (manifest route, layout,
  landing page), all cured in the same commit.
- **R7-8**: the soft-nav-titles Deviations row (Verified) added to
  implementation-plan.md §6; AGENTS' Key docs gains the
  historical-record layer line.
- **R7-9**: SKILL v1.3.0 (Session 7 row, frontmatter state, Appendix B
  re-certification advanced); README status table + gate line; AGENTS
  plans map (seven) + 407 count; CLAUDE/PAD counts; worklog Task 7.
- **R7-10**: captures 21/22 taken on the fixed dev script, before the
  gate build, PIL-verified (99.7% / 99.9%).
- **R7-11**: **FULL GATE GREEN** on the exact commit tree — lint 0/0 ·
  tsc 0 · unit 407/407 (29 files, +2) · build · smoke 15/15 · e2e
  48/48 (8 specs) · census MATCH (1 user + 0 messages). Conventional
  Commit on `main` → SSH-wrapper push (dry-run first).
