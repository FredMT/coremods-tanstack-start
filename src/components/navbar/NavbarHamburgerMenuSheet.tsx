import { NavbarHeader } from '@/components/navbar/NavbarHeader'
import { SheetItem } from '@/components/navbar/SheetItem'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { MenuIcon } from 'lucide-react'

export function NavbarHamburgerMenuSheet({
    sheetItems,
}: {
    sheetItems: string[]
}) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-muted cursor-pointer"
                >
                    <MenuIcon className="size-6" />
                </Button>
            </SheetTrigger>
            <SheetTitle hidden>ModSanctuary Hamburger Menu</SheetTitle>
            <SheetDescription hidden>
                ModSanctuary Hamburger Menu
            </SheetDescription>
            <SheetContent
                side="left"
                className="bg-hamburger w-full gap-0 md:w-1/2"
            >
                <NavbarHeader />
                <div className="flex w-full flex-col space-y-0 text-lg">
                    {sheetItems.map((item) => (
                        <SheetItem key={item}>{item}</SheetItem>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}
