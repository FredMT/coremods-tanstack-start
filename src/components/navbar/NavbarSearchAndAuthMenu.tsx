import { AuthAboveLg } from '@/components/navbar/AboveLg/AuthAboveLg'
import { useLocation } from '@tanstack/react-router'
import { AuthBelowLg } from './BelowLg/AuthBelowLg'
import { NavbarSearchButton } from './NavbarSearchButton'

export function NavbarSearchAndAuthMenu() {
    const location = useLocation()
    const isLoginPage = location.href.startsWith('/login')
    const isRegisterPage = location.href.startsWith('/register')
    return (
        <div className="flex items-center gap-x-2">
            <NavbarSearchButton />
            <div className="lg:hidden">
                <AuthBelowLg
                    isLoginPage={isLoginPage}
                    isRegisterPage={isRegisterPage}
                />
            </div>
            <div className="hidden h-full items-center lg:flex">
                <AuthAboveLg
                    isLoginPage={isLoginPage}
                    isRegisterPage={isRegisterPage}
                />
            </div>
        </div>
    )
}
