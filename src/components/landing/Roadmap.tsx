"use client";

import { useTranslations } from "next-intl";
import { CheckCircle, Clock, Circle } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";

export function Roadmap() {
  const t = useTranslations("roadmap");

  const milestones = [
    { key: "q1" as const, status: "completed" },
    { key: "q2" as const, status: "in-progress" },
    { key: "q3" as const, status: "upcoming" },
  ];

  function StatusIcon({ status }: { status: string }) {
    if (status === "completed") return <CheckCircle className="h-6 w-6 text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" />;
    if (status === "in-progress") return <Clock className="h-6 w-6 text-accent-purple drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />;
    return <Circle className="h-6 w-6 text-text-secondary/30" />;
  }

  function StatusBadge({ status }: { status: string }) {
    const styles = {
      completed: "bg-primary/20 text-primary border-primary/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]",
      "in-progress": "bg-accent-purple/20 text-accent-purple border-accent-purple/40 shadow-[0_0_10px_rgba(168,85,247,0.2)]",
      upcoming: "bg-white/5 text-text-secondary border-white/10",
    };
    const labelKeys: Record<string, string> = {
      completed: "completed",
      "in-progress": "inProgress",
      upcoming: "upcoming",
    };
    const style = styles[status as keyof typeof styles] || styles.upcoming;
    const labelKey = labelKeys[status] || "upcoming";

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider border backdrop-blur-sm ${style}`}>
        {t(labelKey)}
      </span>
    );
  }

  return (
    <section id="roadmap" className="mx-auto max-w-7xl px-6 py-32 relative">
      {/* Background glow node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="text-center mb-24 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{t("title")}</h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">{t("subtitle")}</p>
      </div>

      <div className="relative z-10">
        {/* Core glowing vertical line with inner animated gradient */}
        <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-white/5 md:left-1/2 md:-translate-x-[1px] overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent via-primary to-transparent animate-[pulse_3s_linear_infinite] shadow-[0_0_10px_rgba(0,240,255,1)]"></div>
        </div>

        <div className="space-y-16">
          {milestones.map((m, i) => (
            <div key={m.key} className={`relative flex items-center md:items-start gap-8 md:gap-16 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
              {/* Timeline central dot */}
              <div className="absolute left-6 -translate-x-1/2 md:left-1/2 mt-0 md:mt-6 z-20">
                <div className={`flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border-2 bg-bg-dark transition-all duration-500 shadow-xl ${m.status === 'completed' ? 'border-primary shadow-[0_0_20px_rgba(0,240,255,0.3)]' : m.status === 'in-progress' ? 'border-accent-purple shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'border-white/10'}`}>
                  <StatusIcon status={m.status} />
                </div>
              </div>

              {/* Glassmorphic content card */}
              <TiltCard className={`group ml-16 w-full rounded-3xl border border-white/5 bg-surface-dark/40 backdrop-blur-md p-8 md:ml-0 md:w-[calc(50%-4rem)] transition-colors duration-500 hover:bg-surface-dark/80 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] ${i % 2 === 1 ? "md:mr-auto" : "md:ml-auto"} ${m.status === 'completed' ? 'hover:border-primary/40' : m.status === 'in-progress' ? 'hover:border-accent-purple/40' : 'hover:border-white/20'}`}>
                
                <div className="flex items-center gap-4 mb-6">
                  <StatusBadge status={m.status} />
                  <span className={`text-sm font-bold uppercase tracking-widest ${m.status === 'completed' ? 'text-primary' : m.status === 'in-progress' ? 'text-accent-purple' : 'text-text-secondary/50'}`}>
                    {t(`${m.key}.label`)}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-white transition-colors text-gray-100">{t(`${m.key}.title`)}</h3>
                <p className="text-base text-text-secondary leading-relaxed pointer-events-none">{t(`${m.key}.desc`)}</p>
                
                {/* Decorative corner glow on hover */}
                {m.status !== 'upcoming' && (
                  <div className={`absolute -bottom-10 ${i % 2 === 1 ? '-left-10' : '-right-10'} w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${m.status === 'completed' ? 'bg-primary/20' : 'bg-accent-purple/20'}`}></div>
                )}
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
