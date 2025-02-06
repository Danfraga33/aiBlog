import { Link } from "@remix-run/react";
import React from "react";
import { Button } from "~/components/ui/button";

const Home = () => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center bg-background text-foreground">
      <h1 className="mb-6 text-4xl font-bold">My AI Journey</h1>
      <p className="mb-8 max-w-md text-center text-xl">
        Exploring the world of Artificial Intelligence, one step at a time.
      </p>
      <div className="flex space-x-4">
        <Button variant="outline" asChild>
          <Link to="/blogs">Blogs</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/projects">Projects</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
