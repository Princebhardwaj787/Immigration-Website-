/**
 * Legal documents. Generic placeholder wording — have a qualified professional
 * review these before launch for your jurisdiction.
 */
export type LegalDoc = {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
};

export const LEGAL_DOCS: LegalDoc[] = [
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    updated: 'Placeholder — last updated: January 2026',
    intro:
      'This Privacy Policy explains how FlyNest Overseas Consultancy ("we", "us") collects, uses and protects the personal information you provide through this website. Replace this placeholder text with your organisation’s actual policy before launch.',
    sections: [
      {
        heading: 'Information we collect',
        body: [
          'We collect information you voluntarily provide through our forms: your name, email address, phone number, country, visa interest, preferred appointment details and any message you send us.',
          'We may also collect technical information such as browser type, device type and pages visited, used only to improve the website.',
        ],
      },
      {
        heading: 'How we use your information',
        body: [
          'To respond to your enquiry and schedule consultations; to provide the services you request; to send service-related communications; and to comply with legal obligations.',
          'We do not sell your personal information to third parties.',
        ],
      },
      {
        heading: 'Data retention and security',
        body: [
          'We retain personal information only as long as necessary for the purposes described, and protect it using appropriate technical and organisational measures.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'Depending on your jurisdiction, you may have the right to access, correct, delete or restrict the processing of your personal data. Contact us using the details on the Contact page to exercise these rights.',
        ],
      },
      {
        heading: 'Cookies',
        body: [
          'We use only essential cookies required for the website and session functionality. See our Cookie Policy for details.',
        ],
      },
      {
        heading: 'Contact',
        body: ['Questions about this policy? Contact us through the Contact page.'],
      },
    ],
  },
  {
    slug: 'terms',
    title: 'Terms & Conditions',
    updated: 'Placeholder — last updated: January 2026',
    intro:
      'These terms govern your use of this website and, where applicable, our consultancy services. Placeholder text — replace with your actual terms before launch.',
    sections: [
      {
        heading: 'Website use',
        body: [
          'You may use this website for lawful purposes only. You must not attempt to interfere with its operation or submit false or misleading information through our forms.',
        ],
      },
      {
        heading: 'No legal or immigration advice',
        body: [
          'Content on this website is general information only and does not constitute legal or immigration advice. For advice specific to your circumstances, consult a qualified professional in the relevant jurisdiction.',
        ],
      },
      {
        heading: 'No guarantees',
        body: [
          'We do not guarantee visa approval, admission, employment, permanent residency or any other outcome. Decisions are made solely by the relevant authorities and institutions.',
        ],
      },
      {
        heading: 'Client engagements',
        body: [
          'The scope, fees and timelines of any paid service are agreed separately in writing before work begins. These website terms do not replace a signed service agreement.',
        ],
      },
      {
        heading: 'Limitation of liability',
        body: [
          'To the maximum extent permitted by law, we are not liable for losses arising from reliance on general website content, government decisions, or delays caused by third parties including authorities and postal or courier services.',
        ],
      },
      {
        heading: 'Changes',
        body: ['We may update these terms from time to time. Continued use of the website constitutes acceptance of the updated terms.'],
      },
    ],
  },
  {
    slug: 'cookies',
    title: 'Cookie Policy',
    updated: 'Placeholder — last updated: January 2026',
    intro:
      'This policy explains the cookies and similar technologies used on this website.',
    sections: [
      {
        heading: 'What cookies are',
        body: ['Cookies are small text files stored on your device when you visit a website.'],
      },
      {
        heading: 'Cookies we use',
        body: [
          'Essential cookies: required for core functionality such as maintaining an administrative session. The site does not set advertising or tracking cookies.',
          'Third-party content: embedded maps may set their own cookies when loaded; you can block them via your browser settings.',
        ],
      },
      {
        heading: 'Managing cookies',
        body: ['You can control or delete cookies through your browser settings. Disabling essential cookies may affect site functionality.'],
      },
    ],
  },
  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    updated: 'Placeholder — last updated: January 2026',
    intro:
      'The information provided on this website is for general informational purposes and does not constitute legal or immigration advice. Immigration laws, visa requirements, processing times, and eligibility criteria may change. Applicants should verify current requirements with the relevant government or immigration authority. Submission of an application does not guarantee visa approval.',
    sections: [
      {
        heading: 'No government affiliation',
        body: [
          'We are a private consultancy. We are not affiliated with, endorsed by, or acting on behalf of any government, embassy, consulate, immigration authority or educational institution unless explicitly stated otherwise in writing.',
        ],
      },
      {
        heading: 'No guarantees',
        body: [
          'We do not guarantee visa approval, admission to an institution, employment, permanent residency, or any specific outcome. Be cautious of any provider that promises such outcomes.',
        ],
      },
      {
        heading: 'Accuracy of information',
        body: [
          'We make reasonable efforts to keep content accurate and current, but immigration rules change frequently and we accept no liability for decisions made on the basis of website content alone.',
        ],
      },
      {
        heading: 'External links',
        body: ['Links to third-party or government websites are provided for convenience. We do not control their content or availability.'],
      },
    ],
  },
  {
    slug: 'refunds',
    title: 'Refund & Cancellation Policy',
    updated: 'Placeholder — last updated: January 2026',
    intro:
      'This placeholder policy outlines how refunds and cancellations are handled. Replace it with your actual policy — and any statutory cooling-off rights for your jurisdiction — before launch.',
    sections: [
      {
        heading: 'Free consultation',
        body: ['The initial consultation is free and carries no obligation to purchase any service.'],
      },
      {
        heading: 'Cancelling before work begins',
        body: ['If you cancel a paid engagement before any work has started, fees paid are refundable in full, less any non-recoverable third-party costs already incurred on your behalf.'],
      },
      {
        heading: 'Cancelling after work has started',
        body: ['Once work has commenced, refunds are calculated pro-rata for work completed, minus any non-recoverable third-party costs (for example government fees or translations already purchased).'],
      },
      {
        heading: 'Government fees',
        body: ['Government and third-party fees are paid to the relevant authority and are generally non-refundable, whether or not your application proceeds.'],
      },
      {
        heading: 'How to request a refund',
        body: ['Contact us using the details on the Contact page. Approved refunds are processed to the original payment method within a reasonable period.'],
      },
    ],
  },
];
