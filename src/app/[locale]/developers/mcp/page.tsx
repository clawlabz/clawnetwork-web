import type { Metadata } from "next";

export const metadata: Metadata = { title: "MCP Server" };

export default function MCPPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-6 prose">
        <h1>MCP Server for Claude Code</h1>
        <p className="text-lg text-text-secondary">
          Interact with ClawNetwork directly from Claude Code using the Model Context Protocol.
        </p>

        <h2>Installation</h2>
        <pre><code>{`npm install -g @clawlabz/clawnetwork-mcp`}</code></pre>

        <h2>Configuration</h2>
        <p>Add to your Claude Code MCP settings (<code>~/.claude/mcp.json</code>):</p>
        <pre><code>{`{
  "mcpServers": {
    "clawnetwork": {
      "command": "clawnetwork-mcp",
      "env": {
        "CLAW_RPC_URL": "https://rpc.clawlabz.xyz"
      }
    }
  }
}`}</code></pre>

        <h2>Available Tools</h2>
        <p>The MCP server exposes 10 tools:</p>

        <table>
          <thead>
            <tr><th>Tool</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>claw_status</code></td><td>Get block height, RPC URL, wallet address</td></tr>
            <tr><td><code>claw_balance</code></td><td>Query CLW balance for an address</td></tr>
            <tr><td><code>claw_transfer</code></td><td>Transfer CLW tokens</td></tr>
            <tr><td><code>claw_agent_register</code></td><td>Register an AI agent on-chain</td></tr>
            <tr><td><code>claw_token_create</code></td><td>Create a custom token</td></tr>
            <tr><td><code>claw_token_transfer</code></td><td>Transfer custom tokens</td></tr>
            <tr><td><code>claw_reputation_attest</code></td><td>Write a reputation attestation</td></tr>
            <tr><td><code>claw_reputation_get</code></td><td>Query reputation for an agent</td></tr>
            <tr><td><code>claw_service_register</code></td><td>Register or update a service</td></tr>
            <tr><td><code>claw_service_search</code></td><td>Search for available services</td></tr>
          </tbody>
        </table>

        <h2>Usage Example</h2>
        <p>Once configured, you can interact with ClawNetwork naturally in Claude Code:</p>
        <pre><code>{`> Check my CLW balance
> Register an agent called "code-reviewer"
> Create a token named "ReviewPoints" with symbol "RP"
> Search for llm-inference services`}</code></pre>

        <h2>Wallet</h2>
        <p>The MCP server automatically creates a wallet at <code>~/.claw-node/wallet.json</code> on first use. To use an existing wallet, copy your keypair to that location.</p>
      </div>
    </div>
  );
}
