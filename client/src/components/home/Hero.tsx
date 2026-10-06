import { useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ShieldCheck, ChevronDown, Phone, MessageCircle, Compass } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import SmartImage from '@/components/ui/SmartImage';
import { DESTINATIONS, VISA_TYPES } from '@/data/site';
import { COMPANY } from '@/data/company';

const PURPOSE_TO_PATH: Record<string, string> = {
  'Study Visa': '/visa/study',
  'Work Visa': '/visa/work',
  'Business Visa': '/visa/business',
  'Tourist Visa': '/visa/tourist',
  'Dependent Visa': '/visa/dependent',
  'PR / Immigration': '/visa/pr',
};

const COUNTRY_TO_SLUG: Record<string, string> = {
  Canada: 'canada',
  Australia: 'australia',
  'United Kingdom': 'uk',
  USA: 'usa',
  Germany: 'germany',
  'New Zealand': 'new-zealand',
  France: 'france',
  Ireland: 'ireland',
  'Dubai / UAE': 'uae',
  Singapore: 'singapore',
};

export default function Hero() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const [destination, setDestination] = useState('');
  const [purpose, setPurpose] = useState('');

  const selectCls =
    'w-full appearance-none rounded-xl border border-white/25 bg-white/10 px-4 py-3 pr-10 text-sm text-white backdrop-blur-sm placeholder:text-navy-200 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40';

  const options = useMemo(
    () => ({
      destinations: DESTINATIONS.map((d) => ({ value: d, label: d })),
      purposes: VISA_TYPES.map((v) => ({ value: v, label: v })),
    }),
    [],
  );

  const explore = () => {
    if (purpose) return navigate(PURPOSE_TO_PATH[purpose] || '/services');
    if (destination && COUNTRY_TO_SLUG[destination]) {
      return navigate(`/countries/${COUNTRY_TO_SLUG[destination]}`);
    }
    navigate('/services');
  };

  return (
    <section className="relative overflow-hidden bg-navy-950" aria-labelledby="hero-heading">
      {/* Background image + dark gradient overlay */}
      <div className="absolute inset-0">
        <motion.div
          initial={false}
          animate={reduce ? undefined : { scale: [1, 1.08] }}
          transition={{ duration: 12, ease: 'easeOut' }}
          className="h-full w-full"
        >
          <SmartImage
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=60"
            alt=""
            seed="hero"
            loading="eager"
            className="h-full w-full opacity-40"
            imgClassName="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/60" />
        <div
          aria-hidden="true"
          className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-royal-500/30 blur-3xl"
        />
      </div>

      <div className="container-page relative grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-8 lg:py-28">
        {/* Copy */}
        <div className="lg:col-span-7">
          <motion.p
            initial={reduce ? undefined : { opacity: 0, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-5 text-gold-300"
          >
            <span className="h-px w-6 bg-current" aria-hidden="true" />
            Your Global Journey Starts Here
          </motion.p>

          <motion.h1
            id="hero-heading"
            initial={reduce ? undefined : { opacity: 0, y: 18 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl md:text-6xl"
          >
            Turn Your Overseas Dreams{' '}
            <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
              Into Reality
            </span>
          </motion.h1>

          <motion.p
            initial={reduce ? undefined : { opacity: 0, y: 18 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-navy-100 md:text-lg"
          >
            Professional guidance for study, work, business, tourism and immigration opportunities
            around the world.
          </motion.p>

          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 18 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <ButtonLink to="/consultation" variant="gold" size="lg" className="group">
              Book a Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink to="/services" variant="light" size="lg">
              <Compass className="h-4 w-4" aria-hidden="true" />
              Explore Services
            </ButtonLink>
          </motion.div>

          {/* Direct contact — no form, straight to a call or WhatsApp chat */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 18 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-5 flex flex-wrap items-center gap-3"
          >
            <span className="text-sm text-navy-200">Prefer to talk now?</span>
            <a
              href={`tel:${COMPANY.phone.replace(/[^\d+]/g, '')}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-gold-400 hover:bg-white/20"
            >
              <Phone className="h-4 w-4 text-gold-300" aria-hidden="true" />
              {COMPANY.phone}
            </a>
            <a
              href={`tel:${COMPANY.phone2.replace(/[^\d+]/g, '')}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-gold-400 hover:bg-white/20"
            >
              <Phone className="h-4 w-4 text-gold-300" aria-hidden="true" />
              {COMPANY.phone2}
            </a>
            <a
              href={`https://wa.me/${COMPANY.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
                `Hello ${COMPANY.name}, I would like to speak to someone about a visa enquiry.`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-whatsapp px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-whatsapp-dark"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </motion.div>

          <motion.ul
            initial={reduce ? undefined : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-navy-200"
          >
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-gold-400" aria-hidden="true" />
              Honest advice — no guarantees promised
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-gold-400" aria-hidden="true" />
              Personal consultation
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-gold-400" aria-hidden="true" />
              Checklist for every case
            </li>
          </motion.ul>
        </div>

        {/* Quick selector card */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 24 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="lg:col-span-5"
        >
          <div className="glass rounded-3xl p-6 shadow-lift sm:p-8">
            <h2 className="font-display text-xl font-bold text-white">Start with two questions</h2>
            <p className="mt-1.5 text-sm text-navy-200">
              Where do you want to go, and what are you planning to do there?
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="hero-destination" className="mb-1.5 block text-sm font-medium text-navy-100">
                  Destination
                </label>
                <div className="relative">
                  <select
                    id="hero-destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className={selectCls}
                  >
                    <option value="" className="text-ink-900">
                      Select a country
                    </option>
                    {options.destinations.map((o) => (
                      <option key={o.value} value={o.value} className="text-ink-900">
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-200"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="hero-purpose" className="mb-1.5 block text-sm font-medium text-navy-100">
                  Purpose of travel
                </label>
                <div className="relative">
                  <select
                    id="hero-purpose"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className={selectCls}
                  >
                    <option value="" className="text-ink-900">
                      Select a visa category
                    </option>
                    {options.purposes.map((o) => (
                      <option key={o.value} value={o.value} className="text-ink-900">
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-200"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={explore}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold-gradient px-5 py-3.5 text-sm font-semibold text-navy-950 transition-all hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
              >
                Explore my options
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <p className="text-center text-xs text-navy-300">
                Or run the full{' '}
                <Link to="/eligibility" className="font-medium text-gold-300 underline-offset-2 hover:underline">
                  visa eligibility check
                </Link>
                .
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div aria-hidden="true" className="relative -mb-px h-10 bg-navy-950">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d="M0,40 L1440,40 L1440,20 C1080,40 360,0 0,20 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}
