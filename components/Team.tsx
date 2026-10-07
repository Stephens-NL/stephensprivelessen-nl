'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { team, type TeamMember } from '@/data/team';

/** Renders nothing until a member has publishConsent: true. */
export function Team({ members = team }: { members?: TeamMember[] }) {
  const t = useTranslations('tutoring.team');
  const shown = members.filter((m) => m.publishConsent);
  if (shown.length === 0) return null;

  return (
    <section className="py-24">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
        <p className="mb-12">{t('intro')}</p>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shown.map((m) => (
            <li key={m.firstName} className="flex flex-col items-center">
              <Image src={m.photo} alt={m.firstName} width={128} height={128} className="rounded-full mb-3" />
              <h3 className="font-semibold">{m.firstName}</h3>
              <p>{t('programme')}: {m.programme}</p>
              <p>{t('subjects')}: {m.subjects.join(', ')}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
