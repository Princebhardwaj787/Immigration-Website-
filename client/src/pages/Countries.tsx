import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowUpRight, Globe2 } from 'lucide-react';
import Seo, { breadcrumbLd } from '@/components/ui/Seo';
import { Section } from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import SmartImage from '@/components/ui/SmartImage';
import { EmptyState } from '@/components/ui/States';
import { COUNTRIES } from '@/data/countries';

export default function Countries() {
  const [query, setQuery] = useState('');

  const countries = COUNTRIES.filter((c) =>
    `${c.name} ${c.tagline || ''} ${(c.visaCategories || []).join(' ')}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  return (
    <>
      <Seo
        title="Countries We Cover"
        description="Explore visa categories, general requirements and application steps for Canada, Australia, the UK, USA, Germany, New Zealand, France, Ireland, the UAE and Singapore."
        path="/countries"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Countries', path: '/countries' },
        ])}
      />

      <section className="relative overflow-hidden bg-navy-950 py-14 md:py-20">
        <div className="absolute inset-0">
          <SmartImage
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1600&q=60"
            alt=""
            seed="countries-hero"
            className="h-full w-full opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/60" />
        </div>

        <div className="container-page relative max-w-3xl">
          <p className="eyebrow mb-4 text-gold-300">
            <span className="h-px w-6 bg-current" aria-hidden="true" />
            Destinations
          </p>
          <h1 className="heading-xl text-white">Explore countries and their visa routes</h1>
          <p className="mt-5 text-base leading-relaxed text-navy-100 md:text-lg">
            Each country page gives a general overview of visa categories, typical documents and
            the usual application sequence — with a reminder to verify current requirements with
            the official authority.
          </p>

          <div className="relative mt-7 max-w-md">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search countries or visa types…"
              aria-label="Search countries"
              className="w-full rounded-xl border border-white/20 bg-white/10 py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-navy-200 backdrop-blur-sm focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
            />
          </div>
        </div>
      </section>

      <Section>
        {countries.length === 0 ? (
          <EmptyState message={`No countries match “${query}”.`} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {countries.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 0.07}>
                <article className="card card-hover group relative flex h-full flex-col overflow-hidden">
                  <SmartImage
                    src={c.image}
                    alt={`${c.name} landscape`}
                    seed={c.slug}
                    className="h-48 w-full"
                    imgClassName="transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2">
                      <Globe2 className="h-4 w-4 text-gold-600" aria-hidden="true" />
                      <h2 className="text-lg font-bold text-navy-950">{c.name}</h2>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{c.tagline}</p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {(c.visaCategories || []).slice(0, 4).map((cat) => (
                        <span
                          key={cat}
                          className="rounded-full bg-navy-50 px-2.5 py-1 text-[11px] font-medium text-navy-800"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-5">
                      <Link
                        to={`/countries/${c.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal-700 after:absolute after:inset-0"
                      >
                        View country guide
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
          <strong>Important:</strong> country information on this website is general and provided
          for orientation only. Immigration rules, visa requirements and processing times change
          frequently — always verify current requirements with the relevant government or
          consular authority before applying.
        </div>
      </Section>
    </>
  );
}