import z from 'zod'

const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

export const LoginFormSchema = z.object({
    usernameOrEmail: z.string().min(1, 'Username or email is required'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(
            strongPasswordRegex,
            'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
        )
        .nonempty('Password is required'),
    rememberMe: z.boolean(),
})

export type LoginFormData = z.infer<typeof LoginFormSchema>
