'use client';

import { LucideIcon } from "lucide-react";

export type Language = 'EN' | 'NL';

// export type Bilingual<T = string> = {
//     EN: T;
//     NL: T;
// };

export type TranslationFunction = (key: Bilingual) => string | string[] | { [key: string]: any }[];
export type Props = {
  question: TextQuestion;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  language: Language;
};

// Blog-related types
export type BlogPostType = {
  id: number;
  title: Bilingual;
  content: Bilingual;
  author: string;
  date: string;
  tags: string[];
};

export type BlogPostsType = BlogPostType[];

export interface BlogInfoType {
  title: Bilingual;
  description: Bilingual;
}

// Navigation and Service types
export interface NavItem {
  href: string;
  label: Bilingual;
}

export interface Service {
  icon: string;
  title: Bilingual;
  longDescription: Bilingual;
  shortDescription: Bilingual;
}

export interface ServiceTopic {
  title: Bilingual;
  description: Bilingual;
}

export interface ServiceCategory {
  category: string;
  description: Bilingual;
  topics: ServiceTopic[];
}

// UI Component Props
export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export interface PhilosophyCardProps {
  title: string;
  description: string;
}

export interface Testimonial {
  text: Bilingual;
  author: string;
}

export interface ServiceCardProps {
  icon: string;
  title: Bilingual;
  description: Bilingual;
}

export interface PhilosophyPoint {
  title: Bilingual;
  description: Bilingual;
}

export interface ModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

// Site Data Structure
export interface SiteData {
  siteTitle: Bilingual;
  navigation: NavItem[];
  hero: {
    title: Bilingual;
    subtitle: Bilingual;
    ctaText: Bilingual;
    ctaLink: string;
  };
  services: Service[];
  testimonials: Testimonial[];
  about: {
    title: Bilingual;
    introduction: {
      imageSrc: string;
      altText: Bilingual;
      heading: Bilingual;
      paragraphs: Bilingual;
    };
    philosophyTitle: Bilingual;
    philosophyPoints: PhilosophyPoint[];
    cta: {
      title: Bilingual;
      description: Bilingual;
      buttonText: Bilingual;
      buttonLink: string;
    };
  };
  footer: {
    title: Bilingual;
    description: Bilingual;
    quickLinksLabel: Bilingual;
    quickLinks: NavItem[];
    contactLabel: Bilingual;
    email: string;
    phone: string;
    copyright: Bilingual;
  };
}


export type Conditional = {
  dependsOn: string;
  showIf: string;
};

export interface BaseQuestion {
  id: string;
  label: Bilingual;
  required: boolean;
  conditional?: Conditional;
}

// export interface TextQuestion extends BaseQuestion {
//   type: 'text' | 'email' | 'textarea';
//   placeholder?: Bilingual;
// }

export interface NumberQuestion extends BaseQuestion {
  type: 'number';
  min?: number;
  max?: number;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multipleChoice';
  options: {
    value: string;
    label: Bilingual;
  }[];
}

// Question group and feedback form structure
export interface QuestionGroup {
  id: string;
  title: Bilingual;
  questions: Question[];
}

export interface FeedbackForm {
  id: string;
  title: Bilingual;
  description: Bilingual;
  sections: (QuestionGroup | PersonalIntermezzo)[];
  conclusion: Bilingual;
}


// Definieer het type voor een individueel FAQ-item
export type FAQItem = {
  id: number;
  question: Bilingual;
  answer: Bilingual;
};

// Definieer het type voor de FAQ-informatie
export type FAQInfoType = {
  title: Bilingual;
  description: Bilingual;
  searchPlaceholder: Bilingual;
  languageToggle: Bilingual;
  scrollToTopLabel: Bilingual;
};

// Definieer het type voor de lijst van FAQ-items
export type FAQItemsType = FAQItem[];

// Als je een type nodig hebt voor de hele FAQ-data structuur, kun je dit gebruiken:
export type FAQDataType = {
  faqInfo: FAQInfoType;
  faqItems: FAQItemsType;
};


// Base question interface
export interface BaseQuestion {
  id: string;
  type: QuestionType;
  label: Bilingual;
  required: boolean;
}

// Text-based question interface
export interface TextQuestion extends BaseQuestion {
  type: 'text' | 'email' | 'textarea';
  placeholder?: Bilingual;
}

// Number question interface
export interface NumberQuestion extends BaseQuestion {
  type: 'number';
  min?: number;
  max?: number;
}

// Multiple choice question interface
export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multipleChoice';
  options: {
    value: string;
    label: Bilingual;
  }[];
}

// Union type for all question types
//   export type Question = TextQuestion | NumberQuestion | MultipleChoiceQuestion;

// Interface for question groups
export interface QuestionGroup {
  id: string;
  title: Bilingual;
  questions: Question[];
}

// New interface for personal intermezzi
export interface PersonalIntermezzo {
  id: string;
  title: Bilingual;
  content: Bilingual;
}

// Union type for form sections
export type FormSection = QuestionGroup | PersonalIntermezzo;

// Main feedback form structure
export interface FeedbackForm {
  id: string;
  title: Bilingual;
  description: Bilingual;
  sections: FormSection[];
  conclusion: Bilingual;
}

// Types for specific user groups
export type StudentQuestions = QuestionGroup;
export type GuardianQuestions = QuestionGroup;
export type CompanyQuestions = QuestionGroup;


export interface FormResponse {
  formId: string;
  respondentId: string;
  responses: {
    [questionId: string]: QuestionResponse;
  };
  timestamp: Date;
}


//   -------------
// Bilingual type
export type Bilingual = {
  EN: string| string[]| { [key: string]: any }[];
  NL: string| string[]| { [key: string]: any }[];
};

export type QuestionResponse = string | number | string[] | Record<string, string | number>;

// Assuming you define QuestionType as follows:
export type QuestionType = 'text' | 'textarea' | 'email' | 'number' | 'vakkenSelector' | 'multipleChoice' | 'otherTypesYouHave';
export interface BaseQuestion {
  id: string;
  type: QuestionType;
  label: Bilingual;
  required: boolean;
  conditional?: Conditional;
}

// Text-based question interface
export interface TextQuestion extends BaseQuestion {
  type: 'text' | 'email' | 'textarea';
  placeholder?: Bilingual;
}

// Number question interface
export interface NumberQuestion extends BaseQuestion {
  type: 'number';
  min?: number;
  max?: number;
}

// Multiple choice question interface
export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multipleChoice';
  options: {
    value: string;
    label: Bilingual;
  }[];
}

// Union type for all question types
export type Question = TextQuestion | NumberQuestion | MultipleChoiceQuestion | VakkenSelectorQuestion; ;

// Interface for question groups
export interface QuestionGroup {
  id: string;
  title: Bilingual;
  questions: Question[];
}

// New interface for personal intermezzi
export interface PersonalIntermezzo {
  id: string;
  title: Bilingual;
  content: Bilingual;
}

// Union type for form sections
//   export type FormSection = QuestionGroup | PersonalIntermezzo;

// Main feedback form structure
export interface FeedbackForm {
  id: string;
  title: Bilingual;
  description: Bilingual;
  sections: FormSection[];
  conclusion: Bilingual;
}


type BilingualArray = {
  EN: string[];
  NL: string[];
};

type QuestionAnswer = {
  question: Bilingual;
  answer: Bilingual;
};

type BilingualQA = {
  EN: QuestionAnswer[];
  NL: QuestionAnswer[];
};

export interface AboutData {
  title: Bilingual;
  introduction: {
    heading: Bilingual;
    paragraphs: BilingualArray;
    imageSrc: string;
    altText: Bilingual;
  };
  
  philosophyTitle: Bilingual;
  philosophyPoints: Array<{
    title: Bilingual;
    description: Bilingual;
  }>;
  cta: {
    title: Bilingual;
    description: Bilingual;
    buttonText: Bilingual;
    buttonLink: string;
  };
  detailedInfo: BilingualQA;
}


export interface WelcomeScreenData {
  languageSelection: {
    title: Bilingual;
    languages: {
      [key: string]: string;
    };
  };
  welcome: {
    title: Bilingual;
    description: Bilingual;
    startButtonText: Bilingual;
  };
  lengthSelection: {
    title: Bilingual;
    shortOption: Bilingual;
    longOption: Bilingual;
  };
  navigation: {
    back: Bilingual;
    next: Bilingual;
    submit: Bilingual;
  };
  submitCTA: {
    title: Bilingual;
    description: Bilingual;
    buttonText: Bilingual;
  };
  farewell: {
    title: Bilingual;
    message: Bilingual;
    closeButtonText: Bilingual;
  };
}

// in your types file
interface FormDescription {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface FormDescriptions {
  [key: string]: {
    [key in 'short' | 'long']: FormDescription;
  };
}

export interface VakkenSelectorQuestion extends BaseQuestion {
  type: 'vakkenSelector';
  // Add any additional properties specific to this question type
}

export interface FormTypeSelectorProps {
  onSelectFormType: (type: 'short' | 'long') => void;
}