import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/cn'

/**
 * Real brand assets from public/brand. The light logo (dark text) is shown in
 * light theme and the dark logo (light text) in dark theme; the swap is pure
 * CSS so there is no hydration flash.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <>
      <Image
        src="/brand/logo-wordmark.png"
        alt="OneclickHR"
        width={793}
        height={117}
        className={cn('h-5 w-auto dark:hidden', className)}
      />
      <Image
        src="/brand/logo-wordmark-dark.png"
        alt="OneclickHR"
        width={793}
        height={117}
        className={cn('hidden h-5 w-auto dark:block', className)}
      />
    </>
  )
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/logo-mark.png"
      alt=""
      aria-hidden="true"
      width={512}
      height={469}
      className={cn('h-8 w-auto shrink-0', className)}
    />
  )
}

export function FullLogo({ className }: { className?: string }) {
  return (
    <>
      <Image
        src="/brand/logo-horizontal.png"
        alt="OneclickHR"
        width={1061}
        height={243}
        priority
        className={cn('h-8 w-auto dark:hidden', className)}
      />
      <Image
        src="/brand/logo-horizontal-dark.png"
        alt="OneclickHR"
        width={1061}
        height={243}
        priority
        className={cn('hidden h-8 w-auto dark:block', className)}
      />
    </>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('flex items-center rounded-lg', className)}
      aria-label="OneclickHR home"
    >
      <FullLogo />
    </Link>
  )
}
