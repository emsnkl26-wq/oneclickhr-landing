import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Shared chrome for the mock product UI. These visuals are decorative
 * representations of the app built from the real design tokens, so the whole
 * frame is aria-hidden and every label inside is presentational.
 */
export function Frame({
  title,
  children,
  className,
  footer,
}: {
  title: string
  children: ReactNode
  className?: string
  footer?: ReactNode
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'select-none overflow-hidden rounded-xl border border-line bg-surface-card shadow-lift',
        className,
      )}
    >
      <div className="flex items-center gap-2.5 border-b border-line bg-surface-muted px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="size-2 rounded-full bg-ink-subtle/50" />
          <span className="size-2 rounded-full bg-ink-subtle/50" />
          <span className="size-2 rounded-full bg-ink-subtle/50" />
        </span>
        <span className="text-[0.6875rem] font-medium tracking-wide text-ink-muted">{title}</span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
      {footer ? (
        <div className="border-t border-line bg-surface-muted px-4 py-2.5 sm:px-5">{footer}</div>
      ) : null}
    </div>
  )
}

export function Row({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn('flex items-center gap-3 border-b border-line py-2.5 last:border-0', className)}
    >
      {children}
    </div>
  )
}

/** Monogram stand-in for an avatar; no photographs anywhere on the site. */
export function Avatar({
  initials,
  tone = 'muted',
}: {
  initials: string
  tone?: 'muted' | 'brand'
}) {
  return (
    <span
      className={cn(
        'flex size-7 shrink-0 items-center justify-center rounded-full text-[0.625rem] font-semibold',
        tone === 'brand' ? 'bg-brand-50 text-brand-ink' : 'bg-surface-muted text-ink-muted',
      )}
    >
      {initials}
    </span>
  )
}

type StatusTone = 'success' | 'warning' | 'info' | 'danger' | 'neutral' | 'brand'

const statusTones: Record<StatusTone, string> = {
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/15 text-[hsl(32_95%_34%)] dark:text-warning',
  info: 'bg-info/10 text-info',
  danger: 'bg-danger/10 text-danger',
  brand: 'bg-brand-50 text-brand-ink',
  neutral: 'bg-surface-muted text-ink-muted',
}

export function Status({ children, tone = 'neutral' }: { children: ReactNode; tone?: StatusTone }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[0.625rem] font-semibold',
        statusTones[tone],
      )}
    >
      {children}
    </span>
  )
}

export function Bar({ value, tone = 'brand' }: { value: number; tone?: 'brand' | 'muted' }) {
  return (
    <span className="block h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
      <span
        className={cn(
          'block h-full rounded-full',
          tone === 'brand' ? 'bg-brand-600' : 'bg-ink-subtle',
        )}
        style={{ width: `${value}%` }}
      />
    </span>
  )
}

export function Label({ children }: { children: ReactNode }) {
  return (
    <span className="text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-ink-subtle">
      {children}
    </span>
  )
}
