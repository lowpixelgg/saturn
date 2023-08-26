/*
  Warnings:

  - Made the column `avatar` on table `profiles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `banner` on table `profiles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "avatar" SET NOT NULL,
ALTER COLUMN "avatar" SET DEFAULT 'https://google.com',
ALTER COLUMN "banner" SET NOT NULL,
ALTER COLUMN "banner" SET DEFAULT 'https://google.com';
