import { Link } from 'react-router-dom';
import {
  Users,
  UserPlus,
  CalendarCheck,
  Newspaper,
  ArrowRight,
  Inbox,
} from 'lucide-react';
import Seo from '@/components/ui/Seo';
import { ErrorState, Skeleton } from '@/components/ui/States';
import { useFetch } from '@/hooks/useFetch';
import { cn, formatDate } from '@/utils';
import type { AdminStats } from '@/services/api';

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Users;
  label: string;
  value: number | string;
  accent: string;
}) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <span className={cn('grid h-10 w-10 place-items-center rounded-xl', accent)}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="text-3xl font-extrabold text-navy-950">{value}</span>
      </div>
      <p className="mt-3 text-sm font-medium text-ink-600">{label}</p>
    </div>
  );
}

function Breakdown({ title, rows }: { title: string; rows: { label: string; count: number }[] }) {
  const max = Math.max(1, ...rows.map((r) => r.count));
  return (
    <div className="card p-5">
      <h2 className="font-display text-sm font-bold text-navy-950">{title}</h2>
      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-ink-400">No data yet.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {rows.slice(0, 7).map((row) => (
            <li key={row.label}>
              <div className="flex items-center justify-between text-xs">
                <span className="truncate text-ink-600">{row.label}</span>
                <span className="ml-2 font-semibold text-navy-950">{row.count}</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-navy-800 to-royal-600"
                  style={{ width: `${(row.count / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const { data, loading, error, refetch } = useFetch<{ data: AdminStats }>('/admin/stats');
  const stats = data?.data;

  return (
    <>
      <Seo title="Admin Dashboard" noindex />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-950">Dashboard</h1>
          <p className="text-sm text-ink-500">Overview of leads, consultations and content.</p>
        </div>
        <Link
          to="/admin/leads"
          className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-800"
        >
          View all leads
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      {loading ? (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
          <Skeleton className="h-64" />
        </div>
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={Users} label="Total leads" value={stats?.totals.leads ?? 0} accent="bg-navy-950 text-gold-400" />
            <StatCard icon={UserPlus} label="New leads" value={stats?.totals.new ?? 0} accent="bg-royal-50 text-royal-700" />
            <StatCard
              icon={CalendarCheck}
              label="Consultation requests"
              value={stats?.totals.consultations ?? 0}
              accent="bg-emerald-50 text-emerald-700"
            />
            <StatCard
              icon={Newspaper}
              label="Published posts"
              value={stats?.totals.publishedPosts ?? 0}
              accent="bg-gold-50 text-gold-700"
            />
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <Breakdown title="Leads by visa category" rows={stats?.byVisaType ?? []} />
            <Breakdown title="Leads by country" rows={stats?.byCountry ?? []} />
            <Breakdown title="Leads by status" rows={stats?.byStatus ?? []} />
          </div>

          <div className="mt-6 card overflow-hidden">
            <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
              <h2 className="font-display text-sm font-bold text-navy-950">Recent applications</h2>
              <Link to="/admin/leads" className="text-xs font-semibold text-royal-700 hover:underline">
                Manage
              </Link>
            </div>

            {(stats?.recentApplications ?? []).length === 0 ? (
              <div className="flex flex-col items-center justify-center px-5 py-10 text-center">
                <Inbox className="h-7 w-7 text-ink-300" aria-hidden="true" />
                <p className="mt-2 text-sm text-ink-500">No leads yet.</p>
                <p className="mt-1 text-xs text-ink-400">
                  Submissions from the website will appear here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="bg-ink-50 text-xs uppercase tracking-wide text-ink-500">
                    <tr>
                      <th className="px-5 py-3 font-medium">Name</th>
                      <th className="px-5 py-3 font-medium">Visa type</th>
                      <th className="px-5 py-3 font-medium">Country</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                      <th className="px-5 py-3 font-medium">Received</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-100">
                    {(stats?.recentApplications ?? []).map((lead) => (
                      <tr key={lead.id} className="hover:bg-ink-50/60">
                        <td className="px-5 py-3">
                          <p className="font-medium text-navy-950">{lead.name}</p>
                          <p className="text-xs text-ink-500">{lead.email}</p>
                        </td>
                        <td className="px-5 py-3 text-ink-600">{lead.visaType || '—'}</td>
                        <td className="px-5 py-3 text-ink-600">{lead.country || '—'}</td>
                        <td className="px-5 py-3">
                          <span className="rounded-full bg-navy-50 px-2.5 py-1 text-xs font-semibold text-navy-800">
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-ink-500">{formatDate(lead.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
