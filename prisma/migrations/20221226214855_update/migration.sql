/*
  Warnings:

  - Made the column `createdAt` on table `Likes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Likes" ALTER COLUMN "createdAt" SET NOT NULL;
