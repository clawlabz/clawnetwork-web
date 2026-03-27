"use client";

import { useState } from "react";

const TESTNET_RPC = "https://testnet-rpc.clawlabz.xyz";
const HEX_ADDRESS_REGEX = /^[0-9a-fA-F]{64}$/;

type FaucetState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; txHash: string }
  | { status: "error"; message: string };

export default function TestnetFaucetPage() {
  const [address, setAddress] = useState("");
  const [state, setState] = useState<FaucetState>({ status: "idle" });

  const isValidAddress = HEX_ADDRESS_REGEX.test(address);

  async function handleRequest() {
    if (!isValidAddress) {
      setState({ status: "error", message: "Please enter a valid 64-character hex wallet address." });
      return;
    }

    setState({ status: "loading" });

    try {
      const response = await fetch(TESTNET_RPC, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "claw_faucet",
          params: [address],
        }),
      });

      const data = await response.json();

      if (data.error) {
        setState({
          status: "error",
          message: data.error.message || "Faucet request failed. Please try again later.",
        });
      } else {
        setState({
          status: "success",
          txHash: data.result?.txHash || data.result?.tx_hash || data.result || "Success",
        });
      }
    } catch {
      setState({
        status: "error",
        message: "Failed to connect to testnet RPC. Please try again later.",
      });
    }
  }

  return (
    <main className="pt-24">
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-6">
            Testnet Only
          </div>
          <h1 className="text-4xl font-bold mb-4">Testnet Faucet</h1>
          <p className="text-text-secondary text-lg leading-relaxed">
            Get free testnet CLAW tokens to experiment with Agent Mining,
            token transfers, and the ClawNetwork SDK.
          </p>
        </div>

        <div className="rounded-xl border border-border-dark bg-surface-dark p-8">
          <label htmlFor="wallet-address" className="block text-sm font-medium mb-2">
            Wallet Address
          </label>
          <input
            id="wallet-address"
            type="text"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value.trim());
              if (state.status !== "idle") {
                setState({ status: "idle" });
              }
            }}
            placeholder="Enter your 64-character hex address"
            className="w-full rounded-lg border border-border-dark bg-bg-dark px-4 py-3 text-sm font-mono text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            spellCheck={false}
            autoComplete="off"
          />

          <button
            onClick={handleRequest}
            disabled={state.status === "loading" || !address}
            className="mt-4 w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state.status === "loading" ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Requesting...
              </span>
            ) : (
              "Request Tokens"
            )}
          </button>

          {state.status === "success" && (
            <div className="mt-4 rounded-lg border border-green-500/30 bg-green-500/10 p-4">
              <p className="text-sm text-green-400 font-medium">Tokens sent successfully!</p>
              {state.txHash !== "Success" && (
                <p className="text-xs text-green-400/70 font-mono mt-1 break-all">
                  TX: {state.txHash}
                </p>
              )}
            </div>
          )}

          {state.status === "error" && (
            <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
              <p className="text-sm text-red-400">{state.message}</p>
            </div>
          )}
        </div>

        <div className="mt-8 rounded-lg border border-border-dark bg-surface-dark/50 p-6">
          <h2 className="text-sm font-semibold mb-3 text-text-primary">Important Notes</h2>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              Testnet tokens have no real value. They are for development and testing only.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              For mainnet, earn CLAW by running a mining node.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              The faucet is rate-limited. Please wait between requests.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              You can get your wallet address from the ClawNetwork Wallet extension or by running{" "}
              <code className="text-primary text-xs">claw-node key show</code>.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
