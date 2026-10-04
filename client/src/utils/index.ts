/** Merge conditional class names (tiny clsx replacement). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/** URL-friendly slug from arbitrary text. */
export function slugify(input: string): string {
  return (input || '')
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90);
}

export const formatDate = (value?: string | Date | null): string => {
  if (!value) return '—';
  const d = typeof value === 'string' ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const initials = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('') || '?';

/** Turn plain blog content (paragraphs, `## headings`, `- lists`) into safe JSX-ready blocks. */
export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'ul'; items: string[] };

export function parseContent(raw: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const lines = (raw || '').split('\n');
  let list: string[] | null = null;

  const flush = () => {
    if (list && list.length) blocks.push({ type: 'ul', items: list });
    list = null;
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flush();
      continue;
    }
    if (trimmed.startsWith('## ')) {
      flush();
      blocks.push({ type: 'h', text: trimmed.slice(3).trim() });
    } else if (/^[-*]\s+/.test(trimmed)) {
      list = [...(list || []), trimmed.replace(/^[-*]\s+/, '')];
    } else {
      flush();
      blocks.push({ type: 'p', text: trimmed });
    }
  }
  flush();
  return blocks;
}
