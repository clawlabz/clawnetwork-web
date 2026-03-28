import { compileMDX } from "next-mdx-remote/rsc";
import rehypeShiki from "@shikijs/rehype";
import remarkGfm from "remark-gfm";
import type { ReactElement } from "react";
import { CodeBlock } from "@/components/ui/CodeBlock";

export async function renderMDX(source: string): Promise<ReactElement> {
  const { content } = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypeShiki,
            {
              theme: "github-dark-default",
              addLanguageClass: true,
            },
          ],
        ],
      },
    },
    components: {
      pre: CodeBlock,
    },
  });
  return content;
}
