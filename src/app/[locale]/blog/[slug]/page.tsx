import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { renderMDX } from "@/lib/mdx";
import { Link } from "@/lib/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { routing } from "@/lib/i18n/routing";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Blog" };
  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const t = await getTranslations("blog");
  const post = getBlogPost(slug);

  if (!post) notFound();

  const content = await renderMDX(post.content);

  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition-colors mb-8"
      >
        &larr; {t("backToList")}
      </Link>

      <article className="prose max-w-none">
        <time className="text-sm text-text-secondary">{post.date}</time>
        <h1 className="mt-2">{post.title}</h1>
        {post.summary && (
          <p className="text-lg text-text-secondary mt-2 mb-8">{post.summary}</p>
        )}
        {content}
      </article>
    </section>
  );
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}
