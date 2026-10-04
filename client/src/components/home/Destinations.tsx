import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import SmartImage from '@/components/ui/SmartImage';
import { CardsSkeleton, ErrorState } from '@/components/ui/States';
import { useFetch } from '@/hooks/useFetch';
import type { CountryListItem } from '@/services/api';

export default function Destinations() {
  const { data, loading, error, refetch } = useFetch<{ data: CountryListItem[] }>('/countries');
  const countries = data?.data ?? [];

  return (
    <Section id="destinations">
      <SectionHeading
        eyebrow="Popular Destinations"
        title="Where our clients are heading"
        description="Explore the visa categories, general requirements and application steps for each destination."
      />

      {loading ? (
        <CardsSkeleton count={6} />
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {countries.slice(0, 6).map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 0.07}>
              <Link
                to={`/countries/${c.slug}`}
                className="group relative block h-64 overflow-hidden rounded-3xl shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <SmartImage
                  src={c.image}
                  alt={`${c.name} cityscape`}
                  seed={c.slug}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-white">{c.name}</h3>
                      <p className="mt-1 line-clamp-1 text-sm text-navy-200">{c.tagline}</p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {c.visaCategories.slice(0, 3).map((cat) => (
                          <span
                            key={cat}
                            className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm"
                          >
                            {cat}
                          </span>
                        ))}
                        {c.visaCategories.length > 3 && (
                          <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                            +{c.visaCategories.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold-gradient text-navy-950 opacity-0 transition-opacity group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link
          to="/countries"
          className="inline-flex items-center gap-2 rounded-xl border border-navy-900/25 px-6 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-900 hover:text-white"
        >
          Explore all destinations
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </Section>
  );
}
