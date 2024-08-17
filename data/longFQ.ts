import { FeedbackForm, QuestionGroup, PersonalIntermezzo, VakkenSelectorQuestion } from './types';
import { longVersionIntermezzi } from './intermezzo';

export const longVersion: FeedbackForm = {
  id: 'longFeedbackForm',
  title: {
    EN: "Stephen's Detailed Feedback Form",
    NL: "Stephen's Uitgebreid Feedbackformulier",
  },
  description: {
    EN: "Welcome to my detailed feedback form. Your insights are invaluable in helping me improve and tailor my teaching methods. Thank you for taking the time to share your thoughts!",
    NL: "Welkom bij mijn uitgebreide feedbackformulier. Jouw inzichten zijn onmisbaar om mijn onderwijsmethoden te verbeteren en aan te passen. Bedankt dat je de tijd neemt om je gedachten te delen!",
  },
  sections: [
    longVersionIntermezzi[0], // Intro
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
    longVersionIntermezzi[1], // Hobbies
    {
      id: 'experience',
      title: {
        EN: 'Lesson Experience',
        NL: 'Leservaring',
      },
      questions: [
        {
          id: 'overallQuality',
          type: 'number',
          label: {
            EN: 'Overall quality of the lessons/guidance',
            NL: 'Algehele kwaliteit van de lessen/begeleiding',
          },
          min: 1,
          max: 5,
          required: true,
        },
        {
          id: 'expectationsMet',
          type: 'number',
          label: {
            EN: 'How well did the content meet your expectations?',
            NL: 'In hoeverre voldeed de inhoud aan je verwachtingen?',
          },
          min: 1,
          max: 5,
          required: true,
        },
        {
          id: 'clarity',
          type: 'number',
          label: {
            EN: 'Clarity of explanation',
            NL: 'Duidelijkheid van de uitleg',
          },
          min: 1,
          max: 5,
          required: true,
        },
        {
          id: 'effectiveness',
          type: 'number',
          label: {
            EN: 'Effectiveness in improving your skills/knowledge',
            NL: 'Effectiviteit in het verbeteren van je vaardigheden/kennis',
          },
          min: 1,
          max: 5,
          required: true,
        },
        {
          id: 'interaction',
          type: 'number',
          label: {
            EN: 'Interaction and communication during lessons',
            NL: 'Interactie en communicatie tijdens de lessen',
          },
          min: 1,
          max: 5,
          required: true,
        },
        {
          id: 'accessibility',
          type: 'number',
          label: {
            EN: 'Accessibility and helpfulness of the tutor',
            NL: 'Toegankelijkheid en behulpzaamheid van de docent',
          },
          min: 1,
          max: 5,
          required: true,
        },
      ],
    } as QuestionGroup,
    longVersionIntermezzi[2], // Photos
    {
      id: 'specificFeedback',
      title: {
        EN: 'Specific Feedback and Suggestions',
        NL: 'Specifieke Feedback en Suggesties',
      },
      questions: [
        {
          id: 'mostValuable',
          type: 'textarea',
          label: {
            EN: 'What did you find most valuable about the lessons/guidance?',
            NL: 'Wat vond je het meest waardevol aan de lessen/begeleiding?',
          },
          required: false,
        },
        {
          id: 'improvements',
          type: 'textarea',
          label: {
            EN: 'Are there any areas that you think could be improved?',
            NL: 'Zijn er specifieke onderdelen die volgens jou verbeterd kunnen worden?',
          },
          required: false,
        },
        {
          id: 'suggestions',
          type: 'textarea',
          label: {
            EN: 'Do you have any suggestions for future topics or methods?',
            NL: 'Heb je suggesties voor nieuwe onderwerpen of methodes in de toekomst?',
          },
          required: false,
        },
        {
          id: 'dataApproach',
          type: 'textarea',
          label: {
            EN: 'How do you feel about incorporating more data-driven approaches in our lessons?',
            NL: 'Hoe sta je tegenover het integreren van meer datagedreven benaderingen in onze lessen?',
          },
          required: false,
        },
      ],
    } as QuestionGroup,
    {
      id: 'personalQuote',
      title: {
        EN: 'Personal Quote and Permission',
        NL: 'Persoonlijke Quote en Toestemming',
      },
      questions: [
        {
          id: 'quoteConsent',
          type: 'multipleChoice',
          label: {
            EN: "Would you like to provide a quote about your experience for my website?",
            NL: "Zou je een quote willen geven over je ervaring voor mijn website?",
          },
          options: [
            { value: 'text', label: { EN: 'Yes, written quote', NL: 'Ja, geschreven quote' } },
            { value: 'audio', label: { EN: 'Yes, audio quote', NL: 'Ja, ingesproken quote' } },
            { value: 'no', label: { EN: 'No', NL: 'Nee' } },
          ],
          required: true,
        },
        {
          id: 'quoteText',
          type: 'textarea',
          label: {
            EN: 'If yes, please write your quote here:',
            NL: 'Als ja, schrijf hier je quote:',
          },
          required: false,
        },
        {
          id: 'quoteAudio',
          type: 'text',
          label: {
            EN: 'If you prefer to give an audio quote, please send your audio recording to feedback@example.com or use this link https://example.com/audio-upload to record directly.',
            NL: 'Als je liever een audio quote geeft, stuur je audio-opname dan naar feedback@example.com of gebruik deze link https://example.com/audio-upload om direct op te nemen.',
          },
          required: false,
        },
        {
          id: 'nameConsent',
          type: 'multipleChoice',
          label: {
            EN: 'Can this quote be used with your name?',
            NL: 'Mag deze quote gebruikt worden met je naam?',
          },
          options: [
            { value: 'yes', label: { EN: 'Yes', NL: 'Ja' } },
            { value: 'initials', label: { EN: 'Initials only', NL: 'Alleen initialen' } },
            { value: 'no', label: { EN: 'No', NL: 'Nee' } },
          ],
          required: true,
        },
        {
          id: 'photoConsent',
          type: 'multipleChoice',
          label: {
            EN: "Would you like your quote to be posted with a photo on the website or social media?",
            NL: "Zou je je quote willen posten met een foto op de website of sociale media?",
          },
          options: [
            { value: 'yesWithPhoto', label: { EN: 'Yes, with photo', NL: 'Ja, met foto' } },
            { value: 'yesWithoutPhoto', label: { EN: 'Yes, without photo', NL: 'Ja, zonder foto' } },
            { value: 'no', label: { EN: 'No', NL: 'Nee' } },
          ],
          required: true,
        },
        {
          id: 'photoChoice',
          type: 'multipleChoice',
          label: {
            EN: 'If yes, would you prefer to provide your own photo or use one from our session?',
            NL: 'Zo ja, wil je zelf een foto aanleveren of mag er een foto van onze sessie gebruikt worden?',
          },
          options: [
            { value: 'selfUpload', label: { EN: 'I will provide my own photo', NL: 'Ik stuur zelf een foto op' } },
            { value: 'sessionPhoto', label: { EN: 'Use a photo from our session', NL: 'Gebruik een foto van onze sessie' } },
          ],
          required: false,
        },
      ],
    } as QuestionGroup,
    longVersionIntermezzi[3], // Conclusion
  ],
  conclusion: {
    EN: "Thank you for taking the time to provide this valuable feedback. Your insights will help me improve and tailor my teaching methods. I look forward to our continued collaboration!",
    NL: "Bedankt dat je de tijd hebt genomen om deze waardevolle feedback te geven. Jouw inzichten zullen me helpen mijn onderwijsmethoden te verbeteren en aan te passen. Ik kijk uit naar onze voortgezette samenwerking!",
  },
};