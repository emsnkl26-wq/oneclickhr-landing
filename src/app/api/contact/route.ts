import { NextResponse } from 'next/server'
import { contactSchema, type ContactInput, type ContactResponse } from '@/lib/contact-schema'
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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function emailHtml(data: ContactInput) {
  const rows: [string, string][] = [
    ['Name', data.name],
    ['Work email', data.email],
    ['Organization', data.company],
    ['Team size', data.teamSize],
    ['What they need', data.enquiry],
  ]

  return `<!doctype html>
<html lang="en"><body style="margin:0;padding:24px;background:#F1F5F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0F172A">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#FFFFFF;border:1px solid #E2E8F0;border-radius:14px;overflow:hidden">
    <tr><td style="background:#0F172A;padding:20px 24px">
      <span style="font-size:17px;font-weight:700;color:#FFFFFF">Oneclick<span style="color:#FF8A3D">HR</span></span>
      <div style="margin-top:4px;font-size:12px;color:#94A3B8">New contact form submission</div>
    </td></tr>
    <tr><td style="padding:24px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${rows
          .map(
            ([label, value]) => `<tr>
          <td style="padding:8px 0;border-bottom:1px solid #F1F5F9;font-size:12px;color:#64748B;width:140px">${escapeHtml(label)}</td>
          <td style="padding:8px 0;border-bottom:1px solid #F1F5F9;font-size:14px;color:#0F172A">${escapeHtml(value)}</td>
        </tr>`,
          )
          .join('')}
      </table>
      <div style="margin-top:20px;padding:16px;background:#F1F5F9;border-radius:10px;border-left:3px solid #FF6A00">
        <div style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#C2410C">Message</div>
        <div style="margin-top:8px;font-size:14px;line-height:1.6;color:#0F172A;white-space:pre-wrap">${escapeHtml(data.message)}</div>
      </div>
      <p style="margin:20px 0 0;font-size:12px;color:#64748B">
        Reply directly to <a href="mailto:${escapeHtml(data.email)}" style="color:#C2410C">${escapeHtml(data.email)}</a>.
      </p>
    </td></tr>
    <tr><td style="padding:16px 24px;background:#F1F5F9;font-size:11px;color:#64748B">
      Sent from the contact form at ${site.url}
    </td></tr>
  </table>
</body></html>`
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

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL

  // Degrade gracefully: locally, and on any deploy without mail configured, we
  // log the submission and tell the user honestly rather than 500-ing.
  if (!apiKey || !to || !from) {
    console.info('[contact] Email is not configured; submission logged only.', {
      name: data.name,
      email: data.email,
      company: data.company,
      teamSize: data.teamSize,
      enquiry: data.enquiry,
      messageLength: data.message.length,
    })
    return NextResponse.json<ContactResponse>({
      ok: true,
      message: `Thanks — we have your message. Email delivery is not configured on this deployment, so it was recorded in the server log. To be certain it reaches us, email ${site.contactEmail}.`,
    })
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `${data.enquiry} — ${data.company}`,
        html: emailHtml(data),
      }),
    })

    if (!response.ok) {
      console.error('[contact] Resend rejected the request', response.status)
      return NextResponse.json<ContactResponse>(
        {
          ok: false,
          message: `We could not send that just now. Please email ${site.contactEmail} instead.`,
        },
        { status: 502 },
      )
    }
  } catch (error) {
    console.error('[contact] Email send failed', error)
    return NextResponse.json<ContactResponse>(
      {
        ok: false,
        message: `We could not send that just now. Please email ${site.contactEmail} instead.`,
      },
      { status: 502 },
    )
  }

  return NextResponse.json<ContactResponse>({
    ok: true,
    message: 'Thanks — we have your message and will reply to that address.',
  })
}
