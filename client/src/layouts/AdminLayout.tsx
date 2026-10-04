import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate, Link, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Newspaper,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';
import { api, ApiError } from '@/services/api';
import { COMPANY } from '@/data/company';
import { cn } from '@/utils';

type AuthState = 'loading' | 'authed' | 'guest';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/leads', label: 'Leads', icon: Users, end: false },
  { to: '/admin/content', label: 'Services & Content', icon: FolderKanban, end: false },
  { to: '/admin/blog', label: 'Blog', icon: Newspaper, end: false },
];

export default function AdminLayout() {
  const [status, setStatus] = useState<AuthState>('loading');
  const [admin, setAdmin] = useState<{ name: string; email: string } | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const res = await api.get<{ data: { name: string; email: string } }>('/auth/me');
      setAdmin(res.data);
      setStatus('authed');
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) setStatus('guest');
      else setStatus('guest');
    }
  };

  useEffect(() => {
    void checkAuth();
  }, []);

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      setStatus('guest');
      navigate('/admin/login');
    }
  };

  if (status === 'loading') {
    return (
      <div className="grid min-h-screen place-items-center bg-ink-50">
        <p className="text-sm text-ink-500">Checking session…</p>
      </div>
    );
  }

  if (status === 'guest') {
    return <Navigate to="/admin/login" replace />;
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <img
          src="/logo-icon.jpg"
          alt=""
          width={36}
          height={36}
          className="h-9 w-9 rounded-xl object-cover ring-1 ring-white/15"
        />
        <div className="leading-tight">
          <p className="font-display text-sm font-extrabold text-white">{COMPANY.brandLine1}</p>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-navy-300">
            Admin console
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3" aria-label="Admin navigation">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
                isActive ? 'bg-white/10 text-white' : 'text-navy-200 hover:bg-white/5 hover:text-white',
              )
            }
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-1 border-t border-white/10 p-3">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-navy-200 hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          View website
        </Link>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-navy-200 hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Sign out
        </button>
        <p className="px-3.5 pb-1 pt-3 text-xs text-navy-400">{admin?.email}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-ink-50">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 bg-navy-950 lg:block">{sidebar}</aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-navy-950/60"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-64 bg-navy-950">{sidebar}</aside>
        </div>
      )}

      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-ink-100 bg-white/90 px-4 backdrop-blur sm:px-6">
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="grid h-9 w-9 place-items-center rounded-lg border border-ink-200 lg:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          <p className="hidden text-sm text-ink-500 sm:block">
            Manage leads, services, content and articles.
          </p>
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-navy-950 text-xs font-bold text-gold-400">
              {(admin?.name || 'A').charAt(0).toUpperCase()}
            </span>
            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-ink-200 px-3 py-1.5 text-xs font-semibold text-ink-600 hover:bg-ink-50"
            >
              Sign out
            </button>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet context={{ admin, refreshAuth: checkAuth }} />
        </main>
      </div>
    </div>
  );
}
