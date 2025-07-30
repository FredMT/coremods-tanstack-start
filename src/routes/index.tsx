import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [search, setSearch] = useState("");
  return (
    <div className="flex gap-2 max-w-sm p-4">
      <Input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button>
        <Link to="/games/search" search={{ q: search }}>
          Search Games
        </Link>
      </Button>
    </div>
  );
}
