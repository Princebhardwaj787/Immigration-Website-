/**
 * Country catalogue — single source of truth for destination pages.
 * Mirrors the server Country model so the admin CRUD and public pages stay in sync.
 */
export type Country = {
  slug: string;
  name: string;
  image: string;
  tagline: string;
  overview: string;
  visaCategories: string[];
  popularPurposes: string[];
  eligibilityOverview: string;
  documents: string[];
  processSteps: { title: string; detail: string }[];
  order: number;
};

export const COUNTRIES: Country[] = [
  {
    slug: 'canada',
    name: 'Canada',
    image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1200&q=60',
    tagline: 'Express Entry, study permits and family sponsorship',
    overview:
      'Canada offers some of the most accessible immigration pathways in the world — from Express Entry for skilled workers to study permits, family sponsorship and provincial nominee programs. With a high quality of life, universal healthcare and a clear path to permanent residency, Canada remains one of the most popular destinations for Indian applicants.',
    visaCategories: ['Study Visa', 'Work Visa', 'PR / Immigration', 'Family Visa'],
    popularPurposes: ['Study', 'Work', 'Immigration', 'Family'],
    eligibilityOverview:
      'Canada uses a points-based system (CRS) for Express Entry. Factors include age, education, work experience and language proficiency. Study permits require proof of acceptance and funds. Family sponsorship requires a qualifying relationship and financial capacity.',
    documents: [
      'Valid passport',
      'Language test scores (IELTS/CELPIP)',
      'Educational credential assessment',
      'Proof of funds',
      'Work experience letters',
      'Police clearance certificates',
    ],
    processSteps: [
      { title: 'Eligibility check', detail: 'Assess your profile against the relevant program criteria.' },
      { title: 'Document collection', detail: 'Gather transcripts, references and financial proof.' },
      { title: 'Application submission', detail: 'Submit a complete application with all supporting documents.' },
      { title: 'Biometrics & medicals', detail: 'Complete biometrics and medical examinations.' },
      { title: 'Decision & landing', detail: 'Receive your visa and complete landing formalities.' },
    ],
    order: 1,
  },
  {
    slug: 'australia',
    name: 'Australia',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=60',
    tagline: 'Points-based migration and world-class education',
    overview:
      'Australia combines a strong economy with a high standard of living and a transparent points-based migration system. From skilled migration and employer sponsorship to student visas and working holiday programs, Australia offers multiple pathways for Indian professionals, students and families.',
    visaCategories: ['Study Visa', 'Work Visa', 'PR / Immigration', 'Tourist Visa'],
    popularPurposes: ['Study', 'Work', 'Immigration', 'Tourism'],
    eligibilityOverview:
      'Australia uses a points test for skilled migration. Points are awarded for age, English proficiency, work experience, education and state nomination. Student visas require Confirmation of Enrolment and genuine temporary entrant documentation.',
    documents: [
      'Valid passport',
      'English test scores (IELTS/PTE)',
      'Skills assessment (if required)',
      'Proof of funds',
      'Health insurance',
      'Police clearance certificates',
    ],
    processSteps: [
      { title: 'Skills assessment', detail: 'Have your qualifications assessed by the relevant authority.' },
      { title: 'Expression of Interest', detail: 'Submit an EOI through SkillSelect.' },
      { title: 'Invitation to apply', detail: 'Receive an invitation and lodge your application.' },
      { title: 'Health & character', detail: 'Complete medicals and provide police clearances.' },
      { title: 'Visa grant', detail: 'Receive your visa and prepare for arrival.' },
    ],
    order: 2,
  },
  {
    slug: 'uk',
    name: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=60',
    tagline: 'Skilled worker, student and family visas',
    overview:
      'The United Kingdom offers a range of visa pathways including the Skilled Worker visa, Student visa, Global Talent visa and family visas. With world-class universities, a strong job market and a straightforward digital application process, the UK remains a top destination for Indian applicants.',
    visaCategories: ['Study Visa', 'Work Visa', 'Business Visa', 'Family Visa'],
    popularPurposes: ['Study', 'Work', 'Business', 'Family'],
    eligibilityOverview:
      'The UK uses a points-based system for skilled worker visas. Applicants need a valid job offer from a licensed sponsor, meet the English language requirement and demonstrate sufficient maintenance funds. Student visas require a Confirmation of Acceptance for Studies (CAS).',
    documents: [
      'Valid passport',
      'CAS (for students) or Certificate of Sponsorship',
      'English language test scores',
      'Proof of maintenance funds',
      'TB test certificate (if applicable)',
      'Academic transcripts',
    ],
    processSteps: [
      { title: 'Check eligibility', detail: 'Confirm you meet the requirements for your chosen route.' },
      { title: 'Secure sponsorship or CAS', detail: 'Obtain a job offer or university acceptance.' },
      { title: 'Prepare documents', detail: 'Gather financial, academic and identity documents.' },
      { title: 'Apply online', detail: 'Submit your application and pay the visa fee.' },
      { title: 'Biometrics & decision', detail: 'Attend a biometrics appointment and await the decision.' },
    ],
    order: 3,
  },
  {
    slug: 'usa',
    name: 'United States',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f04?auto=format&fit=crop&w=1200&q=60',
    tagline: 'H-1B, F-1, EB-5 and family-based immigration',
    overview:
      'The United States offers diverse visa categories including the H-1B for skilled workers, F-1 for students, L-1 for intra-company transfers and the EB-5 investor visa. With the world’s largest economy and top-ranked universities, the US remains a leading destination for Indian professionals and students.',
    visaCategories: ['Study Visa', 'Work Visa', 'Business Visa', 'Tourist Visa'],
    popularPurposes: ['Study', 'Work', 'Business', 'Tourism'],
    eligibilityOverview:
      'US visa categories vary widely. H-1B requires a specialty occupation and employer sponsorship. F-1 requires SEVIS enrollment and proof of funds. Tourist visas (B-1/B-2) require demonstrating strong ties to India. Each category has specific documentation and interview requirements.',
    documents: [
      'Valid passport',
      'DS-160 confirmation page',
      'Appointment confirmation',
      'Supporting documents (category-specific)',
      'Proof of ties to India',
      'Financial documentation',
    ],
    processSteps: [
      { title: 'Choose your category', detail: 'Identify the correct visa type for your purpose.' },
      { title: 'Complete DS-160', detail: 'Fill in the online nonimmigrant visa application.' },
      { title: 'Pay fees & book appointment', detail: 'Pay the MRV fee and schedule your interview.' },
      { title: 'Attend interview', detail: 'Attend your visa interview at the US Embassy or Consulate.' },
      { title: 'Visa decision', detail: 'Receive your visa and prepare for travel.' },
    ],
    order: 4,
  },
  {
    slug: 'new-zealand',
    name: 'New Zealand',
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200&q=60',
    tagline: 'Skilled migration and quality of life',
    overview:
      'New Zealand offers a high quality of life, a welcoming immigration system and strong demand for skilled workers. From the Skilled Migrant Category to study visas and family sponsorship, New Zealand provides clear pathways for Indian professionals and families.',
    visaCategories: ['Study Visa', 'Work Visa', 'PR / Immigration', 'Family Visa'],
    popularPurposes: ['Study', 'Work', 'Immigration', 'Family'],
    eligibilityOverview:
      'New Zealand’s Skilled Migrant Category uses a points system based on age, qualifications, work experience and employment. Study visas require an offer of place and proof of funds. Family sponsorship requires a qualifying relationship and financial capacity.',
    documents: [
      'Valid passport',
      'English test scores (IELTS)',
      'Qualifications and transcripts',
      'Work experience evidence',
      'Proof of funds',
      'Medical and character certificates',
    ],
    processSteps: [
      { title: 'Check eligibility', detail: 'Assess your profile against the points system.' },
      { title: 'Submit EOI', detail: 'Submit an Expression of Interest online.' },
      { title: 'Invitation to apply', detail: 'Receive an invitation and lodge your application.' },
      { title: 'Medicals & character', detail: 'Complete medical and police clearance requirements.' },
      { title: 'Visa grant', detail: 'Receive your visa and prepare for arrival.' },
    ],
    order: 5,
  },
  {
    slug: 'germany',
    name: 'Germany',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=60',
    tagline: 'Blue Card, study and job seeker visas',
    overview:
      'Germany is Europe’s largest economy and a hub for engineering, technology and research. With the EU Blue Card for skilled workers, affordable world-class universities and a Job Seeker visa for professionals, Germany offers excellent opportunities for Indian applicants.',
    visaCategories: ['Study Visa', 'Work Visa', 'Business Visa', 'Tourist Visa'],
    popularPurposes: ['Study', 'Work', 'Business', 'Tourism'],
    eligibilityOverview:
      'The EU Blue Card requires a recognised degree and a job offer meeting the salary threshold. Study visas require university admission and proof of funds (blocked account). Job Seker visas allow up to 18 months to find employment in Germany.',
    documents: [
      'Valid passport',
      'University admission or job offer',
      'Proof of funds (blocked account for students)',
      'Health insurance',
      'Academic transcripts',
      'German language certificate (if required)',
    ],
    processSteps: [
      { title: 'Choose your pathway', detail: 'Select the right visa category for your purpose.' },
      { title: 'Secure admission or offer', detail: 'Obtain university admission or a job offer.' },
      { title: 'Prepare documents', detail: 'Gather financial, academic and identity documents.' },
      { title: 'Apply at the embassy', detail: 'Submit your application at the German Embassy or Consulate.' },
      { title: 'Visa decision', detail: 'Receive your visa and prepare for arrival.' },
    ],
    order: 6,
  },
  {
    slug: 'uae',
    name: 'UAE / Dubai',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=60',
    tagline: 'Golden visa, employment and investor visas',
    overview:
      'The UAE offers a dynamic business environment, tax-free income and a range of visa options including employment visas, investor visas, the Golden Visa for long-term residency and tourist visas. Dubai and Abu Dhabi are major hubs for Indian professionals and businesses.',
    visaCategories: ['Work Visa', 'Business Visa', 'Tourist Visa', 'PR / Immigration'],
    popularPurposes: ['Work', 'Business', 'Tourism', 'Immigration'],
    eligibilityOverview:
      'UAE employment visas require a job offer and employer sponsorship. Investor visas require proof of investment. The Golden Visa offers 5-10 year residency for investors, entrepreneurs and specialised talent. Tourist visas are available on arrival for Indian citizens with valid US/UK visas.',
    documents: [
      'Valid passport',
      'Employment contract or investment proof',
      'Educational certificates (attested)',
      'Passport photographs',
      'Health insurance',
      'Emirates ID application',
    ],
    processSteps: [
      { title: 'Secure a job or investment', detail: 'Obtain a job offer or confirm your investment.' },
      { title: 'Employer initiates visa', detail: 'Your employer or sponsor starts the visa process.' },
      { title: 'Medical & biometrics', detail: 'Complete medical tests and biometrics.' },
      { title: 'Emirates ID & visa stamping', detail: 'Receive your Emirates ID and visa stamp.' },
    ],
    order: 7,
  },
  {
    slug: 'europe',
    name: 'Europe (Schengen)',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=60',
    tagline: 'Schengen visas for 27 European countries',
    overview:
      'The Schengen Area allows visa-free travel across 27 European countries with a single visa. Whether you are visiting for tourism, business or family, a Schengen visa opens the door to Europe’s rich culture, history and opportunity.',
    visaCategories: ['Tourist Visa', 'Business Visa', 'Study Visa'],
    popularPurposes: ['Tourism', 'Business', 'Study'],
    eligibilityOverview:
      'Schengen visa requirements vary slightly by country but generally include a valid passport, travel itinerary, hotel bookings, travel insurance and proof of funds. Applications are submitted at the embassy or consulate of your main destination.',
    documents: [
      'Valid passport',
      'Travel itinerary',
      'Hotel bookings',
      'Travel insurance (minimum €30,000 coverage)',
      'Bank statements',
      'Employment or business proof',
      'Passport photographs',
    ],
    processSteps: [
      { title: 'Choose your destination', detail: 'Identify your main destination country.' },
      { title: 'Book appointments', detail: 'Schedule an appointment at the relevant embassy.' },
      { title: 'Prepare documents', detail: 'Gather all required supporting documents.' },
      { title: 'Submit application', detail: 'Submit your application and provide biometrics.' },
      { title: 'Visa decision', detail: 'Receive your visa and prepare for travel.' },
    ],
    order: 8,
  },
];

export const getCountryBySlug = (slug: string) => COUNTRIES.find((c) => c.slug === slug);
