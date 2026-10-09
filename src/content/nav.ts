import { features } from './features'
import { solutions } from './solutions'

export type NavLink = { label: string; href: string; description?: string }

/** Top-level header items. Product and Solutions open a mega-menu. */
export const primaryNav = [
  { label: 'Product', href: '/product', menu: 'product' as const },
  { label: 'Solutions', href: '/solutions/small-business', menu: 'solutions' as const },
  { label: 'Security', href: '/security' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Changelog', href: '/changelog' },
]

export const productMenu = {
  featured: [
    { label: 'Product tour', href: '/product', description: 'Every module, in one long read.' },
    {
      label: 'Security and isolation',
      href: '/security',
      description: 'How a workspace stays separate, enforced in the database.',
    },
    {
      label: 'Integrations',
      href: '/integrations',
      description: 'Google Calendar, email, storage, web push, custom domains.',
    },
  ] satisfies NavLink[],
  modules: features.map((f) => ({
    label: f.name,
    href: `/features/${f.slug}`,
    description: f.summary,
  })) satisfies NavLink[],
}

export const solutionsMenu = solutions.map((s) => ({
  label: s.name,
  href: `/solutions/${s.slug}`,
  description: s.summary,
})) satisfies NavLink[]

export const footerColumns: { heading: string; links: NavLink[] }[] = [
  {
    heading: 'Product',
    links: [
      { label: 'Product tour', href: '/product' },
      { label: 'Attendance', href: '/features/attendance' },
      { label: 'Leave', href: '/features/leave' },
      { label: 'Payroll', href: '/features/payroll' },
      { label: 'Timesheets', href: '/features/timesheets' },
      { label: 'Recruiting', href: '/features/recruiting' },
      { label: 'Employee portal', href: '/features/employee-portal' },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'Small business', href: '/solutions/small-business' },
      { label: 'Staffing and consulting', href: '/solutions/staffing-and-consulting' },
      { label: 'Remote teams', href: '/solutions/remote-teams' },
      { label: 'HR teams', href: '/solutions/hr-teams' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
      { label: 'Security', href: '/security' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Integrations', href: '/integrations' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy', href: '/legal/privacy' },
      { label: 'Terms', href: '/legal/terms' },
      { label: 'Data processing', href: '/legal/dpa' },
      { label: 'Cookies', href: '/legal/cookies' },
      { label: 'Subprocessors', href: '/legal/subprocessors' },
    ],
  },
]
