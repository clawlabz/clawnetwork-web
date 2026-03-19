"use client";

import { useTranslations } from "next-intl";
import { Gamepad2, ShoppingBag, Globe } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";

export function Ecosystem() {
  const t = useTranslations("ecosystem");

  const projects = [
    {
      icon: Gamepad2,
      title: t("arena.title"),
      desc: t("arena.desc"),
      glow: "bg-primary/30",
      accent: "text-primary",
      link: "https://arena.clawlabz.xyz",
    },
    {
      icon: ShoppingBag,
      title: t("market.title"),
      desc: t("market.desc"),
      glow: "bg-[#7B61FF]/30",
      accent: "text-[#7B61FF]",
      link: "https://market.clawlabz.xyz",
    },
    {
      icon: Globe,
      title: t("genesis.title"),
      desc: t("genesis.desc"),
      glow: "bg-[#00FF88]/30",
      accent: "text-[#00FF88]",
      link: "#",
    },
  ];

  return (
    <section id="ecosystem" className="mx-auto max-w-7xl px-6 py-32 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="text-center mb-20 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{t("title")}</h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 relative z-10">
        {projects.map((project, i) => {
          const Icon = project.icon;
          return (
            <a
              key={i}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`block ${project.link === '#' ? 'cursor-not-allowed' : ''}`}
            >
              <TiltCard className="group relative h-full rounded-3xl border border-white/5 bg-surface-dark/40 backdrop-blur-md overflow-hidden transition-colors duration-500 hover:bg-surface-dark/80 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                {/* Inner animated glow */}
                <div className={`absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${project.glow}`}></div>
                
                <div className="p-8 h-full flex flex-col relative z-10 pointer-events-none">
                  <div className="mb-8">
                    <div className={`inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-white/5 border border-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${project.accent}`}>
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">{project.title}</h3>
                  <p className="text-base text-text-secondary leading-relaxed mb-8 flex-grow">{project.desc}</p>
                  <div className={`flex items-center font-bold text-sm tracking-wide ${project.accent} opacity-80 group-hover:opacity-100 transition-opacity`}>
                    {project.link === '#' ? "COMING SOON" : t("learnMore")}
                    {project.link !== '#' && <span className="ml-2 transform group-hover:translate-x-1 transition-transform">&rarr;</span>}
                  </div>
                </div>
              </TiltCard>
            </a>
          );
        })}
      </div>
    </section>
  );
}
