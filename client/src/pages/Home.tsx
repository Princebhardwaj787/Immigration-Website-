import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import TrustStrip from '@/components/home/TrustStrip';
import VisaCategories from '@/components/home/VisaCategories';
import Destinations from '@/components/home/Destinations';
import WhyUs from '@/components/home/WhyUs';
import EligibilityPreview from '@/components/home/EligibilityPreview';
import Process from '@/components/home/Process';
import Testimonials from '@/components/home/Testimonials';
import BlogSection from '@/components/home/BlogSection';
import FaqSection from '@/components/home/FaqSection';
import FinalCta from '@/components/home/FinalCta';
import Seo from '@/components/ui/Seo';
import { SITE } from '@/data/site';

export default function Home() {
  return (
    <>
      <Seo
        title={undefined}
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE.name,
          url: SITE.url,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${SITE.url}/blog?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        }}
      />
      <Hero />
      <Stats />
      <TrustStrip />
      <VisaCategories />
      <Destinations />
      <WhyUs />
      <EligibilityPreview />
      <Process />
      <Testimonials />
      <BlogSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}
