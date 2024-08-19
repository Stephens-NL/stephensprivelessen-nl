import {
    FeedbackForm,
    QuestionGroup,
    Question,
    Bilingual,
    TextQuestion,
    NumberQuestion,
    BaseQuestion,
    MultipleChoiceQuestion,
    VakkenSelectorQuestion,
    RatingQuestion,
    PersonalIntermezzo
} from './types2';
import { shortVersionIntermezzi, longVersionIntermezzi } from './intermezzo';

const createQuestion = (
    id: string,
    type: Question['type'],
    question: Bilingual,
    required: boolean,
    options?: { value: string; label: Bilingual }[],
    conditional?: { dependsOn: string; showIf: string },
    min?: number,
    max?: number
  ): Question => {
    const baseQuestion: BaseQuestion = {
      id,
      type,
      question,
      required,
      ...(conditional && { conditional })
    };
  
    switch (type) {
      case 'text':
      case 'email':
      case 'textarea':
        return baseQuestion as TextQuestion;
      case 'number':
      case 'rating':
        return { ...baseQuestion, ...(min !== undefined && { min }), ...(max !== undefined && { max }) } as NumberQuestion | RatingQuestion;
      case 'multipleChoice':
        return { ...baseQuestion, options: options || [] } as MultipleChoiceQuestion;
      case 'vakkenSelector':
        return baseQuestion as VakkenSelectorQuestion;
      default:
        throw new Error(`Unsupported question type: ${type}`);
    }
  };

export const shortVersion: FeedbackForm = {
    id: 'shortFeedbackForm',
    title: { EN: "Stephen's Quick Feedback Form", NL: "Stephen's Kort Feedbackformulier" },
    description: {
        EN: "A quick way to share your thoughts on our recent session. Your feedback is invaluable!",
        NL: "Een snelle manier om je gedachten over onze recente sessie te delen. Je feedback is onmisbaar!"
    },
    sections: [
        shortVersionIntermezzi[0] as PersonalIntermezzo,
        {
            id: 'general',
            title: { EN: 'General Information', NL: 'Algemene Informatie' },
            questions: [
                createQuestion(
                    'learnerName',
                    'text',
                    { EN: "Learner's Name", NL: 'Naam van de leerling' },
                    true
                ),
                createQuestion(
                    'subject',
                    'vakkenSelector',
                    { EN: 'Subject or Topic', NL: 'Vak of onderwerp' },
                    true
                ) as VakkenSelectorQuestion,
                createQuestion(
                    'userType',
                    'multipleChoice',
                    { EN: 'Who is filling out this form?', NL: 'Wie vult dit formulier in?' },
                    true,
                    [
                        { value: 'student', label: { EN: 'Student', NL: 'Student' } },
                        { value: 'guardian', label: { EN: 'Guardian', NL: 'Voogd' } },
                        { value: 'company', label: { EN: 'Company', NL: 'Bedrijf' } },
                    ]
                ),
            ],
        } as QuestionGroup,
        {
            id: 'quickExperience',
            title: { EN: 'Quick Lesson Feedback', NL: 'Snelle Les Feedback' },
            questions: [
                createQuestion(
                    'overallRating',
                    'rating',
                    { EN: 'Overall rating of the lesson (1-5)', NL: 'Algemene beoordeling van de les (1-5)' },
                    true,
                    undefined,
                    undefined,
                    1,
                    5
                ),
                createQuestion(
                    'mostValuable',
                    'textarea',
                    { EN: 'What was the most valuable aspect of our session?', NL: 'Wat was het meest waardevolle aspect van onze sessie?' },
                    false
                ),
            ],
        } as QuestionGroup,
        shortVersionIntermezzi[1] as PersonalIntermezzo,
        {
            id: 'quickSuggestion',
            title: { EN: 'Quick Suggestion', NL: 'Snelle Suggestie' },
            questions: [
                createQuestion(
                    'quickImprovement',
                    'textarea',
                    { EN: 'Any quick suggestion for improvement?', NL: 'Heb je een snelle suggestie voor verbetering?' },
                    false
                ),
            ],
        } as QuestionGroup,
        {
            id: 'quickQuote',
            title: { EN: 'Quick Quote', NL: 'Snelle Quote' },
            questions: [
                createQuestion(
                    'quoteConsent',
                    'multipleChoice',
                    { EN: 'Would you like to provide a quick quote about your experience?', NL: 'Wil je een korte quote geven over je ervaring?' },
                    true,
                    [
                        { value: 'yes', label: { EN: 'Yes', NL: 'Ja' } },
                        { value: 'no', label: { EN: 'No', NL: 'Nee' } },
                    ]
                ),
                createQuestion(
                    'quoteText',
                    'textarea',
                    { EN: 'If yes, please write your quote here:', NL: 'Zo ja, schrijf hier je quote:' },
                    false,
                    undefined,
                    { dependsOn: 'quoteConsent', showIf: 'value === "yes"' }
                ),
            ],
        } as QuestionGroup,
    ],
    conclusion: {
        EN: "Thanks for your quick feedback! It's invaluable in helping me improve our sessions. I look forward to our next meeting!",
        NL: "Bedankt voor je snelle feedback! Het is onmisbaar om onze sessies te verbeteren. Ik kijk uit naar onze volgende ontmoeting!"
    },
};

export const longVersion: FeedbackForm = {
    id: 'longFeedbackForm',
    title: { EN: "Stephen's Detailed Feedback Form", NL: "Stephen's Uitgebreid Feedbackformulier" },
    description: {
        EN: "Welcome to my detailed feedback form. Your insights are invaluable in helping me improve and tailor my teaching methods. Thank you for taking the time to share your thoughts!",
        NL: "Welkom bij mijn uitgebreide feedbackformulier. Jouw inzichten zijn onmisbaar om mijn onderwijsmethoden te verbeteren en aan te passen. Bedankt dat je de tijd neemt om je gedachten te delen!"
    },
    sections: [
        longVersionIntermezzi[0] as PersonalIntermezzo,
        {
            id: 'general',
            title: { EN: 'General Information', NL: 'Algemene Informatie' },
            questions: [
                createQuestion(
                    'learnerName',
                    'text',
                    { EN: "Learner's Name", NL: 'Naam van de leerling' },
                    true
                ),
                createQuestion(
                    'subject',
                    'vakkenSelector',
                    { EN: 'Subject or Topic', NL: 'Vak of onderwerp' },
                    true
                ) as VakkenSelectorQuestion,
                createQuestion(
                    'userType',
                    'multipleChoice',
                    { EN: 'Who is filling out this form?', NL: 'Wie vult dit formulier in?' },
                    true,
                    [
                        { value: 'student', label: { EN: 'Student', NL: 'Student' } },
                        { value: 'guardian', label: { EN: 'Guardian', NL: 'Voogd' } },
                        { value: 'company', label: { EN: 'Company', NL: 'Bedrijf' } },
                    ]
                ),
            ],
        } as QuestionGroup,
        longVersionIntermezzi[1] as PersonalIntermezzo,
        {
            id: 'experience',
            title: { EN: 'Lesson Experience', NL: 'Leservaring' },
            questions: [
                createQuestion(
                    'overallQuality',
                    'rating',
                    { EN: 'Overall quality of the lessons/guidance', NL: 'Algehele kwaliteit van de lessen/begeleiding' },
                    true,
                    undefined,
                    undefined,
                    1,
                    5
                ),
                createQuestion(
                    'expectationsMet',
                    'rating',
                    { EN: 'How well did the content meet your expectations?', NL: 'In hoeverre voldeed de inhoud aan je verwachtingen?' },
                    true,
                    undefined,
                    undefined,
                    1,
                    5
                ),
                createQuestion(
                    'clarity',
                    'rating',
                    { EN: 'Clarity of explanation', NL: 'Duidelijkheid van de uitleg' },
                    true,
                    undefined,
                    undefined,
                    1,
                    5
                ),
                createQuestion(
                    'effectiveness',
                    'rating',
                    { EN: 'Effectiveness in improving your skills/knowledge', NL: 'Effectiviteit in het verbeteren van je vaardigheden/kennis' },
                    true,
                    undefined,
                    undefined,
                    1,
                    5
                ),
                createQuestion(
                    'interaction',
                    'rating',
                    { EN: 'Interaction and communication during lessons', NL: 'Interactie en communicatie tijdens de lessen' },
                    true,
                    undefined,
                    undefined,
                    1,
                    5
                ),
                createQuestion(
                    'accessibility',
                    'rating',
                    { EN: 'Accessibility and helpfulness of the tutor', NL: 'Toegankelijkheid en behulpzaamheid van de docent' },
                    true,
                    undefined,
                    undefined,
                    1,
                    5
                ),
            ],
        } as QuestionGroup,
        longVersionIntermezzi[2] as PersonalIntermezzo,
        {
            id: 'specificFeedback',
            title: { EN: 'Specific Feedback and Suggestions', NL: 'Specifieke Feedback en Suggesties' },
            questions: [
                createQuestion(
                    'mostValuable',
                    'textarea',
                    { EN: 'What did you find most valuable about the lessons/guidance?', NL: 'Wat vond je het meest waardevol aan de lessen/begeleiding?' },
                    false
                ),
                createQuestion(
                    'improvements',
                    'textarea',
                    { EN: 'Are there any areas that you think could be improved?', NL: 'Zijn er specifieke onderdelen die volgens jou verbeterd kunnen worden?' },
                    false
                ),
                createQuestion(
                    'suggestions',
                    'textarea',
                    { EN: 'Do you have any suggestions for future topics or methods?', NL: 'Heb je suggesties voor nieuwe onderwerpen of methodes in de toekomst?' },
                    false
                ),
                createQuestion(
                    'dataApproach',
                    'textarea',
                    { EN: 'How do you feel about incorporating more data-driven approaches in our lessons?', NL: 'Hoe sta je tegenover het integreren van meer datagedreven benaderingen in onze lessen?' },
                    false
                ),
            ],
        } as QuestionGroup,
        {
            id: 'personalQuote',
            title: { EN: 'Personal Quote and Permission', NL: 'Persoonlijke Quote en Toestemming' },
            questions: [
                createQuestion(
                    'quoteConsent',
                    'multipleChoice',
                    { EN: 'Would you like to provide a quote about your experience for my website?', NL: 'Zou je een quote willen geven over je ervaring voor mijn website?' },
                    true,
                    [
                        { value: 'text', label: { EN: 'Yes, written quote', NL: 'Ja, geschreven quote' } },
                        { value: 'audio', label: { EN: 'Yes, audio quote', NL: 'Ja, ingesproken quote' } },
                        { value: 'no', label: { EN: 'No', NL: 'Nee' } },
                    ]
                ),
                createQuestion(
                    'quoteText',
                    'textarea',
                    { EN: 'If yes, please write your quote here:', NL: 'Als ja, schrijf hier je quote:' },
                    false,
                    undefined,
                    { dependsOn: 'quoteConsent', showIf: 'value === "text"' }
                ),
                createQuestion(
                    'quoteAudio',
                    'text',
                    {
                        EN: 'If you prefer to give an audio quote, please send your audio recording to feedback@example.com or use this link https://example.com/audio-upload to record directly.',
                        NL: 'Als je liever een audio quote geeft, stuur je audio-opname dan naar feedback@example.com of gebruik deze link https://example.com/audio-upload om direct op te nemen.'
                    },
                    false,
                    undefined,
                    { dependsOn: 'quoteConsent', showIf: 'value === "audio"' }
                ),
                createQuestion(
                    'nameConsent',
                    'multipleChoice',
                    { EN: 'Can this quote be used with your name?', NL: 'Mag deze quote gebruikt worden met je naam?' },
                    true,
                    [
                        { value: 'yes', label: { EN: 'Yes', NL: 'Ja' } },
                        { value: 'initials', label: { EN: 'Initials only', NL: 'Alleen initialen' } },
                        { value: 'no', label: { EN: 'No', NL: 'Nee' } },
                    ],
                    { dependsOn: 'quoteConsent', showIf: 'value === "text" || value === "audio"' }
                ),
                createQuestion(
                    'photoConsent',
                    'multipleChoice',
                    { EN: 'Would you like your quote to be posted with a photo on the website or social media?', NL: 'Zou je je quote willen posten met een foto op de website of sociale media?' },
                    true,
                    [
                        { value: 'yesWithPhoto', label: { EN: 'Yes, with photo', NL: 'Ja, met foto' } },
                        { value: 'yesWithoutPhoto', label: { EN: 'Yes, without photo', NL: 'Ja, zonder foto' } },
                        { value: 'no', label: { EN: 'No', NL: 'Nee' } },
                    ],
                    { dependsOn: 'quoteConsent', showIf: 'value === "text" || value === "audio"' }
                ),
                createQuestion(
                    'photoChoice',
                    'multipleChoice',
                    { EN: 'If yes, would you prefer to provide your own photo or use one from our session?', NL: 'Zo ja, wil je zelf een foto aanleveren of mag er een foto van onze sessie gebruikt worden?' },
                    false,
                    [
                        { value: 'selfUpload', label: { EN: 'I will provide my own photo', NL: 'Ik stuur zelf een foto op' } },
                        { value: 'sessionPhoto', label: { EN: 'Use a photo from our session', NL: 'Gebruik een foto van onze sessie' } },
                    ],
                    { dependsOn: 'photoConsent', showIf: 'value === "yesWithPhoto"' }
                ),
            ],
        } as QuestionGroup,
        longVersionIntermezzi[3] as PersonalIntermezzo,
    ],
    conclusion: {
        EN: "Thank you for taking the time to provide this valuable feedback. Your insights will help me improve and tailor my teaching methods. I look forward to our continued collaboration!",
        NL: "Bedankt dat je de tijd hebt genomen om deze waardevolle feedback te geven. Jouw inzichten zullen me helpen mijn onderwijsmethoden te verbeteren en aan te passen. Ik kijk uit naar onze voortgezette samenwerking!"
    },
};