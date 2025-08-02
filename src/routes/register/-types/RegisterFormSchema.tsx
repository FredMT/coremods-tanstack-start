import z from 'zod'

const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

export const RegisterFormSchema = z
    .object({
        username: z
            .string()
            .min(4, 'Username must be at least 4 characters')
            .max(12, 'Username must be at most 12 characters')
            .nonempty('Username is required'),

        email: z
            .string()
            .nonempty('Email is required')
            .email('Email should be valid'),

        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(
                strongPasswordRegex,
                'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
            )
            .nonempty('Password is required'),

        confirmPassword: z.string().nonempty('Confirm password is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    })

export type RegisterFormData = z.infer<typeof RegisterFormSchema>
