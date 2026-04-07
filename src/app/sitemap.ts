import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getBlogPosts } from "@/lib/blog";
import { routing } from "@/lib/i18n/routing";

const locales = routing.locales;

const pages = [
  { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/community", changeFrequency: "weekly" as const, priority: 0.7 },
  { path: "/whitepaper", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/ecosystem", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/ecosystem/grants", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/developers", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/developers/api-reference", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/developers/sdk", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/developers/mcp", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/docs/quickstart", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/docs/architecture", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/docs/consensus", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/docs/transactions", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/docs/tokenomics", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/docs/node-operations", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/docs/configuration", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/docs/faq", changeFrequency: "monthly" as const, priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }))
  );

  const posts = getBlogPosts();
  for (const post of posts) {
    for (const locale of locales) {
      urls.push({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return urls;
}
