import { Button } from '@/components/ui/button'
import { SearchIcon } from 'lucide-react'

export function NavbarSearchButton() {
    return (
        <Button variant="ghost" size="icon" className="cursor-pointer">
            <SearchIcon className="size-5" />
        </Button>
    )
}
