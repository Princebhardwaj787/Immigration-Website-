import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { STATS } from '@/data/site';
import Reveal from '@/components/ui/Reveal';

function useCountUp(target: number, start: boolean, duration = 1400): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - (1 - p) * (1 - p) * (1 - p);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return value;
}

function StatItem({
  value,
  suffix,
  label,
  start,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  start: boolean;
  index: number;
}) {
  const reduce = useReducedMotion();
  const n = useCountUp(value, start);
  return (
    <Reveal delay={index * 0.08}>
      <div className="text-center">
        <p
          className="font-display text-3xl font-extrabold text-white sm:text-4xl md:text-[2.75rem]"
          aria-label={`${value}${suffix} ${label}`}
        >
          {reduce ? `${value.toLocaleString('en-IN')}${suffix}` : `${n.toLocaleString('en-IN')}${suffix}`}
        </p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy-200 sm:text-sm">
          {label}
        </p>
      </div>
    </Reveal>
  );
}

/** Animated trust statistics band directly below the hero. */
export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStart(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section aria-label="Company statistics" className="relative overflow-hidden bg-navy-950">
      <div
        aria-hidden="true"
        className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-royal-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-gold-400/10 blur-3xl"
      />
      <div ref={ref} className="container-page relative grid grid-cols-2 gap-x-4 gap-y-10 py-12 md:py-16 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <StatItem key={s.label} value={s.value} suffix={s.suffix} label={s.label} start={start} index={i} />
        ))}
      </div>
    </section>
  );
}
