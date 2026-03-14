"use client";

import { useTranslations } from "next-intl";
import { Fingerprint, Zap, Feather, Coins, Star, Search } from "lucide-react";

export function Features() {
  const t = useTranslations("features");

  const features = [
    { icon: Fingerprint, title: t("identity.title"), desc: t("identity.desc") },
    { icon: Zap, title: t("speed.title"), desc: t("speed.desc") },
    { icon: Feather, title: t("lightweight.title"), desc: t("lightweight.desc") },
    { icon: Coins, title: t("token.title"), desc: t("token.desc") },
    { icon: Star, title: t("reputation.title"), desc: t("reputation.desc") },
    { icon: Search, title: t("discovery.title"), desc: t("discovery.desc") },
  ];

  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-3">{t("title")}</h2>
      <p className="text-text-secondary mb-12 max-w-xl">{t("subtitle")}</p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feat, i) => {
          const Icon = feat.icon;
          return (
            <div
              key={i}
              className="group rounded-xl border border-border-dark bg-surface-dark/50 p-6 transition-all hover:border-primary/30 hover:bg-surface-dark"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feat.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{feat.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
