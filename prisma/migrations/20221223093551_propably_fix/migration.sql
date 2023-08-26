/*
  Warnings:

  - You are about to drop the `Exam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_whitelisid_fkey";

-- DropTable
DROP TABLE "Exam";

-- CreateTable
CREATE TABLE "exams" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "whitelist_id" TEXT NOT NULL,

    CONSTRAINT "exams_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exams" ADD CONSTRAINT "exams_whitelist_id_fkey" FOREIGN KEY ("whitelist_id") REFERENCES "whitelists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
