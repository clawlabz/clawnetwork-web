import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Gamepad2, ShoppingBag, Cloud, Coins, Star, Code } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "useCases" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

const USE_CASE_KEYS = [
  { key: "gaming", icon: Gamepad2 },
  { key: "marketplace", icon: ShoppingBag },
  { key: "api", icon: Cloud },
  { key: "monetization", icon: Coins },
  { key: "reputation", icon: Star },
  { key: "smartContract", icon: Code },
] as const;

export default function UseCasesPage() {
  const t = useTranslations("useCases");

  return (
    <main className="pt-24">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {USE_CASE_KEYS.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="group rounded-xl border border-border-dark bg-surface-dark/30 p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{t(`${key}.title`)}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{t(`${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
