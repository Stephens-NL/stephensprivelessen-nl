import { useTranslations } from 'next-intl';

export default function RushNote() {
  const t = useTranslations('common.rush');
  return (
    <section className="py-8 bg-[var(--cream)]">
      <p className="container mx-auto px-6 max-w-3xl text-sm text-center text-[var(--muted-text)] leading-relaxed">
        <strong>{t('title')}</strong>{' '}
        {t.rich('body', { b: (c) => <strong>{c}</strong> })}
      </p>
    </section>
  );
}
