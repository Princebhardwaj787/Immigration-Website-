import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Accordion, ErrorState, Skeleton } from '@/components/ui/States';
import { useFetch } from '@/hooks/useFetch';
import type { Faq } from '@/services/api';

export default function FaqSection() {
  const { data, loading, error, refetch } = useFetch<{ data: Faq[] }>('/faqs');
  const faqs = (data?.data ?? []).slice(0, 6);

  return (
    <Section id="faqs">
      <SectionHeading
        eyebrow="FAQs"
        title="Straight answers to common questions"
        description="Where requirements vary, we say so — because they do."
      />

      <div className="mx-auto max-w-3xl">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : (
          <Accordion items={faqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer, category: f.category }))} />
        )}
      </div>

      <p className="mt-8 text-center">
        <Link
          to="/faqs"
          className="inline-flex items-center gap-2 font-semibold text-navy-900 underline-offset-4 hover:underline"
        >
          See all frequently asked questions
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </p>
    </Section>
  );
}
