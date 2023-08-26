/*
  Warnings:

  - The primary key for the `exams` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "exams" DROP CONSTRAINT "exams_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "exams_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "exams_id_seq";
