import { Outlet, useLoaderData } from "@remix-run/react";
import BlogList from "~/components/BlogList";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import matter from "gray-matter";
import TOC from "~/components/TOC";
import { extractHeadings } from "~/lib/utils";
import { Article } from "~/lib/types";

type Frontmatter = {
  title: string;
  description: string;
  coverImage: string;
  tags: string[];
  toc: string;
  date: string;
  id?: string;
  coverImageAlt: string;
  type: "Blog" | "Podcast";
};
const postsDirectory = path.join(process.cwd(), "app/content/");

export async function loader() {
  const filenames = fs.readdirSync(postsDirectory);

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContent);
      const headings = await extractHeadings(content);
      const frontmatter = data as Frontmatter;
      const slug = filename.replace(/\.md$/, "");
      const estimatedReadingTime = Math.ceil(
        content.split(/\s+/).length / 2000,
      );

      const id = crypto
        .createHash("md5")
        .update(filename + frontmatter.title + frontmatter.date)
        .digest("hex");

      const date = new Date();
      const formattedDate = date.toISOString().split("T")[0];
      return {
        headings,
        estimatedReadingTime,
        slug,
        frontmatter: {
          ...frontmatter,
          id,
          datePosted: formattedDate,
        },
      };
    }),
  );

  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  );
  return sortedPosts;
}

export default function BlogLayout() {
  const blogPosts: Article[] = useLoaderData();

  return (
    <div className="container mx-auto flex-1 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 py-8 md:flex-row">
        <div className="flex min-h-screen flex-1 gap-8">
          <aside className="hidden w-64 flex-shrink-0 md:block">
            <BlogList blogPosts={blogPosts} />
          </aside>

          <div className="flex-1">
            <Outlet />
          </div>

          <aside className="hidden w-64 flex-shrink-0 lg:block">
            <TOC />
          </aside>
        </div>
      </div>
    </div>
  );
}
