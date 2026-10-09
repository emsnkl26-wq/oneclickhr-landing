import { ArrowRight, Check } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CTABand } from '@/components/layout/CTABand'
import { ProductVisual } from '@/components/product/ProductVisual'
import { IconBadge, PageHero } from '@/components/sections/PageHero'
import { RelatedLinks } from '@/components/sections/RelatedLinks'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Card, Container, Eyebrow, Section } from '@/components/ui/Section'
import { featureBySlug, features } from '@/content/features'
import { pageMetadata } from '@/lib/seo'
import { site } from '@/lib/site'

export function generateStaticParams() {
  return features.map((feature) => ({ slug: feature.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const feature = featureBySlug(slug)
  if (!feature) return {}

  return pageMetadata({
    title: feature.title,
    description: feature.metaDescription,
    path: `/features/${feature.slug}`,
  })
}

export default async function FeaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const feature = featureBySlug(slug)
  if (!feature) notFound()

  const Icon = feature.icon

  return (
    <>
      <PageHero
        eyebrow="Module"
        title={feature.heroHeadline}
        body={feature.heroBody}
        icon={
          <IconBadge>
            <Icon aria-hidden="true" className="size-5" />
          </IconBadge>
        }
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Product', path: '/product' },
          { name: feature.name, path: `/features/${feature.slug}` },
        ]}
        visual={<ProductVisual name={feature.visual} />}
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

      {/* What it solves */}
      <Section label="What this solves">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>What this solves</Eyebrow>
            <h2 className="mt-3 text-balance text-h2">{feature.problem.heading}</h2>
            <div className="mt-6 space-y-5">
              {feature.problem.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-pretty-wrap text-lg leading-relaxed text-ink-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Capabilities */}
      <Section label="What is included" muted>
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>What is included</Eyebrow>
            <h2 className="mt-3 text-h2">In {feature.name.toLowerCase()}</h2>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {feature.capabilities.map((capability, i) => (
              <Reveal key={capability.title} delay={Math.min(i * 0.04, 0.24)}>
                <Card as="li" className="h-full">
                  <Check aria-hidden="true" className="size-4 text-brand-600" />
                  <h3 className="mt-3 text-[0.9375rem] font-semibold">{capability.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{capability.body}</p>
                </Card>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Detail */}
      <Section label={feature.detail.heading}>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <h2 className="text-balance text-h2">{feature.detail.heading}</h2>
              <div className="mt-6 space-y-5">
                {feature.detail.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-pretty-wrap leading-relaxed text-ink-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <Reveal>
              <ProductVisual name={feature.visual} />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Related */}
      <Section label="Related modules" muted>
        <Container>
          <RelatedLinks
            slugs={feature.related}
            body={`${feature.name} shares its records with the rest of the workspace, so these modules read the same data rather than a copy of it.`}
          />
        </Container>
      </Section>

      <CTABand
        heading={`Put ${feature.name.toLowerCase()} in one place`}
        body="Sign your organization up, configure your timezone and brand color, and invite your team. You can be running the same day."
      />
    </>
  )
}
