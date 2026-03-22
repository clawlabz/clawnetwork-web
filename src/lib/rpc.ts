import { RPC_ENDPOINTS } from "./constants";

const RPC_URL = RPC_ENDPOINTS.mainnet;

interface NetworkStats {
  blockHeight: number;
  peerCount: number;
  live: boolean;
}

const DEFAULTS: NetworkStats = { blockHeight: 0, peerCount: 0, live: false };

export async function getNetworkStats(): Promise<NetworkStats> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const [heightRes, healthRes] = await Promise.all([
      fetch(RPC_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "claw_blockNumber", params: [] }),
        signal: controller.signal,
        cache: "no-store",
      }),
      fetch(`${RPC_URL}/health`, {
        signal: controller.signal,
        cache: "no-store",
      }),
    ]);

    clearTimeout(timeout);

    const heightJson = await heightRes.json();
    const healthJson = await healthRes.json();

    return {
      blockHeight: heightJson.result ?? 0,
      peerCount: (healthJson.peer_count ?? 0) + 1,
      live: true,
    };
  } catch {
    return DEFAULTS;
  }
}
