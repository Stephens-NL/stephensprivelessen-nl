export type QuestionType = 'text' | 'multipleChoice' | 'email' | 'number';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  label: {
    en: string;
    nl: string;
  };
  required: boolean;
}

export interface TextQuestion extends BaseQuestion {
  type: 'text' | 'email';
  placeholder?: {
    en: string;
    nl: string;
  };
}

export interface NumberQuestion extends BaseQuestion {
  type: 'number';
  min?: number;
  max?: number;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multipleChoice';
  options: {
    value: string;
    label: {
      en: string;
      nl: string;
    };
  }[];
}

export type Question = TextQuestion | NumberQuestion | MultipleChoiceQuestion;

export interface QuestionGroup {
  id: string;
  title: {
    en: string;
    nl: string;
  };
  questions: Question[];
}

export const generalQuestions: QuestionGroup = {
  id: 'general',
  title: {
    en: 'General Information',
    nl: 'Algemene Informatie',
  },
  questions: [
    {
      id: 'learnerName',
      type: 'text',
      label: {
        en: "Learner's Name",
        nl: 'Naam van de leerling',
      },
      required: true,
    },
    {
      id: 'subject',
      type: 'text',
      label: {
        en: 'Subject or Topic',
        nl: 'Vak of onderwerp',
      },
      required: true,
    },
    {
      id: 'userType',
      type: 'multipleChoice',
      label: {
        en: 'Who is filling out this form?',
        nl: 'Wie vult dit formulier in?',
      },
      options: [
        { value: 'student', label: { en: 'Student', nl: 'Student' } },
        { value: 'guardian', label: { en: 'Guardian', nl: 'Voogd' } },
        { value: 'company', label: { en: 'Company', nl: 'Bedrijf' } },
      ],
      required: true,
    },
  ],
};

export const studentQuestions: QuestionGroup = {
  id: 'student',
  title: {
    en: 'Student Information',
    nl: 'Studentinformatie',
  },
  questions: [
    {
      id: 'studentPhone',
      type: 'text',
      label: {
        en: 'Your Phone Number',
        nl: 'Jouw telefoonnummer',
      },
      required: true,
    },
    {
      id: 'studentEmail',
      type: 'email',
      label: {
        en: 'Your Email',
        nl: 'Jouw e-mail',
      },
      required: true,
    },
  ],
};

export const guardianQuestions: QuestionGroup = {
  id: 'guardian',
  title: {
    en: 'Guardian Information',
    nl: 'Voogdinformatie',
  },
  questions: [
    {
      id: 'guardianName',
      type: 'text',
      label: {
        en: 'Your Name',
        nl: 'Uw naam',
      },
      required: true,
    },
    {
      id: 'guardianPhone',
      type: 'text',
      label: {
        en: 'Your Phone Number',
        nl: 'Uw telefoonnummer',
      },
      required: true,
    },
    {
      id: 'studentPhone',
      type: 'text',
      label: {
        en: "Student's Phone Number",
        nl: 'Telefoonnummer van de student',
      },
      required: false,
    },
    {
      id: 'guardianEmail',
      type: 'email',
      label: {
        en: 'Your Email',
        nl: 'Uw e-mail',
      },
      required: true,
    },
  ],
};

export const companyQuestions: QuestionGroup = {
  id: 'company',
  title: {
    en: 'Company Information',
    nl: 'Bedrijfsinformatie',
  },
  questions: [
    {
      id: 'companyName',
      type: 'text',
      label: {
        en: 'Company Name',
        nl: 'Bedrijfsnaam',
      },
      required: true,
    },
    {
      id: 'kvkNumber',
      type: 'text',
      label: {
        en: 'KvK Number',
        nl: 'KvK-nummer',
      },
      required: true,
    },
    {
      id: 'vatId',
      type: 'text',
      label: {
        en: 'VAT ID',
        nl: 'BTW-nummer',
      },
      required: true,
    },
    {
      id: 'iban',
      type: 'text',
      label: {
        en: 'IBAN',
        nl: 'IBAN',
      },
      required: true,
    },
    {
      id: 'contactPersonName',
      type: 'text',
      label: {
        en: "Contact Person's Name",
        nl: 'Naam contactpersoon',
      },
      required: true,
    },
    {
      id: 'contactPersonPhone',
      type: 'text',
      label: {
        en: "Contact Person's Phone Number",
        nl: 'Telefoonnummer contactpersoon',
      },
      required: true,
    },
    {
      id: 'contactPersonEmail',
      type: 'email',
      label: {
        en: 'Email',
        nl: 'E-mail',
      },
      required: true,
    },
  ],
};
