import { useTheme } from 'next-themes'
import { Toaster as Sonner, ToasterProps, toast as sonnerToast } from 'sonner'

type ToastOptions = Parameters<typeof sonnerToast.error>[1]

const errorStyles = {
    style: {
        '--normal-bg':
            'color-mix(in oklab, var(--destructive) 10%, var(--background))',
        '--normal-text': 'var(--destructive)',
        '--normal-border': 'var(--destructive)',
    } as React.CSSProperties,
}

const warningStyles = {
    style: {
        '--normal-bg':
            'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
        '--normal-text':
            'light-dark(var(--color-amber-600), var(--color-amber-400))',
        '--normal-border':
            'light-dark(var(--color-amber-600), var(--color-amber-400))',
    } as React.CSSProperties,
}

const successStyles = {
    style: {
        '--normal-bg':
            'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
        '--normal-text':
            'light-dark(var(--color-green-600), var(--color-green-400))',
        '--normal-border':
            'light-dark(var(--color-green-600), var(--color-green-400))',
    } as React.CSSProperties,
}

const toast = {
    ...sonnerToast,
    error: (message: string, options?: ToastOptions) => {
        return sonnerToast.error(message, { ...errorStyles, ...options })
    },
    warning: (message: string, options?: ToastOptions) => {
        return sonnerToast.warning(message, { ...warningStyles, ...options })
    },
    success: (message: string, options?: ToastOptions) => {
        return sonnerToast.success(message, { ...successStyles, ...options })
    },
}

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = 'system' } = useTheme()

    return (
        <Sonner
            theme={theme as ToasterProps['theme']}
            className="toaster group"
            style={
                {
                    '--normal-bg': 'var(--popover)',
                    '--normal-text': 'var(--popover-foreground)',
                    '--normal-border': 'var(--border)',
                } as React.CSSProperties
            }
            {...props}
        />
    )
}

export { Toaster, toast }
