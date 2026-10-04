import type { ReactNode } from 'react';
import { cn } from '@/utils';

export function Section({
  children,
  className,
  id,
  as: Tag = 'section',
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: 'section' | 'div' | 'article';
}) {
  return (
    <Tag id={id} className={cn('section-pad', className)}>
      <div className="container-page">{children}</div>
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
  light = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={cn(
        'mb-10 md:mb-14',
        align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl',
        className,
      )}
    >
      {eyebrow && (
        <p className={cn('eyebrow mb-3', light && 'text-gold-300')}>
          <span className="h-px w-6 bg-current" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2 className={cn(light ? 'text-white' : '', 'heading-lg')}>{title}</h2>
      {description && (
        <p className={cn('mt-4 text-base leading-relaxed md:text-lg', light ? 'text-navy-100' : 'text-ink-600')}>
          {description}
        </p>
      )}
    </div>
  );
}
