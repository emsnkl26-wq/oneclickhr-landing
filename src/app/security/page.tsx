import { ArrowRight, Check, X } from 'lucide-react'
import Link from 'next/link'
import { CTABand } from '@/components/layout/CTABand'
import { PageHero } from '@/components/sections/PageHero'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Card, Container, Eyebrow, Section } from '@/components/ui/Section'
import { infrastructure, pillars, weDo, weDoNotClaim } from '@/content/security'
import { pageMetadata } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Security and isolation',
  description:
    'Multi-tenant isolation enforced by Postgres Row Level Security on every table, tested against a real database. Plus exactly what we do not claim.',
  path: '/security',
})

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Security"
        title="The boundary is in the database, not in the code"
        body="A tenant boundary enforced by remembering to add a filter is a boundary that holds until the first busy afternoon. OneclickHR puts it in Postgres, on every table, and tests it against a real database."
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Security', path: '/security' },
        ]}
        actions={
          <>
            <ButtonLink href="/contact">
              Ask us a security question
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
            <ButtonLink href="/legal/dpa" variant="secondary">
              Read the DPA
            </ButtonLink>
          </>
        }
      />

      <Section label="How isolation works">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-3 text-balance text-h2">
              Eight things we do, described specifically
            </h2>
            <p className="text-pretty-wrap mt-4 text-lg leading-relaxed text-ink-muted">
              Security pages are usually a list of adjectives. These are mechanisms, and each one is
              either true of the system or it is not.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={Math.min(i * 0.04, 0.2)}>
                <Card className="grid gap-6 p-6 sm:p-7 lg:grid-cols-[1fr_1.5fr] lg:gap-10">
                  <div>
                    <pillar.icon aria-hidden="true" className="size-5 text-brand-600" />
                    <h3 className="mt-3.5 text-h3">{pillar.title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
                      {pillar.summary}
                    </p>
                  </div>
                  <ul className="space-y-2.5">
                    {pillar.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 size-4 shrink-0 text-brand-600"
                        />
                        <span className="text-sm leading-relaxed text-ink-muted">{point}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section label="Infrastructure" muted>
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Infrastructure</Eyebrow>
            <h2 className="mt-3 text-h2">Four providers, named</h2>
            <p className="text-pretty-wrap mt-4 text-lg leading-relaxed text-ink-muted">
              We say this plainly because it is a credibility asset rather than something to be
              vague about. There is no analytics vendor, no advertising network and no session
              recorder, because each would be another company holding employee data to no clear
              benefit.
            </p>
          </div>
          <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {infrastructure.map((item) => (
              <Card key={item.name}>
                <dt className="text-[0.9375rem] font-semibold text-ink">{item.name}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.role}</dd>
              </Card>
            ))}
          </dl>
          <p className="mt-6 text-sm text-ink-muted">
            The complete list, including the optional Google integrations and what each provider
            processes, is on the{' '}
            <Link
              href="/legal/subprocessors"
              className="font-medium text-brand-ink hover:underline"
            >
              subprocessors page
            </Link>
            .
          </p>
        </Container>
      </Section>

      {/* Honesty section */}
      <Section label="What we do and do not claim">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Honesty</Eyebrow>
            <h2 className="mt-3 text-balance text-h2">What we do, and what we will not claim</h2>
            <p className="text-pretty-wrap mt-4 text-lg leading-relaxed text-ink-muted">
              Software that claims certifications it does not hold has told you something useful
              about everything else it claims. So here is both columns.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <Card className="p-6 sm:p-7">
              <h3 className="text-h3">What we do</h3>
              <ul className="mt-5 space-y-3">
                {weDo.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-success" />
                    <span className="text-sm leading-relaxed text-ink-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 sm:p-7">
              <h3 className="text-h3">What we do not claim</h3>
              <ul className="mt-5 space-y-3">
                {weDoNotClaim.map((item) => (
                  <li key={item} className="flex gap-3">
                    <X aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ink-subtle" />
                    <span className="text-sm leading-relaxed text-ink-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="mt-8 rounded-xl border border-line bg-surface-muted p-6">
            <h3 className="text-[0.9375rem] font-semibold">
              What we can say about compliance posture
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">
              The architecture was built with data isolation and least privilege as first
              principles, and the data residency region is chosen per deployment. We offer a data
              processing addendum, we name every subprocessor and what it processes, and we will
              answer a security questionnaire honestly, including where the answer is no. If a
              certification is a hard requirement for you today, we would rather tell you now than
              six weeks into a procurement process.
            </p>
          </div>
        </Container>
      </Section>

      <Section label="Reporting a vulnerability" muted>
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Disclosure</Eyebrow>
            <h2 className="mt-3 text-h2">Reporting a vulnerability</h2>
            <p className="text-pretty-wrap mt-4 text-lg leading-relaxed text-ink-muted">
              If you find a security issue, we would much rather hear from you than not. Email{' '}
              <a
                href={`mailto:${site.securityEmail}`}
                className="font-medium text-brand-ink hover:underline"
              >
                {site.securityEmail}
              </a>{' '}
              with enough detail to reproduce it. We will not pursue you for good-faith research
              that avoids privacy violations, data destruction and service disruption. Because we
              are a small team, the person who reads your report has read the code.
            </p>
          </div>
        </Container>
      </Section>

      <CTABand
        heading="Ask us the hard questions"
        body="Send us your security questionnaire, or just the three questions you actually care about. We will answer specifically, including where the answer is no."
        primaryLabel="Talk to us"
        primaryHref="/contact"
        secondaryLabel="Read the DPA"
        secondaryHref="/legal/dpa"
      />
    </>
  )
}
