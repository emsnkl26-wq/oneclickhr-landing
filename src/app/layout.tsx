import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { JsonLd } from '@/components/ui/JsonLd'
import { site } from '@/lib/site'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — HR Management in One Click`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalEntity }],
  creator: site.legalEntity,
  publisher: site.legalEntity,
  alternates: { canonical: site.url },
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.name,
    title: `${site.name} — HR Management in One Click`,
    description: site.description,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0F172A' },
  ],
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  legalName: site.legalEntity,
  url: site.url,
  description: site.description,
  slogan: site.tagline,
  email: site.contactEmail,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: site.contactEmail,
      url: `${site.url}/contact`,
    },
    {
      '@type': 'ContactPoint',
      contactType: 'technical support',
      email: site.securityEmail,
      url: `${site.url}/security`,
    },
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: site.url,
  publisher: { '@type': 'Organization', name: site.legalEntity },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${site.url}/faq?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-dvh font-sans">
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-charcoal"
          >
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          {/*
           * Analytics slot, deliberately empty. No third-party script is loaded
           * today, which is why /legal/cookies can say this site sets no
           * analytics storage and why there is no consent banner. To enable
           * one, install the package, render it here, and update that page in
           * the same change:
           *
           *   import { Analytics } from '@vercel/analytics/react'
           *   <Analytics />
           *
           * or a self-hosted Plausible script via next/script with
           * strategy="afterInteractive".
           */}
        </ThemeProvider>
      </body>
    </html>
  )
}
