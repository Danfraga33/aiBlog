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
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeMathjax from "rehype-mathjax";
import rehypePrism from "rehype-prism-plus";
import remarkDirective from "remark-directive";
import rehypeFormat from "rehype-format";

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
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkMath,
        remarkGfm,
        remarkDirective,
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeMathjax,
        rehypePrism,
        rehypeFormat,
      ];
      return options;
    },
  });

  let publishedDate = frontmatter.date;

  if (!publishedDate) {
    publishedDate = new Date().toISOString().split("T")[0];

    const updatedFrontmatter = { ...frontmatter, date: publishedDate };
    const updatedContent = matter.stringify(content, updatedFrontmatter);
    fs.writeFileSync(filePath, updatedContent, "utf8");
  }

  const estimatedReadingTime = Math.ceil(content.split(/\s+/).length / 200);

  return json({
    uniqueHeadings,
    estimatedReadingTime,
    code,
    date: publishedDate,
    frontmatter,
  });
}

const Dynamic = () => {
  const { code, estimatedReadingTime, date } = useLoaderData<typeof loader>();

  function translateEstimatedReadingTime(readingTime: number, date: string) {
    let dateObject = new Date(date);

    return (
      <p className="mb-8 flex flex-col text-sm text-muted-foreground">
        <div>
          Estimated Reading Time:
          <span className="font-bold"> {readingTime} minutes</span>
        </div>
        <div>
          Published Date:
          <span className="font-bold"> {dateObject.toDateString()}</span>
        </div>
      </p>
    );
  }

  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <div className="prose mx-auto">
      <div className="leading-3">
        <span>{translateEstimatedReadingTime(estimatedReadingTime, date)}</span>
      </div>
      <Component code={code} components={components} />
    </div>
  );
};

export default Dynamic;
