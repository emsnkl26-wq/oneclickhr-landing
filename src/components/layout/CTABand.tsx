import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Section'
import { site } from '@/lib/site'

export function CTABand({
  heading = 'Start running HR in one place',
  body = 'Sign your organization up, set your timezone and brand color, and invite your team. Nothing to install, and no implementation project.',
  primaryLabel = 'Start free',
  primaryHref = site.signupUrl,
  secondaryLabel = 'Talk to us',
  secondaryHref = '/contact',
}: {
  heading?: string
  body?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}) {
  return (
    <section aria-label="Get started" className="border-t border-line py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-line bg-charcoal px-6 py-14 text-center sm:px-12">
          {/* The one soft glow on the page; decorative only. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-56 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/20 blur-3xl"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-h2 text-white">{heading}</h2>
            <p className="text-pretty-wrap mt-4 text-lg leading-relaxed text-[#CBD5E1]">{body}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href={primaryHref} size="lg">
                {primaryLabel}
              </ButtonLink>
              <ButtonLink
                href={secondaryHref}
                size="lg"
                className="border border-white/20 bg-transparent text-white hover:bg-white/10"
              >
                {secondaryLabel}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
