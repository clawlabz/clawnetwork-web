import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: (data.title as string) || slug,
    date: (data.date as Date)?.toISOString().split("T")[0] || "",
    summary: (data.summary as string) || "",
    content,
  };
}

export function getBlogPosts(): BlogPostMeta[] {
  const slugs = getBlogSlugs();
  return slugs
    .map((slug) => {
      const post = getBlogPost(slug);
      if (!post) return null;
      return {
        slug: post.slug,
        title: post.title,
        date: post.date,
        summary: post.summary,
      };
    })
    .filter(Boolean)
    .sort((a, b) => (b!.date > a!.date ? 1 : -1)) as BlogPostMeta[];
}
