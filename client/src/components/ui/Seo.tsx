import { useEffect } from 'react';
import { SITE } from '@/data/site';

type Meta = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
};

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Per-page document metadata: title, description, canonical, Open Graph,
 * Twitter cards and optional JSON-LD structured data.
 */
export default function Seo({
  title,
  description,
  path,
  image,
  type = 'website',
  jsonLd,
  noindex = false,
}: Meta) {
  const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
  const desc = description || SITE.description;
  const url = `${SITE.url}${path || '/'}`;
  const img = image || `${SITE.url}/og-cover.jpg`;

  useEffect(() => {
    document.title = fullTitle;
    setMeta('name', 'description', desc);
    setLink('canonical', url);

    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:image', img);
    setMeta('property', 'og:site_name', SITE.name);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', desc);
    setMeta('name', 'twitter:image', img);

    if (noindex) setMeta('name', 'robots', 'noindex, nofollow');
    else setMeta('name', 'robots', 'index, follow');

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(jsonLd);
      script.dataset.seo = 'true';
      document.head.appendChild(script);
    }

    return () => {
      if (script?.parentNode) script.parentNode.removeChild(script);
    };
  }, [fullTitle, desc, url, type, img, noindex, jsonLd]);

  return null;
}

/** BreadcrumbList JSON-LD helper. */
export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${SITE.url}${item.path}`,
  })),
});
