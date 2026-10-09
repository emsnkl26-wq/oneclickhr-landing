'use client'

// Client boundary: scroll-triggered motion needs an IntersectionObserver and
// the reduced-motion media query, neither of which exists on the server.
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

type State = 'static' | 'hidden' | 'revealed'

/**
 * Fade-and-rise on scroll.
 *
 * The hidden state is applied by JS after mount, never in the server HTML, so
 * a visitor without JS (or before hydration) sees the content rather than an
 * empty page. Elements already in the viewport on load are left alone: there
 * is nothing to reveal, and animating them would only delay the first read.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<State>('static')

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (element.getBoundingClientRect().top < window.innerHeight) return

    setState('hidden')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          setState('revealed')
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -80px 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        className,
        state === 'hidden' && 'opacity-0',
        // `animate-rise-in` uses fill-mode `both`, so a staggered delay holds
        // the element at opacity 0 rather than flashing it in first.
        state === 'revealed' && 'animate-rise-in',
      )}
      style={state === 'revealed' && delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  )
}
