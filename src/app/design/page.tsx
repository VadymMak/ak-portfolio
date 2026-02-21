import type { Metadata } from 'next';
import DesignHero from '@/components/design/DesignHero';
import DesignServices from '@/components/design/DesignServices';
import DesignPortfolio from '@/components/design/DesignPortfolio';
import DesignProcess from '@/components/design/DesignProcess';
import DesignTestimonials from '@/components/design/DesignTestimonials';
import DesignCTA from '@/components/design/DesignCTA';

export const metadata: Metadata = {
  title: 'Graphic Design & Branding',
  description:
    'Logo design, brand identity, packaging, labels, and visual communication for businesses across Europe. Based in Trenčín, Slovakia.',
  keywords: [
    'graphic design',
    'logo design',
    'brand identity',
    'label design',
    'packaging design',
    'branding Slovakia',
    'grafický dizajn',
    'tvorba loga',
  ],
  openGraph: {
    title: 'Graphic Design & Branding | Anastasiia Kolisnyk',
    description:
      'Logo design, brand identity, packaging, labels, and visual communication for businesses across Europe.',
    url: 'https://akillustrator.com/design',
  },
};

export default function DesignPage() {
  return (
    <>
      <DesignHero />
      <DesignServices />
      <DesignPortfolio />
      <DesignProcess />
      <DesignTestimonials />
      <DesignCTA />
    </>
  );
}
