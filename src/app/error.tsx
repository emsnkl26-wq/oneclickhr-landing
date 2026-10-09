'use client'

// Error boundaries must be client components: they receive the reset callback.
import { useEffect } from 'react'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Container, Eyebrow } from '@/components/ui/Section'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Container className="py-20 sm:py-28">
      <div className="max-w-2xl">
        <Eyebrow>Something went wrong</Eyebrow>
        <h1 className="mt-3 text-balance text-h1">This page did not load</h1>
        <p className="text-pretty-wrap mt-5 text-lg leading-relaxed text-ink-muted">
          An unexpected error stopped this page from rendering. Trying again often resolves it. If
          it keeps happening, tell us what you were doing and we will look at it.
        </p>
        {error.digest ? (
          <p className="mt-4 text-sm text-ink-subtle">
            Reference: <code className="font-mono">{error.digest}</code>
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={reset}>Try again</Button>
          <ButtonLink href="/" variant="secondary">
            Back to the home page
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Report it
          </ButtonLink>
        </div>
      </div>
    </Container>
  )
}
