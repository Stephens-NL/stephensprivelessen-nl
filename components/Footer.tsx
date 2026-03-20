// src/components/Footer.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { config } from '@/data/config';

const serviceLinks = [
    { href: '/privelessen' as const, key: 'services.tutoring' },
    { href: '/scriptiebegeleiding' as const, key: 'services.thesisSupervision' },
    { href: '/workshops' as const, key: 'services.workshops' },
    { href: '/consultancy' as const, key: 'services.consultancy' },
] as const;

const infoLinks = [
    { href: '/about' as const, key: 'info.about' },
    { href: '/blog' as const, key: 'info.blog' },
    { href: '/faq' as const, key: 'info.faq' },
    { href: '/contact' as const, key: 'info.contact' },
] as const;

const Footer = () => {
  const t = useTranslations('common');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--ink)] text-[var(--cream)] py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Title and Description */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.title')}</h3>
            <p className="text-[var(--cream-dark)]">{t('footer.description')}</p>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.servicesLabel')}</h3>
            <ul className="space-y-2">
              {serviceLinks.map(({ href, key }) => (
                <li key={href}>
                  <Link href={href} className="text-[var(--cream-dark)] hover:text-[var(--amber)] transition">
                    {t(`footer.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.infoLabel')}</h3>
            <ul className="space-y-2">
              {infoLinks.map(({ href, key }) => (
                <li key={href}>
                  <Link href={href} className="text-[var(--cream-dark)] hover:text-[var(--amber)] transition">
                    {t(`footer.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contactLabel')}</h3>
            <a href={`mailto:${config.contact.email}`} className="block text-[var(--cream-dark)] hover:text-[var(--amber)] transition">
              Email: {config.contact.email}
            </a>
            <a href={config.contact.display.href} className="block text-[var(--cream-dark)] hover:text-[var(--amber)] transition">
              Tel: {config.contact.display.phone}
            </a>
            <a href={config.business.mainOffice.googleMapsUrl} className="block text-[var(--cream-dark)] hover:text-[var(--amber)] transition mt-2">
              {config.business.mainOffice.address}, {config.business.mainOffice.postalCode} {config.business.mainOffice.city}
            </a>
            <div className="mt-4 flex space-x-4">
              {/* Social Media Icons */}
              <a href={config.social.instagram} className="text-[var(--cream-dark)] hover:text-[var(--amber)] transition">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 border-t border-[var(--ink-light)] pt-8 text-center">
          <p className="text-[var(--cream-dark)]">
            &copy; {currentYear} {t('footer.title')}. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
