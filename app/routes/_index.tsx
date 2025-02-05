import { Link } from "@remix-run/react";
import React from "react";
import { Button } from "~/components/ui/button";

const Home = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Button variant="outline" asChild>
        <Link to="/blogs">Blogs</Link>
      </Button>
    </div>
  );
};

export default Home;
