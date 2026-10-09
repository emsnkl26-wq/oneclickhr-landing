import type { Faq } from './types'

export const faqs: Faq[] = [
  {
    group: 'Getting started',
    question: 'How do I start using OneclickHR?',
    answer:
      'Sign your organization up at app.oneclickhr.app/signup. You confirm your email, and you get your own isolated workspace. Set your organization timezone and brand color first, then departments and team roles, then invite your team. There is no implementation project and no sales call required to begin.',
  },
  {
    group: 'Getting started',
    question: 'Do employees sign themselves up?',
    answer:
      'No. Employees are created by the organization, never by self-signup. That is a deliberate security property: the set of people who can reach your workspace is a set you built. Organizations self-sign-up, and candidates applying through a public job board get their own lightweight external account.',
  },
  {
    group: 'Getting started',
    question: 'What should I configure before inviting the team?',
    answer:
      'Your organization timezone, because it determines the calendar day every attendance record is filed under. Your brand color, because it flows into the app, transactional emails and generated PDFs. Then departments, team roles and your overtime policy, so the people you invite land with the right access and the first payroll run applies a written rule.',
  },
  {
    group: 'Getting started',
    question: 'Can I sign in with Google?',
    answer:
      'Yes. Google sign-in is supported, so getting into the workspace does not have to start with another password. Google Calendar sync is a separate workspace integration you can connect from settings.',
  },
  {
    group: 'Product',
    question: 'Which modules are included?',
    answer:
      'Attendance and time tracking, leave, payroll and payslips, timesheets, invoicing and finance, work authorization expiry tracking, tasks and project boards, recruiting with a public job board, documents and HR letters, meetings and a shared calendar, an internal help desk, notifications, onboarding, workspace settings and branding, and the employee self-service portal.',
  },
  {
    group: 'Product',
    question: 'Why does attendance care about my timezone?',
    answer:
      'Because a clock-in is an instant in time, and the calendar day it belongs to depends on which timezone you compute it in. If that is the server timezone rather than yours, a 9am start can be filed under the previous day. OneclickHR derives the calendar day from your organization timezone, so attendance, leave, the calendar and payroll all agree on what day it was.',
  },
  {
    group: 'Product',
    question: 'How does the payroll review step work?',
    answer:
      'You build a payroll run, read it in full — every line and every salary breakdown — and only then finalize it. Nothing is final until you have looked at it. The run reads the hours recorded in attendance and submitted on timesheets, and applies the overtime policy configured in your workspace settings.',
  },
  {
    group: 'Product',
    question: 'What payslip formats are available?',
    answer:
      'Two PDF formats: a standard format and a US-style format carrying US-specific fields. You pick the one that matches where the employee is paid. Payslips carry your brand color and land directly in the employee portal. Existing payslip documents can also be read automatically to pull the figures out, so migrating historical pay data does not mean retyping it.',
  },
  {
    group: 'Product',
    question: 'Can I host my careers page on my own domain?',
    answer:
      'Yes. The public job board is SEO-friendly and carries your brand color, and you can point your own custom domain at it from workspace settings. That means the search ranking your postings earn accrues to your brand rather than to a third-party job board.',
  },
  {
    group: 'Product',
    question: 'Does the work authorization module handle immigration filings?',
    answer:
      'No, and we want to be precise about that. It keeps work authorization records with their expiry dates and sends automatic milestone reminder emails as an expiry approaches, each one sent exactly once. It is not an I-9 verification system, it does not prepare or submit petitions, and it does not provide immigration advice.',
  },
  {
    group: 'Product',
    question: 'Do task boards update for everyone at the same time?',
    answer:
      'Yes. Kanban boards support drag-and-drop, and a card moved on one screen moves on every screen currently viewing that board. Each employee also sees their own assigned tasks in their self-service portal without needing access to every board in the organization.',
  },
  {
    group: 'Product',
    question: 'Is there a billing or subscription module inside the product?',
    answer:
      'No. OneclickHR has invoicing — you generate client invoices as PDFs, track them, record expenses and read a finance overview — but it does not run a payment gateway, charge cards, or manage recurring subscriptions on your behalf. Collection happens wherever you already collect.',
  },
  {
    group: 'Roles & access',
    question: 'What roles exist?',
    answer:
      'Four. An organization admin or owner configures the workspace and invites the team. An employee sees their own records in the self-service portal. A recruiter gets scoped access to the hiring side only, toggleable per job. A candidate is external, with a lightweight account that shows them their own application and nothing else.',
  },
  {
    group: 'Roles & access',
    question: 'Can I give someone payroll access without giving them everything?',
    answer:
      'Yes. Team roles use permission presets, so a payroll person and a recruiter get coherent and different access. The underlying permissions are granular; the preset is how you assign a role that matches a real job without configuring forty checkboxes.',
  },
  {
    group: 'Roles & access',
    question: 'What happens when I deactivate someone?',
    answer:
      'Access ends immediately. Permissions are re-checked from the database on every request rather than trusted from an auth token that was issued earlier, so there is no window where a deactivated account still works because its session had not expired yet.',
  },
  {
    group: 'Security & data',
    question: 'How is my organization’s data kept separate from other organizations?',
    answer:
      'By the database, not by application code. OneclickHR runs on one Postgres database with Row Level Security enabled on every single table, and every tenant-scoped table carries a non-null tenant id. A user’s organization and role travel in their signed auth token, so the database itself answers whether a given person may read a given row. The boundary holds even for a query nobody remembered to filter.',
  },
  {
    group: 'Security & data',
    question: 'Is the isolation actually tested?',
    answer:
      'Yes, against a real database rather than mocks. The tests cover cross-organization reads and writes in both directions, direct access by id with no filter applied, employee-to-employee isolation inside a single organization, immediate effect of deactivation, and workspace suspension.',
  },
  {
    group: 'Security & data',
    question: 'How are file uploads handled?',
    answer:
      'Uploads are validated after they land, by reading the stored bytes back rather than trusting what the browser claimed. That includes size caps, magic-byte sniffing, a MIME denylist, SVG sanitization and image-spoof detection. Anything that fails validation is deleted. Files are stored on Cloudflare R2 with access governed by database rows.',
  },
  {
    group: 'Security & data',
    question: 'What infrastructure does OneclickHR run on?',
    answer:
      'Supabase for Postgres, authentication, Row Level Security and realtime; Cloudflare R2 for file storage; Resend for transactional email; and Vercel for hosting. Third-party integration tokens are encrypted with AES-256, and the service refuses to start on a malformed encryption key rather than silently weakening it.',
  },
  {
    group: 'Security & data',
    question: 'Is OneclickHR SOC 2, ISO 27001, HIPAA or GDPR certified?',
    answer:
      'No, and we will not imply otherwise. We hold no such certifications or attestations today. What we can say is specific: the architecture was built with data isolation and least privilege as first principles, isolation is tested against a real database, mutations are recorded in a tamper-evident audit log, and the data residency region is chosen per deployment.',
  },
  {
    group: 'Security & data',
    question: 'Is there an audit trail?',
    answer:
      'Yes. Mutations are recorded in a tamper-evident audit log, so a question about what changed and when has an answer that does not depend on anyone’s memory. Scheduled jobs are monitored separately: every run records its outcome, so a failure is loud rather than a green tick.',
  },
  {
    group: 'Pricing & plans',
    question: 'How much does OneclickHR cost?',
    answer:
      'Talk to us. We shape a plan around the modules you need and the size of your organization rather than publishing a per-seat figure that fits nobody. Tell us what you are running on today and what has to work on day one, and we will come back with something concrete.',
  },
  {
    group: 'Pricing & plans',
    question: 'What is included in every plan?',
    answer:
      'Database-enforced workspace isolation, the tamper-evident audit log, all four roles, the full light and dark interface, the employee self-service portal, and email support. Those are properties of the product rather than upsells, so they are not withheld from a smaller plan.',
  },
  {
    group: 'Pricing & plans',
    question: 'Can I move my existing data in?',
    answer:
      'Yes. Employee data comes in by CSV import, and existing payslip documents can be read automatically to pull their figures out instead of being retyped. Tell us what you have when you get in touch and we will tell you what the move looks like.',
  },
  {
    group: 'Pricing & plans',
    question: 'How do I get support?',
    answer:
      'Email support is included with every plan. The product also includes its own internal help desk, which your employees use to raise tickets to your HR team — that is a feature of your workspace rather than a channel to us.',
  },
]

export const faqGroups = [
  'Getting started',
  'Product',
  'Roles & access',
  'Security & data',
  'Pricing & plans',
] as const

/** The subset shown in the home page accordion. */
export const homeFaqs = faqs.filter((f) =>
  [
    'How do I start using OneclickHR?',
    'Which modules are included?',
    'Why does attendance care about my timezone?',
    'How is my organization’s data kept separate from other organizations?',
    'How much does OneclickHR cost?',
    'Does the work authorization module handle immigration filings?',
  ].includes(f.question),
)

export const pricingFaqs = faqs.filter((f) => f.group === 'Pricing & plans')
