import { BellRing, CalendarDays, Database, Globe, HardDrive, Mail, Table2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type Integration = {
  name: string
  icon: LucideIcon
  category: 'Calendar' | 'Email' | 'Storage' | 'Notifications' | 'Platform' | 'Domains' | 'Data'
  summary: string
  detail: string
  /** What this honestly is not, where there is a risk of over-reading it. */
  limits?: string
  featureSlug?: string
}

export const integrations: Integration[] = [
  {
    name: 'Google Calendar',
    icon: CalendarDays,
    category: 'Calendar',
    summary: 'Two-way sync between the shared organization calendar and Google Calendar.',
    detail:
      'The shared organization calendar carries meetings, approved leave and events. Syncing it with Google Calendar means the people in your organization see all of it where they already look at their day, instead of having to remember a second calendar exists. Meeting invites reach the people a meeting concerns. The access tokens are encrypted with AES-256 before storage, and the service refuses to start on a malformed encryption key rather than falling back to something weaker.',
    limits:
      'This is Google Calendar specifically. There is no Outlook or Microsoft 365 calendar integration today.',
    featureSlug: 'calendar',
  },
  {
    name: 'Google sign-in',
    icon: Globe,
    category: 'Platform',
    summary: 'Sign in to your workspace with a Google account.',
    detail:
      'Google sign-in means getting into the workspace does not have to start with another password. Email and password sign-in continues to work alongside it. Whichever method is used, the signed auth token carries the user’s organization and role, which is what the database reads when deciding what rows they may see.',
    limits:
      'Google sign-in is an authentication option, not a directory sync. It does not provision or deprovision employee accounts from Google Workspace, and there is no SAML or SCIM support today.',
    featureSlug: 'onboarding',
  },
  {
    name: 'Resend',
    icon: Mail,
    category: 'Email',
    summary: 'Transactional email: confirmations, notifications, payslips and expiry reminders.',
    detail:
      'Everything the product needs to send outside the app goes through Resend: email confirmation on signup, team invitations, approval and payslip notifications, meeting invitations, help desk activity, and work authorization milestone expiry reminders. Those reminders are sent exactly once per milestone — no duplicate from a retried job and no silent miss from one that failed partway. Emails carry the brand color configured in your workspace, so a payslip notification looks like it came from your company.',
    limits:
      'This is transactional email. OneclickHR is not a marketing email tool and does not send campaigns to your employees.',
    featureSlug: 'notifications',
  },
  {
    name: 'Cloudflare R2',
    icon: HardDrive,
    category: 'Storage',
    summary: 'Object storage for documents, attachments and generated PDFs.',
    detail:
      'Per-employee document stores, timesheet attachments, candidate application files, your organization logo, and the payslip, invoice and HR letter PDFs the product generates all live in R2. Access is governed by database rows under Row Level Security rather than by possession of a URL. Uploads are validated after they land by reading the stored bytes back — size caps, magic-byte sniffing, a MIME denylist, SVG sanitization and image-spoof detection — and anything that fails is deleted. Your workspace shows how much of its storage quota is used.',
    featureSlug: 'documents',
  },
  {
    name: 'Web push',
    icon: BellRing,
    category: 'Notifications',
    summary: 'Browser push notifications for what should not wait until someone opens a tab.',
    detail:
      'Web push complements in-app notifications and email. In-app catches you when you are already in the product; email is for things that need to exist outside it; web push is for the approval or request that should not sit unnoticed until someone next opens the app. Each employee controls whether their browser receives push notifications.',
    limits:
      'Web push uses the browser’s own notification support, so it depends on the employee granting permission in their browser. There is no native mobile app today.',
    featureSlug: 'notifications',
  },
  {
    name: 'Custom domain for careers pages',
    icon: Globe,
    category: 'Domains',
    summary: 'Point your own domain at your public job board.',
    detail:
      'Your public careers board is SEO-friendly and carries your brand color, and you can point your own custom domain at it from workspace settings. That is what makes the search ranking your postings earn an asset that stays with you, rather than authority accruing to a third-party job board. Per-posting pages are built to be crawled and indexed individually.',
    featureSlug: 'recruiting',
  },
  {
    name: 'Supabase',
    icon: Database,
    category: 'Platform',
    summary: 'Postgres, authentication, Row Level Security and realtime.',
    detail:
      'Supabase is the platform the product is built on rather than an integration you connect. It provides the Postgres database where Row Level Security enforces every tenant boundary, the authentication that issues the signed tokens carrying organization and role, and the realtime layer that makes a Kanban card move on every screen watching the board.',
    featureSlug: 'tasks',
  },
  {
    name: 'CSV import and export',
    icon: Table2,
    category: 'Data',
    summary: 'Bring employee data in, and take your data out.',
    detail:
      'Employee data comes in by CSV import, which is how most organizations arrive — from a spreadsheet. Existing payslip documents can additionally be read automatically to pull their figures out, so historical pay data does not have to be retyped line by line. Export works the other way: your data is yours, and getting it out is a feature rather than a support request.',
    featureSlug: 'payroll',
  },
]

export const notAvailable: string[] = [
  'There is no accounting integration today — no QuickBooks, Xero or similar. Invoices and expenses live in the product and come out as PDFs and CSV.',
  'There is no payment gateway. OneclickHR generates and tracks client invoices; it does not charge cards or run subscriptions on your behalf.',
  'There is no Slack or Microsoft Teams integration. Notifications go to the app, the browser and email.',
  'There is no SAML single sign-on, SCIM provisioning or directory sync. Google sign-in is an authentication option, not a provisioning integration.',
  'There is no Outlook or Microsoft 365 calendar sync. Google Calendar is the calendar integration that exists.',
  'There is no public API or webhook platform today.',
]
