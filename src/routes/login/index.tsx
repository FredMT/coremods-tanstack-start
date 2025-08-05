import { Separator } from '@/components/ui/separator'
import { getUser } from '@/fn/getUser'
import { Login } from '@/routes/login/-components/Login'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/login/')({
    component: LoginPage,
    beforeLoad: async ({ context }) => {
        const data = await getUser()

        if (!data) {
            context.queryClient.setQueryData(['authenticated-user'], null)
        }

        throw redirect({
            to: '/',
        })
    },
})

export function LoginPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-y-8 p-6 md:p-10">
                <p className="text-4xl leading-none font-extrabold tracking-tight max-lg:flex max-lg:justify-center md:text-5xl lg:text-6xl">
                    Login to ModSanctuary
                </p>
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full max-w-xs">
                        <Login />
                    </div>
                    <Separator className="mb-8" />
                    <p className="text-muted-foreground text-sm">
                        Don&apos;t have an account?{' '}
                        <Link
                            to="/register"
                            className="underline underline-offset-4"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
            <div className="relative hidden lg:block">
                <img
                    src="src/auth.png"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
        </div>
    )
}
