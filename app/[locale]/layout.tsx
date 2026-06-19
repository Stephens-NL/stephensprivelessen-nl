import {NextIntlClientProvider} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {Cormorant_Garamond, Outfit} from 'next/font/google';
import {routing} from '@/i18n/routing';
import {Viewport} from 'next';
import {MotionProvider} from '@/components/MotionProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import {organizationSchema, websiteSchema} from '@/lib/structured-data';
import {config} from '@/data/config';

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

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;

  const isNl = locale === 'nl';
  const siteUrl = config.business.siteUrl;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: isNl
        ? "Stephen's Privélessen | Wiskunde & Statistiek Bijles Amsterdam"
        : "Stephen's Private Tutoring | Math & Statistics Tutoring Amsterdam",
      template: isNl
        ? "%s | Stephen's Privélessen Amsterdam"
        : "%s | Stephen's Private Tutoring Amsterdam",
    },
    description: isNl
      ? 'Expert bijles in wiskunde, statistiek en programmeren in Amsterdam. Online of op Science Park. Van €75/uur. Scriptiebegeleiding, SPSS, R, Python. UvA & VU studenten.'
      : 'Expert tutoring in mathematics, statistics and programming in Amsterdam. Online or at Science Park. From €75/hr. Thesis supervision, SPSS, R, Python. UvA & VU students.',
    authors: [{name: 'Stephen Adei'}],
    creator: 'Stephen Adei',
    publisher: isNl ? "Stephen's Privélessen" : "Stephen's Private Tutoring",
    formatDetection: {email: false, address: true, telephone: true},
    icons: {
      icon: [
        {url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png'},
        {url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png'},
      ],
      apple: [{url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png'}],
    },
    manifest: '/favicon/site.webmanifest',
    alternates: {
      canonical: isNl ? '/' : '/en',
      languages: {
        'nl-NL': '/',
        'en-US': '/en',
      },
    },
    openGraph: {
      type: 'website' as const,
      locale: isNl ? 'nl_NL' : 'en_US',
      alternateLocale: isNl ? 'en_US' : 'nl_NL',
      siteName: isNl ? "Stephen's Privélessen" : "Stephen's Private Tutoring",
      title: isNl
        ? "Wiskunde & Statistiek Bijles Amsterdam | Stephen's Privélessen"
        : "Math & Statistics Tutoring Amsterdam | Stephen's Private Tutoring",
      description: isNl
        ? 'Expert bijles in wiskunde, statistiek en programmeren in Amsterdam.'
        : 'Expert tutoring in mathematics, statistics and programming in Amsterdam.',
      url: isNl ? 'https://stephensprivelessen.nl' : 'https://stephensprivelessen.nl/en',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(
            isNl ? 'Expert Bijles & Coaching' : 'Expert Tutoring & Coaching'
          )}&brandText=${encodeURIComponent('Stephensprivelessen.nl')}&buttonText=${encodeURIComponent(
            isNl ? 'Ontdek Meer' : 'Discover More'
          )}&footerText=${encodeURIComponent(
            isNl ? 'Wiskunde | Statistiek | Scriptie' : 'Math | Statistics | Thesis'
          )}&featureImageUrl=${encodeURIComponent('/images/og-default-banner.jpg')}`,
          width: 1200,
          height: 630,
          alt: isNl ? 'Expert Bijles & Coaching | Stephensprivelessen.nl' : 'Expert Tutoring & Coaching | Stephensprivelessen.nl',
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
      other: {
        'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
      },
    },
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${cormorant.variable} ${outfit.variable} font-body`} suppressHydrationWarning>
      <head />
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(organizationSchema)}}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(websiteSchema)}}
        />
        <NextIntlClientProvider>
          <MotionProvider>
            <Header />
            <WhatsAppButton />
            <main className="pt-14 lg:pt-[72px] bg-[var(--ink)]">{children}</main>
            <Footer />
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
