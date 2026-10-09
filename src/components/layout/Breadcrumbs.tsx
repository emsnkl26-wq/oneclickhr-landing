import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { JsonLd } from '@/components/ui/JsonLd'
import { breadcrumbJsonLd } from '@/lib/seo'

export type Crumb = { name: string; path: string }

/** Rendered on every nested route, and emits matching BreadcrumbList JSON-LD. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
          {trail.map((crumb, i) => {
            const isLast = i === trail.length - 1
            return (
              <li key={crumb.path} className="flex items-center gap-1.5">
                {isLast ? (
                  <span aria-current="page" className="text-ink">
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={crumb.path}
                      className="rounded transition-colors hover:text-brand-ink"
                    >
                      {crumb.name}
                    </Link>
                    <ChevronRight aria-hidden="true" className="size-3.5 text-ink-subtle" />
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
