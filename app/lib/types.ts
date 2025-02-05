export type Heading = {
  depth: number;
  text: string;
  id: string;
};

export type Article = {
  estimatedReadingTime: number;
  frontmatter: {
    date: string;
    id: string;
    title: string;
    parent?: string;
  };
  headings: Heading[];
  slug: string;
};

export type Frontmatter = {
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

export type GroupTypes = {
  parents: Article[];
  root: Article[];
};
