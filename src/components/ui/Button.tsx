import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:pointer-events-none disabled:opacity-60'

const variants: Record<Variant, string> = {
  /*
   * The label is charcoal, not white. White on #FF6A00 is 2.9:1 and fails AA
   * for body-size text; charcoal on the same fill is 6.2:1. Hover lightens to
   * brand-500 (7.4:1) and press darkens to brand-700 (4.7:1) rather than
   * brand-800, which would drop the label below AA.
   */
  primary: 'bg-brand-600 text-charcoal hover:bg-brand-500 active:bg-brand-700',
  secondary: 'border border-line bg-surface-card text-ink hover:bg-surface-muted',
  ghost: 'text-ink hover:bg-surface-muted',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-12 px-6 text-base',
}

export function buttonClass(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className)
}

type ButtonLinkProps = {
  href: string
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
  /** External links open the app in the same tab by default; set to open a new one. */
  newTab?: boolean
}

export function ButtonLink({ href, variant, size, className, children, newTab }: ButtonLinkProps) {
  const isExternal = href.startsWith('http')
  const classes = buttonClass(variant, size, className)

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}

type ButtonProps = ComponentProps<'button'> & { variant?: Variant; size?: Size }

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={buttonClass(variant, size, className)} {...props} />
}
