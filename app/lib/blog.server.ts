import fs from "fs";
import path from "path";
import matter from "gray-matter";
import crypto from "crypto";
import { Frontmatter } from "./types";

const postsDirectory = path.join(process.cwd(), "app/content/");

export const getPosts = () => {
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);
    const frontmatter = data as Frontmatter;
    const slug = filename.replace(/\.md$/, "");

    const id = crypto
      .createHash("md5")
      .update(filename + frontmatter.title + frontmatter.date)
      .digest("hex");

    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];

    return {
      slug,
      frontmatter: {
        ...frontmatter,
        id,
        datePosted: formattedDate,
      },
    };
  });

  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  );
  return sortedPosts;
};
