import { useState } from 'react';
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Download,
  CalendarCheck,
  MessageSquare,
  Info,
  ClipboardList,
} from 'lucide-react';
import Seo, { breadcrumbLd } from '@/components/ui/Seo';
import { Section } from '@/components/ui/Section';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Input, Select, Checkbox } from '@/components/ui/Field';
import { FormAlert, LoadingButton } from '@/components/ui/States';
import { api, ApiError } from '@/services/api';
import { DESTINATIONS } from '@/data/site';
import { downloadChecklistPdf } from '@/utils/pdf';
import type { Checklist } from '@/services/api';

const AGES = ['18–21', '22–25', '26–30', '31–35', '36–45', '46+'];
const EDUCATION = [
  'High school',
  'Diploma / certificate',
  "Bachelor's degree",
  "Master's degree",
  'Doctorate / PhD',
  'Other',
];
const EXPERIENCE = [
  'No work experience',
  'Less than 1 year',
  '1–3 years',
  '3–5 years',
  '5–10 years',
  '10+ years',
];
const BUDGET = [
  'Under $5,000',
  '$5,000 – $15,000',
  '$15,000 – $30,000',
  '$30,000 – $50,000',
  '$50,000+',
  'Not decided yet',
];
const TIMELINE = ['Within 3 months', '3 – 6 months', '6 – 12 months', '12+ months', 'Just exploring'];

const schema = z.object({
  name: z.string().trim().min(2, 'Enter your full name.'),
  email: z.string().trim().email('Enter a valid email address.'),
  phone: z.string().trim().min(5, 'Enter a valid phone number.'),
  ageRange: z.string().min(1, 'Select your age range.'),
  residence: z.string().min(1, 'Select your country of residence.'),
  destination: z.string().min(1, 'Select your desired destination.'),
  purpose: z.enum(
    ['Study', 'Work', 'Business', 'Tourism', 'Family/Dependent', 'PR/Immigration'],
    { errorMap: () => ({ message: 'Select your purpose of travel.' }) },
  ),
  education: z.string().min(1, 'Select your education level.'),
  experience: z.string().min(1, 'Select your work experience.'),
  budget: z.string().min(1, 'Select an approximate budget.'),
  timeline: z.string().min(1, 'Select your preferred timeline.'),
  consent: z.boolean().refine((v) => v === true, {
    message: 'You must accept the privacy notice to continue.',
  }),
});

type FormValues = z.infer<typeof schema>;

const PURPOSE_TO_CHECKLIST: Record<string, string> = {
  Study: 'study',
  Work: 'work',
  Business: 'business',
  Tourism: 'tourist',
  'Family/Dependent': 'dependent',
  'PR/Immigration': 'pr',
};

/** Suggested categories shown in the informational result. */
function suggestCategories(purpose: FormValues['purpose']): string[] {
  switch (purpose) {
    case 'Study':
      return ['Study Visa', 'Tourist Visa (for campus visits)', 'Dependent Visa (if applicable)'];
    case 'Work':
      return ['Work Visa', 'PR / Immigration pathways', 'Dependent Visa (if applicable)'];
    case 'Business':
      return ['Business Visa', 'Work Visa (if relocating)', 'Tourist Visa (for combined travel)'];
    case 'Tourism':
      return ['Tourist Visa', 'Business Visa (if combining meetings)', 'Dependent Visa (family visit)'];
    case 'Family/Dependent':
      return ['Dependent / Family Visa', 'Tourist Visa (short visits)', 'Work Visa (if eligible)'];
    case 'PR/Immigration':
    default:
      return ['PR / Immigration', 'Work Visa (as an interim step)', 'Study Visa (if studying first)'];
  }
}

const STEPS = [
  { key: 1, label: 'About you' },
  { key: 2, label: 'Your plans' },
  { key: 3, label: 'Background' },
];

const PURPOSE_BY_SLUG: Record<string, FormValues['purpose']> = {
  study: 'Study',
  work: 'Work',
  business: 'Business',
  tourist: 'Tourism',
  dependent: 'Family/Dependent',
  pr: 'PR/Immigration',
};

export default function Eligibility() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const statePrefill = (location.state || {}) as { destination?: string; purpose?: string };
  const queryPurpose = PURPOSE_BY_SLUG[(searchParams.get('purpose') || '').toLowerCase()];
  const prefill = {
    destination: statePrefill.destination || searchParams.get('destination') || '',
    purpose: statePrefill.purpose || queryPurpose || '',
  };

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState<FormValues | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      ageRange: '',
      residence: '',
      destination: prefill.destination || '',
      purpose: (prefill.purpose as FormValues['purpose']) || undefined,
      education: '',
      experience: '',
      budget: '',
      timeline: '',
      consent: false,
    },
  });

  const next = async () => {
    const fieldsByStep: Record<number, (keyof FormValues)[]> = {
      1: ['name', 'email', 'phone', 'ageRange', 'residence'],
      2: ['destination', 'purpose', 'timeline'],
    };
    const valid = await trigger(fieldsByStep[step] as (keyof FormValues)[]);
    if (valid) setStep((s) => Math.min(3, s + 1));
  };

  const back = () => setStep((s) => Math.max(1, s - 1));

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    setServerError(null);
    try {
      await api.post('/eligibility', values);
      setSubmitted(values);
    } catch (err) {
      setServerError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const downloadChecklist = async () => {
    if (!submitted) return;
    setPdfBusy(true);
    try {
      const checklistKey = PURPOSE_TO_CHECKLIST[submitted.purpose] || 'study';
      const res = await api.get<{ data: Checklist }>(`/checklists/${checklistKey}`);
      await downloadChecklistPdf(res.data, {
        applicantName: submitted.name,
        destination: submitted.destination,
        purpose: submitted.purpose,
      });
    } catch {
      setServerError('We could not generate the checklist right now. Please try again.');
    } finally {
      setPdfBusy(false);
    }
  };

  /* ----------------------------- Result ----------------------------- */
  if (submitted) {
    const categories = suggestCategories(submitted.purpose);

    return (
      <>
        <Seo
          title="Your Visa Options"
          description="Informational result of your visa eligibility check."
          path="/eligibility"
          noindex
        />
        <Section className="bg-gradient-to-br from-royal-50 via-white to-gold-50 !py-14">
          <div className="mx-auto max-w-3xl">
            <div className="card overflow-hidden">
              <div className="bg-cta-gradient px-6 py-8 text-center sm:px-8">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white/15 text-gold-300">
                  <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
                </span>
                <h1 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
                  Thank you, {submitted.name.split(' ')[0]}.
                </h1>
                <p className="mx-auto mt-2 max-w-xl text-sm text-navy-100">
                  Based on the information provided, these visa categories may be relevant to you.
                </p>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-3 rounded-2xl border border-royal-100 bg-royal-50/60 p-4 text-sm leading-relaxed text-ink-700">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-royal-600" aria-hidden="true" />
                  <p>
                    <strong>Final eligibility depends on official immigration requirements and
                    individual circumstances.</strong>{' '}
                    This is general information, not a decision, approval or guarantee. Always
                    verify current requirements with the relevant government authority.
                  </p>
                </div>

                <div className="mt-6">
                  <h2 className="flex items-center gap-2 font-display text-lg font-bold text-navy-950">
                    <ClipboardList className="h-5 w-5 text-gold-600" aria-hidden="true" />
                    Potentially relevant categories
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {categories.map((cat) => (
                      <li
                        key={cat}
                        className="flex items-center justify-between gap-3 rounded-xl border border-ink-100 bg-ink-50/50 px-4 py-3"
                      >
                        <span className="text-sm font-medium text-ink-800">{cat}</span>
                        <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-royal-700 shadow-sm">
                          {submitted.destination}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  {[
                    ['Destination', submitted.destination],
                    ['Purpose', submitted.purpose],
                    ['Timeline', submitted.timeline],
                    ['Budget range', submitted.budget],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl border border-ink-100 p-3">
                      <dt className="text-xs text-ink-500">{label}</dt>
                      <dd className="mt-0.5 font-medium text-navy-950">{value}</dd>
                    </div>
                  ))}
                </dl>

                {serverError && (
                  <div className="mt-5">
                    <FormAlert type="error">{serverError}</FormAlert>
                  </div>
                )}

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  <ButtonLink to="/consultation" variant="gold" className="w-full">
                    <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                    Request consultation
                  </ButtonLink>
                  <ButtonLink to="/contact" variant="outline" className="w-full">
                    <MessageSquare className="h-4 w-4" aria-hidden="true" />
                    Contact consultant
                  </ButtonLink>
                  <Button
                    variant="primary"
                    onClick={downloadChecklist}
                    disabled={pdfBusy}
                    className="w-full"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    {pdfBusy ? 'Preparing…' : 'Download checklist'}
                  </Button>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-ink-100 pt-5 text-sm">
                  <p className="text-ink-500">Want a different destination or purpose?</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(null);
                      setStep(1);
                    }}
                    className="font-semibold text-royal-700 hover:text-royal-800"
                  >
                    Start a new check
                  </button>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-ink-500">
              Looking for details? Read about{' '}
              <Link to="/visa-services" className="font-semibold text-royal-700 hover:underline">
                our services
              </Link>{' '}
              or browse{' '}
              <Link to="/countries" className="font-semibold text-royal-700 hover:underline">
                country guides
              </Link>
              .
            </p>
          </div>
        </Section>
      </>
    );
  }

  /* ----------------------------- Form ------------------------------- */
  return (
    <>
      <Seo
        title="Check Your Visa Options"
        description="Answer a few questions to see which visa categories may be relevant to you. Free, instant and no account required."
        path="/eligibility"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Eligibility Checker', path: '/eligibility' },
        ])}
      />

      <section className="bg-navy-950 py-14 md:py-20">
        <div className="container-page max-w-3xl text-center">
          <p className="eyebrow mb-4 justify-center text-gold-300">
            <span className="h-px w-6 bg-current" aria-hidden="true" />
            Visa eligibility checker
          </p>
          <h1 className="heading-xl text-white">Check your visa options</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-navy-100">
            Ten quick questions. An informational shortlist in seconds — no obligation, no account
            required.
          </p>
        </div>
      </section>

      <Section className="!py-12">
        <div className="mx-auto max-w-3xl">
          {/* Progress */}
          <ol className="mb-8 flex items-center gap-2" aria-label="Form progress">
            {STEPS.map((s, i) => (
              <li key={s.key} className="flex flex-1 items-center gap-2">
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors ${
                    step >= s.key ? 'bg-navy-950 text-gold-400' : 'bg-ink-100 text-ink-500'
                  }`}
                  aria-current={step === s.key ? 'step' : undefined}
                >
                  {step > s.key ? '✓' : s.key}
                </span>
                <span
                  className={`hidden text-xs font-medium sm:block ${
                    step >= s.key ? 'text-navy-950' : 'text-ink-400'
                  }`}
                >
                  {s.label}
                </span>
                {i < STEPS.length - 1 && (
                  <span
                    className={`h-px flex-1 ${step > s.key ? 'bg-navy-950' : 'bg-ink-200'}`}
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>

          <form onSubmit={handleSubmit(onSubmit)} className="card p-6 sm:p-8" noValidate>
            {serverError && (
              <div className="mb-5">
                <FormAlert type="error">{serverError}</FormAlert>
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  label="Full name"
                  placeholder="Your full name"
                  autoComplete="name"
                  wrapperClassName="sm:col-span-2"
                  error={errors.name?.message}
                  {...register('name')}
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  error={errors.email?.message}
                  {...register('email')}
                />
                <Input
                  label="Phone"
                  type="tel"
                  placeholder="+00 000 000 0000"
                  autoComplete="tel"
                  error={errors.phone?.message}
                  {...register('phone')}
                />
                <Select
                  label="Age range"
                  placeholder="Select age range"
                  options={AGES.map((a) => ({ value: a, label: a }))}
                  error={errors.ageRange?.message}
                  {...register('ageRange')}
                />
                <Select
                  label="Country of residence"
                  placeholder="Select country"
                  options={DESTINATIONS.map((d) => ({ value: d, label: d }))}
                  error={errors.residence?.message}
                  {...register('residence')}
                />
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Select
                  label="Desired destination"
                  placeholder="Select destination"
                  options={DESTINATIONS.map((d) => ({ value: d, label: d }))}
                  error={errors.destination?.message}
                  {...register('destination')}
                />
                <Select
                  label="Purpose"
                  placeholder="Select purpose"
                  options={[
                    { value: 'Study', label: 'Study' },
                    { value: 'Work', label: 'Work' },
                    { value: 'Business', label: 'Business' },
                    { value: 'Tourism', label: 'Tourism' },
                    { value: 'Family/Dependent', label: 'Family / Dependent' },
                    { value: 'PR/Immigration', label: 'PR / Immigration' },
                  ]}
                  error={errors.purpose?.message}
                  {...register('purpose')}
                />
                <div className="sm:col-span-2">
                  <Select
                    label="Preferred travel timeline"
                    placeholder="Select timeline"
                    options={TIMELINE.map((t) => ({ value: t, label: t }))}
                    error={errors.timeline?.message}
                    {...register('timeline')}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Select
                  label="Education level"
                  placeholder="Select education"
                  options={EDUCATION.map((e) => ({ value: e, label: e }))}
                  error={errors.education?.message}
                  {...register('education')}
                />
                <Select
                  label="Work experience"
                  placeholder="Select experience"
                  options={EXPERIENCE.map((e) => ({ value: e, label: e }))}
                  error={errors.experience?.message}
                  {...register('experience')}
                />
                <div className="sm:col-span-2">
                  <Select
                    label="Approximate budget"
                    placeholder="Select budget range"
                    options={BUDGET.map((b) => ({ value: b, label: b }))}
                    error={errors.budget?.message}
                    {...register('budget')}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Checkbox
                    label="I consent to FlyNest Overseas Consultancy storing these details to respond to my enquiry, as described in the Privacy Policy."
                    error={errors.consent?.message}
                    {...register('consent')}
                  />
                </div>
              </div>
            )}

            <div className="mt-7 flex items-center justify-between gap-3 border-t border-ink-100 pt-6">
              {step > 1 ? (
                <Button type="button" variant="ghost" onClick={back}>
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Back
                </Button>
              ) : (
                <span className="text-xs text-ink-400">Step {step} of 3</span>
              )}

              {step < 3 ? (
                <Button type="button" onClick={next}>
                  Continue
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              ) : (
                <Button type="submit" variant="gold" disabled={submitting}>
                  {submitting ? <LoadingButton label="Checking…" /> : 'See my visa options'}
                  {!submitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                </Button>
              )}
            </div>
          </form>

          <p className="mt-5 text-center text-xs leading-relaxed text-ink-500">
            This tool provides general information only. It does not assess legal eligibility and
            does not guarantee any visa, admission, job or residency outcome.
          </p>
        </div>
      </Section>
    </>
  );
}
