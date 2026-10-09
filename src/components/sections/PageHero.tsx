import type { ReactNode } from 'react'
import { Breadcrumbs, type Crumb } from '@/components/layout/Breadcrumbs'
import { Container, Eyebrow } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

export function PageHero({
  eyebrow,
  title,
  body,
  trail,
  actions,
  icon,
  visual,
}: {
  eyebrow?: string
  title: string
  body: string
  trail?: Crumb[]
  actions?: ReactNode
  icon?: ReactNode
  visual?: ReactNode
}) {
  return (
    <div className="relative overflow-hidden border-b border-line">
      <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-50" />
      <Container className="relative py-14 sm:py-16 lg:py-20">
        {trail ? <div className="mb-6">{<Breadcrumbs trail={trail} />}</div> : null}
        <div
          className={
            visual ? 'grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14' : 'max-w-3xl'
          }
        >
          <div>
            {icon ? <div className="mb-5">{icon}</div> : null}
            {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
            <h1 className="text-balance text-h1">{title}</h1>
            <p className="text-pretty-wrap mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
              {body}
            </p>
            {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
          </div>
          {visual ? <Reveal delay={0.08}>{visual}</Reveal> : null}
        </div>
      </Container>
    </div>
  )
}

/** Simpler hero for pages with no accompanying visual (legal, FAQ, changelog). */
export function NarrowHero({
  eyebrow,
  title,
  body,
  trail,
  children,
}: {
  eyebrow?: string
  title: string
  body: string
  trail?: Crumb[]
  children?: ReactNode
}) {
  return (
    <div className="relative overflow-hidden border-b border-line">
      <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-50" />
      <Container className="relative py-14 sm:py-16">
        {trail ? <div className="mb-6">{<Breadcrumbs trail={trail} />}</div> : null}
        <div className="max-w-3xl">
          {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
          <h1 className="text-balance text-h1">{title}</h1>
          <p className="text-pretty-wrap mt-5 text-lg leading-relaxed text-ink-muted">{body}</p>
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </div>
  )
}

export function IconBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex size-11 items-center justify-center rounded-xl border border-line bg-surface-card text-brand-600">
      {children}
    </span>
  )
}
