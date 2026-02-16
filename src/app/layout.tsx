import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import ClientLayout from '@/components/layout/ClientLayout';
import '@/styles/globals.css';

// Fonts — matching current site exactly
const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://akillustrator.com'),
  title: {
    default: 'Anastasiia Kolisnyk | Children\'s Book Illustrator & Visual Designer',
    template: '%s | Anastasiia Kolisnyk',
  },
  description:
    'Children\'s book illustrator creating warm, heartfelt illustrations for picture books, covers, and characters. Also specializing in branding, label design, and visual identity. Based in Trenčín, Slovakia.',
  keywords: [
    'illustrator',
    'children\'s book illustrator',
    'graphic designer',
    'label design',
    'logo design',
    'branding',
    'Slovakia',
    'Trenčín',
    'book illustration',
    'packaging design',
    'visual identity',
  ],
  authors: [{ name: 'Anastasiia Kolisnyk' }],
  creator: 'Anastasiia Kolisnyk',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://akillustrator.com',
    siteName: 'Anastasiia Kolisnyk Portfolio',
    title: 'Anastasiia Kolisnyk | Children\'s Book Illustrator & Visual Designer',
    description:
      'Children\'s book illustrator creating warm, heartfelt illustrations for picture books, covers, and characters. Branding & visual design.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Anastasiia Kolisnyk — Children\'s Book Illustrator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anastasiia Kolisnyk | Children\'s Book Illustrator & Visual Designer',
    description:
      'Children\'s book illustrator creating warm, heartfelt illustrations for picture books, covers, and characters.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google02f9873c904396b1',
  },
};

export const viewport: Viewport = {
  themeColor: '#2D4A43',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      translate="no"
      className={`${cormorantGaramond.variable} ${montserrat.variable}`}
    >
      <Script
  src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
  strategy="lazyOnload"
/>
      <head>
        {/* Google Analytics 4 */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-Q4CMBHFQ2E"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Q4CMBHFQ2E');
            `,
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
