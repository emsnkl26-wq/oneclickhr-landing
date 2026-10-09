import type { LegalDoc } from '../types'

export const terms: LegalDoc = {
  slug: 'terms',
  title: 'Terms of Service',
  metaDescription:
    'The terms on which Nextkin Life LLC provides OneclickHR: your account, acceptable use, data ownership, fees, warranties, liability and termination.',
  summary:
    'In plain language: you get a workspace to run your organization’s HR in, you own the data you put into it, you are responsible for the accounts you create and for using the product lawfully, and we provide the service with reasonable care but without a guarantee that it will never fail. Either side can end the agreement; your data comes back to you on request before deletion.',
  sections: [
    {
      heading: '1. Agreement',
      blocks: [
        {
          kind: 'p',
          text: 'These terms govern your use of the OneclickHR application at app.oneclickhr.app and the website at oneclickhr.app, provided by Nextkin Life LLC ("we", "us"). By creating a workspace or using the service you agree to these terms. If you are agreeing on behalf of an organization, you confirm you have authority to bind that organization, and "you" means the organization.',
        },
      ],
    },
    {
      heading: '2. The service',
      blocks: [
        {
          kind: 'p',
          text: 'OneclickHR is a multi-tenant software-as-a-service application for HR and organization management. Each customer organization receives its own isolated workspace. The modules available include attendance and time tracking, leave, payroll and payslips, timesheets, invoicing and finance, work authorization record-keeping and expiry reminders, tasks and project boards, recruiting with a public job board, documents and HR letters, meetings and a shared calendar, an internal help desk, notifications, onboarding, workspace settings and the employee self-service portal.',
        },
        {
          kind: 'p',
          text: 'Two limits are worth stating plainly rather than leaving you to discover them. The service does not include a billing or subscription module for charging your own customers, and the work authorization module provides record-keeping and expiry reminders only — it is not an immigration filing system, not an I-9 verification service, and not a source of legal or immigration advice.',
        },
        {
          kind: 'p',
          text: 'We may change, add or remove features over time. We will not remove a module you rely on without reasonable notice to the workspace owner.',
        },
      ],
    },
    {
      heading: '3. Your account and the accounts you create',
      blocks: [
        {
          kind: 'p',
          text: 'An organization signs itself up and confirms its email address to create a workspace. Employee accounts are created by the organization; employees cannot self-register into your workspace. Recruiters receive scoped access that you grant and can revoke, including per job. Candidates applying through your public job board hold their own lightweight external accounts.',
        },
        {
          kind: 'p',
          text: 'You are responsible for the accuracy of the accounts you create, for the access you grant to them, for keeping credentials confidential, and for all activity under them. You will tell us promptly if you believe an account has been compromised. Deactivating an account removes its access immediately.',
        },
      ],
    },
    {
      heading: '4. Acceptable use',
      blocks: [
        { kind: 'p', text: 'You will not:' },
        {
          kind: 'ul',
          items: [
            'Use the service in breach of any applicable law, including employment, data protection, tax and payroll law in the places you operate.',
            'Attempt to access another organization’s workspace or data, probe or circumvent access controls, or test the security of the service without our prior written permission.',
            'Upload malware, or upload content you do not have the right to store and process.',
            'Reverse engineer, decompile, or attempt to derive the source code of the service, except to the extent that restriction is unenforceable in your jurisdiction.',
            'Resell, sublicense or provide the service to a third party as your own product, except where you are using it to manage your own placements or engagements as intended.',
            'Use automated means to place unreasonable load on the service, or interfere with its availability to others.',
          ],
        },
        {
          kind: 'p',
          text: 'If you find a security issue, we would rather hear from you than not. Report it to security@oneclickhr.app and we will not pursue you for good-faith research that avoids privacy violations, data destruction and service disruption.',
        },
      ],
    },
    {
      heading: '5. Your data',
      blocks: [
        {
          kind: 'p',
          text: 'You own the data you and your people put into your workspace. We claim no ownership of it. You grant us the limited rights necessary to host, process, transmit, back up and display it in order to provide the service, and to provide support when you ask for it.',
        },
        {
          kind: 'p',
          text: 'Where your workspace contains personal information about your employees or candidates, you are the controller of that information and we process it on your instructions. Our data processing addendum sets out those terms and forms part of this agreement.',
        },
        {
          kind: 'p',
          text: 'You are responsible for having a lawful basis to process the employee and candidate information you store, and for telling the people concerned what you do with it.',
        },
      ],
    },
    {
      heading: '6. Fees',
      blocks: [
        {
          kind: 'p',
          text: 'Fees, billing cadence and plan scope are agreed between us in writing before your paid use begins. We do not publish a price list, because we shape plans around the modules an organization needs and its size. Any fees agreed are payable as stated in that agreement, and are exclusive of taxes unless stated otherwise.',
        },
        {
          kind: 'p',
          text: 'If an invoice is materially overdue we may suspend access after giving you notice and a reasonable opportunity to resolve it. Suspension does not delete your data.',
        },
      ],
    },
    {
      heading: '7. Availability and support',
      blocks: [
        {
          kind: 'p',
          text: 'We provide the service with reasonable skill and care, and we aim for it to be available continuously. We do not commit to a specific uptime percentage in these terms, and we will not quote one we have not measured and cannot stand behind. Where an organization requires a service level commitment, that is agreed separately in writing.',
        },
        {
          kind: 'p',
          text: 'We may need to perform maintenance. Where maintenance is planned and likely to interrupt the service, we will give notice to workspace owners where practicable.',
        },
        {
          kind: 'p',
          text: 'Email support is included with every plan.',
        },
      ],
    },
    {
      heading: '8. Third-party services',
      blocks: [
        {
          kind: 'p',
          text: 'The service runs on infrastructure provided by third parties, and offers optional integrations such as Google Calendar sync and Google sign-in. Our subprocessors page names each provider and what it processes. If you enable an integration, your use of that third party is also governed by their terms, and we are not responsible for their service.',
        },
      ],
    },
    {
      heading: '9. Intellectual property',
      blocks: [
        {
          kind: 'p',
          text: 'We retain all rights in the service, including its software, design, documentation and the OneclickHR name and marks. Subject to these terms and any fees due, we grant you a non-exclusive, non-transferable right to use the service during the term. Nothing in these terms transfers our intellectual property to you, or yours to us.',
        },
        {
          kind: 'p',
          text: 'Content you place in your workspace — including your brand color, logo, letter templates and job postings — remains yours. You grant us the limited right to display and render it as part of providing the service, including in the PDFs, emails and public careers pages the service generates for you.',
        },
      ],
    },
    {
      heading: '10. Disclaimers',
      blocks: [
        {
          kind: 'p',
          text: 'Except as expressly stated in these terms, the service is provided "as is" and we disclaim all other warranties, express or implied, including implied warranties of merchantability, fitness for a particular purpose and non-infringement, to the fullest extent permitted by law.',
        },
        {
          kind: 'p',
          text: 'In particular: the service is a tool, not professional advice. Payroll calculations, work authorization expiry reminders, generated HR letters and invoices are produced from the data and configuration you provide. You remain responsible for reviewing them and for compliance with the employment, tax, payroll and immigration law that applies to you. The payroll review step exists so that you can carry out that review before a run is finalized.',
        },
      ],
    },
    {
      heading: '11. Limitation of liability',
      blocks: [
        {
          kind: 'p',
          text: 'To the fullest extent permitted by law, neither party is liable to the other for indirect, incidental, special, consequential or punitive damages, or for lost profits, lost revenue or lost data arising from or relating to this agreement, even if advised of the possibility.',
        },
        {
          kind: 'p',
          text: 'Each party’s total aggregate liability arising from or relating to this agreement is limited to the fees paid or payable by you to us in the twelve months preceding the event giving rise to the claim.',
        },
        {
          kind: 'p',
          text: 'Nothing in these terms excludes or limits liability that cannot lawfully be excluded or limited, including liability for death or personal injury caused by negligence, or for fraud.',
        },
      ],
    },
    {
      heading: '12. Indemnity',
      blocks: [
        {
          kind: 'p',
          text: 'You will indemnify us against third-party claims arising from your use of the service in breach of these terms or applicable law, including claims by your employees or candidates relating to data you chose to store or how you used it.',
        },
      ],
    },
    {
      heading: '13. Term and termination',
      blocks: [
        {
          kind: 'p',
          text: 'This agreement runs until terminated. You may stop using the service and ask us to close your workspace at any time. We may terminate for material breach that is not cured within 30 days of notice, or immediately where your use creates a legal risk or threatens the security or availability of the service for others.',
        },
        {
          kind: 'p',
          text: 'On termination, your access ends. Before deletion we will, on request made within a reasonable period, make your workspace data available for export. After that period we delete it in line with our retention practices.',
        },
      ],
    },
    {
      heading: '14. Changes to these terms',
      blocks: [
        {
          kind: 'p',
          text: 'We may update these terms. Where a change is material we will notify workspace owners by email before it takes effect. Continuing to use the service after a change takes effect means you accept the updated terms. If you do not, you may terminate as described above.',
        },
      ],
    },
    {
      heading: '15. General',
      blocks: [
        {
          kind: 'p',
          text: 'These terms, together with the data processing addendum and any written plan agreement, are the entire agreement between us on their subject matter. If a provision is found unenforceable, the rest remains in force. A failure to enforce a provision is not a waiver of it. Neither party may assign this agreement without the other’s consent, except to a successor in a merger or sale of substantially all assets. Neither party is liable for delay or failure caused by events beyond its reasonable control.',
        },
        {
          kind: 'p',
          text: 'Nextkin Life LLC is a United States limited liability company. These terms are governed by the laws applicable at its place of formation, without regard to conflict-of-laws rules, and the parties submit to the exclusive jurisdiction of the courts there, except where mandatory local law gives you a right to bring proceedings elsewhere.',
        },
        {
          kind: 'p',
          text: 'Questions about these terms: hello@oneclickhr.app.',
        },
      ],
    },
  ],
}
