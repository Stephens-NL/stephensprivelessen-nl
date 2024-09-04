'use client';

import { LucideIcon } from "lucide-react";

// Language type
export type Language = 'EN' | 'NL';

// Bilingual type for handling multilingual content
export type Bilingual<T = string | string[] | Record<string, any>> = {
  [key in Language]: T;
};

// Translation function type
export type TranslationFunction = (key: Bilingual) => string | string[] | Record<string, any>;

// Define question types
export type QuestionType = 'text' | 'textarea' | 'email' | 'number' | 'vakkenSelector' | 'multipleChoice' | 'rating';

// Blog-related types
export interface BlogPost {
  id: number;
  title: Bilingual;
  content: Bilingual;
  author: string;
  date: string;
  tags: string[];
  imageUrl?: string;
  altText?: Bilingual;
}

export type BlogPosts = BlogPost[];

export interface BlogInfo {
  title: Bilingual;
  description: Bilingual;
}

// Navigation and Service types
export interface NavItem {
  href: string;
  label: Bilingual;
}

export interface GeneralContentProps {
  ourServices: Bilingual;
  serviceDetails: Bilingual;
  learnMore: Bilingual;
}

export interface Service {
  icon: string;
  title: Bilingual;
  longDescription: Bilingual;
  shortDescription: Bilingual;
  subjectsList?: string[];
  categories?: string[];
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
  title: Bilingual;
  description: Bilingual;
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

export interface ModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

// Feedback Form and Questions Types
export interface Conditional {
  dependsOn: string;
  showIf: string;
}

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  label: Bilingual;
  required: boolean;
  conditional?: Conditional;
  comment?: Bilingual;
}

export interface TextQuestion extends BaseQuestion {
  type: 'text' | 'email' | 'textarea';
  placeholder?: Bilingual;
}

export interface NumberQuestion extends BaseQuestion {
  type: 'number';
  min?: number;
  max?: number;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multipleChoice';
  options: { value: string; label: Bilingual }[];
}

export interface VakkenSelectorQuestion extends BaseQuestion {
  type: 'vakkenSelector';
}

export interface RatingQuestion extends BaseQuestion {
  type: 'rating';
  max?: number;
}

export type Question = TextQuestion | NumberQuestion | MultipleChoiceQuestion | VakkenSelectorQuestion | RatingQuestion;

export interface QuestionGroup {
  id: string;
  title: Bilingual;
  questions: Question[];
}

export interface PersonalIntermezzo {
  id: string;
  title: Bilingual;
  content: Bilingual;
}

export type FormSection = QuestionGroup | PersonalIntermezzo;

export interface FeedbackForm {
  id: string;
  title: Bilingual;
  description: Bilingual;
  sections: FormSection[];
  conclusion: Bilingual;
}

// Form Response Types
export interface FormResponse {
  formId: string;
  respondentId: string;
  responses: Record<string, QuestionResponse>;
  timestamp: Date;
}

export type QuestionResponse = string | number | string[] | Record<string, string | number>;

// FAQ Types
export interface FAQItem {
  id: number;
  question: Bilingual;
  answer: Bilingual;
}

export type FAQItems = FAQItem[];

export interface FAQInfo {
  title: Bilingual;
  description: Bilingual;
  searchPlaceholder: Bilingual;
  languageToggle: Bilingual;
  scrollToTopLabel: Bilingual;
}

export interface FAQData {
  faqInfo: FAQInfo;
  faqItems: FAQItems;
}

// Welcome Screen Types
export interface WelcomeScreenData {
  languageSelection: {
    title: Bilingual;
    languages: Record<string, string>;
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

export interface QuickLink {
  href: string;
  label: Bilingual;
}

export interface Footer {
  title: Bilingual;
  description: Bilingual;
  quickLinksLabel: Bilingual;
  quickLinks: QuickLink[];
  contactLabel: Bilingual;
  email: string;
  phone: string;
  copyright: Bilingual;
}

// Form Descriptions
export interface FormDescription {
  title: string;
  description: string;
  icon: LucideIcon;
}

export type FormDescriptions = Record<string, Record<'short' | 'long', FormDescription>>;

// Custom Radio Button Props
export interface CustomRadioProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

// Dashboard-specific types
export interface ChartDataPoint {
  date: string;
  count: number;
  avgRating: number;
}

export interface PieChartDataPoint {
  name: string;
  value: number;
}

export type FilterOption = 'all' | 'high' | 'low';
export type ChartType = 'line' | 'pie';

export interface ExpandedEntries {
  [key: number]: boolean;
}

// Contact Page Content Structure
export interface ContactInfo {
  icon: string;
  title: Bilingual;
  content: string;
  link: string;
}

export interface Subject {
  EN: string;
  NL: string;
}

export interface PriceInfo {
  duration: string;
  price: string;
}

export interface Hero {
  title: Bilingual;
  subtitle: Bilingual;
  subtitle2: Bilingual;
  already_enrolled: Bilingual;
  sign_in_here: Bilingual;
  sign_in_link: string;
  schedulefreetrial: Bilingual;
  img: { imageSrc: string; altern: Bilingual };
}

export interface ContactPageContent {
  title: Bilingual;
  aboutMe: Bilingual;
  aboutLessons: Bilingual;
  subjects: {
    primary: Subject[];
    secondary: Subject[];
    higher: Subject[];
  };
  pricing: {
    primary: PriceInfo[];
    secondary: PriceInfo[];
    higher: PriceInfo[];
  };
  groupLessons: {
    secondary: PriceInfo[];
    higher: PriceInfo[];
  };
  examTraining: {
    description: Bilingual;
    mathA_C: PriceInfo[];
    mathB: PriceInfo[];
  };
  contactItems: ContactInfo[];
}

// Backwards Compatibility Types
export type LabelGroup = QuestionGroup;
export type VakkenSelectorLabel = VakkenSelectorQuestion;

export interface IntroSectionProps {
  title: string;
  heading: string;
  paragraphs: string[];
  imageSrc: string;
  altText: string;
}

export type VakkenData = Bilingual[];

export type SiteTitle = Bilingual;

export type QuestionAnswer = {
  question: string;
  answer: string;
};

export interface IntroductionContent {
  title: Bilingual;
  description: Bilingual;
}

interface PhilosophyPoint {
  title: Bilingual;
  description: Bilingual;
}

interface CTA {
  title: Bilingual;
  description: Bilingual;
  buttonText: Bilingual;
  buttonLink: string;
}

interface DetailedInfo {
  question: string;
  answer: string;
}

export interface About {
  title: Bilingual;
  introduction: {
    heading: Bilingual;
    paragraphs: Bilingual;
    altText: Bilingual;
    imageSrc: string;
  };
  philosophyTitle: Bilingual;
  philosophyPoints: PhilosophyPoint[];
  cta: CTA;
  detailedTitle: Bilingual;
  detailedInfo: {
    EN: DetailedInfo[];
    NL: DetailedInfo[];
  };
}

export interface AboutData {
  about: About;
  introductionContent: IntroductionContent;
}