import { AuthedSectionDropdownMenuItem } from '@/components/navbar/AboveLg/AuthedSectionDropdownMenuItem'
import { navbarAuthedItems } from '@/components/navbar/navbarAuthedItems'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

export function AuthedSection() {
    const authedItems = navbarAuthedItems
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="hover:bg-muted flex cursor-pointer items-center justify-center gap-x-1 px-3 pr-3 pl-2 select-none lg:pl-3">
                        <div className="flex h-full items-center gap-x-2">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                        <ChevronDown className="size-4 stroke-1" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-3xs">
                    {authedItems.map((item) => (
                        <AuthedSectionDropdownMenuItem key={item.label}>
                            <div className="flex items-center gap-x-2">
                                <item.icon className="size-6" />
                                <p>{item.label}</p>
                            </div>
                        </AuthedSectionDropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
