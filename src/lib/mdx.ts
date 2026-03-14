import { compileMDX } from "next-mdx-remote/rsc";
import type { ReactElement } from "react";

export async function renderMDX(source: string): Promise<ReactElement> {
  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
  });
  return content;
}
