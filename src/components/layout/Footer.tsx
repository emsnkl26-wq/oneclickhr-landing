import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { footerColumns } from '@/content/nav'
import { site } from '@/lib/site'
import { FullLogo } from './Logo'

export function Footer() {
  // Computed, not hardcoded, so the footer does not go stale in January.
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-surface-muted" aria-label="Site footer">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_3fr]">
          <div>
            <FullLogo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              {site.tagline} {site.description}
            </p>
            <a
              href={site.appUrl}
              className="mt-5 inline-flex items-center gap-1.5 rounded-lg text-sm font-medium text-brand-ink hover:underline"
            >
              Open the app
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>

          <nav aria-label="Footer links">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
              {footerColumns.map((column) => (
                <div key={column.heading}>
                  <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-subtle">
                    {column.heading}
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="rounded text-sm text-ink-muted transition-colors hover:text-brand-ink"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.legalEntity}. {site.name} is a product of {site.legalEntity}.
          </p>
          <p>{site.shortTagline}</p>
        </div>
      </div>
    </footer>
  )
}
