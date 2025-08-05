import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { SheetClose } from '@/components/ui/sheet'
import { useLogout } from '@/lib/react-query-auth/config'
import { useNavigate } from '@tanstack/react-router'
import { LogOutIcon } from 'lucide-react'

interface NavbarItemProps {
    variant: 'dropdown' | 'sheet'
}

export function SignOutItem({ variant }: NavbarItemProps) {
    const logoutMutation = useLogout()
    const navigate = useNavigate()

    const handleClick = async () => {
        try {
            await logoutMutation.mutateAsync({
                request: {
                    withCredentials: true,
                    withXSRFToken: true,
                },
            })
            navigate({ to: '/' })
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    if (variant === 'dropdown') {
        return (
            <DropdownMenuItem
                className="flex cursor-pointer gap-x-2 px-4 py-2.5"
                onClick={handleClick}
                disabled={logoutMutation.isPending}
            >
                <div className="flex items-center gap-x-2">
                    <LogOutIcon className="size-6" />
                    <p>
                        {logoutMutation.isPending
                            ? 'Signing out...'
                            : 'Sign out'}
                    </p>
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
                <LogOutIcon className="size-6" />
                <p>
                    {logoutMutation.isPending ? 'Signing out...' : 'Sign out'}
                </p>
            </div>
        </SheetClose>
    )
}
