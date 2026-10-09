import type { ArticleBlock } from './types'

export const about = {
  headline: 'Software for the part of a company that cannot afford to be wrong',
  lede: 'OneclickHR is built by Nextkin Life LLC. We make one product: a multi-tenant HR and organization management system where every customer gets a fully isolated workspace.',
  mission: {
    heading: 'What we are trying to do',
    blocks: [
      {
        kind: 'p',
        text: 'Most companies between ten and five hundred people run HR on four spreadsheets, a shared folder and somebody’s inbox. It works, in the sense that people get paid and leave gets taken. It also means no two records agree, the month closes by reconstruction, and the person holding it together cannot take a holiday without the system stopping.',
      },
      {
        kind: 'p',
        text: 'The software sold to fix this usually comes in two shapes. Either it is enormous, priced for an HR department, and requires an implementation project before it does anything. Or it is one narrow tool — attendance, or payroll, or applicant tracking — which leaves you integrating four vendors and owning the gaps between them.',
      },
      {
        kind: 'p',
        text: 'We are building the thing in between: one workspace covering attendance, leave, payroll, timesheets, invoicing, work authorization records, tasks, recruiting, documents, calendar, help desk and the employee portal, that an organization can configure itself in an afternoon.',
      },
    ] satisfies ArticleBlock[],
  },
  principles: [
    {
      title: 'Calm software',
      body: 'HR software is used under deadline by people whose actual job is something else. So it should be quiet: generous whitespace, one idea per screen, no badge counts competing for attention, no interface that needs to be learned twice. The product should be the least dramatic part of anyone’s month.',
    },
    {
      title: 'One source of truth',
      body: 'Most HR errors are two systems disagreeing. An attendance day and a leave day that were computed differently. Approved hours in one place and an invoice typed up in another. We would rather one record did several jobs than have several records that need reconciling — which is why a project is both a task board and the unit timesheet hours are allocated to.',
    },
    {
      title: 'Isolation by default',
      body: 'A boundary that depends on remembering to enforce it is a boundary that holds until the first busy afternoon. Row Level Security is enabled on every table in our database, every tenant-scoped table carries a non-null tenant id, and the isolation tests run against a real database rather than a mock. We made that decision early, when it was still cheap.',
    },
    {
      title: 'Boring reliability',
      body: 'The features people trust are the unglamorous ones that never surprise them. A reminder sent exactly once. A scheduled job that reports its own failure instead of showing a green tick. A payroll run you get to read before it is final. None of that demos well. All of it is why a system stops being double-checked.',
    },
    {
      title: 'Honest about the edges',
      body: 'Our work authorization module tracks records and sends expiry reminders. It is not an immigration filing system, and we say so on its own page. We hold no security certifications and we do not imply we do. Over-promising on a compliance-adjacent feature is how HR software gets trusted with something it cannot do.',
    },
    {
      title: 'Your brand, not ours',
      body: 'The payslip an employee receives, the invoice a client receives and the careers page a candidate lands on should look like they came from your company. One brand color configured in your workspace carries across the app, the emails and every generated PDF, and your careers board can live on your own domain.',
    },
  ],
  beliefs: {
    heading: 'A few things we think are true',
    blocks: [
      {
        kind: 'ul',
        items: [
          'The most important feature in a payroll module is the moment before the numbers become final.',
          'A date is not a timestamp. Which timezone you convert in decides whose day it is.',
          'Access control enforced by hiding buttons is not access control.',
          'A notification system that cannot be trusted is worse than none, because people stop looking.',
          'Employees should be able to answer questions about their own pay, leave and documents without asking a person.',
          'Software that claims certifications it does not hold has told you something useful about everything else it claims.',
        ],
      },
    ] satisfies ArticleBlock[],
  },
  company: {
    heading: 'The company',
    blocks: [
      {
        kind: 'p',
        text: 'OneclickHR is a product of Nextkin Life LLC, a United States limited liability company. We are a small, independent team and we are not going to pretend otherwise with a page of stock photographs and a headcount figure.',
      },
      {
        kind: 'p',
        text: 'The practical upside of being small is that the person who answers your email has read the code. If you report something, it does not go into a queue to be triaged by someone three steps from the product.',
      },
      {
        kind: 'p',
        text: 'If you want to talk about whether OneclickHR fits what you are running today, the contact form reaches us directly. If you have found a security issue, security@oneclickhr.app goes straight to us and we would much rather hear from you than not.',
      },
    ] satisfies ArticleBlock[],
  },
}

export const careers = {
  headline: 'Hiring on your own terms',
  lede: 'The careers story here has two sides. The main one is a product capability: OneclickHR gives your organization a public job board on your own domain. The second is ours, and it is short.',
  productSide: {
    heading: 'Your careers page, as a product feature',
    blocks: [
      {
        kind: 'p',
        text: 'When you post a job in OneclickHR, it becomes a page on a public, SEO-friendly careers board that carries your brand color — and you can point your own custom domain at it from workspace settings. That matters because a posting on a third-party board is a rental: the traffic and the search ranking accrue to the board, and the candidate’s first impression of you is a listing in somebody else’s template.',
      },
      {
        kind: 'p',
        text: 'Candidates apply directly through your board with their own lightweight external account. They see their own application and nothing else — no organization seat, no visibility into your workspace. Applications are tracked against the job they arrived on, and candidates who were strong but not right for one role stay in the talent pool for the next opening.',
      },
      {
        kind: 'p',
        text: 'Recruiters are their own role, with access to the hiring side only, toggleable per job. An external recruiter working one opening does not see your payroll module or the rest of your pipeline, and when their engagement ends you toggle the access off and it is gone on their next request.',
      },
      {
        kind: 'p',
        text: 'Employees also see an internal job board in their self-service portal, so an opening can be offered inside the organization before it goes public. For staffing and consulting firms, placements are tracked as their own records rather than inferred from a hire.',
      },
    ] satisfies ArticleBlock[],
  },
  checklist: [
    'Per-posting pages built to be crawled and indexed individually',
    'Your brand color on the board, and your own custom domain',
    'Candidates apply directly, with accounts scoped to their own application',
    'Application tracking against the job it came in on',
    'A talent pool, so the next role starts with people you have met',
    'Recruiter access scoped to the hiring side, toggleable per job',
    'An internal job board in every employee’s portal',
    'Placements tracking for firms placing people on client engagements',
  ],
  ourSide: {
    heading: 'Working at OneclickHR',
    blocks: [
      {
        kind: 'p',
        text: 'We have no open roles right now. When we do, they will be posted here — on our own job board, which seems like the least we can do given the argument above.',
      },
      {
        kind: 'p',
        text: 'If you build the kind of software described on our about page — careful about correctness, unexcited about hype, happy to spend a week on a boundary nobody will ever see — we would still like to hear from you. Send a note through the contact form telling us what you have built and what you would want to work on. We read them, and we will tell you honestly if there is nothing to offer.',
      },
    ] satisfies ArticleBlock[],
  },
}
