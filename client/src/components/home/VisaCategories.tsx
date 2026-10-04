import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import { CardsSkeleton, ErrorState } from '@/components/ui/States';
import { useFetch } from '@/hooks/useFetch';
import { getServiceIcon, visaPath } from '@/utils/icons';
import type { Service } from '@/services/api';

const FALLBACK: Service[] = [];

export default function VisaCategories() {
  const { data, loading, error, refetch } = useFetch<{ data: Service[] }>('/services');
  const services = data?.data ?? FALLBACK;

  return (
    <Section id="visa-categories" className="bg-ink-50/50">
      <SectionHeading
        eyebrow="Visa Services"
        title="Which path fits your plan?"
        description="Six core service categories covering the most common reasons people move, study and travel abroad."
      />

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
                <article className="card card-hover group relative flex h-full flex-col p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-navy-900 to-royal-700 text-white transition-transform group-hover:scale-105">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>

                  <h3 className="mt-5 text-lg font-bold text-navy-950">
                    <Link to={visaPath(service.slug)} className="after:absolute after:inset-0">
                      {service.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{service.summary}</p>

                  {service.benefits?.length > 0 && (
                    <ul className="mt-4 space-y-1.5">
                      {service.benefits.slice(0, 3).map((b) => (
                        <li key={b} className="flex items-start gap-2 text-xs text-ink-600">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto pt-5">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal-700 group-hover:text-royal-800">
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

      <p className="mt-10 text-center">
        <Link
          to="/visa-services"
          className="inline-flex items-center gap-2 font-semibold text-navy-900 underline-offset-4 hover:underline"
        >
          View all services in detail
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </p>
    </Section>
  );
}
