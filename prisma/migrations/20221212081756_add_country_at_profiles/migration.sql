/*
  Warnings:

  - Added the required column `country` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "insignia" TEXT[],
ADD COLUMN     "medals" TEXT[],
ADD COLUMN     "status" TEXT[];
