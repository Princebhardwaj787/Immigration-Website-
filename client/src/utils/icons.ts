import {
  GraduationCap,
  Briefcase,
  Building2,
  Plane,
  Users,
  MapPin,
  FileText,
  ClipboardCheck,
  Globe2,
  HeartHandshake,
  BadgeCheck,
  BookOpen,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

/** Maps service icon names (stored in the DB) to Lucide components. */
const ICONS: Record<string, LucideIcon> = {
  GraduationCap,
  Briefcase,
  Building2,
  Plane,
  Users,
  MapPin,
  FileText,
  ClipboardCheck,
  Globe2,
  HeartHandshake,
  BadgeCheck,
  BookOpen,
  TrendingUp,
};

export function getServiceIcon(name?: string): LucideIcon {
  return (name && ICONS[name]) || FileText;
}

/** Maps a stored service slug (e.g. `study-visa`) to its public route (`/visa/study`). */
const VISA_SLUG_TO_ROUTE: Record<string, string> = {
  study: 'study',
  'study-visa': 'study',
  work: 'work',
  'work-visa': 'work',
  business: 'business',
  'business-visa': 'business',
  tourist: 'tourist',
  'tourist-visa': 'tourist',
  dependent: 'dependent',
  'dependent-visa': 'dependent',
  'family-visa': 'dependent',
  pr: 'pr',
  'pr-visa': 'pr',
  'permanent-residency': 'pr',
  immigration: 'pr',
};

export function visaPath(slug: string): string {
  return `/visa/${VISA_SLUG_TO_ROUTE[slug] || slug}`;
}
