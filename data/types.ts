'use client';

import { LucideIcon } from "lucide-react";


// Basic types
export type Language = 'EN' | 'NL';

export type Bilingual = {
    EN: string | string[] | { [key: string]: any }[];
    NL: string | string[] | { [key: string]: any }[];
};

export type TranslationFunction = (key: Bilingual) => string | string[] | { [key: string]: any }[];

export type QuestionType = 'text' | 'textarea' | 'email' | 'number' | 'vakkenSelector' | 'multipleChoice' | 'rating';

export type Conditional = {
    dependsOn: string;
    showIf: string;
};

// Question types
export interface BaseQuestion {
    id: string;
    type: QuestionType;
    question: Bilingual;
    required: boolean;
    conditional?: Conditional;
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
    options: {
        value: string;
        label: Bilingual;
    }[];
}

export interface RatingQuestion extends BaseQuestion {
    type: 'rating';
    max?: number;
}

export interface VakkenSelectorQuestion extends BaseQuestion {
    type: 'vakkenSelector';
    // Add any additional properties specific to this question type
}

export type Question = TextQuestion | NumberQuestion | MultipleChoiceQuestion | VakkenSelectorQuestion | RatingQuestion;

// Form structure types
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

// Response types
export type QuestionResponse = string | number | string[] | Record<string, string | number>;

export interface FormResponse {
    formId: string;
    respondentId: string;
    responses: {
        [questionId: string]: QuestionResponse;
    };
    timestamp: Date;
}

// Blog types
export interface BlogPostType {
    id: number;
    title: Bilingual;
    content: Bilingual;
    author: string;
    date: string;
    tags: string[];
}

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

export interface Testimonial {
    text: Bilingual;
    author: string;
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
    about: AboutData;
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

// FAQ types
export interface FAQItem {
    id: number;
    question: Bilingual;
    answer: Bilingual;
}

export interface FAQInfoType {
    title: Bilingual;
    description: Bilingual;
    searchPlaceholder: Bilingual;
    languageToggle: Bilingual;
    scrollToTopLabel: Bilingual;
}

export type FAQItemsType = FAQItem[];

export interface FAQDataType {
    faqInfo: FAQInfoType;
    faqItems: FAQItemsType;
}

// Bijgewerkte types voor de About-pagina
export interface QuestionAnswer {
    question: string;
    answer: string;
}

export interface DetailedInfo {
    EN: QuestionAnswer[];
    NL: QuestionAnswer[];
}

export interface AboutData {
    title: Bilingual;
    introduction: {
        heading: Bilingual;
        paragraphs: {
            EN: string[];
            NL: string[];
        };
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
    detailedInfo: DetailedInfo;
}

type BilingualArray = {
    EN: string[];
    NL: string[];
};

type BilingualQA = {
    EN: QuestionAnswer[];
    NL: QuestionAnswer[];
};

// Welcome screen types
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

// Form description types
export interface FormDescription {
    title: string;
    description: string;
    icon: LucideIcon;
}

export interface FormDescriptions {
    [key: string]: {
        [key in 'short' | 'long']: FormDescription;
    };
}

export interface FormTypeSelectorProps {
    onSelectFormType: (type: 'short' | 'long') => void;
}