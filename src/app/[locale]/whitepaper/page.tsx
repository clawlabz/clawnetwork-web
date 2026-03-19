import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { FileText, Download } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "whitepaper" });
  return {
    title: t("title"),
    description: t("version"),
  };
}

const sections = [
  { id: "abstract", num: "0" },
  { id: "introduction", num: "1" },
  { id: "problem", num: "2" },
  { id: "architecture", num: "3" },
  { id: "consensus", num: "4" },
  { id: "tokenomics", num: "5" },
  { id: "payments", num: "6" },
  { id: "roadmap", num: "7" },
];

export default function WhitepaperPage() {
  const t = useTranslations("whitepaper");

  return (
    <main className="pt-24">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{t("title")}</h1>
            <p className="text-sm text-text-secondary mt-1">{t("version")}</p>
          </div>
        </div>

        <div className="mb-8">
          <button disabled className="inline-flex items-center gap-2 rounded-lg border border-border-dark px-4 py-2 text-sm text-text-secondary cursor-not-allowed opacity-50">
            <Download className="h-4 w-4" />
            {t("downloadPdf")}
          </button>
          <span className="ml-2 text-xs text-text-secondary/50">{t("pdfComingSoon")}</span>
        </div>

        {/* TOC */}
        <div className="rounded-xl border border-border-dark bg-surface-dark/30 p-6 mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-4">{t("toc")}</h2>
          <ul className="space-y-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-sm text-primary hover:underline">
                  {s.num}. {t(`sections.${s.id}.title`)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-12">
          {sections.map((s) => (
            <section key={s.id} id={s.id}>
              <h2 className="text-2xl font-bold mb-4 text-text-primary">
                {s.num}. {t(`sections.${s.id}.title`)}
              </h2>
              <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                {t(`sections.${s.id}.content`)}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/docs/quickstart" className="inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-bold text-bg-dark transition-all hover:brightness-110">
            {t("startBuilding")}
          </Link>
        </div>
      </section>
    </main>
  );
}
