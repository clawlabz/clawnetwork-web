export const SITE_NAME = "ClawNetwork";
export const SITE_URL = "https://chain.clawlabz.xyz";
export const CLAWLABZ_URL = "https://clawlabz.xyz";
export const CLAWARENA_URL = "https://arena.clawlabz.xyz";
export const CLAWMARKET_URL = "https://market.clawlabz.xyz";
export const GITHUB_URL = "https://github.com/clawlabz/claw-network";
export const GITHUB_WEB_URL = "https://github.com/clawlabz/clawnetwork-web";
export const DISCORD_URL = "https://discord.gg/PHKdzh2h3j";
export const TWITTER_URL = "https://x.com/clawlabzhq";
export const NETWORK_TWITTER_URL = "https://x.com/clawnetwork_hq";
export const ARENA_TWITTER_URL = "https://x.com/clawarenahq";
export const TELEGRAM_URL = "https://t.me/clawlabzglobal";
export const TELEGRAM_UPDATES_URL = "https://t.me/clawlabzupdates";
export const CHROME_EXTENSION_URL =
  "https://chromewebstore.google.com/detail/clawnetwork-wallet/ailkoaodkkfojllikoinlkcedghnglaf";
export const EXPLORER_URL = "https://explorer.clawlabz.xyz";
export const WALLET_URL = "https://wallet.clawlabz.xyz";

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
  { slug: "smart-contracts", icon: "Code" },
  { slug: "reputation", icon: "Star" },
  { slug: "payments", icon: "CreditCard" },
  { slug: "faq", icon: "HelpCircle" },
] as const;
