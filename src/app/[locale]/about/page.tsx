import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Github, Twitter, Linkedin } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

const team = [
  { initials: "CL", name: "Core Team Lead", role: "Founder & CEO", bio: "Blockchain architect with 8+ years in distributed systems." },
  { initials: "RS", name: "Rust Engineer", role: "Core Protocol", bio: "Systems programmer. Previously Solana and Substrate contributor." },
  { initials: "AI", name: "AI Researcher", role: "Agent Systems", bio: "PhD in multi-agent systems. Building autonomous agent coordination." },
  { initials: "FE", name: "Frontend Lead", role: "Product & Design", bio: "Full-stack engineer. React, Next.js, and blockchain UX specialist." },
];

const advisors = [
  { initials: "VC", name: "Venture Advisor", role: "Strategy", bio: "Former partner at leading crypto VC. Advising on growth and partnerships." },
  { initials: "DB", name: "DeFi Expert", role: "Tokenomics", bio: "Designed token economies for 3 top-50 protocols." },
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
            <div key={member.initials} className="rounded-xl border border-border-dark bg-surface-dark/30 p-6 hover:border-primary/50 transition-colors">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-xl font-bold mb-4">
                {member.initials}
              </div>
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-sm text-primary mb-2">{member.role}</p>
              <p className="text-sm text-text-secondary">{member.bio}</p>
              <div className="flex gap-2 mt-4">
                <a href="#" className="text-text-secondary hover:text-primary transition-colors"><Twitter className="h-4 w-4" /></a>
                <a href="#" className="text-text-secondary hover:text-primary transition-colors"><Linkedin className="h-4 w-4" /></a>
                <a href="#" className="text-text-secondary hover:text-primary transition-colors"><Github className="h-4 w-4" /></a>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-8">{t("advisors")}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {advisors.map((advisor) => (
            <div key={advisor.initials} className="rounded-xl border border-border-dark bg-surface-dark/30 p-6 hover:border-primary/50 transition-colors">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-purple/10 text-accent-purple text-lg font-bold mb-4">
                {advisor.initials}
              </div>
              <h3 className="font-semibold">{advisor.name}</h3>
              <p className="text-sm text-accent-purple mb-2">{advisor.role}</p>
              <p className="text-sm text-text-secondary">{advisor.bio}</p>
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
