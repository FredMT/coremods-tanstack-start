import { LinkButton } from '@/components/meta-ui/LinkButton'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { User2 } from 'lucide-react'

export function AuthBelowLg({
    isLoginPage,
    isRegisterPage,
}: {
    isLoginPage: boolean
    isRegisterPage: boolean
}) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="cursor-pointer">
                    <User2 className="size-5" />
                </Button>
            </SheetTrigger>
            <SheetContent
                side="right"
                className="bg-hamburger w-full gap-0 md:w-1/2"
            >
                <SheetTitle hidden>Log in or Register</SheetTitle>
                <SheetDescription hidden>Login or Register</SheetDescription>
                <div className="mx-auto max-w-96 px-6 pt-8 pb-6 text-center">
                    <h6 className="text-lg leading-tight font-semibold text-zinc-100">
                        Please log in or register
                    </h6>
                    <p className="text-muted-foreground mt-2 mb-8 text-sm">
                        To enjoy the benefits of ModSanctuary, please log in or
                        register a new account
                    </p>
                    <div className="space-y-2">
                        <LinkButton
                            children={'Log In'}
                            variant="ghost"
                            className="min-h-9 min-w-24 px-3"
                            to="/login"
                            hidden={isLoginPage}
                        />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
