import { z } from 'zod'

export const teamSizes = ['1–10', '11–50', '51–200', '201–500', '500+'] as const

export const enquiryTypes = [
  'Pricing and plans',
  'Product questions',
  'Security review or questionnaire',
  'Moving from another system',
  'Partnership or reseller',
  'Something else',
] as const

/** Shared by the client form and the route handler, so validation cannot drift. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Tell us your name.').max(120, 'That name is too long.'),
  email: z
    .string()
    .trim()
    .min(1, 'We need an email address to reply to.')
    .email('That does not look like an email address.')
    .max(200),
  company: z
    .string()
    .trim()
    .min(2, 'Tell us the name of your organization.')
    .max(160, 'That name is too long.'),
  teamSize: z.enum(teamSizes, { message: 'Choose a team size.' }),
  enquiry: z.enum(enquiryTypes, { message: 'Choose what you need.' }),
  message: z
    .string()
    .trim()
    .min(20, 'A little more detail helps us give you a useful answer.')
    .max(4000, 'That message is too long. Email us instead.'),
  /* Spam controls. A real person leaves the honeypot empty and takes more than
   * a couple of seconds to fill the form in. */
  honeypot: z.string().max(0, 'Submission rejected.').optional().or(z.literal('')),
  elapsedMs: z.number().int().nonnegative().optional(),
})

export type ContactInput = z.infer<typeof contactSchema>

export type ContactResponse = {
  ok: boolean
  /** Shown to the user. Covers the "logged, not emailed" local case too. */
  message: string
  fieldErrors?: Partial<Record<keyof ContactInput, string>>
}
