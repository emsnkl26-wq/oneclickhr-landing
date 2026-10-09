import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { features } from '@/content/features'
import { solutions } from '@/content/solutions'

type Item = { href: string; label: string; description: string }

function resolve(slugs: string[]): Item[] {
  return slugs.flatMap((slug) => {
    const feature = features.find((f) => f.slug === slug)
    if (feature) {
      return [
        { href: `/features/${feature.slug}`, label: feature.name, description: feature.summary },
      ]
    }
    const solution = solutions.find((s) => s.slug === slug)
    if (solution) {
      return [
        {
          href: `/solutions/${solution.slug}`,
          label: solution.name,
          description: solution.summary,
        },
      ]
    }
    return []
  })
}

/** "Works with" cross-links. Every feature and solution page carries one. */
export function RelatedLinks({
  slugs,
  heading = 'Works with',
  body,
}: {
  slugs: string[]
  heading?: string
  body?: string
}) {
  const items = resolve(slugs)

  return (
    <div>
      <h2 className="text-h2">{heading}</h2>
      {body ? <p className="mt-3 max-w-2xl leading-relaxed text-ink-muted">{body}</p> : null}
      <ul className="mt-7 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex h-full items-start justify-between gap-4 rounded-xl border border-line bg-surface-card p-5 transition-colors hover:border-brand-200 hover:bg-surface-muted"
            >
              <span>
                <span className="block text-[0.9375rem] font-semibold text-ink">{item.label}</span>
                <span className="mt-1 block text-sm leading-relaxed text-ink-muted">
                  {item.description}
                </span>
              </span>
              <ArrowRight
                aria-hidden="true"
                className="mt-1 size-4 shrink-0 text-ink-subtle transition-colors group-hover:text-brand-ink"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
