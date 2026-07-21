import {
  BASIS,
  VO,
  HO,
  PROG,
  buildSearchIndex,
  searchSubjects,
  scoreOf,
  variants,
  gloss,
  type LevelKey,
} from '@/data/subjects';

const LABELS: Record<LevelKey, string> = {
  basis: 'Basisschool',
  vo: 'Voortgezet',
  ho: 'Hoger onderwijs',
  prog: 'Programmeren',
};

describe('subjects data integrity', () => {
  it('every HO subsection count matches its chip list', () => {
    HO.forEach((disc) =>
      disc.subsections.forEach((sub) => {
        expect(sub.chips.length).toBe(sub.count);
      }),
    );
  });

  it('has 22 HO subsections across 4 disciplines', () => {
    expect(HO).toHaveLength(4);
    expect(HO.reduce((n, d) => n + d.subsections.length, 0)).toBe(22);
  });

  it('every basis/vo/prog list is non-empty', () => {
    expect(BASIS.length).toBeGreaterThan(0);
    expect(VO.length).toBeGreaterThan(0);
    expect(PROG.langs.length).toBe(9);
    BASIS.concat(VO).forEach((c) => expect(c.chips.length).toBeGreaterThan(0));
  });
});

describe('search index', () => {
  const index = buildSearchIndex(LABELS);

  it('indexes subjects from every level with breadcrumb paths', () => {
    const byName = (n: string) => index.find((e) => e.name === n);
    expect(byName('Calculus')?.path).toBe('Hoger onderwijs › Bèta & technische wiskunde › Analyse & Calculus');
    expect(byName('Wiskunde A')?.path).toBe('Voortgezet › Wiskunde');
    expect(byName('Cito-training')?.path).toBe('Basisschool › Rekenen');
  });

  it('deduplicates JavaScript (in both lang picker and web chips)', () => {
    expect(index.filter((e) => e.name === 'JavaScript')).toHaveLength(1);
  });
});

describe('fuzzy search', () => {
  const index = buildSearchIndex(LABELS);

  it('returns nothing for queries shorter than 2 chars', () => {
    expect(searchSubjects('a', index)).toEqual([]);
    expect(searchSubjects('', index)).toEqual([]);
  });

  it('finds a subject by substring and highlights the match', () => {
    const hits = searchSubjects('calc', index);
    const calculus = hits.find((h) => h.name === 'Calculus');
    expect(calculus).toBeDefined();
    expect(calculus?.seg).toEqual({ before: '', match: 'Calc', after: 'ulus' });
  });

  it('translates an English query to Dutch (probability → kansrekening)', () => {
    const names = searchSubjects('probability', index).map((h) => h.name);
    expect(names).toContain('Kansrekening');
  });

  it('returns an empty list for gibberish', () => {
    expect(searchSubjects('zzzzzz', index)).toEqual([]);
  });
});

describe('pure helpers', () => {
  it('scoreOf ranks substring above subsequence', () => {
    expect(scoreOf('cal', 'calculus')).toBeGreaterThan(scoreOf('cls', 'calculus'));
    expect(scoreOf('xyz', 'calculus')).toBe(-1);
  });

  it('variants expands known EN terms', () => {
    expect(variants('probability')).toContain('kansrekening');
    expect(variants('random')).toEqual(['random']);
  });

  it('gloss renders an English hint only when it differs', () => {
    expect(gloss('Lineaire Algebra 1')).toBe('Linear Algebra 1');
    expect(gloss('Kansrekening')).toBe('Probability');
    expect(gloss('Python')).toBe('');
  });
});
