'use client'

// Client boundary: the form holds field state, inline validation and the
// pending/success states, all of which require interactivity.
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { contactSchema, enquiryTypes, teamSizes, type ContactResponse } from '@/lib/contact-schema'
import { cn } from '@/lib/cn'

type FieldKey = 'name' | 'email' | 'company' | 'teamSize' | 'enquiry' | 'message'

const initial: Record<FieldKey, string> = {
  name: '',
  email: '',
  company: '',
  teamSize: '',
  enquiry: '',
  message: '',
}

export function ContactForm() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({})
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')
  const honeypotRef = useRef<HTMLInputElement>(null)
  const mountedAt = useRef(Date.now())

  const set = (key: FieldKey, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'pending') return

    const payload = {
      ...values,
      honeypot: honeypotRef.current?.value ?? '',
      elapsedMs: Date.now() - mountedAt.current,
    }

    const parsed = contactSchema.safeParse(payload)
    if (!parsed.success) {
      const next: Partial<Record<FieldKey, string>> = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]
        if (typeof key === 'string' && !(key in next)) {
          next[key as FieldKey] = issue.message
        }
      }
      setErrors(next)
      setStatus('error')
      setFeedback('Please check the highlighted fields.')
      return
    }

    setStatus('pending')
    setFeedback('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })
      const result = (await response.json()) as ContactResponse

      if (result.ok) {
        setStatus('success')
        setFeedback(result.message)
        setValues(initial)
        setErrors({})
        return
      }

      setStatus('error')
      setFeedback(result.message)
      if (result.fieldErrors) setErrors(result.fieldErrors as Partial<Record<FieldKey, string>>)
    } catch {
      setStatus('error')
      setFeedback('Something went wrong sending that. Please email us instead.')
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-xl border border-line bg-surface-card p-8 text-center"
      >
        <CheckCircle2 aria-hidden="true" className="mx-auto size-8 text-success" />
        <h2 className="mt-4 text-h3">Message sent</h2>
        <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-ink-muted">
          {feedback}
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => {
            setStatus('idle')
            setFeedback('')
            mountedAt.current = Date.now()
          }}
        >
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-xl border border-line bg-surface-card p-6 sm:p-8"
    >
      {/* Honeypot: off-screen rather than display:none, which some bots skip. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          ref={honeypotRef}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" error={errors.name}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            value={values.name}
            onChange={(e) => set('name', e.target.value)}
            className={inputClass(!!errors.name)}
          />
        </Field>

        <Field id="email" label="Work email" error={errors.email}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            value={values.email}
            onChange={(e) => set('email', e.target.value)}
            className={inputClass(!!errors.email)}
          />
        </Field>

        <Field id="company" label="Organization" error={errors.company}>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? 'company-error' : undefined}
            value={values.company}
            onChange={(e) => set('company', e.target.value)}
            className={inputClass(!!errors.company)}
          />
        </Field>

        <Field id="teamSize" label="Team size" error={errors.teamSize}>
          <select
            id="teamSize"
            aria-invalid={!!errors.teamSize}
            aria-describedby={errors.teamSize ? 'teamSize-error' : undefined}
            value={values.teamSize}
            onChange={(e) => set('teamSize', e.target.value)}
            className={inputClass(!!errors.teamSize)}
          >
            <option value="">Select a size</option>
            {teamSizes.map((size) => (
              <option key={size} value={size}>
                {size} people
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field id="enquiry" label="What do you need?" error={errors.enquiry}>
            <select
              id="enquiry"
              aria-invalid={!!errors.enquiry}
              aria-describedby={errors.enquiry ? 'enquiry-error' : undefined}
              value={values.enquiry}
              onChange={(e) => set('enquiry', e.target.value)}
              className={inputClass(!!errors.enquiry)}
            >
              <option value="">Select a topic</option>
              {enquiryTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field
            id="message"
            label="Message"
            hint="What you are running today, and what has to work on day one."
            error={errors.message}
          >
            <textarea
              id="message"
              rows={6}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : 'message-hint'}
              value={values.message}
              onChange={(e) => set('message', e.target.value)}
              className={cn(inputClass(!!errors.message), 'h-auto resize-y py-3')}
            />
          </Field>
        </div>
      </div>

      {status === 'error' && feedback ? (
        <div
          role="alert"
          className="mt-5 flex gap-2.5 rounded-lg border border-danger/30 bg-danger/5 p-3.5"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-danger" />
          <p className="text-sm text-ink">{feedback}</p>
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === 'pending'}>
          {status === 'pending' ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Sending
            </>
          ) : (
            'Send message'
          )}
        </Button>
        <p className="text-xs text-ink-muted">We reply to the address you give us. Nothing else.</p>
      </div>
    </form>
  )
}

function inputClass(hasError: boolean) {
  return cn(
    'h-11 w-full rounded-lg border bg-surface px-3.5 text-[0.9375rem] text-ink transition-colors placeholder:text-ink-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-card',
    hasError ? 'border-danger' : 'border-line',
  )
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string
  label: string
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-xs text-ink-muted">
          {hint}
        </p>
      ) : null}
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  )
}
