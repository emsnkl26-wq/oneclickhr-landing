import { CTABand } from '@/components/layout/CTABand'
import { NarrowHero } from '@/components/sections/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { Container, Section } from '@/components/ui/Section'
import { changelog } from '@/content/changelog'
import type { ChangelogEntry } from '@/content/types'
import { pageMetadata } from '@/lib/seo'
import { cn } from '@/lib/cn'

export const metadata = pageMetadata({
  title: 'Changelog',
  description:
    'What has shipped in OneclickHR: recruiter access per job, Google sign-in, dual payslip formats, storage quotas, timezone fixes and job monitoring.',
  path: '/changelog',
})

const typeTone: Record<ChangelogEntry['items'][number]['type'], string> = {
  Added: 'bg-success/10 text-success',
  Improved: 'bg-info/10 text-info',
  Fixed: 'bg-brand-50 text-brand-ink',
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export default function ChangelogPage() {
  return (
    <>
      <NarrowHero
        eyebrow="Changelog"
        title="What has shipped"
        body="Release notes for the OneclickHR application. Newest first, written so you can tell whether a change affects you — including the fixes, because a changelog that only lists additions is a marketing page."
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Changelog', path: '/changelog' },
        ]}
      />

      <Section label="Release history">
        <Container>
          <ol className="space-y-4">
            {changelog.map((entry, i) => (
              <Reveal key={entry.version} delay={Math.min(i * 0.04, 0.2)}>
                <li className="grid gap-6 rounded-xl border border-line bg-surface-card p-6 sm:p-7 lg:grid-cols-[12rem_1fr] lg:gap-10">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-ink">
                      {entry.version}
                    </p>
                    <time dateTime={entry.date} className="mt-1 block text-sm text-ink-muted">
                      {formatDate(entry.date)}
                    </time>
                  </div>
                  <div>
                    <h2 className="text-h3">{entry.title}</h2>
                    <ul className="mt-4 space-y-3.5">
                      {entry.items.map((item) => (
                        <li key={item.text} className="flex flex-col gap-1.5 sm:flex-row sm:gap-3">
                          <span
                            className={cn(
                              'inline-flex h-5 w-fit shrink-0 items-center rounded-full px-2 text-[0.625rem] font-semibold sm:mt-0.5',
                              typeTone[item.type],
                            )}
                          >
                            {item.type}
                          </span>
                          <span className="text-[0.9375rem] leading-relaxed text-ink-muted">
                            {item.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <CTABand
        heading="Everything above is live today"
        body="Sign your organization up and you get the current version of the product, not a roadmap."
      />
    </>
  )
}
