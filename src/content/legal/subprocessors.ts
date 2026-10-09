import type { LegalDoc } from '../types'

export const subprocessors: LegalDoc = {
  slug: 'subprocessors',
  title: 'Subprocessors',
  metaDescription:
    'The complete list of third-party providers OneclickHR uses, what each one processes, and why. Five providers, each with a defined and limited purpose.',
  summary:
    'In plain language: we use five third-party providers to run OneclickHR, and this is all of them. Supabase holds the database and handles sign-in. Cloudflare stores uploaded files. Resend sends email. Vercel hosts the service. Google is used only by organizations that turn on Calendar sync or Google sign-in.',
  sections: [
    {
      heading: 'How we think about this list',
      blocks: [
        {
          kind: 'p',
          text: 'Every provider on this list is a party that can, in principle, touch customer data. That is a reason to keep the list short, and we do. There is no analytics vendor, no advertising network, no customer data platform, no session recorder and no chat widget, because each would be another company holding employee data to no clear benefit.',
        },
        {
          kind: 'p',
          text: 'Each provider below is engaged under a written contract that limits it to the purpose described, and imposes data protection obligations no less protective than our own data processing addendum. We will give customers reasonable notice before adding or replacing a provider.',
        },
      ],
    },
    {
      heading: 'Supabase',
      blocks: [
        {
          kind: 'p',
          text: 'Purpose: Postgres database, authentication, and realtime infrastructure.',
        },
        {
          kind: 'p',
          text: 'What it processes: all structured workspace data — organization and employee records, attendance, leave, timesheets, payroll figures, work authorization records, tasks and projects, job postings and applications, calendar entries, support tickets, notification records and audit log entries. It also processes authentication identifiers and credentials for sign-in, and carries the live updates that make task boards move for everyone viewing them.',
        },
        {
          kind: 'p',
          text: 'Why this provider: it gives us Postgres with Row Level Security, which is the mechanism our entire tenant isolation model depends on. Isolation enforced by the database rather than by application code is the single most important architectural decision in the product, and it is the reason this provider is here rather than a database we would have to wrap in our own access layer.',
        },
      ],
    },
    {
      heading: 'Cloudflare',
      blocks: [
        { kind: 'p', text: 'Purpose: R2 object storage for files.' },
        {
          kind: 'p',
          text: 'What it processes: uploaded documents and files — per-employee document stores, generated payslip, invoice and HR letter PDFs, timesheet attachments, organization logos, and files attached to candidate applications.',
        },
        {
          kind: 'p',
          text: 'Why this provider: object storage keeps large files out of the database while leaving access control where it belongs. Whether you may read a file is decided by a database row governed by Row Level Security, not by whether you happen to hold a URL. Uploads are validated after they land by reading the stored bytes back, and anything that fails validation is deleted.',
        },
      ],
    },
    {
      heading: 'Resend',
      blocks: [
        { kind: 'p', text: 'Purpose: delivery of transactional email.' },
        {
          kind: 'p',
          text: 'What it processes: recipient email addresses and the contents of the messages we send — email confirmations and invitations, payslip and approval notifications, work authorization milestone expiry reminders, meeting invitations, help desk notifications, and the submissions sent from the contact form on this website.',
        },
        {
          kind: 'p',
          text: 'Why this provider: transactional email needs to arrive, and deliverability is a specialist problem. Emails carry the brand color configured in the customer’s workspace. We send no marketing email through this channel to an organization’s employees.',
        },
      ],
    },
    {
      heading: 'Vercel',
      blocks: [
        { kind: 'p', text: 'Purpose: hosting for the application and this website.' },
        {
          kind: 'p',
          text: 'What it processes: all request traffic, which necessarily means any personal data contained in a request or response in transit, plus standard server logs — IP address, user agent, requested URL, referrer and timestamp — retained for a limited period. It also serves the public careers pages that customers publish, including on their own custom domains.',
        },
        {
          kind: 'p',
          text: 'Why this provider: it hosts the framework the product is built on, serves static pages close to the visitor, and runs the scheduled jobs behind expiry reminders. Those job runs record their outcome, so a failure is visible rather than silent.',
        },
      ],
    },
    {
      heading: 'Google',
      blocks: [
        {
          kind: 'p',
          text: 'Purpose: Google Calendar sync and Google sign-in, for organizations that choose to enable them.',
        },
        {
          kind: 'p',
          text: 'What it processes: for Calendar sync, the calendar events synchronized between the organization calendar and Google Calendar, including meeting titles, times, and attendee email addresses. For Google sign-in, the identity and email address of the signing-in user.',
        },
        {
          kind: 'p',
          text: 'Why this provider: Google Calendar is the calendar most teams actually use, and a shared organization calendar that does not reach it creates a second source of truth. The access tokens that make the integration work are encrypted with AES-256 before storage, and the service refuses to start on a malformed encryption key rather than falling back to something weaker.',
        },
        {
          kind: 'p',
          text: 'This provider is optional. An organization that enables neither integration has no data processed by Google through OneclickHR.',
        },
      ],
    },
    {
      heading: 'Changes to this list',
      blocks: [
        {
          kind: 'p',
          text: 'We will update this page when a provider is added, replaced or removed, and we will give customers reasonable notice before the change takes effect. A customer with a reasonable data protection objection to a new provider should raise it with us; if we cannot resolve it, the customer may terminate the affected part of the service. The date at the top of this page reflects the most recent revision.',
        },
        {
          kind: 'p',
          text: 'Questions about this list: privacy@oneclickhr.app.',
        },
      ],
    },
  ],
}
