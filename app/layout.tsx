import {Cormorant_Garamond, Outfit} from 'next/font/google';
import Script from 'next/script';
import {organizationSchema, websiteSchema} from '@/lib/structured-data';

import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${cormorant.variable} ${outfit.variable} font-body`} suppressHydrationWarning>
      <head />
      <body>
        <Script id="organization-ld+json" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(organizationSchema)}
        </Script>
        <Script id="website-ld+json" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(websiteSchema)}
        </Script>
        {children}
      </body>
    </html>
  );
}
