/*
  Warnings:

  - Added the required column `small` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "small" TEXT NOT NULL,
ALTER COLUMN "content" DROP NOT NULL,
ALTER COLUMN "title" DROP NOT NULL;
