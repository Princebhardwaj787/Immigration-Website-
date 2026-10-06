/**
 * FAQ content — grouped by topic for the accordion.
 * Replace with real client questions before launch.
 */
export type FaqItem = {
  question: string;
  answer: string;
  category: string;
};

export const FAQ_CATEGORIES = [
  'Visa Selection',
  'Documents',
  'Consultation',
  'Processing',
  'Countries',
  'Documentation Assistance',
  'Personalised Guidance',
] as const;

export const FAQS: FaqItem[] = [
  {
    category: 'Visa Selection',
    question: 'How do I know which visa category is right for me?',
    answer:
      'The right visa depends on your purpose — study, work, business, tourism or immigration — and your profile. Book a consultation and we will assess your situation, explain the realistic options and recommend the pathway with the highest chance of success for your case.',
  },
  {
    category: 'Visa Selection',
    question: 'Can I apply for more than one visa category at the same time?',
    answer:
      'In most cases, yes — but it depends on the destination and the specific categories. Some applications can run in parallel, while others may conflict. We will advise you on the best sequence so that one application does not jeopardise another.',
  },
  {
    category: 'Documents',
    question: 'What documents do I need for a visa application?',
    answer:
      'Requirements vary by visa category and destination, but typically include a valid passport, photographs, proof of funds, academic or professional documents, and supporting letters. We provide a detailed, category-specific checklist and review every document before submission.',
  },
  {
    category: 'Documents',
    question: 'How long does it take to gather all the required documents?',
    answer:
      'For most applicants, document preparation takes two to six weeks depending on what is already available. We give you a clear checklist from day one and review each document as it is prepared, so there are no last-minute surprises.',
  },
  {
    category: 'Consultation',
    question: 'What happens during a consultation?',
    answer:
      'A consultation is a one-on-one discussion — in person, by phone or over video — where we understand your goals, assess your profile, explain the realistic pathways and outline the documents, timeline and costs involved. You leave with a clear written plan.',
  },
  {
    category: 'Consultation',
    question: 'How long does a consultation take?',
    answer:
      'A standard consultation lasts 30 to 45 minutes. For complex cases — such as previous refusals or multiple visa categories — we may recommend a longer session so that every aspect of your situation is covered properly.',
  },
  {
    category: 'Processing',
    question: 'How long does visa processing take?',
    answer:
      'Processing times vary significantly by destination and visa category — from a few weeks for tourist visas to several months for permanent residency. We provide a realistic timeline for your specific case and keep you updated at every stage.',
  },
  {
    category: 'Processing',
    question: 'Can you expedite my visa application?',
    answer:
      'Some destinations offer priority or premium processing for an additional fee. Where available, we will advise you on the options and the additional cost. Where it is not available, we ensure your application is prepared correctly the first time to avoid delays.',
  },
  {
    category: 'Countries',
    question: 'Which countries do you handle applications for?',
    answer:
      'We currently handle applications for Canada, Australia, the United Kingdom, the United States, New Zealand, Germany, the UAE and the Schengen area. If your destination is not listed, contact us — we are regularly adding new countries.',
  },
  {
    category: 'Countries',
    question: 'Can I apply to multiple countries at the same time?',
    answer:
      'Yes, in many cases you can — but the strategy matters. Applying to multiple countries simultaneously can raise questions about intent. We will help you plan the right sequence and prepare applications that are consistent with each other.',
  },
  {
    category: 'Documentation Assistance',
    question: 'Do you help with document preparation and review?',
    answer:
      'Yes. We provide a detailed checklist, review every document you prepare, flag anything that is missing or inconsistent, and guide you on formatting, attestation and translation where required. Nothing is submitted without a full review.',
  },
  {
    category: 'Documentation Assistance',
    question: 'What if a document is missing or unavailable?',
    answer:
      'In many cases there are acceptable alternatives — such as affidavits, employer letters or explanatory notes. We will advise you on the best substitute and, where necessary, help you prepare supporting explanations for the visa officer.',
  },
  {
    category: 'Personalised Guidance',
    question: 'How is your service different from applying on my own?',
    answer:
      'A visa application is judged on completeness, consistency and presentation. We bring experience across hundreds of cases — we know what visa officers look for, how to present your profile effectively, and how to avoid the common reasons for refusal.',
  },
  {
    category: 'Personalised Guidance',
    question: 'What happens if my visa is refused?',
    answer:
      'A refusal is not the end of the road. We will obtain the refusal reasons, assess what went wrong, and advise you on whether to reapply with a stronger application, address specific concerns, or consider an alternative pathway. Many of our clients succeed on their second attempt.',
  },
];
