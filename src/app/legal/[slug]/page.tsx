import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Article } from '@/components/ui/Article'
import { Container } from '@/components/ui/Section'
import { legalBySlug, legalDocs } from '@/content/legal'
import { pageMetadata } from '@/lib/seo'
import { legalUpdatedLabel, site } from '@/lib/site'

export function generateStaticParams() {
  return legalDocs.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const doc = legalBySlug(slug)
  if (!doc) return {}

  return pageMetadata({
    title: doc.title,
    description: doc.metaDescription,
    path: `/legal/${doc.slug}`,
  })
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = legalBySlug(slug)
  if (!doc) notFound()

  const others = legalDocs.filter((d) => d.slug !== doc.slug)

  return (
    <Container className="py-14 sm:py-16">
      <div className="mb-6">
        <Breadcrumbs
          trail={[
            { name: 'Home', path: '/' },
            { name: 'Legal', path: `/legal/${doc.slug}` },
            { name: doc.title, path: `/legal/${doc.slug}` },
          ]}
        />
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_15rem] lg:gap-14">
        <div className="max-w-3xl">
          <h1 className="text-balance text-h1">{doc.title}</h1>
          <p className="mt-3 text-sm text-ink-muted">
            Last updated <time dateTime={site.legalUpdated}>{legalUpdatedLabel}</time> ·{' '}
            {site.legalEntity}
          </p>

          <div className="mt-8 rounded-xl border border-line bg-surface-muted p-5 sm:p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-ink">
              The plain-language summary
            </h2>
            <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink">{doc.summary}</p>
          </div>

          <div className="mt-10 space-y-10">
            {doc.sections.map((section) => (
              <section key={section.heading} id={slugify(section.heading)} className="scroll-mt-24">
                <h2 className="text-h3 sm:text-2xl">{section.heading}</h2>
                <div className="mt-5">
                  <Article blocks={section.blocks} />
                </div>
              </section>
            ))}
          </div>
        </div>

        <aside aria-label="Legal documents" className="lg:pt-24">
          <div className="lg:sticky lg:top-24">
            <p className="pb-3 text-xs font-semibold uppercase tracking-[0.1em] text-ink-subtle">
              On this page
            </p>
            <ul className="mb-8 space-y-0.5 border-l border-line">
              {doc.sections.map((section) => (
                <li key={section.heading}>
                  <a
                    href={`#${slugify(section.heading)}`}
                    className="-ml-px block border-l border-transparent py-1.5 pl-3 text-sm text-ink-muted transition-colors hover:border-brand-600 hover:text-brand-ink"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>

            <p className="pb-3 text-xs font-semibold uppercase tracking-[0.1em] text-ink-subtle">
              Other documents
            </p>
            <ul className="space-y-1.5">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/legal/${other.slug}`}
                    className="rounded text-sm text-ink-muted transition-colors hover:text-brand-ink"
                  >
                    {other.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Container>
  )
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
