import { navbarAuthedItems } from '@/components/navbar/navbarAuthedItems'
import { SheetClose } from '@/components/ui/sheet'

export function AuthedSheetItem({
    item,
}: {
    item: (typeof navbarAuthedItems)[number]
}) {
    return (
        <SheetClose asChild>
            <div className="hover:text-muted-foreground flex cursor-pointer items-center gap-x-2 border-b px-6 py-4">
                <item.icon className="size-6" />
                <p>{item.label}</p>
            </div>
        </SheetClose>
    )
}
