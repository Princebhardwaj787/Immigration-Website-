import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, CalendarDays, UserRound, Tag, ArrowRight } from 'lucide-react';
import Seo, { breadcrumbLd } from '@/components/ui/Seo';
import { COMPANY } from '@/data/company';
import { Section, SectionHeading } from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import { ErrorState, Skeleton } from '@/components/ui/States';
import SmartImage from '@/components/ui/SmartImage';
import { useFetch } from '@/hooks/useFetch';
import { formatDate, parseContent } from '@/utils';
import type { BlogPost } from '@/services/api';

export default function BlogPostPage() {
  const { slug = '' } = useParams();
  const { data, loading, error, refetch } = useFetch<{
    data: BlogPost;
    related: BlogPost[];
  }>(`/blog/${slug}`, [slug]);

  if (error && /not found/i.test(error)) return <Navigate to="/blog" replace />;

  const post = data?.data;
  const related = data?.related ?? [];
  const blocks = post ? parseContent(post.content) : [];

  return (
    <>
      <Seo
        title={post?.title}
        description={post?.metaDescription || post?.excerpt}
        path={`/blog/${slug}`}
        image={post?.coverImage}
        type="article"
        jsonLd={
          post
            ? [
                {
                  '@context': 'https://schema.org',
                  '@type': 'Article',
                  headline: post.title,
                  datePublished: post.publishedAt,
                  author: { '@type': 'Organization', name: post.author },
                  publisher: { '@type': 'Organization', name: COMPANY.name },
                  description: post.metaDescription || post.excerpt,
                },
                breadcrumbLd([
                  { name: 'Home', path: '/' },
                  { name: 'Blog', path: '/blog' },
                  { name: post.title, path: `/blog/${slug}` },
                ]),
              ]
            : undefined
        }
      />

      {/* Header */}
      <article>
        <header className="bg-navy-950 py-12 md:py-16">
          <div className="container-page max-w-3xl">
            <Link
              to="/blog"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-navy-300 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All articles
            </Link>

            {loading ? (
              <>
                <Skeleton className="h-5 w-32 bg-white/10" />
                <Skeleton className="mt-4 h-10 w-full bg-white/10" />
                <Skeleton className="mt-3 h-4 w-2/3 bg-white/10" />
              </>
            ) : error ? (
              <ErrorState message={error} onRetry={refetch} />
            ) : post ? (
              <>
                <div className="flex flex-wrap items-center gap-3 text-xs text-navy-200">
                  <span className="rounded-full bg-white/10 px-3 py-1 font-semibold text-gold-300">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <UserRound className="h-3.5 w-3.5" aria-hidden="true" />
                    {post.author}
                  </span>
                </div>
                <h1 className="mt-5 font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">
                  {post.title}
                </h1>
                {post.excerpt && (
                  <p className="mt-4 text-base leading-relaxed text-navy-100">{post.excerpt}</p>
                )}
              </>
            ) : null}
          </div>
        </header>

        {/* Cover */}
        {post && (
          <div className="container-page max-w-4xl">
            <SmartImage
              src={post.coverImage}
              alt=""
              seed={post.slug}
              className="-mt-6 h-56 rounded-3xl shadow-card sm:h-72"
              loading="eager"
            />
          </div>
        )}

        {/* Content */}
        <Section className="!py-12">
          <div className="mx-auto max-w-3xl">
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-5 w-full" />
                ))}
              </div>
            ) : (
              <div className="prose-custom space-y-5">
                {blocks.map((block, i) => {
                  if (block.type === 'h') {
                    return (
                      <h2 key={i} className="mt-10 font-display text-xl font-bold text-navy-950 sm:text-2xl">
                        {block.text}
                      </h2>
                    );
                  }
                  if (block.type === 'ul') {
                    return (
                      <ul key={i} className="space-y-2.5 pl-1">
                        {block.items.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-ink-700">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-500" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={i} className="text-base leading-relaxed text-ink-700">
                      {block.text}
                    </p>
                  );
                })}
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-xs leading-relaxed text-amber-900">
              This article is for general informational purposes only and does not constitute legal
              or immigration advice. Immigration laws, visa requirements and processing times can
              change — verify current requirements with the relevant government authority.
            </div>

            {post && (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 rounded-full bg-ink-100 px-3 py-1 text-xs text-ink-600"
                  >
                    <Tag className="h-3 w-3" aria-hidden="true" />
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Section>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <Section className="bg-ink-50/60 !pt-10">
          <SectionHeading eyebrow="Related articles" title="Keep reading" align="left" />
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.07}>
                <article className="card card-hover group relative flex h-full flex-col overflow-hidden">
                  <SmartImage src={r.coverImage} alt="" seed={r.slug} className="h-36 w-full" />
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-xs font-semibold text-royal-700">{r.category}</span>
                    <h3 className="mt-2 font-display text-sm font-bold leading-snug text-navy-950">
                      <Link to={`/blog/${r.slug}`} className="after:absolute after:inset-0">
                        {r.title}
                      </Link>
                    </h3>
                    <span className="mt-auto pt-3 text-xs font-semibold text-royal-700">
                      Read article
                      <ArrowRight className="ml-1 inline h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
