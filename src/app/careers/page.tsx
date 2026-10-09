import { ArrowRight, Check } from 'lucide-react'
import { CTABand } from '@/components/layout/CTABand'
import { ProductVisual } from '@/components/product/ProductVisual'
import { PageHero } from '@/components/sections/PageHero'
import { RelatedLinks } from '@/components/sections/RelatedLinks'
import { Article } from '@/components/ui/Article'
import { ButtonLink } from '@/components/ui/Button'
import { Container, Eyebrow, Section } from '@/components/ui/Section'
import { careers } from '@/content/company'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Careers and job boards',
  description:
    'How the OneclickHR careers board works: a public, SEO-friendly job board on your own domain, scoped recruiter access, and an internal board for employees.',
  path: '/careers',
})

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={careers.headline}
        body={careers.lede}
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Careers', path: '/careers' },
        ]}
        visual={<ProductVisual name="jobs" />}
        actions={
          <>
            <ButtonLink href="/features/recruiting">
              The recruiting module
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Talk to us
            </ButtonLink>
          </>
        }
      />

      <Section label="Your careers page as a product feature">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div>
              <Eyebrow>Product capability</Eyebrow>
              <h2 className="mt-3 text-balance text-h2">{careers.productSide.heading}</h2>
              <div className="mt-6">
                <Article blocks={careers.productSide.blocks} />
              </div>
            </div>
            <div>
              <h3 className="text-[0.9375rem] font-semibold">What you get</h3>
              <ul className="mt-4 space-y-3">
                {careers.checklist.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-lg border border-line bg-surface-card p-4"
                  >
                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-600" />
                    <span className="text-sm leading-relaxed text-ink-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section label="Working at OneclickHR" muted>
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Working here</Eyebrow>
            <h2 className="mt-3 text-h2">{careers.ourSide.heading}</h2>
            <div className="mt-6 text-lg">
              <Article blocks={careers.ourSide.blocks} />
            </div>
            <ButtonLink href="/contact" variant="secondary" className="mt-7">
              Send us a note
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section label="Related modules">
        <Container>
          <RelatedLinks
            slugs={['recruiting', 'onboarding', 'employee-portal', 'settings']}
            body="The careers board is part of the recruiting module, and it shares records with onboarding, the employee portal and your workspace settings."
          />
        </Container>
      </Section>

      <CTABand
        heading="Put your careers page on your own domain"
        body="Post a role, point your domain at the board, and keep the search ranking your postings earn."
      />
    </>
  )
}
