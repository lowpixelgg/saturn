-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_whitelisid_fkey";

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_whitelisid_fkey" FOREIGN KEY ("whitelisid") REFERENCES "whitelists"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
