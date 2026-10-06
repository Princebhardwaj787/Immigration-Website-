import { MessageCircle } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { COMPANY } from '@/data/company';

const WHATSAPP_HREF = `https://wa.me/${COMPANY.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
  `Hello ${COMPANY.name}, I would like to speak to someone about a visa enquiry.`,
)}`;

/**
 * Floating WhatsApp button — bottom-right, always accessible.
 * Respects prefers-reduced-motion.
 */
export default function FloatingWhatsApp() {
  const reduce = useReducedMotion();

  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${COMPANY.name} on WhatsApp`}
      className={`fixed bottom-6 right-6 z-[90] grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-lift transition-all duration-300
        hover:bg-whatsapp-dark hover:scale-105
        active:scale-95
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-500 focus-visible:ring-offset-2
        ${reduce ? '' : 'animate-[pulse_2s_ease-in-out_infinite]'}
      `}
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}