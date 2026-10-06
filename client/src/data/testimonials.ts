/**
 * Testimonials — replace with real client reviews before launch.
 * Each entry is clearly marked as placeholder so it is easy to find and swap.
 */
export type Testimonial = {
  name: string;
  country: string;
  service: string;
  rating: number;
  review: string;
  avatar: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Aarav S. (demo)',
    country: 'Canada',
    service: 'Study Visa',
    rating: 5,
    review:
      'The team guided me through every step of my study visa application — from university selection to the final interview. I got my visa in under three months and could not be happier with the support.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=60',
  },
  {
    name: 'Priya M. (demo)',
    country: 'Australia',
    service: 'PR / Immigration',
    rating: 5,
    review:
      'After two refused applications elsewhere, FlyNest identified the gaps in my profile and prepared a complete, well-documented PR application. I received my invitation to apply within six months.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=60',
  },
  {
    name: 'Daniel K. (demo)',
    country: 'United Kingdom',
    service: 'Work Visa',
    rating: 5,
    review:
      'Professional, responsive and honest. They explained the skilled worker visa process clearly and helped me secure a job offer from a licensed sponsor. Highly recommended for anyone considering the UK.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=60',
  },
  {
    name: 'Sofia R. (demo)',
    country: 'Germany',
    service: 'Study Visa',
    rating: 5,
    review:
      'From the blocked account to the visa interview, everything was handled with care. The team even helped me find accommodation before I arrived. A truly end-to-end service.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=60',
  },
  {
    name: 'Hassan A. (demo)',
    country: 'UAE / Dubai',
    service: 'Business Visa',
    rating: 5,
    review:
      'I needed a business visa for my trading company and the process was seamless. The team prepared all the documentation and coordinated with my sponsor. I was in Dubai within four weeks.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=60',
  },
  {
    name: 'Mei L. (demo)',
    country: 'Singapore',
    service: 'Tourist Visa',
    rating: 5,
    review:
      'Quick, efficient and transparent. My tourist visa was approved in five days and the team kept me updated at every stage. I will definitely use them for my future travel plans.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60',
  },
];
