/*
  Warnings:

  - You are about to drop the column `date` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `BlogPost` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BlogPost" DROP COLUMN "date",
DROP COLUMN "tags",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "title" SET DATA TYPE TEXT,
ALTER COLUMN "content" SET DATA TYPE TEXT;
