import { shortVersionIntermezzi } from "./intermezzo";
import { FeedbackForm, LabelGroup, VakkenSelectorLabel } from "../types";

export const shortVersion: FeedbackForm = {
  id: 'shortFeedbackForm',
  title: {
    EN: "Stephen's Annual Quick Feedback Form",
    NL: "Stephen's Jaarlijkse Korte Feedbackformulier",
  },
  description: {
    EN: "A quick way to share your thoughts on our sessions. Your feedback helps me improve and tailor our future lessons!",
    NL: "Een snelle manier om je gedachten te delen over onze sessies. Je feedback helpt me te verbeteren en onze toekomstige lessen aan te passen!",
  },
  sections: [
    shortVersionIntermezzi[0], // Intro
    {
      id: 'respondentType',
      title: {
        EN: 'Respondent Information',
        NL: 'Informatie over de respondent',
      },
      questions: [
        {
          id: 'relationship',
          type: 'multipleChoice',
          label: {
            EN: 'What is your relationship to the tutoring services?',
            NL: 'Wat is je relatie tot de bijlesdiensten?',
          },
          options: [
            { value: 'currentStudent', label: { EN: 'Current student', NL: 'Huidige student' } },
            { value: 'formerStudent', label: { EN: 'Former student', NL: 'Voormalige student' } },
            { value: 'parentGuardian', label: { EN: 'Parent/Guardian', NL: 'Ouder/Voogd' } },
            { value: 'company', label: { EN: 'Company representative', NL: 'Bedrijfsvertegenwoordiger' } },
          ],
          required: true,
        },
        {
          id: 'studentName',
          type: 'text',
          label: {
            EN: "Student's name",
            NL: "Naam van de student",
          },
          required: true,
          conditional: {
            dependsOn: 'relationship',
            showIf: 'value === "parentGuardian" || value === "company"',
          },
        },
        {
          id: 'companyName',
          type: 'text',
          label: {
            EN: "Company name",
            NL: "Bedrijfsnaam",
          },
          required: true,
          conditional: {
            dependsOn: 'relationship',
            showIf: 'value === "company"',
          },
        },
      ],
    } as LabelGroup,
    {
      id: 'general',
      title: {
        EN: 'General Information',
        NL: 'Algemene Informatie',
      },
      questions: [
        {
          id: 'subject',
          type: 'vakkenSelector',
          label: {
            EN: 'Subject or Topic',
            NL: 'Vak of onderwerp',
          },
          required: true,
        } as VakkenSelectorLabel,
        {
          id: 'sessionPeriod',
          type: 'multipleChoice',
          label: {
            EN: 'When did you receive tutoring?',
            NL: 'Wanneer heb je bijles gehad?',
          },
          options: [
            { value: 'thisYear', label: { EN: 'This year', NL: 'Dit jaar' } },
            { value: 'lastYear', label: { EN: 'Last year', NL: 'Vorig jaar' } },
            { value: 'moreThanAYear', label: { EN: 'More than a year ago', NL: 'Meer dan een jaar geleden' } },
          ],
          required: true,
          conditional: {
            dependsOn: 'relationship',
            showIf: 'value === "formerStudent"',
          },
        },
      ],
    } as LabelGroup,
    {
      id: 'experience',
      title: {
        EN: 'Tutoring Experience',
        NL: 'Ervaring met de bijles',
      },
      questions: [
        {
          id: 'overallRating',
          type: 'number',
          label: {
            EN: 'Overall rating of the tutoring sessions (1-5)',
            NL: 'Algemene beoordeling van de bijlessessies (1-5)',
          },
          min: 1,
          max: 5,
          required: true,
        },
        {
          id: 'progressSatisfaction',
          type: 'multipleChoice',
          label: {
            EN: 'How satisfied are you with the progress made?',
            NL: 'Hoe tevreden ben je met de geboekte vooruitgang?',
          },
          options: [
            { value: 'verySatisfied', label: { EN: 'Very satisfied', NL: 'Zeer tevreden' } },
            { value: 'satisfied', label: { EN: 'Satisfied', NL: 'Tevreden' } },
            { value: 'neutral', label: { EN: 'Neutral', NL: 'Neutraal' } },
            { value: 'dissatisfied', label: { EN: 'Dissatisfied', NL: 'Ontevreden' } },
            { value: 'veryDissatisfied', label: { EN: 'Very dissatisfied', NL: 'Zeer ontevreden' } },
          ],
          required: true,
        },
        {
          id: 'mostValuable',
          type: 'textarea',
          label: {
            EN: 'What was the most valuable aspect of the tutoring sessions?',
            NL: 'Wat was het meest waardevolle aspect van de bijlessessies?',
          },
          required: false,
        },
        {
          id: 'improvementAreas',
          type: 'textarea',
          label: {
            EN: 'Are there any areas where you think the tutoring could improve?',
            NL: 'Zijn er gebieden waar de bijles volgens jou kan verbeteren?',
          },
          required: false,
        },
      ],
    } as LabelGroup,
    shortVersionIntermezzi[1], // Fun Fact
    {
      id: 'futurePreferences',
      title: {
        EN: 'Future Preferences',
        NL: 'Toekomstige Voorkeuren',
      },
      questions: [
        {
          id: 'futurePlans',
          type: 'multipleChoice',
          label: {
            EN: 'Are you planning to continue with tutoring in the future?',
            NL: 'Ben je van plan in de toekomst door te gaan met bijles?',
          },
          options: [
            { value: 'yes', label: { EN: 'Yes', NL: 'Ja' } },
            { value: 'maybe', label: { EN: 'Maybe', NL: 'Misschien' } },
            { value: 'no', label: { EN: 'No', NL: 'Nee' } },
          ],
          required: true,
          conditional: {
            dependsOn: 'relationship',
            showIf: 'value === "currentStudent" || value === "formerStudent" || value === "parentGuardian"',
          },
        },
        {
          id: 'topicPreference',
          type: 'textarea',
          label: {
            EN: 'Are there any specific topics you\'d like to focus on in future sessions?',
            NL: 'Zijn er specifieke onderwerpen waar je in toekomstige sessies op wilt focussen?',
          },
          required: false,
          conditional: {
            dependsOn: 'futurePlans',
            showIf: 'value === "yes" || value === "maybe"',
          },
        },
        {
          id: 'learningStyle',
          type: 'multipleChoice',
          label: {
            EN: 'Which learning style works best for you/the student?',
            NL: 'Welke leerstijl werkt het beste voor jou/de student?',
          },
          options: [
            { value: 'visual', label: { EN: 'Visual aids and diagrams', NL: 'Visuele hulpmiddelen en diagrammen' } },
            { value: 'practical', label: { EN: 'Practical examples and exercises', NL: 'Praktische voorbeelden en oefeningen' } },
            { value: 'discussion', label: { EN: 'Discussions and explanations', NL: 'Discussies en uitleg' } },
            { value: 'mixed', label: { EN: 'A mix of styles', NL: 'Een mix van stijlen' } },
          ],
          required: true,
        },
        {
          id: 'sessionFrequency',
          type: 'multipleChoice',
          label: {
            EN: 'Preferred frequency of future sessions',
            NL: 'Voorkeursfrequentie voor toekomstige sessies',
          },
          options: [
            { value: 'moreOften', label: { EN: 'More often', NL: 'Vaker' } },
            { value: 'sameFrequency', label: { EN: 'Same frequency', NL: 'Dezelfde frequentie' } },
            { value: 'lessOften', label: { EN: 'Less often', NL: 'Minder vaak' } },
          ],
          required: true,
          conditional: {
            dependsOn: 'futurePlans',
            showIf: 'value === "yes" || value === "maybe"',
          },
        },
      ],
    } as LabelGroup,
    {
      id: 'testimonial',
      title: {
        EN: 'Testimonial',
        NL: 'Getuigenis',
      },
      questions: [
        {
          id: 'quoteConsent',
          type: 'multipleChoice',
          label: {
            EN: "Would you like to provide a testimonial about your experience?",
            NL: "Wil je een getuigenis geven over je ervaring?",
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
            EN: 'Please write your testimonial here:',
            NL: 'Schrijf hier je getuigenis:',
          },
          required: true,
          conditional: {
            dependsOn: 'quoteConsent',
            showIf: 'value === "yes"',
          },
        },
        {
          id: 'nameConsent',
          type: 'multipleChoice',
          label: {
            EN: 'How would you like your name to appear with the testimonial?',
            NL: 'Hoe wil je dat je naam verschijnt bij de getuigenis?',
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
      ],
    } as LabelGroup,
  ],
  conclusion: {
    EN: "Thank you for your valuable feedback! Your insights help me improve and tailor my tutoring services. I appreciate your time and look forward to potential future collaborations.",
    NL: "Bedankt voor je waardevolle feedback! Je inzichten helpen me mijn bijlesdiensten te verbeteren en aan te passen. Ik waardeer je tijd en kijk uit naar mogelijke toekomstige samenwerkingen.",
  },
};