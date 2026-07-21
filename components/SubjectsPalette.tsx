'use client';

import React, { useMemo, useState, CSSProperties } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { m } from 'framer-motion';
import {
  LEVELS,
  BASIS,
  VO,
  HO,
  PROG,
  SNIP,
  buildSearchIndex,
  searchSubjects,
  type LevelKey,
  type SubjectCard,
} from '@/data/subjects';
import styles from './SubjectsPalette.module.css';

const accentStyle = (accent: string) => ({ ['--accent']: accent } as CSSProperties);

/** basis/vo card: heading + who-line + chip list. */
const Card = ({ card, big }: { card: SubjectCard; big?: boolean }) => (
  <div className={`${styles.cell}${big ? ` ${styles.big}` : ''}`} style={accentStyle(card.accent)}>
    <h3>
      <span className={styles.icon}>{card.icon}</span>
      {card.title}
    </h3>
    <p className={styles.who}>{card.who}</p>
    <ul className={styles.chips}>
      {card.chips.map((c) => (
        <li key={c} className={styles.chip}>
          {c}
        </li>
      ))}
    </ul>
  </div>
);

const SubjectsPalette = () => {
  const t = useTranslations('about');
  const locale = useLocale();

  const [level, setLevel] = useState<LevelKey>('vo');
  const [lang, setLang] = useState<string>('python');
  const [query, setQuery] = useState('');

  const levelLabel = (key: LevelKey) => t(`subjectsPalette.levels.${key}.label`);

  const index = useMemo(
    () =>
      buildSearchIndex({
        basis: levelLabel('basis'),
        vo: levelLabel('vo'),
        ho: levelLabel('ho'),
        prog: levelLabel('prog'),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale],
  );

  const searching = query.trim().length >= 2;
  const results = useMemo(() => (searching ? searchSubjects(query, index) : []), [searching, query, index]);

  // All levels stay in the DOM (crawlable / no-JS); inactive ones are
  // display:none via styles.hidden. The active level plays the framer viewIn
  // entrance; switching away is an instant cross-fade (accepted trade-off).
  const hidden = { opacity: 0, scale: 0.98, y: 8, filter: 'blur(2px)' };
  const shown = { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' };

  const renderView = (lvl: LevelKey) => {
    if (lvl === 'basis') {
      return (
        <div className={`${styles.grid} ${styles.gBasis}`}>
          {BASIS.map((card) => (
            <Card key={card.title} card={card} big />
          ))}
        </div>
      );
    }
    if (lvl === 'vo') {
      return (
        <div className={`${styles.grid} ${styles.gVo}`}>
          {VO.map((card) => (
            <Card key={card.title} card={card} />
          ))}
        </div>
      );
    }
    if (lvl === 'ho') {
      return (
        <>
          <p className={styles.hoNote}>{t('subjectsPalette.hoNote')}</p>
          <div className={`${styles.grid} ${styles.gHo}`}>
            {HO.map((disc, di) => (
              <div key={disc.laneTitle} className={`${styles.cell} ${styles.disc}`} style={accentStyle(disc.accent)}>
                <div className={styles.discHead}>
                  <span className={styles.laneT}>{disc.laneTitle}</span>
                  <span className={styles.laneW}>{disc.laneWhich}</span>
                </div>
                {disc.subsections.map((sub, si) => (
                  <details key={sub.label} className={styles.subsec} open={di === 0 && si === 0}>
                    <summary>
                      {sub.label} · {sub.count} vakken
                    </summary>
                    <ul className={styles.chips}>
                      {sub.chips.map((c) => (
                        <li key={c} className={styles.chip}>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            ))}
          </div>
        </>
      );
    }
    // prog
    return (
      <div className={`${styles.grid} ${styles.gProg}`}>
        <div className={`${styles.cell} ${styles.big}`} style={accentStyle(PROG.accent)}>
          <h3>
            <span className={styles.icon}>{PROG.icon}</span>
            {PROG.title}
          </h3>
          <p className={styles.who}>{PROG.who}</p>
          <div className={`${styles.chips} ${styles.langpick}`}>
            {PROG.langs.map((l) => (
              <button
                key={l.id}
                type="button"
                className={`${styles.chip} ${styles.lang}${lang === l.id ? ` ${styles.active}` : ''}`}
                aria-pressed={lang === l.id}
                onClick={() => setLang(l.id)}
              >
                {l.label}
              </button>
            ))}
          </div>
          <pre className={styles.codebox}>
            {/* ponytail: static author-controlled snippet, no user input → dangerouslySetInnerHTML is safe here */}
            <code key={lang} dangerouslySetInnerHTML={{ __html: SNIP[lang] }} />
          </pre>
          <p className={styles.webnote}>
            {t('subjectsPalette.webnote')}
            {PROG.web.map((w) => (
              <span key={w} className={styles.chip}>
                {w}
              </span>
            ))}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section className={styles.palette}>
      <div className={styles.page}>
        <div className={styles.head}>
          <div className={styles.eyebrow}>{t('subjectsPalette.eyebrow')}</div>
          <h2>{t('subjectsPalette.title')}</h2>
          <div className={styles.subline}>{t('subjectsPalette.subline')}</div>
          <div className={styles.anchor}>
            <span className={styles.dot} />
            {t('subjectsPalette.anchor')}
          </div>
        </div>

        <div className={styles.search}>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('subjectsPalette.searchPlaceholder')}
            aria-label={t('subjectsPalette.searchLabel')}
            autoComplete="off"
          />
        </div>

        {searching ? (
          <div className={styles.results}>
            {results.length > 0 ? (
              results.map((r) => (
                <div key={`${r.name}|${r.path}`} className={styles.res}>
                  <span className={styles.rname}>
                    {r.seg ? (
                      <>
                        {r.seg.before}
                        <mark>{r.seg.match}</mark>
                        {r.seg.after}
                      </>
                    ) : (
                      r.name
                    )}
                  </span>
                  {r.gloss && <span className={styles.en}>{r.gloss}</span>}
                  <span className={styles.crumb}>{r.path}</span>
                </div>
              ))
            ) : (
              <div className={styles.resEmpty}>{t('subjectsPalette.empty')}</div>
            )}
          </div>
        ) : (
          <>
            <div className={styles.selector} role="tablist" aria-label={t('subjectsPalette.selectorLabel')}>
              {LEVELS.map(({ key, emoji }) => {
                const lv = t(`subjectsPalette.levels.${key}.lv`);
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={level === key}
                    className={styles.seg}
                    onClick={() => setLevel(key)}
                  >
                    {emoji} {levelLabel(key)}
                    {lv && <span className={styles.lv}>{lv}</span>}
                  </button>
                );
              })}
            </div>

            <div className={styles.stage}>
              {LEVELS.map(({ key }) => (
                <m.div
                  key={key}
                  role="tabpanel"
                  className={level === key ? undefined : styles.hidden}
                  initial={false}
                  animate={level === key ? shown : hidden}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {renderView(key)}
                </m.div>
              ))}
            </div>

            <p className={styles.hint}>{t('subjectsPalette.hint')}</p>
          </>
        )}
      </div>
    </section>
  );
};

export default SubjectsPalette;
