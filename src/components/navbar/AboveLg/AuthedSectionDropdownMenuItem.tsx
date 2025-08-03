import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

export function AuthedSectionDropdownMenuItem({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <DropdownMenuItem className="flex cursor-pointer gap-x-2 px-4 py-2.5">
            {children}
        </DropdownMenuItem>
    )
}
