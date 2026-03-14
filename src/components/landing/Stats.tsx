import { getTranslations } from "next-intl/server";
import { getNetworkStats } from "@/lib/rpc";

export async function Stats() {
  const t = await getTranslations("stats");
  const network = await getNetworkStats();

  const stats = [
    {
      value: network.live ? network.blockHeight.toLocaleString() : t("blockTimeValue"),
      label: network.live ? t("blockHeight") : t("blockTime"),
      desc: network.live ? t("blockHeightDesc") : t("blockTimeDesc"),
    },
    { value: t("blockTimeValue"), label: t("blockTime"), desc: t("blockTimeDesc") },
    {
      value: network.live ? `${network.peerCount}` : t("nodeSizeValue"),
      label: network.live ? t("activeNodes") : t("nodeSize"),
      desc: network.live ? t("activeNodesDesc") : t("nodeSizeDesc"),
    },
    { value: t("txTypesValue"), label: t("txTypes"), desc: t("txTypesDesc") },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 border-y border-border-dark bg-surface-dark/30">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center md:items-start">
            <span className="text-primary text-4xl md:text-5xl font-bold mb-2">{stat.value}</span>
            <div className="flex items-center gap-1.5">
              <p className="text-text-secondary font-medium uppercase tracking-widest text-xs mb-1">
                {stat.label}
              </p>
              {i === 0 && network.live && (
                <span className="relative flex h-1.5 w-1.5 mb-1">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
                </span>
              )}
            </div>
            <p className="text-xs text-text-secondary/60">{stat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
