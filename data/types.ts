'use client';

import { LucideIcon } from "lucide-react";
import { IconType } from 'react-icons/lib';


// Language type
export type Language = 'EN' | 'NL';

// Bilingual type for handling multilingual content
type Bilingual<T = string | string[] | Record<string, any>> = {
  [key in Language]: T;
};

// Translation function type
export type TranslationFunction = (key: Bilingual) => string | string[] | Record<string, any>;

export type TranslatedObject = Bilingual;

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

export interface CollapsibleSectionProps {
  title: Bilingual;  // Assuming title is a string
  children: React.ReactNode;
}

export interface SubjectListProps {
  subjects: Subject[],
  title: Bilingual

}

interface Pricing {
  duration: string;
  price: string;
}

export interface PricingTableProps {
  pricing: Pricing[];
  title: string;
}

export interface LanguageSelectionData {
  title: string;
  languages: Bilingual;
}

export interface WelcomeScreenData {
  title: Bilingual;
  description: Bilingual;
  startButtonText: Bilingual;
}

interface NavigationData {
  back: Bilingual;
  next: Bilingual;
  submit: Bilingual;
}

interface SubmitCTAData {
  title: Bilingual;
  description: Bilingual;
  buttonText: Bilingual;
}

interface FarewellData {
  title: Bilingual;
  message: Bilingual;
  closeButtonText: Bilingual;
}

interface LengthSelectionData {
  title: Bilingual;
  shortOption: Bilingual;
  longOption: Bilingual;
}

export interface FeedbackFormDataImportProps {
  feedbackFormData: FeedbackFormData;
}

// Welcome Screen Types
export interface FeedbackFormData {
  languageSelection: LanguageSelectionData;
  welcome: WelcomeScreenData;
  lengthSelection: LengthSelectionData;
  navigation: NavigationData;
  submitCTA: SubmitCTAData;
  farewell: FarewellData;
}

export interface QuickLink {
  href: string;
  label: Bilingual;
}

export interface FooterData {
  footer: Footer;
}
export interface Footer {
  title: Bilingual;
  description: Bilingual;
  quickLinksLabel: Bilingual;
  quickLinks: QuickLink[];
  contactLabel: Bilingual;
  contact: {
    email: string;
    phone: string;
  }
  copyright: Bilingual;
}

export interface ServiceData {
  generalContent: GeneralContentProps;
  services: Service[];
  categories: ServiceCategory[];
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

export type IconMap = {
  [K in 'FaPhone' | 'FaEnvelope' | 'FaMapMarkerAlt' | 'FaWhatsapp']: IconType;
};

export interface ContactInfoProps {
  icon: string;
  title: Bilingual;
  content: string;
  href?: string;

}

export interface ContactData {
  title: Bilingual
  subtitle: Bilingual
  contactInfo: ContactInfoProps[];

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

export interface HeroData {
  hero: Hero;
}

export type Subject = Bilingual;

export type PriceInfo = {
  duration: string;
  price: string;
};

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
    higher: PriceInfo[];
    secondary20Plus: PriceInfo[];
    secondary20Minus: PriceInfo[];
  };
  groupLessons: {
    higher: PriceInfo[];
    secondary20Plus: PriceInfo[];
    secondary20Minus: PriceInfo[];
  };
  examTraining: {
    description: Bilingual;
    mathA_C: PriceInfo[];
    mathB: PriceInfo[];
  };
  flexibilityPremium: {
    duration: string;
    price: string;
  }[];
  travelCosts: {
    duration: string;
    price: string;
  }[];
  lastMinuteSurcharges: {
    timeFrame: string;
    percentage: number;
  }[];
  contactItems: ContactInfoProps[];
}

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

export interface FeedbackData {
  id: string;
  timestamp: string;
  generalInfo: {
    learnerName: string;
    subjects: string[];
  };
  formType: string;
  ratings: {
    overallQuality: number;
    [key: string]: number;
  };
  openFeedback: {
    mostValuable?: string;
    improvements?: string;
    suggestions?: string;
    [key: string]: string | undefined;
  };
  quote: {
    text?: string;
    consent?: string;
  };
}
// interface formData {
//   learnerName: string;
//   subjects: string[];
//   overallRating: number;
//   mostValuable: string;
//   quickImprovement?: string;
//   quoteConsent?: 'yes' | 'no';
//   quoteText?: string;
// }
export interface FeedbackSummaryProps {
  formData: {
    learnerName?: string;
    subject?: string[];
    overallRating?: number;
    mostValuable?: string;
    quickImprovement?: string;
    quoteConsent?: 'yes' | 'no';
    quoteText?: string;
  };
  onSubmit: () => void;
  onEdit: () => void;
}

export interface RenderSummaryItemProps {
  label: string;
  value?: string | number; // Value can be optional and either a string or a number.
}

// feedbackData.ts
export interface FeedbackSummaryData {
  headings: {
    feedbackSummary: Bilingual,
    generalInformation: Bilingual,
    ratings: Bilingual,
    openFeedback: Bilingual,
    quote: Bilingual,
  },
  labels: {
    name: Bilingual,
    subjects: Bilingual,
    overallRating: Bilingual,
    mostValuableAspect: Bilingual,
    suggestionForImprovement: Bilingual,
    quoteText: Bilingual,
  },
  buttons: {
    editFeedback: Bilingual,
    submitCTA: Bilingual,
  },
};

export interface FormTypeSelectorProps {
  onSelectFormType: (formType: 'short' | 'long') => void;
}