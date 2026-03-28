'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { getOtherLocale } from '@/hooks/useLanguage';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = getOtherLocale(locale);

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
