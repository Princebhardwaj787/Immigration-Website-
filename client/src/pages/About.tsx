import { Link } from 'react-router-dom';
import { Target, Eye, Users, ShieldCheck, Globe2, FileCheck2, ArrowRight, Info } from 'lucide-react';
import Seo, { breadcrumbLd } from '@/components/ui/Seo';
import { Section, SectionHeading } from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import SmartImage from '@/components/ui/SmartImage';
import { ButtonLink } from '@/components/ui/Button';
import { COMPANY } from '@/data/company';

const PLACEHOLDER_NOTE =
  'Placeholder content: company statistics, licences, certifications and team details will be added here once verified company information is available.';

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Honest advice',
    text: 'We tell you what is realistic for your profile — including when a pathway is unlikely to work.',
  },
  {
    icon: FileCheck2,
    title: 'Document discipline',
    text: 'Checklists, reviews and consistency checks so nothing routine is missed.',
  },
  {
    icon: Users,
    title: 'Human communication',
    text: 'Plain-language updates at every stage. No jargon, no radio silence.',
  },
  {
    icon: Globe2,
    title: 'Independent & private',
    text: 'A private consultancy, not affiliated with any government. Your data stays confidential.',
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
          <h1 className="heading-xl text-white">Clarity in a process that rarely offers any</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-navy-100 md:text-lg">
            {COMPANY.name} is an immigration and overseas consultancy. We help students,
            professionals, business owners, families and tourists understand which visa category
            fits their plan — and prepare complete, honest applications.
          </p>
        </div>
      </section>

      {/* Mission & vision */}
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              icon: Target,
              title: 'Our mission',
              text: 'To make the immigration process understandable and manageable — giving every client a clear plan, an accurate document checklist and realistic expectations about their application.',
            },
            {
              icon: Eye,
              title: 'Our vision',
              text: 'A consultancy industry where people are advised honestly, charged transparently, and never sold guarantees that no one can deliver.',
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="card h-full p-7">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-950 text-gold-400">
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h2 className="mt-5 heading-md">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-600 md:text-base">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Why clients choose us */}
      <Section className="bg-ink-50/60">
        <SectionHeading
          eyebrow="Why clients choose us"
          title="A transparent process, start to finish"
          description="You will always know what stage your file is in, what we need from you, and what happens next."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.07}>
              <div className="card h-full p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-royal-50 text-royal-700">
                  <v.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-navy-950">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Placeholder facts band */}
      <Section>
        <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-soft md:p-10">
          <div className="flex items-start gap-3 rounded-2xl border border-royal-100 bg-royal-50/60 p-4 text-sm text-ink-700">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-royal-600" aria-hidden="true" />
            <p>{PLACEHOLDER_NOTE}</p>
          </div>

          <div className="mt-8 grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Years of experience', value: '—' },
              { label: 'Countries served', value: '10+' },
              { label: 'Visa categories', value: '6' },
              { label: 'Client satisfaction', value: 'Placeholder' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-extrabold text-navy-950">{stat.value}</p>
                <p className="mt-1 text-sm text-ink-500">{stat.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-ink-500">
            Licences, certifications, awards and office locations will be listed here once verified
            company information is supplied.
          </p>
        </div>
      </Section>

      {/* Team */}
      <Section className="bg-ink-50/60">
        <SectionHeading
          eyebrow="Our team"
          title="People behind your file"
          description="Placeholder profiles — real team members, roles and photographs will replace these before launch."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: 'Placeholder Name', role: 'Immigration Consultant' },
            { name: 'Placeholder Name', role: 'Documentation Specialist' },
            { name: 'Placeholder Name', role: 'Admissions & Student Services' },
          ].map((member, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="card overflow-hidden text-center">
                <SmartImage
                  src=""
                  alt={`${member.role} placeholder portrait`}
                  seed={`team-${i}`}
                  className="h-44 w-full"
                />
                <div className="p-5">
                  <h3 className="font-display text-base font-bold text-navy-950">{member.name}</h3>
                  <p className="mt-1 text-sm text-royal-700">{member.role}</p>
                  <p className="mt-3 text-xs text-ink-500">
                    Placeholder profile — replace with real team details.
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
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
              Book Free Consultation
            </ButtonLink>
            <Link
              to="/visa-services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white hover:text-navy-950"
            >
              View services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
