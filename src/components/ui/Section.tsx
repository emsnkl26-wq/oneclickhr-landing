import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('container-page', className)}>{children}</div>
}

export function Section({
  children,
  className,
  label,
  id,
  muted = false,
}: {
  children: ReactNode
  className?: string
  /** Every section gets an accessible name so screen reader users can navigate. */
  label: string
  id?: string
  muted?: boolean
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn(
        'scroll-mt-24 border-t border-line py-16 sm:py-20 lg:py-24',
        muted && 'bg-surface-muted',
        className,
      )}
    >
      {children}
    </section>
  )
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn('text-xs font-semibold uppercase tracking-[0.12em] text-brand-ink', className)}
    >
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = 'left',
  as: Tag = 'h2',
  className,
}: {
  eyebrow?: string
  title: string
  body?: string
  align?: 'left' | 'center'
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
      <Tag className={Tag === 'h1' ? 'text-h1' : 'text-h2'}>{title}</Tag>
      {body ? (
        <p className="text-pretty-wrap mt-4 text-lg leading-relaxed text-ink-muted">{body}</p>
      ) : null}
    </div>
  )
}

export function Card({
  children,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'li' | 'article'
}) {
  return (
    <Tag
      className={cn(
        'rounded-xl border border-line bg-surface-card p-6 transition-colors',
        className,
      )}
    >
      {children}
    </Tag>
  )
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-line bg-surface-card px-3 py-1 text-xs font-medium text-ink-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}
