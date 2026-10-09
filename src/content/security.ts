import {
  Database,
  FileCheck2,
  KeyRound,
  Lock,
  ScrollText,
  ServerCog,
  ShieldCheck,
  TimerReset,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type SecurityPillar = {
  icon: LucideIcon
  title: string
  summary: string
  points: string[]
}

export const pillars: SecurityPillar[] = [
  {
    icon: Database,
    title: 'Isolation enforced by the database',
    summary:
      'The tenant boundary is a Postgres policy, not a filter somebody has to remember to add.',
    points: [
      'One Postgres database, with Row Level Security enabled on every single table without exception.',
      'Every tenant-scoped table carries a non-null tenant id, so a row cannot exist without belonging to an organization.',
      'A user’s organization and role travel in their signed auth token, so the database itself answers whether a given person may read a given row.',
      'The boundary holds for a query nobody thought to add a filter to — which is the only kind of boundary worth having.',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Isolation tested against a real database',
    summary: 'A mocked isolation test proves only that the mock agrees with its author.',
    points: [
      'Cross-organization reads, attempted in both directions, because an asymmetric policy bug is easy to write and easy to miss.',
      'Cross-organization writes, also in both directions. Being unable to read another workspace is not the same as being unable to modify it.',
      'Direct access by id with no filter at all — the exact scenario the architecture exists for.',
      'Employee-to-employee isolation inside a single organization, so legitimate membership does not mean seeing everyone.',
      'Immediate effect of deactivation, verified rather than assumed.',
      'Workspace suspension, so a suspended organization is suspended at the data layer.',
    ],
  },
  {
    icon: TimerReset,
    title: 'Deactivation takes effect immediately',
    summary: 'Access is re-checked from the database on every request, not trusted from a token.',
    points: [
      'Many systems leave a gap equal to the token lifetime: a deactivated account keeps working until its session expires.',
      'OneclickHR re-checks status and permissions against the database on every request.',
      'Deactivate someone and their access is gone on the next request, which is what clicking deactivate should mean.',
      'The same applies to revoking a recruiter from a job, or suspending a whole workspace.',
    ],
  },
  {
    icon: FileCheck2,
    title: 'Uploads validated after they land',
    summary: 'We check the bytes as stored, not what the browser claimed during the upload.',
    points: [
      'Size caps, enforced on the stored object.',
      'Magic-byte sniffing, so a file renamed to look like an image is caught.',
      'A MIME denylist for types that have no business in a document store.',
      'SVG sanitization, because an SVG is a document that can carry script.',
      'Image-spoof detection for files that claim to be images and are not.',
      'Anything that fails validation is deleted, rather than quarantined and forgotten.',
    ],
  },
  {
    icon: KeyRound,
    title: 'Encryption that fails loudly',
    summary: 'Integration tokens are encrypted with AES-256, and a bad key stops the service.',
    points: [
      'Third-party integration tokens — such as those for Google Calendar sync — are encrypted with AES-256 before storage.',
      'The service refuses to start on a malformed encryption key rather than silently falling back to something weaker.',
      'That failure mode is deliberate. A service that starts anyway is a service that encrypts nothing and tells nobody.',
      'Data is encrypted in transit throughout.',
    ],
  },
  {
    icon: ScrollText,
    title: 'A tamper-evident audit log',
    summary: 'A durable record of mutations, so "what changed and when" has an answer.',
    points: [
      'Mutations are recorded in a tamper-evident audit log.',
      'The record does not depend on anyone’s memory or on a log that can be quietly edited.',
      'Useful for an internal question about a salary change, and for an external one about access.',
    ],
  },
  {
    icon: ServerCog,
    title: 'Scheduled jobs are monitored',
    summary: 'Every run records its outcome, so a silent breakage is not possible.',
    points: [
      'Each scheduled job run records whether it succeeded or failed.',
      'A failure is loud rather than a green tick, which is the difference between monitoring and the appearance of it.',
      'Work authorization milestone reminders are sent exactly once: no duplicate from a retry, no silent miss from a partial failure.',
      'A reminder system that sometimes sends twice trains people to ignore it. One that sometimes sends nothing is worse than none at all.',
    ],
  },
  {
    icon: Lock,
    title: 'Least privilege by role',
    summary: 'Four role types, granular team roles, and presets so they get assigned correctly.',
    points: [
      'Organization admins configure the workspace. Employees see their own records. Recruiters see the hiring side, toggleable per job. Candidates are external and see only their own application.',
      'Employees are created by the organization and never self-register, so the set of people who can reach a workspace is one you built.',
      'Granular team roles with permission presets, so a payroll person and a recruiter get coherent and different access without anyone configuring forty checkboxes.',
      'Every one of these boundaries is enforced in the database, not by hiding interface elements.',
    ],
  },
]

export const infrastructure: { name: string; role: string }[] = [
  { name: 'Supabase', role: 'Postgres, authentication, Row Level Security and realtime.' },
  { name: 'Cloudflare R2', role: 'Object storage for documents and generated PDFs.' },
  { name: 'Resend', role: 'Transactional email delivery.' },
  { name: 'Vercel', role: 'Hosting for the application, careers pages and scheduled jobs.' },
]

export const weDo: string[] = [
  'Enforce multi-tenant isolation in Postgres with Row Level Security on every table.',
  'Test that isolation against a real database, in both directions, including unfiltered access by id.',
  'Re-check access from the database on every request, so deactivation is immediate.',
  'Validate uploaded files after they land, and delete anything that fails.',
  'Encrypt third-party integration tokens with AES-256, and refuse to start on a malformed key.',
  'Keep a tamper-evident audit log of mutations.',
  'Monitor every scheduled job run and surface failures.',
  'Design with data isolation and least privilege as first principles.',
  'Choose the data residency region per deployment.',
]

export const weDoNotClaim: string[] = [
  'We are not SOC 2 certified, and we hold no SOC 2 report.',
  'We are not ISO 27001 certified.',
  'We are not HIPAA compliant and OneclickHR should not be used to store protected health information.',
  'We do not claim "GDPR certification", which is not a thing that exists. We offer a data processing addendum and name every subprocessor.',
  'We do not publish an uptime percentage, because we will not quote a number we have not measured and cannot stand behind.',
  'We do not claim the service is unbreachable. No system is, and a vendor who says otherwise is selling you something else.',
]
