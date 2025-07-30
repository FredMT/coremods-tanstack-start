import {
  createFileRoute,
  Link,
  useLoaderData,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import z from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { fetchGames } from "./-utils/searchGames";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PendingComponent } from "./-components/pendingComponent";

const searchGamesSchema = z.object({
  q: z.string().default(""),
});

export const Route = createFileRoute("/games/search/")({
  component: RouteComponent,
  validateSearch: zodValidator(searchGamesSchema),
  loaderDeps: ({ search: { q } }) => ({ q }),
  loader: ({ deps: { q } }) => fetchGames({ data: { q } }),
  pendingComponent: PendingComponent,
  pendingMs: 1_000,
  pendingMinMs: 1_000,
  staleTime: 1_000 * 60 * 5, // 5 minutes
  gcTime: 1_000 * 60 * 5, // 5 minutes
});

function RouteComponent() {
  const search = Route.useSearch();
  const data = Route.useLoaderData();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div className="container py-4 mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Search Games</h1>

      <div className="flex gap-2 max-w-sm">
        <Input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.stopPropagation();
              navigate({ to: "/games/search", search: { q: query } });
            }
          }}
        />
        <Button disabled={!query} asChild>
          <Link to="/games/search" search={{ q: query }}>
            Search Games
          </Link>
        </Button>
      </div>

      {/* Display search query */}
      {search.q && (
        <p>
          Search results for:{" "}
          <span className="font-semibold">"{search.q}"</span>
        </p>
      )}

      {/* Display games */}
      {Array.isArray(data.data) && data.data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.data.map((game) => (
            <div
              key={game.id}
              className="shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video flex items-center justify-center">
                {game.cover?.image_id ? (
                  <img
                    src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                    alt={game.name}
                    className="w-full h-full object-cover rounded-md"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center ">
                    <span className=" text-sm">No Image</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3
                  className="font-semibold text-lg truncate"
                  title={game.name}
                >
                  {game.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className=" text-lg">
            {search.q
              ? "No games found for your search."
              : "Search for games to see results."}
          </p>
        </div>
      )}
    </div>
  );
}
