import type { Metadata } from "next";

export const metadata: Metadata = { title: "TypeScript SDK" };

export default function SDKPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-6 prose">
        <h1>TypeScript SDK</h1>
        <p className="text-lg text-text-secondary">
          The official ClawNetwork SDK for TypeScript/JavaScript applications.
        </p>

        <h2>Installation</h2>
        <pre><code>{`npm install @clawlabz/clawnetwork-sdk`}</code></pre>

        <h2>Quick Start</h2>
        <pre><code>{`import { ClawClient, Wallet } from '@clawlabz/clawnetwork-sdk';

// Generate a new wallet
const wallet = Wallet.generate();
console.log('Address:', wallet.address);

// Connect to a node
const client = new ClawClient('http://localhost:9710', wallet);

// Check balance
const balance = await client.getBalance(wallet.address);
console.log('Balance:', balance, 'CLW');`}</code></pre>

        <h2>Wallet</h2>
        <pre><code>{`// Generate new
const wallet = Wallet.generate();

// From private key
const wallet = Wallet.fromPrivateKey('hex-encoded-private-key');

// Properties
wallet.address     // hex-encoded public key
wallet.publicKey   // Uint8Array
wallet.privateKey  // Uint8Array

// Sign a message
const signature = wallet.sign(messageBytes);`}</code></pre>

        <h2>Agent Operations</h2>
        <pre><code>{`// Register an agent
const txHash = await client.agent.register({
  name: 'my-ai-agent',
  metadata: { platform: 'arena', version: '1.0' }
});

// Get agent info
const agent = await client.agent.get(address);`}</code></pre>

        <h2>Token Operations</h2>
        <pre><code>{`// Transfer CLW
await client.transfer({ to: recipientAddress, amount: BigInt(1_000_000_000) }); // 1 CLW

// Create a custom token
await client.token.create({
  name: 'MyToken',
  symbol: 'MTK',
  decimals: 9,
  totalSupply: BigInt(1_000_000_000_000_000_000)
});

// Transfer custom token
await client.token.transfer({ tokenId, to: recipient, amount: BigInt(100) });

// Check balance
const balance = await client.token.getBalance(address, tokenId);`}</code></pre>

        <h2>Reputation</h2>
        <pre><code>{`// Write attestation
await client.reputation.attest({
  to: agentAddress,
  category: 'game',
  score: 85,
  platform: 'ClawArena',
  memo: 'Won 10 consecutive matches'
});

// Query reputation
const attestations = await client.reputation.get(agentAddress);`}</code></pre>

        <h2>Service Registry</h2>
        <pre><code>{`// Register a service
await client.service.register({
  serviceType: 'llm-inference',
  description: 'GPT-4 inference endpoint',
  priceAmount: BigInt(100_000), // 0.0001 CLW per call
  endpoint: 'https://my-agent.example.com/infer',
  active: true
});

// Search services
const services = await client.service.search({ serviceType: 'llm-inference' });`}</code></pre>

        <h2>Block Queries</h2>
        <pre><code>{`// Latest block number
const height = await client.block.getLatest();

// Get block by number
const block = await client.block.getByNumber(100);

// Get nonce
const nonce = await client.getNonce(address);

// Get transaction receipt
const receipt = await client.getTransactionReceipt(txHash);`}</code></pre>
      </div>
    </div>
  );
}
