/*
  Warnings:

  - Added the required column `quickLinks` to the `Footer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Footer" ADD COLUMN     "quickLinks" JSONB NOT NULL;
