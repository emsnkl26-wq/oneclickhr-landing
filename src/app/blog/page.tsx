import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { CTABand } from '@/components/layout/CTABand'
import { NarrowHero } from '@/components/sections/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { Card, Container, Pill, Section } from '@/components/ui/Section'
import { sortedPosts } from '@/content/blog'
import { pageMetadata } from '@/lib/seo'
import { formatPostDate } from './format'

export const metadata = pageMetadata({
  title: 'Blog',
  description:
    'Writing about the parts of HR software that have to be correct: timezone-safe attendance dates, multi-tenant isolation, payroll review steps and job boards.',
  path: '/blog',
})

export default function BlogIndexPage() {
  return (
    <>
      <NarrowHero
        eyebrow="Blog"
        title="On the parts that have to be correct"
        body="Four pieces on the decisions underneath HR software: why a calendar day depends on a timezone, what multi-tenant isolation really means for your data, why payroll needs a review step, and why a careers page belongs on your own domain."
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ]}
      />

      <Section label="All posts">
        <Container>
          <ul className="grid gap-4 lg:grid-cols-2">
            {sortedPosts.map((post, i) => (
              <Reveal key={post.slug} delay={Math.min(i * 0.05, 0.2)}>
                <Card as="li" className="h-full p-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col p-6 sm:p-7"
                  >
                    <div className="flex items-center gap-3">
                      <Pill className="border-brand-200 bg-brand-50 text-brand-ink">
                        {post.topic}
                      </Pill>
                      <span className="text-xs text-ink-subtle">
                        {post.readingMinutes} min read
                      </span>
                    </div>
                    <h2 className="mt-4 text-balance text-h3 group-hover:text-brand-ink">
                      {post.title}
                    </h2>
                    <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-muted">
                      {post.description}
                    </p>
                    <div className="mt-6 flex items-center justify-between">
                      <time dateTime={post.date} className="text-xs text-ink-subtle">
                        {formatPostDate(post.date)}
                      </time>
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 text-ink-subtle transition-colors group-hover:text-brand-ink"
                      />
                    </div>
                  </Link>
                </Card>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <CTABand
        heading="The product these decisions came from"
        body="Attendance that files the day in your timezone, payroll you read before finalizing, and isolation enforced by the database."
        primaryLabel="Start free"
        secondaryLabel="Read the product tour"
        secondaryHref="/product"
      />
    </>
  )
}
