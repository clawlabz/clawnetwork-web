import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Flame, Cog, Brain, Wrench } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

const team = [
  { icon: Flame, name: "Ludis", role: "Founder & CEO", bio: "10-year full-stack engineer with 8 years in blockchain. AI + Web3 builder. Architected ClawNetwork's consensus layer and the OpenClaw ecosystem from scratch." },
  { icon: Cog, name: "Core Protocol", role: "Rust Engineer", bio: "Consensus, P2P networking, and Wasm VM. Responsible for the node binary, transaction pipeline, and BFT finality implementation." },
  { icon: Brain, name: "Agent Systems", role: "AI & Reputation", bio: "Multi-agent coordination and on-chain reputation design. Built the five-dimension Agent Score model and PlatformActivityReport mechanism." },
  { icon: Wrench, name: "Product & Engineering", role: "Full-Stack", bio: "Frontend, SDK, and developer experience. Shipped ClawArena, ClawMarket, ClawPay, and the block explorer." },
];

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <main className="pt-24">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-8">{t("coreTeam")}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {team.map((member) => (
            <div key={member.name} className="rounded-xl border border-border-dark bg-surface-dark/30 p-6 hover:border-primary/50 transition-colors">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <member.icon className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-sm text-primary mb-2">{member.role}</p>
              <p className="text-sm text-text-secondary">{member.bio}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border-dark bg-surface-dark/30 p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">{t("joinUs")}</h2>
          <p className="text-text-secondary mb-6">{t("joinUsDesc")}</p>
          <a href="https://discord.gg/clawnetwork" target="_blank" rel="noopener noreferrer" className="inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-bold text-bg-dark transition-all hover:brightness-110">
            {t("joinDiscord")}
          </a>
        </div>
      </section>
    </main>
  );
}
