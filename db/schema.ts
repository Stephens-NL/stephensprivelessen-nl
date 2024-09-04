import { pgTable, serial, varchar, jsonb } from 'drizzle-orm/pg-core';

// Defineer het AboutData schema
export const about = pgTable('about', {
  id: serial('id').primaryKey(),
  title: jsonb('title').notNull(), // Bilingual data
  introduction: jsonb('introduction').notNull(), // Bilingual data met tekst en afbeelding
  philosophyTitle: jsonb('philosophyTitle').notNull(),
  philosophyPoints: jsonb('philosophyPoints').array().notNull(), // Array van punten
  cta: jsonb('cta').notNull(), // Call to action
  detailedInfo: jsonb('detailedInfo').notNull(), // FAQ sectie
});

// Defineer het BlogInfo schema
export const blogInfo = pgTable('blog_info', {
  id: serial('id').primaryKey(),
  title: jsonb('title').notNull(), // Bilingual data
  description: jsonb('description').notNull(), // Bilingual data
});

// Defineer het BlogPosts schema
export const blogPosts = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  title: jsonb('title').notNull(), // Bilingual data
  content: jsonb('content').notNull(), // Bilingual data
  author: varchar('author', { length: 50 }).notNull(),
  date: varchar('date', { length: 50 }).notNull(),
  tags: jsonb('tags').array().notNull(), // Array van tags
});

// Defineer het ContactPageContent schema
export const contactData = pgTable('contact_data', {
  id: serial('id').primaryKey(),
  title: jsonb('title').notNull(), // Bilingual title
  aboutMe: jsonb('aboutMe').notNull(), // Bilingual about me section
  aboutLessons: jsonb('aboutLessons').notNull(), // Bilingual about lessons section
  subjects: jsonb('subjects').notNull(), // Array of subjects offered
  pricing: jsonb('pricing').notNull(), // Pricing details for different levels
  groupLessons: jsonb('groupLessons').notNull(), // Group lessons details
  examTraining: jsonb('examTraining').notNull(), // Exam training details
  contactItems: jsonb('contactItems').notNull(), // Contact information
});

// Defineer het FAQInfo schema
export const faqInfo = pgTable('faq_info', {
  id: serial('id').primaryKey(),
  title: jsonb('title').notNull(), // Bilingual title
  description: jsonb('description').notNull(), // Bilingual description
  searchPlaceholder: jsonb('searchPlaceholder').notNull(), // Bilingual search placeholder text
  languageToggle: jsonb('languageToggle').notNull(), // Language toggle text
  scrollToTopLabel: jsonb('scrollToTopLabel').notNull(), // Scroll to top label
});

// Defineer het FAQItems schema
export const faqItems = pgTable('faq_items', {
  id: serial('id').primaryKey(),
  question: jsonb('question').notNull(), // Bilingual question
  answer: jsonb('answer').notNull(), // Bilingual answer
});

// Defineer het WelcomeScreenData schema
export const welcomeScreenData = pgTable('welcome_screen_data', {
  id: serial('id').primaryKey(),
  languageSelection: jsonb('languageSelection').notNull(), // Bilingual language selection
  welcome: jsonb('welcome').notNull(), // Bilingual welcome message
  lengthSelection: jsonb('lengthSelection').notNull(), // Bilingual length selection
  navigation: jsonb('navigation').notNull(), // Navigation buttons text
  submitCTA: jsonb('submitCTA').notNull(), // Call to action for submit
  farewell: jsonb('farewell').notNull(), // Farewell message
});

// Defineer het PersonalIntermezzo schema
export const personalIntermezzi = pgTable('personal_intermezzi', {
  id: serial('id').primaryKey(),
  title: jsonb('title').notNull(), // Bilingual title
  content: jsonb('content').notNull(), // Bilingual content
});

// Defineer het FeedbackForm schema
export const feedbackForm = pgTable('feedback_form', {
  id: serial('id').primaryKey(),
  title: jsonb('title').notNull(), // Bilingual form title
  description: jsonb('description').notNull(), // Bilingual form description
  sections: jsonb('sections').array().notNull(), // Array of form sections
  conclusion: jsonb('conclusion').notNull(), // Bilingual conclusion message
});

// Defineer het Footer schema
export const footer = pgTable('footer', {
  id: serial('id').primaryKey(),
  title: jsonb('title').notNull(), // Bilingual title
  description: jsonb('description').notNull(), // Bilingual description
  quickLinksLabel: jsonb('quickLinksLabel').notNull(), // Bilingual label for quick links
  quickLinks: jsonb('quickLinks').array().notNull(), // Array of quick links with bilingual labels
  contactLabel: jsonb('contactLabel').notNull(), // Bilingual contact label
  email: varchar('email', { length: 255 }).notNull(), // Email address
  phone: varchar('phone', { length: 50 }).notNull(), // Phone number
  copyright: jsonb('copyright').notNull(), // Bilingual copyright text
});

// Defineer het Hero schema
export const hero = pgTable('hero', {
  id: serial('id').primaryKey(),
  title: jsonb('title').notNull(), // Bilingual title
  subtitle: jsonb('subtitle').notNull(), // Bilingual subtitle
  subtitle2: jsonb('subtitle2').notNull(), // Bilingual secondary subtitle
  alreadyEnrolled: jsonb('already_enrolled').notNull(), // Bilingual text for already enrolled
  signInHere: jsonb('sign_in_here').notNull(), // Bilingual sign in text
  signInLink: varchar('sign_in_link', { length: 255 }).notNull(), // Link for sign in
  scheduleFreeTrial: jsonb('schedulefreetrial').notNull(), // Bilingual text for scheduling a free trial
  imgSrc: varchar('img_src', { length: 255 }).notNull(), // Image source path
  imgAlt: jsonb('altern').notNull(), // Bilingual alternative text for the image
});

// Defineer het Metadata schema
export const metadata = pgTable('metadata', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(), // Metadata title
  description: varchar('description', { length: 255 }).notNull(), // Metadata description
  openGraph: jsonb('openGraph').notNull(), // Open Graph metadata
  twitter: jsonb('twitter').notNull(), // Twitter metadata
});

// Defineer het Navigation schema
export const navigation = pgTable('navigation', {
  id: serial('id').primaryKey(),
  href: varchar('href', { length: 255 }).notNull(), // Link href
  label: jsonb('label').notNull(), // Bilingual label
});

// Defineer het Services schema
export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  icon: varchar('icon', { length: 255 }).notNull(), // Icon path
  title: jsonb('title').notNull(), // Bilingual title
  shortDescription: jsonb('shortDescription').notNull(), // Bilingual short description
  longDescription: jsonb('longDescription').notNull(), // Bilingual long description
});

// Defineer het General Content schema
export const generalContent = pgTable('general_content', {
  id: serial('id').primaryKey(),
  ourServices: jsonb('our_services').notNull(), // Bilingual "Our Services" text
  serviceDetails: jsonb('service_details').notNull(), // Bilingual service details description
  learnMore: jsonb('learn_more').notNull(), // Bilingual "Learn More" text
});

// Defineer het Testimonials schema
export const testimonials = pgTable('testimonials', {
  id: serial('id').primaryKey(),
  text: jsonb('text').notNull(), // Bilingual testimonial text
  author: varchar('author', { length: 255 }).notNull(), // Testimonial author
});

// Defineer het Vakken Data schema
export const vakkenData = pgTable('vakken_data', {
  id: serial('id').primaryKey(),
  nl: varchar('nl', { length: 255 }).notNull(), // Dutch subject name
  en: varchar('en', { length: 255 }).notNull(), // English subject name
});