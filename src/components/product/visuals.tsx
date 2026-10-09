import {
  Bell,
  CalendarCheck,
  CheckCircle2,
  Clock,
  FileText,
  Paperclip,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Avatar, Bar, Frame, Label, Row, Status } from './Frame'

export function AttendanceVisual() {
  const rows = [
    {
      name: 'Priya Raman',
      initials: 'PR',
      inTime: '09:02',
      outTime: '18:10',
      shift: 'Day',
      late: false,
    },
    {
      name: 'Daniel Osei',
      initials: 'DO',
      inTime: '09:41',
      outTime: '18:30',
      shift: 'Day',
      late: true,
    },
    {
      name: 'Mei Tanaka',
      initials: 'MT',
      inTime: '08:55',
      outTime: '17:45',
      shift: 'Day',
      late: false,
    },
    {
      name: 'Omar Haddad',
      initials: 'OH',
      inTime: '21:58',
      outTime: '06:05',
      shift: 'Night',
      late: false,
    },
  ]

  return (
    <Frame
      title="Attendance — day sheet"
      footer={
        <p className="text-[0.625rem] text-ink-muted">
          Calendar day computed in Asia/Kolkata, your organization timezone
        </p>
      }
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <Label>Tuesday</Label>
          <p className="text-sm font-semibold text-ink">15 September</p>
        </div>
        <div className="flex gap-4 text-right">
          <div>
            <Label>Present</Label>
            <p className="text-sm font-semibold text-ink">42</p>
          </div>
          <div>
            <Label>Late</Label>
            <p className="text-sm font-semibold text-brand-ink">3</p>
          </div>
          <div>
            <Label>On leave</Label>
            <p className="text-sm font-semibold text-ink">2</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-3 pb-1.5">
        <Label>Employee</Label>
        <Label>In</Label>
        <Label>Out</Label>
        <Label>Shift</Label>
      </div>

      <div>
        {rows.map((r) => (
          <div
            key={r.name}
            className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-3 border-b border-line py-2.5 last:border-0"
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <Avatar initials={r.initials} />
              <span className="truncate text-xs font-medium text-ink">{r.name}</span>
            </span>
            <span className="flex items-center gap-1.5 text-xs tabular-nums text-ink-muted">
              {r.inTime}
              {r.late ? <Status tone="warning">Late</Status> : null}
            </span>
            <span className="text-xs tabular-nums text-ink-muted">{r.outTime}</span>
            <Status tone={r.shift === 'Night' ? 'info' : 'neutral'}>{r.shift}</Status>
          </div>
        ))}
      </div>
    </Frame>
  )
}

export function LeaveVisual() {
  return (
    <Frame title="Leave — requests">
      <div className="mb-4 grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
        {[
          { label: 'Annual', used: 8, total: 20 },
          { label: 'Sick', used: 2, total: 10 },
          { label: 'Unpaid', used: 0, total: 5 },
        ].map((b) => (
          <div key={b.label} className="rounded-lg border border-line p-2.5">
            <Label>{b.label}</Label>
            <p className="mt-1 text-sm font-semibold tabular-nums text-ink">
              {b.total - b.used}
              <span className="text-xs font-normal text-ink-subtle"> / {b.total} left</span>
            </p>
            <span className="mt-2 block">
              <Bar value={(b.used / b.total) * 100} />
            </span>
          </div>
        ))}
      </div>

      <div>
        {[
          {
            name: 'Priya Raman',
            initials: 'PR',
            dates: '22–26 Sep',
            type: 'Annual',
            state: 'Approved',
          },
          { name: 'Daniel Osei', initials: 'DO', dates: '30 Sep', type: 'Sick', state: 'Pending' },
          {
            name: 'Mei Tanaka',
            initials: 'MT',
            dates: '6–7 Oct',
            type: 'Annual',
            state: 'Pending',
          },
          {
            name: 'Omar Haddad',
            initials: 'OH',
            dates: '12 Sep',
            type: 'Unpaid',
            state: 'Declined',
          },
        ].map((r) => (
          <Row key={r.name}>
            <Avatar initials={r.initials} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-medium text-ink">{r.name}</span>
              <span className="block text-[0.6875rem] text-ink-subtle">
                {r.dates} · {r.type}
              </span>
            </span>
            <Status
              tone={
                r.state === 'Approved' ? 'success' : r.state === 'Declined' ? 'danger' : 'warning'
              }
            >
              {r.state}
            </Status>
          </Row>
        ))}
      </div>
    </Frame>
  )
}

export function PayslipVisual() {
  return (
    <Frame
      title="Payroll run — review"
      footer={
        <div className="flex items-center gap-2">
          <ShieldCheck aria-hidden="true" className="size-3.5 text-brand-ink" />
          <p className="text-[0.625rem] text-ink-muted">
            Not finalized. Read every line, then finalize.
          </p>
        </div>
      }
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <Label>Pay period</Label>
          <p className="text-sm font-semibold text-ink">1–30 September</p>
        </div>
        <Status tone="warning">In review</Status>
      </div>

      <div className="rounded-lg border border-line">
        <div className="flex items-center justify-between border-b border-line px-3 py-2.5">
          <span className="flex items-center gap-2.5">
            <Avatar initials="PR" tone="brand" />
            <span>
              <span className="block text-xs font-semibold text-ink">Priya Raman</span>
              <span className="block text-[0.6875rem] text-ink-subtle">Engineering · INR</span>
            </span>
          </span>
          <Label>Standard format</Label>
        </div>
        <dl className="divide-y divide-line">
          {[
            ['Basic', '92,000.00'],
            ['Overtime · 6.5h', '7,312.50'],
            ['Allowances', '8,500.00'],
            ['Deductions', '−11,480.00'],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between px-3 py-2">
              <dt className="text-[0.6875rem] text-ink-muted">{k}</dt>
              <dd className="text-xs tabular-nums text-ink">{v}</dd>
            </div>
          ))}
          <div className="flex items-center justify-between bg-brand-50 px-3 py-2.5">
            <dt className="text-xs font-semibold text-ink">Net pay</dt>
            <dd className="text-sm font-semibold tabular-nums text-brand-ink">₹96,332.50</dd>
          </div>
        </dl>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
        {[
          ['Employees', '44'],
          ['Hours read', '7,124'],
          ['Currencies', '3'],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-line p-2.5">
            <Label>{k}</Label>
            <p className="mt-0.5 text-sm font-semibold tabular-nums text-ink">{v}</p>
          </div>
        ))}
      </div>
    </Frame>
  )
}

export function TimesheetVisual() {
  const days = [
    { day: 'Mon', hours: 8, project: 'Northwind · Migration' },
    { day: 'Tue', hours: 8, project: 'Northwind · Migration' },
    { day: 'Wed', hours: 7.5, project: 'Lumen · Discovery' },
    { day: 'Thu', hours: 8, project: 'Lumen · Discovery' },
    { day: 'Fri', hours: 6, project: 'Internal · Enablement' },
  ]
  const total = days.reduce((sum, d) => sum + d.hours, 0)

  return (
    <Frame
      title="Timesheet — week 38"
      footer={
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[0.625rem] text-ink-muted">
            <Paperclip aria-hidden="true" className="size-3" />2 attachments
          </span>
          <span className="text-[0.625rem] font-semibold tabular-nums text-ink">
            {total.toFixed(1)}h total
          </span>
        </div>
      }
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <Label>Week of</Label>
          <p className="text-sm font-semibold text-ink">15–19 September</p>
        </div>
        <Status tone="success">Approved</Status>
      </div>

      <div>
        {days.map((d) => (
          <Row key={d.day}>
            <span className="w-9 shrink-0 text-[0.6875rem] font-semibold text-ink-subtle">
              {d.day}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs text-ink">{d.project}</span>
              <span className="mt-1.5 block">
                <Bar value={(d.hours / 8) * 100} tone={d.hours < 8 ? 'muted' : 'brand'} />
              </span>
            </span>
            <span className="w-10 shrink-0 text-right text-xs font-medium tabular-nums text-ink">
              {d.hours.toFixed(1)}
            </span>
          </Row>
        ))}
      </div>
    </Frame>
  )
}

export function InvoiceVisual() {
  return (
    <Frame title="Invoicing — workspace">
      <div className="mb-4 grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
        {[
          ['Invoiced', '$184,200'],
          ['Outstanding', '$36,800'],
          ['Expenses', '$12,410'],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-line p-2.5">
            <Label>{k}</Label>
            <p className="mt-0.5 text-sm font-semibold tabular-nums text-ink">{v}</p>
          </div>
        ))}
      </div>

      <div>
        {[
          { no: 'INV-2041', client: 'Northwind Group', amount: '$42,600', state: 'Sent' },
          { no: 'INV-2040', client: 'Lumen Partners', amount: '$28,150', state: 'Paid' },
          { no: 'INV-2039', client: 'Aster Health', amount: '$19,480', state: 'Paid' },
          { no: 'INV-2038', client: 'Northwind Group', amount: '$8,200', state: 'Draft' },
        ].map((r) => (
          <Row key={r.no}>
            <FileText aria-hidden="true" className="size-4 shrink-0 text-ink-subtle" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-medium text-ink">{r.client}</span>
              <span className="block text-[0.6875rem] tabular-nums text-ink-subtle">{r.no}</span>
            </span>
            <span className="text-xs font-medium tabular-nums text-ink">{r.amount}</span>
            <Status tone={r.state === 'Paid' ? 'success' : r.state === 'Sent' ? 'info' : 'neutral'}>
              {r.state}
            </Status>
          </Row>
        ))}
      </div>
    </Frame>
  )
}

export function WorkAuthVisual() {
  return (
    <Frame
      title="Work authorization"
      footer={
        <p className="text-[0.625rem] text-ink-muted">
          Each milestone reminder is sent exactly once
        </p>
      }
    >
      <div className="mb-4">
        <Label>Upcoming expiries</Label>
      </div>
      <div>
        {[
          {
            name: 'Omar Haddad',
            initials: 'OH',
            expiry: '14 Dec 2026',
            days: 66,
            sent: '90-day sent',
          },
          {
            name: 'Mei Tanaka',
            initials: 'MT',
            expiry: '03 Mar 2027',
            days: 145,
            sent: 'None due',
          },
          {
            name: 'Daniel Osei',
            initials: 'DO',
            expiry: '29 Oct 2026',
            days: 20,
            sent: '30-day sent',
          },
        ].map((r) => (
          <Row key={r.name}>
            <Avatar initials={r.initials} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-medium text-ink">{r.name}</span>
              <span className="block text-[0.6875rem] text-ink-subtle">Expires {r.expiry}</span>
            </span>
            <span className="text-[0.6875rem] text-ink-muted">{r.sent}</span>
            <Status tone={r.days < 30 ? 'danger' : r.days < 90 ? 'warning' : 'neutral'}>
              {r.days}d
            </Status>
          </Row>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-line bg-surface-muted p-3">
        <div className="flex items-start gap-2.5">
          <Bell aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-brand-ink" />
          <div>
            <p className="text-[0.6875rem] font-semibold text-ink">Milestone reminder delivered</p>
            <p className="mt-0.5 text-[0.625rem] leading-relaxed text-ink-muted">
              30-day notice for Daniel Osei — sent once, recorded, job run reported success.
            </p>
          </div>
        </div>
      </div>
    </Frame>
  )
}

export function KanbanVisual() {
  const columns = [
    {
      name: 'To do',
      cards: [
        {
          title: 'Draft Q4 onboarding checklist',
          initials: 'PR',
          tone: 'muted' as const,
          tag: 'HR ops',
        },
        {
          title: 'Collect Northwind sign-off',
          initials: 'DO',
          tone: 'muted' as const,
          tag: 'Client',
        },
      ],
    },
    {
      name: 'In progress',
      cards: [
        {
          title: 'Migrate Lumen payroll history',
          initials: 'MT',
          tone: 'brand' as const,
          tag: 'Payroll',
        },
      ],
    },
    {
      name: 'Done',
      cards: [
        { title: 'Publish two new roles', initials: 'OH', tone: 'muted' as const, tag: 'Hiring' },
        {
          title: 'Approve week 37 timesheets',
          initials: 'PR',
          tone: 'muted' as const,
          tag: 'Billing',
        },
      ],
    },
  ]

  return (
    <Frame
      title="Tasks — Northwind migration"
      footer={
        <p className="flex items-center gap-1.5 text-[0.625rem] text-ink-muted">
          <span className="size-1.5 rounded-full bg-success" />
          Live for everyone on this board
        </p>
      }
    >
      <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
        {columns.map((col) => (
          <div key={col.name}>
            <div className="mb-2 flex items-center justify-between">
              <Label>{col.name}</Label>
              <span className="text-[0.625rem] tabular-nums text-ink-subtle">
                {col.cards.length}
              </span>
            </div>
            <div className="space-y-2">
              {col.cards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-lg border border-line bg-surface-card p-2.5"
                >
                  <p className="text-[0.6875rem] font-medium leading-snug text-ink">{card.title}</p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <Status tone={card.tone === 'brand' ? 'brand' : 'neutral'}>{card.tag}</Status>
                    <Avatar initials={card.initials} tone={card.tone} />
                  </div>
                </div>
              ))}
              {col.name === 'In progress' ? (
                <div className="rounded-lg border border-dashed border-brand-200 bg-brand-50/50 p-2.5">
                  <p className="text-[0.625rem] font-medium text-brand-ink">Drop here</p>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </Frame>
  )
}

export function JobsVisual() {
  return (
    <Frame
      title="careers.yourcompany.com"
      footer={<p className="text-[0.625rem] text-ink-muted">Your domain, your brand, indexed</p>}
    >
      <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
        <div className="flex items-center gap-2">
          <span className="size-5 rounded bg-brand-600" />
          <span className="text-xs font-bold text-ink">Open roles</span>
        </div>
        <span className="text-[0.625rem] text-ink-subtle">4 positions</span>
      </div>

      <div>
        {[
          { title: 'Senior Payroll Specialist', place: 'Remote · Full-time', apps: 18 },
          { title: 'Technical Recruiter', place: 'Austin, TX · Full-time', apps: 31 },
          { title: 'Implementation Consultant', place: 'Remote · Contract', apps: 9 },
          { title: 'Accounts Receivable Lead', place: 'Pune, IN · Full-time', apps: 24 },
        ].map((r) => (
          <Row key={r.title}>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-medium text-ink">{r.title}</span>
              <span className="block text-[0.6875rem] text-ink-subtle">{r.place}</span>
            </span>
            <span className="text-[0.625rem] tabular-nums text-ink-muted">{r.apps} applied</span>
            <Status tone="brand">Apply</Status>
          </Row>
        ))}
      </div>
    </Frame>
  )
}

export function DocumentsVisual() {
  return (
    <Frame
      title="Documents — Priya Raman"
      footer={
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[0.625rem] text-ink-muted">Storage used</span>
            <span className="text-[0.625rem] font-semibold tabular-nums text-ink">
              4.2 of 25 GB
            </span>
          </div>
          <Bar value={17} />
        </div>
      }
    >
      <div className="mb-3 flex items-center justify-between">
        <Label>Generated and uploaded</Label>
        <Status tone="brand">New letter</Status>
      </div>
      <div>
        {[
          { name: 'Offer letter.pdf', meta: 'Generated from template · 184 KB', ok: true },
          {
            name: 'Employment verification.pdf',
            meta: 'Generated from template · 121 KB',
            ok: true,
          },
          { name: 'Payslip Sep 2026.pdf', meta: 'Standard format · 96 KB', ok: true },
          { name: 'ID scan.png', meta: 'Validated on upload · 2.1 MB', ok: true },
        ].map((r) => (
          <Row key={r.name}>
            <FileText aria-hidden="true" className="size-4 shrink-0 text-ink-subtle" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-medium text-ink">{r.name}</span>
              <span className="block truncate text-[0.6875rem] text-ink-subtle">{r.meta}</span>
            </span>
            {r.ok ? (
              <CheckCircle2 aria-hidden="true" className="size-3.5 shrink-0 text-success" />
            ) : null}
          </Row>
        ))}
      </div>
    </Frame>
  )
}

export function CalendarVisual() {
  const week = [
    { day: 'Mon', date: 15, items: [{ label: 'Standup', tone: 'neutral' as const }] },
    { day: 'Tue', date: 16, items: [{ label: 'Payroll review', tone: 'brand' as const }] },
    { day: 'Wed', date: 17, items: [{ label: 'P. Raman — leave', tone: 'info' as const }] },
    { day: 'Thu', date: 18, items: [{ label: 'Client check-in', tone: 'neutral' as const }] },
    { day: 'Fri', date: 19, items: [{ label: 'All hands', tone: 'neutral' as const }] },
  ]

  return (
    <Frame
      title="Calendar — organization"
      footer={
        <p className="flex items-center gap-1.5 text-[0.625rem] text-ink-muted">
          <CalendarCheck aria-hidden="true" className="size-3" />
          Synced with Google Calendar
        </p>
      }
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <Label>September 2026</Label>
          <p className="text-sm font-semibold text-ink">Week 38</p>
        </div>
        <div className="flex gap-2">
          <Status tone="brand">Meetings</Status>
          <Status tone="info">Leave</Status>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 min-[420px]:grid-cols-3 sm:grid-cols-5">
        {week.map((d) => (
          <div key={d.day} className="rounded-lg border border-line p-2">
            <p className="text-[0.625rem] font-semibold uppercase text-ink-subtle">{d.day}</p>
            <p className="text-sm font-semibold tabular-nums text-ink">{d.date}</p>
            <div className="mt-2 space-y-1">
              {d.items.map((item) => (
                <span
                  key={item.label}
                  className={
                    item.tone === 'brand'
                      ? 'block rounded bg-brand-50 px-1.5 py-1 text-[0.5625rem] font-medium leading-tight text-brand-ink'
                      : item.tone === 'info'
                        ? 'block rounded bg-info/10 px-1.5 py-1 text-[0.5625rem] font-medium leading-tight text-info'
                        : 'block rounded bg-surface-muted px-1.5 py-1 text-[0.5625rem] font-medium leading-tight text-ink-muted'
                  }
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Frame>
  )
}

export function HelpdeskVisual() {
  return (
    <Frame title="Help desk — ticket #418">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-ink">
            Can I get an employment verification letter?
          </p>
          <p className="mt-0.5 text-[0.6875rem] text-ink-subtle">
            Opened by Daniel Osei · 2 days ago
          </p>
        </div>
        <Status tone="success">Resolved</Status>
      </div>

      <div className="space-y-2.5">
        {[
          {
            initials: 'DO',
            name: 'Daniel Osei',
            tone: 'muted' as const,
            text: 'My landlord needs a letter confirming my role and start date.',
          },
          {
            initials: 'HR',
            name: 'People team',
            tone: 'brand' as const,
            text: 'Generated it from the verification template — it is in your documents now.',
          },
          {
            initials: 'DO',
            name: 'Daniel Osei',
            tone: 'muted' as const,
            text: 'Got it, thank you.',
          },
        ].map((m, i) => (
          <div key={i} className="flex gap-2.5">
            <Avatar initials={m.initials} tone={m.tone} />
            <div className="min-w-0 flex-1 rounded-lg border border-line bg-surface-muted px-3 py-2">
              <p className="text-[0.625rem] font-semibold text-ink">{m.name}</p>
              <p className="mt-0.5 text-[0.6875rem] leading-relaxed text-ink-muted">{m.text}</p>
            </div>
          </div>
        ))}
      </div>
    </Frame>
  )
}

export function NotificationsVisual() {
  return (
    <Frame title="Notifications">
      <div className="mb-3 flex items-center justify-between">
        <Label>Today</Label>
        <Status tone="brand">3 new</Status>
      </div>
      <div>
        {[
          {
            icon: CheckCircle2,
            text: 'Mei Tanaka approved your week 38 timesheet',
            meta: 'In-app · 9:12',
          },
          {
            icon: Bell,
            text: 'Work authorization expiry in 30 days — Daniel Osei',
            meta: 'Email · 8:00',
          },
          {
            icon: FileText,
            text: 'Your September payslip is available',
            meta: 'Email · yesterday',
          },
          {
            icon: Clock,
            text: 'Two leave requests are waiting on you',
            meta: 'Web push · yesterday',
          },
        ].map((r) => (
          <Row key={r.text}>
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-50">
              <r.icon aria-hidden="true" className="size-3.5 text-brand-ink" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs text-ink">{r.text}</span>
              <span className="block text-[0.6875rem] text-ink-subtle">{r.meta}</span>
            </span>
          </Row>
        ))}
      </div>
    </Frame>
  )
}

export function OnboardingVisual() {
  const steps = [
    { label: 'Confirm your email', done: true },
    { label: 'Set organization timezone', done: true },
    { label: 'Choose your brand color', done: true },
    { label: 'Add departments and team roles', done: false, current: true },
    { label: 'Set your overtime policy', done: false },
    { label: 'Invite your team', done: false },
  ]
  const completed = steps.filter((s) => s.done).length

  return (
    <Frame
      title="Workspace setup"
      footer={
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[0.625rem] text-ink-muted">Setup progress</span>
            <span className="text-[0.625rem] font-semibold tabular-nums text-ink">
              {completed} of {steps.length}
            </span>
          </div>
          <Bar value={(completed / steps.length) * 100} />
        </div>
      }
    >
      <div className="mb-3 flex items-center gap-2">
        <Sparkles aria-hidden="true" className="size-4 text-brand-ink" />
        <p className="text-xs font-semibold text-ink">Let us get your workspace ready</p>
      </div>
      <ul className="space-y-0.5">
        {steps.map((s) => (
          <li key={s.label} className="flex items-center gap-2.5 py-1.5">
            {s.done ? (
              <CheckCircle2 aria-hidden="true" className="size-4 shrink-0 text-success" />
            ) : (
              <span
                className={
                  s.current
                    ? 'size-4 shrink-0 rounded-full border-2 border-brand-600'
                    : 'size-4 shrink-0 rounded-full border border-line'
                }
              />
            )}
            <span
              className={
                s.current
                  ? 'text-xs font-semibold text-ink'
                  : s.done
                    ? 'text-xs text-ink-muted line-through decoration-line'
                    : 'text-xs text-ink-muted'
              }
            >
              {s.label}
            </span>
          </li>
        ))}
      </ul>
    </Frame>
  )
}

export function SettingsVisual() {
  return (
    <Frame title="Workspace settings">
      <div className="mb-4 rounded-lg border border-line p-3">
        <Label>Brand color</Label>
        <div className="mt-2 flex items-center gap-2">
          {['bg-brand-600', 'bg-brand-700', 'bg-brand-800', 'bg-info', 'bg-success'].map((c, i) => (
            <span
              key={c}
              className={`size-6 rounded-full ${c} ${i === 0 ? 'ring-2 ring-brand-700 ring-offset-2 ring-offset-surface-card' : ''}`}
            />
          ))}
          <span className="ml-auto text-[0.625rem] font-medium tabular-nums text-ink-muted">
            #FF6A00
          </span>
        </div>
        <p className="mt-2 text-[0.625rem] leading-relaxed text-ink-subtle">
          Applied across the app, transactional emails and every generated PDF.
        </p>
      </div>

      <div>
        {[
          { label: 'Organization timezone', value: 'Asia/Kolkata' },
          { label: 'Pay schedule', value: 'Monthly, last working day' },
          { label: 'Overtime policy', value: 'Above 8h/day at 1.5×' },
          { label: 'Careers domain', value: 'careers.yourcompany.com' },
        ].map((r) => (
          <Row key={r.label}>
            <span className="min-w-0 flex-1 truncate text-xs text-ink-muted">{r.label}</span>
            <span className="truncate text-xs font-medium text-ink">{r.value}</span>
          </Row>
        ))}
      </div>

      <div className="mt-3 rounded-lg border border-line p-3">
        <Label>Team roles</Label>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {['Owner', 'HR admin', 'Payroll', 'Recruiter', 'Manager', 'Employee'].map((role) => (
            <Status key={role} tone={role === 'Payroll' ? 'brand' : 'neutral'}>
              {role}
            </Status>
          ))}
        </div>
      </div>
    </Frame>
  )
}

export function PortalVisual() {
  return (
    <Frame
      title="My workspace — Priya Raman"
      footer={<p className="text-[0.625rem] text-ink-muted">Your own records, and only your own</p>}
    >
      <div className="mb-4 flex items-center justify-between rounded-lg border border-line bg-brand-50 p-3">
        <div>
          <Label>Clocked in</Label>
          <p className="text-sm font-semibold tabular-nums text-brand-ink">09:02 · 6h 24m</p>
        </div>
        <Status tone="brand">Clock out</Status>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {[
          { label: 'Leave left', value: '12 days' },
          { label: 'Last payslip', value: 'Sep 2026' },
          { label: 'Week 38 timesheet', value: 'Approved' },
          { label: 'Open tasks', value: '4' },
          { label: 'Documents', value: '7 files' },
          { label: 'Next meeting', value: 'Tue 10:00' },
        ].map((t) => (
          <div key={t.label} className="rounded-lg border border-line p-2.5">
            <Label>{t.label}</Label>
            <p className="mt-0.5 text-xs font-semibold text-ink">{t.value}</p>
          </div>
        ))}
      </div>
    </Frame>
  )
}

export function DashboardVisual() {
  return (
    <Frame
      title="OneclickHR — overview"
      footer={
        <p className="text-[0.625rem] text-ink-muted">
          One workspace, fully isolated from every other organization
        </p>
      }
    >
      <div className="mb-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {[
          { label: 'Employees', value: '44' },
          { label: 'Present today', value: '42' },
          { label: 'Pending leave', value: '2' },
          { label: 'Open invoices', value: '5' },
        ].map((t) => (
          <div key={t.label} className="rounded-lg border border-line p-2.5">
            <Label>{t.label}</Label>
            <p className="mt-0.5 text-base font-semibold tabular-nums text-ink">{t.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-line p-3">
          <div className="mb-2.5 flex items-center justify-between">
            <Label>Needs you</Label>
            <Status tone="warning">4</Status>
          </div>
          <ul className="space-y-2">
            {['Payroll run · September', '2 leave requests', 'Week 38 timesheets · 3 left'].map(
              (t) => (
                <li key={t} className="flex items-center gap-2 text-[0.6875rem] text-ink-muted">
                  <span className="size-1.5 shrink-0 rounded-full bg-brand-600" />
                  <span className="truncate">{t}</span>
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="rounded-lg border border-line p-3">
          <Label>Attendance this week</Label>
          <div className="mt-3 flex h-16 items-end gap-1.5">
            {[88, 94, 97, 92, 96, 34, 12].map((v, i) => (
              <span
                key={i}
                className={`flex-1 rounded-t ${i > 4 ? 'bg-surface-muted' : 'bg-brand-600'}`}
                style={{ height: `${v}%` }}
              />
            ))}
          </div>
          <div className="mt-1.5 flex justify-between text-[0.5625rem] text-ink-subtle">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <span key={i} className="flex-1 text-center">
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  )
}
