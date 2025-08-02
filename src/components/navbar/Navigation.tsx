import { NavbarHamburgerMenuSheet } from '@/components/navbar/NavbarHamburgerMenuSheet'
import { NavbarLogo } from '@/components/navbar/NavbarLogo'
import { NavbarSearchAndAuthMenu } from '@/components/navbar/NavbarSearchAndAuthMenu'
import { ResAuthUser } from '@/types/ResAuthUser'

export function Navigation({ user }: { user: ResAuthUser | null }) {
    const sheetItems = ['Games', 'Mods', 'Modpacks', 'About']

    return (
        <header className="bg-navbar flex h-14 w-full items-center justify-between gap-x-2 px-2">
            <div className="flex w-1/2">
                <NavbarHamburgerMenuSheet sheetItems={sheetItems} />
            </div>
            <div className="flex shrink-0 items-center">
                <NavbarLogo />
            </div>
            <div className="flex w-1/2 justify-end gap-x-2">
                <NavbarSearchAndAuthMenu />
            </div>
        </header>
    )
}
