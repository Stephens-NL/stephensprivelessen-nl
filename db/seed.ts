import { drizzle } from 'drizzle-orm/postgres-js'; // Correct import for Postgres
import { Pool } from 'pg';
import {
  about,
  blogInfo,
  blogPosts,
  contactData,
  faqInfo,
  faqItems,
  welcomeScreenData,
  personalIntermezzi,
  feedbackForm,
  footer,
  hero,
  translations,
  metadata,
  navigation,
  services,
  generalContent,
  testimonials,
  vakkenData
} from './schema';

import {
  about as aboutData,
  blogInfo as blogInfoData,
  blogPosts as blogPostsData,
  contactData as contactDataInfo,
  faqInfo as faqInfoData,
  faqItems as faqItemsData,
  welcomeScreenData as welcomeScreen,
  longVersionIntermezzi,
  shortVersionIntermezzi,
  longVersion,
  shortVersion,
  footer as footerData,
  hero as heroData,
  translations as translationsData,
  metadata as metadataData,
  navigation as navigationData,
  services as servicesData,
  generalContent as generalContentData,
  testimonials as testimonialsData,
  vakkenData as vakkenDataInfo
} from '../data';

// Set up the database connection
const pool = new Pool({
  connectionString: 'postgres://username:password@localhost:5432/yourdatabase',
});

const db = drizzle(pool);

async function seedDatabase() {
  await db.insert(about).values(aboutData);
  await db.insert(blogInfo).values(blogInfoData);
  await db.insert(blogPosts).values(blogPostsData);
  await db.insert(contactData).values(contactDataInfo);
  await db.insert(faqInfo).values(faqInfoData);
  await db.insert(faqItems).values(faqItemsData);
  await db.insert(welcomeScreenData).values(welcomeScreen);
  await db.insert(personalIntermezzi).values(longVersionIntermezzi);
  await db.insert(personalIntermezzi).values(shortVersionIntermezzi);
  await db.insert(feedbackForm).values(longVersion);
  await db.insert(feedbackForm).values(shortVersion);
  await db.insert(footer).values(footerData);
  await db.insert(hero).values(heroData);
  await db.insert(translations).values(translationsData);
  await db.insert(metadata).values(metadataData);
  await db.insert(navigation).values(navigationData);
  await db.insert(services).values(servicesData);
  await db.insert(generalContent).values(generalContentData);
  await db.insert(testimonials).values(testimonialsData);
  await db.insert(vakkenData).values(vakkenDataInfo);

  console.log("Database seeding complete!");
  process.exit(0);
}

seedDatabase().catch(err => {
  console.error("Error seeding database:", err);
  process.exit(1);
});