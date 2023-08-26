/*
  Warnings:

  - You are about to drop the column `flags` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "flags",
ADD COLUMN     "features" TEXT[] DEFAULT ARRAY['read:activation_code']::TEXT[];
