import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Download, Check, X } from "lucide-react";
import Image from "next/image";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "brand" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

const brandColors = [
  { name: "Primary Orange", var: "--color-primary", hex: "#F96706", className: "bg-primary" },
  { name: "Primary Light", var: "--color-primary-light", hex: "#FF8C3A", className: "bg-primary-light" },
  { name: "Accent Purple", var: "--color-accent-purple", hex: "#A855F7", className: "bg-accent-purple" },
  { name: "Background", var: "--color-bg-dark", hex: "#0D0906", className: "bg-bg-dark border border-border-dark" },
  { name: "Surface", var: "--color-surface-dark", hex: "#16110D", className: "bg-surface-dark border border-border-dark" },
  { name: "Border", var: "--color-border-dark", hex: "#2D231A", className: "bg-border-dark" },
  { name: "Text Primary", var: "--color-text-primary", hex: "#FDF8F5", className: "bg-text-primary" },
  { name: "Text Secondary", var: "--color-text-secondary", hex: "#8892A0", className: "bg-text-secondary" },
];

const fonts = [
  { name: "Space Grotesk", usage: "display", weights: "300 - 700", var: "--font-space-grotesk" },
  { name: "Noto Sans SC", usage: "chinese", weights: "400 - 700", var: "--font-noto-sans-sc" },
  { name: "JetBrains Mono", usage: "mono", weights: "400 - 500", var: "--font-jetbrains-mono" },
];

export default function BrandPage() {
  const t = useTranslations("brand");

  return (
    <main className="pt-24">
      <section className="mx-auto max-w-7xl px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Logo */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">{t("logo.title")}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Dark background preview */}
            <div className="rounded-xl border border-border-dark bg-surface-dark/30 p-8 flex flex-col items-center justify-center min-h-[200px]">
              <Image src="/logo.svg" alt="ClawNetwork Logo" width={200} height={60} className="mb-4" />
              <p className="text-xs text-text-secondary">{t("logo.onDark")}</p>
            </div>
            {/* Light background preview */}
            <div className="rounded-xl border border-border-dark bg-white p-8 flex flex-col items-center justify-center min-h-[200px]">
              <Image src="/logo.svg" alt="ClawNetwork Logo" width={200} height={60} className="mb-4" />
              <p className="text-xs text-gray-500">{t("logo.onLight")}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="/logo.svg"
              download="clawnetwork-logo.svg"
              className="inline-flex items-center gap-2 rounded-lg border border-border-dark px-4 py-2.5 text-sm font-medium transition-all hover:border-primary/50"
            >
              <Download className="h-4 w-4" />
              SVG
            </a>
            <a
              href="/favicon.png"
              download="clawnetwork-icon.png"
              className="inline-flex items-center gap-2 rounded-lg border border-border-dark px-4 py-2.5 text-sm font-medium transition-all hover:border-primary/50"
            >
              <Download className="h-4 w-4" />
              PNG (Icon)
            </a>
          </div>
        </div>

        {/* Colors */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">{t("colors.title")}</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {brandColors.map((color) => (
              <div key={color.var} className="rounded-xl border border-border-dark bg-surface-dark/30 overflow-hidden">
                <div className={`h-20 ${color.className}`} />
                <div className="p-3">
                  <p className="text-sm font-medium">{color.name}</p>
                  <p className="text-xs text-text-secondary font-mono">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">{t("typography.title")}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {fonts.map((font) => (
              <div key={font.name} className="rounded-xl border border-border-dark bg-surface-dark/30 p-6">
                <p className={`text-2xl font-bold mb-2 ${font.usage === "mono" ? "font-mono" : ""}`}>{font.name}</p>
                <p className="text-sm text-text-secondary mb-1">{t(`typography.${font.usage}`)}</p>
                <p className="text-xs text-text-secondary font-mono">{font.weights}</p>
                <p className={`mt-4 text-lg ${font.usage === "mono" ? "font-mono" : ""}`}>
                  {font.usage === "chinese" ? "ClawNetwork \u533A\u5757\u94FE" : font.usage === "mono" ? "const claw = 0x01;" : "Aa Bb Cc 123"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Guidelines */}
        <div>
          <h2 className="text-2xl font-bold mb-8">{t("usage.title")}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Do's */}
            <div className="rounded-xl border border-green-400/30 bg-green-400/5 p-6">
              <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
                <Check className="h-5 w-5" />
                {t("usage.do")}
              </h3>
              <ul className="space-y-2">
                {([0, 1, 2, 3] as const).map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                    <Check className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                    {t(`usage.dos.${i}`)}
                  </li>
                ))}
              </ul>
            </div>
            {/* Don'ts */}
            <div className="rounded-xl border border-red-400/30 bg-red-400/5 p-6">
              <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                <X className="h-5 w-5" />
                {t("usage.dont")}
              </h3>
              <ul className="space-y-2">
                {([0, 1, 2, 3] as const).map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                    <X className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                    {t(`usage.donts.${i}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
