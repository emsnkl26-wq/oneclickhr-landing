import { Mail, ShieldCheck, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { ContactForm } from '@/components/sections/ContactForm'
import { Card, Container, Eyebrow } from '@/components/ui/Section'
import { pageMetadata } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Tell us what you are running today and what has to work on day one. We reply from a small team, so the person answering has read the code.',
  path: '/contact',
})

const directs = [
  {
    icon: Mail,
    label: 'General and sales',
    email: site.contactEmail,
    body: 'Pricing, plans, whether OneclickHR fits what you are running today.',
  },
  {
    icon: ShieldCheck,
    label: 'Security',
    email: site.securityEmail,
    body: 'Vulnerability reports and security questionnaires. We answer specifically, including where the answer is no.',
  },
  {
    icon: Sparkles,
    label: 'Privacy and data',
    email: site.privacyEmail,
    body: 'Data processing questions, the DPA, and requests about information we hold.',
  },
]

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden="true" className="dot-grid absolute inset-0 h-72 opacity-50" />
      <Container className="relative py-14 sm:py-16 lg:py-20">
        <div className="mb-6">
          <Breadcrumbs
            trail={[
              { name: 'Home', path: '/' },
              { name: 'Contact', path: '/contact' },
            ]}
          />
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-3 text-balance text-h1">Tell us what you need</h1>
            <p className="text-pretty-wrap mt-5 text-lg leading-relaxed text-ink-muted">
              What you are running today, how many people, and which modules have to work on day
              one. That is enough for us to come back with something concrete rather than a
              brochure.
            </p>

            <ul className="mt-10 space-y-3">
              {directs.map((direct) => (
                <Card as="li" key={direct.email} className="p-5">
                  <direct.icon aria-hidden="true" className="size-4 text-brand-600" />
                  <h2 className="mt-3 text-[0.9375rem] font-semibold">{direct.label}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{direct.body}</p>
                  <a
                    href={`mailto:${direct.email}`}
                    className="mt-2.5 inline-block rounded text-sm font-medium text-brand-ink hover:underline"
                  >
                    {direct.email}
                  </a>
                </Card>
              ))}
            </ul>

            <div className="mt-8 rounded-xl border border-line bg-surface-muted p-5">
              <h2 className="text-[0.9375rem] font-semibold">Already a customer?</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                Sign in at{' '}
                <a href={site.appUrl} className="font-medium text-brand-ink hover:underline">
                  app.oneclickhr.app
                </a>
                . Your employees raise HR questions through the internal help desk in their own
                portal, which is part of your workspace rather than a channel to us.
              </p>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-ink-muted">
              How we handle what you send is described in the{' '}
              <Link href="/legal/privacy" className="font-medium text-brand-ink hover:underline">
                privacy policy
              </Link>
              .
            </p>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  )
}
