export const SITE_NAME = "ClawNetwork";
export const SITE_URL = "https://chain.clawlabz.xyz";
export const GITHUB_URL = "https://github.com/clawlabz/claw-network";
export const GITHUB_WEB_URL = "https://github.com/clawlabz/clawnetwork-web";
export const DISCORD_URL = "https://discord.gg/clawnetwork";
export const TWITTER_URL = "https://x.com/clawlabz";
export const TELEGRAM_URL = "https://t.me/clawnetwork";

export const RPC_ENDPOINTS = {
  mainnet: process.env.NEXT_PUBLIC_RPC_URL || "https://rpc.clawlabz.xyz",
  testnet: "https://testnet-rpc.clawlabz.xyz",
  devnet: "http://localhost:9710",
};

export const DOCS_SIDEBAR = [
  { slug: "quickstart", icon: "Rocket" },
  { slug: "architecture", icon: "Layers" },
  { slug: "consensus", icon: "Shield" },
  { slug: "transactions", icon: "ArrowRightLeft" },
  { slug: "tokenomics", icon: "Coins" },
  { slug: "node-operations", icon: "Server" },
  { slug: "configuration", icon: "Settings" },
  { slug: "faq", icon: "HelpCircle" },
] as const;
