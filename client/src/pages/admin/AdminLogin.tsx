import { useEffect, useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Seo from '@/components/ui/Seo';
import { COMPANY } from '@/data/company';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Field';
import { FormAlert, LoadingButton } from '@/components/ui/States';
import { api, ApiError } from '@/services/api';

const schema = z.object({
  email: z.string().trim().email('Enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

type FormValues = z.infer<typeof schema>;

export default function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [alreadyAuthed, setAlreadyAuthed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: 'onTouched' });

  // If a valid session already exists, skip the login screen.
  useEffect(() => {
    api
      .get('/auth/me')
      .then(() => setAlreadyAuthed(true))
      .catch(() => undefined)
      .finally(() => setSessionChecked(true));
  }, []);

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    setServerError(null);
    try {
      await api.post('/auth/login', values);
      navigate('/admin', { replace: true });
    } catch (err) {
      setServerError(err instanceof ApiError ? err.message : 'Unable to sign in right now.');
    } finally {
      setSubmitting(false);
    }
  };

  if (sessionChecked && alreadyAuthed) return <Navigate to="/admin" replace />;

  return (
    <>
      <Seo title="Admin Sign In" noindex />
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Brand panel */}
        <div className="relative hidden overflow-hidden bg-navy-950 p-12 lg:flex lg:flex-col lg:justify-between">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-royal-700/30 blur-3xl"
          />
          <Link to="/" className="relative flex items-center gap-2.5 text-white">
            <img
              src="/logo-icon.jpg"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-xl object-cover ring-1 ring-white/15"
            />
            <span className="font-display text-lg font-extrabold">{COMPANY.name}</span>
          </Link>

          <div className="relative">
            <p className="eyebrow mb-4 text-gold-300">
              <span className="h-px w-6 bg-current" aria-hidden="true" />
              Admin console
            </p>
            <h1 className="font-display text-3xl font-bold text-white">Lead & content management</h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-navy-200">
              Review consultation requests, track lead status, and manage services, countries, FAQs,
              testimonials and blog articles.
            </p>
          </div>

          <p className="relative text-xs text-navy-400">
            Authorised personnel only. All access is logged.
          </p>
        </div>

        {/* Form panel */}
        <div className="flex min-h-screen items-center justify-center bg-ink-50 px-4 py-10">
          <div className="w-full max-w-md">
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-navy-900"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to website
            </Link>

            <div className="card p-7 sm:p-8">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-950 text-gold-400">
                <Lock className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-display text-xl font-bold text-navy-950">Sign in</h2>
              <p className="mt-1 text-sm text-ink-500">Enter your administrator credentials.</p>

              {serverError && (
                <div className="mt-5">
                  <FormAlert type="error">{serverError}</FormAlert>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5" noValidate>
                <Input
                  label="Email"
                  type="email"
                  autoComplete="username"
                  placeholder="admin@example.com"
                  error={errors.email?.message}
                  {...register('email')}
                />

                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    error={errors.password?.message}
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-[38px] rounded-md p-1 text-ink-400 hover:text-ink-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? <LoadingButton label="Signing in…" /> : 'Sign in'}
                </Button>
              </form>
            </div>

            <p className="mt-6 text-center text-xs text-ink-400">
              Default credentials are set in <code className="font-mono">server/.env</code> — change
              them before deploying.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
