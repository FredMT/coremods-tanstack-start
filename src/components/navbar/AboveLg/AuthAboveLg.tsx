import { AuthedSection } from '@/components/navbar/AboveLg/AuthedSection'
import { UnauthedSection } from '@/components/navbar/AboveLg/UnauthedSection'
import { useUser } from '@/lib/react-query-auth/config'

export function AuthAboveLg({
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
                <UnauthedSection
                    isLoginPage={isLoginPage}
                    isRegisterPage={isRegisterPage}
                />
            )}
            {user.data && <AuthedSection user={user.data} />}
        </>
    )
}
