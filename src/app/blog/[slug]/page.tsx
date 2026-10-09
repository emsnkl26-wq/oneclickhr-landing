import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CTABand } from '@/components/layout/CTABand'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Article } from '@/components/ui/Article'
import { JsonLd } from '@/components/ui/JsonLd'
import { Card, Container, Pill, Section } from '@/components/ui/Section'
import { postBySlug, posts, sortedPosts } from '@/content/blog'
import { pageMetadata } from '@/lib/seo'
import { site } from '@/lib/site'
import { formatPostDate } from '../format'

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = postBySlug(slug)
  if (!post) return {}

  const base = pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  })

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime: post.date,
      authors: [site.legalEntity],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = postBySlug(slug)
  if (!post) notFound()

  const others = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${site.url}/blog/${post.slug}`,
    },
    author: { '@type': 'Organization', name: site.legalEntity },
    publisher: {
      '@type': 'Organization',
      name: site.legalEntity,
      url: site.url,
    },
    image: `${site.url}/api/og?title=${encodeURIComponent(post.title)}`,
    articleSection: post.topic,
  }

  return (
    <>
      <JsonLd data={articleJsonLd} />

      <div className="relative overflow-hidden border-b border-line">
        <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-50" />
        <Container className="relative py-14 sm:py-16">
          <div className="mb-6">
            <Breadcrumbs
              trail={[
                { name: 'Home', path: '/' },
                { name: 'Blog', path: '/blog' },
                { name: post.title, path: `/blog/${post.slug}` },
              ]}
            />
          </div>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <Pill className="border-brand-200 bg-brand-50 text-brand-ink">{post.topic}</Pill>
              <span className="text-xs text-ink-subtle">{post.readingMinutes} min read</span>
            </div>
            <h1 className="mt-5 text-balance text-h1">{post.title}</h1>
            <p className="text-pretty-wrap mt-5 text-lg leading-relaxed text-ink-muted">
              {post.description}
            </p>
            <p className="mt-6 text-sm text-ink-muted">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span aria-hidden="true"> · </span>
              {site.legalEntity}
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-14 sm:py-16">
        <article className="mx-auto max-w-3xl text-[1.0625rem]">
          <Article blocks={post.body} />
        </article>
      </Container>

      <Section label="More posts" muted>
        <Container>
          <h2 className="text-h2">More reading</h2>
          <ul className="mt-8 grid gap-4 lg:grid-cols-3">
            {others.map((other) => (
              <Card as="li" key={other.slug} className="h-full p-0">
                <Link href={`/blog/${other.slug}`} className="group flex h-full flex-col p-6">
                  <Pill className="w-fit border-brand-200 bg-brand-50 text-brand-ink">
                    {other.topic}
                  </Pill>
                  <h3 className="mt-3.5 text-[0.9375rem] font-semibold leading-snug group-hover:text-brand-ink">
                    {other.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                    {other.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-ink">
                    Read
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                  </span>
                </Link>
              </Card>
            ))}
          </ul>
        </Container>
      </Section>

      <CTABand />
    </>
  )
}
