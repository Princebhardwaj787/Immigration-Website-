import { useParams, Navigate, Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import Seo, { breadcrumbLd } from '@/components/ui/Seo';
import { COMPANY } from '@/data/company';
import { Section } from '@/components/ui/Section';
import { LEGAL_DOCS } from '@/data/legal';

export default function LegalPage() {
  const { doc = '' } = useParams();
  const content = LEGAL_DOCS.find((d) => d.slug === doc);

  if (!content) return <Navigate to="/404" replace />;

  return (
    <>
      <Seo
        title={content.title}
        description={`${content.title} for ${COMPANY.name}.`}
        path={`/legal/${doc}`}
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: content.title, path: `/legal/${doc}` },
        ])}
      />

      <section className="bg-navy-950 py-12 md:py-16">
        <div className="container-page max-w-3xl">
          <p className="eyebrow mb-4 text-gold-300">
            <span className="h-px w-6 bg-current" aria-hidden="true" />
            Legal
          </p>
          <h1 className="heading-xl text-white">{content.title}</h1>
          <p className="mt-3 text-sm text-navy-300">{content.updated}</p>
        </div>
      </section>

      <Section className="!py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-royal-100 bg-royal-50/60 p-4 text-sm leading-relaxed text-ink-700">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-royal-600" aria-hidden="true" />
            <p>
              <strong>Placeholder document:</strong> review with a qualified professional for your
              jurisdiction before publishing.
            </p>
          </div>

          <p className="text-base leading-relaxed text-ink-700">{content.intro}</p>

          <div className="mt-8 space-y-8">
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-lg font-bold text-navy-950">{section.heading}</h2>
                <div className="mt-3 space-y-3">
                  {section.body.map((p, i) => (
                    <p key={i} className="text-sm leading-relaxed text-ink-600 md:text-base">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <nav aria-label="Other legal documents" className="mt-12 border-t border-ink-100 pt-8">
            <p className="text-sm font-semibold text-navy-950">Other legal documents</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {LEGAL_DOCS.filter((d) => d.slug !== doc).map((d) => (
                <Link
                  key={d.slug}
                  to={`/legal/${d.slug}`}
                  className="rounded-full border border-ink-200 px-4 py-2 text-sm text-ink-600 transition-colors hover:border-navy-900 hover:text-navy-900"
                >
                  {d.title}
                </Link>
              ))}
            </div>
          </nav>

          <p className="mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-royal-700 hover:underline"
            >
              Questions? Contact us
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </Section>
    </>
  );
}
