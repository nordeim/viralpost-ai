我将开始执行这个任务。首先检查本地工作区状态并刷新代码库。
仓库已克隆，位于 main 分支。现在查看项目结构：
克隆成功。现在按顺序审查核心文档。先读取 `AGENTS.md`、`CLAUDE.md`、`README.md`：
读取 PAD 和 SKILL 的完整持久化输出：
文档较大，我将重点读取会话文档和关键章节。先读 `docs/session_20.md`、`docs/session_21.md`：
现在读取 session-20 计划和 worklog：
现在验证代码库当前状态。检查 package.json、.env.example、schema、配置文件：
环境是全新状态。先快速验证关键代码接缝，再搭建环境。检查 schema、db-path、测试配置：
代码库与文档一致。现在搭建环境 — bun install、.env、DB 初始化：
环境就绪：DATABASE_URL 契约验证 ✓，census MATCH ✓。运行基线 gate：
**基线 gate GREEN：lint 0/0 · tsc 0 · unit 571/571 (37 文件)** — 与 session-20 交付记录完全一致。

现在查阅仓库技能目录：
技能已内化。现在检查 neo-crm 状态和参考应用可达性，同时启动审计：
neo-crm 位于 `b3d0fbe` — 与 session 12 审查时相比无变化，已记录的决策仍然有效。现在正在分派三个并行审计子代理（session-20 模式）：
三份审计报告已收到：**AUDIT-1: 0C/0H/0M/2L/5I · AUDIT-2: 0C/0H/1M/3L/4I · AUDIT-3: 0C/0H/0M/6L/5I**。现在手工验证核心发现：
A2-1 验证：三个 teal→amber 渐变面存在，doctrine 文本存在，src/ 中无内联渐变。继续验证其他发现：
所有核心发现已在源码中验证。现在查阅 agent-browser 技能并进行实时对等走查：
agent-browser 可用。启动克隆端 dev server 并开始参考端走查：
已登录参考端。运行五路由 head census（参考端 `/` 先行）：
参考端 head census 与 session-19 描述族完全一致。检查参考端渐变的计算样式（A2-1 关键问题）：
**关键发现（A2-1 实时验证）**：参考端渐变是 `linear-gradient(to right, rgb(45,212,191), rgb(251,191,36))` — **sRGB 插值，无 `in oklab`**。检查克隆端同一表面：
**A2-1 实时确认 — 真实对等性漂移**：参考端 sRGB 插值 vs 克隆端 oklab，端点相同但中带漂移 ΔR≈26。做全页渐变 census 对比两端的全部渐变表面：
两端渐变端点/方向一致，但克隆端全部携带 `in oklab`。发现计数差异（amber 组 3v2、teal 组 2v3）。枚举具体元素定位差异：
发现两个潜在漂移点：克隆端 footer 缺少 “Upgrade – $19” 链接，且移动端菜单渲染方式不同。逐一核查 — 先看两端 footer：
页脚链接一致。检查克隆端页脚 “Upgrade – $19” 链接的计算样式（为何未出现在 census 中）：
**发现真实漂移**：参考端 footer Upgrade 是 `teal-500 → teal-600`，克隆端是 `teal-400 → teal-600`。确认参考端的类名：
**确认 footer CTA 漂移**：参考端 `inline-block from-teal-500 to-teal-600 text-white`，克隆端 `inline-flex from-teal-400 to-teal-600 text-slate-900`。查看克隆端源码：
参考端 footer 链接为纯文本无图标。现在检查移动端菜单族（390×844，参考端先）：
参考端移动菜单已打开（5 个目的地 + hero/定价 CTA）。现在克隆端同样操作：
克隆端移动菜单链接 census 与参考端完全一致（footer socials 的 `#` vs 真实链接是已记录的超集修复）。检查两端移动菜单 Upgrade pill 的类与渐变：
其他 CTA 类名一致，仅 oklab 差异。Pricing 卡片 CTA 有细微差异（`block`）。获取完整类名对比：
**Pricing 卡片 CTA 漂移确认**。查找克隆端源码位置：
对两端所有链接/按钮做系统性类名对比（1280×800 桌面端）：
需要更精确的分析 — 按原始顺序检查两份 census 中所有 “Upgrade” 元素：
需要厘清移动菜单 Upgrade pill。打印克隆端桌面 DOM census 的完整菜单区域：
检查克隆端 navbar 源码中的菜单 pill 结构：
获取参考端移动菜单第 5 个目的地（Upgrade pill）的完整类名和文本：
参考端移动菜单链接使用桌面导航类族，克隆端使用移动专用类族。检查证据档案中 session-1 的原始捕获：
参考端移动菜单现在复用桌面链接类族且 pill 文本为 "Upgrade to Pro"。检查参考端下拉面板的容器结构：
检查偏差台账中移动菜单的记录：
检查 e2e mobile-navigation 规格中已固定的菜单断言：
检查 e2e a11y 电池是否扫描打开的菜单及使用的规则集：
a11y 电池仅扫描关闭状态的菜单（wcag2aa 标签，无 2.2 规则）。完成剩余对等走查 — monetization 浮标动画和 sitemap/robots：
Monetization 浮标两端一致（10 个、同类名、活体变换）✓。检查 sitemap/robots：
Sitemap/robots 一致（仅源站差异）✓。验证克隆端生成器往返：
**对等走查完成**。5 项实时漂移确认（P1-P5）。验证 Tailwind 验证报告中的相关声明（A2-1 的文档面）：
验证报告的 trap-3 声明确认为模板残留（本树无 arbitrary 渐变形式）。读取三个渐变治愈点的完整源码：
检查落地页内联定价块（A2-4 重复）中的 CTA：
所有发现已验证。现在验证固定测试的锚点情况（cure 站点涉及的现有 pins）：
锚点已验证。现在编写 session-21 修复计划：
计划已编写。现在验证计划与代码库的对齐（e2e spec 结构、固定位置）：
auth.spec.ts 是 /signup 腿的正确归宿。计划验证完毕，开始 TDD 执行。先读取 landing-page.test.ts 的相关 describe 块：
现在编写 R21-1 至 R21-5 的 RED pins。先加 landing-page.test.ts 的 CTA/menu 固定：
修正 S21-3 pin — 需要唯一定位菜单 pill 的强断言（桌面 pill 会误满足弱片段）：
现在添加 R21-5 的 design-tokens pins。先看该文件结构：
**RED 确认 — 7 个 pins 全部失败**。现在 GREEN：应用治愈。R21-1 footer CTA：
R21-2 Pro 卡片 CTA + R21-5 sections.tsx 两处内联渐变：
R21-5 logo.tsx wordmark + R21-3/R21-4 navbar 菜单治愈：
S21-4 需要修正 — 模板组合使源码中不存在完整字符串。改为内联完整字面量：
7 个 pins 全部 GREEN。更新 e2e 引用（菜单 pill 文本变了）：
运行 R21-5 mutation battery（种回缺陷 → 确认 pin 变红 → 恢复）：
**R21-5 mutation battery 完成**。现在 R21-6 — 读取 reset-password-screen.tsx 全文：
查看 login-card 的 S19-10 focus 模式以精确镜像：
写 R21-6 的 RED pin（a11y-controls.test.ts）：
RED 确认。应用 R21-6 GREEN 治愈：
R21-6 已通过。R21-7 — 读取 OTP 输入渲染区：
添加 R21-7 RED pin（新 describe，属于本仓库 session-21）：
RED 确认。应用 R21-7 GREEN 治愈：
现在将 `onPaste` 处理程序添加到 JSX 输入中：
R21-7 GREEN。R21-8 — 查看 db-path.test.ts 现有 parseEnvFile 测试：
修正第三个测试用例 — `abc#def` 无空格前导应保留完整值（dotenv 语义）：
RED 确认。应用 R21-8 GREEN — parseEnvFile 内联注释剥离：
实现有缺陷 — 引号后跟注释（`"v" # note`）和引号内含 `#`（`"a # b"`）两种情况需 dotenv 式扫描。重写：
bun 发现了父级 .env — 需要隔离验证。重新实验：
bun 的规则更简单：非引号值在任何 `#` 处截断（无需前置空白）。为签名匹配必须精确镜像 bun。更新解析器和测试：
截断后需去除尾部空白：
R21-8 GREEN。R21-9 — 添加 /signup e2e 腿到 auth.spec.ts：
验证 /signup 页面结构以确保断言正确：
/signup 页面验证通过。R21-10 — reset-password 元数据 pin：
代码治愈完成。3 个预期 census 差异（计数重锚）。获取实时计数：
实时计数：unit 586（571+15 新 pins）、e2e 58。检查 docs-counts census 与 PAD §12 行：
应用计数重锚 — docs-counts 常量、PAD §12 行：
lockstep gate 正在驱动文档更新。查看 census 断言的精确期望：
census 全 GREEN。现在执行文档/注释批次 R21-11 至 R21-19。R21-11 — PAD 卫生修复：
R21-12 — 血缘批次。先看 http-headers.test.ts 的冲突 describes：
这些文件用行注释。改用行注释后插入：
添加 SKILL 血缘说明（R21-12 收尾）：
R21-13 — PT 重述 + page-titles 措辞；R21-14 — eslint 清理；R21-15 — 警告文本：
修正 page-titles 措辞（产生了笨拙的重复）：
R21-15 — boot-env 警告文本扩展：
R21-16 — schemas 宽容邮箱注释；R21-17 — findUnique 重构：
两个 auth-reset 源 pins 锚定了旧形状 — 按 one-owner 原则重新锚定：
第 110 行的排序 pin 现在空洞（indexOf 返回 -1 仍小于目标）。修正：
R21-18 — Copy 按钮焦点环；R21-19 — matchMedia 守卫：
所有代码治愈完成。运行完整单元套件确认状态：
**单元套件 GREEN：586/586（37 文件）**。实时验证治愈表面：
三个 sRGB 渐变已与参考端逐字节一致。但 footer/pro-card 查找失败 — 检查是否热重载问题：
footer/pro-card 类名与参考端逐字节一致。验证移动菜单（390×844）：
菜单治愈验证通过（pill 文本/类名 + 链接 underline 族）。查找 viewport 设置的正确语法以截图：
视口已设为 390×844。先截取 capture 49（桌面 1280×800 落地页）：
daemon 相对自身 CWD 解析路径 — 使用绝对路径（session-4 教训）：
Capture 49 已验证。Capture 50 — 打开的移动菜单（390×844）：
逐步重做（超时的命令链未完成）：
**截图 49/50 已通过 PIL 验证**。现在进行文档同步。先处理 SKILL 更新：
README session-21 行 + gate line，AGENTS plans map：
worklog Task 21（前置新条目）：
替换 docs/session_21.md 为本轮日志：
Plan 的 post-execution record：
所有文档就位。停止 dev server（session-4 教训）并运行完整 gate：
e2e setup 失败 — 查看详情：
Playwright 浏览器二进制缺失（工作区重置）。安装：
两个 OTP 相关 e2e 失败 — 检查 R21-7 与 e2e 填码方式的交互：
**根因确认**：e2e 用 `fill(code)` 模拟粘贴 — 走 onChange 而非 onPaste。R21-7 拆分后 fill 的多位值只取末位。需将 e2e 改为真实粘贴事件（更忠实于被测行为）。检查两个 spec 的填码点：
设计缺陷发现：`autoComplete="one-time-code"` 的浏览器自动填充走 onChange 带完整代码 — 严格拆分会破坏它。改为混合式（击键追加检测 + 分发臂），e2e 恢复原始 fill（即测试自动填充面）：
e2e 已恢复。重写 onCodeDigit 为混合式设计：
更新 login-views pins 到精化契约：
**E2E 全 GREEN：58/58**。更新三处 R21-7 记录为精化设计，重跑 smoke：
**完整 gate 全 GREEN**。最终 census 确认并检查 git 状态：
最终预提交检查 — 确认无敏感文件、忽略规则正确：
全部良性（模板占位符和测试固定值）。阅读 SSH wrapper 使用说明：
Runbook 已内化。创建 Conventional Commit：
提交 `a8b1c27` 已创建。准备 SSH 密钥并检查 ssh 二进制：
密钥验证通过，shim 已部署。Dry-run：
Dry-run 干净（fast-forward `8c2fdcf..a8b1c27`）。执行真实 push：
**Session 21 完成 — 已推送 `a8b1c27` 到 main，远程已验证，密钥已销毁，工作树干净。**

## 本轮成果总结

**基线**：全新克隆 `8c2fdcf`，五份核心文档 + session-20 文档集审阅，基线 gate 与交付记录完全一致（571/37 unit）。

**审计**（三并行子代理 + 人工验证）：**0C/0H/1M/11L/14I**。

**对等走查发现 5 项实时类级漂移**（session 19 以来首次），全部 TDD 治愈并实时验证：
- **S21-1/2**：footer CTA 与 Pro 卡片 CTA 类名重锚（teal-500/text-white、hover 家族）
- **S21-3/4**：移动菜单 pill 文本改为参考端新文本 "Upgrade to Pro" + 菜单链接采用桌面端下划线族（触控目标布局保留为已记录的超集）
- **S21-5（oklab 渐变治愈）**：v4 全部渐变编译为 `in oklab` 而参考端为 sRGB —— 跨色相品牌渐变（词标/标题/CTA）中带漂移 ΔR≈26；三处改为内联 sRGB 形式，工具类对被 census 禁止，突变测试验证

**审计批次**：重置屏焦点图（S21-6）、OTP 击键/粘贴/自动填充三态分诊（S21-7，中途精化）、parseEnvFile bun 注释对等（S21-8）、/signup 首个 e2e 腿（S21-9）、11 项文档/注释批次（含 CRM session-20 编号冲突重归属、PAD 卫生、eslint 幽灵忽略清理等）。

**最终 gate**：lint 0/0 · tsc 0 · **unit 586/586**（37 文件）· build · smoke 15/15 · **e2e 58/58**（9 specs）· census MATCH。徽章 628→644，SKILL v1.17.0，截图 49/50，六文档 + worklog + 会话日志 + 计划后执行记录全部同步。

随时可再次运行 standing instruction —— 它将作为 session 22 在 `a8b1c27` 上继续。
