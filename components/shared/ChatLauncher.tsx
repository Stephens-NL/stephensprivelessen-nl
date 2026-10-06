'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { FaComments } from 'react-icons/fa';
import { config } from '@/data/config';
import { openChat } from '@/lib/chatwoot';

export default function ChatLauncher() {
  const t = useTranslations('common');
  const locale = useLocale();
  const [failed, setFailed] = useState(false);
  if (!config.chat.websiteToken) return null; // no inbox yet: no launcher

  return (
    <div className="fixed bottom-36 right-6 z-30 flex flex-col items-end gap-2">
      {failed && (
        <p role="status" className="max-w-xs rounded-lg border border-[var(--border-warm)] bg-[var(--cream)] px-4 py-3 text-sm text-[var(--ink)] shadow-lg">
          {t('chatUnavailable')}{' '}
          {/* /go/whatsapp is a route handler (redirect), not a page: Link would prefetch/soft-navigate it */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/go/whatsapp" className="underline">WhatsApp</a>
          {' · '}
          <a href={`mailto:${config.contact.email}`} className="underline">{config.contact.email}</a>
        </p>
      )}
      <button
        type="button"
        onClick={() => {
          setFailed(false);
          openChat(config.chat.websiteToken, locale, () => setFailed(true));
        }}
        className="flex items-center gap-2.5 rounded-full bg-[var(--ink)] py-3 pl-4 pr-5 text-[var(--cream)] shadow-lg shadow-black/15 transition-all duration-300 hover:shadow-xl hover:shadow-black/20"
      >
        <FaComments aria-hidden="true" className="text-lg" />
        <span className="text-sm font-medium">{t('chatLabel')}</span>
      </button>
    </div>
  );
}
