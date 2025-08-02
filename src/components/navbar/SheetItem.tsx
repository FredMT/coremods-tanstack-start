export function SheetItem({ children }: { children: React.ReactNode }) {
    return (
        <div className="border-white-800 flex min-h-16 w-full items-center border-y pr-4 pl-6 text-lg">
            {children}
        </div>
    )
}
