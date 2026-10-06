import { useEffect, useRef, useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { COMPANY } from '@/data/company';
import { cn } from '@/utils';

/** Dial link: keeps the leading +, strips spaces/dashes. */
const TEL_HREF = `tel:${COMPANY.phone.replace(/[^\d+]/g, '')}`;
const TEL_HREF2 = `tel:${COMPANY.phone2.replace(/[^\d+]/g, '')}`;

/** WhatsApp deep link with a pre-filled message (opens the app directly). */
const WHATSAPP_HREF = `https://wa.me/${COMPANY.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
  `Hello ${COMPANY.name}, I would like to speak to someone about a visa enquiry.`,
)}`;

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-600 focus-visible:ring-offset-2 active:scale-[0.98]';

/**
 * Persistent one-tap contact dock — reach us by phone or WhatsApp without
 * filling in any form.
 *
 * - < 640px: fixed bottom action bar (thumb reach, safe-area aware).
 * - >= 640px: floating labelled pills, bottom-right.
 * - Auto-hides while a text field is focused so it never covers the keyboard
 *   or an active form input on mobile.
 */
export default function ContactDock() {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  // Hide the mobile bar while the user is typing (virtual keyboard would
  // otherwise sit on top of it, or it would cover the focused field).
  useEffect(() => {
    const isTextField = (el: EventTarget | null) =>
      el instanceof HTMLElement &&
      (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);

    const onFocusIn = (e: Event) => {
      if (isTextField(e.target)) setKeyboardOpen(true);
    };
    const onFocusOut = (e: FocusEvent) => {
      // Keep hidden when moving between fields — only return on blur to a
      // non-text element (avoids a flicker while tabbing through a form).
      if (!isTextField(e.relatedTarget)) setKeyboardOpen(false);
    };

    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    return () => {
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  // Keep hidden links out of the tab order while the bar is off-screen.
  useEffect(() => {
    if (barRef.current) barRef.current.inert = keyboardOpen;
  }, [keyboardOpen]);

  const whatsappLabel = `Chat with ${COMPANY.name} on WhatsApp`;
  const callLabel = `Call ${COMPANY.name} at ${COMPANY.phone} or ${COMPANY.phone2}`;

  return (
    <>
      {/* ---------- Mobile: fixed bottom action bar ---------- */}
      <div
        ref={barRef}
        className={cn(
          'fixed inset-x-0 bottom-0 z-40 border-t border-ink-200 bg-white/95 shadow-card backdrop-blur-md transition-transform duration-300 sm:hidden print:hidden',
          keyboardOpen && 'translate-y-full',
        )}
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <nav aria-label="Quick contact" className="grid grid-cols-3 gap-2.5 p-3">
          <a
            href={TEL_HREF}
            aria-label={`Call ${COMPANY.name} at ${COMPANY.phone}`}
            className={cn(
              base,
              'border border-navy-900/25 bg-white px-3 py-3.5 text-sm text-navy-950 hover:border-navy-900 hover:bg-navy-950 hover:text-white',
            )}
          >
            <Phone className="h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
            <span className="hidden sm:inline">{COMPANY.phone}</span>
          </a>
          <a
            href={TEL_HREF2}
            aria-label={`Call ${COMPANY.name} at ${COMPANY.phone2}`}
            className={cn(
              base,
              'border border-navy-900/25 bg-white px-3 py-3.5 text-sm text-navy-950 hover:border-navy-900 hover:bg-navy-950 hover:text-white',
            )}
          >
            <Phone className="h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
            <span className="hidden sm:inline">{COMPANY.phone2}</span>
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={whatsappLabel}
            className={cn(
              base,
              'bg-whatsapp px-3 py-3.5 text-sm text-white shadow-soft hover:bg-whatsapp-dark',
            )}
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            WhatsApp
          </a>
        </nav>
      </div>

      {/* ---------- Tablet & desktop: floating pills ---------- */}
      <div className="fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-3 sm:flex print:hidden">
        <a
          href={TEL_HREF}
          aria-label={callLabel}
          title={COMPANY.phone}
          className={cn(
            base,
            'bg-navy-950 px-4 py-3 text-sm text-white shadow-lift hover:bg-navy-800',
          )}
        >
          <Phone className="h-4 w-4 text-gold-400" aria-hidden="true" />
          {COMPANY.phone}
        </a>
        <a
          href={TEL_HREF2}
          aria-label={`Call ${COMPANY.name} at ${COMPANY.phone2}`}
          title={COMPANY.phone2}
          className={cn(
            base,
            'bg-navy-950 px-4 py-3 text-sm text-white shadow-lift hover:bg-navy-800',
          )}
        >
          <Phone className="h-4 w-4 text-gold-400" aria-hidden="true" />
          {COMPANY.phone2}
        </a>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={whatsappLabel}
          className={cn(
            base,
            'bg-whatsapp px-4 py-3 text-sm text-white shadow-lift hover:bg-whatsapp-dark',
          )}
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Chat on WhatsApp
        </a>
      </div>
    </>
  );
}
