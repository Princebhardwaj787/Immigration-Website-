import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  FileCheck2,
  ClipboardList,
  ListOrdered,
  Compass,
  Info,
  Target,
} from 'lucide-react';
import Seo, { breadcrumbLd } from '@/components/ui/Seo';
import { Section, SectionHeading } from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { getCountryBySlug } from '@/data/countries';

const DISCLAIMER =
  'Requirements can change at any time. The information on this page is general and should be verified with the relevant government or consular authority before you apply.';

export default function CountryDetail() {
  const { slug = '' } = useParams();
  const country = getCountryBySlug(slug);

  if (!country) return <Navigate to="/countries" replace />;

  return (
    <>
      <Seo
        title={country ? `${country.name} Visa Information` : 'Country Guide'}
        description={
          country?.tagline ||
          `Visa categories, general documents and application steps for ${slug}.`
        }
        path={`/countries/${slug}`}
        image={country?.image}
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Countries', path: '/countries' },
          { name: country?.name || slug, path: `/countries/${slug}` },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 py-14 md:py-20">
        <div className="container-page relative">
          <Link
            to="/countries"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-navy-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All countries
          </Link>

          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-3 text-gold-300">
                <span className="h-px w-6 bg-current" aria-hidden="true" />
                Country guide
              </p>
              <h1 className="heading-xl text-white">{country.name}</h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy-100 md:text-lg">
                {country.tagline}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ButtonLink to="/consultation" variant="gold">
                  Ask about {country.name}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink to="/eligibility" variant="light">
                  Check Visa Options
                </ButtonLink>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="glass rounded-2xl p-5">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gold-300">
                  Visa categories available
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {country.visaCategories.map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview + purposes */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="heading-lg">Overview</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-600">{country.overview}</p>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-royal-100 bg-royal-50/60 p-4 text-sm leading-relaxed text-ink-700">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-royal-600" aria-hidden="true" />
              <p>{DISCLAIMER}</p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="card p-6">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-navy-950">
                <Target className="h-5 w-5 text-gold-600" aria-hidden="true" />
                Popular purposes
              </h2>
              <ul className="mt-4 space-y-2.5">
                {country.popularPurposes.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-sm text-ink-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-royal-500" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Eligibility */}
      {country.eligibilityOverview && (
        <Section className="bg-ink-50/60">
          <SectionHeading
            eyebrow="Eligibility"
            title="General eligibility overview"
            description="Indicative factors that are typically considered — not a determination of your eligibility."
          />
          <div className="mx-auto max-w-3xl">
            <div className="card p-6 sm:p-8">
              <p className="whitespace-pre-line text-sm leading-relaxed text-ink-700 md:text-base">
                {country.eligibilityOverview}
              </p>
            </div>
          </div>
        </Section>
      )}

      {/* Documents + process */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="flex items-center gap-2 heading-md">
              <FileCheck2 className="h-5 w-5 text-royal-600" aria-hidden="true" />
              Documents usually required
            </h2>
            <ul className="mt-5 space-y-3">
              {country.documents.map((doc) => (
                <li
                  key={doc}
                  className="flex items-start gap-3 rounded-xl border border-ink-100 bg-white p-3.5 text-sm text-ink-700 shadow-soft"
                >
                  <ClipboardList className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                  {doc}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-ink-500">
              General checklist — requirements vary by destination and individual circumstances.
            </p>
          </div>

          <div>
            <h2 className="flex items-center gap-2 heading-md">
              <ListOrdered className="h-5 w-5 text-royal-600" aria-hidden="true" />
              Application process
            </h2>
            <ol className="mt-5 space-y-4">
              {country.processSteps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-navy-950 text-xs font-bold text-gold-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <Reveal delay={i * 0.05} className="flex-1">
                    <div>
                      <h3 className="text-sm font-semibold text-navy-950">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-600">{step.detail}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="!pt-0">
        <div className="flex flex-col items-center gap-5 rounded-3xl bg-cta-gradient p-8 text-center md:p-10">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-gold-300">
            <Compass className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2 className="font-display text-2xl font-bold text-white">
            Planning a move to {country.name}?
          </h2>
          <p className="max-w-xl text-sm text-navy-100">
            Book a free consultation and we will walk you through the realistic pathways,
            documents and timelines for your situation.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/consultation" variant="gold">
              Book Consultation
            </ButtonLink>
            <Link
              to="/eligibility"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white hover:text-navy-950"
            >
              Check Visa Options
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}