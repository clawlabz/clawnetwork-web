import { getBlogPosts } from "@/lib/blog";
import { Link } from "@/lib/i18n/navigation";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function BlogListPage({ params }: Props) {
  await params;
  const t = await getTranslations("blog");
  const posts = getBlogPosts();

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">{t("title")}</h1>
        <p className="text-lg text-text-secondary">{t("subtitle")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-xl border border-border-dark bg-surface-dark p-6 transition-colors hover:border-primary/50"
          >
            <time className="text-xs text-text-secondary">{post.date}</time>
            <h2 className="mt-2 text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-text-secondary line-clamp-3">
              {post.summary}
            </p>
            <span className="mt-4 inline-block text-sm text-primary">
              {t("readMore")} &rarr;
            </span>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-text-secondary text-center py-12">
          No posts yet. Check back soon.
        </p>
      )}
    </section>
  );
}
