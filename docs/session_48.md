继续 session-47 的运行。让我检查一下工作区状态和 wiring pin。
Environment restored, census MATCH at `77ca641`. Re-applying the session-47 change set from the validated plan. Starting with the source seams.
52/52 (+3). Now db-path.test.ts — the helper, the S46-6 wrap, and the anchor-order pin.
47/47 (+1)。现在来固定 reveal + CLS + semantic-prose 组件。
现在进行 Batch 2 —— comment-truth 修复。首先是 db-path.ts 的 artifact-anchor 重写。
S47-9 GREEN，计数普查（census）正如预期般呈红色（设计使然）。接下来进行第 4 批（Batch 4）—— 常量和文档站点的重新锚定（re-anchor）。
**Census GREEN (41/41)**。现在处理 SKILL Appendix A 的 row、README 的 session-47 row、D-1 bracket、worklog、session log 以及 plan。
在重新构建的树上重新验证这四个 mutation battery（原规范——在重置后必须重新验证）。
在重建的树上，**所有四个电池已重新验证**。现在进入完整关卡。
**FULL GATE GREEN** — all 70 e2e (including the 3 new legs) pass. Now the parity walk re-run on the reference.
参考端已重新验证 — 所有面均保持一致。现在进行修复后代码的克隆端遍历。
Generator works (5 hashtags + Copy — the superset; the earlier no-op was walk-tooling, not an app defect). Desktop nav + head census now.
**遍历重新运行完成 —— 所有克隆面均匹配，无偏差。** 现在进行截图 101/102：`dev server` 上的 `mobile-menu` 打开状态为 390×844 + `landing hero` 为 1280×800。
Capture 101 is wrong — it caught 1280×800 (the browser was at desktop viewport). Redoing at 390×844 with the menu open.
Both captures verified. Now **Batch 6** — the tree check, commit, and push.
代码树正是设计好的变更集。先阅读 SSH wrapper runbook，然后再进行 commit。
Runbook internalized. Checking for ssh/paramiko, then committing.
Shim 已部署。现在正在将操作员密钥具体化到仓库外部（根据运行手册，绝不打印它），然后进行提交。
已提交 `2a48ce8` 到 main 分支。现在进行 dry-run，随后执行实际的 push。
Dry-run clean — remote at `77ca641`, fast-forward to `2a48ce8`. Real push now.
已验证远程引用：`2a48ce8` 已在 GitHub 的 main 分支上。正在销毁操作员密钥并进行清理。
**会话 47 — 已交付** (提交 `2a48ce8`，已通过 SSH 包装器推送到 main 分支，远程仓库已验证，密钥已销毁，无新分支)。

**本轮所做工作：** 文档审查 + 绿灯基线；全面审计（3 个并行子智能体 + neo-crm 检查 — 0C/0H/2M/6L/7I）；第 20 次连续干净的对照运行（移动端菜单完美运行 — 面板字节一致，两边的 cursor 均为 pointer，censused-parity 状态保持）；以及 TDD 修复：基于实时探测的 artifact-anchor 真相、shadow-env 启动警告、reveal-settle 锁定（填补了 `toBeVisible` 的 opacity-0 盲区）、锚点顺序锁定、hero CLS + 跳过链接 + toast-dismiss 分支，以及五站点 stale-prose 重新拼写 + wrap-blind 普查。已证明四个变异测试。

**最终状态：** lint 0/0 · tsc 0 · 单元 711/711 · build · smoke 16/16 · e2e 70/70 · 普查匹配 · 徽章 781；捕获了 101/102 个 PIL 验证结果；文档已同步（SKILL v1.43.0，溯源 1..47）。工作区在中途重置后已根据已验证的计划进行了重建 — 每个测试都在重建后的代码树上进行了重新验证。

下一步：随时针对 `2a48ce8` 进行会话 48。
