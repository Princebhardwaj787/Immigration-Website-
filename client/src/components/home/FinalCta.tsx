import { ArrowRight, MessageCircle, CalendarCheck } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import SmartImage from '@/components/ui/SmartImage';
import { COMPANY } from '@/data/company';

/** Final homepage CTA band with an international backdrop. */
export default function FinalCta() {
  const whatsappHref = `https://wa.me/${COMPANY.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello, I would like to ask about visa options.',
  )}`;

  return (
    <section className="relative overflow-hidden bg-navy-950 py-16 md:py-24" aria-labelledby="final-cta">
      <div className="absolute inset-0">
        <SmartImage
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=60"
          alt=""
          seed="final-cta"
          className="h-full w-full opacity-30"
          imgClassName="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/60" />
      </div>
      <div
        aria-hidden="true"
        className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gold-400/20 blur-3xl"
      />

      <div className="container-page relative">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-4 justify-center text-gold-300">
              <span className="h-px w-6 bg-current" aria-hidden="true" />
              Ready when you are
            </p>
            <h2 id="final-cta" className="heading-lg text-white">
              Ready to Begin Your Journey?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-100 md:text-lg">
              Talk to our experts and discover the right path for your overseas plans.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink to="/consultation" variant="gold" size="lg" className="group">
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Book a Consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href={whatsappHref} variant="light" size="lg">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Talk to Us
              </ButtonLink>
            </div>

            <p className="mt-6 text-xs text-navy-200">
              No guarantees are promised or implied — only transparent, thorough preparation.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
