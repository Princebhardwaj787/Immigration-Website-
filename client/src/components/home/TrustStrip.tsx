import {
  BadgeCheck,
  FileCheck2,
  MessagesSquare,
  Lock,
  Handshake,
  ReceiptText,
} from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';

const ITEMS = [
  {
    icon: MessagesSquare,
    title: 'First consultation',
    text: 'Understand your options before you commit to anything.',
  },
  {
    icon: ReceiptText,
    title: 'Transparent pricing',
    text: 'Clear scope and fees discussed up front — no surprises.',
  },
  {
    icon: FileCheck2,
    title: 'Checklist-driven process',
    text: 'Every case starts with a document checklist for your route.',
  },
  {
    icon: Handshake,
    title: 'Honest expectations',
    text: 'No “guaranteed visa” claims — ever. Just well-prepared files.',
  },
  {
    icon: Lock,
    title: 'Your data is protected',
    text: 'Details are used only to handle your enquiry.',
  },
  {
    icon: BadgeCheck,
    title: 'Independent guidance',
    text: 'A private consultancy — not affiliated with any government.',
  },
];

export default function TrustStrip() {
  return (
    <Section className="border-b border-ink-100 bg-white !py-10 md:!py-12">
      <h2 className="sr-only">
        Why clients trust FlyNest Overseas Consultancy
      </h2>
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
        {ITEMS.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.05}>
            <div className="flex flex-col items-center text-center">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-50 text-navy-800">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-3 text-sm font-semibold text-navy-950">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-500">{item.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
