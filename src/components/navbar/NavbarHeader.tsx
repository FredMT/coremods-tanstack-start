import { SheetClose } from '@/components/ui/sheet'
import { Link } from '@tanstack/react-router'
import { XIcon } from 'lucide-react'
import { Button } from '../ui/button'

export function NavbarHeader() {
    return (
        <div className="flex min-h-16 w-full items-center justify-between border-b pr-4 pl-6">
            <SheetClose asChild>
                <Link to="/">
                    <h1 className="text-2xl font-bold">ModSanctuary</h1>
                </Link>
            </SheetClose>
            <SheetClose asChild>
                <Button variant="ghost" size="icon" className="cursor-pointer">
                    <XIcon className="size-6" />
                </Button>
            </SheetClose>
        </div>
    )
}
