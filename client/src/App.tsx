import { Suspense, lazy, Component, type ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import PublicLayout from '@/components/layout/PublicLayout';
import { CardsSkeleton, ErrorState } from '@/components/ui/States';

/* Public pages (code-split) */
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const VisaServices = lazy(() => import('@/pages/VisaServices'));
const VisaLanding = lazy(() => import('@/pages/VisaLanding'));
const Countries = lazy(() => import('@/pages/Countries'));
const CountryDetail = lazy(() => import('@/pages/CountryDetail'));
const Eligibility = lazy(() => import('@/pages/Eligibility'));
const Consultation = lazy(() => import('@/pages/Consultation'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPostPage = lazy(() => import('@/pages/BlogPost'));
const FaqPage = lazy(() => import('@/pages/FaqPage'));
const Contact = lazy(() => import('@/pages/Contact'));
const LegalPage = lazy(() => import('@/pages/legal/LegalPage'));
const NotFound = lazy(() => import('@/pages/NotFound'));

/* Admin */
const AdminLayout = lazy(() => import('@/layouts/AdminLayout'));
const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const AdminLeads = lazy(() => import('@/pages/admin/AdminLeads'));
const AdminContent = lazy(() => import('@/pages/admin/AdminContent'));
const AdminBlog = lazy(() => import('@/pages/admin/AdminBlog'));

function PageFallback() {
  return (
    <div className="container-page py-16">
      <CardsSkeleton count={3} />
    </div>
  );
}

/** Catches unexpected render errors so users never see a blank screen. */
class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="container-page py-24">
          <ErrorState
            message="Something went wrong while rendering this page. Please reload or go back to the homepage."
            onRetry={() => window.location.reload()}
          />
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          {/* Public site */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/visa-services" element={<VisaServices />} />
            <Route path="/visa/:slug" element={<VisaLanding />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/countries/:slug" element={<CountryDetail />} />
            <Route path="/eligibility" element={<Eligibility />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/faqs" element={<FaqPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal/:doc" element={<LegalPage />} />

            {/* Clean URL aliases */}
            <Route path="/privacy-policy" element={<Navigate to="/legal/privacy" replace />} />
            <Route path="/terms" element={<Navigate to="/legal/terms" replace />} />
            <Route path="/disclaimer" element={<Navigate to="/legal/disclaimer" replace />} />

            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin dashboard */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="blog" element={<AdminBlog />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
