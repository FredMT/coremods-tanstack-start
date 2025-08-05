import { AXIOS_INSTANCE } from '@/lib/api/mutator/custom-instance'
import { LoginFormSchema } from '@/routes/login/-types/LoginFormSchema'
import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { setCookie } from '@tanstack/react-start/server'
import { AxiosError } from 'axios'

export const loginServerFn = createServerFn({ method: 'POST' })
    .validator((data) => {
        if (!(data instanceof FormData)) {
            throw new Error('Invalid form data')
        }

        const usernameOrEmail = data.get('usernameOrEmail')
        const password = data.get('password')
        const rememberMe = data.get('rememberMe')

        const validatedData = LoginFormSchema.parse({
            usernameOrEmail: usernameOrEmail?.toString(),
            password: password?.toString(),
            rememberMe: Boolean(rememberMe),
        })

        return validatedData
    })
    .handler(async ({ data: { usernameOrEmail, password, rememberMe } }) => {
        try {
            const res = await AXIOS_INSTANCE.post('/api/auth/login', {
                usernameOrEmail,
                password,
                rememberMe,
            })

            const cookieString = res.headers['set-cookie']?.[0]
            if (cookieString) {
                const parts = cookieString.split(';').map((part) => part.trim())
                const [nameValue] = parts
                const [_, value] = nameValue.split('=')

                const options: Record<string, any> = {}

                parts.slice(1).forEach((part) => {
                    const [key, val] = part.split('=')
                    if (key === 'Max-Age') options.maxAge = parseInt(val)
                    else if (key === 'Path') options.path = val
                    else if (key === 'HttpOnly') options.httpOnly = true
                    else if (key === 'SameSite')
                        options.sameSite = val.toLowerCase()
                    else if (key === 'Expires') options.expires = new Date(val)
                })

                setCookie('SESSION', value, options)
            }

            throw redirect({
                to: '/',
            })
        } catch (error: unknown) {
            if (
                error instanceof AxiosError &&
                error.response?.status === 403 &&
                error.response.headers.location ===
                    'http://localhost:3000/verify-email'
            ) {
                throw redirect({
                    to: '/verify-email',
                })
            }


            throw error
        }
    })
