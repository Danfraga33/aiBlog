import { Link } from "@remix-run/react";
import { Fragment, useState } from "react";
import { pages } from "~/lib/constant";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "./ui/button";
import { Article, GroupTypes } from "~/lib/types";

const BlogList = ({ blogPosts }: { blogPosts: Article[] }) => {
  console.log("blogPosts: ", blogPosts);
  const [activeItem, setActiveItem] = useState(
    blogPosts[0].frontmatter.title.toLowerCase(),
  );
  const currentPage = pages.filter((page) => page.name == "Blog")[0];
  const parentSlugs = new Set(
    blogPosts.map((post) => post.frontmatter.parent).filter(Boolean),
  );

  const groupedPosts: GroupTypes = blogPosts.reduce(
    (acc, post) => {
      const isParent = parentSlugs.has(post.slug); // Check if this post is a parent
      const groupKey = isParent ? "parents" : "root";
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(post);
      return acc;
    },
    { root: [], parents: [] },
  );
  console.log("groupedPosts: ", groupedPosts);

  const looseChildren: Article[] = groupedPosts.root.filter(
    (post) => !post.frontmatter.parent,
  );

  return (
    <>
      <h1 className="mb-4 text-lg font-semibold">{currentPage.name}</h1>
      {looseChildren.map((post) => (
        <Button
          variant={activeItem === post.slug ? "outline" : "ghost"}
          className="h-auto w-full justify-start whitespace-normal font-normal"
          asChild
          onClick={() => setActiveItem(post.slug)}
          key={post.slug}
        >
          <Link key={post.slug} to={`/blogs/${post.slug}`}>
            {post.frontmatter.title}
          </Link>
        </Button>
      ))}

      {groupedPosts["parents"].map((parentPost) => (
        <Accordion key={parentPost.slug} type="single" collapsible>
          <AccordionItem value={parentPost.slug} className="border-none">
            {blogPosts
              .filter((post) => post.frontmatter.parent === parentPost.slug)
              .map((childPost) => (
                <Fragment key={childPost.slug}>
                  <Button
                    onClick={() => setActiveItem(parentPost.slug)}
                    variant={
                      activeItem === parentPost.slug ? "outline" : "ghost"
                    }
                    asChild
                    className="h-auto w-full justify-between whitespace-normal font-normal hover:no-underline"
                  >
                    <AccordionTrigger>
                      {parentPost.frontmatter.title}
                    </AccordionTrigger>
                  </Button>
                  <AccordionContent className="my-1 ml-4">
                    <Button
                      onClick={() => setActiveItem(childPost.slug)}
                      variant={
                        activeItem === childPost.slug ? "outline" : "ghost"
                      }
                      asChild
                      className="flex w-full justify-start"
                    >
                      <Link
                        to={`/blogs/${childPost.slug}`}
                        className="inline-flex h-auto items-start justify-start rounded-md text-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      >
                        {childPost.frontmatter.title}
                      </Link>
                    </Button>
                  </AccordionContent>
                </Fragment>
              ))}
          </AccordionItem>
        </Accordion>
      ))}
    </>
  );
};

export default BlogList;
