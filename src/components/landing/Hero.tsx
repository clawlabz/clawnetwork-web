"use client";

import { useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import gsap from "gsap";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const els = contentRef.current.children;
    const ctx = gsap.context(() => {
      gsap.from(els, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.3,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden h-[100vh] flex items-center justify-center px-6 pt-24 bg-transparent">
      {/* Overlay gradient for text readability down smoothly */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-bg-dark/20 pointer-events-none" />

      <div ref={contentRef} className="max-w-[960px] text-center z-10 pointer-events-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold mb-6 tracking-widest uppercase backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          {t("badge")}
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tight drop-shadow-[0_0_30px_rgba(249,103,6,0.15)]">
          {locale === "zh" ? (
            <>
              {t("title")}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                {t("titleHighlight")}
              </span>
              {t("titleSuffix")}
            </>
          ) : (
            <>
              {t("title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
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
            className="bg-primary text-bg-dark px-8 py-4 text-base font-bold rounded-xl shadow-[0_0_30px_rgba(249,103,6,0.4)] hover:shadow-[0_0_50px_rgba(249,103,6,0.6)] hover:scale-105 transition-all duration-300"
          >
            {t("getStarted")}
          </Link>
          <Link
            href="/docs/quickstart"
            className="border border-border-dark bg-surface-dark/50 backdrop-blur-sm px-8 py-4 text-base font-bold rounded-xl hover:bg-border-dark hover:border-primary/30 transition-all duration-300"
          >
            {t("readDocs")}
          </Link>
        </div>
      </div>
    </section>
  );
}
