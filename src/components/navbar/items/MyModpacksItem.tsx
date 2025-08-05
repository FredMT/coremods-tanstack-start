import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { SheetClose } from '@/components/ui/sheet'
import { BoxesIcon } from 'lucide-react'

interface NavbarItemProps {
    variant: 'dropdown' | 'sheet'
}

export function MyModpacksItem({ variant }: NavbarItemProps) {
    const handleClick = () => {
        console.log('Navigate to My Modpacks')
    }

    if (variant === 'dropdown') {
        return (
            <DropdownMenuItem
                className="flex cursor-pointer gap-x-2 px-4 py-2.5"
                onClick={handleClick}
            >
                <div className="flex items-center gap-x-2">
                    <BoxesIcon className="size-6" />
                    <p>My Modpacks</p>
                </div>
            </DropdownMenuItem>
        )
    }

    return (
        <SheetClose asChild>
            <div
                className="hover:text-muted-foreground flex cursor-pointer items-center gap-x-2 border-b px-6 py-4"
                onClick={handleClick}
            >
                <BoxesIcon className="size-6" />
                <p>My Modpacks</p>
            </div>
        </SheetClose>
    )
}
