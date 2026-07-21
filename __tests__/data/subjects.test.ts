import { testComponentTranslations } from '../utils/testUtils';
import { subjects } from '@/data/subjects';

describe('Subjects palette data', () => {
  it('every subject chip has both NL and EN translations', () => {
    testComponentTranslations(subjects, 'SubjectsPalette');
  });

  it('has the four expected domain groups', () => {
    expect(subjects.map((g) => g.group)).toEqual([
      'exact',
      'data',
      'programming',
      'language',
    ]);
  });
});
