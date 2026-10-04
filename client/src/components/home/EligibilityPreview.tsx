import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardCheck, ArrowRight, ChevronDown } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { DESTINATIONS, VISA_TYPES } from '@/data/site';

/**
 * Quick eligibility form on the homepage: captures destination + purpose and
 * hands off to the full 10-step checker with those values pre-filled.
 */
export default function EligibilityPreview() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [purpose, setPurpose] = useState('');

  const selectCls =
    'w-full appearance-none rounded-xl border border-ink-200 bg-white px-4 py-3.5 pr-10 text-sm text-ink-900 focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-500/30';

  const start = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/eligibility', { state: { destination, purpose } });
  };

  return (
    <Section id="eligibility" className="bg-gradient-to-br from-royal-50 via-white to-gold-50">
      <div className="mx-auto grid max-w-5xl gap-8 rounded-3xl border border-white bg-white/70 p-6 shadow-card backdrop-blur-sm sm:p-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow mb-3">
            <span className="h-px w-6 bg-current" aria-hidden="true" />
            Free eligibility check
          </p>
          <h2 className="heading-lg">Check your visa options in under two minutes</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-600">
            Answer a few questions about your profile and plans. We will show which visa categories
            may be relevant to you — with a clear reminder that final eligibility always depends on
            official requirements and your individual circumstances.
          </p>

          <ul className="mt-6 space-y-2.5 text-sm text-ink-700">
            <li className="flex items-start gap-2.5">
              <ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
              No obligation and no account required
            </li>
            <li className="flex items-start gap-2.5">
              <ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
              Instant informational result with a document checklist
            </li>
            <li className="flex items-start gap-2.5">
              <ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
              Optional follow-up with a consultant
            </li>
          </ul>
        </div>

        <form onSubmit={start} className="card p-6">
          <h3 className="font-display text-base font-bold text-navy-950">Quick start</h3>
          <p className="mt-1 text-sm text-ink-500">
            Pick two answers to pre-fill your eligibility check.
          </p>

          <div className="mt-5 space-y-4">
            <div>
              <label htmlFor="quick-destination" className="mb-1.5 block text-sm font-medium text-ink-800">
                Desired destination
              </label>
              <div className="relative">
                <select
                  id="quick-destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className={selectCls}
                >
                  <option value="">Select a country</option>
                  {DESTINATIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div>
              <label htmlFor="quick-purpose" className="mb-1.5 block text-sm font-medium text-ink-800">
                Purpose of travel
              </label>
              <div className="relative">
                <select
                  id="quick-purpose"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className={selectCls}
                >
                  <option value="">Select a purpose</option>
                  {VISA_TYPES.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
                  aria-hidden="true"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
            >
              Check my visa options
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>
    </Section>
  );
}
