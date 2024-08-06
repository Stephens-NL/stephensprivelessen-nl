'use client';

import { TextQuestion } from "./";

export type Language = 'EN' | 'NL';

export type Bilingual<T = string> = {
    EN: T;
    NL: T;
};

export type TranslationFunction = (key: Bilingual) => string;

export type Props = {
    question: TextQuestion;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    language: 'en' | 'nl';
};

// Definieer het type voor een enkele blogpost
export type BlogPostType = {
    id: number;
    title: Bilingual;
    content: Bilingual;
    author: string;
    date: string;
    tags: string[];
};

// Definieer het type voor de collectie van blogposts
export type BlogPostsType = BlogPostType[];


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
    icon: string
    title: Bilingual
    description: Bilingual
}

export interface PhilosophyPoint {
    title: Bilingual;
    description: Bilingual;
}

export interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
}

// Voeg dit toe aan het einde van types.ts

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
            paragraphs: Bilingual<string[]>;
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