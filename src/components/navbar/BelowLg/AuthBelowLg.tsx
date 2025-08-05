import { AuthedSheet } from '@/components/navbar/BelowLg/AuthedSheet'
import { UnauthedSheet } from '@/components/navbar/BelowLg/UnauthedSheet'
import { Button } from '@/components/ui/button'
import { useUser } from '@/lib/react-query-auth/config'
import { BellIcon, MailIcon } from 'lucide-react'

export function AuthBelowLg({
    isLoginPage,
    isRegisterPage,
}: {
    isLoginPage: boolean
    isRegisterPage: boolean
}) {
    const user = useUser({
        retry: false,
    })

    if (user.isLoading) return <div>Loading...</div>

    return (
        <>
            {!user.data && (
                <UnauthedSheet
                    isLoginPage={isLoginPage}
                    isRegisterPage={isRegisterPage}
                />
            )}
            {user.data && (
                <div className="flex gap-x-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                    >
                        <BellIcon className="hover:bg-muted size-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                    >
                        <MailIcon className="hover:bg-muted size-5" />
                    </Button>
                    <AuthedSheet />
                </div>
            )}
        </>
    )
}
