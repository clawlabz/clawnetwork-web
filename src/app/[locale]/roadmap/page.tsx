import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { CheckCircle2, Loader2, Circle } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "roadmapPage" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

type PhaseStatus = "completed" | "in-progress" | "upcoming";

interface RoadmapPhase {
  quarterKey: string;
  status: PhaseStatus;
  itemCount: number;
}

const phases: RoadmapPhase[] = [
  { quarterKey: "q4_2025", status: "completed", itemCount: 4 },
  { quarterKey: "q1_2026", status: "completed", itemCount: 4 },
  { quarterKey: "q2_2026", status: "in-progress", itemCount: 4 },
  { quarterKey: "q3_2026", status: "upcoming", itemCount: 4 },
  { quarterKey: "q4_2026", status: "upcoming", itemCount: 4 },
];

function StatusIcon({ status }: { status: PhaseStatus }) {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-6 w-6 text-green-400" />;
    case "in-progress":
      return <Loader2 className="h-6 w-6 text-primary animate-spin" />;
    case "upcoming":
      return <Circle className="h-6 w-6 text-text-secondary/40" />;
  }
}

function statusColor(status: PhaseStatus) {
  switch (status) {
    case "completed":
      return "border-green-400/30 bg-green-400/5";
    case "in-progress":
      return "border-primary/30 bg-primary/5";
    case "upcoming":
      return "border-border-dark bg-surface-dark/30";
  }
}

function statusBadgeStyle(status: PhaseStatus) {
  switch (status) {
    case "completed":
      return "bg-green-400/10 text-green-400";
    case "in-progress":
      return "bg-primary/10 text-primary";
    case "upcoming":
      return "bg-surface-dark text-text-secondary";
  }
}

function dotColor(status: PhaseStatus) {
  switch (status) {
    case "completed":
      return "bg-green-400";
    case "in-progress":
      return "bg-primary";
    case "upcoming":
      return "bg-text-secondary/30";
  }
}

export default function RoadmapPage() {
  const t = useTranslations("roadmapPage");

  return (
    <main className="pt-24">
      <section className="mx-auto max-w-4xl px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mb-12">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            <span className="text-text-secondary">{t("completed")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Loader2 className="h-4 w-4 text-primary" />
            <span className="text-text-secondary">{t("inProgress")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Circle className="h-4 w-4 text-text-secondary/40" />
            <span className="text-text-secondary">{t("upcoming")}</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border-dark md:left-1/2 md:-translate-x-px" />

          <div className="space-y-12">
            {phases.map((phase, idx) => (
              <div key={phase.quarterKey} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-[12px] top-8 z-10 md:left-1/2 md:-translate-x-1/2">
                  <div className={`h-[14px] w-[14px] rounded-full border-2 border-bg-dark ${dotColor(phase.status)}`} />
                </div>

                {/* Card */}
                <div className={`ml-12 md:ml-0 ${idx % 2 === 0 ? "md:mr-[calc(50%+2rem)] md:pr-0" : "md:ml-[calc(50%+2rem)] md:pl-0"}`}>
                  <div className={`rounded-xl border p-6 ${statusColor(phase.status)} transition-colors`}>
                    <div className="flex items-center gap-3 mb-4">
                      <StatusIcon status={phase.status} />
                      <div>
                        <h3 className="text-lg font-bold">{t(`${phase.quarterKey}.label`)}</h3>
                        <p className="text-sm text-text-secondary">{t(`${phase.quarterKey}.title`)}</p>
                      </div>
                      <span className={`ml-auto inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeStyle(phase.status)}`}>
                        {t(phase.status === "completed" ? "completed" : phase.status === "in-progress" ? "inProgress" : "upcoming")}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {Array.from({ length: phase.itemCount }, (_, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${phase.status === "completed" ? "bg-green-400" : phase.status === "in-progress" ? "bg-primary" : "bg-text-secondary/40"}`} />
                          <span className="text-sm text-text-secondary">{t(`${phase.quarterKey}.items.${i}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
