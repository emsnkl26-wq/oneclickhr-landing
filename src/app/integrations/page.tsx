import { ArrowRight, Info, X } from 'lucide-react'
import Link from 'next/link'
import { CTABand } from '@/components/layout/CTABand'
import { PageHero } from '@/components/sections/PageHero'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Card, Container, Eyebrow, Pill, Section } from '@/components/ui/Section'
import { integrations, notAvailable } from '@/content/integrations'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Integrations',
  description:
    'Google Calendar sync, Google sign-in, transactional email, object storage, web push, custom careers domains and CSV import — plus what does not exist yet.',
  path: '/integrations',
})

export default function IntegrationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Integrations"
        title="A short list, and an honest one"
        body="OneclickHR connects to the things most organizations actually need, and we list what it does not connect to just as plainly. A long integrations page full of logos nobody has built against is not a feature."
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Integrations', path: '/integrations' },
        ]}
        actions={
          <ButtonLink href="/contact">
            Ask about an integration
            <ArrowRight aria-hidden="true" className="size-4" />
          </ButtonLink>
        }
      />

      <Section label="Available integrations">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>What exists</Eyebrow>
            <h2 className="mt-3 text-h2">What you can connect today</h2>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {integrations.map((integration, i) => (
              <Reveal key={integration.name} delay={Math.min(i * 0.04, 0.2)}>
                <Card className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <integration.icon aria-hidden="true" className="size-5 text-brand-600" />
                    <Pill>{integration.category}</Pill>
                  </div>
                  <h3 className="mt-4 text-h3">{integration.name}</h3>
                  <p className="mt-2 text-[0.9375rem] font-medium text-ink">
                    {integration.summary}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                    {integration.detail}
                  </p>

                  {integration.limits ? (
                    <div className="mt-4 flex gap-2.5 rounded-lg border border-line bg-surface-muted p-3">
                      <Info
                        aria-hidden="true"
                        className="mt-0.5 size-3.5 shrink-0 text-ink-subtle"
                      />
                      <p className="text-xs leading-relaxed text-ink-muted">{integration.limits}</p>
                    </div>
                  ) : null}

                  {integration.featureSlug ? (
                    <Link
                      href={`/features/${integration.featureSlug}`}
                      className="mt-5 inline-flex items-center gap-1.5 rounded-lg text-sm font-medium text-brand-ink hover:underline"
                    >
                      Related module
                      <ArrowRight aria-hidden="true" className="size-3.5" />
                    </Link>
                  ) : null}
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section label="What does not exist yet" muted>
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>What does not exist</Eyebrow>
            <h2 className="mt-3 text-balance text-h2">
              Integrations we do not have, said out loud
            </h2>
            <p className="text-pretty-wrap mt-4 text-lg leading-relaxed text-ink-muted">
              If one of these is a hard requirement, we would rather you knew now than six weeks
              into an evaluation.
            </p>
          </div>
          <ul className="mt-10 grid gap-3 lg:grid-cols-2">
            {notAvailable.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-line bg-surface-card p-5"
              >
                <X aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ink-subtle" />
                <span className="text-sm leading-relaxed text-ink-muted">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-7 max-w-3xl text-sm leading-relaxed text-ink-muted">
            If you need one of these, tell us through the{' '}
            <Link href="/contact" className="font-medium text-brand-ink hover:underline">
              contact form
            </Link>
            . We will give you an honest answer about whether it is something we plan to build, and
            we will not pretend it is nearly ready when it is not.
          </p>
        </Container>
      </Section>

      <CTABand
        heading="Tell us what you need to connect"
        body="If an integration is on the list above as missing and it blocks you, say so. We would rather hear it than guess."
        primaryLabel="Talk to us"
        primaryHref="/contact"
        secondaryLabel="Read the product tour"
        secondaryHref="/product"
      />
    </>
  )
}
