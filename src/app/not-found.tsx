import Link from 'next/link'
import { ButtonLink } from '@/components/ui/Button'
import { Container, Eyebrow } from '@/components/ui/Section'
import { features } from '@/content/features'

const helpful = [
  { label: 'Product tour', href: '/product', description: 'Every module, end to end.' },
  { label: 'Pricing', href: '/pricing', description: 'Three plan shapes and a full matrix.' },
  { label: 'Security', href: '/security', description: 'How workspace isolation is enforced.' },
  { label: 'FAQ', href: '/faq', description: 'Answers, including the ones that are no.' },
  { label: 'Blog', href: '/blog', description: 'Four pieces on getting HR data right.' },
  { label: 'Contact', href: '/contact', description: 'Ask us something specific.' },
]

export default function NotFound() {
  return (
    <Container className="py-20 sm:py-28">
      <div className="max-w-2xl">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-3 text-balance text-h1">That page is not here</h1>
        <p className="text-pretty-wrap mt-5 text-lg leading-relaxed text-ink-muted">
          The link may be out of date, or the address may have a typo in it. Everything on this site
          is reachable from the links below.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Back to the home page</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Tell us what you were looking for
          </ButtonLink>
        </div>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-subtle">
            Main pages
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {helpful.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-xl border border-line bg-surface-card p-4 transition-colors hover:border-brand-200 hover:bg-surface-muted"
                >
                  <span className="block text-sm font-semibold text-ink">{item.label}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-ink-muted">
                    {item.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-subtle">
            All modules
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {features.map((feature) => (
              <li key={feature.slug}>
                <Link
                  href={`/features/${feature.slug}`}
                  className="inline-flex items-center rounded-full border border-line bg-surface-card px-3.5 py-1.5 text-sm text-ink-muted transition-colors hover:border-brand-200 hover:text-brand-ink"
                >
                  {feature.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  )
}
