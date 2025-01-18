import { TranslationFunction } from '@/hooks/useTranslation';

interface Subject {
  NL: string;
  EN: string;
}

interface BusinessData {
  subjects: {
    primary: Subject[];
    secondary: Subject[];
    higher: Subject[];
    programming: Subject[];
  };
}

export function getBusinessData(t: TranslationFunction): BusinessData {
  return {
    subjects: {
      primary: [
        { NL: 'Rekenen', EN: 'Mathematics' },
        { NL: 'Taal', EN: 'Language' },
        { NL: 'Spelling', EN: 'Spelling' },
        { NL: 'Begrijpend Lezen', EN: 'Reading Comprehension' },
        { NL: 'Engels', EN: 'English' },
        { NL: 'Wereldoriëntatie', EN: 'World Orientation' }
      ],
      secondary: [
        { NL: 'Wiskunde', EN: 'Mathematics' },
        { NL: 'Nederlands', EN: 'Dutch' },
        { NL: 'Engels', EN: 'English' },
        { NL: 'Frans', EN: 'French' },
        { NL: 'Duits', EN: 'German' },
        { NL: 'Natuurkunde', EN: 'Physics' },
        { NL: 'Scheikunde', EN: 'Chemistry' },
        { NL: 'Biologie', EN: 'Biology' },
        { NL: 'Economie', EN: 'Economics' },
        { NL: 'Geschiedenis', EN: 'History' },
        { NL: 'Aardrijkskunde', EN: 'Geography' }
      ],
      higher: [
        { NL: 'Wiskunde', EN: 'Mathematics' },
        { NL: 'Statistiek', EN: 'Statistics' },
        { NL: 'Economie', EN: 'Economics' },
        { NL: 'Bedrijfskunde', EN: 'Business Administration' },
        { NL: 'Marketing', EN: 'Marketing' },
        { NL: 'Communicatie', EN: 'Communication' }
      ],
      programming: [
        { NL: 'Python', EN: 'Python' },
        { NL: 'JavaScript', EN: 'JavaScript' },
        { NL: 'HTML/CSS', EN: 'HTML/CSS' },
        { NL: 'React', EN: 'React' },
        { NL: 'TypeScript', EN: 'TypeScript' }
      ]
    }
  };
} 