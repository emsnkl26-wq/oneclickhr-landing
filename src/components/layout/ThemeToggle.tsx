'use client'

// Client boundary: the resolved theme is only known in the browser.
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      // Before hydration we cannot know the theme, so the label stays generic
      // and the icon slot keeps its size to avoid any layout shift.
      aria-label={
        mounted ? (isDark ? 'Switch to light theme' : 'Switch to dark theme') : 'Switch theme'
      }
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="inline-flex size-10 items-center justify-center rounded-lg border border-line text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink"
    >
      <span className="relative block size-[18px]">
        {mounted ? (
          isDark ? (
            <Sun aria-hidden="true" className="size-[18px]" />
          ) : (
            <Moon aria-hidden="true" className="size-[18px]" />
          )
        ) : null}
      </span>
    </button>
  )
}
