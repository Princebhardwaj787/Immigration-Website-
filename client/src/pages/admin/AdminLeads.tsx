import { useEffect, useMemo, useState } from 'react';
import {
  Search,
  X,
  Trash2,
  Archive,
  ArchiveRestore,
  StickyNote,
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Filter,
} from 'lucide-react';
import Seo from '@/components/ui/Seo';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Field';
import { ErrorState, FormAlert, Skeleton } from '@/components/ui/States';
import { api, ApiError, type Lead } from '@/services/api';
import { cn, formatDate } from '@/utils';

interface Meta {
  visaTypes: string[];
  countries: string[];
  statuses: string[];
}

const STATUS_COLORS: Record<string, string> = {
  New: 'bg-royal-50 text-royal-700',
  Contacted: 'bg-amber-50 text-amber-700',
  'Consultation Scheduled': 'bg-violet-50 text-violet-700',
  'In Progress': 'bg-sky-50 text-sky-700',
  Completed: 'bg-emerald-50 text-emerald-700',
};

function useDebounced<T>(value: T, delay = 350): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function AdminLeads() {
  const [search, setSearch] = useState('');
  const [visaType, setVisaType] = useState('');
  const [country, setCountry] = useState('');
  const [status, setStatus] = useState('');
  const [archived, setArchived] = useState(false);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const debouncedSearch = useDebounced(search);

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (visaType) params.set('visaType', visaType);
    if (country) params.set('country', country);
    if (status) params.set('status', status);
    if (archived) params.set('archived', 'true');
    params.set('page', String(page));
    return params.toString();
  }, [debouncedSearch, visaType, country, status, archived, page]);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<{ data: Lead[]; pagination: { page: number; pages: number; total: number } }>(
        `/admin/leads?${query}`,
      );
      setLeads(res.data);
      setPagination(res.pagination);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not load leads.');
    } finally {
      setLoading(false);
    }
  };

  const loadMeta = async () => {
    try {
      const res = await api.get<{ data: Meta }>('/admin/leads/meta');
      setMeta(res.data);
    } catch {
      /* non-critical */
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    void loadMeta();
  }, []);

  useEffect(() => setPage(1), [debouncedSearch, visaType, country, status, archived]);

  const selected = leads.find((l) => l.id === selectedId) || null;

  const runAction = async (action: () => Promise<unknown>, refetch = true) => {
    setBusy(true);
    setActionError(null);
    try {
      await action();
      if (refetch) await load();
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : 'Action failed. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const updateStatus = (leadId: string, newStatus: string) =>
    runAction(() => api.patch(`/admin/leads/${leadId}/status`, { status: newStatus }));

  const addNote = () =>
    runAction(async () => {
      await api.post(`/admin/leads/${selectedId}/notes`, { body: note });
      setNote('');
    });

  const toggleArchive = (lead: Lead) =>
    runAction(() => api.patch(`/admin/leads/${lead.id}/archive`, { archived: !lead.archived }));

  const removeLead = (lead: Lead) => {
    if (!window.confirm(`Permanently delete the lead for ${lead.name}? This cannot be undone.`)) return;
    runAction(async () => {
      await api.del(`/admin/leads/${lead.id}`);
      setSelectedId(null);
    });
  };

  const hasFilters = Boolean(debouncedSearch || visaType || country || status);

  return (
    <>
      <Seo title="Manage Leads" noindex />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-950">Leads</h1>
          <p className="text-sm text-ink-500">
            {pagination.total} {archived ? 'archived ' : ''}record{pagination.total === 1 ? '' : 's'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          className="inline-flex items-center gap-2 rounded-xl border border-ink-200 px-4 py-2.5 text-sm font-semibold text-ink-700 hover:bg-ink-50 lg:hidden"
        >
          <Filter className="h-4 w-4" aria-hidden="true" />
          Filters
        </button>
      </div>

      {/* Filters */}
      <div className={cn('card mb-6 p-4', showFilters ? 'block' : 'hidden lg:block')}>
        <div className="grid gap-3 lg:grid-cols-4">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email or phone"
              aria-label="Search leads"
              className="w-full rounded-xl border border-ink-200 py-2.5 pl-10 pr-3 text-sm focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-500/30"
            />
          </div>

          <Select
            aria-label="Filter by visa type"
            placeholder="All visa types"
            options={(meta?.visaTypes ?? []).map((v) => ({ value: v, label: v }))}
            value={visaType}
            onChange={(e) => setVisaType(e.target.value)}
            wrapperClassName="[&>label]:sr-only"
          />
          <Select
            aria-label="Filter by country"
            placeholder="All countries"
            options={(meta?.countries ?? []).map((c) => ({ value: c, label: c }))}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            wrapperClassName="[&>label]:sr-only"
          />
          <Select
            aria-label="Filter by status"
            placeholder="All statuses"
            options={(meta?.statuses ?? []).map((s) => ({ value: s, label: s }))}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            wrapperClassName="[&>label]:sr-only"
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-600">
            <input
              type="checkbox"
              checked={archived}
              onChange={(e) => setArchived(e.target.checked)}
              className="h-4 w-4 rounded border-ink-300 text-royal-600 focus:ring-royal-500"
            />
            Show archived only
          </label>
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setVisaType('');
                setCountry('');
                setStatus('');
              }}
              className="text-sm font-semibold text-royal-700 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : leads.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-ink-50/50 px-6 py-14 text-center">
          <Inbox className="h-8 w-8 text-ink-300" aria-hidden="true" />
          <p className="mt-3 text-sm font-medium text-ink-600">
            {hasFilters ? 'No leads match your filters.' : 'No leads yet.'}
          </p>
          <p className="mt-1 text-xs text-ink-400">
            {hasFilters ? 'Try adjusting or clearing the filters.' : 'Form submissions will appear here.'}
          </p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-ink-50 text-xs uppercase tracking-wide text-ink-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Lead</th>
                  <th className="px-5 py-3 font-medium">Visa / Country</th>
                  <th className="px-5 py-3 font-medium">Source</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Received</th>
                  <th className="px-5 py-3 font-medium">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className={cn(
                      'cursor-pointer transition-colors hover:bg-royal-50/40',
                      lead.archived && 'opacity-60',
                    )}
                    onClick={() => {
                      setSelectedId(lead.id);
                      setActionError(null);
                    }}
                  >
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-navy-950">{lead.name}</p>
                      <p className="text-xs text-ink-500">{lead.email}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-ink-700">{lead.visaType || '—'}</p>
                      <p className="text-xs text-ink-500">{lead.country || '—'}</p>
                    </td>
                    <td className="px-5 py-3.5 text-xs capitalize text-ink-500">{lead.source}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-1 text-xs font-semibold',
                          STATUS_COLORS[lead.status] || 'bg-ink-100 text-ink-600',
                        )}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-ink-500">{formatDate(lead.createdAt)}</td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="text-xs font-semibold text-royal-700">View</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm text-ink-500">
            Page {pagination.page} of {pagination.pages}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="inline-flex items-center gap-1 rounded-lg border border-ink-200 px-3 py-2 text-sm font-medium text-ink-700 disabled:opacity-40 hover:bg-ink-50"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Previous
            </button>
            <button
              type="button"
              disabled={page >= pagination.pages}
              onClick={() => setPage((p) => p + 1)}
              className="inline-flex items-center gap-1 rounded-lg border border-ink-200 px-3 py-2 text-sm font-medium text-ink-700 disabled:opacity-40 hover:bg-ink-50"
            >
              Next <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            type="button"
            aria-label="Close lead details"
            className="absolute inset-0 bg-navy-950/50"
            onClick={() => setSelectedId(null)}
          />
          <aside className="relative flex h-full w-full max-w-lg flex-col overflow-y-auto bg-white shadow-lift">
            <header className="sticky top-0 flex items-start justify-between gap-4 border-b border-ink-100 bg-white px-6 py-5">
              <div>
                <h2 className="font-display text-lg font-bold text-navy-950">{selected.name}</h2>
                <p className="text-xs text-ink-500">
                  Received {formatDate(selected.createdAt)} · {selected.source}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                aria-label="Close"
                className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 hover:text-ink-700"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="flex-1 space-y-6 px-6 py-6">
              {actionError && <FormAlert type="error">{actionError}</FormAlert>}

              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-400">Contact</h3>
                <ul className="mt-2 space-y-2 text-sm text-ink-700">
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-ink-400" aria-hidden="true" />
                    <a href={`mailto:${selected.email}`} className="hover:text-royal-700">
                      {selected.email}
                    </a>
                  </li>
                  {selected.phone && (
                    <li className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-ink-400" aria-hidden="true" />
                      <a href={`tel:${selected.phone}`} className="hover:text-royal-700">
                        {selected.phone}
                      </a>
                    </li>
                  )}
                  {selected.country && (
                    <li className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-ink-400" aria-hidden="true" />
                      {selected.country}
                    </li>
                  )}
                </ul>
              </section>

              <section className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border border-ink-100 p-3">
                  <p className="text-xs text-ink-400">Visa type</p>
                  <p className="mt-0.5 font-medium text-navy-950">{selected.visaType || '—'}</p>
                </div>
                <div className="rounded-xl border border-ink-100 p-3">
                  <p className="text-xs text-ink-400">Preferred date</p>
                  <p className="mt-0.5 font-medium text-navy-950">
                    {selected.preferredDate || '—'}
                    {selected.preferredTime ? ` · ${selected.preferredTime}` : ''}
                  </p>
                </div>
              </section>

              {selected.message && (
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-400">Message</h3>
                  <p className="mt-2 whitespace-pre-line rounded-xl bg-ink-50 p-3.5 text-sm leading-relaxed text-ink-700">
                    {selected.message}
                  </p>
                </section>
              )}

              {selected.eligibility && (
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                    Eligibility check answers
                  </h3>
                  <dl className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(selected.eligibility)
                      .filter(([, v]) => Boolean(v))
                      .map(([k, v]) => (
                        <div key={k} className="rounded-lg border border-ink-100 p-2.5">
                          <dt className="text-[11px] capitalize text-ink-400">
                            {k.replace(/([A-Z])/g, ' $1')}
                          </dt>
                          <dd className="mt-0.5 font-medium text-ink-800">{v}</dd>
                        </div>
                      ))}
                  </dl>
                </section>
              )}

              {/* Status */}
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-400">Status</h3>
                <div className="mt-2 flex gap-2">
                  <Select
                    aria-label="Lead status"
                    placeholder="Set status"
                    options={(meta?.statuses ?? [selected.status]).map((s) => ({ value: s, label: s }))}
                    value={selected.status}
                    disabled={busy}
                    onChange={(e) => updateStatus(selected.id, e.target.value)}
                    wrapperClassName="flex-1 [&>label]:sr-only"
                  />
                </div>
              </section>

              {/* Notes */}
              <section>
                <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-400">
                  <StickyNote className="h-3.5 w-3.5" aria-hidden="true" />
                  Internal notes
                </h3>

                {selected.notes?.length > 0 ? (
                  <ul className="mt-2 space-y-2">
                    {selected.notes.map((n, i) => (
                      <li key={n._id || i} className="rounded-xl border border-ink-100 p-3">
                        <p className="whitespace-pre-line text-sm text-ink-700">{n.body}</p>
                        <p className="mt-1.5 text-[11px] text-ink-400">
                          {n.author || 'admin'} · {n.createdAt ? formatDate(n.createdAt) : ''}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-ink-400">No notes yet.</p>
                )}

                <div className="mt-3 flex gap-2">
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add an internal note…"
                    aria-label="New internal note"
                    rows={2}
                    className="flex-1 rounded-xl border border-ink-200 px-3 py-2 text-sm focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-500/30"
                  />
                  <Button size="sm" onClick={addNote} disabled={busy || note.trim().length < 2}>
                    Add
                  </Button>
                </div>
              </section>
            </div>

            <footer className="sticky bottom-0 flex justify-between gap-3 border-t border-ink-100 bg-white px-6 py-4">
              <button
                type="button"
                onClick={() => toggleArchive(selected)}
                disabled={busy}
                className="inline-flex items-center gap-2 rounded-xl border border-ink-200 px-4 py-2 text-sm font-semibold text-ink-700 hover:bg-ink-50 disabled:opacity-50"
              >
                {selected.archived ? (
                  <>
                    <ArchiveRestore className="h-4 w-4" aria-hidden="true" /> Restore
                  </>
                ) : (
                  <>
                    <Archive className="h-4 w-4" aria-hidden="true" /> Archive
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => removeLead(selected)}
                disabled={busy}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" /> Delete
              </button>
            </footer>
          </aside>
        </div>
      )}
    </>
  );
}
