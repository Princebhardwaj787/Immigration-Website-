/**
 * Service catalogue — single source of truth for the six visa categories.
 * Mirrors the server Service model so the admin CRUD and public pages stay in sync.
 */
export type Service = {
  slug: string;
  title: string;
  icon: string;
  tagline: string;
  summary: string;
  description: string;
  benefits: string[];
  checklist: string[];
  order: number;
};

export const SERVICES: Service[] = [
  {
    slug: 'study-visa',
    title: 'Study Visa',
    icon: 'GraduationCap',
    tagline: 'Study abroad with confidence',
    summary:
      'Guidance for university admissions, student visas and post-study work options across major destinations.',
    description:
      'From choosing the right course and institution to preparing a complete student visa application, we guide you through every step — including financial documentation, SOP review and interview preparation.',
    benefits: [
      'Course and university shortlisting',
      'Statement of Purpose review',
      'Financial documentation guidance',
      'Visa interview preparation',
    ],
    checklist: [
      'Valid passport',
      'Letter of acceptance',
      'Proof of funds',
      'Academic transcripts',
      'Language test scores',
      'Medical insurance',
    ],
    order: 1,
  },
  {
    slug: 'work-visa',
    title: 'Work Visa',
    icon: 'Briefcase',
    tagline: 'Build your career internationally',
    summary:
      'Skilled worker, employer-sponsored and intra-company transfer visa pathways for professionals and trades.',
    description:
      'We assess your profile against skilled occupation lists, connect you with genuine employer sponsorship opportunities and prepare a complete work visa application that stands up to scrutiny.',
    benefits: [
      'Profile assessment against occupation lists',
      'Employer sponsorship guidance',
      'Skills assessment coordination',
      'Complete application preparation',
    ],
    checklist: [
      'Valid passport',
      'Employment contract',
      'Qualifications and transcripts',
      'Work experience letters',
      'Skills assessment (if required)',
      'Language test scores',
    ],
    order: 2,
  },
  {
    slug: 'tourist-visa',
    title: 'Tourist Visa',
    icon: 'Plane',
    tagline: 'Travel the world with ease',
    summary:
      'Short-stay visitor visas for tourism, family visits and business travel — prepared quickly and accurately.',
    description:
      'Whether you are visiting family, exploring a new country or attending a business event, we prepare a complete tourist visa application with the right supporting documents and travel itinerary.',
    benefits: [
      'Itinerary and travel plan review',
      'Hotel and flight documentation',
      'Travel insurance guidance',
      'Fast-track application preparation',
    ],
    checklist: [
      'Valid passport',
      'Travel itinerary',
      'Hotel bookings',
      'Bank statements',
      'Employment or business proof',
      'Travel insurance',
    ],
    order: 3,
  },
  {
    slug: 'business-visa',
    title: 'Business Visa',
    icon: 'TrendingUp',
    tagline: 'Invest and expand globally',
    summary:
      'Business, investor and entrepreneur visa pathways for founders, investors and corporate executives.',
    description:
      'We help business owners and investors navigate complex business visa categories — from startup visas to investor programs — with a clear plan for documentation, funds and business proof.',
    benefits: [
      'Business plan review',
      'Investment documentation',
      'Corporate structure guidance',
      'Market entry support',
    ],
    checklist: [
      'Valid passport',
      'Business plan',
      'Proof of investment funds',
      'Company registration documents',
      'Bank statements',
      'Professional references',
    ],
    order: 4,
  },
  {
    slug: 'immigration',
    title: 'Immigration & PR',
    icon: 'Globe2',
    tagline: 'Settle permanently abroad',
    summary:
      'Express Entry, points-based and family sponsorship pathways for permanent residency and citizenship.',
    description:
      'We assess your eligibility across multiple immigration programs, prepare a complete PR application and guide you through settlement — from document procurement to post-landing support.',
    benefits: [
      'Eligibility assessment across programs',
      'Points calculation and optimisation',
      'Document procurement guidance',
      'Post-landing settlement support',
    ],
    checklist: [
      'Valid passport',
      'Language test scores',
      'Educational credential assessment',
      'Work experience proof',
      'Police clearance certificates',
      'Medical examinations',
    ],
    order: 5,
  },
  {
    slug: 'family-visa',
    title: 'Dependent / Family Visa',
    icon: 'Users',
    tagline: 'Bring your family together',
    summary:
      'Spousal, parent and dependent visa applications for family reunification and dependent sponsorship.',
    description:
      'We prepare family and dependent visa applications with care — ensuring relationship evidence, financial sponsorship documents and all supporting paperwork meet the requirements of the destination country.',
    benefits: [
      'Relationship evidence guidance',
      'Sponsorship documentation',
      'Dependent eligibility assessment',
      'Family application coordination',
    ],
    checklist: [
      'Valid passport',
      'Marriage or birth certificates',
      'Proof of relationship',
      'Sponsor financial documents',
      'Accommodation proof',
      'Medical examinations',
    ],
    order: 6,
  },
];

export const getServiceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
