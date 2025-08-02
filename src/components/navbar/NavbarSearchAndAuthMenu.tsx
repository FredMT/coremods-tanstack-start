import { AuthAboveLg } from '@/components/navbar/AuthAboveLg'
import { useLocation } from '@tanstack/react-router'
import { AuthBelowLg } from './AuthBelowLg'
import { NavbarSearchButton } from './NavbarSearchButton'

export function NavbarSearchAndAuthMenu() {
    const location = useLocation()
    const isLoginPage = location.href.startsWith('/login')
    const isRegisterPage = location.href.startsWith('/register')
    return (
        <div className="flex gap-x-2">
            <NavbarSearchButton />
            <div className="lg:hidden">
                <AuthBelowLg
                    isLoginPage={isLoginPage}
                    isRegisterPage={isRegisterPage}
                />
            </div>
            <AuthAboveLg
                isLoginPage={isLoginPage}
                isRegisterPage={isRegisterPage}
            />
        </div>
    )
}
