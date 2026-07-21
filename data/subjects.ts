import { Bilingual } from './types';

/**
 * The full breadth of academic, bookable tutoring subjects — primary school to
 * university. Music / photography / research workshops are intentionally excluded.
 *
 * Single source of truth for the "Het volledige vakkenpalet" section
 * (components/SubjectsPalette.tsx). Reconciled with TAXONOMIE.md.
 *
 * `group` is an i18n key; the human-readable group label lives in
 * messages/{nl,en}/about.json under `subjectsPalette.groups.<group>`.
 * Subject names are proper-noun-heavy and rarely translate, so they live here.
 */
export type SubjectGroupKey = 'exact' | 'data' | 'programming' | 'language';

export interface SubjectGroup {
  group: SubjectGroupKey;
  subjects: Bilingual[];
}

export const subjects: SubjectGroup[] = [
  {
    group: 'exact',
    subjects: [
      { NL: 'Wiskunde A/B/C/D', EN: 'Mathematics A/B/C/D' },
      { NL: 'Natuurkunde', EN: 'Physics' },
      { NL: 'Scheikunde', EN: 'Chemistry' },
      { NL: 'Biologie', EN: 'Biology' },
      { NL: 'Calculus', EN: 'Calculus' },
      { NL: 'Lineaire Algebra', EN: 'Linear Algebra' },
      { NL: 'Kansrekening', EN: 'Probability Theory' },
      { NL: 'Analyse', EN: 'Analysis' },
      { NL: 'Verzamelingenleer', EN: 'Set Theory' },
    ],
  },
  {
    group: 'data',
    subjects: [
      { NL: 'Statistiek', EN: 'Statistics' },
      { NL: 'Bedrijfsstatistiek', EN: 'Business Statistics' },
      { NL: 'Data-analyse', EN: 'Data Analysis' },
      { NL: 'SPSS', EN: 'SPSS' },
      { NL: 'R', EN: 'R' },
      { NL: 'Python', EN: 'Python' },
      { NL: 'Scriptiebegeleiding', EN: 'Thesis Supervision' },
    ],
  },
  {
    group: 'programming',
    subjects: [
      { NL: 'Python', EN: 'Python' },
      { NL: 'R', EN: 'R' },
      { NL: 'Java', EN: 'Java' },
      { NL: 'C', EN: 'C' },
      { NL: 'C++', EN: 'C++' },
      { NL: 'C#', EN: 'C#' },
      { NL: 'JavaScript', EN: 'JavaScript' },
      { NL: 'React', EN: 'React' },
      { NL: 'SQL', EN: 'SQL' },
      { NL: 'MATLAB', EN: 'MATLAB' },
      { NL: 'HTML', EN: 'HTML' },
      { NL: 'CSS', EN: 'CSS' },
    ],
  },
  {
    group: 'language',
    subjects: [
      { NL: 'Engels', EN: 'English' },
      { NL: 'Nederlands', EN: 'Dutch' },
      { NL: 'Economie', EN: 'Economics' },
      { NL: 'M&O', EN: 'Management & Organization' },
      { NL: 'Bedrijfseconomie', EN: 'Business Economics' },
      { NL: 'Rekenen (basis/mbo)', EN: 'Arithmetic (primary/vocational)' },
    ],
  },
];
