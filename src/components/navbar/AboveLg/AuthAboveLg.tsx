import { AuthedSection } from '@/components/navbar/AboveLg/AuthedSection'
import { UnauthedSection } from '@/components/navbar/AboveLg/UnauthedSection'
import { useRouteContext } from '@tanstack/react-router'

export function AuthAboveLg({
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
                <UnauthedSection
                    isLoginPage={isLoginPage}
                    isRegisterPage={isRegisterPage}
                />
            )}
            {user && <AuthedSection />}
        </>
    )
}
