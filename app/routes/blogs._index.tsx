import Article from "~/components/Article";
import fs from "fs";
import path from "path";
import { useLoaderData } from "@remix-run/react";
import crypto from "crypto";
import matter from "gray-matter";
import { extractHeadings } from "~/lib/utils";

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
      asd;

      const id = crypto
        .createHash("md5")
        .update(filename + frontmatter.title + frontmatter.date)
        .digest("hex");
      return {
        headings,
        estimatedReadingTime,
        slug,
        frontmatter: {
          ...frontmatter,
          id,
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

export default function Home() {
  const blogPosts = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto flex-1 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 py-8 md:flex-row">
        <div className="flex min-h-screen flex-1">
          <Article blogPosts={blogPosts} />
        </div>
      </div>
    </div>
  );
}
