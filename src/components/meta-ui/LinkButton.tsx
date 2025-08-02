import { Button, buttonVariants } from '@/components/ui/button'
import { Link, LinkProps } from '@tanstack/react-router'
import { VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'
import React from 'react'

type LinkButtonProps = {
    disabled?: boolean
    children: React.ReactNode
    className?: string
    variant?: VariantProps<typeof buttonVariants>['variant']
    hidden?: boolean
} & Omit<LinkProps, 'className' | 'children'>

export const LinkButton: React.FC<LinkButtonProps> = ({
    disabled = false,
    children,
    className,
    variant = 'default',
    hidden = false,
    ...linkProps
}) => {
    return (
        <Button asChild variant={variant} hidden={hidden}>
            <Link
                {...linkProps}
                className={clsx(
                    className,
                    disabled && 'pointer-events-none opacity-50'
                )}
                aria-disabled={disabled}
                tabIndex={disabled ? -1 : 0}
            >
                {children}
            </Link>
        </Button>
    )
}
