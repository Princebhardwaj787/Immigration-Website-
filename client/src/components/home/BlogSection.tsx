import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, UserRound } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import SmartImage from '@/components/ui/SmartImage';
import { CardsSkeleton, ErrorState } from '@/components/ui/States';
import { useFetch } from '@/hooks/useFetch';
import { formatDate } from '@/utils';
import type { BlogPost } from '@/services/api';

export default function BlogSection() {
  const { data, loading, error, refetch } = useFetch<{ data: BlogPost[] }>('/blog?limit=3');
  const posts = data?.data ?? [];

  return (
    <Section id="updates" className="bg-ink-50/60">
      <SectionHeading
        eyebrow="Immigration Updates"
        title="Guides, explainers and news"
        description="Practical articles on documentation, destinations and process — written to inform, not to oversell."
      />

      {loading ? (
        <CardsSkeleton count={3} />
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : posts.length === 0 ? (
        <p className="text-center text-sm text-ink-500">No articles published yet.</p>
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
                  <div className="flex items-center gap-3 text-xs text-ink-500">
                    <span className="rounded-full bg-royal-50 px-2.5 py-1 font-semibold text-royal-700">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-base font-bold leading-snug text-navy-950">
                    <Link to={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-600">{post.excerpt}</p>

                  <div className="mt-auto flex items-center gap-2 pt-4 text-xs text-ink-500">
                    <UserRound className="h-3.5 w-3.5" aria-hidden="true" />
                    {post.author}
                    <span className="ml-auto font-semibold text-royal-700">Read article</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      )}

      <p className="mt-10 text-center">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 font-semibold text-navy-900 underline-offset-4 hover:underline"
        >
          Browse all articles
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </p>
    </Section>
  );
}
