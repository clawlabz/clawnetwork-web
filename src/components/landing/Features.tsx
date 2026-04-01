"use client";

import { useTranslations } from "next-intl";
import { Fingerprint, Zap, Feather, Coins, Star, CreditCard, Search, Plug } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";

export function Features() {
  const t = useTranslations("features");

  const features = [
    { icon: Fingerprint, title: t("identity.title"), desc: t("identity.desc") },
    { icon: Zap, title: t("speed.title"), desc: t("speed.desc") },
    { icon: Feather, title: t("lightweight.title"), desc: t("lightweight.desc") },
    { icon: Coins, title: t("token.title"), desc: t("token.desc") },
    { icon: Star, title: t("reputation.title"), desc: t("reputation.desc") },
    { icon: CreditCard, title: t("payments.title"), desc: t("payments.desc") },
    { icon: Search, title: t("discovery.title"), desc: t("discovery.desc") },
    { icon: Plug, title: t("agentApi"), desc: t("agentApiDesc") },
  ];

  const bentoLayouts = [
    "lg:col-span-2",
    "lg:col-span-1",
    "lg:col-span-1",
    "lg:col-span-2",
    "lg:col-span-1",
    "lg:col-span-1",
    "lg:col-span-1",
    "lg:col-span-2",
  ];

  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24 relative z-10">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          {t("title")}
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, i) => {
          const Icon = feat.icon;
          return (
            <TiltCard
              key={i}
              className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-surface-dark/40 p-8 transition-colors duration-500 hover:bg-surface-dark/80 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(0,240,255,0.05)] ${bentoLayouts[i]}`}
            >
              {/* Glowing gradient background on hover */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="relative z-10 h-full flex flex-col pointer-events-none">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/30 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-2xl font-bold tracking-tight text-white group-hover:text-primary transition-colors duration-300">{feat.title}</h3>
                <p className="text-base text-text-secondary leading-relaxed mt-auto">{feat.desc}</p>
              </div>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
}
