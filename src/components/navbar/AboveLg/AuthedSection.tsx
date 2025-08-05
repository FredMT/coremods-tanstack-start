import { navbarAuthedItems } from '@/components/navbar/navbarAuthedItems'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CurrentUserResponse } from '@/lib/api/endpoints.schemas'
import { ChevronDown } from 'lucide-react'

export function AuthedSection({user}: {user: CurrentUserResponse
    
}) {
    const authedItems = navbarAuthedItems
    
    const r2Endpoint = import.meta.env.VITE_R2_PUBLIC_DEV_ENDPOINT;

    if (!user) return null;

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="hover:bg-muted flex cursor-pointer items-center justify-center gap-x-1 px-3 pr-3 pl-2 select-none lg:pl-3">
                        <div className="flex h-full items-center gap-x-2">
                            <Avatar>
                            <AvatarImage src={`${r2Endpoint}/${user?.image}`} />
                                <AvatarFallback>{user?.username?.substr(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </div>
                        <ChevronDown className="size-4 stroke-1" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-3xs">
                    {authedItems.map((item) => {
                        const ItemComponent = item.component
                        return <ItemComponent key={item.id} variant="dropdown" />
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
