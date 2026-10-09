import type { ArticleBlock } from '@/content/types'

/**
 * Renders the typed article blocks used by blog posts, legal documents and the
 * long-form company pages. Keeping prose as data rather than MDX means there is
 * one renderer to keep accessible and consistent.
 */
export function Article({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case 'h2':
            return (
              <h2 key={i} className="pt-6 text-h3 sm:text-2xl">
                {block.text}
              </h2>
            )
          case 'h3':
            return (
              <h3 key={i} className="pt-3 text-lg font-semibold">
                {block.text}
              </h3>
            )
          case 'ul':
            return (
              <ul key={i} className="space-y-2.5 pl-1">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3 text-ink-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-600"
                    />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={i} className="space-y-2.5 pl-1">
                {block.items.map((item, idx) => (
                  <li key={item} className="flex gap-3 text-ink-muted">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[0.6875rem] font-semibold text-brand-ink"
                    >
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ol>
            )
          case 'quote':
            return (
              <blockquote
                key={i}
                className="border-l-2 border-brand-600 py-1 pl-5 text-lg font-medium leading-relaxed text-ink"
              >
                {block.text}
              </blockquote>
            )
          case 'code':
            return (
              <pre
                key={i}
                className="overflow-x-auto rounded-lg border border-line bg-surface-muted p-4 text-sm"
              >
                <code>{block.text}</code>
              </pre>
            )
          default:
            return (
              <p key={i} className="text-pretty-wrap leading-relaxed text-ink-muted">
                {block.text}
              </p>
            )
        }
      })}
    </div>
  )
}
