import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { remark } from "remark";
import { visit } from "unist-util-visit";
import GithubSlugger from "github-slugger";
import type { Heading } from "mdast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function extractHeadings(content: string) {
  const slugger = new GithubSlugger();
  const headings: Array<{ depth: number; text: string; id: string }> = [];

  const processor = remark().use(() => (tree) => {
    slugger.reset();

    visit(tree, "heading", (node: Heading) => {
      const text = node.children
        .filter((child) => child.type === "text")
        // @ts-expect-error - Text nodes have value property
        .map((child) => child.value)
        .join(" ");

      const id = text ? slugger.slug(text) : "";

      headings.push({
        depth: node.depth,
        text,
        id,
      });
    });
  });

  await processor.process(content);
  return headings;
}
