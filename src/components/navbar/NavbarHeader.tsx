import { SheetClose } from '@/components/ui/sheet'
import { XIcon } from 'lucide-react'

export function NavbarHeader() {
    return (
        <div className="flex min-h-16 w-full items-center justify-between pr-4 pl-6">
            <h1 className="text-2xl font-bold">ModSanctuary</h1>
            <SheetClose>
                <XIcon className="size-6" />
            </SheetClose>
        </div>
    )
}
