import { customInstance } from '@/lib/api/mutator/custom-instance'
import { RegisterFormSchema } from '@/routes/register/-types/RegisterFormSchema'
import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

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
            try {
                await customInstance({
                    url: '/api/auth/register',
                    method: 'POST',
                    data: {
                        username,
                        email,
                        password,
                        confirmPassword,
                    },
                })

                throw redirect({
                    to: '/',
                })
            } catch (error) {
                throw error
            }
        }
    )
