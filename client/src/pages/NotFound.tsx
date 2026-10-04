import { Link, useNavigate } from 'react-router-dom';
import { Compass, ArrowLeft, Search } from 'lucide-react';
import Seo from '@/components/ui/Seo';
import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Seo title="Page Not Found" description="The page you are looking for does not exist." noindex />
      <section className="relative overflow-hidden bg-navy-950 py-20 md:py-28">
        <div
          aria-hidden="true"
          className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-royal-700/30 blur-3xl"
        />
        <div className="container-page relative text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white/10 text-gold-400">
            <Compass className="h-8 w-8" aria-hidden="true" />
          </span>
          <p className="mt-6 font-display text-6xl font-extrabold text-white/90 sm:text-7xl">404</p>
          <h1 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
            This page has moved — or never existed
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-navy-200">
            The link may be outdated. Try one of the options below, or search our guides.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink to="/" variant="gold">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to home
            </ButtonLink>
            <ButtonLink to="/blog" variant="light">
              <Search className="h-4 w-4" aria-hidden="true" />
              Browse guides
            </ButtonLink>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-xl border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white hover:text-navy-950"
            >
              Go back
            </button>
          </div>

          <nav aria-label="Quick links" className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-navy-300">
            <Link to="/visa-services" className="hover:text-gold-300">
              Visa Services
            </Link>
            <Link to="/countries" className="hover:text-gold-300">
              Countries
            </Link>
            <Link to="/eligibility" className="hover:text-gold-300">
              Eligibility Checker
            </Link>
            <Link to="/consultation" className="hover:text-gold-300">
              Book Consultation
            </Link>
            <Link to="/contact" className="hover:text-gold-300">
              Contact
            </Link>
          </nav>
        </div>
      </section>
    </>
  );
}
