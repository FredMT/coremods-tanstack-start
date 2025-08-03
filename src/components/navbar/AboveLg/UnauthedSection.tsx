import { LinkButton } from '@/components/meta-ui/LinkButton'

export function UnauthedSection({
    isLoginPage,
    isRegisterPage,
}: {
    isLoginPage: boolean
    isRegisterPage: boolean
}) {
    return (
        <div className="hidden gap-x-2 lg:flex">
            <LinkButton to="/login" hidden={isLoginPage}>
                Log in
            </LinkButton>
            <LinkButton to="/register" hidden={isRegisterPage}>
                Register
            </LinkButton>
        </div>
    )
}
