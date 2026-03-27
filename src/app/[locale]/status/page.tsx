"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, useCallback } from "react";
import { type LucideIcon } from "lucide-react";
import { Box, Users, Cpu, Tag, Wifi, Shield } from "lucide-react";

interface NetworkData {
  blockHeight: number;
  peerCount: number;
  activeValidators: number;
  activeMiners: number;
  networkVersion: string;
  live: boolean;
}

const DEFAULTS: NetworkData = {
  blockHeight: 0,
  peerCount: 0,
  activeValidators: 0,
  activeMiners: 0,
  networkVersion: "-",
  live: false,
};

const REFRESH_INTERVAL = 30_000;

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-border-dark bg-surface-dark/30 p-6 animate-pulse">
      <div className="h-4 w-20 bg-border-dark rounded mb-4" />
      <div className="h-8 w-28 bg-border-dark rounded mb-2" />
      <div className="h-3 w-16 bg-border-dark/50 rounded" />
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-border-dark bg-surface-dark/30 p-6 hover:border-primary/50 transition-colors">
      <div className="flex items-center gap-2 text-text-secondary mb-3">
        <Icon className="h-4 w-4" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <p className="text-2xl md:text-3xl font-bold tracking-tight">{value}</p>
      {sub && <p className="text-xs text-text-secondary mt-1">{sub}</p>}
    </div>
  );
}

export default function StatusPage() {
  const t = useTranslations("status");
  const [data, setData] = useState<NetworkData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/rpc", { cache: "no-store" });
      if (!res.ok) {
        setData({ ...DEFAULTS, live: false });
        return;
      }
      const json = await res.json();
      setData(json);
      setLastUpdated(new Date());
    } catch {
      setData({ ...DEFAULTS, live: false });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <main className="pt-24">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Uptime indicator */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span
            className={`relative flex h-3 w-3 ${data?.live ? "" : ""}`}
          >
            {data?.live && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            )}
            <span
              className={`relative inline-flex h-3 w-3 rounded-full ${
                loading
                  ? "bg-yellow-400"
                  : data?.live
                    ? "bg-green-400"
                    : "bg-red-400"
              }`}
            />
          </span>
          <span className="text-sm font-medium">
            {loading ? t("loading") : data?.live ? t("online") : t("offline")}
          </span>
        </div>

        {/* Stats grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              icon={Box}
              label={t("blockHeight")}
              value={data?.blockHeight?.toLocaleString() ?? "0"}
            />
            <StatCard
              icon={Shield}
              label={t("activeValidators")}
              value={data?.activeValidators ?? 0}
            />
            <StatCard
              icon={Users}
              label={t("peerCount")}
              value={data?.peerCount ?? 0}
            />
            <StatCard
              icon={Cpu}
              label={t("activeMiners")}
              value={data?.activeMiners ?? 0}
            />
            <StatCard
              icon={Tag}
              label={t("networkVersion")}
              value={data?.networkVersion ?? "-"}
            />
            <StatCard
              icon={Wifi}
              label={t("rpcEndpoint")}
              value="rpc.clawlabz.xyz"
            />
          </div>
        )}

        {/* Footer info */}
        <div className="mt-8 text-center text-xs text-text-secondary space-y-1">
          {lastUpdated && (
            <p>{t("lastUpdated")}: {formatTime(lastUpdated)}</p>
          )}
          <p>{t("autoRefresh")}</p>
        </div>
      </section>
    </main>
  );
}
