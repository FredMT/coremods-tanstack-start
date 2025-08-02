import { AXIOS_INSTANCE } from '@/lib/api/mutator/custom-instance'
import { LoginFormSchema } from '@/routes/login/-types/LoginFormSchema'
import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
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
            await AXIOS_INSTANCE.post('/api/auth/login', {
                usernameOrEmail,
                password,
                rememberMe,
            })

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
