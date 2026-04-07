import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "src/content/docs");

export interface DocMeta {
  slug: string;
  title: string;
  description: string;
  order: number;
}

export interface Doc extends DocMeta {
  content: string;
}

export function getDocSlugs(locale: string): string[] {
  let dir = path.join(CONTENT_DIR, locale);
  if (!fs.existsSync(dir) && locale !== "en") {
    dir = path.join(CONTENT_DIR, "en");
  }
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getDoc(locale: string, slug: string): Doc | null {
  let filePath = path.join(CONTENT_DIR, locale, `${slug}.mdx`);
  if (!fs.existsSync(filePath) && locale !== "en") {
    filePath = path.join(CONTENT_DIR, "en", `${slug}.mdx`);
  }
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: (data.title as string) || slug,
    description: (data.description as string) || "",
    order: (data.order as number) || 99,
    content,
  };
}

export function getAllDocs(locale: string): DocMeta[] {
  const slugs = getDocSlugs(locale);
  return slugs
    .map((slug) => {
      const doc = getDoc(locale, slug);
      if (!doc) return null;
      return { slug: doc.slug, title: doc.title, description: doc.description, order: doc.order };
    })
    .filter(Boolean)
    .sort((a, b) => (a!.order ?? 99) - (b!.order ?? 99)) as DocMeta[];
}
