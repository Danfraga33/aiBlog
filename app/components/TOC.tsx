import { useRouteLoaderData } from "@remix-run/react";
import type { MouseEvent } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";

type Heading = {
  id: string;
  text: string;
  depth: number;
};

type TocData = {
  uniqueHeadings: Heading[];
  frontmatter: {
    title: string;
  };
};

const TOC = () => {
  const data = useRouteLoaderData("routes/blogs.$slug") as TocData;

  const handleScroll = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    const id = new URL(href).hash.slice(1);

    if (!id) return;

    const target = document.getElementById(id);
    const headerHeight = document.querySelector("header")?.offsetHeight || 100;

    if (target) {
      const top = target.offsetTop - headerHeight;
      window.scrollTo({
        top,
        behavior: "smooth",
      });

      // Update URL without triggering scroll
      window.history.replaceState({}, "", `#${id}`);
    }
  };

  if (!data?.uniqueHeadings?.length) return null;

  return (
    <div className="sticky top-24">
      <ScrollArea className="h-[calc(100vh-200px)]">
        <h2 className="mb-4 text-lg font-bold text-foreground">
          {data.frontmatter.title}
        </h2>
        <nav className="space-y-1">
          {data.uniqueHeadings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={handleScroll}
              className={`block text-sm text-muted-foreground transition-colors hover:text-primary ${heading.depth === 1 ? "pl-0 font-medium" : ""} ${heading.depth === 2 ? "pl-4" : ""} ${heading.depth === 3 ? "pl-8" : ""} `}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
};

export default TOC;
