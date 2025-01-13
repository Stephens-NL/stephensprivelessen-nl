export interface BilingualText {
  EN: string;
  NL: string;
}

export interface TutoringHero {
  title: BilingualText;
  subtitle: BilingualText;
  backgroundVideo?: string;
  stats: Array<{
    value: string;
    label: BilingualText;
  }>;
  cta: {
    primary: {
      text: BilingualText;
      href: string;
    };
    secondary: {
      text: BilingualText;
      href: string;
    };
  };
}

export interface TutoringFeature {
  icon: string;
  title: BilingualText;
  description: BilingualText;
  animation?: string;
  image?: string;
}

export interface Subject {
  name: BilingualText;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
}

export interface SubjectCategory {
  name: BilingualText;
  icon: string;
  subjects: Subject[];
}

export interface ProcessStep {
  number: number;
  title: BilingualText;
  description: BilingualText;
  icon: string;
}

export interface TestimonialSlide {
  quote: BilingualText;
  author: string;
  role: BilingualText;
  image: string;
  rating: number;
  subject: BilingualText;
}

export interface PricingPlan {
  name: BilingualText;
  price: BilingualText;
  interval: BilingualText;
  features: BilingualText[];
  popular?: boolean;
  cta: {
    text: BilingualText;
    href: string;
  };
}

export interface FAQ {
  question: BilingualText;
  answer: BilingualText;
}

export interface ContactForm {
  name: BilingualText;
  email: BilingualText;
  subject: {
    label: BilingualText;
    options: BilingualText[];
  };
  message: BilingualText;
  submit: BilingualText;
}

export interface TutoringPage {
  hero: TutoringHero;
  features: TutoringFeature[];
  subjects: SubjectCategory[];
  process: {
    title: BilingualText;
    steps: ProcessStep[];
  };
  testimonials: {
    title: BilingualText;
    subtitle: BilingualText;
    slides: TestimonialSlide[];
  };
  pricing: {
    title: BilingualText;
    subtitle: BilingualText;
    plans: PricingPlan[];
  };
  faq: {
    title: BilingualText;
    questions: FAQ[];
  };
  contact: {
    title: BilingualText;
    subtitle: BilingualText;
    form: ContactForm;
  };
} 