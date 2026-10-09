/**
 * The product has no billing module and we publish no prices. Plans are
 * described by shape, and every CTA goes to /contact. There is deliberately no
 * `price` field on this type — it cannot be filled in with a number by mistake.
 */
export type Plan = {
  name: string
  forWho: string
  description: string
  highlights: string[]
  featured?: boolean
}

export const plans: Plan[] = [
  {
    name: 'Starter',
    forWho: 'Small teams getting off spreadsheets',
    description:
      'The core of HR in one workspace: attendance that files days in your timezone, leave with real approvals, documents, and the employee self-service portal.',
    highlights: [
      'Attendance and time tracking',
      'Leave requests, approvals and balances',
      'Documents and HR letters',
      'Employee self-service portal',
      'Shared organization calendar',
      'Email support',
    ],
  },
  {
    name: 'Growth',
    forWho: 'Companies running payroll and billing time',
    description:
      'Everything in Starter plus the money side: payroll runs with a review step, weekly timesheets with client allocation, client invoices and a finance overview.',
    highlights: [
      'Everything in Starter',
      'Payroll runs with a review step',
      'Two payslip PDF formats',
      'Weekly timesheets with approvals',
      'Client invoices, expenses and finance overview',
      'Recruiting and your public job board',
      'Custom domain for your careers page',
    ],
    featured: true,
  },
  {
    name: 'Enterprise',
    forWho: 'Staffing firms and larger organizations',
    description:
      'Everything in Growth plus the modules larger and more regulated operations need: work authorization expiry tracking, placements, scoped recruiter access and integrations.',
    highlights: [
      'Everything in Growth',
      'Work authorization expiry tracking and reminders',
      'Placements tracking',
      'Recruiter access scoped per job',
      'Google Calendar sync and integrations',
      'Multi-currency payroll',
      'Data residency region chosen per deployment',
    ],
  },
]

export type MatrixRow = {
  label: string
  /** Index matches `plans`. A string renders as a note instead of a check. */
  values: (boolean | string)[]
}

export type MatrixGroup = { heading: string; rows: MatrixRow[] }

export const comparison: MatrixGroup[] = [
  {
    heading: 'Time and attendance',
    rows: [
      { label: 'Clock in and out, shift toggling', values: [true, true, true] },
      { label: 'Late-login detection', values: [true, true, true] },
      { label: 'Day-by-day attendance sheet', values: [true, true, true] },
      { label: 'Timezone-correct calendar days', values: [true, true, true] },
      { label: 'Leave requests, approvals and balances', values: [true, true, true] },
      { label: 'Shared organization calendar', values: [true, true, true] },
      { label: 'Google Calendar sync', values: [false, false, true] },
      { label: 'Weekly timesheets with attachments', values: [false, true, true] },
      { label: 'Project and client allocation', values: [false, true, true] },
    ],
  },
  {
    heading: 'Pay and finance',
    rows: [
      { label: 'Payroll runs with a review step', values: [false, true, true] },
      { label: 'Configurable pay schedules and overtime rules', values: [false, true, true] },
      { label: 'Standard payslip PDF', values: [false, true, true] },
      { label: 'US-style payslip PDF', values: [false, true, true] },
      { label: 'Automatic reading of existing payslips', values: [false, true, true] },
      { label: 'Multi-currency payroll', values: [false, false, true] },
      { label: 'Client invoices as PDFs', values: [false, true, true] },
      { label: 'Expenses and finance overview', values: [false, true, true] },
    ],
  },
  {
    heading: 'People and hiring',
    rows: [
      { label: 'Employee self-service portal', values: [true, true, true] },
      { label: 'Guided onboarding flows', values: [true, true, true] },
      { label: 'Internal job board', values: [true, true, true] },
      { label: 'Public, SEO-friendly careers board', values: [false, true, true] },
      { label: 'Custom domain for your careers page', values: [false, true, true] },
      { label: 'Application tracking and talent pool', values: [false, true, true] },
      { label: 'Recruiter role scoped per job', values: [false, false, true] },
      { label: 'Placements tracking', values: [false, false, true] },
    ],
  },
  {
    heading: 'Records and operations',
    rows: [
      { label: 'Documents and per-employee document store', values: [true, true, true] },
      { label: 'HR letters generated from templates', values: [true, true, true] },
      { label: 'Visible storage quota', values: [true, true, true] },
      { label: 'Tasks and project boards', values: [false, true, true] },
      { label: 'Internal help desk with threaded tickets', values: [false, true, true] },
      { label: 'Work authorization records and expiry reminders', values: [false, false, true] },
      { label: 'Departments and team roles with permission presets', values: [true, true, true] },
      { label: 'Your brand color across app, emails and PDFs', values: [true, true, true] },
    ],
  },
  {
    heading: 'Platform',
    rows: [
      { label: 'Database-enforced workspace isolation', values: [true, true, true] },
      { label: 'Tamper-evident audit log', values: [true, true, true] },
      { label: 'In-app notifications and transactional email', values: [true, true, true] },
      { label: 'Web push notifications', values: [false, true, true] },
      { label: 'Google sign-in', values: [true, true, true] },
      { label: 'CSV import and export', values: [true, true, true] },
      { label: 'Data residency region chosen per deployment', values: [false, false, true] },
      { label: 'Support', values: ['Email', 'Email', 'Email'] },
    ],
  },
]

export const everyPlan: { title: string; body: string }[] = [
  {
    title: 'Database-enforced isolation',
    body: 'Row Level Security on every table, and a non-null tenant id on every tenant-scoped table. This is how the product is built, so it is not a tier.',
  },
  {
    title: 'A tamper-evident audit log',
    body: 'Mutations are recorded, on every plan. Knowing what changed and when is not an upgrade.',
  },
  {
    title: 'All four roles',
    body: 'Organization admin, employee, recruiter and candidate, with granular team roles and permission presets.',
  },
  {
    title: 'Light and dark throughout',
    body: 'The whole interface, in both themes, for everyone — not a setting reserved for larger accounts.',
  },
  {
    title: 'The employee portal',
    body: 'Every employee gets their own self-service portal. Charging extra for people to see their own payslip would be strange.',
  },
  {
    title: 'Email support',
    body: 'Included on every plan. A smaller organization does not get a worse answer.',
  },
]
