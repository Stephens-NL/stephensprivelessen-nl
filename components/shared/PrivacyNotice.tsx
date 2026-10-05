'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

/** One line under a submit button that posts personal data; links the privacy statement (no checkbox: GDPR art. 13 notice). */
export default function PrivacyNotice({ className = '' }: { className?: string }) {
  const t = useTranslations('common');
  return (
    <p className={`text-sm text-center mt-3 ${className}`}>
      {t.rich('privacyNotice', {
        link: (c) => (
          <Link href="/privacy" className="underline">
            {c}
          </Link>
        ),
      })}
    </p>
  );
}
