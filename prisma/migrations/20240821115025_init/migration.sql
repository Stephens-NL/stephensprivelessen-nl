-- CreateTable
CREATE TABLE "About" (
    "id" TEXT NOT NULL,
    "title" JSONB NOT NULL,
    "introduction" JSONB NOT NULL,
    "philosophyTitle" JSONB NOT NULL,
    "philosophyPoints" JSONB NOT NULL,
    "cta" JSONB NOT NULL,
    "detailedInfo" JSONB NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "title" JSONB NOT NULL,
    "shortDescription" JSONB NOT NULL,
    "longDescription" JSONB NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" SERIAL NOT NULL,
    "title" JSONB NOT NULL,
    "content" JSONB NOT NULL,
    "author" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogInfo" (
    "id" TEXT NOT NULL,
    "title" JSONB NOT NULL,
    "description" JSONB NOT NULL,

    CONSTRAINT "BlogInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "text" JSONB NOT NULL,
    "author" TEXT NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedbackForm" (
    "id" TEXT NOT NULL,
    "title" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "sections" JSONB NOT NULL,
    "conclusion" JSONB NOT NULL,

    CONSTRAINT "FeedbackForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vak" (
    "id" TEXT NOT NULL,
    "name" JSONB NOT NULL,

    CONSTRAINT "Vak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedbackResponse" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "respondentId" TEXT NOT NULL,
    "responses" JSONB NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeedbackResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" SERIAL NOT NULL,
    "question" JSONB NOT NULL,
    "answer" JSONB NOT NULL,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FAQInfo" (
    "id" TEXT NOT NULL,
    "title" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "searchPlaceholder" JSONB NOT NULL,
    "languageToggle" JSONB NOT NULL,
    "scrollToTopLabel" JSONB NOT NULL,

    CONSTRAINT "FAQInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Navigation" (
    "id" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "label" JSONB NOT NULL,

    CONSTRAINT "Navigation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hero" (
    "id" TEXT NOT NULL,
    "title" JSONB NOT NULL,
    "subtitle" JSONB NOT NULL,
    "subtitle2" JSONB NOT NULL,
    "alreadyEnrolled" JSONB NOT NULL,
    "signInHere" JSONB NOT NULL,
    "signInLink" TEXT NOT NULL,
    "scheduleFreeTrial" JSONB NOT NULL,
    "img" JSONB NOT NULL,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Footer" (
    "id" TEXT NOT NULL,
    "title" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "quickLinksLabel" JSONB NOT NULL,
    "contactLabel" JSONB NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "copyright" JSONB NOT NULL,

    CONSTRAINT "Footer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactInfo" (
    "id" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "title" JSONB NOT NULL,
    "content" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "ContactInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceInfo" (
    "id" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "price" TEXT NOT NULL,

    CONSTRAINT "PriceInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactPageContent" (
    "id" TEXT NOT NULL,
    "title" JSONB NOT NULL,
    "aboutMe" JSONB NOT NULL,
    "aboutLessons" JSONB NOT NULL,
    "subjects" JSONB NOT NULL,
    "pricing" JSONB NOT NULL,
    "groupLessons" JSONB NOT NULL,
    "examTraining" JSONB NOT NULL,
    "contactItems" JSONB NOT NULL,

    CONSTRAINT "ContactPageContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WelcomeScreenData" (
    "id" TEXT NOT NULL,
    "languageSelection" JSONB NOT NULL,
    "welcome" JSONB NOT NULL,
    "lengthSelection" JSONB NOT NULL,
    "navigation" JSONB NOT NULL,
    "submitCTA" JSONB NOT NULL,
    "farewell" JSONB NOT NULL,

    CONSTRAINT "WelcomeScreenData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalIntermezzo" (
    "id" TEXT NOT NULL,
    "title" JSONB NOT NULL,
    "content" JSONB NOT NULL,

    CONSTRAINT "PersonalIntermezzo_pkey" PRIMARY KEY ("id")
);
