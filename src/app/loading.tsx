import { Container } from '@/components/ui/Section'

/**
 * Skeleton sized to roughly match a page hero, so navigation does not collapse
 * the layout height before content arrives.
 */
export default function Loading() {
  return (
    <Container className="py-14 sm:py-16">
      <div aria-hidden="true" className="max-w-3xl animate-pulse space-y-4">
        <div className="h-3 w-24 rounded bg-surface-muted" />
        <div className="h-10 w-full rounded bg-surface-muted" />
        <div className="h-10 w-4/5 rounded bg-surface-muted" />
        <div className="h-4 w-full rounded bg-surface-muted" />
        <div className="h-4 w-11/12 rounded bg-surface-muted" />
        <div className="h-4 w-3/5 rounded bg-surface-muted" />
      </div>
      <span className="sr-only" role="status">
        Loading
      </span>
    </Container>
  )
}
