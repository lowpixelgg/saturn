/*
  Warnings:

  - You are about to drop the column `wl_id` on the `Exam` table. All the data in the column will be lost.
  - Added the required column `whitelisid` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_wl_id_fkey";

-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "wl_id",
ADD COLUMN     "whitelisid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_whitelisid_fkey" FOREIGN KEY ("whitelisid") REFERENCES "whitelists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
