'use client';

import { LucideIcon } from "lucide-react";
import { IconType } from 'react-icons/lib';


// Base Types
export type Language = 'EN' | 'NL';

export type Bilingual<T = string> = {
  [key in Language]: T;
};

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
};

interface BaseQuestion extends BaseEntity, BaseQuestionConfig {
  label: Bilingual;
}

interface TextInputQuestion extends BaseQuestion {
  type: 'text' | 'email' | 'textarea';
  placeholder?: Bilingual;
}

interface NumberInputQuestion extends BaseQuestion {
  type: 'number' | 'rating';
  min?: number;
  max?: number;
}

interface ChoiceQuestion extends BaseQuestion {
  type: 'multipleChoice';
  options: Array<{
    value: string;
    label: Bilingual;
  }>;
}

interface SelectorQuestion extends BaseQuestion {
  type: 'vakkenSelector';
}

export type Question = TextInputQuestion | NumberInputQuestion | ChoiceQuestion | SelectorQuestion;

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
  backgroundVideo?: string;
  stats: Array<{
    number: string;
    label: Bilingual;
  }>;
  cta: {
    primary: Bilingual;
    secondary: Bilingual;
  };
}

export interface TutoringFeature {
  icon: string;
  title: Bilingual;
  description: Bilingual;
  image?: string;
  animation?: string;
}

export interface SubjectCategory {
  name: Bilingual;
  icon: string;
  subjects: Array<{
    name: Bilingual;
    level: string[];
    description: Bilingual;
    image?: string;
  }>;
}

export interface TestimonialSlide {
  quote: Bilingual;
  author: string;
  role: Bilingual;
  image?: string;
  rating: number;
  subject: string;
}

export interface TutoringPage {
  id: string;
  hero: TutoringHero;
  features: TutoringFeature[];
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
      features: Bilingual[];
      isPopular?: boolean;
      cta: Bilingual;
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
      subject: Bilingual;
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