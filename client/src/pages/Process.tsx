import { Link } from 'react-router-dom';
import { ArrowRight, CalendarCheck } from 'lucide-react';
import Seo, { breadcrumbLd } from '@/components/ui/Seo';
import { Section, SectionHeading } from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { PROCESS_STEPS } from '@/components/home/Process';
import { DISCLAIMER_TEXT } from '@/data/site';

/** Standalone "How it works" page — full six-step walkthrough. */
export default function ProcessPage() {
  return (
    <>
      <Seo
        title="Our Process"
        description="Consultation, profile assessment, documentation, application, follow-up, decision and guidance — how FlyNest Overseas Consultancy works with you."
        path="/process"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Process', path: '/process' },
        ])}
      />

      <section className="bg-navy-950 py-14 md:py-20">
        <div className="container-page max-w-3xl">
          <p className="eyebrow mb-4 text-gold-300">
            <span className="h-px w-6 bg-current" aria-hidden="true" />
            How it works
          </p>
          <h1 className="heading-xl text-white">A clear process, from first call to final guidance</h1>
          <p className="mt-5 text-base leading-relaxed text-navy-100 md:text-lg">
            Six documented steps. You always know which stage your file is in, what we need from
            you, and what happens next.
          </p>
        </div>
      </section>

      <Section>
        <ol className="mx-auto max-w-3xl space-y-0">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.n} delay={Math.min(i * 0.05, 0.2)}>
              <li className="relative flex gap-5 pb-10 last:pb-0 sm:gap-7">
                {/* Vertical connector */}
                {i < PROCESS_STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-6 top-14 h-[calc(100%-3.5rem)] w-px bg-gradient-to-b from-royal-200 to-ink-100 sm:left-7"
                  />
                )}
                <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy-950 text-gold-400 shadow-soft sm:h-14 sm:w-14">
                  <step.icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                </span>
                <div className="card flex-1 p-5 sm:p-6">
                  <p className="font-display text-sm font-extrabold tracking-widest text-royal-300">
                    STEP {step.n}
                  </p>
                  <h2 className="mt-1 font-display text-lg font-bold text-navy-950 sm:text-xl">
                    {step.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600 sm:text-base">{step.text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-ink-500">
          {DISCLAIMER_TEXT}
        </p>
      </Section>

      <Section className="bg-ink-50/60 !pt-0">
        <SectionHeading
          eyebrow="Next step"
          title="Start with a conversation"
          description="Tell us where you want to go — we will explain the realistic pathways, documents and timelines involved."
        />
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink to="/consultation" variant="gold" size="lg">
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Book a Consultation
          </ButtonLink>
          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-navy-900/25 px-7 py-3.5 text-base font-semibold text-navy-900 transition-colors hover:bg-navy-950 hover:text-white"
          >
            Explore Services
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Section>
    </>
  );
}
