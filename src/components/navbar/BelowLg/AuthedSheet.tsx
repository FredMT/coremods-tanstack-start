import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { useRouteContext } from '@tanstack/react-router'

import { AuthedSheetItem } from '@/components/navbar/BelowLg/AuthedSheetItem'
import { navbarAuthedItems } from '@/components/navbar/navbarAuthedItems'
import { MailIcon, User2, XIcon } from 'lucide-react'

export function AuthedSheet() {
    const context = useRouteContext({ from: '__root__' })
    const user = context.user
    const authedItems = navbarAuthedItems
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="cursor-pointer">
                    <User2 className="size-5" />
                </Button>
            </SheetTrigger>
            <SheetContent
                side="right"
                className="bg-hamburger w-full gap-0 md:w-1/2"
            >
                <SheetTitle hidden>Authed User Navbar Sheet</SheetTitle>
                <SheetDescription hidden>
                    Authed User Navbar Sheet
                </SheetDescription>

                <div className="flex min-h-18 items-center justify-between gap-x-4 border-b pr-3 pl-6">
                    <div className="flex items-center gap-x-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="font-semibold">{user?.username}</p>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <SheetClose asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="cursor-pointer"
                            >
                                <MailIcon className="size-5" />
                            </Button>
                        </SheetClose>
                        <SheetClose asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="cursor-pointer"
                            >
                                <XIcon className="size-5" />
                            </Button>
                        </SheetClose>
                    </div>
                </div>
                <div className="flex flex-col gap-y-1">
                    {authedItems.map((item) => (
                        <AuthedSheetItem key={item.label} item={item} />
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}
