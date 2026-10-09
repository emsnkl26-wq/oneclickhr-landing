/**
 * Structured data is injected as a plain script tag rather than via next/script
 * so it is present in the static HTML for crawlers that do not execute JS.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from our own typed content modules, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
