import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSearchGamesSuspense } from '@/lib/api/game-controller/game-controller'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { useState } from 'react'
import z from 'zod'
import { PendingComponent } from './-components/pendingComponent'

const searchGamesSchema = z.object({
    q: z.string().min(1, 'Search query must not be empty').trim(),
})

export const Route = createFileRoute('/games/search/')({
    component: RouteComponent,
    validateSearch: zodValidator(searchGamesSchema),
    pendingComponent: PendingComponent,
    pendingMs: 1_000,
    pendingMinMs: 1_000,
})

function RouteComponent() {
    const search = Route.useSearch()
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    const { data } = useSearchGamesSuspense(
        { q: search.q || '' },
        {
            query: {
                staleTime: 1_000 * 60 * 5,
                gcTime: 1_000 * 60 * 5,
                select: (response) => response.data,
            },
        }
    )

    return (
        <div className="container mx-auto space-y-4 py-4">
            <h1 className="text-3xl font-bold">Search Games</h1>

            <div className="flex max-w-sm gap-2">
                <Input
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault()
                            e.stopPropagation()
                            navigate({
                                to: '/games/search',
                                search: { q: query },
                            })
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
                    Search results for:{' '}
                    <span className="font-semibold">"{search.q}"</span>
                </p>
            )}

            {/* Display games */}
            {data && data.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {data.map((game) => (
                        <div
                            key={game.id}
                            className="overflow-hidden shadow-md transition-shadow hover:shadow-lg"
                        >
                            <div className="flex aspect-video items-center justify-center">
                                {game.cover?.image_id ? (
                                    <img
                                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                                        alt={game.name}
                                        className="h-full w-full rounded-md object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='
                                        }}
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <span className="text-sm">
                                            No Image
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h3
                                    className="truncate text-lg font-semibold"
                                    title={game.name}
                                >
                                    {game.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-12 text-center">
                    <p className="text-lg">
                        {search.q
                            ? 'No games found for your search.'
                            : 'Search for games to see results.'}
                    </p>
                </div>
            )}
        </div>
    )
}
