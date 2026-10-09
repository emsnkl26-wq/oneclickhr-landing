import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import { CTABand } from '@/components/layout/CTABand'
import { ProductVisual } from '@/components/product/ProductVisual'
import { PageHero } from '@/components/sections/PageHero'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { Reveal } from '@/components/ui/Reveal'
import { Card, Container, Eyebrow, Section } from '@/components/ui/Section'
import { features } from '@/content/features'
import { howItWorks, roleStrip } from '@/content/home'
import { pageMetadata, softwareApplicationJsonLd } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Product tour',
  description:
    'The full OneclickHR tour: all fifteen modules, the four roles, how a workspace is set up, and how attendance, payroll, timesheets and invoicing connect.',
  path: '/product',
})

export default function ProductPage() {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd} />

      <PageHero
        eyebrow="Product tour"
        title="Every module, end to end"
        body="OneclickHR is one workspace covering fifteen modules that share the same records. This page walks all of them in order, so you can read the whole product rather than piecing it together from feature pages."
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Product', path: '/product' },
        ]}
        visual={<ProductVisual name="dashboard" />}
        actions={
          <>
            <ButtonLink href={site.signupUrl}>
              Start free
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
            <ButtonLink href="/pricing" variant="secondary">
              See plans
            </ButtonLink>
          </>
        }
      />

      <div className="border-b border-line">
        <Container className="py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[14rem_1fr] lg:gap-14">
            {/* Sticky in-page table of contents. Plain anchors, no client JS. */}
            <nav aria-label="On this page" className="hidden lg:block">
              <div className="sticky top-24">
                <p className="pb-3 text-xs font-semibold uppercase tracking-[0.1em] text-ink-subtle">
                  On this page
                </p>
                <ul className="space-y-0.5 border-l border-line">
                  <li>
                    <a
                      href="#setup"
                      className="-ml-px block border-l border-transparent py-1.5 pl-3 text-sm text-ink-muted transition-colors hover:border-brand-600 hover:text-brand-ink"
                    >
                      Setting up a workspace
                    </a>
                  </li>
                  <li>
                    <a
                      href="#roles"
                      className="-ml-px block border-l border-transparent py-1.5 pl-3 text-sm text-ink-muted transition-colors hover:border-brand-600 hover:text-brand-ink"
                    >
                      The four roles
                    </a>
                  </li>
                  {features.map((feature) => (
                    <li key={feature.slug}>
                      <a
                        href={`#${feature.slug}`}
                        className="-ml-px block border-l border-transparent py-1.5 pl-3 text-sm text-ink-muted transition-colors hover:border-brand-600 hover:text-brand-ink"
                      >
                        {feature.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div>
              <section id="setup" className="scroll-mt-24" aria-label="Setting up a workspace">
                <Eyebrow>Getting started</Eyebrow>
                <h2 className="mt-3 text-h2">Setting up a workspace</h2>
                <p className="text-pretty-wrap mt-4 text-lg leading-relaxed text-ink-muted">
                  An organization signs itself up with email confirmation and gets a fully isolated
                  workspace. Two settings come first, because everything else depends on them: the
                  organization timezone, which determines the calendar day every attendance record
                  is filed under, and the brand color, which flows into the app, the transactional
                  emails and every generated PDF.
                </p>
                <ol className="mt-8 grid gap-4 sm:grid-cols-3">
                  {howItWorks.map((step) => (
                    <Card as="li" key={step.step} className="h-full">
                      <span className="text-sm font-semibold tabular-nums text-brand-ink">
                        {step.step}
                      </span>
                      <h3 className="mt-2.5 text-[0.9375rem] font-semibold">{step.heading}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.body}</p>
                    </Card>
                  ))}
                </ol>
              </section>

              <section id="roles" className="mt-16 scroll-mt-24" aria-label="The four roles">
                <Eyebrow>Access</Eyebrow>
                <h2 className="mt-3 text-h2">The four roles</h2>
                <p className="text-pretty-wrap mt-4 text-lg leading-relaxed text-ink-muted">
                  Every boundary below is enforced in Postgres with Row Level Security rather than
                  by hiding interface elements, which is what makes it safe to give an external
                  recruiter an account at all.
                </p>
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  {roleStrip.map((role) => (
                    <Card as="li" key={role.name} className="h-full">
                      <role.icon aria-hidden="true" className="size-5 text-brand-600" />
                      <h3 className="mt-3 text-[0.9375rem] font-semibold">{role.name}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{role.body}</p>
                    </Card>
                  ))}
                </ul>
              </section>

              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <section
                    key={feature.slug}
                    id={feature.slug}
                    className="mt-16 scroll-mt-24 border-t border-line pt-12"
                    aria-label={feature.title}
                  >
                    <div className="flex items-center gap-3">
                      <Icon aria-hidden="true" className="size-5 shrink-0 text-brand-600" />
                      <Eyebrow>{feature.name}</Eyebrow>
                    </div>
                    <h2 className="mt-3 text-balance text-h2">{feature.heroHeadline}</h2>
                    <p className="text-pretty-wrap mt-4 text-lg leading-relaxed text-ink-muted">
                      {feature.heroBody}
                    </p>

                    <Reveal className="mt-8">
                      <ProductVisual name={feature.visual} />
                    </Reveal>

                    <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                      {feature.capabilities.map((capability) => (
                        <li key={capability.title} className="flex gap-3">
                          <Check
                            aria-hidden="true"
                            className="mt-0.5 size-4 shrink-0 text-brand-600"
                          />
                          <span className="text-sm leading-relaxed">
                            <span className="font-medium text-ink">{capability.title}.</span>{' '}
                            <span className="text-ink-muted">{capability.body}</span>
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/features/${feature.slug}`}
                      className="mt-7 inline-flex items-center gap-1.5 rounded-lg text-[0.9375rem] font-medium text-brand-ink hover:underline"
                    >
                      Full page on {feature.name.toLowerCase()}
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                  </section>
                )
              })}
            </div>
          </div>
        </Container>
      </div>

      <Section label="Security summary" muted>
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Underneath</Eyebrow>
            <h2 className="mt-3 text-h2">All fifteen modules sit on one isolation boundary</h2>
            <p className="text-pretty-wrap mt-4 text-lg leading-relaxed text-ink-muted">
              One Postgres database, Row Level Security on every single table, and a non-null tenant
              id on every tenant-scoped table. A user&rsquo;s organization and role travel in their
              signed auth token, so the database itself decides what they may read. Isolation is
              tested against a real database, not mocked.
            </p>
            <ButtonLink href="/security" variant="secondary" className="mt-7">
              Read the security story
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <CTABand />
    </>
  )
}
