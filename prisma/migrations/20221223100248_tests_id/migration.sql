/*
  Warnings:

  - The primary key for the `exams` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `exams` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "exams" DROP CONSTRAINT "exams_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "exams_pkey" PRIMARY KEY ("whitelist_id");
