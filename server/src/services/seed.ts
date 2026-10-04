/**
 * Seeds the database with: admin account, visa services, countries, FAQs,
 * demo testimonials and starter blog posts.
 *
 * Run: npm run seed  (idempotent — safe to run repeatedly)
 */
import bcrypt from 'bcryptjs';
import { connectDB, disconnectDB } from '../config/db';
import { env } from '../config/env';
import { Admin } from '../models/Admin';
import { Service } from '../models/Service';
import { Country } from '../models/Country';
import { Faq } from '../models/Faq';
import { Testimonial } from '../models/Testimonial';
import { BlogPost } from '../models/BlogPost';
import { slugify } from '../utils/slugify';

const DISCLAIMER =
  'General information only — requirements vary by destination and individual ' +
  'circumstances and can change at any time. Always verify current requirements ' +
  'with the official government or consular authority.';

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

const services = [
  {
    slug: 'study-visa',
    title: 'Study Visa',
    icon: 'GraduationCap',
    tagline: 'University admissions, applications and student visa guidance',
    summary:
      'End-to-end support for students: course and country selection, admission applications, documentation, SOP/LOR guidance, visa filing and pre-departure preparation.',
    description:
      'Applying to study abroad involves two connected processes — securing an admission and then satisfying the student visa requirements of your destination. ' +
      'We help you build a realistic shortlist of institutions and courses, prepare a strong application file (including Statement of Purpose and Letters of Recommendation guidance), ' +
      'assemble financial and academic documentation, and file the visa application with a complete checklist. ' +
      'Throughout the process we explain what each document is for and what decision-makers typically look for. ' +
      'Admission and visa outcomes are decided solely by the institutions and the relevant authorities.',
    benefits: [
      'University and course shortlisting based on your profile and budget',
      'Admission application assistance and document review',
      'Statement of Purpose (SOP) and LOR guidance',
      'Scholarship and intake planning information',
      'Student visa application assistance and checklist',
      'Pre-departure briefing: travel, arrival and first-week essentials',
    ],
    checklist: [
      'Valid passport',
      'Academic certificates and transcripts',
      'Admission / offer letter',
      'Financial documents',
      'Language test documents, where applicable',
      'Photographs',
      'Other country-specific documents',
    ],
    order: 1,
  },
  {
    slug: 'work-visa',
    title: 'Work Visa',
    icon: 'Briefcase',
    tagline: 'Work permits, skilled pathways and employer-sponsored visas',
    summary:
      'Guidance on work permit routes, employer-sponsored visas and skilled worker pathways — from understanding job offers and sponsor requirements to documentation and relocation.',
    description:
      'Work visa routes differ widely: some require an employer to sponsor you, others are driven by your skills, occupation and points. ' +
      'We help you understand which pathway matches your profile, what your employer (or prospective employer) needs to do, which assessments apply, ' +
      'and how to prepare a complete documentation file. We also provide relocation guidance for the practical steps after approval. ' +
      'Job offers, work permits and visa decisions remain solely with employers and the relevant authorities.',
    benefits: [
      'Work permit and sponsorship pathway guidance',
      'Skilled worker pathway information',
      'Employer documentation and process explanation',
      'Skills and qualification assessment guidance, where applicable',
      'Visa application assistance and document checklist',
      'Post-approval relocation guidance',
    ],
    checklist: [
      'Valid passport',
      'Job offer / employment contract',
      'Employer sponsorship or work permit approval',
      'Educational and professional credentials',
      'Work experience letters',
      'Language test results, where applicable',
      'Police and medical documents, where required',
    ],
    order: 2,
  },
  {
    slug: 'business-visa',
    title: 'Business Visa',
    icon: 'Building2',
    tagline: 'Business travel, meetings, conferences and investor routes',
    summary:
      'Support for business travel visas for meetings, conferences and events, plus information on investor and business immigration routes where they are legally available.',
    description:
      'A business visa is generally intended for short-term commercial activity — meetings, conferences, trade events, site visits and negotiations. ' +
      'We help you prepare the invitation, company and financial documentation that supports the stated purpose of travel. ' +
      'Where your plans involve longer-term investment or company establishment, we provide information on investor and business immigration programmes ' +
      'as they exist in law, together with referrals to licensed professionals where legal advice is required. ' +
      'This service does not include legal advice.',
    benefits: [
      'Business travel and invitation documentation guidance',
      'Meeting, conference and event visa support',
      'Investor and business immigration programme information',
      'Company and financial document checklists',
      'Application preparation assistance',
      'Multi-entry and frequent traveller guidance, where applicable',
    ],
    checklist: [
      'Valid passport',
      'Invitation letter from host company',
      'Proof of company registration / ownership',
      'Company bank statements or proof of funds',
      'Travel itinerary and return reservation',
      'Conference or event registration, where applicable',
      'Travel insurance, where required',
    ],
    order: 3,
  },
  {
    slug: 'tourist-visa',
    title: 'Tourist Visa',
    icon: 'Plane',
    tagline: 'Tourism, holidays and family visits',
    summary:
      'Assistance with tourist and visitor visas for holidays, family visits and short stays — itinerary, financial documentation and application preparation.',
    description:
      'Visitor visa applications are usually assessed on two questions: will you leave at the end of your stay, and can you support yourself during the trip? ' +
      'We help you prepare a coherent itinerary, accommodation and flight reservations, financial evidence and cover letters that explain the purpose of your visit, ' +
      'including family visit and holiday travel. We also prepare you for common questions asked at the application stage.',
    benefits: [
      'Tourist and visitor visa guidance',
      'Family visit and holiday travel documentation',
      'Itinerary, accommodation and flight reservation guidance',
      'Financial evidence and cover letter preparation',
      'Full document checklist for your destination',
      'Application submission assistance',
    ],
    checklist: [
      'Valid passport',
      'Completed application form',
      'Flight itinerary and hotel bookings',
      'Bank statements / proof of funds',
      'Travel insurance, where required',
      'Employment or business proof',
      'Invitation letter for family visits, if applicable',
    ],
    order: 4,
  },
  {
    slug: 'dependent-visa',
    title: 'Dependent / Family Visa',
    icon: 'Users',
    tagline: 'Spouse, children and family reunification',
    summary:
      'Guidance for spouse and dependent applications, family reunification routes and the relationship documentation these applications require.',
    description:
      'Family and dependent applications turn on evidence: proof of relationship, the sponsor’s status and means, and each applicant’s own documentation. ' +
      'We help you understand which route applies — spouse visa, partner route, dependant visa for children, or family reunification — ' +
      'prepare the supporting evidence file, and complete applications for each family member where they are submitted together. ' +
      'Where legal advice on relationship evidence is required, we refer you to licensed professionals.',
    benefits: [
      'Spouse and partner visa guidance',
      'Dependent children application assistance',
      'Family reunification information',
      'Relationship evidence checklist',
      'Sponsor documentation guidance',
      'Joint application coordination',
    ],
    checklist: [
      'Passports for all applicants',
      'Marriage certificate (spouse applications)',
      'Birth certificates (children)',
      'Proof of relationship',
      'Sponsor visa/status and income evidence',
      'Police and medical documents, where required',
      'Application forms and fee receipts',
    ],
    order: 5,
  },
  {
    slug: 'permanent-residency',
    title: 'Permanent Residency / Immigration',
    icon: 'MapPin',
    tagline: 'PR pathways, eligibility assessment and skilled migration',
    summary:
      'Information on permanent residency pathways, skilled migration routes and eligibility assessment, plus documentation guidance for the full application.',
    description:
      'Permanent residency pathways are usually points-based or employer/nomination-based, and they change as policy changes. ' +
      'We assess your profile against the published criteria for the destinations you are considering, explain which pathway realistically fits your profile, ' +
      'and prepare a documented application file — education, language, experience and settlement funds evidence included. ' +
      'An eligibility assessment is an indicative evaluation against current published criteria; it is not a decision and it does not guarantee a result.',
    benefits: [
      'PR pathway information for multiple destinations',
      'Indicative eligibility assessment against published criteria',
      'Skilled migration and nomination pathway guidance',
      'Points / profile improvement planning',
      'Complete documentation guidance',
      'Application preparation and lodgement assistance',
    ],
    checklist: [
      'Passport and travel history',
      'Education certificates and transcripts',
      'Language test results, where applicable',
      'Skills or credential assessment, where applicable',
      'Work experience reference letters',
      'Police clearance and medical checks, where required',
      'Proof of settlement funds',
    ],
    order: 6,
  },
];

const countries = [
  {
    slug: 'canada',
    name: 'Canada',
    image: img('photo-1517935706615-2717063c2225'),
    tagline: 'Study, work, family and skilled migration pathways',
    overview:
      'Canada operates a range of temporary and permanent pathways: study permits for international students, work permits (including employer-driven and open work routes), ' +
      'visitor visas, family sponsorship and a points-based economic immigration system. ' +
      'It is one of the most searched destinations for students and skilled professionals alike.',
    visaCategories: ['Study Visa', 'Work Visa', 'Business Visa', 'Tourist Visa', 'Dependent Visa', 'PR / Immigration'],
    popularPurposes: ['International study', 'Skilled employment', 'Family reunification', 'Tourism and visits'],
    eligibilityOverview:
      'Typical factors assessed include admission to a designated institution, proof of funds, language ability, education level, work experience and, for permanent pathways, ' +
      'a competitive profile against the relevant stream. Requirements differ by programme and change over time — ' + DISCLAIMER,
    documents: [
      'Valid passport',
      'Academic records and credential assessments where applicable',
      'Letter of admission for study permits',
      'Proof of funds covering tuition and living costs',
      'Language test results, where applicable',
      'Employment documents for work routes',
      'Police clearance and medical exams where required',
    ],
    processSteps: [
      { title: 'Choose a pathway', detail: 'Identify the study, work, visit or permanent route that matches your profile.' },
      { title: 'Check requirements', detail: 'Review the current document and eligibility requirements on the official website.' },
      { title: 'Prepare documents', detail: 'Collect, translate and organise every required document.' },
      { title: 'Submit application', detail: 'Complete the application forms and pay the government fees.' },
      { title: 'Biometrics / interview', detail: 'Attend appointments if the authority requests them.' },
      { title: 'Decision', detail: 'Receive the decision and plan your travel or next steps.' },
    ],
    order: 1,
  },
  {
    slug: 'australia',
    name: 'Australia',
    image: img('photo-1506973035872-a4ec16b8e8d9'),
    tagline: 'Student, skilled and temporary activity visas',
    overview:
      'Australia offers student visas for international education, skilled worker visas linked to occupation lists and nominations, temporary work routes, ' +
      'visitor visas and family options. Permanent skilled migration generally runs through a points-tested system.',
    visaCategories: ['Study Visa', 'Work Visa', 'Business Visa', 'Tourist Visa', 'Dependent Visa', 'PR / Immigration'],
    popularPurposes: ['Higher education and vocational study', 'Skilled employment', 'Working holidays', 'Family visits'],
    eligibilityOverview:
      'Common considerations include an offer from an approved education provider, Genuine Temporary Entrant / Genuine Student considerations for students, ' +
      'skills and occupation matching for skilled routes, health insurance, English proficiency and sufficient funds. ' + DISCLAIMER,
    documents: [
      'Valid passport',
      'Confirmation of Enrolment for student applications',
      'Academic transcripts and certificates',
      'English language test results, where applicable',
      'Financial evidence and health insurance',
      'Skills assessments for skilled pathways where applicable',
      'Health and character documents',
    ],
    processSteps: [
      { title: 'Assess your profile', detail: 'Match your education, experience and goals to an available pathway.' },
      { title: 'Gather documents', detail: 'Prepare academic, financial, employment and identity documents.' },
      { title: 'Lodge application', detail: 'Submit online with fees and any required health checks.' },
      { title: 'Biometrics / further checks', detail: 'Complete requested appointments.' },
      { title: 'Decision', detail: 'Receive the outcome and prepare for travel or next steps.' },
    ],
    order: 2,
  },
  {
    slug: 'uk',
    name: 'United Kingdom',
    image: img('photo-1513635269975-59663e0ac1ad'),
    tagline: 'Study and work routes under the points-based system',
    overview:
      'The United Kingdom operates a points-based immigration system that includes student visas, skilled worker visas sponsored by licensed employers, ' +
      'graduate routes, business and visitor visas, plus family routes.',
    visaCategories: ['Study Visa', 'Work Visa', 'Business Visa', 'Tourist Visa', 'Dependent Visa'],
    popularPurposes: ['University education', 'Sponsored employment', 'Business travel', 'Family visits'],
    eligibilityOverview:
      'For study routes you will generally need an offer from a licensed sponsor and evidence of funds. Skilled work routes require a job with a sponsoring employer ' +
      'at the required skill and salary thresholds. Visitor routes require strong ties to your home country and sufficient funds. ' + DISCLAIMER,
    documents: [
      'Valid passport',
      'Cas / admission confirmation for students',
      'Sponsor licence and job details for work routes',
      'Bank statements showing required funds',
      'English language evidence, where applicable',
      'Tuberculosis test results, where applicable',
      'Accommodation and travel details',
    ],
    processSteps: [
      { title: 'Confirm your route', detail: 'Study, work, visit or family — each has its own eligibility rules.' },
      { title: 'Secure sponsorship', detail: 'Where required, obtain your sponsor reference or admission offer.' },
      { title: 'Prepare evidence', detail: 'Assemble finances, identity and supporting documents.' },
      { title: 'Apply online', detail: 'Complete the application, pay fees and book biometrics.' },
      { title: 'Decision', detail: 'Collect the outcome and plan your travel.' },
    ],
    order: 3,
  },
  {
    slug: 'usa',
    name: 'United States',
    image: img('photo-1496442226666-8d4d0e62e6e9'),
    tagline: 'Immigrant and non-immigrant visa categories',
    overview:
      'The United States issues a wide range of non-immigrant visas (including B1/B2 for business and tourism, F for students and H-1B for specialty occupations) ' +
      'alongside family-based and employment-based immigrant visa categories that lead to permanent residence.',
    visaCategories: ['Study Visa', 'Work Visa', 'Business Visa', 'Tourist Visa', 'Dependent Visa', 'PR / Immigration'],
    popularPurposes: ['Undergraduate and graduate study', 'Specialty employment', 'Business meetings', 'Family visits and tourism'],
    eligibilityOverview:
      'Non-immigrant visas generally require a specific purpose and a demonstration of ties to your home country; several categories require a petition filed by a ' +
      'sponsoring employer or institution. Visa issuance always involves a consular interview. ' + DISCLAIMER,
    documents: [
      'Passport valid for travel',
      'DS-160 confirmation for non-immigrant visas',
      'Visa fee payment receipt',
      'I-20 for students / petition approval for work categories',
      'Photographs meeting specifications',
      'Financial evidence',
      'Ties to home country: employment, property, family',
    ],
    processSteps: [
      { title: 'Identify the visa category', detail: 'Match your purpose of travel to the correct non-immigrant or immigrant category.' },
      { title: 'File or obtain petition', detail: 'Where required, your sponsor files the petition with USCIS.' },
      { title: 'Complete DS-160', detail: 'Fill the online application and pay the fee.' },
      { title: 'Attend the interview', detail: 'Appear at the consulate with your supporting documents.' },
      { title: 'Decision', detail: 'Receive the outcome and travel planning details.' },
    ],
    order: 4,
  },
  {
    slug: 'germany',
    name: 'Germany',
    image: img('photo-1467269204594-9661b134dd2b'),
    tagline: 'Study, skilled work and EU Blue Card routes',
    overview:
      'Germany is a leading destination for engineering and technical education, and it offers several work routes including the EU Blue Card and skilled worker ' +
      'permits, alongside student visas, job seeker options and family reunification.',
    visaCategories: ['Study Visa', 'Work Visa', 'Business Visa', 'Tourist Visa', 'Dependent Visa', 'PR / Immigration'],
    popularPurposes: ['Engineering and technical study', 'Skilled employment', 'Business travel', 'Family reunification'],
    eligibilityOverview:
      'Study applications typically require admission from a German institution and proof of funds; work routes depend on a job offer, recognised qualification ' +
      'and salary level. Many long-stay applications require a blocked account and health insurance. ' + DISCLAIMER,
    documents: [
      'Valid passport',
      'Admission letter for study applications',
      'Academic certificates and transcripts',
      'Proof of funds (blocked account or sponsor)',
      'German or English language evidence, where applicable',
      'Health insurance coverage',
      'Employment contract for work routes',
    ],
    processSteps: [
      { title: 'Choose your route', detail: 'Study, job seeker, skilled work or family reunification.' },
      { title: 'Prepare recognition', detail: 'Check qualification recognition where your profession is regulated.' },
      { title: 'Assemble documents', detail: 'Certificates, finances, insurance and identity documents.' },
      { title: 'Apply at the mission', detail: 'Submit the national visa application and attend an appointment.' },
      { title: 'Decision and residence permit', detail: 'After arrival, complete local registration and residence steps.' },
    ],
    order: 5,
  },
  {
    slug: 'new-zealand',
    name: 'New Zealand',
    image: img('photo-1507699622108-4be3abd695ad'),
    tagline: 'Study, accredited employer work and residence pathways',
    overview:
      'New Zealand offers student visas, work visas tied to accredited employers, accredited employer work routes, visitor visas and skilled residence pathways ' +
      'such as the Skilled Migrant Category.',
    visaCategories: ['Study Visa', 'Work Visa', 'Business Visa', 'Tourist Visa', 'Dependent Visa', 'PR / Immigration'],
    popularPurposes: ['Study and research', 'Skilled employment', 'Working holidays', 'Family holidays and visits'],
    eligibilityOverview:
      'Work routes generally require a job with an accredited employer meeting market-rate pay requirements; residence pathways consider points against ' +
      'published thresholds. Visitor applications require funds and onward travel. ' + DISCLAIMER,
    documents: [
      'Valid passport',
      'Offer of place for students',
      'Employment agreement for work routes',
      'Proof of funds and accommodation',
      'Health and character documents',
      'Travel insurance for visitors',
      'Qualifications and experience evidence for residence',
    ],
    processSteps: [
      { title: 'Select a visa', detail: 'Match travel purpose to the correct visa type.' },
      { title: 'Confirm sponsorship', detail: 'Secure employer or education provider documentation where required.' },
      { title: 'Apply online', detail: 'Submit documents and pay fees through the official portal.' },
      { title: 'Health / character checks', detail: 'Complete any requested examinations.' },
      { title: 'Decision', detail: 'Receive the outcome and prepare to travel.' },
    ],
    order: 6,
  },
  {
    slug: 'france',
    name: 'France',
    image: img('photo-1502602898657-3e91760cbb34'),
    tagline: 'Study, talent, business and short-stay visas',
    overview:
      'France welcomes international students through campus-related processes and offers temporary and long-stay visas for work (including talent-based routes), ' +
      'business, tourism and family purposes, in addition to short-stay Schengen visas.',
    visaCategories: ['Study Visa', 'Work Visa', 'Business Visa', 'Tourist Visa', 'Dependent Visa'],
    popularPurposes: ['Higher education', 'Skilled employment', 'Business and conferences', 'Culture and tourism'],
    eligibilityOverview:
      'Long-stay applications typically require admission or employment evidence, accommodation details, insurance and proof of funds; short-stay Schengen ' +
      'applications require travel insurance and sufficient funds for the trip. ' + DISCLAIMER,
    documents: [
      'Valid passport',
      'Admission or employment letter',
      'Proof of accommodation',
      'Bank statements or proof of resources',
      'Travel insurance',
      'Language evidence, where applicable',
      'Academic and professional documents',
    ],
    processSteps: [
      { title: 'Identify the visa type', detail: 'Short-stay Schengen or long-stay visa depending on duration and purpose.' },
      { title: 'Book an appointment', detail: 'Schedule at the consulate or visa application centre.' },
      { title: 'Prepare the file', detail: 'Collect all supporting documents and translations.' },
      { title: 'Submit and biometrics', detail: 'Attend the appointment and provide fingerprints.' },
      { title: 'Decision', detail: 'Collect the passport with the issued visa or decision.' },
    ],
    order: 7,
  },
  {
    slug: 'ireland',
    name: 'Ireland',
    image: img('photo-1590089415225-401ed6f9db8e'),
    tagline: 'Study, skills and visit visas for an English-speaking hub',
    overview:
      'Ireland offers study visas for its higher education sector, employment permits linked to job offers, visit visas for tourism and family travel, ' +
      'and family reunification options. It is a popular destination for technology and life-science careers.',
    visaCategories: ['Study Visa', 'Work Visa', 'Business Visa', 'Tourist Visa', 'Dependent Visa'],
    popularPurposes: ['University education', 'Technology employment', 'Business travel', 'Family visits'],
    eligibilityOverview:
      'Study applications require an offer from a recognised institution, funds and private medical insurance; employment routes require a job offer and, for most ' +
      'roles, an employment permit. Visit visas require proof of purpose, funds and ties to your home country. ' + DISCLAIMER,
    documents: [
      'Valid passport',
      'Letter of offer from the institution',
      'Evidence of funds and fee payment',
      'Private medical insurance',
      'Academic records',
      'Employment permit for work routes',
      'Accommodation and itinerary details',
    ],
    processSteps: [
      { title: 'Confirm your visa type', detail: 'Study, employment, visit or family reunification.' },
      { title: 'Gather documents', detail: 'Academic, financial, insurance and identity documents.' },
      { title: 'Apply online', detail: 'Submit via the official online application system.' },
      { title: 'Provide biometrics', detail: 'Attend an appointment if requested.' },
      { title: 'Decision', detail: 'Receive the outcome and plan your arrival.' },
    ],
    order: 8,
  },
  {
    slug: 'uae',
    name: 'Dubai / UAE',
    image: img('photo-1512453979798-5ea266f8880c'),
    tagline: 'Work, residence, tourism and business travel',
    overview:
      'The United Arab Emirates issues visas for employment and residence (typically sponsored by an employer or relative), tourist and visit visas, ' +
      'and business entry options. Dubai is a major hub for regional business travel and short-term tourism.',
    visaCategories: ['Work Visa', 'Business Visa', 'Tourist Visa', 'Dependent Visa'],
    popularPurposes: ['Employment', 'Business meetings and events', 'Tourism and layovers', 'Family residence'],
    eligibilityOverview:
      'Employment and residence visas are normally sponsored by an employer or family member and involve medical screening and Emirates ID processes; ' +
      'tourist and visit visas require proof of accommodation, return travel and funds. ' + DISCLAIMER,
    documents: [
      'Valid passport (with required validity)',
      'Passport photographs',
      'Employment offer or sponsorship details',
      'Return flight itinerary',
      'Hotel booking or host address',
      'Travel insurance where required',
      'Medical screening for residence visas',
    ],
    processSteps: [
      { title: 'Confirm sponsorship', detail: 'Identify who sponsors your entry — employer, host or family.' },
      { title: 'Prepare documents', detail: 'Passport, photos, itinerary and accommodation.' },
      { title: 'Apply through the channel', detail: 'Submit via airline, typing centre or online portal as applicable.' },
      { title: 'Medical and Emirates ID', detail: 'Complete residence steps after arrival where required.' },
      { title: 'Decision', detail: 'Receive the visa and travel.' },
    ],
    order: 9,
  },
  {
    slug: 'singapore',
    name: 'Singapore',
    image: img('photo-1525625293386-3f8f99389edd'),
    tagline: 'Study, employment passes and short-term visits',
    overview:
      'Singapore attracts students and professionals with its universities and business ecosystem. Work routes include employment passes and work permits ' +
      'typically tied to an employer, alongside study passes, visitor entries and family-based options.',
    visaCategories: ['Study Visa', 'Work Visa', 'Business Visa', 'Tourist Visa', 'Dependent Visa'],
    popularPurposes: ['Postgraduate study', 'Employment', 'Business travel', 'Regional tourism'],
    eligibilityOverview:
      'Work passes are assessed against salary, qualifications, role and employer; study passes require admission and financial evidence; ' +
      'short visits are granted at the border or via entry authorisation depending on nationality. ' + DISCLAIMER,
    documents: [
      'Valid passport',
      'Admission letter for study applications',
      'Employment offer and qualifications for work passes',
      'Employer documentation',
      'Proof of accommodation and return travel',
      'Financial evidence',
      'Recent photographs',
    ],
    processSteps: [
      { title: 'Identify the pass type', detail: 'Visit entry, study pass or work pass depending on your purpose.' },
      { title: 'Employer or institution step', detail: 'Many passes are applied for by the sponsoring employer or school.' },
      { title: 'Prepare documents', detail: 'Identity, academic and financial evidence.' },
      { title: 'Submit application', detail: 'Apply through the official portal or appointment.' },
      { title: 'Decision and arrival', detail: 'Receive in-principle approval and complete arrival formalities.' },
    ],
    order: 10,
  },
];

const faqs = [
  {
    question: 'How long does the visa process take?',
    answer:
      'Processing time depends on the destination, visa category, time of year and how complete your application is. Some applications are decided in a few weeks, ' +
      'others take several months. We provide an indicative timeline during your consultation based on the current published guidance — but processing times are ' +
      'set by the authorities and can change without notice.',
    category: 'Process',
    order: 1,
  },
  {
    question: 'What documents are required?',
    answer:
      'It varies by destination and visa type. Most applications need a valid passport, photographs, financial evidence, purpose documents (admission letter, job offer, ' +
      'invitation) and supporting credentials. Every engagement starts with a document checklist tailored to your case, and we always recommend verifying the ' +
      'current official list before submitting.',
    category: 'Documents',
    order: 2,
  },
  {
    question: 'Can I apply without IELTS?',
    answer:
      'Some destinations and institutions accept alternative language evidence (such as other tests, medium-of-instruction letters or waived conditions), while others ' +
      'require a specific test. Whether you can apply without IELTS depends entirely on the destination, institution and visa category — we will confirm what applies to your case.',
    category: 'Study',
    order: 3,
  },
  {
    question: 'How much money do I need?',
    answer:
      'You will generally need to show funds covering tuition (for students), living costs for your duration of stay, and travel. The required amount differs by country ' +
      'and sometimes by city or programme. During your consultation we walk through the typical funding evidence for your chosen destination.',
    category: 'Finances',
    order: 4,
  },
  {
    question: 'Can you guarantee my visa?',
    answer:
      'No — and you should be cautious of anyone who says otherwise. No consultancy, agent or lawyer can guarantee a visa, admission, job or permanent residency. ' +
      'Decisions are made solely by the relevant authority. What we can guarantee is a thorough, honest and well-prepared application, and transparent advice about ' +
      'your chances based on your circumstances.',
    category: 'Trust',
    order: 5,
  },
  {
    question: 'Do you provide university admission assistance?',
    answer:
      'Yes. We help with course and country selection, university shortlisting, application form completion, document preparation, and guidance on statements of purpose ' +
      'and recommendation letters. Admission decisions remain with the institutions.',
    category: 'Study',
    order: 6,
  },
  {
    question: 'Can you help with dependent visas?',
    answer:
      'Yes. We assist with spouse and dependent applications, family reunification guidance and the relationship documentation these applications require. ' +
      'Eligibility depends on the sponsor’s status and the rules of the destination.',
    category: 'Family',
    order: 7,
  },
  {
    question: 'What happens if my application is refused?',
    answer:
      'A refusal is not the end of the road. Depending on the destination, you may be able to reapply with stronger evidence, request a review, or appeal where the ' +
      'rules allow it. We review the stated reasons for refusal, identify gaps in the file and advise on the realistic options available to you.',
    category: 'Process',
    order: 8,
  },
  {
    question: 'Is your consultation really free?',
    answer:
      'Yes — your first consultation is free. It covers an overview of your options, likely pathways and the documents involved. Any paid service is discussed ' +
      'transparently with a clear scope before you commit to anything.',
    category: 'Trust',
    order: 9,
  },
  {
    question: 'Do you work with governments or are you a government body?',
    answer:
      'No. We are a private consultancy. We are not affiliated with, endorsed by or acting on behalf of any government, embassy, consulate or immigration authority, ' +
      'and government fees are paid directly to the relevant authorities.',
    category: 'Trust',
    order: 10,
  },
];

/** DEMO placeholder content - clearly flagged in the UI, replaced before launch. */
const testimonials = [
  {
    name: 'Aarav S. (demo)',
    country: 'Canada',
    visaType: 'Study Visa',
    review:
      'Demo placeholder review. The team explained each document in my student application file and kept me updated at every step of the process.',
    rating: 5,
    isDemo: true,
    order: 1,
  },
  {
    name: 'Priya M. (demo)',
    country: 'Australia',
    visaType: 'Work Visa',
    review:
      'Demo placeholder review. I appreciated the honest assessment of my skilled migration options before anything was filed.',
    rating: 5,
    isDemo: true,
    order: 2,
  },
  {
    name: 'Daniel K. (demo)',
    country: 'United Kingdom',
    visaType: 'Business Visa',
    review:
      'Demo placeholder review. Business travel documentation was organised quickly and the checklist made preparation straightforward.',
    rating: 5,
    isDemo: true,
    order: 3,
  },
  {
    name: 'Sofia R. (demo)',
    country: 'Germany',
    visaType: 'Study Visa',
    review:
      'Demo placeholder review. Course selection advice was practical and the SOP guidance genuinely improved my application.',
    rating: 4,
    isDemo: true,
    order: 4,
  },
  {
    name: 'Hassan A. (demo)',
    country: 'Dubai / UAE',
    visaType: 'Tourist Visa',
    review:
      'Demo placeholder review. My family visit application was prepared carefully and every question was answered patiently.',
    rating: 5,
    isDemo: true,
    order: 5,
  },
  {
    name: 'Mei L. (demo)',
    country: 'New Zealand',
    visaType: 'PR / Immigration',
    review:
      'Demo placeholder review. The eligibility walkthrough set realistic expectations and the document review was thorough.',
    rating: 5,
    isDemo: true,
    order: 6,
  },
];

const posts = [
  {
    title: 'How to Build a Strong Student Visa Document File',
    slug: 'strong-student-visa-document-file',
    category: 'Documentation' as const,
    author: 'Editorial Team',
    coverImage: img('photo-1503676260728-1c00da094a0b'),
    excerpt:
      'A practical framework for organising your study visa documents — what officers look for, common gaps, and how to present a complete file.',
    metaDescription:
      'A practical framework for organising your study visa documents: what decision-makers look for, common gaps, and how to present a complete file.',
    tags: ['study visa', 'documents', 'students'],
    published: true,
    content: `A visa application is a story told through documents. The officer reviewing your file has limited time and a checklist in hand — your job is to make their decision easy by presenting a complete, consistent and easy-to-follow file.

## Start with the checklist, not the folder

Begin with the official document checklist for your destination and visa subclass. Copy it into a spreadsheet, add a column for "document I will provide" and a column for "status". Everything else is secondary. Applications are delayed far more often by missing routine documents than by weak evidence.

## Consistency beats volume

Every document should agree with the others: your dates of study and employment should line up across your transcripts, resume and letters; your stated purpose should match your admission letter and your statement of purpose. Contradictions — even small ones — invite further scrutiny.

## Financial evidence needs context

A bank balance on its own raises questions. Add context: who is funding you, what their relationship to you is, what the source of the funds is, and how it maps to your tuition and living costs. Sponsorship letters, income evidence and tax documents make the picture credible.

## Translate and format properly

Provide certified translations where required, keep scans legible and in the accepted format, and label every file clearly. If a document is expired or replaced, include both the old and new versions with a short explanation.

## Final review before submission

Walk the file once more against the checklist. Confirm names, passport numbers and dates match exactly across documents, confirm signatures are present, and confirm fee receipts are included.

The information in this article is general and does not constitute immigration advice. Requirements change — always verify the current requirements with the official authority before submitting.`,
  },
  {
    title: 'Study Abroad: Choosing the Right Country and Course',
    slug: 'choosing-country-and-course',
    category: 'Study Abroad' as const,
    author: 'Editorial Team',
    coverImage: img('photo-1523240795612-9a054b0db644'),
    excerpt:
      'A structured way to shortlist destinations and programmes — budget, career outcomes, post-study options and lifestyle fit.',
    metaDescription:
      'A structured way to shortlist study destinations and programmes: budget, career outcomes, post-study options and lifestyle fit.',
    tags: ['study abroad', 'students', 'planning'],
    published: true,
    content: `Choosing a destination is one of the highest-leverage decisions you will make. The "best" country is the one that fits your budget, your academic profile and your long-term plans — not necessarily the most popular one.

## Work backwards from your goal

Ask what you want five years after graduation: employment in that country, a return home with international experience, or further study. Post-study work rules, industry presence and language of the workplace differ widely between destinations, and they shape your options after you graduate.

## Budget honestly

Tuition is only part of the cost. Add living costs, health insurance, deposits, travel and the currency exchange buffer. Build in a margin for the unexpected — a budget with no slack is how students end up under financial pressure mid-course.

## Match the programme to your profile

Shortlist three to five programmes across two levels of ambition: reach, realistic and safe. Compare module content, teaching format, assessment style and internship options rather than relying on rankings alone.

## Check the admission requirements early

English language requirements, prerequisite subjects, work experience and prior grades all gate your application. Finding a gap a year before you apply gives you time to fix it; finding it at the deadline does not.

## Talk it through

A consultation will not make the decision for you, but it will surface trade-offs you had not considered and give you an honest read on your chances at each shortlisted option.

This article is general information, not immigration or admissions advice. Programme availability and visa rules change — verify details with the institutions and official authorities.`,
  },
  {
    title: 'Skilled Worker Visas: What Employers and Employees Each Need',
    slug: 'skilled-worker-visas-employer-employee',
    category: 'Work Abroad' as const,
    author: 'Editorial Team',
    coverImage: img('photo-1521737711867-e3b97375f902'),
    excerpt:
      'Work permit routes usually involve two parties. Here is what typically falls on the employer and what falls on you.',
    metaDescription:
      'Work permit routes usually involve two parties. What typically falls on the employer, and what falls on the employee, in skilled worker visa applications.',
    tags: ['work visa', 'employment', 'skilled migration'],
    published: true,
    content: `Most skilled worker visa routes are a joint effort. Understanding which responsibilities sit with your employer and which sit with you prevents the most common causes of delay.

## What the employer usually handles

For sponsored routes, the employer typically holds or obtains a sponsor licence, issues a certificate of sponsorship or equivalent, and provides the contract details — role, salary, hours — that the application is assessed against. Some destinations require the employer to advertise the role first, or to prove the salary meets a threshold.

## What you handle

Your side is mostly evidence: identity documents, qualifications, experience letters, language evidence where applicable, and any skills or credential assessment the route requires. If any of your experience letters are vague, request a fuller one now — officer-friendly letters state your role, dates, duties and hours.

## Shared responsibilities

Both parties should confirm the job title, duties and salary are described identically across every document. Mismatches between the contract, the sponsorship details and your resume are a routine reason for queries.

## Before you sign anything

Read the employment contract carefully, confirm probation terms and notice periods, and understand which costs the employer covers. Be cautious of any arrangement asking you to pay for a job offer or a guaranteed work permit — legitimate processes do not work that way.

## If the route needs an assessment

Some countries require skills, trade or credential assessments before the visa application. These take time — start them as early as your situation allows.

General information only. Immigration rules and employer obligations differ by country and change frequently; confirm current requirements with the official authority.`,
  },
  {
    title: 'What a Refusal Actually Means (and What You Can Do Next)',
    slug: 'what-a-visa-refusal-means',
    category: 'Visa Updates' as const,
    author: 'Editorial Team',
    coverImage: img('photo-1450101499163-c8848c66ca85'),
    excerpt:
      'A refusal is a decision about a specific application at a specific time — not a permanent verdict. Here is how to read it.',
    metaDescription:
      'A visa refusal is a decision about a specific application at a specific time, not a permanent verdict. How to read a refusal and what to do next.',
    tags: ['refusal', 'appeals', 'process'],
    published: true,
    content: `Receiving a refusal is discouraging, but it is a decision about one application at one moment in time — not a permanent judgement about you.

## Read the reasons

Every refusal letter states reasons. Common ones include insufficient financial evidence, weak ties to the home country, incomplete documents, inconsistent information or not meeting a specific criterion. The reasons tell you exactly which parts of the file to rebuild.

## Check your options

Depending on the destination and the basis of the decision, you may be able to reapply, request an administrative review, or appeal. These options have strict deadlines — note the deadline as soon as the decision arrives.

## Rebuild, don't just resend

Submitting the same file again usually produces the same outcome. Address each stated reason with new or stronger evidence, and add a short cover letter explaining how the previous concern has been resolved.

## Be honest on reapplication

Never submit information you believe to be false to fix a problem. Inconsistencies between applications are recorded and can turn a fixable refusal into a much longer-term problem.

## Learn from it before the next attempt

A refusal on record does not mean future applications will fail. Applicants are approved after previous refusals every day — with a stronger, consistent and honest file.

This is general information, not legal advice. Review routes and deadlines with the official authority or a licensed professional.`,
  },
];

async function seed() {
  await connectDB();
  console.log('[seed] starting...');

  /* Admin ----------------------------------------------------------- */
  const adminEmail = env.admin.email.toLowerCase();
  const passwordHash = await bcrypt.hash(env.admin.password, 12);
  await Admin.findOneAndUpdate(
    { email: adminEmail },
    { name: 'Site Administrator', email: adminEmail, passwordHash, role: 'admin' },
    { upsert: true, setDefaultsOnInsert: true },
  );
  console.log(`[seed] admin ready: ${adminEmail}`);

  /* Upsert helper --------------------------------------------------- */
  const upsert = async (
    model: { findOneAndUpdate: Function },
    filter: Record<string, unknown>,
    doc: Record<string, unknown>,
    label: string,
  ) => {
    await model.findOneAndUpdate(filter, doc, {
      upsert: true,
      setDefaultsOnInsert: true,
      new: true,
      runValidators: true,
    });
    console.log(`[seed] ${label} ok`);
  };

  for (const s of services) await upsert(Service, { slug: s.slug }, s, `service: ${s.slug}`);
  for (const c of countries) await upsert(Country, { slug: c.slug }, c, `country: ${c.slug}`);

  for (const f of faqs) {
    const existing = await Faq.findOne({ question: f.question });
    if (existing) {
      Object.assign(existing, f);
      await existing.save();
    } else {
      await Faq.create(f);
    }
    console.log(`[seed] faq: ${f.question.slice(0, 40)}...`);
  }

  for (const t of testimonials) {
    const existing = await Testimonial.findOne({ name: t.name, visaType: t.visaType });
    if (existing) {
      Object.assign(existing, t);
      await existing.save();
    } else {
      await Testimonial.create(t);
    }
    console.log(`[seed] testimonial: ${t.name}`);
  }

  for (const p of posts) {
    const doc = { ...p, publishedAt: new Date(), slug: slugify(p.slug) };
    const existing = await BlogPost.findOne({ slug: doc.slug });
    if (existing) {
      Object.assign(existing, doc);
      await existing.save();
    } else {
      await BlogPost.create(doc);
    }
    console.log(`[seed] post: ${doc.slug}`);
  }

  console.log('[seed] done.');
  await disconnectDB();
}

seed().catch((err) => {
  console.error('[seed] failed:', err);
  process.exit(1);
});
