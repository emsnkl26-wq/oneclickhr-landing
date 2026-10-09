'use client'

// Client boundary: the accordion tracks which panel is open. Using a native
// <details> would avoid this, but gives much less control over the animation
// and the ARIA relationship between button and panel.
import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'
import { cn } from '@/lib/cn'

export type AccordionItem = { question: string; answer: string }

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()

  return (
    <div className={cn('divide-y divide-line rounded-xl border border-line', className)}>
      {items.map((item, i) => {
        const isOpen = open === i
        const buttonId = `${baseId}-trigger-${i}`
        const panelId = `${baseId}-panel-${i}`

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left text-base font-medium text-ink transition-colors hover:bg-surface-muted sm:px-6"
              >
                <span>{item.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    'mt-0.5 size-5 shrink-0 text-brand-ink transition-transform duration-200',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-5 sm:px-6"
            >
              <p className="max-w-3xl text-[0.9375rem] leading-relaxed text-ink-muted">
                {item.answer}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
