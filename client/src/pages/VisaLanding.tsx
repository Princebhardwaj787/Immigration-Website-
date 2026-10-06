import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, Check, FileText, Info, ClipboardList, ArrowLeft, Download } from 'lucide-react';
import Seo, { breadcrumbLd } from '@/components/ui/Seo';
import { Section, SectionHeading } from '@/components/ui/Section';
import { ErrorState, Skeleton } from '@/components/ui/States';
import { ButtonLink } from '@/components/ui/Button';
import { COMPANY } from '@/data/company';
import { useFetch } from '@/hooks/useFetch';
import { getServiceIcon, visaPath } from '@/utils/icons';
import { downloadChecklistPdf } from '@/utils/pdf';
import type { Service, Checklist } from '@/services/api';

const VALID_SLUGS = ['study', 'work', 'business', 'tourist', 'dependent', 'pr'];

export default function VisaLanding() {
  const { slug = '' } = useParams();
  const { data, loading, error, refetch } = useFetch<{ data: Service }>(
    `/services/${slugToServiceSlug(slug)}`,
    [slug],
  );
  const { data: checklistRes } = useFetch<{ data: Checklist }>(
    `/checklists/${slug === 'pr' ? 'pr' : slug}`,
    [slug],
  );
  const [pdfBusy, setPdfBusy] = useState(false);

  if (!VALID_SLUGS.includes(slug)) return <Navigate to="/visa-services" replace />;

  const service = data?.data;
  const checklist = checklistRes?.data;

  const download = async () => {
    if (!checklist) return;
    setPdfBusy(true);
    try {
      await downloadChecklistPdf(checklist, { purpose: service?.title });
    } finally {
      setPdfBusy(false);
    }
  };

  return (
    <>
      <Seo
        title={service ? `${service.title} Assistance` : 'Visa Service'}
        description={
          service?.summary ||
          `Professional ${slug} visa assistance: documentation, application guidance and process support.`
        }
        path={`/visa/${slug}`}
        jsonLd={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Visa Services', path: '/visa-services' },
            { name: service?.title || slug, path: `/visa/${slug}` },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service?.title || slug,
            serviceType: service?.title || slug,
            provider: { '@type': 'Organization', name: COMPANY.name },
          },
        ]}
      />

      {/* Hero */}
      <section className="bg-navy-950 py-14 md:py-20">
        <div className="container-page">
          <Link
            to="/visa-services"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-navy-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All services
          </Link>

          {loading ? (
            <>
              <Skeleton className="h-10 w-64 bg-white/10" />
              <Skeleton className="mt-4 h-5 w-full max-w-2xl bg-white/10" />
            </>
          ) : error ? (
            <ErrorState message={error} onRetry={refetch} />
          ) : service ? (
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-gradient text-navy-950">
                    {(() => {
                      const Icon = getServiceIcon(service.icon);
                      return <Icon className="h-7 w-7" aria-hidden="true" />;
                    })()}
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-gold-300">
                      {service.tagline || 'Visa service'}
                    </p>
                    <h1 className="heading-xl text-white">{service.title}</h1>
                  </div>
                </div>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-navy-100 md:text-lg">
                  {service.summary}
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink to="/consultation" variant="gold">
                    Book Consultation
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </ButtonLink>
                  <ButtonLink to="/eligibility" variant="light">
                    Check Visa Options
                  </ButtonLink>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Description + benefits */}
      {service && (
        <>
          <Section>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2 className="heading-lg">What this service includes</h2>
                <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-ink-600">
                  {service.description || service.summary}
                </p>

                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-royal-100 bg-royal-50/60 p-4 text-sm leading-relaxed text-ink-700">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-royal-600" aria-hidden="true" />
                  <p>
                    Outcomes are decided solely by the relevant institutions and authorities. We
                    prepare and advise — we do not promise approvals.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="card p-6">
                  <h2 className="font-display text-lg font-bold text-navy-950">Key benefits</h2>
                  <ul className="mt-4 space-y-3">
                    {service.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-ink-700">
                        <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                          <Check className="h-3 w-3" aria-hidden="true" />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Section>

          {/* Checklist */}
          {checklist && (
            <Section className="bg-ink-50/60">
              <SectionHeading
                eyebrow="Documents"
                title={`${checklist.label} document checklist`}
                description={checklist.note}
              />
              <div className="mx-auto max-w-3xl">
                <div className="card p-6 sm:p-8">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {checklist.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-xl border border-ink-100 bg-ink-50/50 p-3 text-sm text-ink-700"
                      >
                        <span className="mt-0.5 h-4 w-4 shrink-0 rounded border border-ink-300 bg-white" aria-hidden="true" />
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col items-center gap-3 border-t border-ink-100 pt-6 sm:flex-row sm:justify-between">
                    <p className="flex items-start gap-2 text-xs text-ink-500">
                      <ClipboardList className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      General checklist — requirements vary by destination and individual
                      circumstances.
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={download}
                        disabled={pdfBusy}
                        className="inline-flex items-center gap-2 rounded-xl border border-navy-900/25 px-4 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-900 hover:text-white disabled:opacity-60"
                      >
                        <Download className="h-4 w-4" aria-hidden="true" />
                        {pdfBusy ? 'Preparing…' : 'Download PDF'}
                      </button>
                      <Link
                        to={`/eligibility?purpose=${slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-royal-700 hover:text-royal-800"
                      >
                        <FileText className="h-4 w-4" aria-hidden="true" />
                        Get my checklist via the eligibility check
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          )}
        </>
      )}

      {/* Related services */}
      <Section>
        <SectionHeading eyebrow="Explore more" title="Other services" />
        <div className="grid gap-4 sm:grid-cols-3">
          {VALID_SLUGS.filter((s) => s !== slug).slice(0, 3).map((s) => (
            <Link
              key={s}
              to={visaPath(`${s}-visa`)}
              className="card card-hover flex items-center justify-between p-5 text-sm font-semibold text-navy-950"
            >
              {s === 'pr' ? 'Permanent Residency' : `${s.charAt(0).toUpperCase()}${s.slice(1)} Visa`}
              <ArrowRight className="h-4 w-4 text-royal-600" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

/** `/visa/pr` → service slug stored in the database. */
function slugToServiceSlug(slug: string): string {
  const map: Record<string, string> = {
    study: 'study-visa',
    work: 'work-visa',
    business: 'business-visa',
    tourist: 'tourist-visa',
    dependent: 'dependent-visa',
    pr: 'permanent-residency',
  };
  return map[slug] || slug;
}
