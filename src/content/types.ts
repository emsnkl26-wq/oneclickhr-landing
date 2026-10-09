import type { LucideIcon } from 'lucide-react'

/** Keys of the hand-built mock-UI components in src/components/product. */
export type ProductVisualKey =
  | 'attendance'
  | 'leave'
  | 'payslip'
  | 'timesheet'
  | 'invoice'
  | 'work-auth'
  | 'kanban'
  | 'jobs'
  | 'documents'
  | 'calendar'
  | 'helpdesk'
  | 'notifications'
  | 'onboarding'
  | 'settings'
  | 'portal'
  | 'dashboard'

export type Capability = {
  title: string
  body: string
}

export type Feature = {
  slug: string
  /** Short label used in nav and cards. */
  name: string
  /** Longer page-title form. */
  title: string
  icon: LucideIcon
  /** One line, used on the module grid and mega-menu. */
  summary: string
  /** 150-160 characters, used verbatim as the meta description. */
  metaDescription: string
  heroHeadline: string
  heroBody: string
  problem: { heading: string; paragraphs: string[] }
  capabilities: Capability[]
  detail: { heading: string; paragraphs: string[] }
  visual: ProductVisualKey
  related: string[]
}

export type Solution = {
  slug: string
  name: string
  title: string
  icon: LucideIcon
  summary: string
  metaDescription: string
  heroHeadline: string
  heroBody: string
  pains: { title: string; body: string }[]
  fit: { heading: string; paragraphs: string[] }
  modules: string[]
  visual: ProductVisualKey
  related: string[]
}

export type Faq = {
  question: string
  answer: string
  group: 'Product' | 'Security & data' | 'Pricing & plans' | 'Getting started' | 'Roles & access'
}

export type ChangelogEntry = {
  version: string
  date: string
  title: string
  items: { type: 'Added' | 'Improved' | 'Fixed'; text: string }[]
}

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  readingMinutes: number
  topic: string
  /** Rendered by the article renderer in src/components/blog. */
  body: ArticleBlock[]
}

export type ArticleBlock =
  | { kind: 'p'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'ol'; items: string[] }
  | { kind: 'quote'; text: string }
  | { kind: 'code'; text: string }

export type LegalDoc = {
  slug: string
  title: string
  metaDescription: string
  summary: string
  sections: { heading: string; blocks: ArticleBlock[] }[]
}
