import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, UserRound, ArrowRight, BookOpen } from 'lucide-react';
import Seo, { breadcrumbLd } from '@/components/ui/Seo';
import { Section } from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import SmartImage from '@/components/ui/SmartImage';
import { CardsSkeleton, EmptyState, ErrorState } from '@/components/ui/States';
import { cn, formatDate } from '@/utils';
import { useFetch } from '@/hooks/useFetch';
import type { BlogPost } from '@/services/api';

export default function Blog() {
  const [category, setCategory] = useState('');
  const { data, loading, error, refetch } = useFetch<{
    data: BlogPost[];
    categories: string[];
    pagination: { page: number; pages: number; total: number };
  }>(`/blog?limit=24${category ? `&category=${encodeURIComponent(category)}` : ''}`, [category]);

  const posts = data?.data ?? [];
  const categories = data?.categories ?? [];

  return (
    <>
      <Seo
        title="Immigration Updates & Guides"
        description="Articles on visa updates, study abroad, work abroad, immigration, travel, country guides and documentation."
        path="/blog"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />

      <section className="bg-navy-950 py-14 md:py-20">
        <div className="container-page max-w-3xl">
          <p className="eyebrow mb-4 text-gold-300">
            <span className="h-px w-6 bg-current" aria-hidden="true" />
            Blog
          </p>
          <h1 className="heading-xl text-white">Immigration updates &amp; practical guides</h1>
          <p className="mt-5 text-base leading-relaxed text-navy-100 md:text-lg">
            Explainders on documentation, destinations and process — written to inform, with clear
            notes wherever requirements vary or change.
          </p>
        </div>
      </section>

      <Section>
        {/* Category filter */}
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">
          <button
            type="button"
            onClick={() => setCategory('')}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-colors',
              !category ? 'bg-navy-950 text-white' : 'bg-ink-100 text-ink-600 hover:bg-ink-200',
            )}
            aria-pressed={!category}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                category === c ? 'bg-navy-950 text-white' : 'bg-ink-100 text-ink-600 hover:bg-ink-200',
              )}
              aria-pressed={category === c}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <CardsSkeleton count={6} />
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : posts.length === 0 ? (
          <EmptyState message="No articles in this category yet." />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.07}>
                <article className="card card-hover group relative flex h-full flex-col overflow-hidden">
                  <SmartImage
                    src={post.coverImage}
                    alt=""
                    seed={post.slug}
                    className="h-44 w-full"
                    imgClassName="transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-500">
                      <span className="rounded-full bg-royal-50 px-2.5 py-1 font-semibold text-royal-700">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                        {formatDate(post.publishedAt)}
                      </span>
                    </div>

                    <h2 className="mt-3 font-display text-base font-bold leading-snug text-navy-950">
                      <Link to={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-600">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto flex items-center gap-2 pt-4 text-xs text-ink-500">
                      <UserRound className="h-3.5 w-3.5" aria-hidden="true" />
                      {post.author}
                      <span className="ml-auto font-semibold text-royal-700">Read more</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        {data?.pagination && data.pagination.pages > 1 && (
          <p className="mt-8 text-center text-sm text-ink-500">
            Page {data.pagination.page} of {data.pagination.pages} · {data.pagination.total} articles
          </p>
        )}

        <div className="mt-10 flex justify-center">
          <Link
            to="/consultation"
            className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-6 py-3 text-sm font-semibold text-white hover:bg-navy-800"
          >
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Prefer personal guidance? Book a consultation
          </Link>
        </div>
      </Section>
    </>
  );
}
