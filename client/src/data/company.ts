/**
 * All company-specific information lives here so it can be replaced in one
 * place once real details are available.
 *
 * !! Fields still marked `placeholder: true` must be replaced before launch !!
 */
export const COMPANY = {
  name: 'FlyNest Overseas Consultancy',
  legalName: 'FlyNest Overseas Consultancy', // placeholder: replace with the registered legal entity name, if different
  /** Two-line logo lockup used in the navbar, footer and admin sidebar. */
  brandLine1: 'FlyNest',
  brandLine2: 'Overseas Consultancy',
  tagline: 'Your Global Journey Starts Here',
  placeholder: true, // address, hours, socials and map are still placeholders

  email: 'flynestoverseasconsutancy@gmail.com',
  phone: '+91 81682 23966',
  phone2: '+91 72065 09457',
  whatsapp: '+91 81682 23966',

  address: {
    line1: 'Placeholder Street 123, Suite 4B', // placeholder
    city: 'Placeholder City', // placeholder
    region: 'Placeholder State', // placeholder
    postalCode: '000000', // placeholder
    country: 'India',
  },

  hours: [
    { days: 'Monday – Friday', time: '09:30 – 18:30' }, // placeholder: confirm actual hours
    { days: 'Saturday', time: '10:00 – 15:00' }, // placeholder: confirm actual hours
    { days: 'Sunday', time: 'Closed' },
  ],

  social: {
    facebook: '#', // placeholder
    instagram: '#', // placeholder
    linkedin: '#', // placeholder
    x: '#', // placeholder
    youtube: '#', // placeholder
  },

  /** Google Maps embed URL - placeholder (replace with the real office location). */
  mapEmbed:
    'https://www.google.com/maps?q=Placeholder%20City&output=embed',
} as const;
