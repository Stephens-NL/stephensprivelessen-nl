import { longVersionIntermezzi } from "./intermezzo";
import { FeedbackForm, LabelGroup, VakkenSelectorLabel } from "../types";

export const longVersion: FeedbackForm = {
    id: 'longFeedbackForm',
    title: {
      EN: "Stephen's Detailed Annual Feedback Form",
      NL: "Stephen's Uitgebreid Jaarlijks Feedbackformulier",
    },
    description: {
      EN: "Welcome to my detailed annual feedback form. Your insights are invaluable in helping me improve and tailor my teaching methods for the coming year. Thank you for taking the time to share your thoughts!",
      NL: "Welkom bij mijn uitgebreide jaarlijkse feedbackformulier. Jouw inzichten zijn onmisbaar om mijn onderwijsmethoden te verbeteren en aan te passen voor het komende jaar. Bedankt dat je de tijd neemt om je gedachten te delen!",
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
          } as VakkenSelectorLabel,
        ],
      } as LabelGroup,
      longVersionIntermezzi[1], // Hobbies
      {
        id: 'yearlyExperience',
        title: {
          EN: 'Yearly Experience',
          NL: 'Jaarlijkse Ervaring',
        },
        questions: [
          {
            id: 'overallQuality',
            type: 'number',
            label: {
              EN: 'Overall quality of the lessons/guidance this year',
              NL: 'Algehele kwaliteit van de lessen/begeleiding dit jaar',
            },
            min: 1,
            max: 5,
            required: true,
          },
          {
            id: 'expectationsMet',
            type: 'number',
            label: {
              EN: 'How well did the content meet your expectations this year?',
              NL: 'In hoeverre voldeed de inhoud aan je verwachtingen dit jaar?',
            },
            min: 1,
            max: 5,
            required: true,
          },
          {
            id: 'clarity',
            type: 'number',
            label: {
              EN: 'Clarity of explanations throughout the year',
              NL: 'Duidelijkheid van de uitleg gedurende het jaar',
            },
            min: 1,
            max: 5,
            required: true,
          },
          {
            id: 'effectiveness',
            type: 'number',
            label: {
              EN: 'Effectiveness in improving your skills/knowledge this year',
              NL: 'Effectiviteit in het verbeteren van je vaardigheden/kennis dit jaar',
            },
            min: 1,
            max: 5,
            required: true,
          },
          {
            id: 'interaction',
            type: 'number',
            label: {
              EN: 'Quality of interaction and communication during lessons this year',
              NL: 'Kwaliteit van interactie en communicatie tijdens de lessen dit jaar',
            },
            min: 1,
            max: 5,
            required: true,
          },
          {
            id: 'accessibility',
            type: 'number',
            label: {
              EN: 'Accessibility and helpfulness of the tutor throughout the year',
              NL: 'Toegankelijkheid en behulpzaamheid van de docent gedurende het jaar',
            },
            min: 1,
            max: 5,
            required: true,
          },
        ],
      } as LabelGroup,
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
              EN: 'What did you find most valuable about the lessons/guidance this year?',
              NL: 'Wat vond je het meest waardevol aan de lessen/begeleiding dit jaar?',
            },
            required: false,
          },
          {
            id: 'improvements',
            type: 'textarea',
            label: {
              EN: 'Are there any areas that you think could be improved for next year?',
              NL: 'Zijn er specifieke onderdelen die volgens jou verbeterd kunnen worden voor volgend jaar?',
            },
            required: false,
          },
          {
            id: 'suggestions',
            type: 'textarea',
            label: {
              EN: 'Do you have any suggestions for topics or methods you\'d like to see next year?',
              NL: 'Heb je suggesties voor onderwerpen of methodes die je volgend jaar zou willen zien?',
            },
            required: false,
          },
          {
            id: 'dataApproach',
            type: 'textarea',
            label: {
              EN: 'How do you feel about incorporating more data-driven approaches in our lessons next year?',
              NL: 'Hoe sta je tegenover het integreren van meer datagedreven benaderingen in onze lessen volgend jaar?',
            },
            required: false,
          },
        ],
      } as LabelGroup,
      {
        id: 'learningPreferences',
        title: {
          EN: 'Learning Preferences for Next Year',
          NL: 'Leervoorkeuren voor Volgend Jaar',
        },
        questions: [
          {
            id: 'preferredLearningStyle',
            type: 'multipleChoice',
            label: {
              EN: 'Which learning style would you prefer for next year?',
              NL: 'Welke leerstijl zou je prefereren voor volgend jaar?',
            },
            options: [
              { value: 'visual', label: { EN: 'Visual learning with diagrams and charts', NL: 'Visueel leren met diagrammen en grafieken' } },
              { value: 'auditory', label: { EN: 'Auditory learning through discussions', NL: 'Auditief leren door discussies' } },
              { value: 'kinesthetic', label: { EN: 'Hands-on learning with practical exercises', NL: 'Praktisch leren met oefeningen' } },
              { value: 'mixed', label: { EN: 'A mix of different styles', NL: 'Een mix van verschillende stijlen' } },
            ],
            required: true,
          },
          {
            id: 'preferredPace',
            type: 'multipleChoice',
            label: {
              EN: 'What pace would you prefer for our sessions next year?',
              NL: 'Welk tempo zou je prefereren voor onze sessies volgend jaar?',
            },
            options: [
              { value: 'faster', label: { EN: 'Faster than this year', NL: 'Sneller dan dit jaar' } },
              { value: 'same', label: { EN: 'Same as this year', NL: 'Hetzelfde als dit jaar' } },
              { value: 'slower', label: { EN: 'Slower than this year', NL: 'Langzamer dan dit jaar' } },
            ],
            required: true,
          },
          {
            id: 'preferredFrequency',
            type: 'multipleChoice',
            label: {
              EN: 'How often would you like to have sessions next year?',
              NL: 'Hoe vaak zou je sessies willen hebben volgend jaar?',
            },
            options: [
              { value: 'moreOften', label: { EN: 'More often than this year', NL: 'Vaker dan dit jaar' } },
              { value: 'sameFrequency', label: { EN: 'Same frequency as this year', NL: 'Dezelfde frequentie als dit jaar' } },
              { value: 'lessOften', label: { EN: 'Less often than this year', NL: 'Minder vaak dan dit jaar' } },
            ],
            required: true,
          },
        ],
      } as LabelGroup,
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
              EN: "Would you like to provide a quote about your experience this year for my website?",
              NL: "Zou je een quote willen geven over je ervaring dit jaar voor mijn website?",
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
              NL: 'Als ja, schrijf hier je quote:',
            },
            required: false,
            conditional: {
              dependsOn: 'quoteConsent',
              showIf: 'value === "yes"',
            },
          },
          {
            id: 'nameConsent',
            type: 'multipleChoice',
            label: {
              EN: 'How would you like your name to appear with the quote?',
              NL: 'Hoe wil je dat je naam verschijnt bij de quote?',
            },
            options: [
              { value: 'fullName', label: { EN: 'Full name', NL: 'Volledige naam' } },
              { value: 'firstNameLastInitial', label: { EN: 'First name and last initial', NL: 'Voornaam en eerste letter achternaam' } },
              { value: 'initials', label: { EN: 'Initials only', NL: 'Alleen initialen' } },
              { value: 'anonymous', label: { EN: 'Anonymous', NL: 'Anoniem' } },
            ],
            required: true,
            conditional: {
              dependsOn: 'quoteConsent',
              showIf: 'value === "yes"',
            },
          },
          {
            id: 'photoConsent',
            type: 'multipleChoice',
            label: {
              EN: "Would you like your quote to be posted with a photo on the website or social media?",
              NL: "Zou je je quote willen posten met een foto op de website of sociale media?",
            },
            options: [
              { value: 'yes', label: { EN: 'Yes', NL: 'Ja' } },
              { value: 'no', label: { EN: 'No', NL: 'Nee' } },
            ],
            required: true,
            conditional: {
              dependsOn: 'quoteConsent',
              showIf: 'value === "yes"',
            },
          },
          {
            id: 'photoChoice',
            type: 'multipleChoice',
            label: {
              EN: 'If yes, would you prefer to provide your own photo or use one from our sessions?',
              NL: 'Zo ja, wil je zelf een foto aanleveren of mag er een foto van onze sessies gebruikt worden?',
            },
            options: [
              { value: 'ownPhoto', label: { EN: 'I will provide my own photo', NL: 'Ik stuur zelf een foto op' } },
              { value: 'sessionPhoto', label: { EN: 'Use a photo from our sessions', NL: 'Gebruik een foto van onze sessies' } },
            ],
            required: true,
            conditional: {
              dependsOn: 'photoConsent',
              showIf: 'value === "yes"',
            },
          },
        ],
      } as LabelGroup,
      longVersionIntermezzi[3], // Conclusion
    ],
    conclusion: {
      EN: "Thank you for taking the time to provide this valuable feedback on our year together. Your insights will help me improve and tailor my teaching methods for the coming year. I look forward to our continued collaboration!",
      NL: "Bedankt dat je de tijd hebt genomen om deze waardevolle feedback te geven over ons jaar samen. Jouw inzichten zullen me helpen mijn onderwijsmethoden te verbeteren en aan te passen voor het komende jaar. Ik kijk uit naar onze voortgezette samenwerking!",
    },
  };