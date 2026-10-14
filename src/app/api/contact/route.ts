import { NextResponse } from 'next/server'
import { contactSchema, type ContactResponse } from '@/lib/contact-schema'
import { site } from '@/lib/site'

/**
 * In-memory, per-IP rate limiting. This is deliberately not a shared store:
 * the site is static apart from this route, and a per-instance limiter is
 * enough to stop a crude flood without adding a dependency. A determined
 * attacker is not the threat model for a marketing contact form.
 */
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()
const DEFAULT_TO_EMAIL = 'emsnkl.26@gmail.com'

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key)
    }
  }

  return recent.length > MAX_PER_WINDOW
}

function clientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}

export async function POST(request: Request) {
  const ip = clientIp(request)

  if (rateLimited(ip)) {
    return NextResponse.json<ContactResponse>(
      { ok: false, message: 'Too many submissions. Try again in a few minutes, or email us.' },
      { status: 429 },
    )
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json<ContactResponse>(
      { ok: false, message: 'We could not read that submission. Please try again.' },
      { status: 400 },
    )
  }

  const parsed = contactSchema.safeParse(payload)
  if (!parsed.success) {
    const fieldErrors: ContactResponse['fieldErrors'] = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]
      if (typeof key === 'string' && !(key in fieldErrors)) {
        fieldErrors[key as keyof typeof fieldErrors] = issue.message
      }
    }
    return NextResponse.json<ContactResponse>(
      { ok: false, message: 'Please check the highlighted fields.', fieldErrors },
      { status: 400 },
    )
  }

  const data = parsed.data

  // Timing check: a form completed implausibly fast is almost always a bot.
  // Treated as a silent success so a bot learns nothing from the response.
  if (typeof data.elapsedMs === 'number' && data.elapsedMs < 2000) {
    return NextResponse.json<ContactResponse>({
      ok: true,
      message: 'Thanks — we have your message.',
    })
  }

  // FormSubmit forwards the submission to this inbox. No API key is needed, but
  // the address must be activated once (see .env.example).
  const to = process.env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: site.url,
        Referer: `${site.url}/contact`,
      },
      body: JSON.stringify({
        _subject: `${data.enquiry} — ${data.company}`,
        _replyto: data.email,
        _template: 'table',
        _captcha: 'false',
        Name: data.name,
        'Work email': data.email,
        Organization: data.company,
        'Team size': data.teamSize,
        'What they need': data.enquiry,
        Message: data.message,
      }),
    })

    const result = (await response.json().catch(() => null)) as { success?: unknown } | null
    const succeeded = response.ok && result?.success !== false && result?.success !== 'false'

    if (!succeeded) {
      console.error('[contact] FormSubmit rejected the request', response.status, result)
      return NextResponse.json<ContactResponse>(
        { ok: false, message: `We could not send that just now. Please email ${site.contactEmail} instead.` },
        { status: 502 },
      )
    }
  } catch (error) {
    console.error('[contact] Email send failed', error)
    return NextResponse.json<ContactResponse>(
      { ok: false, message: `We could not send that just now. Please email ${site.contactEmail} instead.` },
      { status: 502 },
    )
  }

  return NextResponse.json<ContactResponse>({
    ok: true,
    message: 'Thanks — we have your message and will reply to that address.',
  })
}
