import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CalendarCheck, CheckCircle2, MessageCircle, Info, Phone, Mail } from 'lucide-react';
import Seo, { breadcrumbLd } from '@/components/ui/Seo';
import { Section } from '@/components/ui/Section';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Input, Select, Textarea, Checkbox } from '@/components/ui/Field';
import { FormAlert, LoadingButton } from '@/components/ui/States';
import SmartImage from '@/components/ui/SmartImage';
import { api, ApiError } from '@/services/api';
import { COMPANY } from '@/data/company';
import { DESTINATIONS, VISA_TYPES } from '@/data/site';

const schema = z.object({
  name: z.string().trim().min(2, 'Enter your full name.'),
  email: z.string().trim().email('Enter a valid email address.'),
  phone: z.string().trim().min(5, 'Enter a valid phone number.'),
  country: z.string().min(1, 'Select a country.'),
  visaType: z.string().min(1, 'Select a visa type.'),
  preferredDate: z.string().optional().or(z.literal('')),
  preferredTime: z.string().optional().or(z.literal('')),
  message: z.string().max(3000, 'Message is too long.').optional().or(z.literal('')),
  consent: z.boolean().refine((v) => v === true, {
    message: 'You must accept the privacy notice to continue.',
  }),
});

type FormValues = z.infer<typeof schema>;

const TIME_SLOTS = [
  '09:30 – 10:30',
  '10:30 – 11:30',
  '11:30 – 12:30',
  '14:00 – 15:00',
  '15:00 – 16:00',
  '16:00 – 17:00',
];

export default function Consultation() {
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      country: '',
      visaType: '',
      preferredDate: '',
      preferredTime: '',
      message: '',
      consent: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    setServerError(null);
    try {
      await api.post('/leads', values);
      setSuccess(true);
      reset();
    } catch (err) {
      setServerError(
        err instanceof ApiError ? err.message : 'Something went wrong. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Seo
        title="Book a Free Consultation"
        description="Request a free consultation about your visa and immigration options. Tell us your plans and our team will contact you about the next available appointment."
        path="/consultation"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Book Consultation', path: '/consultation' },
        ])}
      />

      <section className="relative overflow-hidden bg-navy-950 py-14 md:py-20">
        <div className="absolute inset-0">
          <SmartImage
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=60"
            alt=""
            seed="consultation"
            className="h-full w-full opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/60" />
        </div>
        <div className="container-page relative max-w-3xl">
          <p className="eyebrow mb-4 text-gold-300">
            <span className="h-px w-6 bg-current" aria-hidden="true" />
            Free consultation
          </p>
          <h1 className="heading-xl text-white">Let’s talk about your plans</h1>
          <p className="mt-5 text-base leading-relaxed text-navy-100 md:text-lg">
            Share a few details and our team will contact you about the next available appointment.
            Your first consultation is free and there is no obligation.
          </p>
        </div>
      </section>

      <Section className="!py-12">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7">
            {success ? (
              <div className="card p-8 text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-display text-2xl font-bold text-navy-950">
                  Request received
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-ink-600 md:text-base">
                  Thank you. Your consultation request has been received. Our team will contact you
                  regarding the next available appointment.
                </p>
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <ButtonLink to="/visa-services" variant="outline">
                    Explore services
                  </ButtonLink>
                  <Button onClick={() => setSuccess(false)} variant="primary">
                    Book another consultation
                  </Button>
                </div>
                <p className="mt-6 text-xs text-ink-500">
                  This acknowledgement does not constitute immigration advice and does not guarantee
                  any visa outcome.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="card p-6 sm:p-8" noValidate>
                <h2 className="font-display text-xl font-bold text-navy-950">
                  Consultation request
                </h2>
                <p className="mt-1 text-sm text-ink-500">All fields marked * are required.</p>

                {serverError && (
                  <div className="mt-5">
                    <FormAlert type="error">{serverError}</FormAlert>
                  </div>
                )}

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Full name"
                    autoComplete="name"
                    placeholder="Your full name"
                    wrapperClassName="sm:col-span-2"
                    error={errors.name?.message}
                    {...register('name')}
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+00 000 000 0000"
                    error={errors.phone?.message}
                    {...register('phone')}
                  />
                  <Input
                    label="Email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    error={errors.email?.message}
                    {...register('email')}
                  />
                  <Select
                    label="Country"
                    placeholder="Select country"
                    options={DESTINATIONS.map((d) => ({ value: d, label: d }))}
                    error={errors.country?.message}
                    {...register('country')}
                  />
                  <Select
                    label="Visa type"
                    placeholder="Select visa type"
                    options={VISA_TYPES.map((v) => ({ value: v, label: v }))}
                    error={errors.visaType?.message}
                    {...register('visaType')}
                  />
                  <Input
                    label="Preferred date"
                    type="date"
                    error={errors.preferredDate?.message}
                    {...register('preferredDate')}
                  />
                  <Select
                    label="Preferred time"
                    placeholder="Select a time slot"
                    options={TIME_SLOTS.map((t) => ({ value: t, label: t }))}
                    error={errors.preferredTime?.message}
                    {...register('preferredTime')}
                  />
                  <Textarea
                    label="Message"
                    placeholder="Tell us a little about your plans — destination, purpose and timeline."
                    wrapperClassName="sm:col-span-2"
                    error={errors.message?.message}
                    {...register('message')}
                  />
                  <div className="sm:col-span-2">
                    <Checkbox
                      label="I consent to FlyNest Overseas Consultancy storing these details to respond to my enquiry, as described in the Privacy Policy."
                      error={errors.consent?.message}
                      {...register('consent')}
                    />
                  </div>
                </div>

                <div className="mt-7 flex flex-col items-start gap-4 border-t border-ink-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="flex items-start gap-2 text-xs text-ink-500">
                    <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    Submitting a request does not guarantee an appointment time or any visa outcome.
                  </p>
                  <Button type="submit" variant="gold" disabled={submitting}>
                    {submitting ? <LoadingButton label="Sending…" /> : 'Request consultation'}
                    {!submitting && <CalendarCheck className="h-4 w-4" aria-hidden="true" />}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-5">
            <div className="card p-6">
              <h2 className="font-display text-lg font-bold text-navy-950">What to expect</h2>
              <ol className="mt-4 space-y-4">
                {[
                  ['We review your request', 'A consultant reviews the details you submitted.'],
                  ['We contact you', 'We reach out by phone or email to confirm a slot.'],
                  ['Free consultation', '30–45 minutes covering your options and next steps.'],
                  ['You decide', 'No pressure, no obligation to continue with us.'],
                ].map(([title, text], i) => (
                  <li key={title} className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-navy-950 text-xs font-bold text-gold-400">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-navy-950">{title}</p>
                      <p className="mt-0.5 text-sm text-ink-600">{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="card mt-6 p-6">
              <h2 className="font-display text-lg font-bold text-navy-950">Prefer to talk now?</h2>
              <div className="mt-4 space-y-3">
                <a
                  href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 rounded-xl border border-ink-100 p-3.5 text-sm text-ink-700 transition-colors hover:border-royal-200 hover:bg-royal-50/40"
                >
                  <Phone className="h-4 w-4 text-royal-600" aria-hidden="true" />
                  {COMPANY.phone}
                </a>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-3 rounded-xl border border-ink-100 p-3.5 text-sm text-ink-700 transition-colors hover:border-royal-200 hover:bg-royal-50/40"
                >
                  <Mail className="h-4 w-4 text-royal-600" aria-hidden="true" />
                  {COMPANY.email}
                </a>
                <a
                  href={`https://wa.me/${COMPANY.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello, I would like to book a consultation.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl bg-emerald-600 p-3.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
