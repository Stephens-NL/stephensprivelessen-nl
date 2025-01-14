'use client';

import { LucideIcon } from "lucide-react";
import { IconType } from 'react-icons/lib';
import { TFunction } from 'i18next';

// Base Types
export type Language = 'EN' | 'NL';

export type Bilingual<T = string> = {
  [key in Language]: T;
};

export type BilingualContent = string | Bilingual | any;

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

// Custom translation type that's compatible with both our bilingual structure and i18next
export type CustomTranslationFunction = {
  (key: Bilingual | string | undefined): string;
  (key: string, defaultValue: string): string;
  (key: string, options: object): string;
} & TFunction;

// Re-export TFunction for places where we need the full i18next type
export type { TFunction };

// Base Interfaces
export interface BaseEntity {
  id: string | number;
}

export interface BilingualEntity extends BaseEntity {
  title: Bilingual;
  description?: Bilingual;
}

export interface ContentEntity extends BilingualEntity {
  content: Bilingual;
}

// About Types
export interface PhilosophyCardProps {
  title: string;
  description: string;
}

export interface QuestionAnswer {
  question: string;
  answer: string;
}

export interface IntroSectionProps {
  title: string;
  heading: string;
  paragraphs: string[];
  imageSrc: string;
  altText: string;
}

export interface AboutData {
  about: {
    title: Bilingual;
    introduction: {
      heading: Bilingual;
      paragraphs: Bilingual<string[]>;
      altText: Bilingual;
      imageSrc: string;
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
    detailedTitle: Bilingual;
    detailedInfo: {
      [key in Language]: Array<{
        question: string;
        answer: string;
      }>;
    };
  };
}

export interface About extends BilingualEntity {
  introduction: {
    heading: Bilingual;
    paragraphs: Bilingual<string[]>;
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
  detailedTitle: Bilingual;
  detailedInfo: {
    [key in Language]: Array<{
      question: string;
      answer: string;
    }>;
  };
}

export interface IntroductionContent extends BilingualEntity {
  sections: Array<{
    title: Bilingual;
    content: Bilingual;
  }>;
  conclusion?: Bilingual;
}

// Workshop Types
export type WorkshopType = 'academic' | 'creative';
export type WorkshopLevel = 'beginner' | 'intermediate' | 'advanced' | 'professional' | 'all_levels';
export type WorkshopFormat = 'interactive' | 'practical' | 'technical' | 'creative' | 'professional' | 'media' | 'flexible' | 'hands-on' | 'wellness';
export type WorkshopSchedule = 'single' | 'weekly' | 'monthly';
export type SessionStructure = 'single' | 'series' | 'flexible';

export type WorkshopConfig = {
  type: WorkshopType;
  level: WorkshopLevel;
  format: WorkshopFormat;
  schedule: WorkshopSchedule;
  sessionStructure?: SessionStructure;
};

export interface Workshop extends BilingualEntity {
  id: string;
  type: WorkshopType;
  level: WorkshopLevel;
  format: WorkshopFormat;
  schedule: WorkshopSchedule;
  sessionStructure?: SessionStructure;
  durationMinutes: number;
  durationText: Bilingual;
  details: Bilingual<string[]>;
  price: Bilingual;
  maxParticipants: number;
  minParticipants?: number;
  totalSessions?: number;
  prerequisites: Bilingual;
  materials: Bilingual;
  location: Bilingual;
}

export interface Workshops {
  [key: string]: Workshop;
}

export interface WorkshopsPageContent extends BilingualEntity {
  categories: Array<{
    type: WorkshopType;
    items: Workshop[];
  }>;
}

// Blog Types
export interface BlogPost extends ContentEntity {
  author: string;
  date: string;
  tags: string[];
  imageUrl?: string;
  altText?: Bilingual;
}

// Question Types
export type QuestionType = 'text' | 'textarea' | 'email' | 'number' | 'vakkenSelector' | 'multipleChoice' | 'rating';

type BaseQuestionConfig = {
  type: QuestionType;
  required: boolean;
  conditional?: {
    dependsOn: string;
    showIf: string;
  };
  comment?: Bilingual;
  placeholder?: Bilingual;
  min?: number;
  max?: number;
};

export interface Question extends BaseEntity, BaseQuestionConfig {
  label: Bilingual;
}

export interface TextQuestion extends Question {
  type: 'text' | 'email' | 'textarea';
}

export interface MultipleChoiceQuestion extends Question {
  type: 'multipleChoice';
  options: Array<{
    value: string;
    label: Bilingual;
  }>;
}

export interface NumberQuestion extends Question {
  type: 'number' | 'rating';
}

export interface SelectorQuestion extends Question {
  type: 'vakkenSelector';
}

export type QuestionUnion = TextQuestion | MultipleChoiceQuestion | NumberQuestion | SelectorQuestion;

// Form Types
export interface QuestionGroup extends BilingualEntity {
  questions: Question[];
}

export interface PersonalIntermezzo extends ContentEntity {}

export type FormSection = QuestionGroup | PersonalIntermezzo;

export interface FeedbackForm extends BilingualEntity {
  sections: FormSection[];
  conclusion: Bilingual;
}

// Response Types
type BasicResponse = string | number | string[];
type StructuredResponse = Record<string, string | number>;
export type QuestionResponse = BasicResponse | StructuredResponse;

export interface FormResponse {
  id: string;
  formId: string;
  respondentId: string;
  responses: Record<string, QuestionResponse>;
  timestamp: Date;
}

// Service Types
export interface Service extends BilingualEntity {
  icon: string;
  longDescription: Bilingual;
  shortDescription: Bilingual;
  subjectsList?: string[];
  categories?: string[];
}

export interface GeneralContentProps {
  ourServices: Bilingual;
  serviceDetails: Bilingual;
  learnMore: Bilingual;
}

// Navigation Types
export interface NavItem {
  href: string;
  label: Bilingual;
}

// UI Component Types
export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

// Pricing Types
export interface PriceInfo {
  duration: string;
  price: string;
}

export interface PricingTableProps {
  pricing: PriceInfo[];
  title: string;
}

// Contact Types
export interface ContactInfo {
  icon: string;
  title: Bilingual;
  content: string;
  href?: string;
}

export interface ContactData extends BilingualEntity {
  contactInfo: ContactInfo[];
}

// Hero Types
export interface Hero extends BilingualEntity {
  subtitle: Bilingual;
  subtitle2: Bilingual;
  already_enrolled: Bilingual;
  sign_in_here: Bilingual;
  sign_in_link: string;
  schedulefreetrial: Bilingual;
  img: {
    imageSrc: string;
    altern: Bilingual;
  };
}

// Feedback Types
export interface FeedbackFormData {
  languageSelection: {
    title: string;
    languages: Bilingual;
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

export interface FeedbackData extends BaseEntity {
  timestamp: string;
  generalInfo: {
    learnerName: string;
    subjects: string[];
  };
  formType: string;
  ratings: Record<string, number>;
  openFeedback: Record<string, string | undefined>;
  quote?: {
    text?: string;
    consent?: string;
  };
}

// Component Props Types
export interface QuestionComponentProps {
  question: Question;
  onChange: (id: string, value: any, skipToNext?: boolean) => void;
  value: any;
  onNext: () => void;
  formData: Record<string, any>;
  setIsQuestionAnswered: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface LanguageSelectorProps {
  onSelectLanguage: (lang: Language) => void;
  data: {
    title: string;
    languages: Bilingual;
  };
}

// Tutoring Page Types
export interface TutoringHero {
  title: Bilingual;
  subtitle: Bilingual;
  stats: Array<{
    value: string;
    label: Bilingual;
  }>;
  cta: {
    primary: {
      text: Bilingual;
      href: string;
    };
    secondary: {
      text: Bilingual;
      href: string;
    };
  };
}

export interface SubjectCategory {
  name: Bilingual;
  icon: string;
  subjects: Array<{
    name: Bilingual;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
    description?: Bilingual;
  }>;
}

export interface TestimonialSlide {
  quote: Bilingual;
  author: string;
  role: Bilingual;
  image: string;
  rating: number;
  subject: Bilingual;
}

export interface TutoringPage {
  hero: TutoringHero;
  features: Array<{
    icon: string;
    title: Bilingual;
    description: Bilingual;
    animation?: string;
  }>;
  subjects: SubjectCategory[];
  process: {
    title: Bilingual;
    steps: Array<{
      number: number;
      title: Bilingual;
      description: Bilingual;
      icon: string;
    }>;
  };
  testimonials: {
    title: Bilingual;
    subtitle: Bilingual;
    slides: TestimonialSlide[];
  };
  pricing: {
    title: Bilingual;
    subtitle: Bilingual;
    plans: Array<{
      name: Bilingual;
      price: Bilingual;
      interval: Bilingual;
      features: Bilingual[];
      popular?: boolean;
      cta: {
        text: Bilingual;
        href: string;
      };
    }>;
  };
  faq: {
    title: Bilingual;
    questions: Array<{
      question: Bilingual;
      answer: Bilingual;
    }>;
  };
  contact: {
    title: Bilingual;
    subtitle: Bilingual;
    form: {
      name: Bilingual;
      email: Bilingual;
      subject: {
        label: Bilingual;
        options: Bilingual[];
      };
      message: Bilingual;
      submit: Bilingual;
    };
  };
}

export interface HeroData {
    hero: Hero;
}

export interface ServiceData {
    services: Service[];
}

// FAQ Types
export interface FAQInfo extends BilingualEntity {
  searchPlaceholder: Bilingual;
  languageToggle: Bilingual;
  scrollToTopLabel: Bilingual;
}

export type FAQItem = {
  id: number;
  question: Bilingual;
  answer: Bilingual;
}

export type FAQItems = FAQItem[];

export interface ContactPageContent {
  title: Bilingual;
  aboutMe: Bilingual;
  aboutLessons: Bilingual;
  subjects: {
    primary: Array<Bilingual>;
    secondary: Array<Bilingual>;
    higher: Array<Bilingual>;
  };
  pricing: {
    higher: Array<{ duration: string; price: string; }>;
    secondary20Plus: Array<{ duration: string; price: string; }>;
    secondary20Minus: Array<{ duration: string; price: string; }>;
  };
  groupLessons: {
    higher: Array<{ duration: string; price: string; }>;
    secondary20Plus: Array<{ duration: string; price: string; }>;
    secondary20Minus: Array<{ duration: string; price: string; }>;
  };
  examTraining: {
    description: Bilingual;
    mathA_C: Array<{ duration: string; price: string; }>;
    mathB: Array<{ duration: string; price: string; }>;
  };
  flexibilityPremium: Array<{ duration: string; price: string; }>;
  travelCosts: Array<{ duration: string; price: string; }>;
  lastMinuteSurcharges: Array<{ timeFrame: string; percentage: number; }>;
  contactItems: Array<{
    icon: string;
    title: Bilingual;
    content: string;
    href: string;
  }>;
}

export interface GroupLessons {
  available: boolean;
  locations: string[];
  info: string;
}

export interface PreferredLocation {
  name: string;
  reason: string;
  transport: string;
}

export interface LocationHighlight {
  name: string;
  benefit: string;
  accessibility: string;
}

export interface OnlineFeatures {
  platform: string;
  benefits: string[];
  requirements: string;
}

export interface Location {
  id: string;
  name: string;
  title: string;
  description: string;
  keywords: string[];
  metaDescription: string;
  address: string;
  postalCode: string;
  area: string;
  mapUrl: string;
  groupLessons?: GroupLessons;
  preferredLocation?: PreferredLocation;
  locationHighlight?: LocationHighlight;
  onlineFeatures?: OnlineFeatures;
}

export interface Footer {
    title: Bilingual;
    description: Bilingual;
    servicesLabel: Bilingual;
    services: NavItem[];
    infoLabel: Bilingual;
    info: NavItem[];
    contactLabel: Bilingual;
    copyright: Bilingual;
}