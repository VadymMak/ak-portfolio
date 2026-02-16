import { Metadata } from 'next';

import About from '@/components/sections/About';
import BooksIntro from '@/components/sections/BooksIntro';
import BooksSection from '@/components/sections/BooksSection';
import DesignBranding from '@/components/sections/DesignBranding';
// import Testimonials from '@/components/sections/Testimonials';
// import Services from '@/components/sections/Services';
// import Contact from '@/components/sections/Contact';

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

      <section id="testimonials">
        {/* <Testimonials /> */}
        <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <h2>Testimonials — Coming Next</h2>
          <p>3 clients: Star Food, Baloon Party, Laser Craft</p>
        </div>
      </section>

      <section id="services">
        {/* <Services /> */}
        <div style={{ padding: '8rem 2rem', textAlign: 'center' }}>
          <h2>Services — Coming Next</h2>
          <p>6 service types</p>
        </div>
      </section>

      <section id="contact">
        {/* <Contact /> */}
        <div style={{ padding: '8rem 2rem', textAlign: 'center' }}>
          <h2>Contact — Coming Next</h2>
        </div>
      </section>
    </>
  );
}
