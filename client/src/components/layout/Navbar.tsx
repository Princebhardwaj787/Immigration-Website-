import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { NAV_LINKS } from '@/data/site';
import { COMPANY } from '@/data/company';
import { ButtonLink } from '@/components/ui/Button';
import { cn } from '@/utils';

const TEL_HREF = `tel:${COMPANY.phone.replace(/[^\d+]/g, '')}`;
const WHATSAPP_HREF = `https://wa.me/${COMPANY.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
  `Hello ${COMPANY.name}, I would like to speak to someone about a visa enquiry.`,
)}`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-ink-100 bg-white/90 shadow-soft backdrop-blur-lg'
          : 'border-b border-transparent bg-white',
      )}
    >
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-2.5" aria-label={`${COMPANY.name} home`}>
          <img
            src="/logo-icon.jpg"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-xl object-cover shadow-soft transition-transform group-hover:scale-105"
          />
          <span className="leading-none">
            <span className="block font-display text-lg font-extrabold tracking-tight text-navy-950">
              {COMPANY.brandLine1}
            </span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500">
              {COMPANY.brandLine2}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-navy-50 text-navy-950'
                    : 'text-ink-600 hover:bg-ink-50 hover:text-navy-950',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${COMPANY.phone.replace(/[^\d+]/g, '')}`}
            className="hidden items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-medium text-ink-600 hover:text-navy-950 xl:flex"
          >
            <Phone className="h-4 w-4 text-gold-600" aria-hidden="true" />
            {COMPANY.phone}
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-lg bg-whatsapp px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-whatsapp-dark md:inline-flex"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </a>
          <ButtonLink to="/consultation" size="sm" className="hidden md:inline-flex">
            Book Consultation
          </ButtonLink>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center rounded-xl border border-ink-200 text-navy-950 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-ink-100 bg-white lg:hidden"
      >
        <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-xl px-4 py-3 text-base font-medium transition-colors',
                  isActive ? 'bg-navy-50 text-navy-950' : 'text-ink-700 hover:bg-ink-50',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <ButtonLink to="/consultation" className="mt-3 w-full" size="lg">
            Book Free Consultation
          </ButtonLink>

          {/* Direct contact: no form needed */}
          <div className="mt-3 grid grid-cols-2 gap-3">
            <a
              href={TEL_HREF}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-navy-900/25 px-4 py-3 text-sm font-semibold text-navy-950 transition-colors hover:border-navy-900 hover:bg-navy-950 hover:text-white"
            >
              <Phone className="h-4 w-4 text-gold-600" aria-hidden="true" />
              Call Now
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-whatsapp-dark"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
