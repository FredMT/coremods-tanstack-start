import PasswordStrengthInput from '@/components/meta-ui/PasswordStrengthInput'
import { RequiredFormLabel } from '@/components/meta-ui/RequiredFormLabel'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/sonner'
import { registerServerFn } from '@/routes/register/-fn/registerServerFn'
import {
    RegisterFormData,
    RegisterFormSchema,
} from '@/routes/register/-types/RegisterFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useServerFn } from '@tanstack/react-start'
import { useForm } from 'react-hook-form'

export function Register() {
    const form = useForm<RegisterFormData>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    const registerFn = useServerFn(registerServerFn)

    async function onSubmit(data: RegisterFormData) {
        try {
            const formData = new FormData()
            formData.append('username', data.username)
            formData.append('email', data.email)
            formData.append('password', data.password)
            formData.append('confirmPassword', data.confirmPassword)

            await registerFn({ data: formData })
        } catch (error) {
            if (error.name === 'ZodError' && error.issues) {
                error.issues.forEach((issue: any) => {
                    const fieldName = issue.path[0]
                    form.setError(fieldName as any, {
                        message: issue.message,
                    })
                })
            } else if (error.name === 'AxiosError' && error.data) {
                Object.entries(error.data).forEach(
                    ([fieldName, errorMessage]) => {
                        form.setError(fieldName as any, {
                            message: errorMessage as string,
                        })
                    }
                )
            } else {
                toast.error(error.message)
            }
        }
    }

    return (
        <div className="flex flex-col gap-y-4 pb-8">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <RequiredFormLabel>Username</RequiredFormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your username"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <RequiredFormLabel>Email</RequiredFormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <PasswordStrengthInput
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="Enter your password"
                                        label="Password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem className="flex flex-col space-y-0 space-x-2">
                                <div className="flex flex-col gap-y-1">
                                    <RequiredFormLabel>
                                        Confirm Password
                                    </RequiredFormLabel>
                                </div>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Confirm your password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={!form.formState.isValid}
                    >
                        Register
                    </Button>
                </form>
            </Form>
        </div>
    )
}
