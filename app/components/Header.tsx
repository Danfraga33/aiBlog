import React, { useState } from "react";
import { Button } from "./ui/button";
import { Binary, Github, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Link } from "@remix-run/react";

const Header = () => {
  const [isSubchapterOpen, setIsSubchapterOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/blogs" className="flex items-center space-x-2">
          <Binary />
          <span className="text-xl font-bold text-primary">AI Centre</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-10 pr-3"
              value={searchQuery}
              onChange={handleSearch}
            />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-muted-foreground" />
          </div>

          <Button variant="ghost" size="icon">
            <Github className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
