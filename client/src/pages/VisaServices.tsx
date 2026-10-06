import { Link } from 'react-router-dom';
import { ArrowRight, Check, FileSearch } from 'lucide-react';
import Seo, { breadcrumbLd } from '@/components/ui/Seo';
import { Section } from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import { CardsSkeleton, ErrorState } from '@/components/ui/States';
import { ButtonLink } from '@/components/ui/Button';
import { COMPANY } from '@/data/company';
import { useFetch } from '@/hooks/useFetch';
import { getServiceIcon, visaPath } from '@/utils/icons';
import type { Service } from '@/services/api';

export default function VisaServices() {
  const { data, loading, error, refetch } = useFetch<{ data: Service[] }>('/services');
  const services = data?.data ?? [];

  return (
    <>
      <Seo
        title="Visa Services"
        description="Study, work, business, tourist, dependent and permanent residency visa assistance — explore each service in detail."
        path="/visa-services"
        jsonLd={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Visa Services', path: '/visa-services' },
          ]),
          ...services.map((s) => ({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: s.title,
            serviceType: s.title,
            provider: { '@type': 'Organization', name: COMPANY.name },
          })),
        ]}
      />

      <section className="bg-navy-950 py-14 md:py-20">
        <div className="container-page max-w-3xl">
          <p className="eyebrow mb-4 text-gold-300">
            <span className="h-px w-6 bg-current" aria-hidden="true" />
            Visa Services
          </p>
          <h1 className="heading-xl text-white">Services built around how applications actually work</h1>
          <p className="mt-5 text-base leading-relaxed text-navy-100 md:text-lg">
            Each category below links to a detailed breakdown: what is included, what documents are
            usually involved, and what the process looks like from consultation to decision.
          </p>
        </div>
      </section>

      <Section>
        {loading ? (
          <CardsSkeleton count={6} />
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = getServiceIcon(service.icon);
              return (
                <Reveal key={service.slug} delay={(i % 3) * 0.07}>
                  <article className="card card-hover relative flex h-full flex-col p-7">
                    <div className="flex items-start justify-between">
                      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-navy-900 to-royal-700 text-white">
                        <Icon className="h-7 w-7" aria-hidden="true" />
                      </span>
                      <span className="rounded-full bg-gold-50 px-3 py-1 text-xs font-semibold text-gold-700">
                        0{i + 1}
                      </span>
                      <span
                        className="absolute top-2 right-2 rounded-xl bg-navy-800 text-xs font-semibold text-gold-300 px-2.5 py-0.5"
                      >
                        Consultation
                      </span>
                    </div>

                    <h2 className="mt-5 text-xl font-bold text-navy-950">
                      <Link to={visaPath(service.slug)} className="after:absolute after:inset-0">
                        {service.title}
                      </Link>
                    </h2>
                    {service.tagline && <p className="mt-1 text-sm text-royal-700">{service.tagline}</p>}
                    <p className="mt-3 text-sm leading-relaxed text-ink-600">{service.summary}</p>

                    {service.benefits?.length > 0 && (
                      <ul className="mt-4 space-y-1.5">
                        {service.benefits.slice(0, 4).map((b) => (
                          <li key={b} className="flex items-start gap-2 text-xs text-ink-600">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-auto pt-6">
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal-700">
                        Learn more
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}
      </Section>

      <Section className="bg-ink-50/60 !pt-0">
        <div className="flex flex-col items-center gap-5 rounded-3xl border border-ink-100 bg-white p-8 text-center shadow-soft md:p-10">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-950 text-gold-400">
            <FileSearch className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2 className="heading-md">Not sure which service you need?</h2>
          <p className="max-w-xl text-sm leading-relaxed text-ink-600">
            Run the eligibility checker for an informational shortlist of visa categories, or book a
            free consultation and talk it through with a consultant.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/eligibility" variant="primary">
              Check Visa Options
            </ButtonLink>
            <ButtonLink to="/consultation" variant="outline">
              Book Consultation
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
