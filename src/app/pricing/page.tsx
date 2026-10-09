import { ArrowRight, Check, Minus } from 'lucide-react'
import { CTABand } from '@/components/layout/CTABand'
import { PageHero } from '@/components/sections/PageHero'
import { Accordion } from '@/components/ui/Accordion'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { Reveal } from '@/components/ui/Reveal'
import { Card, Container, Eyebrow, Pill, Section } from '@/components/ui/Section'
import { pricingFaqs } from '@/content/faqs'
import { comparison, everyPlan, plans } from '@/content/pricing'
import { faqJsonLd, pageMetadata } from '@/lib/seo'
import { cn } from '@/lib/cn'

export const metadata = pageMetadata({
  title: 'Pricing',
  description:
    'Three plan shapes — Starter, Growth and Enterprise — with a full feature matrix. We shape a plan around what you need, so the price is a conversation.',
  path: '/pricing',
})

/*
 * No Product or Offer JSON-LD on this page: schema.org Offer effectively
 * requires a price and priceCurrency, and we will not fabricate one. FAQPage
 * structured data is accurate and is emitted instead.
 */

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(pricingFaqs)} />

      <PageHero
        eyebrow="Pricing"
        title="Plans by shape, priced by conversation"
        body="We do not publish a per-seat figure, because the honest version depends on which modules you need and how many people you have. Pick the shape that looks like you, tell us what you are running today, and we will come back with something concrete."
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Pricing', path: '/pricing' },
        ]}
        actions={
          <ButtonLink href="/contact">
            Talk to us
            <ArrowRight aria-hidden="true" className="size-4" />
          </ButtonLink>
        }
      />

      <Section label="Plans">
        <Container>
          <ul className="grid gap-4 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 0.06}>
                <Card
                  as="li"
                  className={cn(
                    'flex h-full flex-col p-6 sm:p-7',
                    plan.featured && 'border-brand-200 bg-brand-50/40',
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-h3">{plan.name}</h2>
                    {plan.featured ? (
                      <Pill className="border-brand-200 bg-brand-50 text-brand-ink">
                        Most common
                      </Pill>
                    ) : null}
                  </div>
                  <p className="mt-1.5 text-sm text-ink-muted">{plan.forWho}</p>

                  <p className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-ink">
                    Talk to us
                  </p>
                  <p className="mt-1 text-xs text-ink-subtle">
                    Scoped to your modules and headcount
                  </p>

                  <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-muted">
                    {plan.description}
                  </p>

                  <ul className="mt-6 flex-1 space-y-2.5">
                    {plan.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2.5">
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 size-4 shrink-0 text-brand-600"
                        />
                        <span className="text-sm leading-relaxed text-ink-muted">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <ButtonLink
                    href="/contact"
                    variant={plan.featured ? 'primary' : 'secondary'}
                    className="mt-7 w-full"
                  >
                    Talk to us
                  </ButtonLink>
                </Card>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section label="Included in every plan" muted>
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Every plan</Eyebrow>
            <h2 className="mt-3 text-balance text-h2">What is included no matter what you pay</h2>
            <p className="text-pretty-wrap mt-4 text-lg leading-relaxed text-ink-muted">
              Some things are properties of how the product is built rather than features to
              withhold from a smaller plan.
            </p>
          </div>
          <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {everyPlan.map((item) => (
              <Card key={item.title}>
                <dt className="text-[0.9375rem] font-semibold text-ink">{item.title}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.body}</dd>
              </Card>
            ))}
          </dl>
        </Container>
      </Section>

      <Section label="Plan comparison">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Comparison</Eyebrow>
            <h2 className="mt-3 text-h2">What is in each plan</h2>
            <p className="text-pretty-wrap mt-4 text-lg leading-relaxed text-ink-muted">
              Every row is a real capability from the product rather than a marketing line. If
              something you need sits in a higher tier than you expected, say so when you get in
              touch.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <caption className="sr-only">
                Feature comparison across the Starter, Growth and Enterprise plans
              </caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="py-3 pr-4 text-sm font-semibold text-ink">
                    Capability
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.name}
                      scope="col"
                      className="w-28 py-3 text-center text-sm font-semibold text-ink"
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              {comparison.map((group) => (
                <tbody key={group.heading}>
                  <tr>
                    <th
                      scope="colgroup"
                      colSpan={plans.length + 1}
                      className="bg-surface-muted px-0 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-ink-subtle"
                    >
                      <span className="block pl-0">{group.heading}</span>
                    </th>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.label} className="border-b border-line">
                      <th
                        scope="row"
                        className="py-3 pr-4 text-sm font-normal leading-snug text-ink-muted"
                      >
                        {row.label}
                      </th>
                      {row.values.map((value, i) => (
                        <td key={i} className="py-3 text-center">
                          {typeof value === 'string' ? (
                            <span className="text-xs text-ink-muted">{value}</span>
                          ) : value ? (
                            <>
                              <Check aria-hidden="true" className="mx-auto size-4 text-brand-600" />
                              <span className="sr-only">Included</span>
                            </>
                          ) : (
                            <>
                              <Minus
                                aria-hidden="true"
                                className="mx-auto size-4 text-ink-subtle/60"
                              />
                              <span className="sr-only">Not included</span>
                            </>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </Container>
      </Section>

      <Section label="Pricing questions" muted>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <Eyebrow>Pricing questions</Eyebrow>
              <h2 className="mt-3 text-h2">The questions we get asked</h2>
              <p className="mt-4 leading-relaxed text-ink-muted">
                Including why there is no number on this page.
              </p>
            </div>
            <Accordion items={pricingFaqs} />
          </div>
        </Container>
      </Section>

      <CTABand
        heading="Tell us what you need and we will scope it"
        body="What you are running today, how many people, which modules have to work on day one. That is enough for us to come back with something concrete."
        primaryLabel="Talk to us"
        primaryHref="/contact"
        secondaryLabel="Read the product tour"
        secondaryHref="/product"
      />
    </>
  )
}
