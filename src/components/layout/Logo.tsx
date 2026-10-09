import Link from 'next/link'
import { cn } from '@/lib/cn'

/**
 * The wordmark is styled text: "Oneclick" in charcoal, "HR" in brand ink.
 * To swap in a real asset later, drop public/logo.svg and replace the <span>
 * pair below with a next/image pointing at it — nothing else references the mark.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('text-[1.0625rem] font-bold tracking-[-0.02em] text-ink', className)}>
      Oneclick<span className="text-brand-ink">HR</span>
    </span>
  )
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      aria-hidden="true"
      className={cn('size-7 shrink-0', className)}
      fill="none"
    >
      <rect width="28" height="28" rx="8" fill="hsl(var(--brand-600))" />
      <path
        d="M9 14.4 12.4 18 19 10.8"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('flex items-center gap-2.5 rounded-lg', className)}
      aria-label="OneclickHR home"
    >
      <LogoMark />
      <Wordmark />
    </Link>
  )
}
