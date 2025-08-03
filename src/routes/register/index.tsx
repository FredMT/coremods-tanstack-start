import { Separator } from '@/components/ui/separator'
import { Register } from '@/routes/register/-components/Register'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/register/')({
    component: RegisterPage,
    beforeLoad: async ({ context }) => {
        if (context.user) {
            throw redirect({ to: '/' })
        }
    },
})

function RegisterPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="relative hidden lg:block">
                <img
                    src="src/auth.png"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
            <div className="flex flex-col gap-y-8 p-6 md:p-10">
                <p className="text-4xl leading-none font-extrabold tracking-tight max-lg:flex max-lg:justify-center md:text-5xl lg:text-6xl">
                    Register for ModSanctuary
                </p>
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full max-w-sm">
                        <Register />
                    </div>
                    <Separator className="mb-8" />
                    <p className="text-muted-foreground text-sm">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="underline underline-offset-4"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
