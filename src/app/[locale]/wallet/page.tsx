"use client";

import { useTranslations } from "next-intl";
import {
  ArrowUpDown,
  Landmark,
  Bot,
  Shield,
  History,
  Droplets,
  Plug,
  Chrome,
  ExternalLink,
} from "lucide-react";
import { CHROME_EXTENSION_URL } from "@/lib/constants";

const FEATURE_ICONS = [ArrowUpDown, Landmark, Bot, Shield, History, Droplets, Plug] as const;
const FEATURE_KEYS = ["send", "stake", "agent", "security", "explorer", "faucet", "api"] as const;

export default function WalletPage() {
  const t = useTranslations("wallet");

  return (
    <div className="relative pt-32 pb-24">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 blur-[160px] rounded-full pointer-events-none" />

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 text-center mb-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          <span className="text-sm font-medium text-primary">{t("availableOn")}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          {t("title")}
        </h1>
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12">
          {t("subtitle")}
        </p>

        {/* Chrome Extension - single hero card */}
        <div className="max-w-xl mx-auto">
          <a
            href={CHROME_EXTENSION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block rounded-2xl border border-white/10 bg-surface-dark/60 backdrop-blur-sm p-10 text-left transition-all duration-300 hover:border-primary/30 hover:bg-surface-dark/80 hover:shadow-[0_20px_60px_rgba(249,103,6,0.1)]"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
                  <Chrome className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{t("chromeExtension")}</h2>
                  <span className="text-xs font-medium text-green-400 uppercase tracking-wider">Live</span>
                </div>
              </div>
              <p className="text-text-secondary leading-relaxed mb-8">
                {t("chromeExtensionDesc")}
              </p>
              <div className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all group-hover:bg-primary-light group-hover:shadow-[0_8px_30px_rgba(249,103,6,0.3)]">
                <Chrome className="h-4 w-4" />
                {t("installExtension")}
                <ExternalLink className="h-4 w-4 ml-1" />
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight">
          {t("features.title")}
        </h2>
        <div className="h-1 w-16 bg-primary rounded-full mx-auto mb-16" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURE_KEYS.map((key, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <div
                key={key}
                className="group rounded-2xl border border-white/5 bg-surface-dark/40 p-6 transition-colors duration-300 hover:border-white/10 hover:bg-surface-dark/60"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t(`features.${key}`)}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {t(`features.${key}Desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Developer API Showcase */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight">
          {t("devSection.title")}
        </h2>
        <p className="text-lg text-text-secondary text-center mb-12">
          {t("devSection.subtitle")}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Code example - DApp Provider */}
          <div className="rounded-2xl border border-white/10 bg-surface-dark/60 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-2 text-xs text-text-secondary font-mono">DApp Provider</span>
            </div>
            <pre className="text-sm font-mono text-text-secondary leading-relaxed overflow-x-auto">
              <code>{`// Transfer CLAW — one line
await clawNetwork.request({
  method: 'claw_transfer',
  params: ['<address>', '100']
})

// Stake tokens
await clawNetwork.request({
  method: 'claw_stake',
  params: ['500']
})

// Register AI Agent identity
await clawNetwork.request({
  method: 'claw_registerAgent',
  params: ['my-agent']
})`}</code>
            </pre>
          </div>

          {/* Code example - REST API */}
          <div className="rounded-2xl border border-white/10 bg-surface-dark/60 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-2 text-xs text-text-secondary font-mono">REST API (Node Dashboard)</span>
            </div>
            <pre className="text-sm font-mono text-text-secondary leading-relaxed overflow-x-auto">
              <code>{`# Transfer via REST
curl -X POST localhost:19877/api/transfer \\
  -d '{"to": "<address>", "amount": "100"}'

# Check balance
curl localhost:19877/api/wallet/balance

# Register agent
curl -X POST localhost:19877/api/agent/register \\
  -d '{"name": "my-agent"}'`}</code>
            </pre>
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href="/docs/agent-api"
            className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/10 hover:border-primary/50"
          >
            {t("devSection.cta")}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Get Started Steps */}
      <section className="relative z-10 mx-auto max-w-3xl px-6">
        <div className="rounded-2xl border border-white/10 bg-surface-dark/60 backdrop-blur-sm p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight">
            {t("getStarted")}
          </h2>
          <ol className="space-y-5">
            {(["step1", "step2", "step3", "step4"] as const).map((step, i) => (
              <li key={step} className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold">
                  {i + 1}
                </div>
                <span className="text-text-secondary pt-1 text-sm leading-relaxed">
                  {t(`getStartedSteps.${step}`)}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <a
              href={CHROME_EXTENSION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-[0_8px_30px_rgba(249,103,6,0.3)]"
            >
              <Chrome className="h-4 w-4" />
              {t("installExtension")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
