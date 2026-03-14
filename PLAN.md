# ClawNetwork 官网开发计划

**Date**: 2026-03-13
**Project**: `claw-web/`
**Tech Stack**: Next.js 15 (App Router) + Tailwind CSS 4 + next-intl (i18n)
**Deploy**: Vercel (Pro) — Edge Network 全球 CDN，ISR/SSG 混合

---

## 为什么选 Vercel + Next.js 而非纯静态 + Cloudflare

| 维度 | Vercel + Next.js | Cloudflare Pages |
|------|-----------------|------------------|
| 全球速度 | Edge Network + ISR，全球 PoP | 同级别 CDN |
| 多语言路由 | next-intl 内置 `/en/` `/zh/` 前缀路由 | 需手动实现 |
| 文档系统 | MDX + 代码高亮 + 搜索内置 | 需额外工具链 |
| Block Explorer | Server Component 调用 RPC | 需 Worker 或客户端直调 |
| 你已有 Pro 账号 | 免费构建分钟 + Analytics | 需新建账号 |
| SEO | next/metadata + sitemap 自动生成 | 手动配置 |

**结论**: Vercel Pro 是最优选。纯文档页面 SSG 输出（零服务器成本），Explorer/Wallet 等动态页用 Server Component + Edge Runtime。

---

## 网站结构（Sitemap）

```
/                           → Landing Page（首页）
/docs/                      → 文档首页（概览）
/docs/quickstart            → 快速开始（安装 + 启动节点）
/docs/architecture          → 架构概览（8 crates 详解）
/docs/consensus             → 共识机制（PoS + Agent Score）
/docs/transactions          → 6 种原生交易类型
/docs/tokenomics            → CLW 代币经济
/docs/node-operations       → 节点运维（systemd/launchd/Windows）
/docs/configuration         → 配置参考（CLI flags + config.toml）
/docs/faq                   → 常见问题
/developers/                → 开发者门户
/developers/api-reference   → JSON-RPC API 文档（12 个方法）
/developers/sdk             → TypeScript SDK 文档
/developers/mcp             → MCP Server 集成指南
/developers/examples        → 代码示例集
/explorer/                  → Block Explorer（动态页）
/wallet/                    → Web Wallet（动态页，Phase 2）
/ecosystem/                 → 生态系统（Arena/Market/Genesis）
/blog/                      → Blog（MDX）
/community/                 → 社区链接
```

---

## 技术方案

### 框架 & 依赖

```
next@15             — App Router, RSC, ISR
tailwindcss@4       — CSS 框架（匹配 Stitch 导出的 Tailwind 类名）
next-intl@4         — 国际化（EN/ZH），middleware 路由
next-mdx-remote     — MDX 渲染（文档页）
shiki               — 代码语法高亮（Rust/TS/bash）
fumadocs-core       — 文档框架（TOC、搜索、侧边栏）
framer-motion       — 动画（Hero 粒子、卡片动效）
lucide-react        — 图标库
@vercel/analytics   — Vercel Analytics
```

### 目录结构

```
claw-web/
├── src/
│   ├── app/
│   │   ├── [locale]/              # 多语言路由
│   │   │   ├── layout.tsx         # Root layout (字体/主题)
│   │   │   ├── page.tsx           # Landing page
│   │   │   ├── docs/
│   │   │   │   ├── layout.tsx     # 文档 sidebar layout
│   │   │   │   ├── [[...slug]]/
│   │   │   │   │   └── page.tsx   # MDX 渲染器
│   │   │   ├── developers/
│   │   │   │   ├── page.tsx       # 开发者门户
│   │   │   │   ├── api-reference/
│   │   │   │   ├── sdk/
│   │   │   │   └── mcp/
│   │   │   ├── explorer/
│   │   │   │   └── page.tsx       # Block Explorer
│   │   │   ├── ecosystem/
│   │   │   │   └── page.tsx
│   │   │   └── blog/
│   │   │       └── page.tsx
│   │   └── api/                   # API routes (explorer proxy etc.)
│   ├── components/
│   │   ├── layout/                # Header, Footer, Sidebar
│   │   ├── landing/               # Hero, Stats, Features, Ecosystem...
│   │   ├── docs/                  # DocSearch, TOC, CodeBlock
│   │   ├── explorer/              # BlockTable, TxTable, SearchBar
│   │   └── ui/                    # Button, Card, Badge (通用)
│   ├── lib/
│   │   ├── rpc.ts                 # ClawNetwork JSON-RPC client
│   │   ├── i18n.ts                # next-intl config
│   │   └── constants.ts           # 链参数、RPC endpoints
│   └── content/
│       ├── docs/
│       │   ├── en/                # 英文 MDX 文档
│       │   └── zh/                # 中文 MDX 文档
│       └── blog/
│           ├── en/
│           └── zh/
├── messages/
│   ├── en.json                    # UI 翻译（英文）
│   └── zh.json                    # UI 翻译（中文）
├── public/
│   ├── og-image.png
│   └── favicon.ico
├── next.config.ts
├── tailwind.config.ts
├── package.json
└── tsconfig.json
```

### 多语言方案

- **UI 文本**: `next-intl` — `messages/en.json` + `messages/zh.json`
- **文档内容**: 分目录 MDX — `content/docs/en/quickstart.mdx` + `content/docs/zh/quickstart.mdx`
- **URL 结构**: `/en/docs/quickstart` / `/zh/docs/quickstart`
- **默认语言**: English，middleware 自动检测 `Accept-Language`
- **语言切换**: Header 右上角 EN/ZH toggle

### 设计系统（从 Stitch 提取）

```typescript
// tailwind.config.ts — 匹配 Stitch 导出的设计 token
colors: {
  primary: '#00eeff',
  'accent-purple': '#a855f7',
  'bg-dark': '#060d0d',
  'surface-dark': '#0f2223',
  'border-dark': '#1d3d3f',
}
fontFamily: {
  display: ['Space Grotesk', 'Noto Sans SC', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],
}
```

---

## 开发分期

### Phase 1: Landing + 文档基础（本次交付）

**预计交付**: 可部署的完整网站

| 任务 | 说明 |
|------|------|
| 1.1 项目脚手架 | Next.js 15 + Tailwind 4 + next-intl + TypeScript |
| 1.2 Landing Page | Hero + Stats + Features + How It Works + Ecosystem + Tokenomics + Roadmap + CTA + Footer |
| 1.3 Header & Footer | 响应式导航 + 语言切换 + 移动端汉堡菜单 |
| 1.4 文档系统 | MDX 渲染 + 侧边栏 + TOC + 代码高亮 + 搜索 |
| 1.5 文档内容 (EN) | quickstart, architecture, consensus, transactions, tokenomics, node-ops, config, faq |
| 1.6 文档内容 (ZH) | 上述 8 篇的中文版 |
| 1.7 开发者门户 | API Reference（12 个 RPC 方法）+ SDK 文档 + MCP 指南 |
| 1.8 生态系统页 | Arena / Market / Genesis 介绍卡片 |
| 1.9 SEO & Meta | OG Image, sitemap.xml, robots.txt, structured data |
| 1.10 部署 | Vercel 部署 + 自定义域名配置指引 |

### Phase 2: Explorer + Wallet（后续）

| 任务 | 说明 |
|------|------|
| 2.1 Block Explorer | Dashboard + Block list + TX list + Address page + Search |
| 2.2 Web Wallet | 密钥管理 + 转账 + Token 列表 + Agent 信息 |
| 2.3 实时数据 | WebSocket 订阅链上事件 |
| 2.4 Testnet Faucet | 水龙头 UI |

### Phase 3: 社区 & 运营（后续）

| 任务 | 说明 |
|------|------|
| 3.1 Blog 系统 | MDX blog + RSS |
| 3.2 社区页 | Discord/Telegram/Twitter 聚合 |
| 3.3 Brand Kit | Logo/颜色/字体下载页 |
| 3.4 多语言扩展 | 日文/韩文等 |

---

## 文档内容大纲

### 1. Quick Start (`docs/quickstart`)
- 一键安装（curl | sh / PowerShell）
- `claw-node init` → `claw-node start`
- 验证节点运行（health check）
- 加入 testnet（bootstrap peer）
- 平台差异说明（Linux/macOS/Windows）

### 2. Architecture (`docs/architecture`)
- 8 crates 架构图：types → crypto → state → storage → consensus → p2p → rpc → node
- 单二进制设计理念
- 数据流：TX → mempool → block → state → storage
- 存储引擎 redb
- P2P 网络 libp2p（gossipsub + mdns + request-response）

### 3. Consensus (`docs/consensus`)
- PoS + Agent Score 混合共识
- 权重公式: `stake_weight × 0.4 + agent_score × 0.6`
- 冷启动策略（0.7/0.3 → 0.4/0.6）
- 验证者选举
- 出块时间 3s，单块终局
- Epoch 机制

### 4. Transaction Types (`docs/transactions`)
- 6 种原生 TX 详解 + Borsh 编码格式
- `agent.register` — 身份注册
- `token.transfer` — CLW 转账
- `token.create` — 创建自定义 Token
- `token.mint_transfer` — 铸造/转账自定义 Token
- `reputation.attest` — 信誉证明
- `service.register` — 服务注册/发现
- 手续费计算规则
- Nonce 机制

### 5. Tokenomics (`docs/tokenomics`)
- 总量 1B CLW
- 分配: 40% 节点激励 / 25% 生态 / 15% 团队 / 10% 基金 / 10% 公售
- Gas 燃烧（通缩）
- 区块奖励递减

### 6. Node Operations (`docs/node-operations`)
- Linux: systemd 服务 / nohup
- macOS: launchd plist
- Windows: Task Scheduler / NSSM
- Docker 部署
- 监控: /health + /metrics (Prometheus)
- 日志与排错

### 7. Configuration (`docs/configuration`)
- CLI flags 完整参考
- config.toml 字段说明
- 网络参数（端口、bootstrap、max peers）
- Light mode vs Full mode

### 8. FAQ (`docs/faq`)
- 常见安装问题
- 网络连接问题
- Agent 注册流程
- Token 创建流程

### 9. API Reference (`developers/api-reference`)
- 12 个 JSON-RPC 方法，每个方法：
  - Method name
  - Parameters（类型 + 说明）
  - Response（类型 + 示例）
  - curl 示例
  - SDK 示例
- 方法列表:
  - `clw_blockNumber`
  - `clw_getBlockByNumber`
  - `clw_getBalance`
  - `clw_getTokenBalance`
  - `clw_getAgent`
  - `clw_getReputation`
  - `clw_getServices`
  - `clw_getTransactionReceipt`
  - `clw_sendTransaction`
  - `clw_getNonce`
  - `clw_getTokenInfo`
  - `clw_faucet`

### 10. SDK Guide (`developers/sdk`)
- 安装 `npm install @clawlabz/clawnetwork-sdk`
- 初始化 Client
- 查询余额/区块
- 发送交易（构建 → 签名 → 提交）
- Agent 注册
- Token 操作
- 信誉查询

### 11. MCP Server (`developers/mcp`)
- Claude Code 集成
- 安装与配置
- 可用 tools 列表
- 使用示例

---

## 参考的公链官网最佳实践

| 实践 | 来源 | 应用 |
|------|------|------|
| 实时网络数据 Hero | Solana | Stats section 从 testnet RPC 拉取 |
| 交互式代码示例 | Sui | SDK 文档页带可运行代码块 |
| 文档搜索 | Aptos (Algolia DocSearch) | fumadocs 内置搜索 |
| 多语言文档并行 | Ethereum.org | 分目录 MDX |
| 一键安装命令 | Solana/Sui | Hero + Quick Start 突出 curl 命令 |
| 开发者门户独立 | 几乎所有公链 | /developers/ 独立入口 |
| 生态系统展示 | Celestia | 卡片式项目展示 |

---

## 交付标准

- [ ] Lighthouse Performance ≥ 90
- [ ] 全部页面 SSG/ISR，TTFB ≤ 200ms
- [ ] 移动端完美响应式
- [ ] EN/ZH 双语完整
- [ ] 文档 8 篇 + API Reference + SDK Guide
- [ ] Vercel 一键部署
- [ ] SEO: sitemap + OG + structured data
