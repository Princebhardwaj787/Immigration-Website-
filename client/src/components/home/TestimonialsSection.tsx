import { Star, Quote, BadgeInfo } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import { CardsSkeleton, ErrorState } from '@/components/ui/States';
import { useFetch } from '@/hooks/useFetch';
import { initials } from '@/utils';
import type { Testimonial } from '@/services/api';

export default function TestimonialsSection() {
  const { data, loading, error, refetch } = useFetch<{ data: Testimonial[] }>('/testimonials');
  const items = data?.data ?? [];
  const anyDemo = items.some((t) => t.isDemo);

  return (
    <Section id="testimonials">
      <SectionHeading
        eyebrow="Client Reviews"
        title="What clients say about working with us"
        description="Reviews are published only with client consent."
      />

      {anyDemo && (
        <p className="mx-auto mb-8 flex max-w-2xl items-start justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-xs leading-relaxed text-amber-800">
          <BadgeInfo className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            <strong>Demo content:</strong> the reviews below are placeholders used during
            development and will be replaced with verified client reviews before launch.
          </span>
        </p>
      )}

      {loading ? (
        <CardsSkeleton count={3} />
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 6).map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 0.07}>
              <figure className="card relative flex h-full flex-col p-6">
                <Quote className="absolute right-5 top-5 h-8 w-8 text-royal-50" aria-hidden="true" />

                <div className="flex items-center gap-1" aria-label={`Rated ${t.rating} out of 5`}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={
                        s < t.rating
                          ? 'h-4 w-4 fill-gold-400 text-gold-400'
                          : 'h-4 w-4 text-ink-200'
                      }
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-700">
                  “{t.review}”
                </blockquote>

                <figcaption className="mt-5 flex items-center gap-3 border-t border-ink-100 pt-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-navy-800 to-royal-700 text-xs font-bold text-white">
                    {t.avatar ? (
                      <img src={t.avatar} alt="" className="h-full w-full rounded-full object-cover" />
                    ) : (
                      initials(t.name)
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-navy-950">{t.name}</span>
                    <span className="block truncate text-xs text-ink-500">
                      {[t.country, t.visaType].filter(Boolean).join(' · ')}
                      {t.isDemo ? ' · demo' : ''}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
