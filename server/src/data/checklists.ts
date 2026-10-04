/**
 * General document checklists by visa category.
 *
 * IMPORTANT: These are general guidance lists only. Requirements vary by
 * destination, visa subclass and individual circumstances, and they change
 * over time. Always verify the current requirement list with the official
 * government or consular authority before applying.
 */
export type Checklist = {
  visaType: string;
  label: string;
  note: string;
  items: string[];
};

export const CHECKLISTS: Record<string, Checklist> = {
  study: {
    visaType: 'study',
    label: 'Study Visa',
    note: 'General checklist — requirements vary by destination and individual circumstances.',
    items: [
      'Valid passport (check validity covers your intended stay)',
      'Passport-sized photographs meeting destination specifications',
      'Academic certificates and diplomas',
      'Academic transcripts / mark sheets',
      'Offer or admission letter from the institution',
      'Evidence of tuition fee payment or scholarship, where applicable',
      'Financial documents showing funds for tuition and living costs',
      'English/language test results, where applicable',
      'Statement of Purpose (SOP)',
      'Letters of Recommendation (LOR), where applicable',
      'Curriculum Vitae / resume',
      'Police clearance certificate, where required',
      'Medical examination evidence, where required',
      'Proof of accommodation arrangements',
      'Visa application form and fee payment receipt',
      'Additional country-specific documents as listed by the authority',
    ],
  },
  work: {
    visaType: 'work',
    label: 'Work Visa',
    note: 'General checklist — requirements vary by destination and individual circumstances.',
    items: [
      'Valid passport',
      'Passport-sized photographs meeting destination specifications',
      'Job offer or employment contract',
      'Employer sponsorship / work permit approval documentation, where applicable',
      'Educational certificates and transcripts',
      'Professional qualifications or membership evidence, where applicable',
      'Relevant work experience letters',
      'Resume / curriculum vitae',
      'Language test results, where applicable',
      'Skills assessment outcome, where applicable',
      'Police clearance certificate, where required',
      'Medical examination evidence, where required',
      'Proof of funds, where required',
      'Visa application form and fee payment receipt',
      'Dependent documents if applying with family',
      'Additional country-specific documents as listed by the authority',
    ],
  },
  business: {
    visaType: 'business',
    label: 'Business Visa',
    note: 'General checklist — requirements vary by destination and individual circumstances.',
    items: [
      'Valid passport',
      'Passport-sized photographs meeting destination specifications',
      'Completed visa application form',
      'Invitation letter from the host company or organisation',
      'Proof of company registration / business ownership',
      'Company bank statements or proof of funds',
      'Travel itinerary and return flight reservation',
      'Conference or event registration, where applicable',
      'Travel medical insurance, where required',
      'Cover letter explaining the purpose and duration of the trip',
      'Previous travel history documents',
      'Visa fee payment receipt',
      'Additional country-specific documents as listed by the authority',
    ],
  },
  tourist: {
    visaType: 'tourist',
    label: 'Tourist Visa',
    note: 'General checklist — requirements vary by destination and individual circumstances.',
    items: [
      'Valid passport',
      'Passport-sized photographs meeting destination specifications',
      'Completed visa application form',
      'Flight itinerary / reservation',
      'Hotel bookings or proof of accommodation',
      'Travel insurance, where required',
      'Bank statements / proof of funds',
      'Employment letter or business proof, where applicable',
      'Leave approval letter, where applicable',
      'Travel plan / day-wise itinerary',
      'Invitation letter for family visits, if applicable',
      'Previous visas and travel history, if applicable',
      'Visa fee payment receipt',
      'Additional country-specific documents as listed by the authority',
    ],
  },
  dependent: {
    visaType: 'dependent',
    label: 'Dependent / Family Visa',
    note: 'General checklist — requirements vary by destination and individual circumstances.',
    items: [
      'Valid passports for all applicants',
      'Passport-sized photographs meeting destination specifications',
      'Marriage certificate, for spouse applications',
      'Birth certificates, for dependent children',
      'Proof of relationship (photographs, correspondence, joint records)',
      'Sponsor\'s visa, status or residence documentation',
      'Sponsor\'s employment and income evidence',
      'Sponsor\'s accommodation evidence',
      'Completed application forms for each applicant',
      'Police clearance certificate, where required',
      'Medical examination evidence, where required',
      'Language test results, where applicable',
      'Visa fee payment receipts',
      'Additional country-specific documents as listed by the authority',
    ],
  },
  pr: {
    visaType: 'pr',
    label: 'Permanent Residency / Immigration',
    note: 'General checklist — requirements vary by destination and individual circumstances.',
    items: [
      'Valid passport (and any previous passports)',
      'Passport-sized photographs meeting destination specifications',
      'Educational certificates and transcripts',
      'Skills assessment or credential evaluation, where applicable',
      'Language test results, where applicable',
      'Employment reference letters and proof of work experience',
      'Curriculum Vitae / resume',
      'Police clearance certificates',
      'Medical examination evidence, where required',
      'Proof of funds / settlement funds',
      'Proof of nomination or sponsorship, where applicable',
      'Birth certificates and family documents',
      'Marriage certificate / relationship evidence, if applicable',
      'Completed application forms and fee receipts',
      'Additional country-specific documents as listed by the authority',
    ],
  },
};

export const CHECKLIST_DISCLAIMER =
  'General checklist — requirements vary by destination and individual circumstances. ' +
  'Immigration requirements change over time; verify the current list with the official ' +
  'government or consular authority before submitting an application.';
