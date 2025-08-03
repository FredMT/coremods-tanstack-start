import { RequiredFormLabel } from '@/components/meta-ui/RequiredFormLabel'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginServerFn } from '@/routes/login/-fn/loginServerFn'
import {
    LoginFormData,
    LoginFormSchema,
} from '@/routes/login/-types/LoginFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
export function Login() {
    const form = useForm<LoginFormData>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            usernameOrEmail: '',
            password: '',
            rememberMe: false,
        },
    })

    const [alert, setAlert] = useState<string | null>(null)

    const loginFn = useServerFn(loginServerFn)

    async function onSubmit(data: LoginFormData) {
        try {
            const formData = new FormData()
            formData.append('usernameOrEmail', data.usernameOrEmail)
            formData.append('password', data.password)
            formData.append('rememberMe', data.rememberMe.toString())

            await loginFn({ data: formData })
        } catch (error) {
            if (error.name === 'ZodError' && error.issues) {
                error.issues.forEach((issue: any) => {
                    const fieldName = issue.path[0]
                    form.setError(fieldName as any, {
                        message: issue.message,
                    })
                })
            }

            if (error.name === 'AxiosError' && error.data) {
                if (error.data.message === 'Bad credentials') {
                    setAlert('Invalid credentials')
                } else {
                    Object.entries(error.data).forEach(
                        ([fieldName, errorMessage]) => {
                            form.setError(fieldName as any, {
                                message: errorMessage as string,
                            })
                        }
                    )
                }
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
                        name="usernameOrEmail"
                        render={({ field }) => (
                            <FormItem>
                                <RequiredFormLabel>
                                    Username or Email
                                </RequiredFormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your username or email"
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
                                <RequiredFormLabel>Password</RequiredFormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="rememberMe"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="flex flex-col gap-y-1">
                                    <FormLabel>Remember me</FormLabel>
                                    <FormDescription>
                                        Keep me signed in for 30 days
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={!form.formState.isValid}
                    >
                        Login
                    </Button>
                    {alert && (
                        <Alert variant="destructive">
                            <AlertTitle>{alert}</AlertTitle>
                        </Alert>
                    )}
                </form>
            </Form>
        </div>
    )
}
