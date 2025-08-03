export function SheetItem({ children }: { children: React.ReactNode }) {
    return (
        <div className="hover:text-muted-foreground flex min-h-16 w-full cursor-pointer items-center border-b pr-4 pl-6 text-lg">
            {children}
        </div>
    )
}
