'use client'

// Client boundary: the header owns the mega-menu state, the mobile slide-over
// (focus trap, scroll lock, Escape to close) and the scrolled border.
import { ChevronDown, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { primaryNav, productMenu, solutionsMenu } from '@/content/nav'
import { cn } from '@/lib/cn'
import { site } from '@/lib/site'
import { ButtonLink } from '@/components/ui/Button'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'

type MenuKey = 'product' | 'solutions'

export function Header() {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Route change closes everything; otherwise a menu survives navigation.
  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpenMenu(null)
      setMobileOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Pointer outside the desktop nav closes the mega-menu.
  useEffect(() => {
    if (!openMenu) return
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [openMenu])

  // Body scroll lock while the mobile slide-over is open.
  useEffect(() => {
    if (!mobileOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    return () => {
      document.body.style.overflow = previous
    }
  }, [mobileOpen])

  // Focus trap for the mobile slide-over.
  const onPanelKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !panelRef.current) return
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }, [])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-surface/85 backdrop-blur transition-shadow',
        scrolled ? 'border-b border-line' : 'border-b border-transparent',
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        <div ref={navRef} className="hidden lg:block">
          <nav aria-label="Main">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const menuKey = 'menu' in item ? item.menu : undefined

                if (!menuKey) {
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'inline-flex h-10 items-center rounded-lg px-3 text-[0.9375rem] font-medium transition-colors hover:bg-surface-muted',
                          isActive(item.href) ? 'text-brand-ink' : 'text-ink-muted hover:text-ink',
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                }

                const open = openMenu === menuKey
                return (
                  <li key={item.label} className="relative">
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-haspopup="true"
                      onClick={() => setOpenMenu(open ? null : menuKey)}
                      className={cn(
                        'inline-flex h-10 items-center gap-1 rounded-lg px-3 text-[0.9375rem] font-medium transition-colors hover:bg-surface-muted',
                        open || isActive(`/${menuKey === 'product' ? 'product' : 'solutions'}`)
                          ? 'text-brand-ink'
                          : 'text-ink-muted hover:text-ink',
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn('size-4 transition-transform', open && 'rotate-180')}
                      />
                    </button>
                    {open ? (
                      <div
                        className={cn(
                          'absolute left-0 top-12 animate-fade-in rounded-xl border border-line bg-surface-card p-5 shadow-lift',
                          menuKey === 'product' ? 'w-[46rem]' : 'w-[22rem]',
                        )}
                      >
                        {menuKey === 'product' ? <ProductMenu /> : <SolutionsMenu />}
                      </div>
                    ) : null}
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink
            href={site.loginUrl}
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Log in
          </ButtonLink>
          <ButtonLink href={site.signupUrl} size="sm" className="hidden sm:inline-flex">
            Start free
          </ButtonLink>
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-line text-ink lg:hidden"
          >
            <Menu aria-hidden="true" className="size-[18px]" />
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-charcoal/50"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            onKeyDown={onPanelKeyDown}
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto border-l border-line bg-surface"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4">
              <Logo />
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="inline-flex size-10 items-center justify-center rounded-lg border border-line text-ink"
              >
                <X aria-hidden="true" className="size-[18px]" />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 px-4 py-5">
              <MobileGroup heading="Product" links={productMenu.featured} />
              <MobileGroup heading="Modules" links={productMenu.modules} compact />
              <MobileGroup heading="Solutions" links={solutionsMenu} />
              <MobileGroup
                heading="More"
                links={[
                  { label: 'Pricing', href: '/pricing' },
                  { label: 'Changelog', href: '/changelog' },
                  { label: 'Blog', href: '/blog' },
                  { label: 'FAQ', href: '/faq' },
                  { label: 'About', href: '/about' },
                  { label: 'Careers', href: '/careers' },
                  { label: 'Contact', href: '/contact' },
                ]}
                compact
              />
            </nav>

            <div className="sticky bottom-0 shrink-0 space-y-2 border-t border-line bg-surface p-4">
              <ButtonLink href={site.signupUrl} className="w-full">
                Start free
              </ButtonLink>
              <ButtonLink href={site.loginUrl} variant="secondary" className="w-full">
                Log in
              </ButtonLink>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

function ProductMenu() {
  return (
    <div className="grid grid-cols-[1fr_1.6fr] gap-5">
      <div>
        <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-[0.1em] text-ink-subtle">
          Overview
        </p>
        <ul className="space-y-1">
          {productMenu.featured.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-lg p-2 transition-colors hover:bg-surface-muted"
              >
                <span className="block text-sm font-medium text-ink">{link.label}</span>
                <span className="mt-0.5 block text-xs leading-snug text-ink-muted">
                  {link.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-[0.1em] text-ink-subtle">
          Modules
        </p>
        <ul className="grid max-h-[22rem] grid-cols-2 gap-x-2 gap-y-0.5 overflow-y-auto">
          {productMenu.modules.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-lg px-2 py-1.5 text-sm text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function SolutionsMenu() {
  return (
    <ul className="space-y-1">
      {solutionsMenu.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="block rounded-lg p-2 transition-colors hover:bg-surface-muted"
          >
            <span className="block text-sm font-medium text-ink">{link.label}</span>
            <span className="mt-0.5 block text-xs leading-snug text-ink-muted">
              {link.description}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

function MobileGroup({
  heading,
  links,
  compact = false,
}: {
  heading: string
  links: { label: string; href: string; description?: string }[]
  compact?: boolean
}) {
  return (
    <div className="mb-6">
      <p className="pb-2 text-xs font-semibold uppercase tracking-[0.1em] text-ink-subtle">
        {heading}
      </p>
      <ul className={cn(compact && 'grid grid-cols-2 gap-x-3')}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block rounded-lg py-2 text-[0.9375rem] text-ink transition-colors hover:text-brand-ink"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
