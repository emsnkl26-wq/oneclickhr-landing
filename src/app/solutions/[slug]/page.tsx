import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CTABand } from '@/components/layout/CTABand'
import { ProductVisual } from '@/components/product/ProductVisual'
import { IconBadge, PageHero } from '@/components/sections/PageHero'
import { RelatedLinks } from '@/components/sections/RelatedLinks'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Card, Container, Eyebrow, Section } from '@/components/ui/Section'
import { solutionBySlug, solutions } from '@/content/solutions'
import { pageMetadata } from '@/lib/seo'
import { site } from '@/lib/site'

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const solution = solutionBySlug(slug)
  if (!solution) return {}

  return pageMetadata({
    title: solution.title,
    description: solution.metaDescription,
    path: `/solutions/${solution.slug}`,
  })
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const solution = solutionBySlug(slug)
  if (!solution) notFound()

  const Icon = solution.icon

  return (
    <>
      <PageHero
        eyebrow="Solution"
        title={solution.heroHeadline}
        body={solution.heroBody}
        icon={
          <IconBadge>
            <Icon aria-hidden="true" className="size-5" />
          </IconBadge>
        }
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Solutions', path: `/solutions/${solution.slug}` },
          { name: solution.name, path: `/solutions/${solution.slug}` },
        ]}
        visual={<ProductVisual name={solution.visual} />}
        actions={
          <>
            <ButtonLink href={site.signupUrl}>
              Start free
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Talk to us
            </ButtonLink>
          </>
        }
      />

      <Section label="What gets in the way">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>What gets in the way</Eyebrow>
            <h2 className="mt-3 text-balance text-h2">
              The problems this shape of organization actually has
            </h2>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {solution.pains.map((pain, i) => (
              <Reveal key={pain.title} delay={Math.min(i * 0.05, 0.25)}>
                <Card as="li" className="h-full">
                  <h3 className="text-[0.9375rem] font-semibold">{pain.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{pain.body}</p>
                </Card>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section label={solution.fit.heading} muted>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <h2 className="text-balance text-h2">{solution.fit.heading}</h2>
              <div className="mt-6 space-y-5">
                {solution.fit.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-pretty-wrap leading-relaxed text-ink-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <Reveal>
              <ProductVisual name={solution.visual} />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section label="Modules that matter here">
        <Container>
          <RelatedLinks
            slugs={solution.modules}
            heading="The modules that matter here"
            body="All fifteen modules are available. These are the ones organizations of this shape spend their week in."
          />
        </Container>
      </Section>

      <Section label="Other solutions" muted>
        <Container>
          <RelatedLinks
            slugs={solution.related}
            heading="Other ways in"
            body="If this is not quite your shape, one of these may be closer."
          />
        </Container>
      </Section>

      <CTABand
        heading={`OneclickHR for ${solution.name.toLowerCase()}`}
        body="Tell us what you are running today and what has to work on day one, and we will come back with something concrete."
        primaryLabel="Talk to us"
        primaryHref="/contact"
        secondaryLabel="Start free"
        secondaryHref={site.signupUrl}
      />
    </>
  )
}
