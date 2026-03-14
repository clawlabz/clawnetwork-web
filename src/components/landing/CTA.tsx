"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { DISCORD_URL } from "@/lib/constants";

export function CTA() {
  const t = useTranslations("cta");

  return (
    <section className="relative overflow-hidden py-24 px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent-purple/5" />
      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("title")}</h2>
        <p className="text-text-secondary mb-10 text-lg">{t("subtitle")}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/docs/quickstart"
            className="bg-primary text-bg-dark px-8 py-4 text-base font-bold rounded-xl shadow-[0_0_20px_rgba(0,238,255,0.3)] hover:scale-105 transition-transform"
          >
            {t("launchDashboard")}
          </Link>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border-dark bg-surface-dark px-8 py-4 text-base font-bold rounded-xl hover:bg-border-dark transition-colors"
          >
            {t("joinDiscord")}
          </a>
        </div>
      </div>
    </section>
  );
}
