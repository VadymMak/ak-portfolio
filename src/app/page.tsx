import { Metadata } from 'next';

import About from '@/components/sections/About';
import BooksIntro from '@/components/sections/BooksIntro';
// import BooksGallery from '@/components/sections/BooksGallery';
// import DesignBranding from '@/components/sections/DesignBranding';
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

      <section id="books">
        {/* <BooksGallery /> */}
        <div style={{ padding: '8rem 2rem', textAlign: 'center' }}>
          <h2>Children&apos;s Books Gallery — Coming Next</h2>
          <p>6 book sections: Magic World, Nutcracker, Sea Secrets, Sigurd, Wild Swans, Winter Adventures</p>
        </div>
      </section>

      <section id="design-branding">
        {/* <DesignBranding /> */}
        <div style={{ padding: '8rem 2rem', textAlign: 'center' }}>
          <h2>Design &amp; Branding — Coming Next</h2>
          <p>Tabbed: Labels, Logos, Branding</p>
        </div>
      </section>

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
