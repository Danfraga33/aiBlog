import fs from "fs";
import path from "path";
import { json } from "@remix-run/node";
import { bundleMDX } from "mdx-bundler";
import { useLoaderData } from "@remix-run/react";
import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import matter from "gray-matter";
import { extractHeadings } from "~/lib/utils";
import * as components from "~/components/mdx-components";
import rehypeSlug from "rehype-slug";

export async function loader({ params }: { params: { slug: string } }) {
  const postsDirectory = path.join(process.cwd(), "app/content");
  const filePath = path.join(postsDirectory, `${params.slug}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Response("Post not found", { status: 404 });
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { content } = matter(fileContent);
  const headings = await extractHeadings(content);
  const uniqueHeadings = headings
    .filter((heading) => heading.text.length > 3)
    .flat();

  const { code, frontmatter } = await bundleMDX({
    source: fileContent,
    mdxOptions(options) {
      options.remarkPlugins = [...(options.remarkPlugins ?? [])];
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeSlug];
      return options;
    },
  });

  const estimatedReadingTime = Math.ceil(content.split(/\s+/).length / 200);

  return json({ uniqueHeadings, estimatedReadingTime, code, frontmatter });
}

const Dynamic = () => {
  const { code, estimatedReadingTime } = useLoaderData<typeof loader>();

  function translateEstimatedReadingTime(readingTime: number) {
    return (
      <p className="mb-8 text-sm text-muted-foreground">
        Estimated Reading Time:{" "}
        <span className="font-bold">{readingTime} minutes</span>
      </p>
    );
  }

  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <div className="prose mx-auto">
      <span>{translateEstimatedReadingTime(estimatedReadingTime)}</span>
      <Component code={code} components={components} />
    </div>
  );
};

export default Dynamic;
