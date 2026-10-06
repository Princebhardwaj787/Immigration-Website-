import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle2, Facebook, Instagram, Linkedin } from 'lucide-react';
import Seo, { breadcrumbLd } from '@/components/ui/Seo';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Checkbox } from '@/components/ui/Field';
import { FormAlert, LoadingButton } from '@/components/ui/States';
import { api, ApiError } from '@/services/api';
import { VISA_TYPES, DESTINATIONS } from '@/data/site';
import { COMPANY } from '@/data/company';

const schema = z.object({
  name: z.string().trim().min(2, 'Enter your full name.'),
  email: z.string().trim().email('Enter a valid email address.'),
  phone: z.string().trim().min(5, 'Enter a valid phone number.').max(40),
  service: z.string().trim().min(1, 'Select a service.'),
  destination: z.string().trim().min(1, 'Select a destination.'),
  message: z.string().trim().min(5, 'Tell us how we can help.').max(3000),
  consent: z.boolean().refine((v) => v === true, {
    message: 'You must accept the privacy notice to continue.',
  }),
});

type FormValues = z.infer<typeof schema>;

export default function Contact() {
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
    defaultValues: { name: '', email: '', phone: '', service: '', destination: '', message: '', consent: false },
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    setServerError(null);
    try {
      await api.post('/contact', values);
      setSuccess(true);
      reset();
    } catch (err) {
      setServerError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappHref = `https://wa.me/${COMPANY.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello, I have a question about visa options.',
  )}`;

  return (
    <>
      <Seo
        title="Contact Us"
        description={`Contact ${COMPANY.name} — phone, email, WhatsApp, office address and contact form.`}
        path="/contact"
        jsonLd={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: `Contact ${COMPANY.name}`,
          },
        ]}
      />

      <section className="bg-navy-950 py-14 md:py-20">
        <div className="container-page max-w-3xl">
          <p className="eyebrow mb-4 text-gold-300">
            <span className="h-px w-6 bg-current" aria-hidden="true" />
            Contact
          </p>
          <h1 className="heading-xl text-white">Talk to our team</h1>
          <p className="mt-5 text-base leading-relaxed text-navy-100 md:text-lg">
            Questions about a visa category, documents or timelines? Reach out however suits you —
            and we will respond during business hours.
          </p>
        </div>
      </section>

      <Section className="!py-12">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Contact details */}
          <div className="lg:col-span-5">
            <div className="card p-6">
              <h2 className="font-display text-lg font-bold text-navy-950">Reach us directly</h2>
              <ul className="mt-5 space-y-4">
                <li className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-navy-50 text-navy-800">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Office</p>
                    <p className="text-sm text-ink-700">
                      {COMPANY.address.line1},<br />
                      {COMPANY.address.city}, {COMPANY.address.region} {COMPANY.address.postalCode},{' '}
                      {COMPANY.address.country}
                      <span className="ml-1 text-xs text-ink-400">(placeholder)</span>
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-navy-50 text-navy-800">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Phone</p>
                    <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="text-sm text-ink-700 hover:text-royal-700">
                      {COMPANY.phone}
                    </a>
                    <a href={`tel:${COMPANY.phone2.replace(/\s/g, '')}`} className="block text-sm text-ink-700 hover:text-royal-700 mt-1">
                      {COMPANY.phone2}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-navy-50 text-navy-800">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Email</p>
                    <a href={`mailto:${COMPANY.email}`} className="text-sm text-ink-700 hover:text-royal-700">
                      {COMPANY.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-navy-50 text-navy-800">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="w-full">
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Business hours</p>
                    <dl className="mt-1 space-y-1 text-sm text-ink-700">
                      {COMPANY.hours.map((h) => (
                        <div key={h.days} className="flex justify-between gap-4">
                          <dt>{h.days}</dt>
                          <dd className="text-ink-500">{h.time}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </li>
              </ul>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Chat with us on WhatsApp
              </a>

              <div className="mt-5 flex gap-2 border-t border-ink-100 pt-5">
                {[
                  { icon: Facebook, href: COMPANY.social.facebook, label: 'Facebook' },
                  { icon: Instagram, href: COMPANY.social.instagram, label: 'Instagram' },
                  { icon: Linkedin, href: COMPANY.social.linkedin, label: 'LinkedIn' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-ink-200 text-ink-500 hover:border-navy-900 hover:text-navy-900"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form + map */}
          <div className="lg:col-span-7">
            {success ? (
              <div className="card p-8 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-display text-xl font-bold text-navy-950">Message received</h2>
                <p className="mx-auto mt-3 max-w-md text-sm text-ink-600">
                  Thank you for contacting us. A member of our team will respond as soon as
                  possible during business hours.
                </p>
                <Button className="mt-6" onClick={() => setSuccess(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="card p-6 sm:p-8" noValidate>
                <h2 className="font-display text-xl font-bold text-navy-950">Send a message</h2>

                {serverError && (
                  <div className="mt-4">
                    <FormAlert type="error">{serverError}</FormAlert>
                  </div>
                )}

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Full Name"
                    autoComplete="name"
                    error={errors.name?.message}
                    {...register('name')}
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    autoComplete="tel"
                    error={errors.phone?.message}
                    {...register('phone')}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    autoComplete="email"
                    error={errors.email?.message}
                    {...register('email')}
                  />
                  <select
                    {...register('service')}
                    className="appearance-none w-full rounded-xl border border-ink-200 bg-white px-4 py-3 pr-10 text-sm text-ink-900 focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-500/30"
                    aria-invalid={errors.service ? 'true' : 'false'}
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {VISA_TYPES.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="mt-1.5 text-sm text-red-600" role="alert">
                      {errors.service.message}
                    </p>
                  )}
                  <select
                    {...register('destination')}
                    className="appearance-none w-full rounded-xl border border-ink-200 bg-white px-4 py-3 pr-10 text-sm text-ink-900 focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-500/30"
                    aria-invalid={errors.destination ? 'true' : 'false'}
                  >
                    <option value="" disabled>
                      Select a destination
                    </option>
                    {DESTINATIONS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  {errors.destination && (
                    <p className="mt-1.5 text-sm text-red-600" role="alert">
                      {errors.destination.message}
                    </p>
                  )}
                  <Textarea
                    label="Message"
                    placeholder="How can we help?"
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

                <div className="mt-6 flex justify-end border-t border-ink-100 pt-5">
                  <Button type="submit" variant="gold" disabled={submitting}>
                    {submitting ? <LoadingButton label="Sending…" /> : 'Submit Enquiry'}
                    {!submitting && <Send className="h-4 w-4" aria-hidden="true" />}
                  </Button>
                </div>
              </form>
            )}

            {/* Map */}
            <div className="card mt-6 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4">
                <h2 className="font-display text-base font-bold text-navy-950">Find our office</h2>
                <span className="rounded-full bg-ink-100 px-2.5 py-1 text-[11px] font-medium text-ink-500">
                  Placeholder location
                </span>
              </div>
              <div className="h-72 w-full border-t border-ink-100 bg-ink-100">
                <iframe
                  title="Office location map"
                  src={COMPANY.mapEmbed}
                  className="h-full w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
