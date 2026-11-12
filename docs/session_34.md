I'll continue the viralpost-ai repository task. Let me start by setting up a task plan and refreshing the workspace.
The workspace exists with prior work. Let me refresh it with git pull.
Pull succeeded — `docs/session_33.md` is new. Now let me review the core documentation.
Now let me read the remaining core docs.
README is large; let me extract key sections efficiently and read the architecture doc and skill.
I have the session 32/33 context. This round is **session 33**. Let me read the session-32 plan (the plan format template) and scan the remaining core docs.
Now let me check the current state of standing contracts and scan the skills catalog.
Standing contracts verified. Now let me check the skills catalog and set up the environment.
Environment ready. Let me install dependencies and read the skills catalog in parallel.
Let me run the baseline gate to validate the documented status (expected: lint 0/0 · tsc 0 · unit 649/649 · smoke 16/16 · e2e 65/65).
Lint 0/0 · tsc 0 · unit 649/649 — matches docs. Now the build.
**FULL BASELINE GATE GREEN** — matches documentation exactly. Let me mark progress and review recent changes for the audit focus.
Now for the audit phase. Let me check the web-application skill (the audit rubric) structure first.
Now dispatching the three parallel audit subagents per the established session pattern (recent-changes focus, web-application skill as rubric).
All three audits returned: combined **0C/0H/0M/4L/4I**. Now hand-verifying the load-bearing findings in source before adjudication.
All comment-only sites confirmed. Now verifying the Windows-URL finding and donor-ledger citations.
Confirmed the POSIX-only absoluteness test. Now verifying the donor-ledger citations and remaining findings.
All findings hand-verified. Adjudication: 3 Lows + 4 Infos, all curable. Now the parity walk phase. Let me check for prior walk scripts and the agent-browser skill.
The session-32 parity walk script is available. Let me start the dev server and run the live parity walk against the reference.
The dev server may have died between commands. Let me check and use a more persistent approach.
Background processes die between commands. I'll run the server and walk in a single invocation.
Walk mostly MATCH. Let me see the truncated tail (login, generator, desktop nav) from the JSON dump.
Walk verdict: **NO DRIFT** — all DIFFs are documented deviations (aria superset, oklab/rgba spelling, file-convention icons, script artifact on sitemap). The generator probe returned null on both sides — let me verify it's a probe artifact, not a regression.
**Parity walk: NO DRIFT — seventh consecutive clean walk.** Mobile menu byte-identical; generator proven green by e2e/smoke (probe artifact on both sides). Now let me read the full db-path.ts to design the S33-2 Windows pins precisely.
现在让我研究一下测试文件结构，以便精确地设计 S33-2/S33-4 pin。
Let me read the existing test fixtures to mirror their shape for the new pins.
Now let me verify the S33-5/S33-6/S33-7 anchors: login-views pin, smoke trap location, README row pins.
All anchors verified. Let me check SKILL §0.5's donor enumeration for S33-3, then examine the remaining login-card structure.
Let me verify remaining details for the plan: login-card pins, sr-only usage, and the (site)/layout comment sites.
Let me read the two `space-y-1.5` comment sites in full to design the prose-safe re-spells.
我来阅读 effectiveDatabaseUrl 的测试样式，并检查 signup 页面的标题。
Let me verify the `rm -f ""` behavior for the smoke trap design, and check the README table header.
`rm -f ""` exits 0 — design confirmed. I now have everything. Let me write the session-33 remediation plan.
Plan written. Now the **plan-validation pass** — probing the exact RED/GREEN predictions against the live code before executing.
The core predictions are confirmed (RED junk shapes + composed GREEN + live shapes unchanged). The regex matrix had a harness bug — let me fix the pairing.
**Plan fully validated** — all RED/GREEN predictions confirmed. Now executing. **Batch 1: the RED pins.** Let me check the login-views reader style first.
`loginCardSrc()` 已存在。我来查看一下 `login-views` 的 `describe` 结构以及 `db-path` 的插入点。
Now applying **Batch 1 — the RED pins**. First, check db-path.test.ts imports.
Now applying the Batch 1 RED pins. First, the three S33-2 pins + S33-4 pin in db-path.test.ts.
Now the S33-5 pin in login-views.test.ts. Let me view the insertion area.
Now the S33-1 census arm in design-tokens.test.ts. Let me check the file's end.
Census RED as designed. Now confirming all Batch 1 RED states.
**Batch 1 confirmed: exactly the designed REDs.** Now **Batch 2 — the GREEN cures**. First, the db-path.ts predicate cure.
S33-2 GREEN (39/39). Now the S33-5 h1 cure and the S33-1 prose re-spells.
Now the six S33-1 prose re-spells across five files.
**Batch 2 GREEN: 129/129.** Now **Batch 3 — the mutation batteries**. First, S33-2: revert both predicates to POSIX-only.
Battery proven — exactly the 3 pins RED. Restoring the cure.
Restored, 39/39 GREEN. Now the S33-4 battery: plant the signature-arm defect.
S33-4 battery proven (composed pin + documented co-pinned arms RED; restored GREEN). Now the S33-5 battery.
The restore sed didn't match (regex metachars). Let me check and fix the file state.
The restore failed due to regex metachars. Fixing with the Edit tool.
S33-5 battery complete. Now the S33-1 compile-probe battery — per-file recompile of the five re-spelled files.
All CLEAN. Let me prove the probe's non-vacuity — compile a synthetic file with the OLD comment spellings (must emit the dead rules).
The probe's `from` must resolve inside the repo. Fixing.
**All batteries proven.** Now **Batch 4 — the donor markers (S33-3)**.
The describe + session-35 title are marked. Let me find any remaining session-36 cites.
Two more unmarked src sites found. Let me check the whole repo for session-36 and mark all remaining sites.
Marking the two src sites and extending §0.5's enumeration.
Found the session-36 cite. Marking both in health/route.ts.
Now the SKILL §0.5 enumeration extension + range re-anchor.
**Batch 4 done.** Now **Batch 5 — the hygiene pair**: smoke trap + README me-row.
**Batches 1-5 complete.** Now **Batch 6 — count re-anchor (constants FIRST)**. Reality check on disk first.
The census caught the stale constants exactly as designed (655 on disk, PAD row 333). Constants FIRST now.
The census is walking the 9 stale sites (the designed transient RED state). Walking them GREEN now — README first.
Now the gate line and the session-33 status row in README.
Now AGENTS.md and CLAUDE.md count sites.
Now the AGENTS plans map (33rd round entry).
Now the PAD count sites and §12 rows.
Now the SKILL: frontmatter, Appendix A session-33 row, Appendix B, pre-ship checklist.
Now the SKILL Appendix A session-33 row.
Now the remaining four provenance sites (1..32 → 1..33).
Census GREEN 27/27. Now worklog Task 33 — checking the format.
Writing worklog Task 33.
Now **Batch 7 — the captures** (73/74 on a fresh dev server). Let me check the prior capture script.
Captures taken with the menu functionally verified open. Copying to docs/screenshots/ and PIL-verifying.
Captures verified. Now the **full gate on the exact commit tree**.
**FULL GATE GREEN: lint 0/0 · tsc 0 · unit 655/655 · build · smoke 16/16 · e2e 65/65 · census MATCH.** Now the formal session log and the plan's post-execution record.
Now the plan's post-execution record.
All round documents written. Verifying the README's new row is prose-safe (the session-32 lesson) and running the final unit pass.
**Batch 8 — commit + push.** Let me check the tree, then read the SSH wrapper runbook.
Runbook internalized. Committing first, then setting up the SSH push infrastructure.
Committed `59d3c52` on main. Now the SSH push — materializing the key outside the repo (never printed).
Dry-run authenticated cleanly. Real push now.
**Session 33 shipped.** Final verification of the commit contents.
## Session 33 — Round Complete and Shipped

**Shipped:** commit `59d3c52` on **main** (no new branches), pushed via `docs/ssh_git_wrapper_v3.py` (dry-run first, remote ref verified `main @ 59d3c52`, operator key + temp material shredded). The tree is clean and `origin/main` is in sync.

**The audit** (three parallel subagents — API/lib seams, components/pages/effects, SEO/configs/tests/docs — web-application skill as rubric, every finding hand-verified in source): **0 Critical / 0 High / 0 Medium / 4 Low / 4 Info** → all cured (S33-1..S33-7), the accepted register carried forward unchanged.

**The parity walk** (live, both sides, logged into the reference): **NO DRIFT — the seventh consecutive fully-clean walk.** The mobile navigation menu matches byte-for-byte in every class family (hamburger, panel, links, pill, bar) and works as expected; the sitemap "DIFF" was diagnosed as the walk script's first-occurrence-only `.replace` artifact (all-occurrence comparison: identical modulo origin). All eight Tailwind v4 traps verified mitigated in the compiled output.

**The cures (all TDD, all mutation batteries on record):**
- **S33-2** — the Windows-absolute `file:` refs: the db-path seam's POSIX-only absoluteness tests re-anchored drive-letter/UNC values into junk paths (live-probed); one shared `isAbsoluteFileRef` predicate now covers both predicates (+3 pins, battery: reverted → exactly 3 RED)
- **S33-1** — the prose-safe sweep completed: four more retired utility tokens re-spelled across five files (~1.5 KB dead CSS retired) + the new dead-token comment census holding the genus (probe vacuity proven)
- **S33-3** — the donor-ledger markers: the bare `session-34/35/36` cites (tests + two src sites) now carry their markers + lineage notes; §0.5's enumeration extended — resolving the collision with this repo's imminent sessions 34/35/36
- **S33-4** — the composed `:memory:` dev-shape pin (+1, battery planted the signature-arm defect)
- **S33-5** — the signup view's sr-only h1 (the superset route's document outline, zero visual change)
- **S33-6/S33-7** — the smoke EXIT-trap temp-file coverage + the README me-row truth fix

**Verified:** full gate green on the exact commit tree — lint 0/0 · tsc 0 · unit **655/655** (38 files) · build · smoke **16/16** · e2e **65/65** (9 specs) · census MATCH · badge **720**. Captures 73/74 PIL-verified. Standing asks re-verified: `.env` holds `DATABASE_URL="file:../db/custom.db"` with `db/` at the repo root; the vitest + playwright suites current; sitemap/SEO contract-complete; `skills/` excluded from every gate; `.env.example` rides the commit (six-knob current, provenance re-anchored to 1..33).

**Deferred (accepted register):** the bun-absolutization causal model's non-reproduction on this sandbox's bun 1.3.14 (re-verify on the deployment bun first), the natural-English prose-collision dead rules, the test-pin literal faces, plus the standing register (in-app delivery default, me-route throttle, 36px targets, cross-tab quota staleness, formatting nits, admin-bootstrap race, Tailwind .md-scanner residual).

Nothing is left broken. The owner's post-ship "update session log" commit will hold the next narration as `docs/session_34.md`; the following round can re-run the standing instruction as-is.
