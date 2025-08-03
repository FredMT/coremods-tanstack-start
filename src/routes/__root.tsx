/// <reference types="vite/client" />
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
    HeadContent,
    Outlet,
    Scripts,
    createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { ReactNode } from 'react'

import { DefaultCatchBoundary } from '@/components/DefaultCatchBoundary'
import { Footer } from '@/components/Footer'

import { SonnerToaster } from '@/components/meta-ui/SonnerToaster'
import { Navigation } from '@/components/navbar/Navigation'
import { NotFound } from '@/components/NotFound'
import { ThemeProvider } from '@/components/theme-provider'
import { getCsrfToken } from '@/fn/getCsrfToken'
import { getUser } from '@/fn/getUser'
import appCss from '@/styles/app.css?url'
import { ResAuthUser } from '@/types/ResAuthUser'
import { wrapCreateRootRouteWithSentry } from '@sentry/tanstackstart-react'
import type { QueryClient } from '@tanstack/react-query'

export const Route = wrapCreateRootRouteWithSentry(createRootRouteWithContext)<{
    queryClient: QueryClient
    user: ResAuthUser | null
}>()({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                title: 'ModSanctuary',
            },
        ],
        links: [
            {
                rel: 'stylesheet',
                href: appCss,
            },
        ],
    }),
    errorComponent: (props) => {
        return (
            <RootDocument>
                <DefaultCatchBoundary {...props} />
            </RootDocument>
        )
    },
    notFoundComponent: () => <NotFound />,
    component: RootComponent,
    beforeLoad: async () => {
        await getCsrfToken()
        const res = await getUser()

        return {
            user: res?.data || null,
        }
    },
})

function RootComponent() {
    return (
        <ThemeProvider>
            <RootDocument>
                <Outlet />
            </RootDocument>
        </ThemeProvider>
    )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html suppressHydrationWarning>
            <head>
                <HeadContent />
            </head>
            <body className="flex min-h-dvh flex-col">
                <Navigation />
                <main className="flex-1">{children}</main>
                <Footer />
                <TanStackRouterDevtools position="bottom-right" />
                <ReactQueryDevtools buttonPosition="bottom-left" />
                <SonnerToaster />
                <Scripts />
            </body>
        </html>
    )
}
