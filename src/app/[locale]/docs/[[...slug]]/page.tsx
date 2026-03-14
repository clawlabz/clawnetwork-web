import { notFound } from "next/navigation";
import { getDoc, getAllDocs } from "@/lib/docs";
import { renderMDX } from "@/lib/mdx";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; slug?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const docSlug = slug?.[0] || "quickstart";
  const doc = getDoc(locale, docSlug);
  if (!doc) return { title: "Docs" };
  return {
    title: doc.title,
    description: doc.description,
  };
}

export default async function DocPage({ params }: Props) {
  const { locale, slug } = await params;
  const docSlug = slug?.[0] || "quickstart";
  const doc = getDoc(locale, docSlug);

  if (!doc) notFound();

  const content = await renderMDX(doc.content);

  return (
    <article className="prose max-w-3xl">
      <h1>{doc.title}</h1>
      {doc.description && (
        <p className="text-lg text-text-secondary mt-2 mb-8">{doc.description}</p>
      )}
      {content}
    </article>
  );
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string[] }[] = [];
  for (const locale of ["en", "zh"]) {
    const docs = getAllDocs(locale);
    for (const doc of docs) {
      params.push({ locale, slug: [doc.slug] });
    }
    // index page
    params.push({ locale, slug: [] });
  }
  return params;
}
