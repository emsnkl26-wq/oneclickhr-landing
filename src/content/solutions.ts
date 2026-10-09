import { Briefcase, Building2, Globe2, HeartHandshake } from 'lucide-react'
import type { Solution } from './types'

export const solutions: Solution[] = [
  {
    slug: 'small-business',
    name: 'Small business',
    title: 'OneclickHR for small businesses',
    icon: Building2,
    summary: 'One system for a 10–100 person company, instead of four spreadsheets and a folder.',
    metaDescription:
      'One HR system for a 10 to 100 person company: attendance, leave, payroll, documents and tasks in one workspace instead of four spreadsheets.',
    heroHeadline: 'One workspace instead of four spreadsheets and a shared folder',
    heroBody:
      'A company of 10 to 100 people does not need an HR department to run HR properly. It needs the records in one place, the approvals to actually happen, and the month to close without a reconstruction exercise.',
    pains: [
      {
        title: 'HR is somebody’s second job',
        body: 'At this size, HR is usually run by a founder, an ops manager or a finance lead alongside their actual role. The system has to work without a specialist tending it, which means defaults that are right and settings you configure once.',
      },
      {
        title: 'The records are scattered',
        body: 'Attendance in one sheet, leave in an email thread, salaries in a file only one person opens, documents in a shared drive. Each is fine alone. Together they guarantee that no two of them agree.',
      },
      {
        title: 'Payroll month is a reconstruction',
        body: 'Closing the month means rebuilding what happened from several sources. The review step in a payroll run replaces that with reading a prepared run and checking it.',
      },
      {
        title: 'Employees ask instead of looking',
        body: 'Leave balances, payslips and documents all generate questions because nobody has a screen for them. The self-service portal removes most of that traffic.',
      },
    ],
    fit: {
      heading: 'What setup actually looks like',
      paragraphs: [
        'You sign your organization up, confirm your email, and get an isolated workspace. The two settings that matter most come first: your organization timezone, which is what makes every attendance date correct, and your brand color, which flows into the app, the emails and the PDFs your employees receive.',
        'Then departments and team roles. Team roles use permission presets, so giving the person who runs payroll payroll access does not also hand them the hiring pipeline, and you do not have to assemble that from individual checkboxes.',
        'Then invite the team. Employees are created by you — they never sign themselves up — so the set of people inside your workspace is a set you built on purpose. From there, attendance, leave and the employee portal are working immediately, and payroll is ready when the cycle comes round.',
        'There is no implementation project here. The product is built so a small team can configure it in an afternoon and have the month close cleanly the first time.',
      ],
    },
    modules: ['attendance', 'leave', 'payroll', 'documents', 'employee-portal', 'settings'],
    visual: 'dashboard',
    related: ['hr-teams', 'remote-teams', 'staffing-and-consulting'],
  },
  {
    slug: 'staffing-and-consulting',
    name: 'Staffing & consulting',
    title: 'OneclickHR for staffing and consulting firms',
    icon: Briefcase,
    summary: 'Timesheets, client allocation, invoices and placements for firms who bill time.',
    metaDescription:
      'For firms that place people on client engagements: weekly timesheets with client allocation, invoices from approved hours, placements and work authorization.',
    heroHeadline: 'From an approved week to a sent invoice, in one workspace',
    heroBody:
      'Firms that place people on client engagements have a chain to run every week: hours logged, hours allocated to a client, hours approved, invoice raised. OneclickHR keeps that chain in one place, so no step is a copy-paste from the previous one.',
    pains: [
      {
        title: 'Hours are revenue, not admin',
        body: 'A wrong or late timesheet is not an HR inconvenience — it is an invoice that cannot be raised. Weekly submission with an approval state makes a missing week visible before the billing cycle closes.',
      },
      {
        title: 'Allocation gets filled in inconsistently',
        body: 'When project and client are a column someone types, the data is only as good as the typing. Allocating hours as they are entered is what makes invoices generatable rather than assembled.',
      },
      {
        title: 'Invoicing duplicates work already done',
        body: 'Approved, allocated hours already contain everything an invoice needs. Generating the invoice PDF from them removes the re-entry step and the errors it introduces.',
      },
      {
        title: 'Work authorization expiry is a real risk',
        body: 'Placing people on client sites means tracking work authorization expiry across a roster. Milestone reminder emails, each sent exactly once, replace a spreadsheet column nobody is watching.',
      },
      {
        title: 'Recruiters should not see everything',
        body: 'A recruiter working one role does not need the payroll module or the rest of the organization. Recruiter access is scoped to the hiring side, and toggleable per job.',
      },
    ],
    fit: {
      heading: 'The weekly rhythm',
      paragraphs: [
        'Consultants submit a week at a time from their portal, allocating hours to the project or client they worked on, and attaching whatever supporting file the client requires. A manager approves. Approved hours are the only hours downstream processes read.',
        'Those approved hours then do two jobs. They feed the payroll run, under the overtime policy configured once in workspace settings. And they feed a client invoice, generated as a PDF carrying your brand color, tracked in the invoice workspace. Expenses go in the same place, and the finance overview rolls the month up without an export.',
        'On the hiring side, the public job board lives on your own custom domain, so the search ranking your postings earn accrues to your brand rather than a third-party board. Applications are tracked against the job, good candidates who were not right this time stay in the talent pool, and placements are tracked as their own records rather than inferred from a hire.',
      ],
    },
    modules: ['timesheets', 'invoicing', 'recruiting', 'work-authorization', 'tasks', 'payroll'],
    visual: 'timesheet',
    related: ['small-business', 'remote-teams', 'hr-teams'],
  },
  {
    slug: 'remote-teams',
    name: 'Remote teams',
    title: 'OneclickHR for remote and distributed teams',
    icon: Globe2,
    summary: 'Timezone-correct attendance, async approvals, and self-service across locations.',
    metaDescription:
      'Timezone-correct attendance, asynchronous approvals, multi-currency payroll and a self-service portal for teams spread across locations and time zones.',
    heroHeadline: 'Built for a team that is never all online at once',
    heroBody:
      'Distributed teams break HR tools in specific ways: dates land on the wrong day, approvals wait on somebody’s morning, and nobody can see who is off. OneclickHR is built so none of those are the system’s fault.',
    pains: [
      {
        title: 'Dates land on the wrong day',
        body: 'This is the defining bug of distributed attendance. A 9am clock-in computed in a server timezone can be filed under yesterday. OneclickHR derives the calendar day from your organization timezone, so it does not.',
      },
      {
        title: 'Approvals block on a time zone',
        body: 'Leave requests and timesheets go to an approver as records with a state, not as messages waiting for a reply. The employee can see where the request stands without being online at the same time as anyone.',
      },
      {
        title: 'Nobody can see who is away',
        body: 'Approved leave lands on the shared organization calendar, which syncs with Google Calendar. An absence is visible before someone schedules a meeting over it.',
      },
      {
        title: 'People are paid in different currencies',
        body: 'Payroll is multi-currency, and payslips carry their currency. There are two payslip PDF formats, including a US-style one, for teams spanning payroll conventions.',
      },
      {
        title: 'Questions arrive at all hours',
        body: 'The self-service portal answers most of them without a person: leave balance, payslips, documents, tasks, timesheet state. What is left goes to the internal help desk as a ticket rather than a message.',
      },
    ],
    fit: {
      heading: 'Asynchronous by construction',
      paragraphs: [
        'Everything in OneclickHR that needs a decision is a record with a state rather than a conversation. A leave request is pending until a manager approves or declines it, and the outcome is attached to the request. A timesheet is drafted, then submitted, then approved. Nothing depends on two people being awake simultaneously.',
        'Notifications close the loop across three channels — in-app for when you are in the product, web push for what should not wait, and transactional email for what needs to exist outside the app. That matters more for a distributed team than a co-located one, because there is no corridor to catch someone in.',
        'Task boards update live for everyone currently viewing them, so the handful of moments when people are working together are not spent reconciling two versions of a board.',
      ],
    },
    modules: ['attendance', 'leave', 'calendar', 'tasks', 'notifications', 'employee-portal'],
    visual: 'calendar',
    related: ['small-business', 'hr-teams', 'staffing-and-consulting'],
  },
  {
    slug: 'hr-teams',
    name: 'HR teams',
    title: 'OneclickHR for HR teams',
    icon: HeartHandshake,
    summary: 'Role-scoped access, generated letters, an audit log, and fewer inbound questions.',
    metaDescription:
      'For HR teams: granular team roles with permission presets, letters generated from templates, a tamper-evident audit log, and far fewer inbound questions.',
    heroHeadline: 'For the team that owns the record',
    heroBody:
      'An HR team’s job is partly process and mostly accuracy. OneclickHR is built around that: scoped access so the right people see the right things, documents generated rather than copied, and an audit trail of what changed.',
    pains: [
      {
        title: 'Access is all-or-nothing',
        body: 'In too many systems the only way to let someone approve a timesheet is to make them an admin. Team roles here use permission presets, so a payroll person and a recruiter get coherent, different access.',
      },
      {
        title: 'Letters are copied from the last one',
        body: 'Copy-paste is how a previous employee’s details end up in a current employee’s verification letter. Generating letters from templates and the employee record removes the step entirely.',
      },
      {
        title: 'Nobody can say what changed',
        body: 'A tamper-evident audit log of mutations means a question about who changed a salary figure, and when, has an answer that does not depend on anyone’s memory.',
      },
      {
        title: 'Offboarding leaves access behind',
        body: 'Deactivation takes effect immediately, because access is re-checked from the database on every request rather than trusted from a token issued an hour ago.',
      },
      {
        title: 'The inbox is the real workload',
        body: 'Most inbound questions are about data the employee owns. The self-service portal makes them self-answering, and the internal help desk turns the rest into tickets with a visible state.',
      },
    ],
    fit: {
      heading: 'Accuracy as a design goal',
      paragraphs: [
        'The features an HR team notices are the ones that stop a quiet error. Attendance days computed in your organization timezone, so the month’s hours are the month’s hours. A review step before a payroll run finalizes, so a surprising figure is caught before it is paid. Letters built from data rather than from the previous letter. Work authorization reminders that are sent exactly once, so the system is trusted rather than filtered.',
        'Underneath, the access boundary is enforced in Postgres with Row Level Security on every table, not by hiding menu items. A query that forgot its filter still cannot return another employee’s record or another organization’s data. That is tested against a real database, in both directions, including direct access by id with no filter at all.',
        'The result is a system an HR team can answer questions from, rather than one they have to double-check.',
      ],
    },
    modules: ['documents', 'settings', 'leave', 'payroll', 'helpdesk', 'work-authorization'],
    visual: 'documents',
    related: ['small-business', 'remote-teams', 'staffing-and-consulting'],
  },
]

export const solutionBySlug = (slug: string) => solutions.find((s) => s.slug === slug)

export const solutionSlugs = solutions.map((s) => s.slug)
