import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import { CTABand } from '@/components/layout/CTABand'
import { ModuleGrid } from '@/components/sections/ModuleGrid'
import { ProductVisual } from '@/components/product/ProductVisual'
import { Accordion } from '@/components/ui/Accordion'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { Reveal } from '@/components/ui/Reveal'
import { Card, Container, Eyebrow, Section, SectionHeading } from '@/components/ui/Section'
import { features } from '@/content/features'
import { homeFaqs } from '@/content/faqs'
import {
  audiences,
  builtFor,
  deepDives,
  hero,
  howItWorks,
  roleStrip,
  securityTeaser,
} from '@/content/home'
import { faqJsonLd, pageMetadata, softwareApplicationJsonLd } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'HR Management in One Click',
  description:
    'Attendance, leave, payroll, timesheets, recruiting and work authorization in one isolated workspace. Built for organizations of 10 to 500 people.',
  path: '/',
})

export default function HomePage() {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd} />
      <JsonLd data={faqJsonLd(homeFaqs)} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-60" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-12rem] h-[28rem] w-[64rem] -translate-x-1/2 rounded-full bg-brand-600/[0.07] blur-3xl"
        />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <div>
              <Eyebrow>{hero.eyebrow}</Eyebrow>
              <h1 className="mt-4 text-balance text-display">{hero.headline}</h1>
              <p className="text-pretty-wrap mt-6 max-w-xl text-lg leading-relaxed text-ink-muted sm:text-xl">
                {hero.subhead}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href={site.signupUrl} size="lg">
                  Start free
                  <ArrowRight aria-hidden="true" className="size-4" />
                </ButtonLink>
                <ButtonLink href={site.loginUrl} variant="secondary" size="lg">
                  Log in
                </ButtonLink>
              </div>
              <p className="mt-5 text-sm text-ink-muted">
                Each organization gets a fully isolated workspace.{' '}
                <Link href="/security" className="font-medium text-brand-ink hover:underline">
                  See how isolation works
                </Link>
                .
              </p>
            </div>
            <Reveal delay={0.1}>
              <ProductVisual name="dashboard" />
            </Reveal>
          </div>
        </Container>
      </div>

      {/* Built for */}
      {/* lg override is explicit: Section's default lg:py-24 would otherwise
          survive tailwind-merge and leave this thin strip over-padded. */}
      <Section label="Who OneclickHR is built for" muted className="py-10 sm:py-12 lg:py-14">
        <Container>
          <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {builtFor.map((item) => (
              <div key={item.label}>
                <dt className="text-[0.9375rem] font-semibold text-ink">{item.label}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink-muted">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Module overview */}
      <Section label="Modules" id="modules">
        <Container>
          <SectionHeading
            eyebrow="Everything in one workspace"
            title="Fifteen modules, one source of truth"
            body="Attendance, leave, payroll, timesheets, invoicing, work authorization, tasks, recruiting, documents, calendar, help desk, notifications, onboarding, settings and the employee portal. They share the same records, so there is nothing to reconcile between them."
          />
          <div className="mt-12">
            <ModuleGrid />
          </div>
        </Container>
      </Section>

      {/* Deep dives */}
      {deepDives.map((dive, i) => {
        const feature = features.find((f) => f.slug === dive.slug)
        if (!feature) return null
        const reversed = i % 2 === 1

        return (
          <Section key={dive.slug} label={dive.heading} muted={reversed}>
            <Container>
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={reversed ? 'lg:order-2' : undefined}>
                  <Eyebrow>{dive.eyebrow}</Eyebrow>
                  <h2 className="mt-3 text-balance text-h2">{dive.heading}</h2>
                  <p className="text-pretty-wrap mt-4 text-lg leading-relaxed text-ink-muted">
                    {dive.body}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {dive.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 size-4 shrink-0 text-brand-600"
                        />
                        <span className="text-[0.9375rem] leading-relaxed text-ink-muted">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/features/${dive.slug}`}
                    className="mt-7 inline-flex items-center gap-1.5 rounded-lg text-[0.9375rem] font-medium text-brand-ink hover:underline"
                  >
                    More on {feature.name.toLowerCase()}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
                <Reveal className={reversed ? 'lg:order-1' : undefined}>
                  <ProductVisual name={feature.visual} />
                </Reveal>
              </div>
            </Container>
          </Section>
        )
      })}

      {/* How it works */}
      <Section label="How it works">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="Three steps to a month that closes cleanly"
            body="There is no implementation project. A small team can configure OneclickHR in an afternoon and have the first month close without a reconstruction exercise."
          />
          <ol className="mt-12 grid gap-4 lg:grid-cols-3">
            {howItWorks.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.06}>
                <Card as="li" className="h-full">
                  <span className="text-sm font-semibold tabular-nums text-brand-ink">
                    {step.step}
                  </span>
                  <h3 className="mt-3 text-h3">{step.heading}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                    {step.body}
                  </p>
                </Card>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Roles */}
      <Section label="Roles" muted>
        <Container>
          <SectionHeading
            eyebrow="Four kinds of people"
            title="Everyone sees what their role grants, and nothing else"
            body="Access is enforced in the database with Row Level Security, not by hiding interface elements. That is what makes it safe to give an external recruiter an account."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {roleStrip.map((role, i) => (
              <Reveal key={role.name} delay={i * 0.05}>
                <Card as="li" className="h-full">
                  <role.icon aria-hidden="true" className="size-5 text-brand-600" />
                  <h3 className="mt-3.5 text-[0.9375rem] font-semibold">{role.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{role.body}</p>
                </Card>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Security teaser */}
      <Section label="Security">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>Security</Eyebrow>
              <h2 className="mt-3 text-balance text-h2">{securityTeaser.heading}</h2>
              <p className="text-pretty-wrap mt-4 text-lg leading-relaxed text-ink-muted">
                {securityTeaser.body}
              </p>
              <ButtonLink href="/security" variant="secondary" className="mt-7">
                Read the security story
                <ArrowRight aria-hidden="true" className="size-4" />
              </ButtonLink>
            </div>
            <ul className="space-y-3">
              {securityTeaser.points.map((point, i) => (
                <Reveal key={point} delay={i * 0.05}>
                  <Card as="li" className="flex gap-3.5 p-5">
                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-600" />
                    <span className="text-[0.9375rem] leading-relaxed text-ink-muted">{point}</span>
                  </Card>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Audiences */}
      <Section label="Built for your role" muted>
        <Container>
          <SectionHeading
            eyebrow="By who you are"
            title="The same workspace, read three different ways"
          />
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {audiences.map((audience, i) => (
              <Reveal key={audience.title} delay={i * 0.06}>
                <Card className="flex h-full flex-col">
                  <audience.icon aria-hidden="true" className="size-5 text-brand-600" />
                  <h3 className="mt-3.5 text-h3">{audience.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                    {audience.body}
                  </p>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {audience.points.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 size-3.5 shrink-0 text-brand-600"
                        />
                        <span className="text-sm leading-relaxed text-ink-muted">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={audience.href}
                    className="mt-6 inline-flex items-center gap-1.5 rounded-lg text-sm font-medium text-brand-ink hover:underline"
                  >
                    {audience.linkLabel}
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                  </Link>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section label="Frequently asked questions">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <Eyebrow>Questions</Eyebrow>
              <h2 className="mt-3 text-h2">Answers, without the hedging</h2>
              <p className="mt-4 leading-relaxed text-ink-muted">
                Including the ones where the honest answer is &ldquo;no&rdquo;.
              </p>
              <Link
                href="/faq"
                className="mt-6 inline-flex items-center gap-1.5 rounded-lg text-[0.9375rem] font-medium text-brand-ink hover:underline"
              >
                Read all questions
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <Accordion items={homeFaqs} />
          </div>
        </Container>
      </Section>

      <CTABand />
    </>
  )
}
