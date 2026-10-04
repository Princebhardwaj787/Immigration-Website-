import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Check, RefreshCw } from 'lucide-react';
import Seo from '@/components/ui/Seo';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Field';
import { ErrorState, FormAlert, Skeleton } from '@/components/ui/States';
import { api, ApiError } from '@/services/api';
import { cn } from '@/utils';

/* --------------------------- Configuration --------------------------- */

type FieldType = 'text' | 'textarea' | 'number' | 'checkbox' | 'select' | 'list' | 'pairs';

interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { value: string; label: string }[];
  hint?: string;
  span?: 1 | 2;
}

interface EntityConfig {
  key: string;
  label: string;
  singular: string;
  path: string;
  listKey: string;
  fields: FieldDef[];
  columns: { key: string; label: string }[];
}

const ICON_OPTIONS = [
  'GraduationCap',
  'Briefcase',
  'Building2',
  'Plane',
  'Users',
  'MapPin',
  'FileText',
  'ClipboardCheck',
  'Globe2',
  'HeartHandshake',
  'BadgeCheck',
  'BookOpen',
].map((i) => ({ value: i, label: i }));

const CONFIGS: Record<string, EntityConfig> = {
  services: {
    key: 'services',
    label: 'Visa Services',
    singular: 'service',
    path: '/admin/services',
    listKey: 'title',
    columns: [
      { key: 'title', label: 'Service' },
      { key: 'slug', label: 'Slug' },
      { key: 'order', label: 'Order' },
      { key: 'published', label: 'Status' },
    ],
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true, span: 1 },
      { name: 'slug', label: 'Slug (URL)', type: 'text', hint: 'e.g. study-visa', span: 1 },
      { name: 'tagline', label: 'Tagline', type: 'text', span: 2 },
      { name: 'summary', label: 'Short summary', type: 'textarea', required: true, span: 2 },
      { name: 'description', label: 'Full description', type: 'textarea', span: 2 },
      { name: 'benefits', label: 'Key benefits (one per line)', type: 'list', span: 2 },
      { name: 'checklist', label: 'Document checklist (one per line)', type: 'list', span: 2 },
      { name: 'icon', label: 'Icon', type: 'select', options: ICON_OPTIONS, span: 1 },
      { name: 'order', label: 'Sort order', type: 'number', span: 1 },
      { name: 'published', label: 'Published', type: 'checkbox', span: 2 },
    ],
  },
  countries: {
    key: 'countries',
    label: 'Countries',
    singular: 'country',
    path: '/admin/countries',
    listKey: 'name',
    columns: [
      { key: 'name', label: 'Country' },
      { key: 'slug', label: 'Slug' },
      { key: 'visaCategories', label: 'Visa categories' },
      { key: 'published', label: 'Status' },
    ],
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true, span: 1 },
      { name: 'slug', label: 'Slug (URL)', type: 'text', hint: 'e.g. canada', span: 1 },
      { name: 'tagline', label: 'Tagline', type: 'text', span: 2 },
      { name: 'image', label: 'Image URL', type: 'text', span: 2 },
      { name: 'overview', label: 'Overview', type: 'textarea', required: true, span: 2 },
      {
        name: 'eligibilityOverview',
        label: 'Eligibility overview (general, non-binding)',
        type: 'textarea',
        span: 2,
      },
      { name: 'visaCategories', label: 'Visa categories (one per line)', type: 'list', span: 1 },
      { name: 'popularPurposes', label: 'Popular purposes (one per line)', type: 'list', span: 1 },
      { name: 'documents', label: 'Documents (one per line)', type: 'list', span: 2 },
      {
        name: 'processSteps',
        label: 'Application process (one step per line: Title | Detail)',
        type: 'pairs',
        span: 2,
      },
      { name: 'order', label: 'Sort order', type: 'number', span: 1 },
      { name: 'published', label: 'Published', type: 'checkbox', span: 1 },
    ],
  },
  faqs: {
    key: 'faqs',
    label: 'FAQs',
    singular: 'FAQ',
    path: '/admin/faqs',
    listKey: 'question',
    columns: [
      { key: 'question', label: 'Question' },
      { key: 'category', label: 'Category' },
      { key: 'order', label: 'Order' },
      { key: 'published', label: 'Status' },
    ],
    fields: [
      { name: 'question', label: 'Question', type: 'text', required: true, span: 2 },
      { name: 'answer', label: 'Answer', type: 'textarea', required: true, span: 2 },
      { name: 'category', label: 'Category', type: 'text', span: 1 },
      { name: 'order', label: 'Sort order', type: 'number', span: 1 },
      { name: 'published', label: 'Published', type: 'checkbox', span: 2 },
    ],
  },
  testimonials: {
    key: 'testimonials',
    label: 'Testimonials',
    singular: 'testimonial',
    path: '/admin/testimonials',
    listKey: 'name',
    columns: [
      { key: 'name', label: 'Client' },
      { key: 'visaType', label: 'Visa type' },
      { key: 'country', label: 'Country' },
      { key: 'isDemo', label: 'Type' },
      { key: 'published', label: 'Status' },
    ],
    fields: [
      { name: 'name', label: 'Client name', type: 'text', required: true, span: 1 },
      { name: 'country', label: 'Country', type: 'text', span: 1 },
      { name: 'visaType', label: 'Visa type', type: 'text', span: 1 },
      { name: 'rating', label: 'Rating (1–5)', type: 'number', span: 1 },
      { name: 'review', label: 'Review', type: 'textarea', required: true, span: 2 },
      { name: 'avatar', label: 'Avatar image URL (optional)', type: 'text', span: 2 },
      { name: 'isDemo', label: 'Demo placeholder content (must be replaced before launch)', type: 'checkbox', span: 2 },
      { name: 'order', label: 'Sort order', type: 'number', span: 1 },
      { name: 'published', label: 'Published', type: 'checkbox', span: 1 },
    ],
  },
};

type AnyRecord = Record<string, any>;

/* ---------------------------- Helpers -------------------------------- */

function toFormValues(record: AnyRecord, fields: FieldDef[]): AnyRecord {
  const out: AnyRecord = {};
  for (const f of fields) {
    const value = record?.[f.name];
    if (f.type === 'list') out[f.name] = Array.isArray(value) ? value.join('\n') : '';
    else if (f.type === 'pairs') {
      out[f.name] = Array.isArray(value)
        ? value.map((p: any) => `${p.title || ''} | ${p.detail || ''}`).join('\n')
        : '';
    } else if (f.type === 'checkbox') out[f.name] = Boolean(value);
    else if (f.type === 'number') out[f.name] = value ?? 0;
    else out[f.name] = value ?? '';
  }
  return out;
}

function toPayload(values: AnyRecord, fields: FieldDef[]): AnyRecord {
  const out: AnyRecord = {};
  for (const f of fields) {
    const value = values[f.name];
    if (f.type === 'list') {
      out[f.name] = String(value || '')
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (f.type === 'pairs') {
      out[f.name] = String(value || '')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [title, ...rest] = line.split('|');
          return { title: (title || '').trim(), detail: rest.join('|').trim() };
        });
    } else if (f.type === 'number') out[f.name] = Number(value) || 0;
    else if (f.type === 'checkbox') out[f.name] = Boolean(value);
    else out[f.name] = typeof value === 'string' ? value.trim() : value;
  }
  return out;
}

/* ------------------------------ Modal -------------------------------- */

function EntityModal({
  config,
  record,
  onClose,
  onSaved,
}: {
  config: EntityConfig;
  record: AnyRecord | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [values, setValues] = useState<AnyRecord>(() =>
    record ? toFormValues(record, config.fields) : toFormValues({}, config.fields),
  );
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const set = (name: string, value: any) => setValues((v) => ({ ...v, [name]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = toPayload(values, config.fields);
    try {
      if (record?.id) await api.put(`${config.path}/${record.id}`, payload);
      else await api.post(config.path, payload);
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close dialog"
        className="fixed inset-0 bg-navy-950/60"
        onClick={onClose}
      />
      <form
        onSubmit={submit}
        className="relative z-10 my-6 w-full max-w-2xl rounded-2xl bg-white shadow-lift"
      >
        <header className="flex items-center justify-between border-b border-ink-100 px-6 py-4">
          <h2 className="font-display text-lg font-bold text-navy-950">
            {record ? 'Edit' : 'New'} {config.singular}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 hover:text-ink-700"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="max-h-[70vh] space-y-4 overflow-y-auto px-6 py-5">
          {error && <FormAlert type="error">{error}</FormAlert>}

          <div className="grid gap-4 sm:grid-cols-2">
            {config.fields.map((field) => {
              const span = field.span === 2 ? 'sm:col-span-2' : '';
              if (field.type === 'checkbox') {
                return (
                  <label
                    key={field.name}
                    className={cn(
                      'flex cursor-pointer items-start gap-3 rounded-xl border border-ink-100 p-3.5 text-sm text-ink-700',
                      span,
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={Boolean(values[field.name])}
                      onChange={(e) => set(field.name, e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-ink-300 text-royal-600 focus:ring-royal-500"
                    />
                    {field.label}
                  </label>
                );
              }
              if (field.type === 'select') {
                return (
                  <Select
                    key={field.name}
                    label={field.label}
                    options={field.options || []}
                    value={values[field.name] || ''}
                    onChange={(e) => set(field.name, e.target.value)}
                    wrapperClassName={span}
                  />
                );
              }
              if (field.type === 'textarea' || field.type === 'list' || field.type === 'pairs') {
                return (
                  <Textarea
                    key={field.name}
                    label={field.label}
                    hint={field.hint}
                    value={values[field.name] ?? ''}
                    onChange={(e) => set(field.name, e.target.value)}
                    required={field.required}
                    wrapperClassName={span}
                    rows={field.type === 'textarea' ? 4 : 5}
                  />
                );
              }
              return (
                <Input
                  key={field.name}
                  label={field.label}
                  hint={field.hint}
                  type={field.type === 'number' ? 'number' : 'text'}
                  required={field.required}
                  value={values[field.name] ?? ''}
                  onChange={(e) => set(field.name, e.target.value)}
                  wrapperClassName={span}
                />
              );
            })}
          </div>
        </div>

        <footer className="flex justify-end gap-3 border-t border-ink-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-ink-200 px-4 py-2 text-sm font-semibold text-ink-700 hover:bg-ink-50"
          >
            Cancel
          </button>
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </footer>
      </form>
    </div>
  );
}

/* ------------------------------ Page --------------------------------- */

const TABS = [
  { key: 'services', label: 'Services' },
  { key: 'countries', label: 'Countries' },
  { key: 'faqs', label: 'FAQs' },
  { key: 'testimonials', label: 'Testimonials' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

export default function AdminContent() {
  const [tab, setTab] = useState<TabKey>('services');
  const config = CONFIGS[tab];

  const [items, setItems] = useState<AnyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<AnyRecord | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<{ data: AnyRecord[] }>(`${config.path}?all=true`);
      setItems(res.data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not load content.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const remove = async (record: AnyRecord) => {
    const label = record[config.listKey] || 'this record';
    if (!window.confirm(`Delete “${label}”? This cannot be undone.`)) return;
    setActionError(null);
    try {
      await api.del(`${config.path}/${record.id}`);
      await load();
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : 'Delete failed.');
    }
  };

  return (
    <>
      <Seo title={`Manage ${config.label}`} noindex />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-950">Services &amp; Content</h1>
          <p className="text-sm text-ink-500">
            Manage the visa services, countries, FAQs and testimonials shown on the website.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={load}
            className="inline-flex items-center gap-2 rounded-xl border border-ink-200 px-4 py-2.5 text-sm font-semibold text-ink-700 hover:bg-ink-50"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Refresh
          </button>
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-800"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            New {config.singular}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Content types">
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
              tab === t.key ? 'bg-navy-950 text-white' : 'bg-white text-ink-600 border border-ink-200 hover:bg-ink-50',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {actionError && (
        <div className="mb-4">
          <FormAlert type="error">{actionError}</FormAlert>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-200 bg-ink-50/50 px-6 py-12 text-center text-sm text-ink-500">
          No {config.label.toLowerCase()} yet. Create the first one.
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-ink-50 text-xs uppercase tracking-wide text-ink-500">
                <tr>
                  {config.columns.map((c) => (
                    <th key={c.key} className="px-5 py-3 font-medium">
                      {c.label}
                    </th>
                  ))}
                  <th className="px-5 py-3 text-right font-medium">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {items.map((record) => (
                  <tr key={record.id} className="hover:bg-ink-50/60">
                    {config.columns.map((c) => (
                      <td key={c.key} className="max-w-xs truncate px-5 py-3.5 text-ink-700">
                        {c.key === 'published' ? (
                          <span
                            className={cn(
                              'rounded-full px-2.5 py-1 text-xs font-semibold',
                              record.published ? 'bg-emerald-50 text-emerald-700' : 'bg-ink-100 text-ink-500',
                            )}
                          >
                            {record.published ? 'Published' : 'Draft'}
                          </span>
                        ) : c.key === 'isDemo' ? (
                          <span
                            className={cn(
                              'rounded-full px-2.5 py-1 text-xs font-semibold',
                              record.isDemo ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700',
                            )}
                          >
                            {record.isDemo ? 'Demo' : 'Real'}
                          </span>
                        ) : Array.isArray(record[c.key]) ? (
                          `${record[c.key].length} item${record[c.key].length === 1 ? '' : 's'}`
                        ) : (
                          String(record[c.key] ?? '—')
                        )}
                      </td>
                    ))}
                    <td className="px-5 py-3.5">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditing(record);
                            setModalOpen(true);
                          }}
                          aria-label={`Edit ${record[config.listKey]}`}
                          className="rounded-lg border border-ink-200 p-2 text-ink-500 hover:bg-ink-50 hover:text-navy-900"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(record)}
                          aria-label={`Delete ${record[config.listKey]}`}
                          className="rounded-lg border border-ink-200 p-2 text-ink-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="mt-4 flex items-center gap-1.5 text-xs text-ink-400">
        <Check className="h-3.5 w-3.5" aria-hidden="true" />
        Changes appear on the public website immediately after saving.
      </p>

      {modalOpen && (
        <EntityModal
          key={`${config.key}-${editing?.id || 'new'}`}
          config={config}
          record={editing}
          onClose={() => setModalOpen(false)}
          onSaved={load}
        />
      )}
    </>
  );
}
