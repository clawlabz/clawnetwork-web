import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Shield, Vote, Eye, Clock, Settings, Flame, Scale, Users } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "governance" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

const governableItems = [
  { icon: Flame, labelKey: "items.emission" as const },
  { icon: Scale, labelKey: "items.feeSplits" as const },
  { icon: Settings, labelKey: "items.miningWeights" as const },
  { icon: Shield, labelKey: "items.antiSybil" as const },
  { icon: Settings, labelKey: "items.protocolUpgrades" as const },
];

export default function GovernancePage() {
  const t = useTranslations("governance");

  return (
    <main className="pt-24">
      <section className="mx-auto max-w-7xl px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Current Phase */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-16">
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-1">
                  {t("current.badge")}
                </div>
                <h2 className="text-xl font-bold">{t("current.title")}</h2>
              </div>
            </div>
            <p className="text-text-secondary mb-4">{t("current.desc")}</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Users className="h-4 w-4 text-primary mt-1 shrink-0" />
                <p className="text-sm text-text-secondary">{t("current.multisig")}</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-primary mt-1 shrink-0" />
                <p className="text-sm text-text-secondary">{t("current.announcement")}</p>
              </div>
              <div className="flex items-start gap-3">
                <Eye className="h-4 w-4 text-primary mt-1 shrink-0" />
                <p className="text-sm text-text-secondary">{t("current.onchain")}</p>
              </div>
            </div>
          </div>

          {/* Future Phase */}
          <div className="rounded-xl border border-border-dark bg-surface-dark/30 p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-purple/10">
                <Vote className="h-5 w-5 text-accent-purple" />
              </div>
              <div>
                <div className="inline-flex rounded-full bg-accent-purple/10 px-3 py-1 text-xs font-semibold text-accent-purple mb-1">
                  {t("future.badge")}
                </div>
                <h2 className="text-xl font-bold">{t("future.title")}</h2>
              </div>
            </div>
            <p className="text-text-secondary mb-4">{t("future.desc")}</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-border-dark bg-surface-dark/50 p-3 text-center">
                <p className="text-lg font-bold text-accent-purple">{t("future.threshold")}</p>
                <p className="text-xs text-text-secondary">{t("future.thresholdLabel")}</p>
              </div>
              <div className="rounded-lg border border-border-dark bg-surface-dark/50 p-3 text-center">
                <p className="text-lg font-bold text-accent-purple">{t("future.votingPeriod")}</p>
                <p className="text-xs text-text-secondary">{t("future.votingPeriodLabel")}</p>
              </div>
              <div className="rounded-lg border border-border-dark bg-surface-dark/50 p-3 text-center">
                <p className="text-lg font-bold text-accent-purple">{t("future.passRequirement")}</p>
                <p className="text-xs text-text-secondary">{t("future.passRequirementLabel")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* What Can Be Governed */}
        <h2 className="text-2xl font-bold mb-8 text-center">{t("governable.title")}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-16">
          {governableItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.labelKey} className="rounded-xl border border-border-dark bg-surface-dark/30 p-5 text-center hover:border-primary/50 transition-colors">
                <div className="flex h-10 w-10 mx-auto items-center justify-center rounded-lg bg-primary/10 mb-3">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-medium">{t(item.labelKey)}</p>
              </div>
            );
          })}
        </div>

        {/* Transparency */}
        <div className="rounded-xl border border-border-dark bg-surface-dark/30 p-8 text-center">
          <Eye className="h-8 w-8 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">{t("transparency.title")}</h2>
          <p className="text-text-secondary mb-6 max-w-xl mx-auto">{t("transparency.desc")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://explorer.clawlabz.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-bold text-bg-dark transition-all hover:brightness-110"
            >
              {t("transparency.explorer")}
            </a>
            <a
              href="https://github.com/clawlabz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-lg border border-border-dark px-6 py-3 text-sm font-bold transition-all hover:border-primary/50"
            >
              {t("transparency.github")}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
