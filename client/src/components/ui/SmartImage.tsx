import { useState } from 'react';
import { cn } from '@/utils';

type Props = {
  src?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** Used for the graceful fallback gradient when the image fails to load. */
  seed?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
};

const PALETTE = [
  'from-navy-800 to-royal-700',
  'from-navy-900 to-royal-800',
  'from-royal-700 to-navy-700',
  'from-navy-700 to-gold-700',
  'from-navy-800 to-navy-600',
];

function hashSeed(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h % PALETTE.length;
}

/**
 * Image with lazy loading and a branded gradient fallback (used when an
 * external image URL is unavailable), so cards never render broken.
 */
export default function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  seed,
  loading = 'lazy',
  sizes,
}: Props) {
  const [failed, setFailed] = useState(false);
  const showFallback = !src || failed;

  return (
    <div className={cn('relative overflow-hidden bg-navy-900', className)}>
      {showFallback ? (
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-0 bg-gradient-to-br',
            PALETTE[hashSeed(seed || alt || 'x')],
          )}
        >
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_30%_20%,white_1px,transparent_1px)] [background-size:28px_28px]" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          sizes={sizes}
          onError={() => setFailed(true)}
          className={cn('h-full w-full object-cover', imgClassName)}
        />
      )}
    </div>
  );
}
