import type { ChangelogEntry } from './types'

/**
 * Newest first. Entries describe work that shipped in the product at
 * app.oneclickhr.app; this site links to them rather than duplicating release
 * notes anywhere else.
 */
export const changelog: ChangelogEntry[] = [
  {
    version: '2026.09',
    date: '2026-09-24',
    title: 'Faster job board, quieter scheduled jobs',
    items: [
      {
        type: 'Improved',
        text: 'The public job board renders substantially faster on large postings lists. Pages are built statically where the content allows it, so a careers page with a long list of roles no longer pays a rendering cost on every visit.',
      },
      {
        type: 'Improved',
        text: 'Every scheduled job run now records its outcome. A failed run surfaces as a failure rather than a green tick, which closes the gap where a broken reminder job could stay quiet.',
      },
      {
        type: 'Fixed',
        text: 'Work authorization milestone reminders are now guaranteed to send exactly once per milestone. A retried job can no longer produce a duplicate email, and a job that failed partway can no longer skip a milestone silently.',
      },
    ],
  },
  {
    version: '2026.08',
    date: '2026-08-12',
    title: 'Storage quotas and upload validation',
    items: [
      {
        type: 'Added',
        text: 'Workspaces now show their document storage quota and how much of it is used, so approaching a limit is something you see coming rather than discover during an upload.',
      },
      {
        type: 'Improved',
        text: 'Uploads are validated after they land by reading the stored bytes back: size caps, magic-byte sniffing, a MIME denylist, SVG sanitization and image-spoof detection. Anything that fails validation is deleted rather than quarantined.',
      },
      {
        type: 'Fixed',
        text: 'Attachments on weekly timesheets kept their original filename but lost their content type in some uploads, which made them download as a generic file. Content type is now preserved from the validated bytes.',
      },
    ],
  },
  {
    version: '2026.06',
    date: '2026-06-30',
    title: 'Automatic payslip reading',
    items: [
      {
        type: 'Added',
        text: 'Existing payslip documents can now be read automatically to pull their figures out, so moving historical pay data into a new workspace no longer means retyping it line by line.',
      },
      {
        type: 'Improved',
        text: 'Salary breakdowns are shown on the payslip itself rather than only in the payroll run, so an employee asking why a number is what it is has the answer on the document.',
      },
    ],
  },
  {
    version: '2026.05',
    date: '2026-05-19',
    title: 'Threaded support conversations',
    items: [
      {
        type: 'Added',
        text: 'The internal help desk now keeps the full exchange on a ticket as a threaded support conversation, so the context of an answer lives in one place instead of being scattered across messages.',
      },
      {
        type: 'Improved',
        text: 'Employees can see the state of their own tickets in the self-service portal, which removes most of the follow-up chasing a help desk otherwise generates.',
      },
    ],
  },
  {
    version: '2026.03',
    date: '2026-03-11',
    title: 'Dual payslip formats',
    items: [
      {
        type: 'Added',
        text: 'A second payslip PDF format: a US-style layout carrying the fields a US payslip is expected to carry, alongside the existing standard format. The format is chosen per employee, so a team spanning payroll conventions is handled without a workaround.',
      },
      {
        type: 'Improved',
        text: 'Generated PDFs — payslips, client invoices and HR letters — now all draw the accent from your workspace brand color, so every document an employee or client receives looks like it came from your company.',
      },
    ],
  },
  {
    version: '2026.01',
    date: '2026-01-28',
    title: 'Google sign-in',
    items: [
      {
        type: 'Added',
        text: 'Sign in with Google, so getting into a workspace does not have to start with another password. Existing email and password sign-in is unchanged.',
      },
      {
        type: 'Improved',
        text: 'Deactivation now takes effect immediately. Permissions are re-checked from the database on every request rather than trusted from an auth token issued earlier, closing the window where a deactivated account still worked until its session expired.',
      },
    ],
  },
  {
    version: '2025.12',
    date: '2025-12-09',
    title: 'Recruiter access, toggleable per job',
    items: [
      {
        type: 'Added',
        text: 'Recruiters are now a role of their own, with scoped access to the hiring side and nothing else. That access is toggleable per job, so a recruiter working one opening does not see the rest of the pipeline or the rest of the organization.',
      },
      {
        type: 'Added',
        text: 'Placements tracking for firms that place people on client engagements. A placement is its own record rather than something inferred from a hire.',
      },
      {
        type: 'Improved',
        text: 'The talent pool keeps candidates who were not right for one role available for the next one, so an opening can start with people you have already met.',
      },
    ],
  },
  {
    version: '2025.10',
    date: '2025-10-21',
    title: 'Timezone-correct attendance dates',
    items: [
      {
        type: 'Fixed',
        text: 'Attendance calendar days are now computed in the organization timezone rather than the server timezone. Teams outside UTC could previously see a morning clock-in filed under the previous day, which propagated into attendance reports and payroll hours.',
      },
      {
        type: 'Improved',
        text: 'Leave days and calendar events now derive their dates from the same organization timezone setting, so an approved day off and a missing attendance record describe the same date.',
      },
      {
        type: 'Added',
        text: 'A day-by-day attendance sheet that reads across dates rather than down a single employee, which is the view most teams want when reconciling a month.',
      },
    ],
  },
  {
    version: '2025.08',
    date: '2025-08-14',
    title: 'Custom domains for careers pages',
    items: [
      {
        type: 'Added',
        text: 'Point your own custom domain at your public job board from workspace settings, so your careers page lives on your brand and the search ranking it earns accrues to you.',
      },
      {
        type: 'Improved',
        text: 'The public job board is built to be crawled and indexed, with per-posting pages that a search for the role can actually find.',
      },
    ],
  },
]
