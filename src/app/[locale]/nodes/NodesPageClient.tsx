"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Calculator, ExternalLink, Zap, Users, TrendingDown, Shield, ChevronRight } from "lucide-react";
import { EXPLORER_URL } from "@/lib/constants";

// ── Reward constants (mirrors claw-node/crates/state/src/rewards.rs) ──────────
const BLOCKS_PER_DAY = 28_800;
const BLOCKS_PER_HOUR = 1_200;
const BLOCKS_PER_YEAR = 10_512_000;
const CLAW_DECIMALS = 1_000_000_000n;

type ReputationTier = "newcomer" | "established" | "veteran";

const TIER_BPS: Record<ReputationTier, number> = {
  newcomer: 2_000,
  established: 5_000,
  veteran: 10_000,
};

const TIER_LABELS: Record<ReputationTier, string> = {
  newcomer: "Newcomer  (<7 days, 20%)",
  established: "Established  (7–30 days, 50%)",
  veteran: "Veteran  (>30 days, 100%)",
};

const TIER_COLORS: Record<ReputationTier, string> = {
  newcomer: "text-yellow-400",
  established: "text-blue-400",
  veteran: "text-green-400",
};

/** Mining pool per block (base units). Always Period 0 = 8 CLAW × 35% = 2.8 CLAW for simplicity */
function miningPoolPerBlock(): bigint {
  // Period 0: 8 CLAW/block × 35% miner share = 2.8 CLAW
  return 2_800_000_000n;
}

function formatClaw(baseUnits: bigint, decimals = 2): string {
  if (baseUnits === 0n) return "0";
  const whole = baseUnits / CLAW_DECIMALS;
  const frac = baseUnits % CLAW_DECIMALS;
  const fracStr = frac === 0n ? "" : frac.toString().padStart(9, "0").replace(/0+$/, "").slice(0, decimals);
  const wholeFormatted = whole.toLocaleString("en-US");
  if (!fracStr) return wholeFormatted;
  return `${wholeFormatted}.${fracStr}`;
}

// ── Reward Schedule ────────────────────────────────────────────────────────────
const REWARD_SCHEDULE = [
  { period: 0, label: "Period 0", clawPerBlock: 8,    years: "Year 0–2",   minerPool: 2.8 },
  { period: 1, label: "Period 1", clawPerBlock: 4,    years: "Year 2–4",   minerPool: 1.4 },
  { period: 2, label: "Period 2", clawPerBlock: 2,    years: "Year 4–6",   minerPool: 0.7 },
  { period: 3, label: "Period 3", clawPerBlock: 1,    years: "Year 6–8",   minerPool: 0.35 },
  { period: 4, label: "Period 4", clawPerBlock: 0.5,  years: "Year 8–10",  minerPool: 0.175 },
  { period: 5, label: "Period 5+", clawPerBlock: 0.25, years: "Year 10+",  minerPool: 0.0875 },
];

const TIERS = [
  { tier: "Newcomer",    condition: "< 7 days",     bps: 2_000, weight: "20%", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
  { tier: "Established", condition: "7 – 30 days",  bps: 5_000, weight: "50%", color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/20" },
  { tier: "Veteran",     condition: "> 30 days",     bps: 10_000, weight: "100%", color: "text-green-400",  bg: "bg-green-500/10 border-green-500/20" },
];

// ── Component ─────────────────────────────────────────────────────────────────
export function NodesPageClient() {
  const [myTier, setMyTier] = useState<ReputationTier>("newcomer");
  const [otherTier, setOtherTier] = useState<ReputationTier>("veteran");
  const [minerCount, setMinerCount] = useState(20);

  const estimate = useMemo(() => {
    const myBps = TIER_BPS[myTier];
    const otherBps = TIER_BPS[otherTier];
    const others = Math.max(0, minerCount - 1);
    const totalWeight = myBps + others * otherBps;
    if (totalWeight === 0) return null;

    const pool = miningPoolPerBlock();
    const perBlock = pool * BigInt(myBps) / BigInt(totalWeight);
    const sharePercent = (myBps / totalWeight) * 100;

    return {
      perBlock,
      perHour: perBlock * BigInt(BLOCKS_PER_HOUR),
      perDay: perBlock * BigInt(BLOCKS_PER_DAY),
      perMonth: perBlock * BigInt(BLOCKS_PER_DAY) * 30n,
      perYear: perBlock * BigInt(BLOCKS_PER_YEAR),
      sharePercent,
    };
  }, [myTier, otherTier, minerCount]);

  return (
    <main className="pt-24">
      <section className="mx-auto max-w-7xl px-6 py-16">

        {/* Page header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary mb-5">
            <Zap className="h-3.5 w-3.5" />
            Node Mining Rewards
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Run a Node. Earn CLAW.</h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Any device can join ClawNetwork as a miner. Estimate your daily earnings based on the current network state.
          </p>
          <a
            href={`${EXPLORER_URL}/rewards`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-bg-dark hover:brightness-110 transition-all"
          >
            View Live Calculator
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14">
          {[
            { icon: Zap,         label: "Block Time",       value: "~3 sec" },
            { icon: TrendingDown, label: "Current Reward",  value: "8 CLAW/block" },
            { icon: Users,       label: "Miner Pool Share", value: "35%" },
            { icon: Shield,      label: "Min. Stake",       value: "None" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border-dark bg-surface-dark/30 p-5 text-center">
              <s.icon className="h-5 w-5 text-primary mx-auto mb-2 opacity-80" />
              <div className="text-[11px] text-text-secondary uppercase tracking-wider mb-1">{s.label}</div>
              <div className="text-base font-bold text-primary font-mono">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Calculator */}
        <div className="rounded-2xl border border-border-dark bg-surface-dark/30 p-6 md:p-8 mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Calculator className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Miner Reward Estimator</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: inputs */}
            <div className="space-y-6">
              {/* My tier */}
              <div>
                <label className="text-xs text-text-secondary uppercase tracking-wider block mb-3">My Reputation Tier</label>
                <div className="space-y-2">
                  {(["newcomer", "established", "veteran"] as ReputationTier[]).map((tier) => (
                    <label
                      key={tier}
                      onClick={() => setMyTier(tier)}
                      className="flex items-center gap-3 cursor-pointer rounded-lg border border-border-dark bg-bg-dark/50 px-4 py-3 hover:border-primary/40 transition-colors"
                    >
                      <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${myTier === tier ? "border-primary bg-primary/20" : "border-border-dark"}`}>
                        {myTier === tier && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
                      </div>
                      <span className={`text-sm select-none ${TIER_COLORS[tier]}`}>{TIER_LABELS[tier]}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Other miners tier */}
              <div>
                <label className="text-xs text-text-secondary uppercase tracking-wider block mb-2">Other Miners Avg. Tier</label>
                <select
                  value={otherTier}
                  onChange={(e) => setOtherTier(e.target.value as ReputationTier)}
                  className="w-full rounded-lg border border-border-dark bg-bg-dark px-3 py-2.5 text-sm text-text-primary focus:border-primary focus:outline-none"
                >
                  {(["newcomer", "established", "veteran"] as ReputationTier[]).map((t) => (
                    <option key={t} value={t}>{TIER_LABELS[t]}</option>
                  ))}
                </select>
              </div>

              {/* Miner count */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-text-secondary uppercase tracking-wider">Total Active Miners</label>
                  <span className="text-xs font-mono text-primary">{minerCount}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={200}
                  value={minerCount}
                  onChange={(e) => setMinerCount(parseInt(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-[10px] text-text-secondary/60 mt-1">
                  <span>1</span><span>50</span><span>100</span><span>200</span>
                </div>
              </div>

              {/* Pool share */}
              {estimate && (
                <div className="rounded-lg bg-primary/10 border border-primary/20 p-4">
                  <div className="text-xs text-text-secondary mb-1">Your share of miner pool</div>
                  <div className="text-3xl font-bold text-primary font-mono">
                    {estimate.sharePercent < 0.01 ? "< 0.01" : estimate.sharePercent.toFixed(2)}%
                  </div>
                  <div className="text-xs text-text-secondary mt-1">Pool: 2.8 CLAW/block (Period 0)</div>
                </div>
              )}
            </div>

            {/* Right: results */}
            {estimate && (
              <div>
                <div className="text-xs text-text-secondary uppercase tracking-wider mb-3">Expected Earnings</div>
                <div className="space-y-2">
                  {[
                    { label: "Per Block",              value: estimate.perBlock,  decimals: 4, highlight: false },
                    { label: "Per Hour (1,200 blocks)", value: estimate.perHour,  decimals: 2, highlight: false },
                    { label: "Per Day (28,800 blocks)", value: estimate.perDay,   decimals: 2, highlight: true  },
                    { label: "Per Month (30 days)",     value: estimate.perMonth, decimals: 2, highlight: false },
                    { label: "Per Year (est.)",         value: estimate.perYear,  decimals: 0, highlight: false },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className={`flex items-center justify-between rounded-lg px-4 py-3 ${
                        row.highlight
                          ? "border border-primary/30 bg-primary/10"
                          : "border border-border-dark bg-bg-dark/40"
                      }`}
                    >
                      <span className="text-sm text-text-secondary">{row.label}</span>
                      <span className={`font-mono font-bold ${row.highlight ? "text-primary text-base" : "text-sm text-text-primary"}`}>
                        {formatClaw(row.value, row.decimals)}
                        <span className="text-text-secondary font-normal ml-1 text-xs">CLAW</span>
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-text-secondary/60 mt-4">
                  * Based on Period 0 (8 CLAW/block). Actual rewards depend on live network state.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Reward schedule table */}
        <div className="rounded-2xl border border-border-dark bg-surface-dark/30 p-6 md:p-8 mb-12">
          <h2 className="text-xl font-bold mb-2">Reward Decay Schedule</h2>
          <p className="text-sm text-text-secondary mb-6">Block rewards halve every 2 years, ensuring long-term sustainability.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-dark text-text-secondary text-xs uppercase tracking-wider">
                  <th className="px-3 py-2.5 text-left">Period</th>
                  <th className="px-3 py-2.5 text-left">Years</th>
                  <th className="px-3 py-2.5 text-right">CLAW / Block</th>
                  <th className="px-3 py-2.5 text-right">Miner Pool / Block</th>
                  <th className="px-3 py-2.5 text-right">Miner Pool / Day</th>
                </tr>
              </thead>
              <tbody>
                {REWARD_SCHEDULE.map((row, i) => (
                  <tr key={row.period} className={`border-b border-border-dark/50 ${i === 0 ? "bg-primary/5" : ""}`}>
                    <td className="px-3 py-3 font-mono text-xs font-medium">
                      {row.label}
                      {i === 0 && <span className="ml-2 text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">Current</span>}
                    </td>
                    <td className="px-3 py-3 text-xs text-text-secondary">{row.years}</td>
                    <td className="px-3 py-3 text-right font-mono text-xs font-bold">{row.clawPerBlock}</td>
                    <td className="px-3 py-3 text-right font-mono text-xs text-primary">{row.minerPool}</td>
                    <td className="px-3 py-3 text-right font-mono text-xs text-text-secondary">
                      {(row.minerPool * BLOCKS_PER_DAY).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reputation tiers */}
        <div className="rounded-2xl border border-border-dark bg-surface-dark/30 p-6 md:p-8 mb-12">
          <h2 className="text-xl font-bold mb-2">Reputation Tiers</h2>
          <p className="text-sm text-text-secondary mb-6">
            Nodes gain higher reward weight the longer they stay online. No stake required — just uptime.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TIERS.map((t) => (
              <div key={t.tier} className={`rounded-xl border p-5 ${t.bg}`}>
                <div className={`text-lg font-bold mb-1 ${t.color}`}>{t.tier}</div>
                <div className="text-xs text-text-secondary mb-3">{t.condition} registered</div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Reputation bps</span>
                  <span className="font-mono font-bold">{t.bps.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-text-secondary">Relative weight</span>
                  <span className={`font-mono font-bold ${t.color}`}>{t.weight}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-lg bg-border-dark/30 border border-border-dark px-4 py-3 text-xs text-text-secondary">
            <strong className="text-text-primary">Heartbeat required:</strong> Miners must submit a heartbeat transaction every ~1,000 blocks (~50 min). Missing 2,000 consecutive blocks marks the node inactive.
          </div>
        </div>

        {/* CTA → Explorer */}
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">See Live Network Data</h2>
          <p className="text-text-secondary mb-6 max-w-lg mx-auto">
            View the real-time leaderboard, look up any miner address, and get live reward estimates based on current on-chain state.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`${EXPLORER_URL}/rewards`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-bg-dark hover:brightness-110 transition-all"
            >
              Open Rewards Calculator
              <ExternalLink className="h-4 w-4" />
            </a>
            <Link
              href="/docs/quickstart"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border-dark px-6 py-3 text-sm font-medium text-text-secondary hover:border-primary/40 hover:text-text-primary transition-colors"
            >
              How to Run a Node
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

      </section>
    </main>
  );
}
