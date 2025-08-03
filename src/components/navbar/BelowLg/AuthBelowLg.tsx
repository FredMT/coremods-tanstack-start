import { useRouteContext } from '@tanstack/react-router'

import { AuthedSheet } from '@/components/navbar/BelowLg/AuthedSheet'
import { UnauthedSheet } from '@/components/navbar/BelowLg/UnauthedSheet'
import { Button } from '@/components/ui/button'
import { BellIcon, MailIcon } from 'lucide-react'

export function AuthBelowLg({
    isLoginPage,
    isRegisterPage,
}: {
    isLoginPage: boolean
    isRegisterPage: boolean
}) {
    const context = useRouteContext({ from: '__root__' })
    const user = context.user
    return (
        <>
            {!user && (
                <UnauthedSheet
                    isLoginPage={isLoginPage}
                    isRegisterPage={isRegisterPage}
                />
            )}
            {user && (
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
