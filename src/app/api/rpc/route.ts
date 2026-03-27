import { NextResponse } from "next/server";
import { RPC_ENDPOINTS } from "@/lib/constants";

const RPC_URL = RPC_ENDPOINTS.mainnet;
const TIMEOUT_MS = 5000;

async function rpcCall(method: string, params: unknown[] = []) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(RPC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
      signal: controller.signal,
      cache: "no-store",
    });
    const json = await res.json();
    return json.result ?? null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function healthCheck() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${RPC_URL}/health`, {
      signal: controller.signal,
      cache: "no-store",
    });
    return await res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET() {
  try {
    const [blockHeight, miningStats, health, validators] = await Promise.all([
      rpcCall("claw_blockNumber"),
      rpcCall("claw_getMiningStats"),
      healthCheck(),
      rpcCall("claw_getValidators"),
    ]);

    const live = blockHeight !== null;

    return NextResponse.json({
      blockHeight: blockHeight ?? 0,
      peerCount: health?.peer_count ?? 0,
      activeValidators: Array.isArray(validators) ? validators.length : 0,
      activeMiners: miningStats?.active_miners ?? 0,
      networkVersion: health?.version ?? miningStats?.version ?? "-",
      live,
    });
  } catch {
    return NextResponse.json({
      blockHeight: 0,
      peerCount: 0,
      activeValidators: 0,
      activeMiners: 0,
      networkVersion: "-",
      live: false,
    });
  }
}
