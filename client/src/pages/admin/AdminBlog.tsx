import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, X, ExternalLink, RefreshCw } from 'lucide-react';
import Seo from '@/components/ui/Seo';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Field';
import { ErrorState, FormAlert, Skeleton } from '@/components/ui/States';
import { api, ApiError, type BlogPost } from '@/services/api';
import { cn, formatDate, slugify } from '@/utils';

const CATEGORIES = [
  'Visa Updates',
  'Study Abroad',
  'Work Abroad',
  'Immigration',
  'Travel',
  'Country Guides',
  'Documentation',
  'Student Guides',
].map((c) => ({ value: c, label: c }));

const EMPTY: Partial<BlogPost> = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: 'Immigration',
  author: 'Editorial Team',
  coverImage: '',
  metaDescription: '',
  tags: [],
  published: false,
};

function Editor({
  record,
  onClose,
  onSaved,
}: {
  record: BlogPost | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [values, setValues] = useState<any>(() => ({
    ...EMPTY,
    ...(record || {}),
    tags: (record?.tags || []).join(', '),
    autoSlug: !record,
  }));
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const set = (name: string, value: any) =>
    setValues((v: any) => ({ ...v, [name]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title: values.title.trim(),
      slug: (values.autoSlug ? slugify(values.title) : values.slug).trim(),
      excerpt: (values.excerpt || '').trim(),
      content: values.content.trim(),
      category: values.category,
      author: (values.author || 'Editorial Team').trim(),
      coverImage: (values.coverImage || '').trim(),
      metaDescription: (values.metaDescription || '').trim(),
      tags: String(values.tags || '')
        .split(',')
        .map((t: string) => t.trim())
        .filter(Boolean),
      published: Boolean(values.published),
    };

    try {
      if (record?.id) await api.put(`/admin/blog/${record.id}`, payload);
      else await api.post('/admin/blog', payload);
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not save the article.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close editor"
        className="fixed inset-0 bg-navy-950/60"
        onClick={onClose}
      />
      <form
        onSubmit={submit}
        className="relative z-10 my-6 w-full max-w-3xl rounded-2xl bg-white shadow-lift"
      >
        <header className="flex items-center justify-between border-b border-ink-100 px-6 py-4">
          <h2 className="font-display text-lg font-bold text-navy-950">
            {record ? 'Edit article' : 'New article'}
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

        <div className="max-h-[72vh] space-y-4 overflow-y-auto px-6 py-5">
          {error && <FormAlert type="error">{error}</FormAlert>}

          <Input
            label="Title"
            required
            value={values.title}
            onChange={(e) => {
              set('title', e.target.value);
              if (values.autoSlug) set('slug', slugify(e.target.value));
            }}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Slug (URL)"
              hint={values.autoSlug ? 'Generated from the title.' : 'Lowercase letters, numbers, dashes.'}
              required
              disabled={values.autoSlug}
              value={values.slug}
              onChange={(e) => set('slug', e.target.value)}
            />
            <label className="flex cursor-pointer items-center gap-2 self-end pb-3 text-sm text-ink-600">
              <input
                type="checkbox"
                checked={values.autoSlug}
                onChange={(e) => set('autoSlug', e.target.checked)}
                className="h-4 w-4 rounded border-ink-300 text-royal-600 focus:ring-royal-500"
              />
              Generate slug from title
            </label>

            <Select
              label="Category"
              options={CATEGORIES}
              value={values.category}
              onChange={(e) => set('category', e.target.value)}
            />
            <Input label="Author" value={values.author} onChange={(e) => set('author', e.target.value)} />
            <Input
              label="Cover image URL"
              value={values.coverImage || ''}
              onChange={(e) => set('coverImage', e.target.value)}
              wrapperClassName="sm:col-span-2"
            />
            <Textarea
              label="Excerpt"
              hint="Shown on listing cards."
              rows={2}
              value={values.excerpt || ''}
              onChange={(e) => set('excerpt', e.target.value)}
              wrapperClassName="sm:col-span-2"
            />
            <Input
              label="Meta description (SEO)"
              hint="Up to 160 characters."
              maxLength={180}
              value={values.metaDescription || ''}
              onChange={(e) => set('metaDescription', e.target.value)}
              wrapperClassName="sm:col-span-2"
            />
            <Input
              label="Tags (comma separated)"
              value={values.tags}
              onChange={(e) => set('tags', e.target.value)}
              wrapperClassName="sm:col-span-2"
            />
          </div>

          <Textarea
            label="Content"
            hint="Blank line = new paragraph. Start a line with ## for a heading, or - for a list item."
            required
            rows={14}
            className="font-mono text-xs"
            value={values.content}
            onChange={(e) => set('content', e.target.value)}
          />

          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-ink-100 p-3.5 text-sm text-ink-700">
            <input
              type="checkbox"
              checked={Boolean(values.published)}
              onChange={(e) => set('published', e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-ink-300 text-royal-600 focus:ring-royal-500"
            />
            Published (visible on the website)
          </label>
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
            {saving ? 'Saving…' : 'Save article'}
          </Button>
        </footer>
      </form>
    </div>
  );
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<{ data: BlogPost[] }>('/admin/blog?all=true&limit=50');
      setPosts(res.data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not load articles.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const remove = async (post: BlogPost) => {
    if (!window.confirm(`Delete “${post.title}”? This cannot be undone.`)) return;
    setActionError(null);
    try {
      await api.del(`/admin/blog/${post.id}`);
      await load();
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : 'Delete failed.');
    }
  };

  return (
    <>
      <Seo title="Manage Blog" noindex />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-950">Blog</h1>
          <p className="text-sm text-ink-500">Create and manage immigration articles and updates.</p>
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
            New article
          </button>
        </div>
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
      ) : posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-200 bg-ink-50/50 px-6 py-12 text-center text-sm text-ink-500">
          No articles yet. Create your first article.
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-ink-50 text-xs uppercase tracking-wide text-ink-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Article</th>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">Published</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 text-right font-medium">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-ink-50/60">
                    <td className="max-w-md px-5 py-3.5">
                      <p className="truncate font-semibold text-navy-950">{post.title}</p>
                      <p className="truncate text-xs text-ink-500">/blog/{post.slug}</p>
                    </td>
                    <td className="px-5 py-3.5 text-ink-600">{post.category}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-1 text-xs font-semibold',
                          post.published ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700',
                        )}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-ink-500">{formatDate(post.publishedAt)}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex justify-end gap-2">
                        {post.published && (
                          <Link
                            to={`/blog/${post.slug}`}
                            target="_blank"
                            aria-label={`View ${post.title}`}
                            className="rounded-lg border border-ink-200 p-2 text-ink-500 hover:bg-ink-50 hover:text-navy-900"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setEditing(post);
                            setModalOpen(true);
                          }}
                          aria-label={`Edit ${post.title}`}
                          className="rounded-lg border border-ink-200 p-2 text-ink-500 hover:bg-ink-50 hover:text-navy-900"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(post)}
                          aria-label={`Delete ${post.title}`}
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

      {modalOpen && (
        <Editor
          key={editing?.id || 'new'}
          record={editing}
          onClose={() => setModalOpen(false)}
          onSaved={load}
        />
      )}
    </>
  );
}
