/*
  Warnings:

  - The primary key for the `exams` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "exams" DROP CONSTRAINT "exams_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "exams_pkey" PRIMARY KEY ("id");
