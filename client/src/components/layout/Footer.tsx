import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, MessageCircle, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { COMPANY } from '@/data/company';
import { DISCLAIMER_TEXT, NAV_LINKS, LEGAL_LINKS } from '@/data/site';

const serviceLinks = [
  { label: 'Study Visa', to: '/visa/study' },
  { label: 'Work Visa', to: '/visa/work' },
  { label: 'Tourist Visa', to: '/visa/tourist' },
  { label: 'Business Visa', to: '/visa/business' },
  { label: 'Immigration', to: '/visa/pr' },
  { label: 'Family Visa', to: '/visa/dependent' },
];

const socials = [
  { icon: Facebook, href: COMPANY.social.facebook, label: 'Facebook' },
  { icon: Instagram, href: COMPANY.social.instagram, label: 'Instagram' },
  { icon: Linkedin, href: COMPANY.social.linkedin, label: 'LinkedIn' },
  { icon: Youtube, href: COMPANY.social.youtube, label: 'YouTube' },
];

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">{title}</h2>
      <ul className="space-y-2.5 text-sm text-navy-200">{children}</ul>
    </div>
  );
}

export default function Footer() {
  const whatsappHref = `https://wa.me/${COMPANY.whatsapp.replace(/\D/g, '')}`;

  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 md:py-16 lg:grid-cols-4">
        {/* Company */}
        <div>
          <Link to="/" className="flex items-center gap-2.5" aria-label={`${COMPANY.name} home`}>
            <img
              src="/logo-icon.jpg"
              alt=""
              width={40}
              height={40}
              loading="lazy"
              className="h-10 w-10 rounded-xl object-cover ring-1 ring-white/15"
            />
            <span className="leading-none">
              <span className="block font-display text-lg font-extrabold text-white">{COMPANY.brandLine1}</span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-300">
                {COMPANY.brandLine2}
              </span>
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-navy-300">
            {COMPANY.tagline} — professional guidance for students, professionals, families and
            businesses planning their next move abroad.
          </p>
          <div className="mt-5 flex gap-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-navy-200 transition-colors hover:border-gold-400 hover:text-gold-400"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <Column title="Quick Links">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="transition-colors hover:text-gold-300">
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/consultation" className="transition-colors hover:text-gold-300">
              Book Consultation
            </Link>
          </li>
        </Column>

        {/* Services */}
        <Column title="Services">
          {serviceLinks.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="transition-colors hover:text-gold-300">
                {l.label}
              </Link>
            </li>
          ))}
        </Column>

        {/* Contact */}
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Contact</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
              <a href={`tel:${COMPANY.phone.replace(/[^\d+]/g, '')}`} className="text-navy-200 hover:text-white">
                {COMPANY.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
              <a href={`tel:${COMPANY.phone2.replace(/[^\d+]/g, '')}`} className="text-navy-200 hover:text-white">
                {COMPANY.phone2}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
              <a href={`mailto:${COMPANY.email}`} className="break-all text-navy-200 hover:text-white">
                {COMPANY.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
              <span className="text-navy-300">
                {COMPANY.address.line1}, {COMPANY.address.city} {COMPANY.address.postalCode}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
              <span className="text-navy-300">
                {COMPANY.hours.map((h) => `${h.days}: ${h.time}`).join(' · ')}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-200 hover:text-white"
              >
                WhatsApp: {COMPANY.whatsapp}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-white/10">
        <div className="container-page py-6">
          <p className="text-xs leading-relaxed text-navy-400">{DISCLAIMER_TEXT}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-navy-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {COMPANY.legalName}. All Rights Reserved.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-gold-300">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
