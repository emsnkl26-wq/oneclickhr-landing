import type { LegalDoc } from '../types'

export const dpa: LegalDoc = {
  slug: 'dpa',
  title: 'Data Processing Addendum',
  metaDescription:
    'The terms on which Nextkin Life LLC processes personal data on behalf of customer organizations using OneclickHR, including security measures and subprocessors.',
  summary:
    'In plain language: when your organization uses OneclickHR, you decide what employee data goes in and why; we process it only to run the service for you, on your instructions. This document records that split, the security measures we apply, the providers we use, how we handle a data subject request or a breach, and what happens to your data at the end.',
  sections: [
    {
      heading: '1. Scope and roles',
      blocks: [
        {
          kind: 'p',
          text: 'This addendum forms part of the agreement between Nextkin Life LLC ("Processor") and the customer organization ("Controller") for use of OneclickHR, and applies to personal data the Processor processes on the Controller’s behalf.',
        },
        {
          kind: 'p',
          text: 'The Controller determines the purposes and means of processing employee and candidate personal data in its workspace. The Processor processes that data only to provide the service and only on documented instructions from the Controller, which include the agreement, this addendum and the Controller’s use of the product’s features.',
        },
        {
          kind: 'p',
          text: 'Where the Processor acts as a controller in its own right — for example in relation to its own business contacts and website visitors — the privacy policy applies rather than this addendum.',
        },
      ],
    },
    {
      heading: '2. Subject matter and duration',
      blocks: [
        {
          kind: 'p',
          text: 'The subject matter of processing is the provision of HR and organization management software. Processing continues for the duration of the agreement and for the limited period afterwards described in section 10.',
        },
      ],
    },
    {
      heading: '3. Nature and purpose of processing',
      blocks: [
        {
          kind: 'p',
          text: 'The Processor hosts, stores, transmits, displays, backs up and deletes personal data as necessary to operate the modules the Controller uses. In practice this includes:',
        },
        {
          kind: 'ul',
          items: [
            'Recording attendance, leave, timesheets and calendar entries, and computing calendar days in the Controller’s configured organization timezone.',
            'Calculating payroll runs and generating payslip PDFs, including reading figures from payslip documents the Controller supplies.',
            'Generating client invoices and HR letters as PDFs from the Controller’s templates and data.',
            'Storing uploaded documents and validating them on upload.',
            'Recording work authorization records and sending milestone expiry reminder emails.',
            'Publishing job postings to a public careers board and receiving candidate applications.',
            'Delivering in-app notifications, web push notifications and transactional email.',
            'Recording mutations in an audit log, and enforcing access control.',
          ],
        },
      ],
    },
    {
      heading: '4. Categories of data subject and personal data',
      blocks: [
        {
          kind: 'p',
          text: 'Data subjects: the Controller’s administrators and team members, its employees, recruiters it grants access to, and candidates who apply through its job board.',
        },
        {
          kind: 'p',
          text: 'Categories of personal data, to the extent the Controller chooses to store them: identity and contact details; employment details including department, role, start date and status; attendance, leave and timesheet records; salary, currency, pay schedule and payslip data; work authorization records and expiry dates; uploaded documents and HR letters; task and project assignments; calendar entries and meeting invitations; support ticket content; notification preferences; authentication identifiers; and application materials submitted by candidates.',
        },
        {
          kind: 'p',
          text: 'The Controller determines whether any of this constitutes a special category of data under applicable law and is responsible for having an appropriate basis for processing it.',
        },
      ],
    },
    {
      heading: '5. Processor obligations',
      blocks: [
        { kind: 'p', text: 'The Processor will:' },
        {
          kind: 'ul',
          items: [
            'Process personal data only on the Controller’s documented instructions, and inform the Controller if it believes an instruction infringes applicable law.',
            'Ensure that personnel with access to personal data are bound by confidentiality obligations and have access only as necessary.',
            'Implement and maintain the technical and organizational measures described in section 6.',
            'Assist the Controller in responding to data subject requests, as described in section 8.',
            'Notify the Controller of a personal data breach as described in section 9.',
            'Make available the information reasonably necessary for the Controller to demonstrate compliance with this addendum.',
            'Delete or return personal data at the end of processing, as described in section 10.',
          ],
        },
      ],
    },
    {
      heading: '6. Technical and organizational measures',
      blocks: [
        {
          kind: 'p',
          text: 'The Processor applies the following measures. They are described specifically rather than generically, because a list of adjectives is not an assurance.',
        },
        { kind: 'h3', text: 'Tenant isolation' },
        {
          kind: 'ul',
          items: [
            'Row Level Security is enabled on every table in the Postgres database, without exception, and every tenant-scoped table carries a non-null tenant id.',
            'A user’s organization and role are carried in their signed authentication token, so the database itself determines whether a row may be read. A query that omits a tenant filter cannot cross an organization boundary.',
            'Isolation is tested against a real database, covering cross-organization reads and writes in both directions, direct access by id with no filter applied, employee-to-employee isolation within one organization, immediate effect of deactivation, and workspace suspension.',
          ],
        },
        { kind: 'h3', text: 'Access control' },
        {
          kind: 'ul',
          items: [
            'Granular team roles with permission presets, configured by the Controller.',
            'Access is re-checked against the database on every request, so deactivation takes effect immediately rather than when a token expires.',
            'Four distinct role types — organization administrator, employee, recruiter with per-job scoping, and external candidate — with employees created by the organization rather than self-registered.',
          ],
        },
        { kind: 'h3', text: 'Data handling' },
        {
          kind: 'ul',
          items: [
            'Transport encryption for data in transit. Files are stored in object storage with access governed by database rows rather than URL possession.',
            'Third-party integration tokens are encrypted with AES-256. The service refuses to start on a malformed encryption key rather than degrading to a weaker mode.',
            'Uploads are validated after they land by reading the stored bytes back: size caps, magic-byte sniffing, a MIME denylist, SVG sanitization and image-spoof detection. Anything that fails validation is deleted.',
          ],
        },
        { kind: 'h3', text: 'Monitoring and accountability' },
        {
          kind: 'ul',
          items: [
            'A tamper-evident audit log of mutations.',
            'Scheduled jobs record the outcome of every run, so a failure is surfaced rather than passing as a success.',
            'Reminder emails are sent exactly once per milestone, so delivery is neither duplicated nor silently skipped.',
          ],
        },
        {
          kind: 'p',
          text: 'The Processor holds no security certifications or attestations at this time and makes no representation of SOC 2, ISO 27001, HIPAA or GDPR certification. The measures above are what it does, and they are verifiable.',
        },
      ],
    },
    {
      heading: '7. Subprocessors',
      blocks: [
        {
          kind: 'p',
          text: 'The Controller authorizes the Processor to engage the subprocessors listed on the subprocessors page, each of which processes a defined category of data under a written contract imposing data protection obligations no less protective than this addendum.',
        },
        {
          kind: 'p',
          text: 'The Processor will give the Controller reasonable notice before adding or replacing a subprocessor. If the Controller has a reasonable objection on data protection grounds, the parties will discuss it in good faith; if it cannot be resolved, the Controller may terminate the affected part of the service.',
        },
        {
          kind: 'p',
          text: 'The Processor remains responsible for its subprocessors’ performance of these obligations.',
        },
      ],
    },
    {
      heading: '8. Data subject requests',
      blocks: [
        {
          kind: 'p',
          text: 'The Controller is responsible for responding to requests from its employees and candidates. Much of what a request asks for can be served directly by the Controller through the product: employee records, attendance and leave history, payslips, documents and profile data are all accessible and editable in the workspace, and the employee self-service portal already exposes each employee’s own data to them.',
        },
        {
          kind: 'p',
          text: 'Where a request cannot be satisfied through the product, the Processor will provide reasonable assistance. If the Processor receives a request directly from a data subject relating to a Controller workspace, it will not respond substantively and will refer the request to the Controller.',
        },
      ],
    },
    {
      heading: '9. Personal data breach',
      blocks: [
        {
          kind: 'p',
          text: 'The Processor will notify the Controller without undue delay after becoming aware of a personal data breach affecting the Controller’s personal data, and in any event within 72 hours of becoming aware. The notification will describe what is known: the nature of the breach, the categories and approximate number of data subjects and records affected, the likely consequences, the measures taken or proposed, and a contact point for further information.',
        },
        {
          kind: 'p',
          text: 'Where full information is not available at the time, the Processor will provide it in phases rather than delaying the initial notification. The Processor will cooperate with the Controller in investigating and remediating the breach. Notification is not an admission of fault.',
        },
      ],
    },
    {
      heading: '10. Deletion and return',
      blocks: [
        {
          kind: 'p',
          text: 'On termination of the agreement, the Processor will on request make the Controller’s personal data available for export within a reasonable period, and will then delete it from active systems. Backups age out on their ordinary cycle. The Processor may retain personal data where required by law, in which case it will continue to protect it under this addendum and process it only for that purpose.',
        },
      ],
    },
    {
      heading: '11. International transfers',
      blocks: [
        {
          kind: 'p',
          text: 'Where processing involves a transfer of personal data from a jurisdiction that restricts such transfers, the parties rely on the transfer mechanisms available through the Processor’s subprocessors, including standard contractual clauses. Data residency region is chosen per deployment; the Controller should raise any residency requirement before the service begins.',
        },
      ],
    },
    {
      heading: '12. Audits',
      blocks: [
        {
          kind: 'p',
          text: 'On reasonable written request, and no more than once in a twelve-month period unless required by a supervisory authority, the Processor will provide information reasonably necessary to demonstrate compliance with this addendum. The parties will agree the scope, timing and confidentiality terms in advance, and will conduct any audit in a way that does not compromise other customers’ data or the security of the service.',
        },
      ],
    },
    {
      heading: '13. Precedence',
      blocks: [
        {
          kind: 'p',
          text: 'In the event of a conflict between this addendum and the terms of service on the subject of processing personal data on the Controller’s behalf, this addendum prevails. Questions: privacy@oneclickhr.app.',
        },
      ],
    },
  ],
}
