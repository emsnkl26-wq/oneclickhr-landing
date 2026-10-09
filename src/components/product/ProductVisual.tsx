import type { ProductVisualKey } from '@/content/types'
import {
  AttendanceVisual,
  CalendarVisual,
  DashboardVisual,
  DocumentsVisual,
  HelpdeskVisual,
  InvoiceVisual,
  JobsVisual,
  KanbanVisual,
  LeaveVisual,
  NotificationsVisual,
  OnboardingVisual,
  PayslipVisual,
  PortalVisual,
  SettingsVisual,
  TimesheetVisual,
  WorkAuthVisual,
} from './visuals'

const registry: Record<ProductVisualKey, () => React.JSX.Element> = {
  attendance: AttendanceVisual,
  leave: LeaveVisual,
  payslip: PayslipVisual,
  timesheet: TimesheetVisual,
  invoice: InvoiceVisual,
  'work-auth': WorkAuthVisual,
  kanban: KanbanVisual,
  jobs: JobsVisual,
  documents: DocumentsVisual,
  calendar: CalendarVisual,
  helpdesk: HelpdeskVisual,
  notifications: NotificationsVisual,
  onboarding: OnboardingVisual,
  settings: SettingsVisual,
  portal: PortalVisual,
  dashboard: DashboardVisual,
}

/** Content modules name a visual by key; this is the only place that maps it. */
export function ProductVisual({ name }: { name: ProductVisualKey }) {
  const Visual = registry[name]
  return <Visual />
}
