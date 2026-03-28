import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Rocket, Code, Users, Lightbulb } from "lucide-react";
import { DISCORD_URL } from "@/lib/constants";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "grants" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

const tiers = [
  { name: "Explorer", range: "$1K – $5K", desc: "Small tools, SDKs, and integrations for the ClawNetwork ecosystem.", color: "text-green-400", bg: "bg-green-400/10" },
  { name: "Builder", range: "$5K – $25K", desc: "Full applications, DeFi primitives, or agent tooling built on ClawNetwork.", color: "text-primary", bg: "bg-primary/10" },
  { name: "Visionary", range: "$25K – $100K", desc: "Large-scale infrastructure, cross-chain bridges, or foundational protocols.", color: "text-accent-purple", bg: "bg-accent-purple/10" },
];

const steps = [
  { num: "01", title: "Apply", desc: "Submit your proposal with project scope, timeline, and budget." },
  { num: "02", title: "Review", desc: "Our grants committee reviews within 2 weeks." },
  { num: "03", title: "Build", desc: "Receive milestone-based funding as you develop." },
  { num: "04", title: "Ship", desc: "Launch your project and join the ecosystem." },
];

const focusAreas = [
  { icon: Code, title: "Agent Tooling", desc: "SDKs, CLIs, and frameworks for building AI agents on ClawNetwork." },
  { icon: Rocket, title: "DeFi Primitives", desc: "DEX, lending, staking, and other financial protocols." },
  { icon: Lightbulb, title: "Developer Tools", desc: "Debuggers, testing frameworks, and development environments." },
  { icon: Users, title: "Community", desc: "Education, documentation, events, and outreach programs." },
];

export default function GrantsPage() {
  const t = useTranslations("grants");

  return (
    <main className="pt-24">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Tiers */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-16">
          {tiers.map((tier) => (
            <div key={tier.name} className="rounded-xl border border-border-dark bg-surface-dark/30 p-8 text-center hover:border-primary/50 transition-colors">
              <div className={`inline-flex rounded-full ${tier.bg} px-4 py-1.5 text-sm font-semibold ${tier.color} mb-4`}>
                {tier.name}
              </div>
              <p className="text-3xl font-bold mb-3">{tier.range}</p>
              <p className="text-sm text-text-secondary">{tier.desc}</p>
            </div>
          ))}
        </div>

        {/* Process */}
        <h2 className="text-2xl font-bold mb-8 text-center">{t("process")}</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 mb-16">
          {steps.map((step) => (
            <div key={step.num} className="text-center">
              <span className="text-4xl font-bold text-primary/30">{step.num}</span>
              <h3 className="font-semibold mt-2 mb-1">{step.title}</h3>
              <p className="text-xs text-text-secondary">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Focus Areas */}
        <h2 className="text-2xl font-bold mb-8 text-center">{t("focusAreas")}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-16">
          {focusAreas.map((area) => {
            const Icon = area.icon;
            return (
              <div key={area.title} className="flex gap-4 rounded-xl border border-border-dark bg-surface-dark/30 p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{area.title}</h3>
                  <p className="text-sm text-text-secondary">{area.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">{t("cta")}</h2>
          <p className="text-text-secondary mb-6">{t("ctaDesc")}</p>
          <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-lg bg-primary px-8 py-3 text-sm font-bold text-bg-dark transition-all hover:brightness-110">
            {t("applyNow")}
          </a>
        </div>
      </section>
    </main>
  );
}
