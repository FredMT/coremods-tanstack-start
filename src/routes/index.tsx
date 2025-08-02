import { LinkButton } from '@/components/meta-ui/LinkButton'
import { Input } from '@/components/ui/input'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { z } from 'zod'

export const Route = createFileRoute('/')({
    component: Home,
})

const searchGameSchema = z.object({
    q: z.coerce.string().min(1, 'Search query is required').trim(),
})

function Home() {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const safeParseSearchGamesQuery = (search: string) => {
        const successParse = searchGameSchema.safeParse({ q: search })
        return successParse.success
    }

    return (
        <div className="flex max-w-sm gap-2 p-4">
            <Input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault()
                        e.stopPropagation()
                        navigate({ to: '/games/search', search: { q: search } })
                    }
                }}
            />
            <LinkButton
                to="/games/search"
                search={{ q: search }}
                disabled={!safeParseSearchGamesQuery(search)}
            >
                Search Games
            </LinkButton>
        </div>
    )
}
