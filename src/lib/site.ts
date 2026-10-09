export const site = {
  name: 'OneclickHR',
  legalEntity: 'Nextkin Life LLC',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://oneclickhr.app',
  appUrl: 'https://app.oneclickhr.app',
  signupUrl: 'https://app.oneclickhr.app/signup',
  loginUrl: 'https://app.oneclickhr.app/login',
  tagline: 'HR Management in One Click.',
  shortTagline: 'People. Processes. Progress.',
  description:
    'Modern HR and organization management — attendance, leave, payroll, work authorization and tasks in one calm place.',
  contactEmail: 'hello@oneclickhr.app',
  securityEmail: 'security@oneclickhr.app',
  privacyEmail: 'privacy@oneclickhr.app',
  /* Single source of truth for the "last updated" line on legal pages. */
  legalUpdated: '2026-10-09',
} as const

export const legalUpdatedLabel = 'October 9, 2026'
