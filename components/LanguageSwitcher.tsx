'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === 'nl' ? 'en' : 'nl';

  return (
    <Link
      href={pathname}
      locale={otherLocale}
      className="text-sm font-medium hover:text-[var(--amber)] transition-colors"
    >
      {otherLocale.toUpperCase()}
    </Link>
  );
}
