import { COMPANY } from '@/data/company';

export const SITE = {
  name: COMPANY.name,
  // Replace with the real domain at launch — used for canonical/OG URLs and the sitemap.
  url: 'https://www.example.com',
  tagline: 'Visa & Overseas Consultancy',
  description:
    'Professional guidance for study, work, business, tourist, dependent and PR visa applications. Book a consultation with our experts.',
  twitter: '@example',
  locale: 'en_IN',
} as const;

/** Primary navigation — keep labels short so the desktop bar never wraps. */
export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Countries', to: '/countries' },
  { label: 'Process', to: '/process' },
  { label: 'Contact', to: '/contact' },
] as const;

export const LEGAL_LINKS = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Disclaimer', to: '/disclaimer' },
] as const;

export const DISCLAIMER_TEXT =
  'The information provided on this website is for general informational purposes and does not constitute legal or immigration advice. Immigration laws, visa requirements, processing times, and eligibility criteria may change. Applicants should verify current requirements with the relevant government or immigration authority. Submission of an application does not guarantee visa approval.';

export const VISA_TYPES = [
  'Study Visa',
  'Work Visa',
  'Business Visa',
  'Tourist Visa',
  'Dependent Visa',
  'PR / Immigration',
] as const;

export const DESTINATIONS = [
  'Canada',
  'Australia',
  'United Kingdom',
  'USA',
  'Germany',
  'New Zealand',
  'France',
  'Ireland',
  'Dubai / UAE',
  'Singapore',
  'Other',
] as const;

/** Trust statistics — replace with real business figures when available. */
export const STATS = [
  { value: 5000, suffix: '+', label: 'Clients Assisted' },
  { value: 25, suffix: '+', label: 'Countries' },
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 95, suffix: '%', label: 'Client Satisfaction' },
] as const;
