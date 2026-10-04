import { z } from 'zod';

const consent = z.literal(true, {
  errorMap: () => ({ message: 'You must accept the privacy notice to continue.' }),
});

const email = z.string().trim().min(1, 'Email is required.').max(160).email('Enter a valid email address.');
const phone = z
  .string()
  .trim()
  .min(5, 'Enter a valid phone number.')
  .max(40)
  .regex(/^[0-9+\-() ]+$/, 'Enter a valid phone number.');
const name = z.string().trim().min(2, 'Enter your full name.').max(120);

export const consultationSchema = z
  .object({
    name,
    email,
    phone,
    country: z.string().trim().min(1, 'Select a country.').max(80),
    visaType: z.string().trim().min(1, 'Select a visa type.').max(80),
    preferredDate: z.string().trim().max(40).optional().or(z.literal('')),
    preferredTime: z.string().trim().max(40).optional().or(z.literal('')),
    message: z.string().trim().max(3000).optional().or(z.literal('')),
    consent,
  })
  .strict();

export const eligibilitySchema = z
  .object({
    name,
    email,
    phone,
    ageRange: z.string().trim().min(1).max(60),
    residence: z.string().trim().min(1).max(80),
    destination: z.string().trim().min(1).max(80),
    purpose: z.enum(['Study', 'Work', 'Business', 'Tourism', 'Family/Dependent', 'PR/Immigration']),
    education: z.string().trim().min(1).max(80),
    experience: z.string().trim().min(1).max(80),
    budget: z.string().trim().min(1).max(80),
    timeline: z.string().trim().min(1).max(80),
    consent,
  })
  .strict();

export const contactSchema = z
  .object({
    name,
    email,
    phone: phone.optional().or(z.literal('')),
    subject: z.string().trim().max(200).optional().or(z.literal('')),
    message: z.string().trim().min(5, 'Tell us how we can help.').max(3000),
    consent,
  })
  .strict();

export const loginSchema = z
  .object({
    email: z.string().trim().email('Enter a valid email address.'),
    password: z.string().min(8, 'Password must be at least 8 characters.'),
  })
  .strict();

export const leadStatusSchema = z
  .object({
    status: z.enum(['New', 'Contacted', 'Consultation Scheduled', 'In Progress', 'Completed']),
  })
  .strict();

export const noteSchema = z
  .object({
    body: z.string().trim().min(2, 'Note is too short.').max(2000),
  })
  .strict();

const objectId = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid record id.');

export const idParam = objectId;

export const serviceSchema = z
  .object({
    slug: z.string().trim().min(1).max(90),
    title: z.string().trim().min(2).max(120),
    icon: z.string().trim().max(60).optional(),
    tagline: z.string().trim().max(240).optional().or(z.literal('')),
    summary: z.string().trim().min(10).max(600),
    description: z.string().trim().max(6000).optional().or(z.literal('')),
    benefits: z.array(z.string().trim().max(300)).max(20).default([]),
    checklist: z.array(z.string().trim().max(300)).max(30).default([]),
    order: z.coerce.number().int().min(0).max(9999).default(0),
    published: z.boolean().default(true),
  })
  .strict();

export const countrySchema = z
  .object({
    slug: z.string().trim().min(1).max(90),
    name: z.string().trim().min(2).max(80),
    image: z.string().trim().max(500).optional().or(z.literal('')),
    tagline: z.string().trim().max(240).optional().or(z.literal('')),
    overview: z.string().trim().min(10).max(4000),
    visaCategories: z.array(z.string().trim().max(80)).max(12).default([]),
    popularPurposes: z.array(z.string().trim().max(120)).max(12).default([]),
    eligibilityOverview: z.string().trim().max(3000).optional().or(z.literal('')),
    documents: z.array(z.string().trim().max(300)).max(30).default([]),
    processSteps: z
      .array(z.object({ title: z.string().trim().max(120), detail: z.string().trim().max(600) }))
      .max(12)
      .default([]),
    order: z.coerce.number().int().min(0).max(9999).default(0),
    published: z.boolean().default(true),
  })
  .strict();

export const faqSchema = z
  .object({
    question: z.string().trim().min(5).max(300),
    answer: z.string().trim().min(5).max(3000),
    category: z.string().trim().max(80).default('General'),
    order: z.coerce.number().int().min(0).max(9999).default(0),
    published: z.boolean().default(true),
  })
  .strict();

export const testimonialSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    country: z.string().trim().max(80).optional().or(z.literal('')),
    visaType: z.string().trim().max(80).optional().or(z.literal('')),
    review: z.string().trim().min(10).max(1200),
    avatar: z.string().trim().max(500).optional().or(z.literal('')),
    rating: z.coerce.number().min(1).max(5).default(5),
    isDemo: z.boolean().default(true),
    order: z.coerce.number().int().min(0).max(9999).default(0),
    published: z.boolean().default(true),
  })
  .strict();

export const blogSchema = z
  .object({
    title: z.string().trim().min(3).max(200),
    slug: z
      .string()
      .trim()
      .min(2)
      .max(90)
      .regex(/^[a-z0-9-]+$/, 'Use lowercase letters, numbers and dashes only.'),
    excerpt: z.string().trim().max(500).optional().or(z.literal('')),
    content: z.string().trim().min(20).max(60000),
    category: z
      .enum([
        'Visa Updates',
        'Study Abroad',
        'Work Abroad',
        'Immigration',
        'Travel',
        'Country Guides',
        'Documentation',
        'Student Guides',
      ])
      .default('Immigration'),
    author: z.string().trim().max(100).default('Editorial Team'),
    coverImage: z.string().trim().max(500).optional().or(z.literal('')),
    metaDescription: z.string().trim().max(180).optional().or(z.literal('')),
    tags: z.array(z.string().trim().max(40)).max(15).default([]),
    published: z.boolean().default(false),
  })
  .strict();
