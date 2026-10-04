import { ClipboardList, Compass, Lock, Scale, Users, Route } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import SmartImage from '@/components/ui/SmartImage';

const FEATURES = [
  {
    icon: Compass,
    title: 'Profile-first advice',
    text: 'We start from your education, experience, budget and timeline — not from a package we want to sell.',
  },
  {
    icon: ClipboardList,
    title: 'Document checklists built for your case',
    text: 'Every engagement begins with a checklist tailored to your destination and visa category.',
  },
  {
    icon: Scale,
    title: 'Honest, compliant guidance',
    text: 'We explain realistic prospects and never promise approvals, admissions, jobs or PR.',
  },
  {
    icon: Users,
    title: 'One point of contact',
    text: 'A single consultant follows your file from first call to final submission and follow-up.',
  },
  {
    icon: Route,
    title: 'End-to-end process support',
    text: 'Consultation, assessment, application preparation, submission and follow-up — in one place.',
  },
  {
    icon: Lock,
    title: 'Privacy by default',
    text: 'Your documents and details are handled confidentially and used only for your application.',
  },
];

export default function WhyUs() {
  return (
    <Section className="bg-navy-950 text-white">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            light
            eyebrow="Why choose us"
            title="Immigration is a process — we make it a manageable one"
            description="Clear steps, clear documents, clear communication. You will always know where your application stands and what happens next."
          />

          <Reveal>
            <div className="relative mt-2 h-56 overflow-hidden rounded-3xl sm:h-72">
              <SmartImage
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=60"
                alt="Consultant reviewing application documents with a client"
                seed="why-us"
                className="h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
            </div>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 2) * 0.08}>
              <div className="glass h-full rounded-2xl p-5 transition-colors hover:border-gold-400/40">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-gradient text-navy-950">
                  <f.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-200">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
