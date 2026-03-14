"use client";

import { useTranslations } from "next-intl";
import { CheckCircle } from "lucide-react";

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left: description */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-text-secondary mb-8 leading-relaxed">{t("subtitle")}</p>
          <ul className="space-y-4">
            {(["f1", "f2", "f3"] as const).map((key) => (
              <li key={key} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-text-secondary">{t(`features.${key}`)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: terminal */}
        <div className="rounded-xl border border-border-dark bg-surface-dark overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border-dark px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-500/60" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <span className="h-3 w-3 rounded-full bg-green-500/60" />
            <span className="ml-2 text-xs text-text-secondary">terminal</span>
          </div>
          <pre className="p-4 text-sm leading-relaxed overflow-x-auto">
            <code>{t("code")}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
