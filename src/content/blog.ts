import type { BlogPost } from './types'

export const posts: BlogPost[] = [
  {
    slug: 'attendance-dates-timezone',
    title: 'Why attendance dates must be computed in your timezone',
    description:
      'A clock-in is an instant; a working day is a calendar date. Converting between them in the wrong timezone is the most common silent bug in HR software.',
    date: '2026-09-18',
    readingMinutes: 6,
    topic: 'Attendance',
    body: [
      {
        kind: 'p',
        text: 'Here is a bug that almost every HR system ships at least once. An employee in Mumbai clocks in at 9:10am on a Tuesday. The attendance report shows them absent on Tuesday and present on Monday evening. Nothing was entered wrong. The clock-in was recorded accurately, to the second. And the report is still wrong.',
      },
      {
        kind: 'p',
        text: 'The cause is a conversion nobody thinks about, because it looks like it has only one possible answer.',
      },
      { kind: 'h2', text: 'Two different kinds of time' },
      {
        kind: 'p',
        text: 'A clock-in is an instant: a single point on a universal timeline, usually stored as a timestamp with a timezone offset. Instants are unambiguous. The moment that employee tapped the button exists once, and every system in the world agrees on it.',
      },
      {
        kind: 'p',
        text: 'A working day is something else entirely. It is a calendar date — "Tuesday the 15th" — and a calendar date is not a point on a timeline. It is a label that only means something relative to a place. The same instant is Tuesday morning in Mumbai, Monday evening in New York, and Tuesday just-past-midnight in London.',
      },
      {
        kind: 'p',
        text: 'Attendance software has to convert the first into the second. Every record is an instant, and every report, sheet and payroll line is organized by calendar date. That conversion is the entire bug, because it requires a timezone, and the code has to get that timezone from somewhere.',
      },
      { kind: 'h2', text: 'Where the wrong timezone comes from' },
      {
        kind: 'p',
        text: 'There are only a few places the conversion can get a timezone, and most of them are wrong in a way that is invisible during development.',
      },
      {
        kind: 'ul',
        items: [
          'The server’s timezone. Almost always UTC in a modern deployment, which means every date boundary falls at midnight UTC — 5:30am in India, 8pm the previous day in California.',
          'The database’s session timezone. Also usually UTC, and worse, it can differ between a connection pool, a background job and a migration.',
          'The viewer’s browser timezone. Tempting, and it produces a report that changes depending on who opens it — which means two managers reading the same month see different numbers.',
          'The employee’s own timezone. Closer to reasonable, but it makes an organization-wide sheet incoherent, because the columns no longer describe one shared day.',
        ],
      },
      {
        kind: 'p',
        text: 'The correct source is none of those. It is the organization’s configured timezone — the one the business actually runs its days by. That is the only timezone under which "Tuesday the 15th" has a single agreed meaning for everyone in the workspace, which is precisely what a report needs.',
      },
      { kind: 'h2', text: 'Why it stays hidden for months' },
      {
        kind: 'p',
        text: 'This bug has a particularly cruel property: it does not appear for the team that builds it. If your engineers are in UTC or close to it, and your test data is daytime office hours, every conversion lands on the day you expect. The bug only manifests for a specific combination — an organization far enough from UTC that normal working hours cross the UTC date boundary.',
      },
      {
        kind: 'p',
        text: 'And even then it is quiet. An attendance record on the wrong day does not throw an error. It produces a plausible-looking report with one absence that was not real and one presence on a day nobody worked. Nobody audits that. It gets noticed weeks later, when a month-end total does not match, and by then the trail has gone cold.',
      },
      { kind: 'h2', text: 'The damage is downstream' },
      {
        kind: 'p',
        text: 'If attendance were a standalone report, a one-day drift would be an annoyance. It is not standalone. The calendar day on an attendance record is a key that other things join on.',
      },
      {
        kind: 'ol',
        items: [
          'Payroll reads hours by date range. An hour that drifted out of the month is an hour that does not get paid in that month, and an hour that drifted in gets paid twice across two cycles.',
          'Overtime rules apply per day or per week. A shift assigned to the wrong day can push one day over a threshold and pull another under it, changing a figure in both directions at once.',
          'Leave has to agree with attendance. An approved day off and a missing attendance record should describe the same date. If they are computed in different timezones, they sometimes do not, and someone has to decide which record is lying.',
          'The shared calendar shows the same days to everyone. An event on one date in the calendar and another in the attendance sheet makes both untrustworthy.',
        ],
      },
      {
        kind: 'p',
        text: 'This is why the fix cannot be a patch on the report. The date has to be right where it is recorded, so that everything joining on it inherits a correct value rather than each module applying its own correction.',
      },
      { kind: 'h2', text: 'What OneclickHR does' },
      {
        kind: 'p',
        text: 'Every OneclickHR workspace has an organization timezone, set during setup, and it is the authority. An attendance record carries both the instant it happened and the calendar day it belongs to, and that day is derived from the organization timezone — not the server’s, not the browser’s, not the database session’s.',
      },
      {
        kind: 'p',
        text: 'The same setting governs leave dates and calendar events, so the three agree by construction rather than by reconciliation. When the payroll review step shows you an hours total you did not expect, you can follow it back to a specific day on a specific attendance sheet, and that day means what you think it means.',
      },
      { kind: 'h2', text: 'What to check in any system you evaluate' },
      {
        kind: 'p',
        text: 'If you are assessing HR software, this is a five-minute test that tells you a lot about the care underneath. Ask these three questions.',
      },
      {
        kind: 'ul',
        items: [
          'Where does the organization timezone live, and is it one setting or several? If attendance, leave and the calendar each have their own notion of a day, they will eventually disagree.',
          'If I clock in at 9am local time, which calendar date does the record carry? Ask them to show you, with an organization timezone far from UTC.',
          'When the clocks change for daylight saving, what happens to the day boundary and to a shift that spans it? A system that has thought about this has an answer ready.',
        ],
      },
      {
        kind: 'p',
        text: 'A vendor who has dealt with this will answer quickly and specifically, because it is the kind of problem you only solve once but never forget. A vendor who has not will tell you timestamps are stored in UTC, which is true, and which is not an answer to the question.',
      },
      {
        kind: 'quote',
        text: 'Storing instants in UTC is correct and insufficient. The question is which timezone you convert them back in, and whose day that produces.',
      },
      {
        kind: 'p',
        text: 'Attendance is the least glamorous module in any HR system. It is also the one every other module depends on for its dates, which makes it the place where a quiet correctness decision has the loudest consequences.',
      },
    ],
  },
  {
    slug: 'multi-tenant-isolation',
    title: 'What multi-tenant isolation actually means for your HR data',
    description:
      'Every HR vendor says your data is isolated. The question worth asking is which layer enforces it — because application code forgets, and databases do not.',
    date: '2026-08-05',
    readingMinutes: 7,
    topic: 'Security',
    body: [
      {
        kind: 'p',
        text: 'Every multi-tenant HR product will tell you your data is isolated from other customers’ data. They are all telling the truth about their intent. The interesting difference is which layer of the system enforces it, because that determines what happens on the day someone writes a query that forgets a filter.',
      },
      { kind: 'h2', text: 'Three places isolation can live' },
      {
        kind: 'p',
        text: 'In practice there are three architectures, and they fail in very different ways.',
      },
      { kind: 'h3', text: 'A database per customer' },
      {
        kind: 'p',
        text: 'The strongest separation and the most operational pain. A forgotten filter cannot reach another customer’s data because the data is not in the same place. The cost is everything else: migrations run N times, a schema change can leave customers on different versions, and operational tooling has to know how to reach every database. Many vendors who start here end up with a hybrid, which reintroduces the problem they were avoiding.',
      },
      { kind: 'h3', text: 'One database, filtering in application code' },
      {
        kind: 'p',
        text: 'The most common approach and the weakest. All customers share tables, and every query is expected to include a tenant filter. It works perfectly as long as every query, in every code path, written by everyone who ever worked on the system, includes that filter.',
      },
      {
        kind: 'p',
        text: 'That is a stronger assumption than it sounds. Consider the places a query gets written: request handlers, background jobs, admin tooling, data migrations, a reporting endpoint added in a hurry, an engineer debugging in a console. Each one needs the filter. The filter is invisible when it is missing — the query runs fine, it just returns more than it should. And nothing in the system objects.',
      },
      {
        kind: 'p',
        text: 'The failure mode is not malice. It is a Tuesday afternoon, a new endpoint, a reasonable-looking join, and a code review where two people were thinking about the feature rather than the filter.',
      },
      { kind: 'h3', text: 'One database, isolation enforced by the database' },
      {
        kind: 'p',
        text: 'Postgres has a feature for exactly this: Row Level Security. With it enabled on a table, you attach a policy describing which rows a given user may see, and the database applies that policy to every query against that table. Not the queries you remembered to protect. Every query.',
      },
      {
        kind: 'p',
        text: 'The forgotten filter stops being a data leak and becomes an empty result. That is the whole point: the boundary holds for code nobody reviewed carefully, because the boundary is not in the code.',
      },
      { kind: 'h2', text: 'How OneclickHR is built' },
      {
        kind: 'p',
        text: 'OneclickHR runs on one Postgres database with Row Level Security enabled on every single table, without exception, and every tenant-scoped table carries a non-null tenant id. "Without exception" is doing real work in that sentence — one table with RLS switched off during a migration and never switched back is exactly how this architecture fails in practice.',
      },
      {
        kind: 'p',
        text: 'A signed-in user’s organization and role travel in their auth token, which the database can read. So when a request arrives, the database itself answers the question "may this person see this row?" rather than trusting the application to have asked it.',
      },
      {
        kind: 'p',
        text: 'The same mechanism handles the boundary inside an organization. An employee can see their own attendance, their own payslips and their own documents — not a colleague’s. That is the same kind of policy, at a finer grain, enforced in the same place.',
      },
      { kind: 'h2', text: 'Enforcement you can test is enforcement you can trust' },
      {
        kind: 'p',
        text: 'A security property that is not tested is an intention. Policies are code, and code drifts: a new table, a policy with a subtly wrong predicate, a role whose definition changed. The only way to know the boundary still holds is to try to cross it.',
      },
      {
        kind: 'p',
        text: 'OneclickHR’s isolation tests run against a real database rather than mocks, because a mocked database will happily confirm whatever the test author believed. They cover:',
      },
      {
        kind: 'ul',
        items: [
          'Cross-organization reads, in both directions — not just A trying to read B, but B trying to read A, because an asymmetric policy bug is easy to write and easy to miss.',
          'Cross-organization writes, in both directions. Being unable to read another workspace’s data is not the same as being unable to modify it.',
          'Direct access by id with no filter at all, which is the scenario the whole architecture exists for: the query that should have been scoped and was not.',
          'Employee-to-employee isolation within a single organization, so being a legitimate member of a workspace does not mean seeing everyone in it.',
          'Immediate effect of deactivation, verified rather than assumed.',
          'Workspace suspension, so a suspended organization is actually suspended at the data layer.',
        ],
      },
      { kind: 'h2', text: 'The token problem' },
      {
        kind: 'p',
        text: 'There is a subtlety worth drawing out, because it is where a lot of otherwise careful systems leave a gap. If a user’s role and organization are carried in a signed token, and tokens are valid for an hour, what happens in the hour after you deactivate someone?',
      },
      {
        kind: 'p',
        text: 'In many systems: nothing. Their existing token still asserts they are an active member with a role, the signature is still valid, and access continues until the token expires. For an offboarding — someone leaving on bad terms, an account that may be compromised — an hour is a long time.',
      },
      {
        kind: 'p',
        text: 'OneclickHR re-checks access against the database on every request rather than trusting the token’s claims about status. Deactivation takes effect on the next request, which is the behavior anyone clicking "deactivate" reasonably expects.',
      },
      { kind: 'h2', text: 'Questions worth asking a vendor' },
      {
        kind: 'p',
        text: 'If you are evaluating any multi-tenant system that will hold your employees’ pay, documents and personal data, these four questions separate architecture from marketing.',
      },
      {
        kind: 'ol',
        items: [
          'Which layer enforces tenant isolation — the application, or the database? If the answer is the application, ask what happens when a query omits the filter.',
          'Is row-level enforcement on every table, or most of them? Ask how they know, and whether anything would fail if a new table shipped without a policy.',
          'Do isolation tests run against a real database, and do they include unfiltered access by id? Mocked isolation tests prove only that the mock agrees with the author.',
          'How long after deactivation can a user still read data? If the answer is the token lifetime, that is the real offboarding window.',
        ],
      },
      {
        kind: 'quote',
        text: 'A boundary enforced only by remembering to enforce it is a boundary that holds until the first busy afternoon.',
      },
      {
        kind: 'p',
        text: 'None of this is exotic. Row Level Security has been in Postgres for a decade. The difference between a system that uses it on every table and one that filters in application code is not sophistication — it is a decision made early, when it was still cheap, about where the boundary should live.',
      },
    ],
  },
  {
    slug: 'payroll-review-step',
    title: 'Running payroll with a review step',
    description:
      'Most payroll errors are input errors, not arithmetic errors. The fix is not a better calculation — it is a deliberate pause before the run becomes final.',
    date: '2026-07-02',
    readingMinutes: 6,
    topic: 'Payroll',
    body: [
      {
        kind: 'p',
        text: 'Ask anyone who has run payroll for a few years about their worst month, and you will almost never hear a story about arithmetic. The calculation was right. It was given the wrong input, and nothing stood between that input and a finalized run.',
      },
      { kind: 'h2', text: 'What actually goes wrong' },
      {
        kind: 'p',
        text: 'Payroll errors cluster into a small number of shapes, and they share a cause: the figure was computed correctly from something that was not true.',
      },
      {
        kind: 'ul',
        items: [
          'Hours that drifted. A shift filed under the wrong calendar day moves hours across a period boundary, so a month is short and the next one is long.',
          'An overtime rule that did not apply. The policy was correct in principle and not configured in the system, so it was applied from memory — or not at all.',
          'A currency that got assumed. An employee paid in a different currency appears correct numerically and is wrong by the exchange rate.',
          'A stale salary. The raise was agreed in a conversation and recorded a week after the cycle closed.',
          'A missing timesheet. Nothing objected to the absence, so the hours were simply not there.',
        ],
      },
      {
        kind: 'p',
        text: 'Notice that no better formula prevents any of these. They are all failures of visibility: something was wrong, and the system had no moment at which a person was shown it.',
      },
      { kind: 'h2', text: 'Why the moment matters more than the math' },
      {
        kind: 'p',
        text: 'A payroll error is unusually expensive relative to its size. An employee underpaid by a hundred dollars does not file a ticket and move on — they lose a measure of confidence in the company, and that is not refundable with the correction. An employee overpaid has to be asked to return money, which damages the relationship in a different direction and creates work for everyone.',
      },
      {
        kind: 'p',
        text: 'The asymmetry is the argument for a review step. Reading a prepared run takes minutes. Correcting a finalized one costs a conversation with every affected person, an adjustment in the next cycle, and a small permanent dent in trust.',
      },
      { kind: 'h2', text: 'What a review step is, and is not' },
      {
        kind: 'p',
        text: 'A review step is a stage in the process: the run exists, it is fully calculated, and it is not final. You read it, and then you finalize it. The important part is that it is a stage rather than a report, because an optional report is one someone eventually stops opening.',
      },
      {
        kind: 'p',
        text: 'It is not an approval chain. Adding three signatures to a payroll run does not make it more correct; it makes it slower and spreads responsibility thin enough that nobody reads it carefully. One person reading the run properly beats three people clicking approve.',
      },
      {
        kind: 'p',
        text: 'And it is not a preview that shows only totals. A total tells you whether the number is roughly what you expected, which catches an error of a thousand and misses an error of fifty across four people. The review has to show the lines, with their breakdowns.',
      },
      { kind: 'h2', text: 'How it works in OneclickHR' },
      {
        kind: 'p',
        text: 'Payroll in OneclickHR is built as a run with a review step in front of finalization. You build the run, read it in full, and then finalize it. Nothing is final until you have looked at it.',
      },
      {
        kind: 'p',
        text: 'The run reads its inputs from the rest of the workspace rather than from a separate payroll data entry step. Hours come from the attendance records and the approved timesheets. The overtime rule comes from the policy configured in workspace settings, written down once rather than remembered each cycle. Salary and currency come from the employee record. Pay schedules follow the cadence your organization actually pays on.',
      },
      {
        kind: 'p',
        text: 'Each payslip shows its components rather than a single net figure, which does two things. During review, a line that looks wrong can be traced to the part of it that is wrong. And after finalization, an employee asking why a number is what it is has the answer on their own document rather than having to ask.',
      },
      { kind: 'h2', text: 'The inputs have to be trustworthy too' },
      {
        kind: 'p',
        text: 'A review step catches what a human notices. It is not a substitute for inputs that are correct in the first place, and the most common bad input is subtle enough to survive a careful read.',
      },
      {
        kind: 'p',
        text: 'Attendance dates are the usual culprit. If a clock-in’s calendar day is computed in the server’s timezone rather than your organization’s, hours can sit in the wrong period, and the resulting total looks entirely plausible — just slightly wrong. OneclickHR derives the calendar day from your organization timezone precisely so that the hours a run consumes belong to the days you think they do.',
      },
      {
        kind: 'p',
        text: 'Approval state is the other one. Approved timesheet hours are the hours a run reads; unapproved hours stay out. That means a missing week shows up as missing rather than silently contributing nothing, which is the difference between a question and an undetected error.',
      },
      { kind: 'h2', text: 'A practical review routine' },
      {
        kind: 'p',
        text: 'The review step is only as good as what you do with it. Four checks catch most of what goes wrong, and none of them takes long.',
      },
      {
        kind: 'ol',
        items: [
          'Compare the run total against last cycle. A change you cannot explain in one sentence is the thing to look at first.',
          'Scan for anyone whose figure moved. New joiners, leavers, raises and anyone who took leave are where movement should be — and anyone else who moved is a question.',
          'Check the hours on anyone who bills time. Cross-reference against their approved timesheets rather than trusting the total, especially near a period boundary.',
          'Confirm currencies on anyone paid outside your default. This is the error least likely to look wrong and most likely to be wrong.',
        ],
      },
      {
        kind: 'quote',
        text: 'The most valuable feature in a payroll module is not the calculation. It is the moment before the calculation becomes final.',
      },
      {
        kind: 'p',
        text: 'Finalized payslips go straight to each employee’s self-service portal as PDFs, in whichever of the two formats matches where they are paid, carrying your brand color. By then the figures have been read by someone — which is the only part of the process that was ever going to catch an input nobody questioned.',
      },
    ],
  },
  {
    slug: 'careers-page-own-domain',
    title: 'Posting jobs on your own domain',
    description:
      'A posting on a third-party board is a rental. A careers page on your own domain is an asset that keeps the search ranking it earns.',
    date: '2026-05-27',
    readingMinutes: 6,
    topic: 'Recruiting',
    body: [
      {
        kind: 'p',
        text: 'Most companies hire through other people’s websites. The job goes up on a board, candidates arrive from the board, and the company’s own careers page — if it has one — is a static paragraph that has not changed in two years.',
      },
      {
        kind: 'p',
        text: 'That is a reasonable way to fill a role quickly. It is a poor way to build anything, because none of the value compounds.',
      },
      { kind: 'h2', text: 'What you give up on a third-party board' },
      {
        kind: 'p',
        text: 'A posting on someone else’s board is a rental agreement with terms you did not negotiate.',
      },
      {
        kind: 'ul',
        items: [
          'The search ranking belongs to the board. When your posting ranks for a role and a location, the domain accumulating that authority is theirs. Take the posting down and nothing remains on your side.',
          'The first impression is theirs. A candidate reads your role in a template, next to nine other roles, in a layout designed to keep them browsing rather than applying to you.',
          'The competitor is one click away. Boards exist to show a candidate many options. That is the product working as intended, and it is not working for you.',
          'The candidate relationship starts in their account. The application arrives in your inbox, but the candidate’s relationship is with the platform.',
        ],
      },
      {
        kind: 'p',
        text: 'None of this means never post to a board. It means the board should be a distribution channel pointing at something you own, not the thing itself.',
      },
      { kind: 'h2', text: 'What a careers page on your own domain is worth' },
      {
        kind: 'p',
        text: 'A job board on your own domain behaves like an asset rather than an expense, for a few reasons that build on each other.',
      },
      {
        kind: 'p',
        text: 'Search authority accrues to you. Every posting that gets indexed, linked to and visited contributes to your domain rather than someone else’s. Roles are repetitive — most companies hire similar positions repeatedly — so a careers domain that has ranked for a role before starts ahead the next time.',
      },
      {
        kind: 'p',
        text: 'The candidate is on your site. They can read about the company from the same page, in your design, with your brand color. That is a materially different first impression from a listing in a template, and it is the moment a candidate decides whether to spend twenty minutes on an application.',
      },
      {
        kind: 'p',
        text: 'And the page keeps working between hires. A careers page that lists current openings and is reachable from your site is a standing invitation, including to people who were not looking when they arrived.',
      },
      { kind: 'h2', text: 'Why most companies do not have one' },
      {
        kind: 'p',
        text: 'Not because they disagree. Because building it is more work than it looks. A careers page that is actually useful needs per-posting pages that can be indexed individually, a way for the team to publish a role without a developer, an application flow that does not lose candidates, and somewhere for applications to land that is not an inbox.',
      },
      {
        kind: 'p',
        text: 'That is a small product. It is why "we should do our own careers page" sits on a list for a year, and why the board gets used again.',
      },
      { kind: 'h2', text: 'How OneclickHR handles it' },
      {
        kind: 'p',
        text: 'The public job board in OneclickHR is generated from the jobs you post in your workspace. It is built to be crawled and indexed, with pages a search for the role can find, and it carries the brand color configured in your workspace settings — so it looks like your company rather than like your HR vendor.',
      },
      {
        kind: 'p',
        text: 'You can point your own custom domain at it from workspace settings. That is the part that makes the search authority yours: postings live under your domain, and what they earn stays with you.',
      },
      {
        kind: 'p',
        text: 'Candidates apply directly through the board with their own lightweight external account. They see their own application and nothing else — no organization seat, no visibility into your workspace. Applications are tracked against the job they came in on, so the state of a pipeline is a screen rather than a reconstructed email thread. Candidates who were good but not right for one role go into the talent pool, so the next opening starts with people you have already met.',
      },
      { kind: 'h2', text: 'Recruiters, scoped to the job' },
      {
        kind: 'p',
        text: 'Hiring usually involves people who should not see the rest of your HR system. An external recruiter working one role does not need the payroll module, the attendance sheet, or the other eleven roles in your pipeline.',
      },
      {
        kind: 'p',
        text: 'Recruiter is its own role in OneclickHR, with scoped access to the hiring side only, and that access is toggleable per job. When a recruiter’s engagement on a role ends, you toggle it off and the access is gone on the next request — permissions are re-checked against the database rather than trusted from an existing session.',
      },
      {
        kind: 'p',
        text: 'Those boundaries are enforced in Postgres with Row Level Security rather than by hiding parts of the interface, which is what makes it safe to give an outside recruiter an account at all.',
      },
      { kind: 'h2', text: 'A sensible setup' },
      {
        kind: 'p',
        text: 'Owning your careers page does not mean abandoning distribution. The arrangement that works looks like this.',
      },
      {
        kind: 'ol',
        items: [
          'Put the careers board on a domain you control, and link to it from your main site navigation rather than burying it in a footer.',
          'Write the posting once, on your own page, and treat that page as the canonical version of the role.',
          'Use boards and social posts as distribution that links back to your page, so traffic you pay for or earn lands somewhere that keeps the benefit.',
          'Fill internally first where you can. Employees see an internal job board in their own portal, so an opening can be offered inside before it goes public.',
          'Keep the talent pool current, because the cheapest hire is someone you already interviewed.',
        ],
      },
      {
        kind: 'quote',
        text: 'Distribution can be rented. The page it points at should not be.',
      },
      {
        kind: 'p',
        text: 'For staffing and consulting firms the argument is stronger still, because hiring is the business rather than an occasional need. Placements are tracked as their own records, the careers domain is a channel you are building permanently, and every posting that ranks is an asset on the balance sheet rather than a month of rent.',
      },
    ],
  },
]

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug)

export const postSlugs = posts.map((p) => p.slug)

export const sortedPosts = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))
