import type { Metadata } from 'next'
import { site } from './site'

type PageMetaInput = {
  title: string
  description: string
  /** Route path beginning with a slash; '/' for home. */
  path: string
  /** Set false for routes that should stay out of the index. */
  index?: boolean
}

/**
 * Shared metadata builder. Every page funnels through here so canonical URLs,
 * OpenGraph and Twitter cards can never drift apart.
 */
export function pageMetadata({ title, description, path, index = true }: PageMetaInput): Metadata {
  const url = path === '/' ? site.url : `${site.url}${path}`
  const ogImage = `${site.url}/api/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: index ? undefined : { index: false, follow: true },
    openGraph: {
      type: 'website',
      url,
      title: `${title} — ${site.name}`,
      description,
      siteName: site.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${title} — ${site.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — ${site.name}`,
      description,
      images: [ogImage],
    },
  }
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path === '/' ? '' : item.path}`,
    })),
  }
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export const softwareApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: site.name,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: site.url,
  description: site.description,
  publisher: { '@type': 'Organization', name: site.legalEntity },
  featureList: [
    'Attendance and time tracking',
    'Leave management',
    'Payroll and payslips',
    'Timesheets',
    'Invoicing and finance',
    'Work authorization expiry tracking',
    'Tasks and project boards',
    'Recruiting and a public job board',
    'Documents and HR letters',
    'Meetings and shared calendar',
  ],
}
