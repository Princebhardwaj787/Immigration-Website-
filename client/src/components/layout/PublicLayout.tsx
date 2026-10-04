import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ContactDock from './ContactDock';

/** Restores scroll position on route change (unless a hash is present). */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ScrollManager />
      <Navbar />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {/* Clearance so the contact dock never covers footer content:
          bottom bar on mobile, floating pills on sm+ (which sit ~7.5rem tall). */}
      <div className="h-[4.75rem] shrink-0 sm:h-[8.5rem]" aria-hidden="true" />
      <ContactDock />
    </div>
  );
}
