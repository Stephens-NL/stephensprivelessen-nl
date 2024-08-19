-- CreateTable
CREATE TABLE "Feedback" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "language" TEXT NOT NULL,
    "formType" TEXT NOT NULL,
    "learnerName" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "userType" TEXT NOT NULL,
    "ratings" TEXT NOT NULL,
    "mostValuable" TEXT,
    "quickImprovement" TEXT,
    "quoteConsent" TEXT,
    "quoteText" TEXT,
    "nameConsent" TEXT,
    "photoConsent" TEXT
);
