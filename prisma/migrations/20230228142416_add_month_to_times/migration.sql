/*
  Warnings:

  - Added the required column `month` to the `Times` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Times" ADD COLUMN     "month" TEXT NOT NULL;
