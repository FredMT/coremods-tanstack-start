import { Button } from '@/components/ui/button'
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
import { registerServerFn } from '@/routes/register/-fn/registerServerFn'
import { RegisterFormData, RegisterFormSchema } from '@/routes/register/-types/RegisterFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useServerFn } from '@tanstack/react-start'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function Register({ className, ...props }: React.ComponentProps<'form'>) {
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
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
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
                                <FormLabel>Email</FormLabel>
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
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Confirm your password"
                                        {...field}
                                    />
                                </FormControl>
                                <div className="flex flex-col gap-y-1">
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormDescription>
                                        Confirm your password
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
