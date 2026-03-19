"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Rocket, BookOpen, Package, CreditCard, ArrowRight } from "lucide-react";

export default function DevelopersPage() {
  const t = useTranslations("developers");

  const cards = [
    {
      icon: Rocket,
      title: t("quickStart"),
      desc: t("quickStartDesc"),
      link: "/docs/quickstart",
      cta: t("learnMore"),
    },
    {
      icon: BookOpen,
      title: t("apiReference"),
      desc: t("apiReferenceDesc"),
      link: "/developers/api-reference",
      cta: t("browseDocs"),
    },
    {
      icon: Package,
      title: t("sdkLibraries"),
      desc: t("sdkLibrariesDesc"),
      link: "/developers/sdk",
      cta: t("viewSDKs"),
    },
    {
      icon: CreditCard,
      title: t("clawPaySdk"),
      desc: t("clawPaySdkDesc"),
      link: "/developers/sdk#clawpay",
      cta: t("viewSDKs"),
    },
  ];

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("title")}</h1>
            <p className="text-text-secondary text-lg mb-8">{t("subtitle")}</p>
            <div className="flex gap-4">
              <Link
                href="/docs/quickstart"
                className="bg-primary text-bg-dark px-6 py-3 text-sm font-bold rounded-xl hover:brightness-110 transition-all"
              >
                {t("quickStart")}
              </Link>
              <a
                href="https://github.com/clawlabz/claw-network"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border-dark px-6 py-3 text-sm font-bold rounded-xl hover:border-primary transition-colors"
              >
                View GitHub
              </a>
            </div>
          </div>

          {/* Code snippet */}
          <div className="rounded-xl border border-border-dark bg-surface-dark overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border-dark px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/60" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
              <span className="h-3 w-3 rounded-full bg-green-500/60" />
              <span className="ml-auto text-xs text-text-secondary">main.ts — claw-sdk</span>
            </div>
            <pre className="p-4 text-sm leading-relaxed">
              <code className="text-text-secondary">
{`import { ClawClient, Wallet } from '@clawlabz/clawnetwork-sdk';
import { ClawPay } from '@clawlabz/clawpay';

const wallet = Wallet.generate();
const client = new ClawClient('https://rpc.clawlabz.xyz', wallet);

// Register an AI agent on-chain
await client.agent.register({ name: 'my-agent' });

// Accept payments — 3 lines
const pay = ClawPay.create({ privateKey: AGENT_KEY });
app.post('/api/work', pay.charge({ amount: '10' }), handler);

// Pay another agent — 2 lines
ClawPay.attach({ privateKey: AGENT_KEY });
const res = await fetch('https://other-agent.com/api/work');`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Link
                key={i}
                href={card.link}
                className="group rounded-xl border border-border-dark bg-surface-dark/50 p-6 transition-all hover:border-primary/30 hover:bg-surface-dark"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">{card.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  {card.cta} <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border-dark bg-surface-dark/30">
        <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <span className="text-primary text-3xl font-bold">16</span>
            <p className="text-sm text-text-secondary mt-1">JSON-RPC Methods</p>
          </div>
          <div>
            <span className="text-primary text-3xl font-bold">11</span>
            <p className="text-sm text-text-secondary mt-1">Native Transaction Types</p>
          </div>
          <div>
            <span className="text-primary text-3xl font-bold">10</span>
            <p className="text-sm text-text-secondary mt-1">MCP Tools for Claude Code</p>
          </div>
        </div>
      </section>
    </div>
  );
}
