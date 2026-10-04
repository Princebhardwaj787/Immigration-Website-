import { COMPANY } from '@/data/company';

export const SITE = {
  name: COMPANY.name,
  // Replace with the real domain at launch — used for canonical/OG URLs and the sitemap.
  url: 'https://www.example.com',
  tagline: 'Visa & Overseas Consultancy',
  description:
    'Professional guidance for study, work, business, tourist, dependent and PR visa applications. Book a free consultation.',
  twitter: '@example',
  locale: 'en_US',
} as const;

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Visa Services', to: '/visa-services' },
  { label: 'Countries', to: '/countries' },
  { label: 'Eligibility', to: '/eligibility' },
  { label: 'Blog', to: '/blog' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Contact', to: '/contact' },
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
