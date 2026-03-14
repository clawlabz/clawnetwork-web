"use client";

import { useTranslations } from "next-intl";

export function Tokenomics() {
  const t = useTranslations("tokenomics");

  const allocations = [
    { label: t("allocation.ecosystem"), pct: t("allocation.ecosystemPct"), width: "w-[40%]", value: 40 },
    { label: t("allocation.staking"), pct: t("allocation.stakingPct"), width: "w-[25%]", value: 25 },
    { label: t("allocation.partners"), pct: t("allocation.partnersPct"), width: "w-[15%]", value: 15 },
    { label: t("allocation.core"), pct: t("allocation.corePct"), width: "w-[10%]", value: 10 },
    { label: t("allocation.public"), pct: t("allocation.publicPct"), width: "w-[10%]", value: 10 },
  ];

  return (
    <section id="tokenomics" className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">{t("title")}</h2>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left: bars */}
        <div className="space-y-6">
          {allocations.map((item, i) => (
            <div key={i}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">{item.label}</span>
                <span className="text-sm text-primary font-bold">{item.pct}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-border-dark overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent-purple transition-all duration-1000"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right: donut visualization */}
        <div className="flex items-center justify-center">
          <div className="relative">
            <svg width="240" height="240" viewBox="0 0 240 240">
              {/* Background circle */}
              <circle cx="120" cy="120" r="100" fill="none" stroke="#1d3d3f" strokeWidth="24" />
              {/* Segments */}
              <circle cx="120" cy="120" r="100" fill="none" stroke="#00eeff" strokeWidth="24"
                strokeDasharray={`${40 * 6.28} ${60 * 6.28}`} strokeDashoffset="0" transform="rotate(-90 120 120)" />
              <circle cx="120" cy="120" r="100" fill="none" stroke="#a855f7" strokeWidth="24"
                strokeDasharray={`${25 * 6.28} ${75 * 6.28}`} strokeDashoffset={`${-40 * 6.28}`} transform="rotate(-90 120 120)" />
              <circle cx="120" cy="120" r="100" fill="none" stroke="#3b82f6" strokeWidth="24"
                strokeDasharray={`${15 * 6.28} ${85 * 6.28}`} strokeDashoffset={`${-65 * 6.28}`} transform="rotate(-90 120 120)" />
              <circle cx="120" cy="120" r="100" fill="none" stroke="#6366f1" strokeWidth="24"
                strokeDasharray={`${10 * 6.28} ${90 * 6.28}`} strokeDashoffset={`${-80 * 6.28}`} transform="rotate(-90 120 120)" />
              <circle cx="120" cy="120" r="100" fill="none" stroke="#8b5cf6" strokeWidth="24"
                strokeDasharray={`${10 * 6.28} ${90 * 6.28}`} strokeDashoffset={`${-90 * 6.28}`} transform="rotate(-90 120 120)" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs text-text-secondary uppercase tracking-wider">{t("totalSupply")}</span>
              <span className="text-3xl font-bold text-primary">{t("totalSupplyValue")}</span>
              <span className="text-sm text-text-secondary">{t("symbol")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
