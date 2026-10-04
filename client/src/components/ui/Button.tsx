import { Link } from 'react-router-dom';
import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils';

type Variant = 'primary' | 'gold' | 'outline' | 'ghost' | 'light' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary:
    'bg-navy-900 text-white hover:bg-navy-800 shadow-soft hover:shadow-card border border-transparent',
  gold: 'bg-gold-gradient text-navy-950 hover:brightness-105 shadow-soft border border-transparent font-semibold',
  outline:
    'border border-navy-900/25 bg-transparent text-navy-900 hover:border-navy-900 hover:bg-navy-900 hover:text-white',
  ghost: 'text-navy-900 hover:bg-navy-50 border border-transparent',
  light:
    'bg-white/10 text-white border border-white/30 hover:bg-white hover:text-navy-950 backdrop-blur-sm',
  danger: 'bg-red-600 text-white hover:bg-red-700 border border-transparent',
};

const sizes: Record<Size, string> = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60';

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  to,
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: CommonProps & {
  to?: string;
  href?: string;
} & { onClick?: () => void }) {
  const cls = cn(base, variants[variant], sizes[size], className);
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href || '#'} className={cls} {...rest}>
      {children}
    </a>
  );
}
