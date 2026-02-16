import { Metadata } from 'next';

import About from '@/components/sections/About';
import BooksIntro from '@/components/sections/BooksIntro';
import BooksSection from '@/components/sections/BooksSection';
import DesignBranding from '@/components/sections/DesignBranding';
import Testimonials from '@/components/sections/Testimonials';
import Services from '@/components/sections/Services';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://akillustrator.com',
  },
};

export default function HomePage() {
  return (
    <>
      <About />
      <BooksIntro />
      <BooksSection />
      <DesignBranding />
      <Testimonials />
      <Services />
    </>
  );
}
