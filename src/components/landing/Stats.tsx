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
    <section className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Outer blurred glow */}
      <div className="absolute inset-0 z-0 bg-primary/10 blur-3xl opacity-50 rounded-[3rem]"></div>
      
      {/* Glass container */}
      <div className="relative z-10 w-full rounded-3xl border border-white/5 bg-surface-dark/20 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Subtle top edge highlight */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        
        <div className="grid grid-cols-2 gap-[1px] bg-white/5 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-8 bg-transparent hover:bg-surface-dark/80 transition-colors duration-500">
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-text-secondary text-4xl md:text-5xl font-bold mb-3 drop-shadow-md">
                {stat.value}
              </span>
              <div className="flex items-center gap-2 mb-2">
                {i === 0 && network.live && (
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                  </span>
                )}
                <p className="text-primary font-semibold uppercase tracking-widest text-xs">
                  {stat.label}
                </p>
              </div>
              <p className="text-xs text-text-secondary/60 font-medium text-center">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
