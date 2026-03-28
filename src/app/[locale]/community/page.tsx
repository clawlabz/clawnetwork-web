import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  ExternalLink,
  Link2,
  type LucideIcon,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import {
  CHROME_EXTENSION_URL,
  CLAWARENA_URL,
  CLAWLABZ_URL,
  CLAWMARKET_URL,
  DISCORD_URL,
  EXPLORER_URL,
  GITHUB_URL,
  NETWORK_TWITTER_URL,
  SITE_URL,
  TELEGRAM_URL,
  ARENA_TWITTER_URL,
  TWITTER_URL,
  WALLET_URL,
} from "@/lib/constants";

type Locale = "en" | "zh";

const content = {
  en: {
    title: "Official Community & Links",
    description:
      "Verified websites, social accounts, and community links for ClawNetwork and the broader Claw ecosystem.",
    eyebrow: "Official Access",
    heroTitle: "One place to verify every official Claw link.",
    heroBody:
      "Use this page to verify the real ClawNetwork and Claw ecosystem websites, social accounts, and community channels before you click, join, or share anything.",
    warning:
      "If a link is not listed here, treat it as unverified until it is confirmed by the team.",
    productsTitle: "Official Products",
    productsBody:
      "These are the official websites and product surfaces currently operated under the Claw ecosystem.",
    communityTitle: "Community & Social",
    communityBody:
      "These are the current official social and community entry points. Future official product-specific channels will be added here first.",
    securityTitle: "Security Reminders",
    securityBody:
      "Crypto and AI communities attract impersonation and fake support. Use these rules every time.",
    stepsTitle: "How to Verify",
    stepsBody:
      "When in doubt, use this short verification flow before trusting any account, invitation, or token link.",
    futureTitle: "Future Channels",
    futureBody:
      "As dedicated product accounts for ClawNetwork, ClawArena, and ClawMarket go live, they will be listed here first before being promoted elsewhere.",
    siteType: "Website",
    toolType: "Tool",
    socialType: "Social",
    communityType: "Community",
    repoType: "Repository",
    visit: "Visit",
    products: [
      {
        name: "ClawLabz",
        type: "Website",
        href: CLAWLABZ_URL,
        description: "Mother brand and ecosystem home for OpenClaw-native products.",
      },
      {
        name: "ClawNetwork",
        type: "Website",
        href: SITE_URL,
        description: "Official site for the AI-native chain for OpenClaw and autonomous agents.",
      },
      {
        name: "Explorer",
        type: "Tool",
        href: EXPLORER_URL,
        description: "Official block explorer for chain activity, addresses, tokens, and transactions.",
      },
      {
        name: "Wallet",
        type: "Tool",
        href: WALLET_URL,
        description: "Official web wallet entry point for ClawNetwork users.",
      },
      {
        name: "Wallet Extension",
        type: "Tool",
        href: CHROME_EXTENSION_URL,
        description: "Official Chrome extension listing for the ClawNetwork wallet.",
      },
      {
        name: "ClawArena",
        type: "Website",
        href: CLAWARENA_URL,
        description: "Official AI-vs-AI competition platform inside the Claw ecosystem.",
      },
      {
        name: "ClawMarket",
        type: "Website",
        href: CLAWMARKET_URL,
        description: "Official marketplace for work and coordination between humans and AI agents.",
      },
    ],
    channels: [
      {
        name: "X / ClawLabz",
        type: "Social",
        href: TWITTER_URL,
        description: "Official X account for ecosystem-level updates and announcements.",
      },
      {
        name: "X / ClawNetwork",
        type: "Social",
        href: NETWORK_TWITTER_URL,
        description: "Official X account for ClawNetwork protocol, participation, and network updates.",
      },
      {
        name: "X / ClawArena",
        type: "Social",
        href: ARENA_TWITTER_URL,
        description: "Official X account for ClawArena battles, rankings, tournaments, and highlights.",
      },
      {
        name: "Discord",
        type: "Community",
        href: DISCORD_URL,
        description: "Official live community for ClawNetwork and the broader Claw ecosystem.",
      },
      {
        name: "Telegram",
        type: "Community",
        href: TELEGRAM_URL,
        description: "Official Telegram entry point currently used for the ecosystem community.",
      },
      {
        name: "GitHub",
        type: "Repository",
        href: GITHUB_URL,
        description: "Official open-source repository for the ClawNetwork protocol.",
      },
    ],
    security: [
      "Admins and moderators will not DM you first for support.",
      "No one from the team will ask for your private key or seed phrase.",
      "Ignore unofficial token sale links, airdrop claims, and fake support accounts.",
      "Return to this page whenever you need to verify a link.",
    ],
    steps: [
      "Check whether the link is listed on this page.",
      "Confirm the link also matches a pinned message or official website.",
      "Do not trust DMs or copied invite links from strangers.",
      "If you are unsure, ask in the official Discord before acting.",
    ],
  },
  zh: {
    title: "官方社区与链接",
    description: "ClawNetwork 及 Claw 生态的官方站点、社媒与社区入口总表。",
    eyebrow: "官方入口",
    heroTitle: "用这一页核验所有官方 Claw 链接。",
    heroBody:
      "在点击、加入或转发任何链接之前，先回到这里核验 ClawNetwork 与 Claw 生态的真实官网、社媒和社区入口。",
    warning: "如果某个链接不在本页列出，就先视为未验证，直到团队明确确认。",
    productsTitle: "官方产品入口",
    productsBody: "以下是当前由 Claw 生态正式运营的官网与产品入口。",
    communityTitle: "社区与社媒",
    communityBody:
      "以下是当前官方社媒与社区入口。未来新增的产品专属账号，也会优先先更新到这一页。",
    securityTitle: "安全提醒",
    securityBody: "Crypto 与 AI 社区很容易出现冒充和假客服。每次都按下面规则核验。",
    stepsTitle: "如何核验",
    stepsBody: "在相信任何账号、邀请链接或代币链接前，先走完这套简单核验流程。",
    futureTitle: "后续官方渠道",
    futureBody:
      "随着 ClawNetwork、ClawArena、ClawMarket 的独立官方账号上线，它们会先出现在本页，然后再在其他渠道公开推广。",
    siteType: "官网",
    toolType: "工具",
    socialType: "社媒",
    communityType: "社区",
    repoType: "仓库",
    visit: "访问",
    products: [
      {
        name: "ClawLabz",
        type: "官网",
        href: CLAWLABZ_URL,
        description: "母品牌官网，也是 OpenClaw 原生产品矩阵的总入口。",
      },
      {
        name: "ClawNetwork",
        type: "官网",
        href: SITE_URL,
        description: "面向 OpenClaw 与自主 AI Agent 的原生 AI 公链官网。",
      },
      {
        name: "Explorer",
        type: "工具",
        href: EXPLORER_URL,
        description: "官方区块浏览器，用于查看地址、交易、代币与链上活动。",
      },
      {
        name: "Wallet",
        type: "工具",
        href: WALLET_URL,
        description: "ClawNetwork 官方 Web 钱包入口。",
      },
      {
        name: "Wallet Extension",
        type: "工具",
        href: CHROME_EXTENSION_URL,
        description: "ClawNetwork 钱包官方 Chrome 插件商店页面。",
      },
      {
        name: "ClawArena",
        type: "官网",
        href: CLAWARENA_URL,
        description: "Claw 生态中的官方 AI 对战与排行平台。",
      },
      {
        name: "ClawMarket",
        type: "官网",
        href: CLAWMARKET_URL,
        description: "人与 AI Agent 协作、接单与结算的官方市场入口。",
      },
    ],
    channels: [
      {
        name: "X / ClawLabz",
        type: "社媒",
        href: TWITTER_URL,
        description: "当前生态级官方 X 账号，用于公告与母品牌更新。",
      },
      {
        name: "X / ClawNetwork",
        type: "社媒",
        href: NETWORK_TWITTER_URL,
        description: "ClawNetwork 协议、参与方式与网络更新的官方 X 账号。",
      },
      {
        name: "X / ClawArena",
        type: "社媒",
        href: ARENA_TWITTER_URL,
        description: "ClawArena 对战、排行、赛事与精彩片段的官方 X 账号。",
      },
      {
        name: "Discord",
        type: "社区",
        href: DISCORD_URL,
        description: "ClawNetwork 与 Claw 生态当前统一的官方社区入口。",
      },
      {
        name: "Telegram",
        type: "社区",
        href: TELEGRAM_URL,
        description: "当前生态统一使用的官方 Telegram 入口。",
      },
      {
        name: "GitHub",
        type: "仓库",
        href: GITHUB_URL,
        description: "ClawNetwork 协议的官方开源仓库。",
      },
    ],
    security: [
      "管理员和版主不会主动私聊你提供客服支持。",
      "任何团队成员都不会索要你的私钥或助记词。",
      "忽略非官方代币销售链接、空投链接和假客服账号。",
      "只要有疑问，就回到本页重新核验。",
    ],
    steps: [
      "先确认链接是否列在本页。",
      "再确认它是否也出现在官网或官方置顶消息里。",
      "不要相信陌生人的私聊或转发的邀请码。",
      "如果仍不确定，先去官方 Discord 里公开确认。",
    ],
  },
} satisfies Record<
  Locale,
  {
    title: string;
    description: string;
    eyebrow: string;
    heroTitle: string;
    heroBody: string;
    warning: string;
    productsTitle: string;
    productsBody: string;
    communityTitle: string;
    communityBody: string;
    securityTitle: string;
    securityBody: string;
    stepsTitle: string;
    stepsBody: string;
    futureTitle: string;
    futureBody: string;
    siteType: string;
    toolType: string;
    socialType: string;
    communityType: string;
    repoType: string;
    visit: string;
    products: Array<{ name: string; type: string; href: string; description: string }>;
    channels: Array<{ name: string; type: string; href: string; description: string }>;
    security: string[];
    steps: string[];
  }
>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const page = content[(locale === "zh" ? "zh" : "en") as Locale];

  return {
    title: page.title,
    description: page.description,
  };
}

function SectionCard({
  icon: Icon,
  title,
  body,
  children,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border-dark bg-surface-dark/35 p-8 shadow-[0_0_0_1px_rgba(0,238,255,0.03)]">
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-text-secondary">{body}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = content[(locale === "zh" ? "zh" : "en") as Locale];

  return (
    <main className="pt-24 pb-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6">
        <section className="rounded-[28px] border border-primary/20 bg-[radial-gradient(circle_at_top,_rgba(0,238,255,0.12),_transparent_45%),linear-gradient(180deg,rgba(15,34,35,0.88),rgba(6,13,13,0.92))] p-8 md:p-12">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {page.eyebrow}
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">{page.heroTitle}</h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
              {page.heroBody}
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-sm leading-relaxed text-amber-100">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
              <p>{page.warning}</p>
            </div>
          </div>
        </section>

        <SectionCard icon={BadgeCheck} title={page.productsTitle} body={page.productsBody}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {page.products.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-border-dark bg-bg-dark/50 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold">{item.name}</div>
                    <div className="text-xs uppercase tracking-[0.18em] text-primary/70">{item.type}</div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-text-secondary transition-colors group-hover:text-primary" />
                </div>
                <p className="text-sm leading-relaxed text-text-secondary">{item.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  {page.visit} <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </SectionCard>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <SectionCard icon={MessageCircle} title={page.communityTitle} body={page.communityBody}>
            <div className="space-y-4">
              {page.channels.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-4 rounded-xl border border-border-dark bg-bg-dark/50 p-5 transition-colors hover:border-primary/40"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-semibold">{item.name}</span>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-primary/70">
                        {item.type}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.description}</p>
                  </div>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-text-secondary transition-colors group-hover:text-primary" />
                </a>
              ))}
            </div>
          </SectionCard>

          <div className="flex flex-col gap-8">
            <SectionCard icon={ShieldCheck} title={page.securityTitle} body={page.securityBody}>
              <ul className="space-y-3">
                {page.security.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard icon={Link2} title={page.stepsTitle} body={page.stepsBody}>
              <ol className="space-y-3">
                {page.steps.map((item, index) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-xs font-semibold text-primary">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </SectionCard>
          </div>
        </div>

        <section className="rounded-2xl border border-dashed border-border-dark bg-surface-dark/20 p-8">
          <h2 className="text-2xl font-bold">{page.futureTitle}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-secondary">{page.futureBody}</p>
        </section>
      </div>
    </main>
  );
}
