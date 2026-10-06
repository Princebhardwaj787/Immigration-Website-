import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import { TESTIMONIALS } from '@/data/testimonials';

const AUTO_SLIDE_MS = 5000;
const SWIPE_THRESHOLD = 50;

export default function Testimonials() {
  const [items, setItems] = useState<typeof TESTIMONIALS>(TESTIMONIALS);
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [autoSlide, setAutoSlide] = useState(true);
  const timerRef = useRef<number>();

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }, [items.length]);

  const goTo = useCallback((i: number) => {
    setIndex(i);
  }, []);

  // Auto-slide
  useEffect(() => {
    if (!autoSlide) return;
    timerRef.current = window.setInterval(next, AUTO_SLIDE_MS);
    return () => window.clearInterval(timerRef.current);
  }, [autoSlide, next]);

  // Pause on hover/focus
  const onEnter = () => setAutoSlide(false);
  const onLeave = () => setAutoSlide(true);

  // Swipe handling
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setAutoSlide(false);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const dx = e.touches[0].clientX - touchStart;
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx > 0) prev();
      else next();
      setTouchStart(null);
    }
  };
  const onTouchEnd = () => {
    setTouchStart(null);
    setAutoSlide(true);
  };

  const current = items[index];

  return (
    <Section id="testimonials">
      <SectionHeading
        eyebrow="Client Reviews"
        title="What clients say about working with us"
        description="Reviews are published only with client consent."
      />

      <div className="relative max-w-4xl mx-auto" onMouseEnter={onEnter} onMouseLeave={onLeave} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        {/* Carousel viewport */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
            role="group"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
          >
            {items.map((t, i) => (
              <figure key={t.name} className="w-full flex-shrink-0 px-4 sm:px-6">
                <Reveal delay={i === index ? 0 : 0.1}>
                  <blockquote className="card h-full p-6 sm:p-8 relative">
                    <Quote className="absolute right-5 top-5 h-8 w-8 text-royal-50" aria-hidden="true" />

                    <div className="flex items-center gap-1 mb-4" aria-label={`Rated ${t.rating} out of 5`}>
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          className={
                            s < t.rating
                              ? 'h-5 w-5 fill-gold-400 text-gold-400'
                              : 'h-5 w-5 text-ink-200'
                          }
                          aria-hidden="true"
                        />
                      ))}
                    </div>

                    <p className="text-base leading-relaxed text-ink-700 mb-6">
                      "{t.review}"
                    </p>

                    <figcaption className="flex items-center gap-3 border-t border-ink-100 pt-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-navy-800 to-royal-700 text-xs font-bold text-white">
                        {t.avatar ? (
                          <img src={t.avatar} alt="" className="h-full w-full rounded-full object-cover" />
                        ) : (
                          t.name.charAt(0).toUpperCase()
                        )}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-navy-950">{t.name}</span>
                        <span className="block truncate text-xs text-ink-500">
                          {t.country} · {t.service}
                        </span>
                      </span>
                    </figcaption>
                  </blockquote>
                </Reveal>
              </figure>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous testimonial"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-12 grid h-11 w-11 place-items-center rounded-full bg-white shadow-card border border-ink-100 text-navy-950 hover:bg-ink-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-500"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next testimonial"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-12 grid h-11 w-11 place-items-center rounded-full bg-white shadow-card border border-ink-100 text-navy-950 hover:bg-ink-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-500"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 flex gap-2" role="tablist" aria-label="Testimonial indicators">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 w-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-500 ${
                i === index ? 'bg-gold-400 w-6' : 'bg-ink-300 hover:bg-ink-400'
              }`}
            />
          ))}
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-ink-500">
        Demo reviews shown above — replace with verified client reviews before launch.
      </p>
    </Section>
  );
}