import { Link } from 'react-router-dom';
import { HelpCircle, ArrowRight } from 'lucide-react';
import Seo, { breadcrumbLd } from '@/components/ui/Seo';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Accordion, ErrorState, Skeleton } from '@/components/ui/States';
import { ButtonLink } from '@/components/ui/Button';
import { FAQS, FAQ_CATEGORIES } from '@/data/faqs';

export default function FaqPage() {
  const faqs = FAQS;

  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Answers to common questions about visa processing times, documents, costs, refusals and our consultancy services."
        path="/faqs"
        jsonLd={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'FAQs', path: '/faqs' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          },
        ]}
      />

      <section className="bg-navy-950 py-14 md:py-20">
        <div className="container-page max-w-3xl text-center">
          <p className="eyebrow mb-4 justify-center text-gold-300">
            <span className="h-px w-6 bg-current" aria-hidden="true" />
            FAQs
          </p>
          <h1 className="heading-xl text-white">Questions people actually ask</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-navy-100">
            Where the answer depends on your destination or circumstances, we say so — because that
            is the honest answer.
          </p>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="Search"
          title="Frequently asked questions"
          description="Type a keyword to filter the list, or browse everything below."
        />

        <div className="mx-auto max-w-3xl">
          <Accordion
            items={faqs.map((f) => ({
              id: f.question,
              question: f.question,
              answer: f.answer,
              category: f.category,
            }))}
            searchable
          />
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="flex flex-col items-center gap-5 rounded-3xl border border-ink-100 bg-white p-8 text-center shadow-soft md:p-10">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-950 text-gold-400">
            <HelpCircle className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2 className="heading-md">Still have a question?</h2>
          <p className="max-w-xl text-sm leading-relaxed text-ink-600">
            Every case is different. Send us your question or book a consultation and we will
            walk through it with you.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/consultation" variant="gold">
              Book Consultation
            </ButtonLink>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-navy-900/25 px-5 py-2.5 text-sm font-semibold text-navy-900 hover:bg-navy-900 hover:text-white"
            >
              Contact us
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
