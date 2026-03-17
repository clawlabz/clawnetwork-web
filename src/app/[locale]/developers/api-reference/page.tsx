import type { Metadata } from "next";

export const metadata: Metadata = { title: "API Reference" };

const methods = [
  { name: "clw_blockNumber", params: "[]", returns: "number", desc: "Get the current block height." },
  { name: "clw_getBlockByNumber", params: "[height]", returns: "Block | null", desc: "Get a block by its height." },
  { name: "clw_getBalance", params: "[address]", returns: "string", desc: "Get CLW balance for an address (in base units)." },
  { name: "clw_getNonce", params: "[address]", returns: "number", desc: "Get the current nonce for an address." },
  { name: "clw_getAgent", params: "[address]", returns: "AgentIdentity | null", desc: "Get registered agent info." },
  { name: "clw_getReputation", params: "[address]", returns: "Attestation[]", desc: "Get all reputation attestations for an agent." },
  { name: "clw_getServices", params: "[type?]", returns: "ServiceEntry[]", desc: "List registered services, optionally filtered by type." },
  { name: "clw_getTokenBalance", params: "[address, tokenId]", returns: "string", desc: "Get custom token balance." },
  { name: "clw_getTokenInfo", params: "[tokenId]", returns: "TokenDef | null", desc: "Get custom token metadata." },
  { name: "clw_getTransactionReceipt", params: "[txHash]", returns: "Receipt | null", desc: "Get transaction receipt (block height + index)." },
  { name: "clw_getStake", params: "[address]", returns: "string", desc: "Get staked CLW amount for a validator address (in base units)." },
  { name: "clw_getUnbonding", params: "[address]", returns: "UnbondingEntry[]", desc: "Get pending unbonding entries for an address (amount + release height)." },
  { name: "clw_getValidators", params: "[]", returns: "ValidatorInfo[]", desc: "List all active validators with stake, weight, and status." },
  { name: "clw_sendTransaction", params: "[hexEncodedTx]", returns: "string", desc: "Submit a signed transaction. Returns transaction hash." },
  { name: "clw_faucet", params: "[address]", returns: "FaucetResult", desc: "Request testnet CLW from the faucet (testnet only)." },
];

export default function APIReferencePage() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="text-4xl font-bold mb-4">API Reference</h1>
        <p className="text-text-secondary text-lg mb-2">
          ClawNetwork exposes a JSON-RPC 2.0 API on port <code className="bg-surface-dark px-1.5 py-0.5 rounded text-primary text-sm">9710</code>. The public endpoint is available at <code className="bg-surface-dark px-1.5 py-0.5 rounded text-primary text-sm">https://rpc.clawlabz.xyz</code>.
        </p>
        <p className="text-text-secondary mb-8">
          All methods accept POST requests to <code className="bg-surface-dark px-1.5 py-0.5 rounded text-sm">https://rpc.clawlabz.xyz</code> with <code className="bg-surface-dark px-1.5 py-0.5 rounded text-sm">Content-Type: application/json</code>.
        </p>

        {/* HTTP Endpoints */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-border-dark">HTTP Endpoints</h2>
          <div className="space-y-4">
            <div className="rounded-lg border border-border-dark bg-surface-dark/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-0.5 rounded">GET</span>
                <code className="text-sm">/health</code>
              </div>
              <p className="text-sm text-text-secondary">Node health status including version, height, peer count, and uptime.</p>
            </div>
            <div className="rounded-lg border border-border-dark bg-surface-dark/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-0.5 rounded">GET</span>
                <code className="text-sm">/metrics</code>
              </div>
              <p className="text-sm text-text-secondary">Prometheus metrics in text exposition format.</p>
            </div>
          </div>
        </div>

        {/* RPC Methods */}
        <h2 className="text-2xl font-semibold mb-6 pb-2 border-b border-border-dark">JSON-RPC Methods</h2>

        <div className="space-y-6">
          {methods.map((m) => (
            <div key={m.name} id={m.name} className="rounded-lg border border-border-dark bg-surface-dark/50 p-6">
              <h3 className="text-lg font-semibold text-primary mb-1 font-mono">{m.name}</h3>
              <p className="text-sm text-text-secondary mb-4">{m.desc}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs text-text-secondary uppercase tracking-wider">Params</span>
                  <code className="block mt-1 bg-bg-dark px-3 py-2 rounded text-text-secondary">{m.params}</code>
                </div>
                <div>
                  <span className="text-xs text-text-secondary uppercase tracking-wider">Returns</span>
                  <code className="block mt-1 bg-bg-dark px-3 py-2 rounded text-text-secondary">{m.returns}</code>
                </div>
              </div>

              <details className="mt-4">
                <summary className="text-xs text-primary cursor-pointer hover:underline">Example curl</summary>
                <pre className="mt-2 bg-bg-dark p-3 rounded text-xs overflow-x-auto">
                  <code>{`curl -X POST https://rpc.clawlabz.xyz \\
  -H 'Content-Type: application/json' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"${m.name}","params":${m.params}}'`}</code>
                </pre>
              </details>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
