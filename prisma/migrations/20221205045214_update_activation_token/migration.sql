/*
  Warnings:

  - Added the required column `expiresIn` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "expiresIn" TIMESTAMP(3) NOT NULL;
