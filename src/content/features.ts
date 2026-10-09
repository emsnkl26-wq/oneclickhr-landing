import {
  BellRing,
  CalendarDays,
  ClipboardList,
  Clock,
  FileSignature,
  FileSpreadsheet,
  LifeBuoy,
  Receipt,
  Settings2,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
  Wallet,
} from 'lucide-react'
import type { Feature } from './types'

export const features: Feature[] = [
  {
    slug: 'attendance',
    name: 'Attendance',
    title: 'Attendance and time tracking',
    icon: Clock,
    summary: 'Clock in and out, shift toggling, late-login detection, and a day-by-day sheet.',
    metaDescription:
      'Clock in and out, toggle shifts, catch late logins and read a day-by-day attendance sheet. Calendar days are computed in your own organization timezone.',
    heroHeadline: 'Attendance that files the day in your timezone, not the server’s',
    heroBody:
      'Employees clock in and out, switch shifts, and see their own history. You get org-wide views and a day-by-day sheet. The calendar date is derived in your organization’s timezone, so a 9am start never lands on yesterday.',
    problem: {
      heading: 'The quiet bug in most attendance tools',
      paragraphs: [
        'Attendance looks like the simplest thing an HR system does, and it is usually the first thing that goes wrong. The reason is almost always the same: a clock-in is stored as an instant in time, then the calendar day gets derived from whatever timezone the server happens to be in. For a team in New York clocking in at 9am, a server running in UTC reads that moment as 1pm — fine. For a team in Manila or Mumbai clocking in at 9am, the same server reads it as the previous evening, and the shift gets filed under yesterday.',
        'Nobody notices on day one. They notice at the end of the month, when the attendance report has a phantom absence, overtime lands in the wrong week, and someone has to reconstruct a timeline from memory. By then the payroll run has already consumed the bad numbers.',
        'OneclickHR takes the organization timezone as the authority. Every attendance record carries the instant it happened and the calendar day it belongs to, and that day is computed from the timezone configured in your workspace settings. Reports, sheets, histories and payroll all read the same day.',
      ],
    },
    capabilities: [
      {
        title: 'Clock in and clock out',
        body: 'One action to start the day and one to end it, from the employee portal. The current state is always visible, so nobody has to guess whether they are clocked in.',
      },
      {
        title: 'Shift toggling',
        body: 'Teams that run more than one shift can switch between them rather than keeping a separate record per shift. The attendance entry carries which shift it belongs to.',
      },
      {
        title: 'Late-login detection',
        body: 'A clock-in after the expected start is flagged as late when it is recorded, not calculated after the fact in a spreadsheet. The flag travels with the record.',
      },
      {
        title: 'Per-employee history',
        body: 'Every employee can read their own attendance history in their portal: what day, what time in, what time out, which shift, and whether it was marked late.',
      },
      {
        title: 'Organization-wide views',
        body: 'Managers see attendance across the whole workspace, scoped by the permissions on their team role. A payroll person and a recruiter do not see the same screen.',
      },
      {
        title: 'Day-by-day attendance sheet',
        body: 'A sheet view that reads across dates rather than down a single employee — the view you actually want when you are reconciling a month.',
      },
    ],
    detail: {
      heading: 'How it fits the rest of the month',
      paragraphs: [
        'Attendance is not an island. The hours recorded here are the hours the payroll run reads when it calculates overtime, and the days recorded here are the days that leave requests have to agree with. Because all three read the same calendar day from the same timezone setting, there is nothing to reconcile between them.',
        'Leave approved on the shared calendar shows up against the same dates the attendance sheet uses. Overtime rules configured in workspace settings apply to the hours as recorded. When the payroll review step shows you a number you did not expect, you can trace it back to a specific day on a specific sheet rather than guessing.',
      ],
    },
    visual: 'attendance',
    related: ['leave', 'payroll', 'timesheets', 'employee-portal'],
  },
  {
    slug: 'leave',
    name: 'Leave',
    title: 'Leave management',
    icon: CalendarDays,
    summary: 'Requests, approvals, balances and history — visible on the shared calendar.',
    metaDescription:
      'Employees request leave, managers approve or decline, balances and history stay current, and approved leave appears on the shared organization calendar.',
    heroHeadline: 'Leave requests that end in a decision, not a thread',
    heroBody:
      'An employee requests leave from their portal. The manager approves or declines it. The balance updates, the history records it, and the approved days appear on the shared organization calendar where the rest of the team can see them.',
    problem: {
      heading: 'Leave by email is a liability',
      paragraphs: [
        'Leave handled over email or chat has three failure modes, and most teams hit all three. Requests get lost in an inbox, so an employee takes the day assuming silence meant yes. Balances live in a spreadsheet that one person maintains, so nobody else can answer "how many days do I have left" without asking. And the team calendar never learns about any of it, so two people on the same two-person function book the same week off.',
        'The fix is not more process. It is making the request, the decision, the balance and the calendar the same record instead of four copies of it.',
      ],
    },
    capabilities: [
      {
        title: 'Employee-initiated requests',
        body: 'Employees raise their own leave requests from the self-service portal, with the dates and the reason attached. No form to download, no manager to chase.',
      },
      {
        title: 'Approve or decline',
        body: 'Managers act on a request directly. The outcome is recorded against the request, so there is always an answer to "who approved this, and when".',
      },
      {
        title: 'Balances that stay current',
        body: 'Taking leave moves the balance. Employees read their own balance in the portal without asking anyone, and the number does not depend on a spreadsheet being up to date.',
      },
      {
        title: 'Full leave history',
        body: 'Every request, with its dates and its outcome, stays on the record. Useful at review time and essential when someone questions a payroll line.',
      },
      {
        title: 'On the shared calendar',
        body: 'Approved leave lands on the same organization calendar that carries meetings and events, so an absence is visible before someone schedules over it.',
      },
      {
        title: 'Agrees with attendance',
        body: 'Leave days and attendance days are computed from the same organization timezone, so an approved day off and a missing attendance record describe the same date.',
      },
    ],
    detail: {
      heading: 'Who can see and do what',
      paragraphs: [
        'Leave is one of the places where permissions matter most. Employees see their own requests, their own balance and their own history — never anybody else’s. Managers see what their team role grants them, which you configure in workspace settings with permission presets rather than by hand-assigning capabilities one at a time.',
        'That boundary is not enforced by the screen. It is enforced in the database with Row Level Security, which means a query that forgot its filter still cannot return another employee’s leave record. The same rule protects an employee’s leave from a different organization entirely.',
      ],
    },
    visual: 'leave',
    related: ['attendance', 'calendar', 'employee-portal', 'settings'],
  },
  {
    slug: 'payroll',
    name: 'Payroll',
    title: 'Payroll and payslips',
    icon: Wallet,
    summary:
      'Payroll runs with a review step, overtime rules, multi-currency, two payslip formats.',
    metaDescription:
      'Run payroll with a review step before anything finalizes. Configurable schedules, overtime rules, multi-currency, breakdowns and two payslip PDF formats.',
    heroHeadline: 'A payroll run you get to read before it is final',
    heroBody:
      'Payroll in OneclickHR has a review step. You see the run — every line, every breakdown — before anything is finalized. Pay schedules, overtime rules and currency are configured once in your workspace and applied every cycle.',
    problem: {
      heading: 'The most expensive button in HR software',
      paragraphs: [
        'Payroll is the one process where a mistake costs real money and real trust. An employee underpaid by a hundred dollars does not file a bug report; they lose confidence in the company. An employee overpaid has to be asked to give money back, which is worse.',
        'Most of these mistakes are not calculation errors. They are input errors — a wrong hours total, an overtime rule that did not apply, a currency that got assumed. The calculation was right; it was fed the wrong thing. Which is why the single most useful feature in a payroll module is not the math. It is the moment before the math becomes final.',
        'OneclickHR puts a review step in front of every run. Nothing finalizes until you have looked at it.',
      ],
    },
    capabilities: [
      {
        title: 'Payroll runs with a review step',
        body: 'Build a run, read it, then finalize it. The review is a stage in the process, not an optional report you have to remember to open.',
      },
      {
        title: 'Configurable pay schedules',
        body: 'Set the cadence your organization actually pays on in workspace settings, and runs follow it rather than assuming a monthly cycle.',
      },
      {
        title: 'Overtime rules',
        body: 'Overtime policy lives in workspace settings and applies to the hours recorded in attendance and timesheets, so the rule is written down once instead of applied from memory.',
      },
      {
        title: 'Multi-currency',
        body: 'Pay people in the currency they are paid in. Salary figures and payslips carry their currency rather than defaulting to one and hoping.',
      },
      {
        title: 'Salary breakdowns',
        body: 'Each payslip shows its components rather than a single net figure, so an employee asking "why is this number what it is" has an answer on the document itself.',
      },
      {
        title: 'Two payslip PDF formats',
        body: 'A standard format, and a US-style format carrying the fields a US payslip is expected to carry. Pick the one that matches where the employee is paid.',
      },
      {
        title: 'Reading existing payslips',
        body: 'Payslip documents you already have can be read automatically to pull the figures out, so moving historical pay data in does not mean retyping it line by line.',
      },
      {
        title: 'Delivered to the employee portal',
        body: 'Payslips land in the employee’s own portal. They do not have to email anyone to get a copy of a document about their own pay.',
      },
    ],
    detail: {
      heading: 'Where the numbers come from',
      paragraphs: [
        'A payroll run reads the hours recorded in attendance and the hours submitted on timesheets, applies the overtime policy configured in your workspace, and uses the salary and currency on the employee record. Every one of those inputs is visible before you finalize, which is the point of the review step: when a line looks wrong, you can follow it back to the day it came from.',
        'Because attendance days are computed in your organization’s timezone, the hours a run consumes belong to the days you think they belong to. This is not a detail. A shift that drifted into the wrong calendar day is the most common cause of a payroll figure nobody can explain.',
        'Finalized payslips go to the employee’s self-service portal as PDFs, carrying your brand color, in whichever of the two formats you chose.',
      ],
    },
    visual: 'payslip',
    related: ['attendance', 'timesheets', 'invoicing', 'employee-portal'],
  },
  {
    slug: 'timesheets',
    name: 'Timesheets',
    title: 'Timesheets',
    icon: FileSpreadsheet,
    summary: 'Weekly submission with attachments, approval flow, and project or client allocation.',
    metaDescription:
      'Weekly timesheet submission with file attachments, a manager approval flow, and project or client allocation. Built for teams who bill their own time.',
    heroHeadline: 'Weekly timesheets for teams who bill their hours',
    heroBody:
      'Employees submit a week at a time, attach supporting files, and allocate hours to a project or a client. Managers approve. The approved hours feed payroll and the invoices you send.',
    problem: {
      heading: 'When hours are revenue, the spreadsheet stops being enough',
      paragraphs: [
        'For a company that bills time, a timesheet is not an HR artifact. It is the input to an invoice. Hours that are wrong, late, or unallocated do not just distort a report — they distort what a client gets billed and what the company gets paid.',
        'Spreadsheets handle the arithmetic fine and fail everywhere else. There is no approval, so nobody has signed off on the numbers. There is nowhere to put the supporting file a client asked for. Allocation to a project is a column someone fills in inconsistently. And when a week is missing, nothing tells you.',
        'OneclickHR treats a timesheet as a submission with a state: drafted, submitted, approved. Hours carry their project and client. Attachments stay with the week they belong to.',
      ],
    },
    capabilities: [
      {
        title: 'Weekly submission',
        body: 'A timesheet is a week, submitted as a unit. That matches how billing cycles and approvals actually work, and makes a missing week obvious.',
      },
      {
        title: 'File attachments',
        body: 'Attach the supporting documents to the timesheet itself — a signed sheet, a client approval, a receipt — so evidence and hours do not live in different places.',
      },
      {
        title: 'Approval flow',
        body: 'Submitted timesheets go to a manager for approval. Approved hours are the ones downstream processes read; unapproved hours stay out of payroll and invoices.',
      },
      {
        title: 'Project and client allocation',
        body: 'Hours are allocated to a project or a client as they are entered, which is what makes a client invoice something you can generate rather than assemble.',
      },
      {
        title: 'Feeds payroll',
        body: 'Approved timesheet hours are available to the payroll run, under the same overtime rules configured in your workspace.',
      },
      {
        title: 'Feeds invoicing',
        body: 'Allocated, approved hours are the basis for a client invoice, so what you bill traces back to a specific approved week.',
      },
    ],
    detail: {
      heading: 'Built for staffing and consulting',
      paragraphs: [
        'Timesheets are the module staffing and consulting firms live in. A firm placing people on client engagements needs to know, every week, who worked where and for how long — and needs someone to have approved it before it turns into an invoice.',
        'Project and client allocation is what makes the rest of the chain work. Hours tagged to a client become invoice lines. Placements tracking in the recruiting module records who is on which engagement. The finance overview rolls the numbers up so you can see the month without exporting anything.',
      ],
    },
    visual: 'timesheet',
    related: ['invoicing', 'payroll', 'tasks', 'recruiting'],
  },
  {
    slug: 'invoicing',
    name: 'Invoicing & finance',
    title: 'Invoicing and finance',
    icon: Receipt,
    summary: 'Client invoices as PDFs, an invoice workspace, expenses, and a finance overview.',
    metaDescription:
      'Generate client invoices as branded PDFs, track them in an invoice workspace, record expenses, and read a finance overview that rolls the numbers up.',
    heroHeadline: 'Invoices that come from the hours you already approved',
    heroBody:
      'Generate client invoices as PDFs, track them in an invoice workspace, record expenses against the organization, and read a finance overview that rolls it all up.',
    problem: {
      heading: 'The gap between approved hours and a sent invoice',
      paragraphs: [
        'In most firms, there is a person whose job is the gap. Timesheets are approved in one system. Invoices are built in another, by hand, by copying numbers across. Expenses are in a third place, usually a folder of receipts. And the answer to "how did the month go" requires all three to be exported and joined in a spreadsheet.',
        'OneclickHR closes the gap by keeping the chain in one workspace. Approved timesheet hours carry their client and project. An invoice is generated from them as a PDF. The invoice workspace tracks what has been raised. Expenses are recorded in the same place. The finance overview reads all of it.',
      ],
    },
    capabilities: [
      {
        title: 'Client invoices as PDFs',
        body: 'Generate an invoice as a PDF document carrying your brand color, ready to send to the client.',
      },
      {
        title: 'Invoice workspace',
        body: 'One place to see the invoices you have raised and where each one stands, rather than a folder of files and a memory of what was sent.',
      },
      {
        title: 'Expenses',
        body: 'Record expenses against the organization so the cost side of the month is in the same system as the revenue side.',
      },
      {
        title: 'Finance overview',
        body: 'A rolled-up view of the numbers — what has been invoiced, what has been spent — without exporting anything to a spreadsheet first.',
      },
      {
        title: 'Traceable to approved hours',
        body: 'Because invoices draw on timesheet hours that a manager approved and allocated to a client, a line on an invoice has a week behind it.',
      },
      {
        title: 'Your branding, on the document',
        body: 'Invoices carry the brand color set in workspace settings, the same color used across the app, emails and payslips.',
      },
    ],
    detail: {
      heading: 'What this module is and is not',
      paragraphs: [
        'This is invoicing: raising client invoices, tracking them, recording expenses, and seeing the totals. It is the finance side of a services business that bills for time.',
        'It is worth being explicit about what it is not. OneclickHR has no billing or subscription module — it does not charge your clients’ cards, run a payment gateway, or manage recurring subscriptions on your behalf. It produces the invoice and tracks it; collection happens wherever you already collect.',
      ],
    },
    visual: 'invoice',
    related: ['timesheets', 'payroll', 'settings', 'documents'],
  },
  {
    slug: 'work-authorization',
    name: 'Work authorization',
    title: 'Work authorization (H-1B) tracking',
    icon: ShieldCheck,
    summary: 'Track work authorization records and expiry dates, with milestone reminder emails.',
    metaDescription:
      'Track work authorization records and expiry dates with automatic milestone reminder emails. Each reminder is sent exactly once: no duplicates, no misses.',
    heroHeadline: 'Expiry dates that email you before they matter',
    heroBody:
      'Keep work authorization records with their expiry dates, and let the system send milestone reminders as an expiry approaches. Each reminder is sent exactly once — guaranteed, not best-effort.',
    problem: {
      heading: 'A date in a spreadsheet is not a reminder',
      paragraphs: [
        'Work authorization expiry is the kind of deadline that is obvious in hindsight and invisible in advance. The date is known months ahead. It sits in a spreadsheet column. And then a quarter passes, and someone realizes it six weeks too late to do anything calm about it.',
        'A calendar reminder is better, until the person who set it changes role. What is actually needed is a reminder the system owns: tied to the record rather than to a person, fired on a schedule, and reliable enough that nobody feels the need to keep a private backup spreadsheet.',
        'Reliability is the whole feature. A reminder system that sometimes sends twice trains people to ignore it. One that sometimes sends nothing is worse than none at all, because it has replaced the vigilance it failed to provide.',
      ],
    },
    capabilities: [
      {
        title: 'Work authorization records',
        body: 'Keep the record alongside the employee it belongs to, with the expiry date as structured data rather than a note in a field.',
      },
      {
        title: 'Expiry date tracking',
        body: 'Upcoming expiries are visible as data you can act on, not something you have to go looking for.',
      },
      {
        title: 'Automatic milestone reminders',
        body: 'As an expiry approaches, reminder emails go out at milestones ahead of the date, so there is runway to act rather than a deadline to react to.',
      },
      {
        title: 'Sent exactly once',
        body: 'Each milestone reminder is sent once and only once. No duplicates from a retried job, and no silent miss from one that failed halfway.',
      },
      {
        title: 'Monitored scheduled jobs',
        body: 'The jobs that send these reminders record the outcome of every run. A failure is loud rather than a green tick, so a quiet breakage cannot hide.',
      },
      {
        title: 'Transactional email delivery',
        body: 'Reminders are sent through the same transactional email path as the rest of the product’s notifications, carrying your brand color.',
      },
    ],
    detail: {
      heading: 'What this is, precisely',
      paragraphs: [
        'This module is record-keeping and expiry reminders. It keeps work authorization records with their dates, and it makes sure the right people hear about an approaching expiry in time.',
        'It is not an immigration filing workflow. It does not prepare or submit petitions, it is not an I-9 verification system, and it does not give immigration advice. If you need those, you need counsel and a filing service; OneclickHR is the layer that makes sure the date does not surprise you, and keeps the records in the same workspace as the rest of the employee’s information.',
        'Being clear about that boundary is deliberate. Over-promising on a compliance-adjacent feature is how HR software gets trusted with something it cannot actually do.',
      ],
    },
    visual: 'work-auth',
    related: ['documents', 'notifications', 'employee-portal', 'settings'],
  },
  {
    slug: 'tasks',
    name: 'Tasks & projects',
    title: 'Tasks and project boards',
    icon: ClipboardList,
    summary:
      'Kanban boards with drag-and-drop that update live for everyone, plus per-employee lists.',
    metaDescription:
      'Kanban boards with drag-and-drop that update live for everyone on the board, projects to group the work, and a task list on every employee portal.',
    heroHeadline: 'Boards that move for everyone at once',
    heroBody:
      'Kanban boards with drag-and-drop, grouped into projects. A card moved on one screen moves on every screen watching that board. Each employee sees their own assigned tasks in their portal.',
    problem: {
      heading: 'Work tracking that lives next to the people doing it',
      paragraphs: [
        'Most companies run their work in one tool and their people in another. It mostly works, and the cost shows up at the edges: a task assigned to someone who is on approved leave next week, a board that still has a departed employee’s name on four cards, a new joiner who has to be invited to a second system before they can see what they are meant to be doing.',
        'When tasks live in the same workspace as the employee records, those edges close. Assignment knows who works here. Deactivating an employee is one action, not two. And the task list in someone’s portal sits next to their leave, their timesheet and their payslips — the whole of their working week in one place.',
      ],
    },
    capabilities: [
      {
        title: 'Kanban boards',
        body: 'Columns and cards, the shape most teams already think in. No setup ceremony before the board is useful.',
      },
      {
        title: 'Drag-and-drop',
        body: 'Move a card by dragging it. The change is persisted as it happens rather than waiting for a save.',
      },
      {
        title: 'Live for everyone on the board',
        body: 'A move updates for every person currently viewing that board, so two people working the same board are never looking at different states of it.',
      },
      {
        title: 'Projects',
        body: 'Group boards and work under a project, which is also the unit timesheets allocate hours to.',
      },
      {
        title: 'Per-employee task lists',
        body: 'Every employee sees the tasks assigned to them in their self-service portal, without needing access to every board in the organization.',
      },
      {
        title: 'Scoped by role',
        body: 'What a person can see and move follows the permissions on their team role, enforced in the database rather than in the interface.',
      },
    ],
    detail: {
      heading: 'Projects as the shared spine',
      paragraphs: [
        'A project in OneclickHR is more than a folder for cards. It is the thing timesheet hours are allocated to, which means it is also the thing client invoices are built from. A consulting firm can run the engagement as a project board, have the team log hours against that project, and raise the client invoice from the approved hours.',
        'Live updates are built on the same realtime layer the rest of the product uses, so the board behaves the way people now expect a board to behave — without a refresh button and without two people overwriting each other.',
      ],
    },
    visual: 'kanban',
    related: ['timesheets', 'employee-portal', 'invoicing', 'notifications'],
  },
  {
    slug: 'recruiting',
    name: 'Recruiting',
    title: 'Recruiting and the public job board',
    icon: Users,
    summary:
      'An SEO-friendly careers board on your own domain, applications, talent pool, placements.',
    metaDescription:
      'Post jobs to a public, SEO-friendly careers board on your own branded domain. Candidates apply directly, and recruiters get access scoped per job.',
    heroHeadline: 'A careers page on your domain, not someone else’s',
    heroBody:
      'Post jobs to a public, SEO-friendly careers board on your own branded page — and on your own custom domain. Candidates apply directly with a lightweight account. Track applications, keep a talent pool, and give recruiters access scoped per job.',
    problem: {
      heading: 'Why the careers page should be yours',
      paragraphs: [
        'A job posted on a third-party board is a rental. The traffic belongs to the board, the search ranking belongs to the board, and the candidate’s first impression of your company is a listing that looks like every other listing on that page.',
        'A careers page on your own domain is an asset. It accumulates search ranking that stays yours. It looks like your company, because it carries your brand color. And a candidate who lands on it is already on your site rather than one click away from a competitor’s posting.',
        'OneclickHR gives you that page, generated from the jobs you post, served on a custom domain you point at it, and built to be indexed.',
      ],
    },
    capabilities: [
      {
        title: 'Public, SEO-friendly job board',
        body: 'Posted jobs become a public careers board built to be crawled and indexed, so a search for the role can find your posting.',
      },
      {
        title: 'Your branded page, your custom domain',
        body: 'The board carries your brand color, and you can point your own custom domain at it from workspace settings.',
      },
      {
        title: 'Candidates apply directly',
        body: 'A candidate applies through the board with their own lightweight external account — no organization seat, no access to anything but their own application.',
      },
      {
        title: 'Application tracking',
        body: 'Applications are tracked against the job they came in on, so the state of a pipeline is a screen rather than an inbox.',
      },
      {
        title: 'Talent pool',
        body: 'Keep good candidates who were not right for one role, so the next opening starts with people you have already met.',
      },
      {
        title: 'Recruiter access, scoped per job',
        body: 'Recruiters get access to the hiring side only, and that access is toggleable per job. A recruiter working one role does not see the rest of the organization.',
      },
      {
        title: 'Placements tracking',
        body: 'For firms that place people on client engagements, placements are tracked as their own thing rather than inferred from a hire.',
      },
      {
        title: 'An internal job board too',
        body: 'Employees see an internal job board in their own portal, so an opening can be filled from inside before it goes out.',
      },
    ],
    detail: {
      heading: 'Four kinds of people, four kinds of access',
      paragraphs: [
        'Recruiting is where OneclickHR’s role model earns its keep. An organization admin configures everything. An employee sees the internal board. A recruiter sees the hiring side, for the specific jobs you toggled them onto. A candidate is external entirely — their own lightweight account, visibility of their own application, and nothing else.',
        'Those boundaries are enforced by Row Level Security in the database, not by hiding buttons. A recruiter’s token carries their organization and role, and the database decides what rows they can read. Toggle a recruiter off a job and the access is gone on the next request, because access is re-checked from the database rather than trusted from an old token.',
      ],
    },
    visual: 'jobs',
    related: ['settings', 'documents', 'onboarding', 'employee-portal'],
  },
  {
    slug: 'documents',
    name: 'Documents & letters',
    title: 'Documents and HR letters',
    icon: FileSignature,
    summary: 'Generate HR letters from templates as PDFs, with a per-employee document store.',
    metaDescription:
      'Generate offer letters, verification letters and other HR letters from templates as branded PDFs, and keep a document store per employee with a quota.',
    heroHeadline: 'Letters generated from templates, filed where they belong',
    heroBody:
      'Generate HR letters — offer letters, verification letters and the like — from templates, as PDFs carrying your brand. Each employee has a document store, and you can see how much of your storage quota is used.',
    problem: {
      heading: 'The letter that takes forty minutes',
      paragraphs: [
        'Someone asks for an employment verification letter. The last one is in a folder somewhere, or in an email thread. It gets copied, the name gets changed, and ideally every other detail gets changed too — but that is a manual pass, and manual passes are where a previous employee’s salary ends up in a current employee’s letter.',
        'Generating the letter from a template and the employee record removes the copy-paste step entirely. The letter carries the right name, the right details and your brand, because it was built from data rather than from the last one.',
      ],
    },
    capabilities: [
      {
        title: 'HR letters from templates',
        body: 'Offer letters, verification letters and similar documents generated from a template rather than copied from the last one.',
      },
      {
        title: 'PDF output',
        body: 'Letters come out as PDFs carrying the brand color set in workspace settings, consistent with payslips and invoices.',
      },
      {
        title: 'Per-employee document store',
        body: 'Each employee has their own store for the documents that belong to them, visible in their self-service portal.',
      },
      {
        title: 'Visible storage quota',
        body: 'You can see how much of your storage you have used, so running out is something you see coming rather than something you discover during an upload.',
      },
      {
        title: 'Uploads validated after they land',
        body: 'Files are checked by reading the stored bytes back — size, magic bytes, MIME type, SVG sanitization, image-spoof detection. Anything that fails is deleted.',
      },
      {
        title: 'Isolated per organization',
        body: 'Documents are tenant-scoped in the database, so another organization’s files are unreachable even by direct id.',
      },
    ],
    detail: {
      heading: 'Where files actually live',
      paragraphs: [
        'Documents are stored on Cloudflare R2, with the metadata and the access rules in Postgres. That separation is what makes the per-employee store enforceable: whether you can read a file is decided by a database row governed by Row Level Security, not by whether you happen to have a URL.',
        'Validation runs after the upload completes, against the bytes as stored rather than against what the browser claimed during the upload. That ordering matters. A file renamed to look like a PNG is caught by sniffing its magic bytes once it has landed, and an SVG is sanitized rather than trusted. Anything that fails validation is deleted rather than quarantined and forgotten.',
      ],
    },
    visual: 'documents',
    related: ['work-authorization', 'recruiting', 'employee-portal', 'settings'],
  },
  {
    slug: 'calendar',
    name: 'Meetings & calendar',
    title: 'Meetings and calendar',
    icon: CalendarDays,
    summary: 'A shared organization calendar with Google Calendar sync and meeting invites.',
    metaDescription:
      'A shared organization calendar covering meetings, leave and events, with Google Calendar sync and meeting invites so nothing lives in only one place.',
    heroHeadline: 'One calendar for meetings, leave and events',
    heroBody:
      'A shared organization calendar that carries meetings, approved leave and events together, with Google Calendar sync and meeting invites so the people who need the event have it where they already look.',
    problem: {
      heading: 'Two calendars means neither is true',
      paragraphs: [
        'HR systems that keep their own calendar create a second source of truth, and a second source of truth is just a place for things to disagree. Approved leave sits in the HR tool. The team’s actual week sits in Google Calendar. Somebody books a meeting over somebody else’s approved time off, because the two calendars never spoke.',
        'The useful version is one calendar that knows about everything and syncs with the calendar people already have open.',
      ],
    },
    capabilities: [
      {
        title: 'Shared organization calendar',
        body: 'One calendar for the workspace, covering meetings, approved leave and events rather than one view per type.',
      },
      {
        title: 'Google Calendar sync',
        body: 'Sync with Google Calendar, so what is on the organization calendar is visible where people already look at their day.',
      },
      {
        title: 'Meeting invites',
        body: 'Invite the people a meeting concerns, so a scheduled meeting reaches them rather than waiting to be noticed.',
      },
      {
        title: 'Approved leave appears automatically',
        body: 'Leave that a manager approved lands on the calendar as a matter of course, which is how it stops being booked over.',
      },
      {
        title: 'Timezone-correct dates',
        body: 'Calendar days follow the organization timezone, the same setting attendance uses, so an event is on the day everyone agrees it is on.',
      },
      {
        title: 'In the employee portal',
        body: 'Employees see their meetings in their own portal, alongside their leave, tasks and timesheets.',
      },
    ],
    detail: {
      heading: 'Integration without lock-in',
      paragraphs: [
        'Google Calendar sync is the integration most teams actually need, because it is the calendar they actually use. The tokens that make it work are encrypted with AES-256 before they are stored, and the service refuses to start on a malformed encryption key rather than quietly falling back to something weaker.',
        'Everything else on the calendar is generated from data already in your workspace — approved leave, scheduled meetings, organization events — so the calendar does not need maintaining as a separate artifact.',
      ],
    },
    visual: 'calendar',
    related: ['leave', 'employee-portal', 'notifications', 'settings'],
  },
  {
    slug: 'helpdesk',
    name: 'Help desk',
    title: 'Help desk and support',
    icon: LifeBuoy,
    summary: 'An internal help desk where employees raise tickets, with threaded conversations.',
    metaDescription:
      'An internal help desk where employees raise tickets and the conversation stays threaded, so an HR question has a place to go other than a direct message.',
    heroHeadline: 'Somewhere for the question to go',
    heroBody:
      'An internal help desk where employees raise tickets, and the back-and-forth stays on the ticket as a threaded support conversation.',
    problem: {
      heading: 'HR questions arrive as direct messages',
      paragraphs: [
        'Every HR team has the same unmeasured workload: questions that arrive as direct messages. "What is my leave balance?" "Can I get a verification letter?" "Why is this payslip line different?" Each one is small. Together they are most of a job, and none of it is visible, assignable or searchable.',
        'The messages also mean the answer is only in one person’s inbox. When they are on leave, the question waits. When they leave, the answer goes with them.',
        'A help desk inside the HR system fixes the visibility problem and the single-point problem at once. The ticket is a record, the thread is on the record, and the employee can see where their question stands.',
      ],
    },
    capabilities: [
      {
        title: 'Employees raise tickets',
        body: 'Employees open a ticket from their own portal, so the request has a destination that is not a specific person.',
      },
      {
        title: 'Threaded support conversations',
        body: 'The exchange stays threaded on the ticket, so the full context of an answer is in one place rather than scattered across messages.',
      },
      {
        title: 'Visible to the employee',
        body: 'The employee can see their own tickets and where each one stands, which removes most of the follow-up chasing.',
      },
      {
        title: 'Scoped by team role',
        body: 'Who can see and answer tickets follows the permissions on their team role, configured with presets in workspace settings.',
      },
      {
        title: 'Isolated per organization',
        body: 'Tickets are tenant-scoped in the database. An organization’s support conversations are unreachable from any other workspace.',
      },
      {
        title: 'Notified in-app and by email',
        body: 'Activity on a ticket reaches people through in-app notifications, web push and transactional email.',
      },
    ],
    detail: {
      heading: 'Why it belongs in the HR system',
      paragraphs: [
        'Most of the questions an internal help desk receives are about data the HR system already holds. A ticket raised from the same portal that shows the employee their leave balance, their payslips and their documents is a ticket that can be answered without switching tools or asking the employee to re-explain who they are.',
        'It also means the support history sits next to the employee record, which is useful the third time the same question comes up.',
      ],
    },
    visual: 'helpdesk',
    related: ['employee-portal', 'notifications', 'settings', 'onboarding'],
  },
  {
    slug: 'notifications',
    name: 'Notifications',
    title: 'Notifications',
    icon: BellRing,
    summary: 'In-app notifications, web push, and transactional email that carries your brand.',
    metaDescription:
      'In-app notifications, web push and transactional email, so an approval, a payslip or an expiry reminder reaches the right person without being chased.',
    heroHeadline: 'The things that need an answer find the person',
    heroBody:
      'In-app notifications for what is happening in the workspace, web push for what cannot wait until someone opens a tab, and transactional email carrying your brand color.',
    problem: {
      heading: 'Most HR delays are notification failures',
      paragraphs: [
        'A leave request waiting four days was not a hard decision. Nobody knew it was there. A timesheet missing from a billing cycle was not a refusal. Nobody was told. Almost every delay in an HR process is a notification that did not arrive, and the workaround is a person whose job is reminding people.',
        'OneclickHR sends across three channels because the right channel depends on the thing. In-app for what you catch when you are in the product. Web push for what should not wait for that. Email for what needs to exist outside the app — a payslip, an expiry reminder, an invite.',
      ],
    },
    capabilities: [
      {
        title: 'In-app notifications',
        body: 'What happened in the workspace, where the work is, so opening the product tells you what needs you.',
      },
      {
        title: 'Web push',
        body: 'Push notifications to the browser for the things that should not wait until someone next opens a tab.',
      },
      {
        title: 'Transactional email',
        body: 'Email for the things that need to exist outside the app, sent through Resend and carrying your brand color.',
      },
      {
        title: 'Milestone reminders',
        body: 'Work authorization expiry reminders go out at milestones ahead of the date, each one sent exactly once.',
      },
      {
        title: 'Monitored delivery jobs',
        body: 'The scheduled jobs behind reminders record the outcome of every run, so a failure is visible rather than silent.',
      },
      {
        title: 'Your branding, in the inbox',
        body: 'Emails carry the brand color from workspace settings, so a payslip notification looks like it came from your company.',
      },
    ],
    detail: {
      heading: 'Exactly once, on purpose',
      paragraphs: [
        'Delivery guarantees sound like an implementation detail until a reminder system sends the same expiry warning four times and people start filtering it. Milestone reminders in OneclickHR are sent exactly once per milestone — not at-least-once with duplicates, and not at-most-once with silent misses.',
        'That holds because the send is recorded as part of the same work that performs it, and because the scheduled jobs that do the sending report the outcome of every run. A job that fails is loud. A green tick means the work happened.',
      ],
    },
    visual: 'notifications',
    related: ['work-authorization', 'helpdesk', 'leave', 'settings'],
  },
  {
    slug: 'onboarding',
    name: 'Onboarding',
    title: 'Onboarding',
    icon: Sparkles,
    summary: 'A guided flow for new employees and for setting up a brand-new workspace.',
    metaDescription:
      'A guided onboarding flow for new employees finding their way around, and for an organization setting up a brand-new workspace for the very first time.',
    heroHeadline: 'Guided for the new employee, and for the new workspace',
    heroBody:
      'Two onboarding flows, because two different people are starting. One walks a brand-new organization through setting up its workspace. The other walks a new employee through their portal.',
    problem: {
      heading: 'An empty workspace is the hardest screen in software',
      paragraphs: [
        'The first five minutes decide whether an HR system gets adopted. A new admin lands on an empty workspace with fifteen modules and no obvious first move. A new employee lands on a portal with eleven sections and no idea which one matters today.',
        'Both problems are the same problem: there is an order to do things in, and the product knows it but has not said it. A guided flow says it.',
      ],
    },
    capabilities: [
      {
        title: 'New workspace onboarding',
        body: 'A guided path for an organization setting up for the first time: company profile, departments, team roles, policy and branding, in an order that works.',
      },
      {
        title: 'New employee onboarding',
        body: 'A guided path for a new employee through their own portal, so their first day does not start with a tour from somebody else.',
      },
      {
        title: 'Self-signup for organizations',
        body: 'An organization signs itself up with email confirmation and gets its own isolated workspace — no sales call needed to start.',
      },
      {
        title: 'Employees are created, not self-signed-up',
        body: 'Employees are created by the organization. That is a security property as much as a workflow one: nobody adds themselves to your workspace.',
      },
      {
        title: 'Invite the team',
        body: 'Once the workspace is configured, invite the team and assign team roles with permission presets rather than per-capability toggles.',
      },
      {
        title: 'Google sign-in',
        body: 'Sign in with Google, so getting into the workspace does not start with another password.',
      },
    ],
    detail: {
      heading: 'The order we suggest',
      paragraphs: [
        'Create your workspace, confirm your email, and set the two things everything else depends on: your organization timezone and your brand color. The timezone is what makes attendance dates correct from the first clock-in rather than from the day someone noticed. The brand color flows into the app, emails, payslips, invoices and letters.',
        'Then departments and team roles, so the people you are about to invite land with the right access. Then your overtime policy, so the first payroll run applies a written rule rather than a remembered one. Then invite the team.',
        'None of this takes long, and doing it in this order means you never go back to fix data that was created before a setting existed.',
      ],
    },
    visual: 'onboarding',
    related: ['settings', 'employee-portal', 'recruiting', 'attendance'],
  },
  {
    slug: 'settings',
    name: 'Workspace settings',
    title: 'Workspace settings and branding',
    icon: Settings2,
    summary:
      'Company profile, departments, team roles, overtime policy, custom domain, brand color.',
    metaDescription:
      'Configure the company profile, departments, team roles, overtime policy and integrations, plus a custom careers domain and your brand color everywhere.',
    heroHeadline: 'Configure it once, and it applies everywhere',
    heroBody:
      'Company profile, departments, team roles with permission presets, overtime policy, integrations, a custom domain for your careers page, and your own brand color carried across the app, the emails and the PDFs.',
    problem: {
      heading: 'Settings are where software earns trust',
      paragraphs: [
        'The difference between software you tolerate and software you trust is usually in the settings. Can you say what your overtime rule is, once, and have it applied? Can you give the payroll person payroll access without also giving them the hiring pipeline? Does your company’s name and color appear on the document you send an employee, or does the vendor’s?',
        'OneclickHR treats those as first-class settings rather than configuration you file a support ticket for.',
      ],
    },
    capabilities: [
      {
        title: 'Company profile',
        body: 'Your organization’s own details, including the timezone every attendance and calendar date is computed in.',
      },
      {
        title: 'Departments',
        body: 'Structure the organization the way it is actually structured, so views and permissions can follow it.',
      },
      {
        title: 'Team roles with permission presets',
        body: 'Granular roles configured from presets, so a payroll person and a recruiter see different things without anyone assembling permissions one checkbox at a time.',
      },
      {
        title: 'Overtime policy',
        body: 'Write the overtime rule down once. Payroll runs apply it to attendance and timesheet hours rather than relying on someone remembering it.',
      },
      {
        title: 'Integrations',
        body: 'Connect Google Calendar and manage the integrations your workspace uses. Third-party tokens are encrypted with AES-256 before storage.',
      },
      {
        title: 'Custom domain for your careers page',
        body: 'Point your own domain at your public job board so your careers page lives on your brand, and the search ranking it earns stays yours.',
      },
      {
        title: 'Your brand color, everywhere',
        body: 'One color applied across the app, the transactional emails, and the generated PDFs — payslips, invoices and HR letters.',
      },
      {
        title: 'Storage quota',
        body: 'See how much document storage the workspace has used, so a limit is something you plan around rather than discover.',
      },
    ],
    detail: {
      heading: 'Roles, and why presets',
      paragraphs: [
        'Permission systems fail in two directions. Too coarse, and the only way to let someone approve a timesheet is to make them an admin. Too fine, and every new hire needs a forty-checkbox configuration session that nobody gets right twice.',
        'Permission presets sit in between: a role carries a coherent set of capabilities that matches a real job, and you assign the role. The underlying permissions are still granular — the preset is how you avoid having to think about them.',
        'Whatever a role grants, the boundary is enforced in the database. A user’s organization and role travel in their signed auth token, and Row Level Security decides what rows they can read. That is why deactivating someone takes effect immediately: access is re-checked from the database on every request rather than trusted from a token issued an hour ago.',
      ],
    },
    visual: 'settings',
    related: ['onboarding', 'recruiting', 'payroll', 'documents'],
  },
  {
    slug: 'employee-portal',
    name: 'Employee portal',
    title: 'Employee self-service portal',
    icon: UserRound,
    summary: 'One place for an employee: attendance, leave, pay, tasks, documents and more.',
    metaDescription:
      'One place for an employee: their attendance, leave, payslips, pay, timesheets, tasks, projects, documents, profile, meetings and the internal job board.',
    heroHeadline: 'Everything an employee needs, without asking anyone',
    heroBody:
      'One portal covering an employee’s attendance, leave, payslips and pay, timesheets, tasks and projects, documents, profile, meetings, and the internal job board.',
    problem: {
      heading: 'Self-service is the whole point',
      paragraphs: [
        'Count the questions an HR team answers in a week that the employee could have answered themselves if the data were visible to them. Leave balance. Last payslip. Which documents are on file. What is assigned to them. Whether their timesheet went through.',
        'Every one of those is a round trip: a message, a context switch, a lookup, a reply. The information already exists and already belongs to the person asking. The only reason it is a conversation is that nobody gave them a screen.',
        'The employee portal is that screen. It is also the reason the help desk works — the questions that remain are the ones that genuinely need a person.',
      ],
    },
    capabilities: [
      {
        title: 'Their attendance',
        body: 'Clock in and out, see the current state, and read their own attendance history with late flags and shifts.',
      },
      {
        title: 'Their leave',
        body: 'Request leave, see the outcome, and read the current balance without asking anyone for the number.',
      },
      {
        title: 'Their payslips and pay',
        body: 'Payslips as PDFs, with the salary breakdown on the document, in whichever format matches where they are paid.',
      },
      {
        title: 'Their timesheets',
        body: 'Submit the week, attach supporting files, allocate hours to a project or client, and see the approval state.',
      },
      {
        title: 'Their tasks and projects',
        body: 'The tasks assigned to them and the projects they are on, without needing access to every board in the workspace.',
      },
      {
        title: 'Their documents and profile',
        body: 'The documents on file for them, and their own profile details.',
      },
      {
        title: 'Their meetings',
        body: 'Meetings they are invited to, from the shared organization calendar.',
      },
      {
        title: 'The internal job board',
        body: 'Openings posted inside the organization, so a move can happen internally before a role goes public.',
      },
    ],
    detail: {
      heading: 'Their own data, and only their own',
      paragraphs: [
        'The portal shows an employee their own records. Not their team’s, not a colleague’s with a similar name, not another organization’s. That is not a filter on a query; it is Row Level Security in Postgres, enforced on every table.',
        'The product’s isolation tests cover exactly this case against a real database: employee-to-employee isolation inside one organization, cross-organization reads and writes in both directions, and direct access by id with no filter at all. The boundary holds for a query nobody thought to filter, which is the only kind of boundary worth having.',
        'Employees are created by the organization and never self-signup, so the set of people who can reach your workspace is a set you built deliberately. Deactivate someone and the access is gone immediately — re-checked from the database on the next request rather than trusted from their existing session.',
      ],
    },
    visual: 'portal',
    related: ['attendance', 'leave', 'payroll', 'tasks'],
  },
]

export const featureBySlug = (slug: string) => features.find((f) => f.slug === slug)

export const featureSlugs = features.map((f) => f.slug)

/** Grouping used by the module overview grid and the Product mega-menu. */
export const featureGroups: { label: string; slugs: string[] }[] = [
  { label: 'Time and attendance', slugs: ['attendance', 'leave', 'timesheets', 'calendar'] },
  { label: 'Pay and finance', slugs: ['payroll', 'invoicing'] },
  { label: 'People and hiring', slugs: ['recruiting', 'onboarding', 'employee-portal'] },
  {
    label: 'Records and operations',
    slugs: ['documents', 'work-authorization', 'tasks', 'helpdesk', 'notifications', 'settings'],
  },
]
