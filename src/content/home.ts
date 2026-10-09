import { Building2, Briefcase, Globe2, HeartHandshake, UserRound, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const hero = {
  eyebrow: 'HR Management in One Click',
  headline: 'People. Processes. Progress.',
  subhead:
    'Modern HR and organization management: attendance, leave, payroll, work authorization and tasks in one calm place. Each organization gets a fully isolated workspace.',
}

export const builtFor: { label: string; detail: string }[] = [
  { label: '10–500 people', detail: 'Sized for small and midsize organizations' },
  { label: 'Staffing & consulting', detail: 'Timesheets, client allocation and placements' },
  { label: 'Remote teams', detail: 'Timezone-correct dates and async approvals' },
  { label: 'Multi-currency', detail: 'Pay people in the currency they are paid in' },
]

/** Alternating deep-dive sections on the home page, pointing at feature pages. */
export const deepDives: {
  slug: string
  eyebrow: string
  heading: string
  body: string
  points: string[]
}[] = [
  {
    slug: 'attendance',
    eyebrow: 'Attendance',
    heading: 'A 9am start never lands on yesterday',
    body: 'A clock-in is an instant; a working day is a calendar date. Converting between them in the wrong timezone is the quietest bug in HR software, and it propagates straight into payroll. OneclickHR derives the calendar day from your organization timezone.',
    points: [
      'Clock in and out, with shift toggling for teams running more than one shift',
      'Late logins flagged as they are recorded, not reconstructed later',
      'A day-by-day sheet that reads across dates, not down one employee',
      'The same date the leave calendar and the payroll run use',
    ],
  },
  {
    slug: 'payroll',
    eyebrow: 'Payroll',
    heading: 'Read the run before it is final',
    body: 'Most payroll errors are input errors, not arithmetic errors — a drifted hour, an overtime rule that did not apply, a currency that got assumed. So the review step is a stage in the process rather than a report you have to remember to open.',
    points: [
      'Every line and salary breakdown visible before you finalize',
      'Overtime rules and pay schedules configured once in your workspace',
      'Multi-currency, with two payslip PDF formats including a US-style one',
      'Existing payslips read automatically, so history is not retyped',
    ],
  },
  {
    slug: 'recruiting',
    eyebrow: 'Recruiting',
    heading: 'A careers page on your domain, not someone else’s',
    body: 'A posting on a third-party board is a rental: the search ranking and the first impression belong to the board. Post to a public, SEO-friendly careers board on your own branded page, on your own custom domain, and keep what it earns.',
    points: [
      'Per-posting pages built to be crawled and indexed',
      'Candidates apply directly with their own lightweight account',
      'Application tracking, a talent pool, and placements for staffing firms',
      'Recruiter access scoped to the hiring side, toggleable per job',
    ],
  },
  {
    slug: 'tasks',
    eyebrow: 'Tasks and projects',
    heading: 'Boards that move for everyone at once',
    body: 'Kanban boards with drag-and-drop, grouped into projects. A card moved on one screen moves on every screen watching that board — and a project is also the unit timesheet hours are allocated to, which is what makes a client invoice generatable.',
    points: [
      'Drag-and-drop that persists as it happens',
      'Live updates for everyone currently viewing the board',
      'Projects shared with timesheets and invoicing',
      'A personal task list in every employee’s portal',
    ],
  },
]

export const howItWorks: { step: string; heading: string; body: string }[] = [
  {
    step: '01',
    heading: 'Create your workspace',
    body: 'Sign your organization up and confirm your email. You get a fully isolated workspace. Set your organization timezone and brand color first — the timezone makes every attendance date correct from the first clock-in, and the color flows into the app, the emails and every PDF.',
  },
  {
    step: '02',
    heading: 'Invite your team',
    body: 'Set up departments and team roles with permission presets, so a payroll person and a recruiter get coherent, different access. Then create your employees and invite them. Employees never self-register, so the set of people inside your workspace is one you built on purpose.',
  },
  {
    step: '03',
    heading: 'Run your month',
    body: 'Attendance and leave work from day one. Timesheets go in weekly and get approved. When the cycle comes round, build the payroll run, read it, and finalize it. Invoices come from the hours you already approved, and payslips land in each employee’s own portal.',
  },
]

export const audiences: {
  icon: LucideIcon
  title: string
  body: string
  points: string[]
  href: string
  linkLabel: string
}[] = [
  {
    icon: HeartHandshake,
    title: 'For HR leads',
    body: 'The record has to be accurate, and access has to be scoped. Letters are generated from templates rather than copied from the last one, mutations are recorded in a tamper-evident audit log, and deactivation takes effect immediately.',
    points: [
      'Team roles with permission presets',
      'Offer and verification letters from templates',
      'An audit log of what changed',
      'Fewer inbound questions, because employees have a portal',
    ],
    href: '/solutions/hr-teams',
    linkLabel: 'OneclickHR for HR teams',
  },
  {
    icon: UserRound,
    title: 'For employees',
    body: 'One portal for the whole working week: attendance, leave and balances, payslips, timesheets, assigned tasks, documents, profile, meetings and the internal job board. Their own records, and only their own.',
    points: [
      'Clock in, request leave, check a balance',
      'Payslips as PDFs with the breakdown on them',
      'Submit a week and see its approval state',
      'Raise a help desk ticket instead of a direct message',
    ],
    href: '/features/employee-portal',
    linkLabel: 'See the employee portal',
  },
  {
    icon: Briefcase,
    title: 'For staffing firms',
    body: 'A weekly chain that has to work: hours logged, allocated to a client, approved, invoiced. Plus work authorization expiry reminders across a roster, placements tracking, and recruiters scoped per job.',
    points: [
      'Weekly timesheets with client and project allocation',
      'Client invoices generated from approved hours',
      'Work authorization reminders sent exactly once',
      'Placements tracked as their own records',
    ],
    href: '/solutions/staffing-and-consulting',
    linkLabel: 'OneclickHR for staffing firms',
  },
]

export const roleStrip: { icon: LucideIcon; name: string; body: string }[] = [
  {
    icon: Building2,
    name: 'Organization',
    body: 'Self-signs up with email confirmation, gets an isolated workspace, invites the team, and configures everything.',
  },
  {
    icon: UserRound,
    name: 'Employee',
    body: 'Created by the organization, never self-signup. Sees their own attendance, leave, pay, tasks and documents.',
  },
  {
    icon: Users,
    name: 'Recruiter',
    body: 'Scoped access to the hiring side only, toggleable per job. Does not see the rest of the organization.',
  },
  {
    icon: Globe2,
    name: 'Candidate',
    body: 'External, with a lightweight account. Applies through the public job board and sees their own application.',
  },
]

export const securityTeaser = {
  heading: 'Isolation enforced by the database, not by application code',
  body: 'One Postgres database, Row Level Security enabled on every single table without exception, and a non-null tenant id on every tenant-scoped table. A user’s organization and role travel in their signed auth token, so the database itself answers whether they may read a row. The boundary holds even for a query nobody thought to filter.',
  points: [
    'Isolation tested against a real database, in both directions, including unfiltered access by id',
    'Deactivation takes effect immediately, re-checked on every request',
    'Uploads validated after they land, by reading the stored bytes back',
    'Integration tokens encrypted with AES-256; a malformed key stops the service',
  ],
}
