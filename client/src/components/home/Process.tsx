import {
  MessagesSquare,
  UserSearch,
  Globe2,
  FolderCheck,
  FilePenLine,
  Send,
  RefreshCw,
  Flag,
} from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';

const STEPS = [
  {
    n: '01',
    icon: MessagesSquare,
    title: 'Initial Consultation',
    text: 'We discuss your goals, background, timeline and budget — and outline realistic pathways.',
  },
  {
    n: '02',
    icon: UserSearch,
    title: 'Profile Assessment',
    text: 'Your education, experience and finances are mapped against general requirements.',
  },
  {
    n: '03',
    icon: Globe2,
    title: 'Country & Visa Selection',
    text: 'We shortlist the destinations and visa categories that fit your plan best.',
  },
  {
    n: '04',
    icon: FolderCheck,
    title: 'Documentation',
    text: 'You receive a tailored checklist and we review every document before it goes in.',
  },
  {
    n: '05',
    icon: FilePenLine,
    title: 'Application Preparation',
    text: 'Forms, cover letters and supporting statements are drafted and reviewed with you.',
  },
  {
    n: '06',
    icon: Send,
    title: 'Submission',
    text: 'The application is filed with the correct authority, with fees and biometrics tracked.',
  },
  {
    n: '07',
    icon: RefreshCw,
    title: 'Follow-up',
    text: 'We monitor for requests for further information and prepare you for any interview.',
  },
  {
    n: '08',
    icon: Flag,
    title: 'Decision & Next Steps',
    text: 'We walk you through the outcome and the practical steps that follow it.',
  },
];

export default function Process() {
  return (
    <Section id="process" className="bg-ink-50/60">
      <SectionHeading
        eyebrow="How it works"
        title="Eight steps from first call to final decision"
        description="A transparent, documented process — you always know which stage you are in and what is needed next."
      />

      <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Connecting line (desktop) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-royal-300 to-transparent lg:block"
        />

        {STEPS.map((step, i) => (
          <li
            key={step.n}
            className="relative h-full rounded-2xl border border-ink-100 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-royal-200 hover:shadow-card"
          >
            <Reveal delay={(i % 4) * 0.08}>
              <div className="flex items-center gap-3">
                <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-950 text-gold-400 shadow-soft">
                  <step.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-display text-2xl font-extrabold text-royal-100">{step.n}</span>
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-navy-950">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>

      <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-ink-500">
        Processing times and decisions are controlled by the relevant authorities. This outline
        describes our advisory process — it does not imply or guarantee any visa outcome.
      </p>
    </Section>
  );
}
