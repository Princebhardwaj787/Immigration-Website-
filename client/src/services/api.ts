export class ApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, message: string, code = 'ERROR') {
    super(message);
    this.status = status;
    this.code = code;
  }
}

type Options = RequestInit & { timeout?: number };

const BASE = '/api';

async function request<T>(path: string, options: Options = {}): Promise<T> {
  const { timeout = 20000, headers, ...rest } = options;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(`${BASE}${path}`, {
      ...rest,
      signal: controller.signal,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        ...(rest.body ? { 'Content-Type': 'application/json' } : {}),
        ...headers,
      },
    });

    const text = await res.text();
    let payload: any = null;
    try {
      payload = text ? JSON.parse(text) : null;
    } catch {
      payload = null;
    }

    if (!res.ok) {
      // Never surface raw backend errors — use the safe message only.
      const message: string =
        payload?.message ||
        (res.status === 429
          ? 'Too many attempts. Please wait a moment and try again.'
          : res.status >= 500
            ? 'Something went wrong on our side. Please try again shortly.'
            : 'Request failed. Please check your details and try again.');
      throw new ApiError(res.status, message, payload?.code || 'ERROR');
    }

    return payload as T;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if ((err as Error).name === 'AbortError') {
      throw new ApiError(408, 'The request took too long. Please check your connection and try again.', 'TIMEOUT');
    }
    throw new ApiError(0, 'Network error. Please check your connection and try again.', 'NETWORK');
  } finally {
    clearTimeout(timer);
  }
}

export const api = {
  get: <T>(path: string, options?: Options) => request<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body?: unknown, options?: Options) =>
    request<T>(path, { ...options, method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  put: <T>(path: string, body?: unknown, options?: Options) =>
    request<T>(path, { ...options, method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown, options?: Options) =>
    request<T>(path, { ...options, method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  del: <T>(path: string, options?: Options) => request<T>(path, { ...options, method: 'DELETE' }),
};

/* ------------------------------- Types -------------------------------- */

export interface Service {
  id: string;
  slug: string;
  title: string;
  icon?: string;
  tagline?: string;
  summary: string;
  description?: string;
  benefits: string[];
  checklist: string[];
  order: number;
  published: boolean;
}

export interface Country {
  id: string;
  slug: string;
  name: string;
  image?: string;
  tagline?: string;
  overview: string;
  visaCategories: string[];
  popularPurposes: string[];
  eligibilityOverview?: string;
  documents: string[];
  processSteps: { title: string; detail: string }[];
  order: number;
  published: boolean;
}

export interface CountryListItem {
  id: string;
  slug: string;
  name: string;
  image?: string;
  tagline?: string;
  visaCategories: string[];
  popularPurposes: string[];
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  published: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  country?: string;
  visaType?: string;
  review: string;
  avatar?: string;
  rating: number;
  isDemo: boolean;
  order: number;
  published: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category: string;
  author: string;
  coverImage?: string;
  metaDescription?: string;
  tags: string[];
  published: boolean;
  publishedAt: string;
}

export interface Checklist {
  visaType: string;
  label: string;
  note: string;
  items: string[];
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  visaType?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  source: 'consultation' | 'eligibility' | 'contact';
  status: string;
  consent: boolean;
  archived: boolean;
  notes: { _id?: string; body: string; author?: string; createdAt?: string }[];
  eligibility?: Record<string, string>;
  createdAt: string;
}

export interface AdminStats {
  totals: { leads: number; new: number; consultations: number; publishedPosts: number };
  byVisaType: { label: string; count: number }[];
  byCountry: { label: string; count: number }[];
  byStatus: { label: string; count: number }[];
  recent: Lead[];
  recentApplications: Lead[];
}
