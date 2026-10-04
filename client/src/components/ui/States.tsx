import { useState } from 'react';
import { ChevronDown, Search, Inbox, AlertTriangle, Loader2, X } from 'lucide-react';
import { cn } from '@/utils';

/* ----------------------------- Accordion ----------------------------- */

export function Accordion({
  items,
  searchable = false,
  emptyMessage = 'No questions match your search.',
}: {
  items: { id: string; question: string; answer: string; category?: string }[];
  searchable?: boolean;
  emptyMessage?: string;
}) {
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  const filtered = query.trim()
    ? items.filter((i) =>
        `${i.question} ${i.answer} ${i.category || ''}`.toLowerCase().includes(query.toLowerCase()),
      )
    : items;

  return (
    <div>
      {searchable && (
        <div className="relative mx-auto mb-8 max-w-xl">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions…"
            aria-label="Search frequently asked questions"
            className="w-full rounded-xl border border-ink-200 bg-white py-3.5 pl-12 pr-11 text-sm shadow-soft focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-500/30"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-ink-400 hover:bg-ink-100 hover:text-ink-700"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState message={emptyMessage} />
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => {
            const open = openId === item.id;
            return (
              <div
                key={item.id}
                className={cn(
                  'overflow-hidden rounded-2xl border transition-colors',
                  open ? 'border-royal-200 bg-royal-50/40' : 'border-ink-100 bg-white hover:border-ink-200',
                )}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenId(open ? null : item.id)}
                    className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left sm:px-6"
                  >
                    <span className="font-display text-base font-semibold text-navy-950 sm:text-lg">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        'mt-1 h-5 w-5 shrink-0 text-royal-600 transition-transform duration-300',
                        open && 'rotate-180',
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  className={cn(
                    'grid transition-all duration-300',
                    open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-ink-600 sm:px-6 sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ------------------------------ States ------------------------------- */

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-xl bg-ink-100', className)} aria-hidden="true" />;
}

export function CardsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card p-6">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <Skeleton className="mt-5 h-5 w-3/4" />
          <Skeleton className="mt-3 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-5/6" />
        </div>
      ))}
    </div>
  );
}

export function ErrorState({
  message = 'We could not load this content right now.',
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 px-6 py-10 text-center"
    >
      <AlertTriangle className="h-8 w-8 text-amber-600" aria-hidden="true" />
      <p className="mt-3 max-w-md text-sm text-ink-700">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-lg border border-amber-300 bg-white px-4 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-100"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ message = 'Nothing here yet.' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-ink-50/50 px-6 py-10 text-center">
      <Inbox className="h-7 w-7 text-ink-400" aria-hidden="true" />
      <p className="mt-3 text-sm text-ink-500">{message}</p>
    </div>
  );
}

export function LoadingButton({ label = 'Submitting…' }: { label?: string }) {
  return (
    <>
      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      {label}
    </>
  );
}

/** Inline success / error banner for forms. */
export function FormAlert({
  type,
  children,
}: {
  type: 'success' | 'error';
  children: React.ReactNode;
}) {
  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      className={cn(
        'flex items-start gap-3 rounded-xl border px-4 py-3 text-sm',
        type === 'success'
          ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
          : 'border-red-200 bg-red-50 text-red-700',
      )}
    >
      {type === 'success' ? (
        <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
          ✓
        </span>
      ) : (
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      )}
      <span>{children}</span>
    </div>
  );
}
