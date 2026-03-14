"use client";

import { useTranslations } from "next-intl";

export function Stats() {
  const t = useTranslations("stats");

  const stats = [
    { value: t("blockTimeValue"), label: t("blockTime"), desc: t("blockTimeDesc") },
    { value: t("finalityValue"), label: t("finality"), desc: t("finalityDesc") },
    { value: t("nodeSizeValue"), label: t("nodeSize"), desc: t("nodeSizeDesc") },
    { value: t("txTypesValue"), label: t("txTypes"), desc: t("txTypesDesc") },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 border-y border-border-dark bg-surface-dark/30">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center md:items-start">
            <span className="text-primary text-4xl md:text-5xl font-bold mb-2">{stat.value}</span>
            <p className="text-text-secondary font-medium uppercase tracking-widest text-xs mb-1">
              {stat.label}
            </p>
            <p className="text-xs text-text-secondary/60">{stat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
