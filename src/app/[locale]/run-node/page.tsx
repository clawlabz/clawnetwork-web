"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  Download,
  Zap,
  BarChart3,
  HardDrive,
  Clock,
  Shield,
  ExternalLink,
  Chrome,
  MessageCircle,
  BookOpen,
} from "lucide-react";
import {
  CHROME_EXTENSION_URL,
  EXPLORER_URL,
  DISCORD_URL,
} from "@/lib/constants";

const STEPS = ["install", "start", "earn"] as const;
const STEP_ICONS = [Download, Zap, BarChart3] as const;

const STATS = [
  { key: "nodeSize", icon: HardDrive },
  { key: "blockTime", icon: Clock },
  { key: "minStake", icon: Shield },
] as const;

export default function RunNodePage() {
  const t = useTranslations("runNode");

  return (
    <div className="relative pt-32 pb-24">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 blur-[160px] rounded-full pointer-events-none" />

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 text-center mb-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/5 px-4 py-1.5 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          <span className="text-sm font-medium text-green-400">
            {t("badge")}
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          {t("title")}
        </h1>
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10">
          {t("subtitle")}
        </p>

        {/* Quick stats */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {STATS.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-surface-dark/40 px-5 py-3"
            >
              <Icon className="h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="text-xs text-text-secondary">
                  {t(`stats.${key}.label`)}
                </div>
                <div className="text-sm font-semibold">
                  {t(`stats.${key}.value`)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href={CHROME_EXTENSION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-primary-light hover:shadow-[0_8px_30px_rgba(249,103,6,0.3)]"
        >
          <Chrome className="h-5 w-5" />
          {t("cta")}
          <ExternalLink className="h-4 w-4 ml-1" />
        </a>
      </section>

      {/* 3-Step Quickstart */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight">
          {t("steps.title")}
        </h2>
        <div className="h-1 w-16 bg-primary rounded-full mx-auto mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <div
                key={step}
                className="group relative rounded-2xl border border-white/10 bg-surface-dark/40 p-8 text-center transition-all duration-300 hover:border-primary/30 hover:bg-surface-dark/60"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                  {i + 1}
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mx-auto mb-5 mt-2">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {t(`steps.${step}.title`)}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {t(`steps.${step}.desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Run a Node */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight">
          {t("why.title")}
        </h2>
        <div className="h-1 w-16 bg-primary rounded-full mx-auto mb-12" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {(["earn", "lightweight", "decentralize", "community"] as const).map(
            (key) => (
              <div
                key={key}
                className="rounded-2xl border border-white/5 bg-surface-dark/40 p-6 transition-colors duration-300 hover:border-white/10"
              >
                <h3 className="font-semibold text-lg mb-2">
                  {t(`why.${key}.title`)}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {t(`why.${key}.desc`)}
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight">
          {t("faq.title")}
        </h2>
        <div className="h-1 w-16 bg-primary rounded-full mx-auto mb-12" />

        <div className="space-y-4">
          {(["q1", "q2", "q3", "q4", "q5"] as const).map((q) => (
            <details
              key={q}
              className="group rounded-xl border border-white/10 bg-surface-dark/40 overflow-hidden"
            >
              <summary className="cursor-pointer px-6 py-4 text-sm font-semibold list-none flex items-center justify-between hover:text-primary transition-colors">
                {t(`faq.${q}.q`)}
                <span className="text-text-secondary group-open:rotate-45 transition-transform text-lg">
                  +
                </span>
              </summary>
              <div className="px-6 pb-4 text-sm text-text-secondary leading-relaxed">
                {t(`faq.${q}.a`)}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative z-10 mx-auto max-w-3xl px-6">
        <div className="rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-sm p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
            {t("bottomCta.title")}
          </h2>
          <p className="text-text-secondary mb-8">
            {t("bottomCta.subtitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={CHROME_EXTENSION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light"
            >
              <Chrome className="h-4 w-4" />
              {t("cta")}
            </a>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-surface-dark/60 px-6 py-3 text-sm font-semibold text-text-secondary transition-all hover:border-white/20 hover:text-white"
            >
              <MessageCircle className="h-4 w-4" />
              {t("joinDiscord")}
            </a>
            <Link
              href="/docs/quickstart"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-surface-dark/60 px-6 py-3 text-sm font-semibold text-text-secondary transition-all hover:border-white/20 hover:text-white"
            >
              <BookOpen className="h-4 w-4" />
              {t("readDocs")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
