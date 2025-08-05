import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { SheetClose } from '@/components/ui/sheet'
import { User2Icon } from 'lucide-react'

interface NavbarItemProps {
    variant: 'dropdown' | 'sheet'
}

export function MyProfileItem({ variant }: NavbarItemProps) {
    const handleClick = () => {
        console.log('Navigate to My Profile')
    }

    if (variant === 'dropdown') {
        return (
            <DropdownMenuItem
                className="flex cursor-pointer gap-x-2 px-4 py-2.5"
                onClick={handleClick}
            >
                <div className="flex items-center gap-x-2">
                    <User2Icon className="size-6" />
                    <p>My Profile</p>
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
                <User2Icon className="size-6" />
                <p>My Profile</p>
            </div>
        </SheetClose>
    )
}
