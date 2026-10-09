# OneclickHR — marketing site

The marketing website for **OneclickHR**, served at `https://oneclickhr.app`. OneclickHR is a
product of **Nextkin Life LLC**.

This repository contains the public site only. It has no database, no user accounts and no auth.

## Relationship to the application

The product itself lives at `https://app.oneclickhr.app` in a **separate codebase**. This site never
reimplements anything the app does. Every "Start free", "Log in" or "Sign up" call to action points
at the app:

| Intent       | Destination                         |
| ------------ | ----------------------------------- |
| Sign up      | `https://app.oneclickhr.app/signup` |
| Log in       | `https://app.oneclickhr.app/login`  |
| Open the app | `https://app.oneclickhr.app`        |

Those URLs live in one place — [`src/lib/site.ts`](src/lib/site.ts) — so they are never hardcoded in
a component.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run type-check # tsc --noEmit
npm run lint       # eslint
npm run format     # prettier --write
```

Requires Node 20 or newer.

## Stack

- **Next.js 15** (App Router) with **TypeScript** in strict mode. Server Components by default;
  `'use client'` only where interaction genuinely requires it (header menus, theme toggle,
  accordions, the scroll reveal, the contact form, error boundaries).
- **Tailwind CSS** with the brand tokens wired into `tailwind.config.ts`.
- No UI kit. Components are hand-built in `src/components/`.

### Dependencies, and why each one is here

| Package                   | Why                                                                                                        |
| ------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `clsx` + `tailwind-merge` | The `cn()` helper in `src/lib/cn.ts`, so conditional classes merge without conflicting Tailwind utilities. |
| `lucide-react`            | Icon set. Tree-shaken; only the icons actually imported ship.                                              |
| `next-themes`             | Light/dark with no flash on load. It writes the class on `<html>` before paint.                            |
| `zod`                     | One contact-form schema shared by the browser and the route handler, so validation cannot drift.           |

`framer-motion` was used initially for scroll reveals and has been **removed**: it put `opacity: 0`
into the server-rendered HTML, which meant a visitor without JavaScript saw a largely blank page.
`Reveal` is now CSS plus an `IntersectionObserver` and degrades to fully visible content.

## Design tokens

Tokens are defined as **raw HSL triples** in [`src/app/globals.css`](src/app/globals.css) and
consumed in Tailwind as `hsl(var(--token) / <alpha-value>)`, so opacity modifiers such as
`bg-brand-600/10` work and dark mode can redefine a token rather than forcing a `dark:` variant onto
every element. This mirrors the product app.

| Token                                        | Light     | Use                                                  |
| -------------------------------------------- | --------- | ---------------------------------------------------- |
| `brand-600`                                  | `#FF6A00` | Fills, icons, large display type, focus accents      |
| `brand-700`                                  | `#F24400` | Button press, focus ring                             |
| `brand-800`                                  | `#C93A00` | Deep accent, dark-mode washes                        |
| `brand-ink`                                  | `#C2410C` | **Orange text** on light surfaces                    |
| `charcoal`                                   | `#0F172A` | Primary text, dark surfaces, button labels on orange |
| `ink` / `ink-muted` / `ink-subtle`           | —         | Primary / secondary / label text                     |
| `surface` / `surface-card` / `surface-muted` | —         | Page, card, muted section                            |
| `line`                                       | —         | All 1px borders                                      |

### The orange-text rule — read this before using orange

`#FF6A00` is **2.9:1 on white**. It fails WCAG AA for text at any size that matters.

- Use `brand-600` for **fills, icons and large display type only**.
- For orange **text** at body or link size, use `text-brand-ink`. In dark mode that token
  automatically becomes `#FF8A3D`; you do not write a `dark:` variant.
- The primary button therefore has a **charcoal label on an orange fill** (6.2:1), not a white one
  (2.9:1). Hover lightens to `brand-500` and press darkens to `brand-700`; press deliberately does
  not go to `brand-800`, which would drop the label below AA.

Every text/background pair in both themes was measured against WCAG AA (4.5:1 body, 3:1 large) and
passes. If you introduce a new pairing, measure it.

### Dark mode

Full light and dark support via `next-themes`, toggled in the header, with a `dark` class on
`<html>` and no flash on load. Tints invert: `brand-50` becomes a dark warm wash so a chip reads
correctly on either surface. Check both themes before you ship a section.

### Motion

Scroll reveals are ≤20px of rise over ≤400ms, once, optionally staggered. Everything is gated behind
`prefers-reduced-motion`, both in `Reveal` and globally in `globals.css`.

## How content works

**There is no CMS.** All copy lives in typed TypeScript modules under
[`src/content/`](src/content/), and pages map over that content. Nothing is hardcoded in a page
component.

```
src/content/
  types.ts        shared types (Feature, Solution, Faq, BlogPost, LegalDoc, ArticleBlock…)
  features.ts     the 15 product modules  -> /features/[slug]
  solutions.ts    the 4 audiences          -> /solutions/[slug]
  blog.ts         blog posts               -> /blog/[slug]
  legal/          privacy, terms, dpa, cookies, subprocessors -> /legal/[slug]
  faqs.ts         FAQ entries, grouped
  changelog.ts    release entries
  pricing.ts      plan shapes + comparison matrix
  security.ts     security pillars and the honesty lists
  integrations.ts integrations, and what does not exist
  home.ts         home page sections
  company.ts      about + careers copy
  nav.ts          header, mega-menu and footer links
```

### Adding a feature page

1. Append one object to the `features` array in `src/content/features.ts`.
2. Give it a `visual` key that exists in `src/components/product/ProductVisual.tsx`, or add a new
   mock visual first (see below).
3. List 3+ `related` slugs so the internal linking stays dense.
4. Done. The route, `generateStaticParams`, `generateMetadata`, the sitemap entry, the mega-menu and
   the footer all derive from the array.

Add the slug to a group in `featureGroups` at the bottom of the same file to place it on the module
overview grid.

### Adding a solution page

Append one object to `solutions` in `src/content/solutions.ts`. Same deal.

### Adding a blog post

Append one object to `posts` in `src/content/blog.ts`. The body is an array of typed
`ArticleBlock`s (`p`, `h2`, `h3`, `ul`, `ol`, `quote`, `code`) rendered by
`src/components/ui/Article.tsx`. Prose is data rather than MDX so there is exactly one renderer to
keep accessible and consistent. `Article` structured data and the sitemap entry are automatic.

### Adding a legal document

Add a file under `src/content/legal/`, export a `LegalDoc`, and register it in
`src/content/legal/index.ts`.

## Product visuals

There are no screenshots and no stock photography. The product imagery is **hand-built mock UI**
composed from the real design tokens, in [`src/components/product/`](src/components/product/):

- `Frame.tsx` — shared chrome plus `Row`, `Avatar`, `Status`, `Bar`, `Label` primitives.
- `visuals.tsx` — the 16 mocks (attendance sheet, payslip run, Kanban board, invoice workspace,
  calendar strip, job board, and so on).
- `ProductVisual.tsx` — the key → component registry.

Each mock is wrapped in `aria-hidden` because it is a decorative representation rather than real
data. They are responsive; check any new one at 320px.

## Contact form

`/contact` posts to the route handler at
[`src/app/api/contact/route.ts`](src/app/api/contact/route.ts), which validates with the shared zod
schema, rate-limits per IP in memory, and sends via Resend.

**It degrades gracefully.** With no mail environment variables set — as will be the case locally —
the handler logs the submission and returns success with an honest note telling the sender to email
us directly. It does not throw, and the build never fails for missing environment variables.

Spam handling is a honeypot field plus a timing check, with no third-party captcha.

### Environment variables

All of these are optional. See [`.env.example`](.env.example).

| Variable               | Purpose                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| `RESEND_API_KEY`       | Resend API key. Without it, submissions are logged rather than emailed. |
| `CONTACT_TO_EMAIL`     | Where contact form submissions are delivered.                           |
| `CONTACT_FROM_EMAIL`   | The From address, e.g. `OneclickHR <noreply@oneclickhr.app>`.           |
| `NEXT_PUBLIC_SITE_URL` | Site origin. Defaults to `https://oneclickhr.app`.                      |

## SEO

- `metadataBase` is set once in the root layout. Every page builds its metadata through
  `pageMetadata()` in [`src/lib/seo.ts`](src/lib/seo.ts), so titles, descriptions, canonicals,
  OpenGraph and Twitter cards cannot drift apart. Use it for new pages.
- OG images are generated at the edge by `/api/og?title=…` using `next/og`, plus a static default at
  `src/app/opengraph-image.tsx`. Both run on the edge runtime — the Node build of `@vercel/og`
  resolves its WASM asset with `fileURLToPath`, which fails to prerender when the project path
  contains spaces.
- JSON-LD: `Organization` and `WebSite` (with `SearchAction`) in the root layout,
  `SoftwareApplication` on `/` and `/product`, `FAQPage` on `/faq`, the home FAQ and `/pricing`,
  `BreadcrumbList` on every nested route, and `Article` on blog posts. **There is deliberately no
  `Product`/`Offer` markup on `/pricing`:** `Offer` effectively requires a price, and we do not
  publish one.
- `app/sitemap.ts` covers every static route and every generated slug; `app/robots.ts` allows
  everything and points at the sitemap.
- Icons (`favicon.ico`, `icon.png`, `apple-icon.png`) are real generated files, not placeholders.

No analytics script is loaded. There is a documented slot for Vercel Analytics or Plausible if that
changes — and `/legal/cookies` must be updated at the same time, because it currently states that
the site sets no analytics storage.

## Accessibility

- One `<h1>` per page, correct heading order, landmarks with `aria-label`s, a skip link.
- Keyboard-navigable throughout, with a visible focus ring in `brand-700` (3.8:1 against the page).
- The mobile menu is a dialog with a focus trap, body-scroll lock and Escape to close.
- Accordions use the correct button/region ARIA relationship; form errors are wired to their inputs
  with `aria-describedby` and `aria-invalid`, and the success state is announced.
- AA contrast verified in both themes. No horizontal scroll at 320px or above on any route.

## Deploying to Vercel

1. Push the repository to GitHub and import it in Vercel. The framework preset is detected; no build
   settings need changing (`npm run build`, output handled by the Next.js adapter).
2. Add the environment variables above under **Settings → Environment Variables** for Production
   (and Preview if you want the form live there). The build succeeds without them.
3. Under **Settings → Domains**, add both:
   - `oneclickhr.app` — set this as the **primary** domain.
   - `www.oneclickhr.app` — set it to **redirect** to `oneclickhr.app` (308).
4. At your DNS provider, point the apex `oneclickhr.app` at Vercel with an `A` record to
   `76.76.21.21`, and `www` with a `CNAME` to `cname.vercel-dns.com`. If your provider supports
   `ALIAS`/`ANAME` at the apex, prefer that. Wait for the certificate to issue.
5. Confirm `https://oneclickhr.app/sitemap.xml` and `/robots.txt` resolve, then submit the sitemap in
   Google Search Console.

The product app at `app.oneclickhr.app` is a **separate Vercel project**. Do not add that subdomain
to this one.

## A note on the legal pages

The documents under `/legal` — privacy policy, terms of service, data processing addendum, cookie
policy and subprocessors — were written to be substantive, accurate about how this product actually
works, and readable. **They are templates and have not been reviewed by counsel.** Have a lawyer
review them before relying on them commercially, particularly the terms, the DPA and anything
touching the jurisdictions you operate in.

The factual claims in them (Row Level Security on every table, AES-256 encryption of integration
tokens, upload validation, the named subprocessors) describe the product and should be re-checked
against the application whenever it changes.

## Claims policy

The copy on this site deliberately contains **no** testimonials, customer names, logos, star
ratings, user counts, uptime percentages, prices, funding or compliance certifications, because none
of those are real. `/security` states plainly what is not claimed — no SOC 2, no ISO 27001, no
HIPAA, no "GDPR certification". Keep it that way: if you want to add a claim, it needs to be true and
checkable.
