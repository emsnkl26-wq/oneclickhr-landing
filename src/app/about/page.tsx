import { CTABand } from '@/components/layout/CTABand'
import { NarrowHero } from '@/components/sections/PageHero'
import { Article } from '@/components/ui/Article'
import { Reveal } from '@/components/ui/Reveal'
import { Card, Container, Eyebrow, Section } from '@/components/ui/Section'
import { about } from '@/content/company'
import { pageMetadata } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'About',
  description:
    'OneclickHR is built by Nextkin Life LLC. Our mission, the philosophy behind the product, and what we believe about HR software that has to be correct.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <>
      <NarrowHero
        eyebrow="About"
        title={about.headline}
        body={about.lede}
        trail={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]}
      />

      <Section label="Our mission">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Mission</Eyebrow>
            <h2 className="mt-3 text-balance text-h2">{about.mission.heading}</h2>
            <div className="mt-6 text-lg">
              <Article blocks={about.mission.blocks} />
            </div>
          </div>
        </Container>
      </Section>

      <Section label="What we believe about building it" muted>
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Philosophy</Eyebrow>
            <h2 className="mt-3 text-h2">Six principles, and what each one costs</h2>
            <p className="text-pretty-wrap mt-4 text-lg leading-relaxed text-ink-muted">
              These are not values on a wall. Each one has shaped a decision in the product that you
              can go and check.
            </p>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {about.principles.map((principle, i) => (
              <Reveal key={principle.title} delay={Math.min(i * 0.05, 0.25)}>
                <Card as="li" className="h-full">
                  <h3 className="text-h3">{principle.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                    {principle.body}
                  </p>
                </Card>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section label="A few things we think are true">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Opinions</Eyebrow>
            <h2 className="mt-3 text-h2">{about.beliefs.heading}</h2>
            <div className="mt-6">
              <Article blocks={about.beliefs.blocks} />
            </div>
          </div>
        </Container>
      </Section>

      <Section label="The company" muted>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <Eyebrow>The company</Eyebrow>
              <h2 className="mt-3 text-h2">{about.company.heading}</h2>
              <div className="mt-6">
                <Article blocks={about.company.blocks} />
              </div>
            </div>
            <Card className="h-fit p-6">
              <h3 className="text-[0.9375rem] font-semibold">At a glance</h3>
              <dl className="mt-4 space-y-3.5 text-sm">
                {[
                  ['Product', site.name],
                  ['Built by', site.legalEntity],
                  ['Marketing site', 'oneclickhr.app'],
                  ['Application', 'app.oneclickhr.app'],
                  ['Tagline', site.tagline],
                  ['Short form', site.shortTagline],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0"
                  >
                    <dt className="text-ink-muted">{label}</dt>
                    <dd className="text-right font-medium text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </div>
        </Container>
      </Section>

      <CTABand
        heading="See whether it fits"
        body="Start a workspace and configure it yourself, or tell us what you are running today and we will give you an honest answer."
      />
    </>
  )
}
