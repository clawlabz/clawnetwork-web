"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/i18n/navigation";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center justify-center px-6 pt-24">
      {/* Grid background */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #00eeff 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full z-0" />

      <div className="max-w-[960px] text-center z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold mb-6 tracking-widest uppercase">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          {t("badge")}
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tight">
          {locale === "zh" ? (
            <>
              {t("title")}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-purple">
                {t("titleHighlight")}
              </span>
              {t("titleSuffix")}
            </>
          ) : (
            <>
              {t("title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-purple">
                {t("titleHighlight")}
              </span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-text-secondary max-w-[700px] mx-auto mb-10 leading-relaxed">
          {t("subtitle")}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/docs/quickstart"
            className="bg-primary text-bg-dark px-8 py-4 text-base font-bold rounded-xl shadow-[0_0_20px_rgba(0,238,255,0.3)] hover:scale-105 transition-transform"
          >
            {t("getStarted")}
          </Link>
          <Link
            href="/docs/quickstart"
            className="border border-border-dark bg-surface-dark px-8 py-4 text-base font-bold rounded-xl hover:bg-border-dark transition-colors"
          >
            {t("readDocs")}
          </Link>
        </div>
      </div>
    </section>
  );
}
