import { FeedbackForm, QuestionGroup, PersonalIntermezzo, VakkenSelectorQuestion } from './types';
import { shortVersionIntermezzi } from './intermezzo';

export const shortVersion: FeedbackForm = {
  id: 'shortFeedbackForm',
  title: {
    EN: "Stephen's Quick Feedback Form",
    NL: "Stephen's Kort Feedbackformulier",
  },
  description: {
    EN: "A quick way to share your thoughts on our recent session. Your feedback is invaluable!",
    NL: "Een snelle manier om je gedachten over onze recente sessie te delen. Je feedback is onmisbaar!",
  },
  sections: [
    shortVersionIntermezzi[0], // Intro
    {
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
          type: 'vakkenSelector',
          label: {
            EN: 'Subject or Topic',
            NL: 'Vak of onderwerp',
          },
          required: true,
        } as VakkenSelectorQuestion,
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
    } as QuestionGroup,
    {
      id: 'quickExperience',
      title: {
        EN: 'Quick Lesson Feedback',
        NL: 'Snelle Les Feedback',
      },
      questions: [
        {
          id: 'overallRating',
          type: 'number',
          label: {
            EN: 'Overall rating of the lesson (1-5)',
            NL: 'Algemene beoordeling van de les (1-5)',
          },
          min: 1,
          max: 5,
          required: true,
        },
        {
          id: 'mostValuable',
          type: 'textarea',
          label: {
            EN: 'What was the most valuable aspect of our session?',
            NL: 'Wat was het meest waardevolle aspect van onze sessie?',
          },
          required: false,
        },
      ],
    } as QuestionGroup,
    shortVersionIntermezzi[1], // Fun Fact
    {
      id: 'quickSuggestion',
      title: {
        EN: 'Quick Suggestion',
        NL: 'Snelle Suggestie',
      },
      questions: [
        {
          id: 'quickImprovement',
          type: 'textarea',
          label: {
            EN: 'Any quick suggestion for improvement?',
            NL: 'Heb je een snelle suggestie voor verbetering?',
          },
          required: false,
        },
      ],
    } as QuestionGroup,
    {
      id: 'quickQuote',
      title: {
        EN: 'Quick Quote',
        NL: 'Snelle Quote',
      },
      questions: [
        {
          id: 'quoteConsent',
          type: 'multipleChoice',
          label: {
            EN: "Would you like to provide a quick quote about your experience?",
            NL: "Wil je een korte quote geven over je ervaring?",
          },
          options: [
            { value: 'yes', label: { EN: 'Yes', NL: 'Ja' } },
            { value: 'no', label: { EN: 'No', NL: 'Nee' } },
          ],
          required: true,
        },
        {
          id: 'quoteText',
          type: 'textarea',
          label: {
            EN: 'If yes, please write your quote here:',
            NL: 'Zo ja, schrijf hier je quote:',
          },
          required: false,
          conditional: {
            dependsOn: 'quoteConsent',
            showIf: 'value === "yes"',  // Changed to a string
          },
        },
      ],
    } as QuestionGroup,
  ],
  conclusion: {
    EN: "Thanks for your quick feedback! It's invaluable in helping me improve our sessions. I look forward to our next meeting!",
    NL: "Bedankt voor je snelle feedback! Het is onmisbaar om onze sessies te verbeteren. Ik kijk uit naar onze volgende ontmoeting!",
  },
};