import { NavbarHamburgerMenuSheet } from '@/components/navbar/NavbarHamburgerMenuSheet'
import { NavbarLogo } from '@/components/navbar/NavbarLogo'
import { NavbarSearchAndAuthMenu } from '@/components/navbar/NavbarSearchAndAuthMenu'
import { Link } from '@tanstack/react-router'

export function Navigation() {
    const sheetItems = ['Games', 'Mods', 'Modpacks', 'About']

    return (
        <header className="bg-navbar flex h-14 w-full justify-between gap-x-2 px-2">
            <div className="flex w-1/2 items-center">
                <NavbarHamburgerMenuSheet sheetItems={sheetItems} />
            </div>
            <Link to="/">
                <div className="flex h-full shrink-0 items-center">
                    <NavbarLogo />
                </div>
            </Link>
            <div className="flex w-1/2 justify-end">
                <NavbarSearchAndAuthMenu />
            </div>
        </header>
    )
}
