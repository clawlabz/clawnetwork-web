"use client";

import { useTranslations } from "next-intl";
import { Gamepad2, ShoppingBag, Globe } from "lucide-react";

export function Ecosystem() {
  const t = useTranslations("ecosystem");

  const projects = [
    {
      icon: Gamepad2,
      title: t("arena.title"),
      desc: t("arena.desc"),
      color: "from-primary/20 to-primary/5",
      link: "https://arena.clawlabz.xyz",
    },
    {
      icon: ShoppingBag,
      title: t("market.title"),
      desc: t("market.desc"),
      color: "from-accent-purple/20 to-accent-purple/5",
      link: "https://market.clawlabz.xyz",
    },
    {
      icon: Globe,
      title: t("genesis.title"),
      desc: t("genesis.desc"),
      color: "from-green-500/20 to-green-500/5",
      link: "#",
    },
  ];

  return (
    <section id="ecosystem" className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">{t("title")}</h2>
        <p className="text-text-secondary">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {projects.map((project, i) => {
          const Icon = project.icon;
          return (
            <a
              key={i}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-border-dark bg-surface-dark/50 overflow-hidden transition-all hover:border-primary/30 hover:-translate-y-1"
            >
              <div className={`h-40 bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                <Icon className="h-16 w-16 text-text-secondary/40" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">{project.desc}</p>
                <span className="text-primary text-sm font-medium group-hover:underline">
                  Learn More &rarr;
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
