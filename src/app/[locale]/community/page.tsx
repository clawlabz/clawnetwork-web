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
  TELEGRAM_UPDATES_URL,
  ARENA_TWITTER_URL,
  TWITTER_URL,
  WALLET_URL,
} from "@/lib/constants";
import { getTranslations } from "next-intl/server";

const PRODUCT_LINKS = [
  CLAWLABZ_URL,
  SITE_URL,
  EXPLORER_URL,
  WALLET_URL,
  CHROME_EXTENSION_URL,
  CLAWARENA_URL,
  CLAWMARKET_URL,
] as const;

const CHANNEL_LINKS = [
  TWITTER_URL,
  NETWORK_TWITTER_URL,
  ARENA_TWITTER_URL,
  DISCORD_URL,
  TELEGRAM_URL,
  TELEGRAM_UPDATES_URL,
  GITHUB_URL,
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: _locale } = await params;
  const t = await getTranslations("community");

  return {
    title: t("title"),
    description: t("description"),
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
  const { locale: _locale } = await params;
  const t = await getTranslations("community");

  const products = t.raw("products") as Record<string, { name: string; type: string; description: string }>;
  const channels = t.raw("channels") as Record<string, { name: string; type: string; description: string }>;
  const security = t.raw("security") as Record<string, string>;
  const steps = t.raw("steps") as Record<string, string>;

  return (
    <main className="pt-24 pb-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6">
        <section className="rounded-[28px] border border-primary/20 bg-[radial-gradient(circle_at_top,_rgba(0,238,255,0.12),_transparent_45%),linear-gradient(180deg,rgba(15,34,35,0.88),rgba(6,13,13,0.92))] p-8 md:p-12">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {t("eyebrow")}
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">{t("heroTitle")}</h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
              {t("heroBody")}
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-sm leading-relaxed text-amber-100">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
              <p>{t("warning")}</p>
            </div>
          </div>
        </section>

        <SectionCard icon={BadgeCheck} title={t("productsTitle")} body={t("productsBody")}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {Object.entries(products).map(([idx, item]) => (
              <a
                key={idx}
                href={PRODUCT_LINKS[Number(idx)]}
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
                  {t("visit")} <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </SectionCard>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <SectionCard icon={MessageCircle} title={t("communityTitle")} body={t("communityBody")}>
            <div className="space-y-4">
              {Object.entries(channels).map(([idx, item]) => (
                <a
                  key={idx}
                  href={CHANNEL_LINKS[Number(idx)]}
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
            <SectionCard icon={ShieldCheck} title={t("securityTitle")} body={t("securityBody")}>
              <ul className="space-y-3">
                {Object.values(security).map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard icon={Link2} title={t("stepsTitle")} body={t("stepsBody")}>
              <ol className="space-y-3">
                {Object.values(steps).map((item, index) => (
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
          <h2 className="text-2xl font-bold">{t("futureTitle")}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-secondary">{t("futureBody")}</p>
        </section>
      </div>
    </main>
  );
}
