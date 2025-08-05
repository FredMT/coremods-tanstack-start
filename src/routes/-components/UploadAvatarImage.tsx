import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useUploadAvatar } from '@/lib/api/user-controller/user-controller'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const MAX_FILE_SIZE = 3 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
]

const imageFileSchema = z.object({
    file: z
        .any()
        .refine((file) => file instanceof FileList && file.length > 0, {
            message: 'File is required.',
        })
        .refine((file) => file[0]?.size <= MAX_FILE_SIZE, {
            message: 'File must be less than 3MB.',
        })
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file[0]?.type), {
            message: 'Only .jpg, .jpeg, .png, and .webp formats are supported.',
        }),
})

export function UploadAvatarImage() {
    const uploadAvatar = useUploadAvatar({
        request: {
            withCredentials: true,
        },
    })

    const queryClient = useQueryClient()
    const form = useForm<z.infer<typeof imageFileSchema>>({
        resolver: zodResolver(imageFileSchema),
        defaultValues: {
            file: undefined,
        },
    })

    const onSubmit = async (data: z.infer<typeof imageFileSchema>) => {
        try {
            await uploadAvatar.mutateAsync({
                data: {
                    file: data.file[0],
                },
            })
            queryClient.invalidateQueries({ queryKey: ['authenticated-user'] })
            form.reset()
        } catch (error) {
            if (error.status === 401) {
                queryClient.invalidateQueries({
                    queryKey: ['authenticated-user'],
                })
            }

            form.setError('file', {
                message: 'Upload failed',
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    name="file"
                    control={form.control}
                    render={({ field: { onChange, name } }) => {
                        return (
                            <FormItem>
                                <FormLabel>File</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        name={name}
                                        onChange={(e) =>
                                            onChange(e.target.files)
                                        }
                                        accept={ACCEPTED_IMAGE_TYPES.join(',')}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />
                <Button type="submit" disabled={!form.formState.isValid}>
                    {uploadAvatar.isPending ? 'Uploading...' : 'Submit'}
                </Button>
            </form>
        </Form>
    )
}
