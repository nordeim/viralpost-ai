I'll start by internalizing the operating instructions and setting up a structured plan for this comprehensive codebase remediation task.
Repo cloned successfully on `main` branch. Now let me explore the repo structure and review key documentation:
Repo cloned. Now let me read the core documentation files:
README is very large. Let me read it strategically along with the architecture doc:
Now let me review the session documents and worklog:
Now let me review the SKILL doc header and skills catalog:
Now let me validate understanding against the actual codebase:
Config structure validated. Now let me set up the environment and verify the S72 cures in source:
All S72 cures verified in source. Codebase aligns with documented state. Now setting up the environment (`.env`, DB):
The ambient `DATABASE_URL` pollution hazard is live (points outside the repo) — the documented S63+ hazard. Creating `.env` at contract and neutralizing on DB commands:
Census MATCH. Now the baseline gate — lint → typecheck → unit:
Unit 798/798 at session-72 ship counts. Now build + smoke + e2e:
The documented one-time chromium install is needed (bun skips Playwright's postinstall):
**Full baseline gate GREEN** — lint 0/0 · tsc 0 · unit 798/798 · build · smoke 16/16 · e2e 71/71. Now the periodic `bun audit` duty and neo-crm reference check:
neo-crm UNCHANGED at `b3d0fbe` — recorded decisions stand. `bun audit`: same 9 dev-toolchain advisories as sessions 55–72, none on the runtime path. Now let me read the agent-browser skill for the parity walk workflow:
agent-browser is available. Now dispatching the three parallel audit lanes (per the session-55+ precedent) while I run the parity walk:
All three lanes reported: **0 Critical / 0 High / 2 Medium / 3 Low / 3 Info**. Now hand-verifying the load-bearing findings through the real seams (per the doctrine — reproduce before trusting):
**M-1 CONFIRMED LIVE** — `\x01`/`\x7f` leak the secret verbatim through the file-residue arm while `\t` (which is `\s`) masks correctly. Now verifying AUDIT-2 F-1 (outline-none forced-colors genus):
Compiled CSS confirms: `.outline-none{--tw-outline-style:none;outline-style:none}` — the v4 semantics (v3's transparent-outline behavior was renamed `outline-hidden`). Verifying the `outline-hidden` utility exists in the pinned Tailwind 4.3.3:
`outline-hidden` confirmed in the pinned 4.3.3 with exactly the forced-colors transparent-outline arm. Now verifying F-2 (mouse-exit stale tracker) and AUDIT-3's pin absences:
All findings hand-verified. Now the parity walk #46 — REF leg first. Let me check agent-browser's viewport/screenshot capabilities:
Starting the parity walk #46 — REF leg. Logging into the reference site:
Logged into REF (landed on `/Home` — documented posture). Now the mobile battery at 390×844:
Panel open on REF: height 265, no id, classes byte-match documented posture. Now the interaction faces:
Escape R-OPEN ✓, outside-tap R-OPEN ✓. Now route-change face and desktop census:
Desktop census + gradient byte-identical. Now the five-route head census and SEO endpoints on REF:
REF sitemap/robots at documented postures. Now the generator probe on REF:
REF generator DEAD (button stuck disabled, no post after 30s) — documented D-1 posture. **REF leg complete.** Now the CLONE leg — booting the dev server:
Logged into CLONE (landed `/` — documented /Home deviation). Now the clone mobile battery:
Panel census matches (transparent-over-hero posture documented). Now the three interaction faces on the clone:
All three clone interaction faces at documented postures — **no Tailwind v4 bug in the mobile menu**. Now desktop census + gradient + heads + generator probe:
Clone gradient byte-identical. Head census + SEO endpoints via curl:
Heads/SEO identical modulo origin. Now the LIVE generator probe on the clone:
**Parity walk #46 — CLEAN** (generator LIVE on clone with idea-derived hashtag pair; all faces at documented postures). Closing the REF browser and checking the pin landscape for the cure sites:
Now let me verify the bootEnvCheck process-env arm directly (my earlier probe only showed the file arm), and scope the three residue-predicate sites for the one-home extraction:
The process-env arm returns warnings in the report (not console). Re-probing correctly:
**M-1 fully confirmed on both printers** (process-env arm + file arm). Now scoping the three residue-predicate literals for the one-home extraction:
Scoping complete. Checking the remaining pin contexts before writing the plan:
All cure sites scoped. Writing the session-73 remediation plan:
Now the VALIDATE phase — verifying plan assumptions against the codebase (pin sites, census mechanics, count arithmetic):
Provenance mechanics validated. Checking all doc sites carrying the current counts for the lockstep:
Plan validated. Now Phase 1 — writing the pins born RED. First, studying the S72-1a pin pattern:
Now writing Phase 1 pins. First, locating insertion points in boot-env.test.ts:
Writing the S73-1a and S73-2a pins (born RED) to boot-env.test.ts:
Fixing the typo and completing the pin block:
Checking imports for the new pin:
Imports present. Running the new pins to confirm born-RED state:
Both pins born RED exactly as designed. There are 4 `\p{Cc}` sites (one more than the audit found) — checking all:
The 4 sites mapped (three predicates + the face classifier). Now Phase 2 — applying the S73-1b prefix widening and S73-2b one-home extraction. Reading the exact contexts:
Now applying both cures to boot-env.ts:
S73-1b applied. Now the S73-2b one-home extraction — placing the helper before its first consumer:
Now routing the four consumer sites through the helpers:

The plan is fully re-anchored. The session stopped mid-Phase-2 (S73-2b consumer routing). Let me check the exact current state of both modified files:
状态已确认：S73-1b（前缀加宽）和两个辅助程序已完成；四个消费者站点的路由尚未完成。现在让我验证一下 Stage 1 中编写的测试引脚：
Both pins are born-RED and waiting. The S73-2a census requires exactly ONE `\p{Cc}` site file-wide, so all four consumers (three predicates + face classifier) must route through the helpers. Let me read each site's context:
All four sites mapped. Now let me find the S72-3b dotted-arm comment that needs respelling per the plan:
Now I'll complete S73-2b — routing all four consumer sites through the helpers plus the S72-3b comment respell:
All four sites routed. Now verifying the one-home census and running the new pins to confirm they went GREEN:
S73-1a 已设为 GREEN；S73-2a 普查仍显示有 3 处位置。让我来找出这些遗留部分：
这三个分别是 helper 的主体加上它自身提到该字面量的两条注释行。这些注释必须重新措辞，以避免包含该字面量序列：
The multiline comment has tricky quoting. I'll replace the comment block by line index with Python for precision:
Census is now exactly 1. Re-running the S73 pins:
S73-1 and S73-2 are complete (pins GREEN, cures applied). Let me set up the TODO list for the remaining phases and continue:
Now for S73-3a. First, let me survey the focus-paired `outline-none` landscape across src:
Census matches the plan exactly: 18 focus-paired sites across 9 files + 1 bare exempt ToastCard root. Now let me study the a11y-controls test file conventions:
Walker idiom confirmed. Now writing the S73-3a pin (born RED) — appended to a11y-controls.test.ts:
Confirming S73-3a born RED:
S73-3a born RED with 13 offender entries. Before applying the cure, let me understand the error-boundaries pin context:
Now applying the S73-3b cure. First, let me check all test files that reference these spellings, then rename across src/:
Cure applied: 18 renamed, bare ToastCard root kept. Now updating the four pin suites:
sed 命令影响到了我在 a11y-controls 中新建的第 476 行（census）——必须将其恢复以检查已弃用的拼写。另外，还需要更新错误边界守卫：
两个修复均已应用。现在正在运行四个受影响的测试套件：
S73-3 complete. Moving to S73-4 — the toast exit-arm. Let me study the S72-4a pin and the toast.tsx mount effect:
现在让我读取 `toast.tsx` 中的当前挂载效果，以设计 S73-4a/4b：
Now writing the S73-4a pin (born RED) into the S72-4a describe block. Let me find the exact insertion point:
Confirming S73-4a born RED:
Born RED. Now applying the S73-4b cure to toast.tsx:
My old_str was corrupted — retrying with the correct original:
S73-4 已完成。现在进行 S73-5a —— site.ts 中的接缝侧条带定位（seam-side strip pin）。让我检查一下 siteUrl 的结构：
Now let me examine the page-titles siteUrl describe for the S73-5a pin placement:
URL 折叠行为已确认。让我读取完整的 siteUrl describe 以正确放置该 pin：
Appending the S73-5a pin to the siteUrl describe:
现在开始 S73-6a —— 清单组成标记。让我研究一下清单路由和现有的宽松标记：
Let me study the S24-10 composition idiom used by the other SEO pins:
正在 manifest describe 中插入 S73-6a pin：
注释块乱码了，正在清理：
S73-6a GREEN but S73-5a RED — let me see the actual vs expected:
该多斜杠面属于 S28-1 路径携带属性（回退），而不是剥离面。正在将 pin 修正为设计的形状：
全部 6 个 pin 均已到位。现在进入第 3 阶段 —— `revert-plant` 电池。Plant 1：前缀缩窄（prefix narrowing）（必须使 S73-1a 变红）：
指令混乱并超时。让我先检查一下文件状态：
没有找到备份。我将使用一个确定性的 Python plant/test/unplant 脚本来运行该 battery：
String quoting issues — rewriting the battery script with safe triple-quoted raw strings:
 widened 类也出现在注释中——将 anchor 扩大至仅限代码的位置：
空字符串 unplant anchor 会导致失败——现在将 plant 切换为确定性重命名：
之前的失败运行留下了一个 plant —— `toast.tsx` 的 exit-arm 监听器缺失。正在恢复：
toast.tsx restored (23/23 GREEN). Let me verify no other plants leaked, then re-run the battery:
All intact. Re-running the full six-plant battery:
S73-2a 的 plant 设计有误——它经过 control-char helper 进行路由，因此 census 仍然统计为 1。真正的 plant 将一个 `\p{Cc}` 字面量内联回去。正在修复：
6/6 株植物的表现符合设计预期。现在开始 full gate——先进行 lint 和 typecheck：
804 total as designed, but 2 failing — likely the docs-counts lockstep pins (docs not yet updated). Checking:
这是记录在案的锁步流程。让我完整地阅读一下 `docs-counts` 测试，以确定每一个重锚定（re-anchor）站点：
出现两个 lockstep 失败，符合预期。现在让我找出所有已确定（provenance）的站点和统计站点（count sites），以进行 re-anchor：
我来查找一下 docs-counts 测试中十个来源站点的 census：
所有状态已映射。现在开始完整的 lockstep。首先，找出所有 provenance sites：
已统计出十个 provenance sites。让我检查一下现有的 `.env.example` 和 `.env` 合约：
`.env.example` exists and is committed — needs only the provenance re-anchor. Now the lockstep, starting with docs-counts constants and ladder:
现在开始对这十个溯源站点进行重锚定：
十个站点已重新锚定。现在处理 `AGENTS.md` —— 计划映射和计数：
现在我正在重新锚定 AGENTS、CLAUDE 和 README 的计数：
现在开始更新 README —— 徽章、表格、快速入门、session-73 行、gate footer：
现在正在会话 72 的行之后添加会话 73 的行：
README complete. Now the SKILL file version bump. Let me survey its sites:
命令因拼写错误而挂起 —— 正在干净地重试：
§0.5 已重新锚定。现在正在更新 SKILL 版本、状态、清单、附录和 session-73 行：

The command had a malformed quote that hung the shell. Let me re-establish state with simpler commands:
The SKILL file session-73 updates were not yet applied — that's where the session was cut off. Let me verify what state the SKILL file is in:
The SKILL file still shows version 1.68.0 / Session-72 state — §0.5 was re-anchored to 73 but the version/status/session-row updates were cut off. Let me re-read the plan document to re-anchor on the exact remaining scope:
The plan document is fully re-anchored. Note that `Project_Architecture_Document.md`, `worklog.md`, and `docs/session_73.md` are NOT in the modified list — those lockstep items remain, plus the SKILL version bump, screenshots, final gate, and ship. Let me set up the TODO list and verify each remaining item:
docs-counts, README, CLAUDE are locked. Let me verify AGENTS.md's plans-map entry and check the remaining files:
All lockstep state confirmed. Remaining: SKILL version bump, PAD updates, session_73.md formal log, worklog Task 73, plan post-execution record, screenshots, final gate, ship. Let me read the docs-counts test to understand every pinned doc site (so the remaining edits keep it green):
Now let me check the suspicious line in the test (possible corruption) and survey the SKILL's remaining sites:
Line 862 shows a real corruption: `MODEL_WORDSodels.length]` (missing `[m`). This likely came from a sed operation after the last gate run. Let me verify and fix:
The Read tool shows line 862 is correct (`MODEL_WORDS[models.length]`) — the grep output was a display artifact. Let me confirm the file parses:
Parse diags 0 but the console print mangles identically to grep — this smells like a literal ESC (0x1b) byte in the file: `ESC[m` is the ANSI reset sequence, consumed by both output pipes. The Read tool hides it. Let me check the raw bytes:
Conflicting evidence — JSON.stringify shows no escape but the text is missing `[m`. Let me hexdump the exact byte region:
The file is healthy — the `[m` sequence was being eaten by the output display pipeline (Python raw bytes found the healthy form). False alarm; no corruption. Moving on to the SKILL updates. Let me read the sites needing the version bump:
Now I have full context. Let me apply the SKILL updates — version bump, project_state, pre-ship checklist, Appendix-A session-73 row, Appendix-B re-certification:
§0.5 is already at `1..73`. Now applying the SKILL updates:
Now adding the Appendix-A session-73 row after the session-72 row:
SKILL updates complete. Now the PAD (Project_Architecture_Document.md) — let me survey its sites:
No boot-env.ts/toast.tsx rows visible in that §12 excerpt — let me search for their line-count rows elsewhere in the PAD, and get the live line counts:
The inventory census pins §12 rows against live `wc -l`. Let me check which listed files changed this session and their live counts:
All §12 rows already match live counts (the renames were same-line substitutions). Let me check if PAD mentions outline spellings anywhere, then apply the three PAD edits:
State matches the design exactly (18 renamed + 1 exempt ToastCard root). Applying the three PAD edits:
PAD done. Now the formal session_73.md — let me study session_72.md's format as the model:
Now writing the formal session_73.md. First let me check the untracked `.env`'s provenance note (the session-72 precedent refreshed it):
The local `.env` is minimal (no note — the committed `.env.example` carries the provenance site, already at `1..73`). Let me verify the cure facts in source before writing the log:
All facts verified. Now writing the formal session_73.md (reading the current narration first):
Confirmed — it's the owner's narration pad. Writing the formal log now:
Now the plan's post-execution record — let me check the session-72 plan's format:
Now appending the post-execution record to the session-73 plan document:
Plan record done. Now the worklog Task 73 — reading the Task 72 entry as the model:
Appending the worklog Task 73 entry:
Worklog done. Now the screenshots — let me check the dev-server conventions and seed credentials:
Seed credentials confirmed. Let me check for a running dev server and load the agent-browser skill for the captures:
A server is up on :3000. Let me verify it's this repo's dev server with fresh state — checking the process, then rebooting clean to guarantee the captures reflect the remediated tree:
The dev server is this repo's (turbopack, hot-reload). For a clean capture evidence trail I'll reboot it fresh — this also live-verifies the boot gate against the new boot-env.ts:
Dev server is fresh. Now loading the agent-browser skill for the captures:
Now the capture workflow — mobile viewport, login, open menu, capture:
Logged in, landed on `/` (documented posture). Now opening the mobile menu:
The aria superset is active (`Open menu`, `expanded=false`). Opening the panel and capturing:
Panel open with the 4 links + amber CTA, transparent-over-hero posture confirmed. Capturing the mobile menu full-page:
The CLI's CWD differs — using absolute paths:
Mobile capture saved (390×10718, matching the session-72 dimension). Now closing the menu, switching to desktop viewport, capturing the landing:
Both captures saved with dimensions byte-matching session-72's (no layout drift). Now the PIL verification — writing the check script:
The mobile capture reads as mostly white — let me inspect what's actually in it:
The capture is healthy — dark hero, the amber CTA pill clearly present at y=300, light mid-sections (the actual page design alternates themes). My "non-white ratio" blank-check was the wrong metric for a page with legitimately light sections. Fixing the check to uniformity/variance-based:
Amber CTA passed; the hero-gradient box guess was off. Let me locate the gradient text on the desktop capture:
The gradient title lives at y 200-650 (teal-heavy) with the amber end near y 600-650. Updating the hero box:
PIL verification passed. Let me do one visual spot-check of the panel region (small crop, per the image budget discipline):
PIL + DOM checks are the repo's convention (no eyeballs) — captures verified. Closing the browser and checking port isolation before the gate:
Port isolation confirmed (e2e: own port via e2ePort(); smoke: 3210). Now the full gate — lint + typecheck + unit first:
**Unit 804/804 (41 files)** — the lockstep pins are GREEN after the doc re-anchors. Now build + smoke:
**FULL GATE GREEN** — lint 0/0 · tsc 0 · unit 804/804 · build · smoke 16/16 · e2e 71/71. Final census check:
Census MATCH, tree is exactly the expected change set. Final diff sanity, then the Conventional Commit:
Capture sizes byte-match session-72's (840K/1.6M). Committing with the repo's Conventional Commit style:
Committed to main (`c4392e8`, 34 files). Now the push — reading the SSH wrapper runbook:
Runbook loaded. Checking the sandbox's ssh availability, paramiko, and the wrapper's remote handling:
No ssh binary and no paramiko — deploying the shim per the runbook. Installing paramiko first:
Now deploying the paramiko ssh shim to a workspace bin/ outside the repo checkout:
Shim deployed. Now materializing the operator key to /tmp (0600, never inside the repo — per the runbook contract):
The Write tool is restricted to /home/z — placing the key outside the repo checkout instead (satisfies both the sandbox rule and the runbook's never-inside-the-repo contract):
Key parses (ed25519). Dry-run through the wrapper with the shim on PATH:
Dry-run passed — remote at `c3711e4`, our commit `c4392e8` will fast-forward cleanly. Real push:
Push succeeded and verified (`refs/heads/main @ c4392e8 == local HEAD`). Shredding the operator key per the runbook's final step:
All done — key shredded, tree clean, main up to date with origin. Final TODO update:
Session-73 is complete and shipped. Picking up from the mid-Phase-2 interruption, everything was verified against the actual tree and finished exactly per the plan:

**Completed this round**
- **S73-2b finished** — the four `\p{Cc}` consumer sites (three residue-predicate arms + the face classifier) routed through the one-home helpers; the helper's own comments respelled so the census settles at exactly 1.
- **Full lockstep** — SKILL v1.68.0 → **v1.69.0** (frontmatter, Appendix-A session-73 row, Appendix-B re-cert, pre-ship checklist), PAD §8.1/§8.3 at 804/71/16 + header date (S73-7), the formal `docs/session_73.md` (replacing the narration pad), the plan's post-execution record, and worklog Task 73.
- **Captures 153/154** — fresh dev-server boot, mobile menu open at 390×844 + landing at 1440×900, PIL-verified (amber CTA pixel-scanned present, brand gradient detected, dimensions byte-matching session-72's).
- **Full gate GREEN** — lint 0/0 · tsc 0 · unit **804/804** (41 files, the 6 new pins GREEN) · build · smoke 16/16 · e2e 71/71 · census MATCH.

**Ship** — Conventional Commit `c4392e8` on `main` (34 files: 11 src cures, 12 test suites, 11 docs/plan/captures), pushed via `docs/ssh_git_wrapper_v3.py` (dry-run pre-flight → real push → **remote verified: refs/heads/main @ c4392e8 == local HEAD**), operator key shredded after use, working tree clean and in sync with origin.

The repo now sits at the session-73 ship posture with the full audit's both Mediums cured (control-char leak, forced-colors focus), the structural one-home extraction, the toast exit arm, and both teeth pins closing the last unpinned SEO faces.
