'use client'

/*
 * global-error replaces the root layout entirely, so it ships its own <html>
 * and <body> and cannot use the app's theme provider or Tailwind layout
 * components. Styles are inline for that reason.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F1F5F9',
          color: '#0F172A',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
          padding: '24px',
        }}
      >
        <main style={{ maxWidth: 520 }}>
          <div style={{ fontSize: 17, fontWeight: 700 }}>
            Oneclick<span style={{ color: '#C2410C' }}>HR</span>
          </div>
          <h1 style={{ marginTop: 24, fontSize: 32, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            Something went badly wrong
          </h1>
          <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.65, color: '#64748B' }}>
            The application failed to render. Reloading usually fixes it. If it does not, email
            hello@oneclickhr.app and tell us what you were doing.
          </p>
          {error.digest ? (
            <p style={{ marginTop: 12, fontSize: 13, color: '#94A3B8' }}>
              Reference: {error.digest}
            </p>
          ) : null}
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 28,
              height: 44,
              padding: '0 20px',
              border: 0,
              borderRadius: 8,
              background: '#FF6A00',
              color: '#FFFFFF',
              fontSize: 15,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  )
}
