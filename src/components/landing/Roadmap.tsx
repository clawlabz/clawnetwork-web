"use client";

import { useTranslations } from "next-intl";
import { CheckCircle, Clock, Circle } from "lucide-react";

export function Roadmap() {
  const t = useTranslations("roadmap");

  const milestones = [
    { key: "q1" as const, status: "completed" },
    { key: "q2" as const, status: "in-progress" },
    { key: "q3" as const, status: "upcoming" },
  ];

  function StatusIcon({ status }: { status: string }) {
    if (status === "completed") return <CheckCircle className="h-6 w-6 text-primary" />;
    if (status === "in-progress") return <Clock className="h-6 w-6 text-accent-purple" />;
    return <Circle className="h-6 w-6 text-text-secondary/40" />;
  }

  function StatusBadge({ status }: { status: string }) {
    const styles = {
      completed: "bg-primary/10 text-primary border-primary/30",
      "in-progress": "bg-accent-purple/10 text-accent-purple border-accent-purple/30",
      upcoming: "bg-surface-dark text-text-secondary border-border-dark",
    };
    const labels = {
      completed: "Completed",
      "in-progress": "In Progress",
      upcoming: "Upcoming",
    };
    const style = styles[status as keyof typeof styles] || styles.upcoming;
    const label = labels[status as keyof typeof labels] || "Upcoming";

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${style}`}>
        {label}
      </span>
    );
  }

  return (
    <section id="roadmap" className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">{t("title")}</h2>
        <p className="text-text-secondary">{t("subtitle")}</p>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border-dark md:left-1/2 md:-translate-x-px" />

        <div className="space-y-12">
          {milestones.map((m, i) => (
            <div key={m.key} className={`relative flex items-start gap-6 md:gap-12 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
              {/* Timeline dot */}
              <div className="absolute left-6 -translate-x-1/2 md:left-1/2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border-dark bg-bg-dark">
                  <StatusIcon status={m.status} />
                </div>
              </div>

              {/* Content card */}
              <div className={`ml-16 w-full rounded-xl border border-border-dark bg-surface-dark/50 p-6 md:ml-0 md:w-[calc(50%-3rem)] ${i % 2 === 1 ? "md:mr-auto" : "md:ml-auto"}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">
                    {t(`${m.key}.label`)}
                  </span>
                  <StatusBadge status={m.status} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t(`${m.key}.title`)}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{t(`${m.key}.desc`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
