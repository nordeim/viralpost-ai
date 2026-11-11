我将接手这个持续进行的任务。简报已更新至 session_21/session_22 文档。让我先设置好工作区并制定任务计划。
代码库已克隆——处于 `main` 分支，最新的 `commit` 是 `session-21` 审计修复。我注意到该代码库中已经包含 `db/`、`.env.example`、`vitest.config.mts`、`playwright.config.ts` 和 `tests/`。现在开始阅读项目文档：
Now reading README.md and Project_Architecture_Document.md:
Reading the Project Architecture Document:
Now reading the viralpost-ai_SKILL.md (distilled engineering memory):
Now reading the session docs — session_21.md, session_22.md, and the session-21 plan:
session_22.md 是上一次会话的记录，确认我当前执行的任务即为 session 22。现在正在读取 session-21 的计划和工作日志末尾：
I now have the full picture of the project state. Marking doc review complete and setting up the environment to validate the baseline:
Creating `.env` and initializing the database:
`DATABASE_URL` 契约已完成端到端验证（`db/custom.db` 位于仓库根目录，census 匹配）。正在运行基准检查（lint + typecheck + unit）：
Baseline gate GREEN — matches the session-21 delivery record exactly (lint 0/0 · tsc 0 · unit 586/586, 37 files). Now validating the standing asks against the codebase:
正在验证 SEO 相关部分 (sitemap/robots/manifest/site.ts)：
SEO surfaces verified. Now reviewing the repo skills catalog for the audit phase:
Web 应用技能已内化。现在正在克隆 `neo-crm` 以验证其 `HEAD` 状态，并检查 `agent-browser` 技能：
neo-crm is at HEAD `b3d0fbe` — unchanged since session-12's review; recorded decisions stand. Now dispatching three parallel audit subagents (the established session pattern):
所有三项审计已返回：**AUDIT-1: 0C/0H/1M/1L/5I · AUDIT-2: 0C/0H/1M/3L/3I · AUDIT-3: 0C/0H/0M/3L/4I**。现在正在源码中手动验证关键发现：
A1-1 and A2-1 verified in source. Verifying the remaining findings:
所有关键发现已验证。正在检查剩余的发现 (error-boundaries pin, smoke script, .gitignore, a11y docs claim)：
所有审计发现均已验证。已标记审计任务完成。现在开始使用 agent-browser 进行实时的对等走查：
agent-browser 已准备就绪。开始针对线上参考环境进行一致性走查 —— 先进行登录：
Logged into the reference. Running the five-route head census:
Head census — NO DRIFT (the session-19/21 description family holds byte-for-byte). Now the computed-style control census on the reference:
Reference control census captured — sRGB gradients confirmed on all surfaces. Checking the /Pricing Pro-card CTA and the mobile menu:
**LIVE DRIFT FOUND** — the reference's mobile menu has changed back since session 21: pill text is now "Upgrade to Pro – $19" (no hover family), and the menu links dropped the desktop underline affordances. Capturing the desktop census for completeness:
桌面端导航未改变（LINK_BASE 家族完好）。移动端下拉菜单显示出三处实时偏差。正在检查其余表面——悬浮图标、`sitemap`/`robots` 以及生成器：
参考着陆页标题已捕获。现在正将我们的克隆版本侧与此进行对比——正在启动开发服务器：
Landing headings are identical 1:1. Comparing the monetization floaters on both sides:
悬浮元素 —— 无偏差（每侧 10 个，类名和实时变换相同）。现在正在 390×844 分辨率下检查克隆的移动端菜单（用户特别指出的问题）：
完整的偏差情况已浮现。现在正通过计算样式对比，验证克隆端与参考端在桌面导航和移动端胶囊组件上的差异：
参考项目的汉堡菜单现在在打开状态下显示 `aria-expanded="true"` + `aria-label="Close menu"`。正在检查我们克隆项目的重标记行为及参考项目的关闭状态标签：
双方的一致性协定达成一致。正在验证我们克隆版本中的桌面导航栏导航栏和胶囊按钮，以及生成器的往返流程：
Desktop nav identical, generator round-trip green. Checking the login page and footer on both sides for completeness:
一致性对比（parity walk）已完成。在撰写整改计划（remediation plan）之前，正在验证几个剩余的代码层面细节（重置密码渲染、导航栏导航/胶囊按钮来源、登录重置提交模式）：
我已经掌握了完整的情况。正在检查现有的截图，然后编写整改计划：
Now writing the session-22 remediation plan:
计划已编写。现在对照代码库验证计划的锚点 —— 检查 `pin landscape`：
已找到固定点。正在读取 e2e mobile-navigation 规范和错误边界测试，以验证计划的锚点：
计划已验证 —— 所有锚点已确认。现在开始执行 TDD。**首先处理 R22-1/R22-2（移动端菜单重新锚定）** —— 编写 RED 引脚：
Now updating the e2e pin (same TDD batch) and confirming RED:
RED 已确认。现在转为 GREEN — 应用 navbar 修复：
GREEN. Running the full unit suite to catch any co-pinned faces:
586/586 — 未触及其他协同绑定的界面。现在进行 **R22-3 (chunk-recovery storage)** — 首先编写 RED pins：
现在正在为移交了存储的边界表单重新锚定 `error-boundaries` 的 `pin`（仍然为 RED 状态），然后应用这两处修复：
RED confirmed (3). Applying GREEN cures — the seam fail-safe and both boundary wirings:
R22-3 GREEN (30/30). Now **R22-4 (panel scroll arm)** — RED pin first:
R22-4 GREEN. Now **R22-5 (reset submit pending face)** — finding the pin home in login-views.test.ts:
正在编写 R22-5 RED pin：
R22-5 GREEN. Now **R22-6 (signup name message)** — RED pin in schemas.test.ts:
R22-6 GREEN。现在进行 **R22-7 (trustedDependencies)** —— 首先在 `type-gate.test.ts` 中固化 RED：
R22-7 GREEN（lockfile 已同步，postinstall 已激活）。现在进行 **R22-9（错误边界 AA + focus-visible）** —— 首先检查现有样式，然后进行 RED：
R22-9 GREEN. Now **R22-10 (skip-to-content link)** — reading the (site) layout and writing the RED pin:
R22-10 GREEN. Now **R22-8 (a11y matrix extension)** — reading the spec and matrix:
Extending the a11y matrix — first checking how the docs-counts census computes the e2e expansion:
Now applying the a11y matrix extension (R22-8) and the anti-dodge guard (R22-14):
现在，在最终确定 census constants 之前添加 icon request leg (R22-13)：
Census constants will be finalized after all pins land. Continuing with **R22-15 (iat shape guard)**:
将 S22-16 iat pin 添加到 session tokens 的 describe 中：
R22-15 GREEN. Now **R22-16 (db-path standalone anchor)** — reading the seam and its tests:
R22-16 GREEN. Fixing the companion comment (the last-resort precision), then **R22-17/R22-18 (boot warnings)**:
Adding both boot-env RED pins (S22-18 hops predicate + S22-19 path-carrying origin):
4 existing tests broke — investigating the interference:
Bare origin 的路径名是 `"/"`，而不是 `""`。正在修复该检查：
`parseInt("1.5")` = 1 —— 该 seam 接受截断形式；我之前的测试预期有误。正在修复：
The count-census REDs are the lockstep gate driving the docs updates (expected mid-round). Checking the step-less census failure first:
这三个 census 失败是我自己的批量修改所带来的误报/规则冲突：包括注释文本 `skip-to-content`（匹配 `to-content`）、`string-concat`（匹配 `ring-concat`），以及一个被禁止的循环注册 `it(`。正在修复这三个问题：
Now unrolling the loop-registered test in error-boundaries.test.ts:
现在正在更新计数基准（count census）——首先获取实时计数：
实时统计：**unit 599/37 · e2e 63/9 · badge 662**。正在更新 census（常量 + 扩展公式 + 反规避防御）：
The anti-dodge regex would false-positive on legitimate assertion loops (e.g. seo.spec's `for (const path of ...)`). Refining to test-registration shapes only:
Census updated. Now getting new line counts for the PAD §12 rows and updating all doc count sites:
Fixing the remaining count formats and the false-positive regex (first-statement shape only):
Census GREEN。完整单元套件检查：
**599/599 GREEN.** Now the script/config batch (R22-11, R22-12):
我刚才犯了个错误——函数未被插入（仅有调用）。正在修复：
现在是关于 comment-truth 批次（R22-19/R22-20）：
现在处理 SKILL §8 中 hamburger-aria 声明的重新锚定：
Checking the Deviations Ledger for the aria claim, then running the full verification pass:
**599/599 GREEN · lint 0/0 · tsc 0.** 现在正在 `dev server` 上实时验证修复（通过 `agent-browser`）：
Menu cures live-verified — byte-identical to the reference. Now verifying the panel scroll arm and the skip link:
Scroll arm + skip link live-verified. Testing the skip link reveal on focus:
跳过链接定位在滚动时落在了视口（viewport）之外 —— `absolute` 应该设为 `fixed`。正在修复：
跳过链接修复。在 `/login` 上实时验证重置提交的等待状态：
单 tick 采样无法看到 React 的异步重新渲染。使用 microtask 延迟进行采样：
本地 API 在 80ms 内完成解析——该挂起状态与（经过 e2e 测试的）同级组件完全通过相同的路径进行连接。现在正实时验证 signup name 消息：
名称消息已实时验证。正在计算记录中的 `amber` 渐变增量（同系列阈值声明）：
增量为 (0,0,2) — 确实低于感知阈值；同系列姿态得以维持。现在开始进行文档的同步工作 —— README 的 session-22 行：
`session-21` 历史行错误地继承了新的徽章编号。正在修复历史数据并添加 `session-22` 行：
Now the AGENTS plans map, SKILL frontmatter/Appendix A, and worklog Task 22:
修复 session-21 Appendix 行中被损坏的 badge，并添加 session-22 行：
现在是截图 51/52（landing 1280×800 + 打开移动端菜单 390×844，在 dev server 上）：
Captures PIL-verified. Stopping the dev server and running the full gate:
在 gate 运行期间，编写 worklog Task 22：
现在开始编写 session_22.md 的 round log（替换掉交接记录）：
Appending the plan's post-execution record:
后台进程在工具调用之间中断了（沙盒特性）。正在前台分阶段运行门禁：
**全量检查通过：lint 0/0 · tsc 0 · unit 599/599 · build · smoke 15/15 · e2e 63/63。** 最终普查 + git 状态：
一切就绪。正在读取 SSH wrapper runbook 以准备推送：
Runbook internalized. Creating the Conventional Commit:
提交 `254cf9c` 已创建。现在开始设置 SSH 密钥并进行 wrapper 推送：
没有 OpenSSH 二进制文件 —— 这是文档记录的场景。正在部署 paramiko shim：
Key verified (ed25519). Running the wrapper dry-run:
试运行成功（fast-forward `fa18dcf..254cf9c`）。正在执行实际推送：
**Session 22 完成 — 已推送 `254cf9c` 到 main，远程已验证，密钥已销毁，工作树干净。**

## 本轮成果

**基线**：全新克隆 `fa18dcf`，五份核心文档 + session-21 文档集审阅，基线 gate 与交付记录一致（586/37 unit）。

**审计**（三并行子代理 + 人工验证）：**0C / 0H / 2M / 7L / 12I**。两个 Medium：chunk-recovery 冷却在生产环境失效（边界从未传入 storage）、移动菜单面板在首页滚动进浅色区后保持透明（对比度 ~1.48:1）。

**对等走查发现参考端移动菜单回退到 session-1 形态**（session-21 的捕获是瞬态部署状态），三项漂移全部 TDD 治愈并实时验证逐字节一致：
- Pill 文本回到 "Upgrade to Pro – $19"、裸类形式（无 hover 族）
- 菜单链接回到裸移动族（下划线族退役）
- 汉堡 aria 族现为对等（参考端自己也加了）

**审计批次**：忘记密码提交的 pending 态、注册名超长消息（实时验证）、Bun trustedDependencies 迁移（退役死配置 allowScripts）、a11y 矩阵扩展到 /signup + /reset-password（“每路由两宽度” 文档声明重新成立）、错误边界 AA 对比度 + focus-visible 族、skip-to-content 链接、smoke 脚本 GNU/BSD 可移植性 + 有界 curl、WAL gitignore、图标解析 e2e 腿、census 反规避形状、iat 形状守卫、standalone 锚点配对门、hops 警告谓词对齐、路径携带源警告、注释真值批次。

**最终 gate**：lint 0/0 · tsc 0 · **unit 599/599**（37 文件）· build · smoke 15/15 · **e2e 63/63**（9 specs）· census MATCH · 徽章 644→662，SKILL v1.18.0，截图 51/52，六文档 + worklog + 会话日志 + 计划后执行记录全部同步。

随时可再次运行 standing instruction —— 它将作为 session 23 在 `254cf9c` 上继续。
