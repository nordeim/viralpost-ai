I'll continue the task from where we left off. Let me start by checking the current workspace state and refreshing the repository.
The workspace exists. Let me check git status and pull the latest changes.
仓库目前是最新的，包含 session-16 的内容。让我先制定一个全面的任务计划。
Now let me read the core documents in parallel:
Session 16 已完全交付。本次运行是例行的重新运行（session 17）。让我阅读剩余的核心文档：
文档已消化。当前状态：session 16 已交付 (548 个单元测试 / 56 个 e2e 测试 / 15 个冒烟测试，badge 604，SKILL v1.12.0)。本次运行为例行的重新执行 (session 17)。让我验证一下代码库的配置状态：
配置状态已验证：`.env` 正确，`db/` 位于根目录，`.env.example` 匹配，vitest+playwright 已存在。现在正在检查 SEO 接口和测试配置：
Structure verified. Now running the baseline gate (lint → typecheck → unit):
Baseline gate GREEN at documented counts (lint 0/0 · tsc 0 · unit 548/548). Now checking the skills catalog and neo-crm for drift:
让我读取 `web-application` 技能并查找与 `Tailwind v4` 相关的技能：
Skill internalized. neo-crm unchanged (`b3d0fbe`) — recorded decisions stand. Now let me review the session-16 commit changes and dispatch the comprehensive audit:
Session-16 的修复已在源码中确认。现在正并行派遣全面审计子智能体（subagent），同时我来亲自验证关键部分：
审计完成：0 严重 / 0 高 / 0 中 / 2 低 / 6 信息。在开始规划前，让我先在源码中人工验证这些关键发现：
All findings verified in source. Let me close F17-8's Assumed tail by re-counting the exhaustive-deps flags myself:
Let me check the eslint config and do the dry-run differently:
F17-8 已关闭：确切地确认有 2 个标志，均在 `particle-text.tsx:293` ——断言现已验证。接下来进行针对线上参考的实时一致性检查：
已登录参考站点 — 已跳转至 `/Home`。正在检查移动端汉堡菜单：
Reference menu open — 5 destinations confirmed. Testing navigation auto-close:
Navigation auto-close confirmed (nav menu links invisible after route change). But the OG metadata on /Tool looks different from session-16's record. Let me verify with a fresh direct load:
Fresh load confirms prefixed og:title + per-route canonical on /Tool — matches session-16 record (the earlier reading was the SPA's soft-navigation head quirk). Checking the remaining reference routes:
Reference OG census complete — no drift from session-16 record. Checking sitemap/robots, then walking the clone:
Reference sitemap/robots unchanged. Now starting the clone's dev server (detached) and walking it:
Clone menu open — 5 destinations + brand, matching reference. Testing Escape + focus return and navigation auto-close:
Escape + focus return verified. Testing navigation auto-close:
Clone's menu family fully verified — no drift. Checking clone's OG metadata parity on direct loads:
Full parity confirmed — no drift. Now live-probing the S16-1/S16-2 cure surfaces and the generator on the dev server:
All cures live-confirmed working. The parity walk is complete with no drift. Now examining the surfaces for the session-17 remediation plan:
The toast component already carries the ref+cleanup idiom — mirroring it in the two fire-and-forget timers is a consistency cure. Let me see the full toast pattern:
所有界面已映射。让我读取 `bounded-reader` 测试样式以及 `docs-counts` 清单，以便精确规划：
我来检查一下哪些网站调用了 `readBoundedJson`，以及 e2e/smoke 发送了哪些 content-type：
One gate, three call sites — safe. Checking component source-pin suites for the timer pin placement:
我已经了解整体情况了。在编写计划之前，让我检查一下 `docs-counts` 测试中具体的 `README`/`PAD` 锚点：
Counting pins driven by constants — the table repair is safe. Let me check the remaining details (toast-anatomy suite, PAD §8.1):
All details confirmed. Writing the session-17 remediation plan:
Plan written. Quick validation of the seed claim, then updating TODOs and beginning execution:
Now executing **R17-5** — the RED pin first in bounded-reader.test.ts:
Now the RED verification against the un-cured tree:
RED confirmed — exactly the new pin fails. Now the GREEN cure in api.ts:
GREEN — 42/42. Now the mutation battery for R17-5:
Mutation REDs exactly the new pin. Restoring the cure:
R17-5 complete (api.ts 230→239 lines — PAD §12 re-anchor pending). Now **R17-6** — the timer hygiene RED pin:
The existing pin "copy round-trip flips Copy ⇄ Copied! for 2s" pins the exact timer line — must update in the same commit. Let me read the components fully:
Both components read. Writing the RED source pin first:
E2E only asserts the flip — safe. Adding the RED source pin to landing-page.test.ts:
RED confirmed. Now the GREEN cures — generator-card.tsx first:
Now contact-form.tsx (timer cure + R17-7 noValidate removal):
格式不匹配 —— 让我采用 toast 的单行 effect 风格：
GREEN — 21/21. Now the mutation battery for R17-6 (both faces):
R17-6 complete (both mutation batteries RED→restored→GREEN). Now the comment cures R17-1 and R17-3:
R17-1/R17-3 done. Now R17-4 — the DEPLOYMENT.md re-seed note:
R17-4 已完成。现在开始 R17-2 —— README 表格修复：
Table repaired — one continuous table with the session-17 row. Now **R17-9** — the docs lockstep, starting with the count constants:
The reality census found all count sites. Updating them in lockstep — README first:
Census GREEN — 22/22. Now the SKILL Appendix A session-17 row and Appendix B re-certification:
SKILL updated. Now the PAD §11 re-verification note (R17-8):
Now the worklog Task 17 entry:
Now appending the plan's post-execution record:
Now running lint + typecheck + full unit suite to catch pin fallout:
One census failure — investigating:
The census flags "matched" as a color-utility-shaped token. Let me find where it appears in src/:
My new api.ts comment "substring-matched" trips the census. Let me see the census mechanics:
我来查一下究竟是哪个文本触发了这个正则表达式：
The trigger: "subst**ring**-matched" scans as `ring-matched`. Following the established allowlist precedent (session-13's "url", session-11's English fragments), adding the fragment:
Unit suite GREEN at 550/550. Now R17-10 — the captures on the remediated tree:
Capture 41 PIL-verified. Now capture 42 — the open mobile menu at 390×844:
Both captures PIL-verified (menu DOM-confirmed open before capture). Closing the browser and running the full gate:
Full gate GREEN (lint 0/0 · tsc 0 · unit 550/550 · build · smoke 15/15 · e2e 56/56). Running the census and reviewing the final tree:
Census MATCH, tree intentional. Final pre-commit verification of key edits:
所有已验证 — 一个包含 17 个会话行的连续表格。现在提交：
已创建提交 `0880e6a`。现在正根据操作手册为通过 SSH wrapper 进行的推送做准备：
Runbook internalized. Executing the push sequence — shim check, key materialization with fingerprint verification:
Dry-run clean — fast-forward `81b3ada..0880e6a`. Real push:
**Session 17 complete — pushed `0880e6a` to `main`, remote-verified, key shredded, working tree clean.**

## The round (summary)

**Baseline:** the merged tree (`81b3ada`) passed lint 0/0 · tsc 0 · unit 548/548 (37 files); e2e census 56/9 specs. neo-crm unchanged (`b3d0fbe`) — recorded decisions stand.

**The audit** (with `skills/web-application` + the catalog): **0 Critical / 0 High / 0 Medium** / 2 Low / 6 Informational — the cleanest audit yet. All six session-16 cures re-verified in source **and live** (non-object vocabulary, field messages, bare-`/api` envelope 404, generator round-trip).

**The parity walk (both sides, live):** logged into the reference, verified the mobile menu at 390×844 (no-aria hamburger `md:hidden p-2 text-slate-300`, 5 destinations, auto-close), re-captured the OG family on all five routes via direct loads, sitemap/robots — **no drift**. The clone's menu family (open, Escape + focus return, navigate auto-close, derived titles) all verified. No Tailwind v4 regressions (token censuses green). One finding: the reference's SPA soft-navigation leaves stale canonical/og in the head — only direct loads are parity evidence (noted in the record).

**The cures (TDD, 3 mutation batteries):**
- **S17-5** — the content-type CSRF gate now **parses** the media type (`text/x-application/json` / `application/jsonx` never pass; TDD RED→GREEN + battery)
- **S17-6** — the two marketing reset timers ref-tracked with unmount clears (the toast's idiom mirrored; rapid re-copy now gets its full 2s window; co-pinned, 2 batteries)
- **S17-1/2** — the phantom "signup's 409" comment truth (it answers 400); the README status table repaired (blank lines had broken GFM rendering — sessions 13–16 rendered as prose)
- **S17-3/4/7/8** — generate-500 degradation documented; DEPLOYMENT re-seed note; dead `noValidate={false}` removed; the "exactly 2 exhaustive-deps flags" claim independently re-verified live

**Verified:** unit **550/550** (+2) · e2e 56/56 · smoke 15/15 · census MATCH · badge 606 · captures 41/42 PIL-verified · `.env` / `db/` at root / vitest+playwright / SEO surfaces all confirmed · six docs + SKILL v1.13.0 in lockstep. **Deferred: none** — every finding cured or verified.
