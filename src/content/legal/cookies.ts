import type { LegalDoc } from '../types'

export const cookies: LegalDoc = {
  slug: 'cookies',
  title: 'Cookie Policy',
  metaDescription:
    'What OneclickHR stores in your browser. This marketing site uses no analytics or advertising cookies; the application uses cookies only to keep you signed in.',
  summary:
    'In plain language: this marketing website sets no analytics or advertising cookies, and there is nothing to consent to here. It stores one small item locally to remember whether you chose light or dark mode. The application at app.oneclickhr.app uses cookies strictly to keep you signed in and secure.',
  sections: [
    {
      heading: '1. The short version',
      blocks: [
        {
          kind: 'p',
          text: 'We do not run advertising, we do not build behavioral profiles, and we do not load third-party trackers on this website. That is a product decision as much as a privacy one: third-party scripts slow a site down and we would rather it were fast.',
        },
        {
          kind: 'p',
          text: 'As a result, this site does not show a cookie consent banner, because there is no non-essential tracking to consent to.',
        },
      ],
    },
    {
      heading: '2. What this website stores',
      blocks: [
        {
          kind: 'p',
          text: 'One item, and it is not a cookie in the sense of something sent to a server.',
        },
        {
          kind: 'ul',
          items: [
            'Theme preference. When you use the light and dark toggle in the header, your choice is saved in your browser’s local storage so the site does not flash the wrong theme on your next visit. It contains a single value such as "dark", "light" or "system". It is never transmitted to us, and it identifies nothing about you.',
          ],
        },
        {
          kind: 'p',
          text: 'If you clear your browser storage, the site reverts to following your operating system’s appearance setting. Nothing else breaks.',
        },
      ],
    },
    {
      heading: '3. What this website does not use',
      blocks: [
        {
          kind: 'ul',
          items: [
            'No analytics scripts. We have left a documented, commented-out slot in the codebase for a privacy-respecting analytics tool, and nothing is enabled today. If that changes we will update this page before it ships.',
            'No advertising or retargeting pixels.',
            'No social media embeds that set cookies.',
            'No third-party fonts loaded at request time. The Inter typeface is self-hosted and served from our own domain, so your browser does not contact a font provider.',
            'No session recording, heatmaps or chat widgets.',
          ],
        },
      ],
    },
    {
      heading: '4. Server logs',
      blocks: [
        {
          kind: 'p',
          text: 'Separately from cookies, our hosting provider generates standard server logs when your browser requests a page: your IP address, user agent, the URL requested, the referrer and a timestamp. This is a normal part of serving web traffic rather than tracking, and it is retained for a limited period. Our contact form additionally holds short-lived, in-memory rate-limiting state keyed by IP address to prevent abuse; it is never written to durable storage.',
        },
      ],
    },
    {
      heading: '5. The application',
      blocks: [
        {
          kind: 'p',
          text: 'The OneclickHR application at app.oneclickhr.app is a separate system from this website. It uses cookies that are strictly necessary to operate:',
        },
        {
          kind: 'ul',
          items: [
            'Authentication and session cookies, set by our authentication provider, which keep you signed in to your workspace and carry the signed token that identifies your organization and role.',
            'Security cookies used to protect against request forgery.',
            'Interface preference storage, such as a remembered theme choice.',
          ],
        },
        {
          kind: 'p',
          text: 'These are essential cookies. Blocking them prevents you from signing in, because there would be no way for the application to recognize your session. The application does not run advertising cookies either.',
        },
      ],
    },
    {
      heading: '6. Managing what your browser stores',
      blocks: [
        {
          kind: 'p',
          text: 'Every major browser lets you view and delete cookies and local storage, per site and in bulk, in its privacy settings. You can block storage for a site entirely. For this marketing website the only consequence is that your theme choice will not persist. For the application, blocking storage will prevent sign-in.',
        },
      ],
    },
    {
      heading: '7. Changes',
      blocks: [
        {
          kind: 'p',
          text: 'If we introduce analytics or any other non-essential storage, we will update this page and, where consent is required, ask for it before setting anything. The date at the top of this page reflects the most recent revision. Questions: privacy@oneclickhr.app.',
        },
      ],
    },
  ],
}
