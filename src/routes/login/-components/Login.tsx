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
import { zodResolver } from '@hookform/resolvers/zod'
import { useServerFn } from '@tanstack/react-start'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { loginServerFn } from '../-fn/loginServerFn'
import { LoginFormData, LoginFormSchema } from '../-types/LoginFormSchema'
export function Login({ className, ...props }: React.ComponentProps<'form'>) {
    const form = useForm<LoginFormData>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            usernameOrEmail: '',
            password: '',
            rememberMe: false,
        },
    })

    const loginFn = useServerFn(loginServerFn)

    async function onSubmit(data: LoginFormData) {
        try {
            const formData = new FormData()
            formData.append('usernameOrEmail', data.usernameOrEmail)
            formData.append('password', data.password)
            console.log(data.rememberMe)
            formData.append('rememberMe', data.rememberMe.toString())

            await loginFn({ data: formData })
        } catch (error) {
            toast.error('Login failed. Please try again.')
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
                                <FormLabel>Username or Email</FormLabel>
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
                                <FormLabel>Password</FormLabel>
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

                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>
            </Form>
        </div>
    )
}
