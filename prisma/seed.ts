import { PrismaClient } from '@prisma/client'
import { about, blogInfo, blogPosts, services, testimonials, faqInfo, faqItems, navigation, hero, footer, contactData, welcomeScreenData, longVersionIntermezzi } from '../data'

const prisma = new PrismaClient()

async function main() {
    // Seed About data
    await prisma.about.create({
        data: {
            ...about,
            introduction: JSON.stringify(about.introduction),
            philosophyPoints: JSON.stringify(about.philosophyPoints),
            cta: JSON.stringify(about.cta),
            detailedInfo: JSON.stringify(about.detailedInfo),
        }
    })

    // Seed Blog Info
    await prisma.blogInfo.create({ data: blogInfo })

    // Seed Blog Posts
for (const post of blogPosts) {
    await prisma.blogPost.upsert({
        where: { id: post.id },
        update: {
            title: post.title, // Remove JSON.stringify
            content: post.content, // Remove JSON.stringify
            author: post.author,
            date: new Date(post.date),
            tags: post.tags,
        },
        create: {
            id: post.id,
            title: post.title, // Remove JSON.stringify
            content: post.content, // Remove JSON.stringify
            author: post.author,
            date: new Date(post.date),
            tags: post.tags,
        },
    })
}

    // Seed Services
    for (const service of services) {
        await prisma.service.create({
            data: {
                ...service,
                title: JSON.stringify(service.title),
                shortDescription: JSON.stringify(service.shortDescription),
                longDescription: JSON.stringify(service.longDescription),
            }
        })
    }

    // Seed Testimonials
    for (const testimonial of testimonials) {
        await prisma.testimonial.create({
            data: {
                ...testimonial,
                text: JSON.stringify(testimonial.text),
            }
        })
    }

    // Seed FAQ Info
    await prisma.fAQInfo.create({
        data: {
            ...faqInfo,
            title: JSON.stringify(faqInfo.title),
            description: JSON.stringify(faqInfo.description),
            searchPlaceholder: JSON.stringify(faqInfo.searchPlaceholder),
            languageToggle: JSON.stringify(faqInfo.languageToggle),
            scrollToTopLabel: JSON.stringify(faqInfo.scrollToTopLabel),
        }
    })

    // Seed FAQ Items
    for (const item of faqItems) {
        await prisma.fAQ.upsert({
            where: { id: item.id },
            update: {
                question: JSON.stringify(item.question),
                answer: JSON.stringify(item.answer),
            },
            create: {
                id: item.id,
                question: JSON.stringify(item.question),
                answer: JSON.stringify(item.answer),
            },
        })
    }

    // Seed Navigation
    for (const item of navigation) {
        await prisma.navigation.create({
            data: {
                ...item,
                label: JSON.stringify(item.label),
            }
        })
    }

    // Seed Hero
    await prisma.hero.create({
        data: {
            title: JSON.stringify(hero.title),
            subtitle: JSON.stringify(hero.subtitle),
            subtitle2: JSON.stringify(hero.subtitle2),
            alreadyEnrolled: JSON.stringify(hero.already_enrolled),
            signInHere: JSON.stringify(hero.sign_in_here),
            signInLink: hero.sign_in_link, // Add this line
            scheduleFreeTrial: JSON.stringify(hero.schedulefreetrial),
            img: JSON.stringify(hero.img),
        }
    })

    // Seed Footer
    await prisma.footer.create({
        data: {
            title: JSON.stringify(footer.title),
            description: JSON.stringify(footer.description),
            quickLinksLabel: JSON.stringify(footer.quickLinksLabel),
            quickLinks: JSON.stringify(footer.quickLinks),  // Add this line
            contactLabel: JSON.stringify(footer.contactLabel),
            email: footer.email,
            phone: footer.phone,
            copyright: JSON.stringify(footer.copyright),
        }
    })

    // Seed Contact Data
    await prisma.contactPageContent.create({
        data: {
            ...contactData,
            title: JSON.stringify(contactData.title),
            aboutMe: JSON.stringify(contactData.aboutMe),
            aboutLessons: JSON.stringify(contactData.aboutLessons),
            subjects: JSON.stringify(contactData.subjects),
            pricing: JSON.stringify(contactData.pricing),
            groupLessons: JSON.stringify(contactData.groupLessons),
            examTraining: JSON.stringify(contactData.examTraining),
            contactItems: JSON.stringify(contactData.contactItems),
        }
    })

    // Seed Welcome Screen Data
    await prisma.welcomeScreenData.create({
        data: {
            ...welcomeScreenData,
            languageSelection: JSON.stringify(welcomeScreenData.languageSelection),
            welcome: JSON.stringify(welcomeScreenData.welcome),
            lengthSelection: JSON.stringify(welcomeScreenData.lengthSelection),
            navigation: JSON.stringify(welcomeScreenData.navigation),
            submitCTA: JSON.stringify(welcomeScreenData.submitCTA),
            farewell: JSON.stringify(welcomeScreenData.farewell),
        }
    })

    // Seed Personal Intermezzi
    for (const intermezzo of longVersionIntermezzi) {
        await prisma.personalIntermezzo.create({
            data: {
                ...intermezzo,
                title: JSON.stringify(intermezzo.title),
                content: JSON.stringify(intermezzo.content),
            }
        })
    }

    console.log('Database has been seeded.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })