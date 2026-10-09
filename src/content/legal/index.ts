import type { LegalDoc } from '../types'
import { privacy } from './privacy'
import { terms } from './terms'
import { dpa } from './dpa'
import { cookies } from './cookies'
import { subprocessors } from './subprocessors'

export const legalDocs: LegalDoc[] = [privacy, terms, dpa, cookies, subprocessors]

export const legalBySlug = (slug: string) => legalDocs.find((d) => d.slug === slug)

export const legalSlugs = legalDocs.map((d) => d.slug)
