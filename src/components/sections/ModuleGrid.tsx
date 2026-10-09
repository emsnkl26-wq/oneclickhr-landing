import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { features, featureGroups } from '@/content/features'
import { Reveal } from '@/components/ui/Reveal'

/** The full module overview: every feature page, grouped, with icons. */
export function ModuleGrid() {
  return (
    <div className="space-y-10">
      {featureGroups.map((group, gi) => (
        <div key={group.label}>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-ink-subtle">
            {group.label}
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.slugs.map((slug, i) => {
              const feature = features.find((f) => f.slug === slug)
              if (!feature) return null
              const Icon = feature.icon

              return (
                <Reveal key={slug} delay={Math.min(gi * 0.04 + i * 0.03, 0.3)}>
                  <li className="h-full">
                    <Link
                      href={`/features/${feature.slug}`}
                      className="group flex h-full flex-col rounded-xl border border-line bg-surface-card p-5 transition-colors hover:border-brand-200 hover:bg-surface-muted"
                    >
                      <Icon aria-hidden="true" className="size-5 text-brand-600" />
                      <span className="mt-3.5 flex items-center gap-1.5 text-[0.9375rem] font-semibold text-ink">
                        {feature.name}
                        <ArrowRight
                          aria-hidden="true"
                          className="size-3.5 text-brand-ink opacity-0 transition-opacity group-hover:opacity-100"
                        />
                      </span>
                      <span className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                        {feature.summary}
                      </span>
                    </Link>
                  </li>
                </Reveal>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}
