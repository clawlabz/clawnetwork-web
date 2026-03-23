import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Check, X, Sparkles } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "why" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

const PROJECTS = ["claw", "bittensor", "render", "akash", "grass"] as const;
const PROJECT_LABELS = ["clawnetwork", "bittensor", "render", "akash", "grass"] as const;

type CellValue = {
  text: string;
  highlight?: boolean;
  unique?: boolean;
};

function CellBadge({ value }: { value: CellValue }) {
  if (value.unique) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary">
        <Sparkles className="h-3 w-3" />
        {value.text}
      </span>
    );
  }
  if (value.text === "Yes" || value.text === "是") {
    return (
      <span className="inline-flex items-center gap-1 text-green-400">
        <Check className="h-4 w-4" />
        {value.text}
      </span>
    );
  }
  if (value.text === "No" || value.text === "否") {
    return (
      <span className="inline-flex items-center gap-1 text-text-secondary/50">
        <X className="h-4 w-4" />
        {value.text}
      </span>
    );
  }
  return <span>{value.text}</span>;
}

export default function WhyPage() {
  const t = useTranslations("why");

  const rows: { label: string; values: CellValue[] }[] = [
    {
      label: t("consensus"),
      values: PROJECTS.map((p) => ({ text: t(`consensusValues.${p}`) })),
    },
    {
      label: t("miningModel"),
      values: PROJECTS.map((p) => ({ text: t(`miningValues.${p}`) })),
    },
    {
      label: t("llmSharing"),
      values: PROJECTS.map((p) => {
        const text = p === "claw" ? t("llmValues.claw") : t("llmValues.others");
        return { text, unique: p === "claw", highlight: p === "claw" };
      }),
    },
    {
      label: t("aiAgentNative"),
      values: PROJECTS.map((p) => {
        const text = p === "claw" ? t("agentValues.claw") : t("agentValues.others");
        return { text, highlight: p === "claw" };
      }),
    },
    {
      label: t("onePromptInstall"),
      values: PROJECTS.map((p) => {
        if (p === "claw") return { text: t("installValues.claw"), unique: true };
        if (p === "grass") return { text: t("installValues.grass") };
        return { text: t("installValues.others") };
      }),
    },
    {
      label: t("minHardware"),
      values: PROJECTS.map((p) => ({ text: t(`hardwareValues.${p}`) })),
    },
    {
      label: t("blockTime"),
      values: PROJECTS.map((p) => ({
        text: t(`blockTimeValues.${p}`),
        highlight: p === "claw",
      })),
    },
  ];

  const differentiators = [
    { title: t("diff1Title"), desc: t("diff1Desc") },
    { title: t("diff2Title"), desc: t("diff2Desc") },
    { title: t("diff3Title"), desc: t("diff3Desc") },
  ];

  return (
    <main className="pt-24">
      <section className="mx-auto max-w-7xl px-6 py-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Comparison Table */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-8">{t("comparisonTitle")}</h2>
          <div className="overflow-x-auto rounded-xl border border-border-dark">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-dark/50">
                  <th className="text-left px-4 py-3 font-semibold text-text-secondary border-b border-border-dark min-w-[140px]">
                    {t("feature")}
                  </th>
                  {PROJECT_LABELS.map((label) => (
                    <th
                      key={label}
                      className={`text-left px-4 py-3 font-semibold border-b border-border-dark min-w-[140px] ${
                        label === "clawnetwork" ? "text-primary" : "text-text-secondary"
                      }`}
                    >
                      {t(label)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={`transition-colors hover:bg-surface-dark/30 ${
                      i < rows.length - 1 ? "border-b border-border-dark" : ""
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">{row.label}</td>
                    {row.values.map((val, j) => (
                      <td
                        key={j}
                        className={`px-4 py-3 ${
                          j === 0 ? "text-text-primary font-medium" : "text-text-secondary"
                        }`}
                      >
                        <CellBadge value={val} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Differentiators */}
        <div>
          <h2 className="text-2xl font-bold mb-8">{t("differentiators")}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {differentiators.map((diff, i) => (
              <div
                key={i}
                className="rounded-xl border border-border-dark bg-surface-dark/30 p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                  <span className="text-lg font-bold">{i + 1}</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">{diff.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{diff.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
