import { RegisterFormSchema } from '@/routes/register/-types/RegisterFormSchema'
import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'

export const registerServerFn = createServerFn({ method: 'POST' })
    .validator((data) => {
        if (!(data instanceof FormData)) {
            throw new Error('Invalid form data')
        }

        const username = data.get('username')
        const email = data.get('email')
        const password = data.get('password')
        const confirmPassword = data.get('confirmPassword')

        const validatedData = RegisterFormSchema.parse({
            username: username?.toString(),
            email: email?.toString(),
            password: password?.toString(),
            confirmPassword: confirmPassword?.toString(),
        })

        return validatedData
    })
    .handler(
        async ({ data: { username, email, password, confirmPassword } }) => {
            const csrfCookie = getCookie('X-XSRF-TOKEN')
            if (!csrfCookie) {
                throw new Error('X-XSRF-TOKEN is not set')
            }
            const res = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    confirmPassword,
                }),
                headers: {
                    'X-XSRF-TOKEN': csrfCookie,
                },
            })

            if (!res.ok) {
                throw new Error('Failed to login')
            }

            throw redirect({
                to: '/',
            })
        }
    )
