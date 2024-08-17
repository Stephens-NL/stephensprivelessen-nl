import { FeedbackForm, QuestionGroup } from "./types";

export const generalQuestions: QuestionGroup = {
  id: 'general',
  title: {
    EN: 'General Information',
    NL: 'Algemene Informatie',
  },
  questions: [
    {
      id: 'learnerName',
      type: 'text',
      label: {
        EN: "Learner's Name",
        NL: 'Naam van de leerling',
      },
      required: true,
    },
    {
      id: 'subject',
      type: 'text',
      label: {
        EN: 'Subject or Topic',
        NL: 'Vak of onderwerp',
      },
      required: true,
    },
    {
      id: 'userType',
      type: 'multipleChoice',
      label: {
        EN: 'Who is filling out this form?',
        NL: 'Wie vult dit formulier in?',
      },
      options: [
        { value: 'student', label: { EN: 'Student', NL: 'Student' } },
        { value: 'guardian', label: { EN: 'Guardian', NL: 'Voogd' } },
        { value: 'company', label: { EN: 'Company', NL: 'Bedrijf' } },
      ],
      required: true,
    },
  ],
};

export const studentQuestions: QuestionGroup = {
  id: 'student',
  title: {
    EN: 'Student Information',
    NL: 'Studentinformatie',
  },
  questions: [
    {
      id: 'studentPhone',
      type: 'text',
      label: {
        EN: 'Your Phone Number',
        NL: 'Jouw telefoonnummer',
      },
      required: true,
    },
    {
      id: 'studentEmail',
      type: 'email',
      label: {
        EN: 'Your Email',
        NL: 'Jouw e-mail',
      },
      required: true,
    },
  ],
};

export const guardianQuestions: QuestionGroup = {
  id: 'guardian',
  title: {
    EN: 'Guardian Information',
    NL: 'Voogdinformatie',
  },
  questions: [
    {
      id: 'guardianName',
      type: 'text',
      label: {
        EN: 'Your Name',
        NL: 'Uw naam',
      },
      required: true,
    },
    {
      id: 'guardianPhone',
      type: 'text',
      label: {
        EN: 'Your Phone Number',
        NL: 'Uw telefoonnummer',
      },
      required: true,
    },
    {
      id: 'studentPhone',
      type: 'text',
      label: {
        EN: "Student's Phone Number",
        NL: 'Telefoonnummer van de student',
      },
      required: false,
    },
    {
      id: 'guardianEmail',
      type: 'email',
      label: {
        EN: 'Your Email',
        NL: 'Uw e-mail',
      },
      required: true,
    },
  ],
};

export const companyQuestions: QuestionGroup = {
  id: 'company',
  title: {
    EN: 'Company Information',
    NL: 'Bedrijfsinformatie',
  },
  questions: [
    {
      id: 'companyName',
      type: 'text',
      label: {
        EN: 'Company Name',
        NL: 'Bedrijfsnaam',
      },
      required: true,
    },
    {
      id: 'kvkNumber',
      type: 'text',
      label: {
        EN: 'KvK Number',
        NL: 'KvK-nummer',
      },
      required: true,
    },
    {
      id: 'vatId',
      type: 'text',
      label: {
        EN: 'VAT ID',
        NL: 'BTW-nummer',
      },
      required: true,
    },
    {
      id: 'iban',
      type: 'text',
      label: {
        EN: 'IBAN',
        NL: 'IBAN',
      },
      required: true,
    },
    {
      id: 'contactPersonName',
      type: 'text',
      label: {
        EN: "Contact Person's Name",
        NL: 'Naam contactpersoon',
      },
      required: true,
    },
    {
      id: 'contactPersonPhone',
      type: 'text',
      label: {
        EN: "Contact Person's Phone Number",
        NL: 'Telefoonnummer contactpersoon',
      },
      required: true,
    },
    {
      id: 'contactPersonEmail',
      type: 'email',
      label: {
        EN: 'Email',
        NL: 'E-mail',
      },
      required: true,
    },
  ],
};

