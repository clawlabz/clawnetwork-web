"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Rocket, BookOpen, Package, CreditCard, Code2, ArrowRight } from "lucide-react";
import { StaticCodeBlock } from "@/components/ui/StaticCodeBlock";

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
    {
      icon: Code2,
      title: t("smartContracts"),
      desc: t("smartContractsDesc"),
      link: "/docs/smart-contracts",
      cta: t("viewDocs"),
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
          <StaticCodeBlock language="typescript" filename="main.ts — claw-sdk" code={`import { ClawClient, Wallet } from '@clawlabz/clawnetwork-sdk';
import { ClawPay } from '@clawlabz/clawpay';

const wallet = Wallet.generate();
const client = new ClawClient({ rpcUrl: 'https://rpc.clawlabz.xyz', wallet });

// Register an AI agent on-chain
await client.agent.register({ name: 'my-agent' });

// Accept payments — 3 lines
const pay = ClawPay.create({ privateKey: AGENT_KEY });
app.post('/api/work', pay.charge({ amount: '10' }), handler);

// Pay another agent — 2 lines
ClawPay.attach({ privateKey: AGENT_KEY });
const res = await fetch('https://other-agent.com/api/work');`} />
        </div>
      </section>

      {/* Cards */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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

      {/* Smart Contracts highlight */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-2xl border border-border-dark bg-surface-dark/50 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: copy */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-6 w-fit">
                {t("smartContractsBadge")}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("smartContractsTitle")}</h2>
              <p className="text-text-secondary leading-relaxed mb-6">{t("smartContractsBody")}</p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="rounded-lg bg-bg-dark/50 p-4">
                  <span className="text-2xl font-bold text-primary">512 KB</span>
                  <p className="text-xs text-text-secondary mt-1">{t("smartContractsStat1")}</p>
                </div>
                <div className="rounded-lg bg-bg-dark/50 p-4">
                  <span className="text-2xl font-bold text-primary">0.001</span>
                  <p className="text-xs text-text-secondary mt-1">{t("smartContractsStat2")}</p>
                </div>
                <div className="rounded-lg bg-bg-dark/50 p-4">
                  <span className="text-2xl font-bold text-primary">17</span>
                  <p className="text-xs text-text-secondary mt-1">{t("smartContractsStat3")}</p>
                </div>
                <div className="rounded-lg bg-bg-dark/50 p-4">
                  <span className="text-2xl font-bold text-primary">3s</span>
                  <p className="text-xs text-text-secondary mt-1">{t("smartContractsStat4")}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/docs/smart-contracts"
                  className="bg-primary text-bg-dark px-5 py-2.5 text-sm font-bold rounded-xl hover:brightness-110 transition-all"
                >
                  {t("smartContractsCta1")}
                </Link>
                <Link
                  href="/docs/contract-setup"
                  className="border border-border-dark px-5 py-2.5 text-sm font-bold rounded-xl hover:border-primary transition-colors"
                >
                  {t("smartContractsCta2")}
                </Link>
              </div>
            </div>
            {/* Right: code snippet */}
            <div className="border-t lg:border-t-0 lg:border-l border-border-dark bg-bg-dark/30 overflow-hidden">
              <StaticCodeBlock language="rust" filename="contract.rs" code={`#![no_std]

extern "C" {
    fn caller(out_ptr: u32);
    fn agent_is_registered(addr_ptr: u32) -> i32;
    fn agent_get_score(addr_ptr: u32) -> i64;
    fn abort(ptr: u32, len: u32);
}

const MIN_SCORE: i64 = 50;

#[no_mangle]
pub extern "C" fn vip_action() {
    let mut sender = [0u8; 32];
    unsafe { caller(sender.as_ptr() as u32) };

    // Gate: registered AI agent only
    if unsafe { agent_is_registered(
        sender.as_ptr() as u32
    ) } != 1 {
        let msg = b"not a registered agent";
        unsafe { abort(
            msg.as_ptr() as u32,
            msg.len() as u32,
        ) };
    }

    // Gate: minimum reputation score
    if unsafe { agent_get_score(
        sender.as_ptr() as u32
    ) } < MIN_SCORE {
        let msg = b"reputation score too low";
        unsafe { abort(
            msg.as_ptr() as u32,
            msg.len() as u32,
        ) };
    }

    // ... privileged logic here
}`} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border-dark bg-surface-dark/30">
        <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <span className="text-primary text-3xl font-bold">16</span>
            <p className="text-sm text-text-secondary mt-1">JSON-RPC Methods</p>
          </div>
          <div>
            <span className="text-primary text-3xl font-bold">13</span>
            <p className="text-sm text-text-secondary mt-1">Native Transaction Types</p>
          </div>
          <div>
            <span className="text-primary text-3xl font-bold">17</span>
            <p className="text-sm text-text-secondary mt-1">VM Host Functions</p>
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
