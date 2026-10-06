import { Link } from 'react-router-dom';
import { Target, Eye, Users, ShieldCheck, FileCheck2, ArrowRight, Globe2 } from 'lucide-react';
import Seo, { breadcrumbLd } from '@/components/ui/Seo';
import { Section, SectionHeading } from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import SmartImage from '@/components/ui/SmartImage';
import { ButtonLink } from '@/components/ui/Button';
import { COMPANY } from '@/data/company';

const TRUST_POINTS = [
  {
    icon: ShieldCheck,
    title: 'Experienced Consultants',
    text: 'Our team has guided thousands of applicants through study, work, business and immigration pathways.',
  },
  {
    icon: FileCheck2,
    title: 'Transparent Guidance',
    text: 'Clear fees, realistic timelines and honest assessments — no hidden costs or false promises.',
  },
  {
    icon: Users,
    title: 'Personalised Solutions',
    text: 'Every client receives a tailored checklist and strategy based on their unique profile and goals.',
  },
  {
    icon: Globe2,
    title: 'End-to-End Support',
    text: 'From first consultation to post-decision guidance, we stay with you at every step.',
  },
];

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        description={`Learn about ${COMPANY.name} — an immigration and overseas consultancy helping students, professionals and families plan applications with clarity and care.`}
        path="/about"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 py-16 md:py-24">
        <div className="absolute inset-0">
          <SmartImage
            src="/office.jpg"
            alt=""
            seed="about-hero"
            className="h-full w-full opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/60" />
        </div>

        <div className="container-page relative max-w-4xl">
          <p className="eyebrow mb-4 text-gold-300">
            <span className="h-px w-6 bg-current" aria-hidden="true" />
            About us
          </p>
          <h1 className="heading-xl text-white">Guiding You Every Step of the Way</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-navy-100 md:text-lg">
            {COMPANY.name} is an immigration and overseas consultancy. We help students,
            professionals, business owners, families and tourists understand which visa category
            fits their plan — and prepare complete, honest applications.
          </p>
        </div>
      </section>

      {/* Two-column: image left, content right */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <div className="relative h-72 md:h-96 overflow-hidden rounded-3xl">
                <SmartImage
                  src="/office.jpg"
                  alt="FlyNest Overseas Consultancy office"
                  seed="about-team"
                  className="h-full w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col justify-center">
            <Reveal delay={0.1}>
              <p className="eyebrow mb-4 text-gold-300">
                <span className="h-px w-6 bg-current" aria-hidden="true" />
                ABOUT US
              </p>
              <h2 className="heading-lg">Guiding You Every Step of the Way</h2>
              <p className="mt-5 text-base leading-relaxed text-ink-600 md:text-lg">
                {COMPANY.name} was founded on a simple principle: the immigration process should be
                transparent, manageable and human. We don't sell packages — we build plans around
                your education, experience, budget and timeline.
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-600">
                Our consultants have direct experience with the visa systems of Canada, Australia,
                the UK, the USA, Germany, New Zealand, the UAE and the Schengen area. We combine
                that knowledge with a disciplined, checklist-driven process so nothing is missed.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {TRUST_POINTS.map((tp, i) => (
                  <div key={tp.title} className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-50 text-gold-700">
                      <tp.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-navy-950">{tp.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-600">{tp.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink to="/consultation" variant="gold" size="lg">
                  Learn More
                </ButtonLink>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-navy-900/25 px-5 py-2.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-navy-950 hover:text-white"
                >
                  View Services
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-cta-gradient p-8 text-center md:flex-row md:p-10 md:text-left">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">Start with a conversation</h2>
            <p className="mt-2 max-w-xl text-sm text-navy-100">
              Tell us where you want to go — we will explain the realistic pathways, documents and
              timelines involved.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/consultation" variant="gold">
              Book a Consultation
            </ButtonLink>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white hover:text-navy-950"
            >
              View Services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}