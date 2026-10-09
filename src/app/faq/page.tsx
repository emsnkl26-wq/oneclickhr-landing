import { CTABand } from '@/components/layout/CTABand'
import { NarrowHero } from '@/components/sections/PageHero'
import { Accordion } from '@/components/ui/Accordion'
import { JsonLd } from '@/components/ui/JsonLd'
import { Container, Section } from '@/components/ui/Section'
import { faqGroups, faqs } from '@/content/faqs'
import { faqJsonLd, pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Frequently asked questions',
  description:
    'Answers about getting started, the modules, roles and access, security and isolation, and pricing — including the questions where the answer is no.',
  path: '/faq',
})

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />

      <NarrowHero
        eyebrow="FAQ"
        title="Questions, answered specifically"
        body="Grouped by what you are trying to find out. Where the honest answer is no — certifications we do not hold, integrations that do not exist, a module that is narrower than its name suggests — it says no."
        trail={[
          { name: 'Home', path: '/' },
          { name: 'FAQ', path: '/faq' },
        ]}
      >
        <nav aria-label="Question groups">
          <ul className="flex flex-wrap gap-2">
            {faqGroups.map((group) => (
              <li key={group}>
                <a
                  href={`#${slugify(group)}`}
                  className="inline-flex items-center rounded-full border border-line bg-surface-card px-3.5 py-1.5 text-sm font-medium text-ink-muted transition-colors hover:border-brand-200 hover:text-brand-ink"
                >
                  {group}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </NarrowHero>

      {faqGroups.map((group, i) => {
        const items = faqs.filter((faq) => faq.group === group)
        return (
          <Section key={group} id={slugify(group)} label={group} muted={i % 2 === 1}>
            <Container>
              <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-14">
                <h2 className="text-h2">{group}</h2>
                <Accordion items={items} />
              </div>
            </Container>
          </Section>
        )
      })}

      <CTABand
        heading="Still have a question?"
        body="Ask us directly. We will answer specifically, including where the answer is that we do not do that."
        primaryLabel="Talk to us"
        primaryHref="/contact"
        secondaryLabel="Read the product tour"
        secondaryHref="/product"
      />
    </>
  )
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
