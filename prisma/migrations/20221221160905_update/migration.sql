/*
  Warnings:

  - You are about to drop the `Whitelist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_wl_id_fkey";

-- DropForeignKey
ALTER TABLE "Whitelist" DROP CONSTRAINT "Whitelist_staff_id_fkey";

-- DropForeignKey
ALTER TABLE "Whitelist" DROP CONSTRAINT "Whitelist_user_id_fkey";

-- DropTable
DROP TABLE "Whitelist";

-- DropEnum
DROP TYPE "State";

-- CreateTable
CREATE TABLE "whitelists" (
    "id" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'TRIAGE',
    "staff_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" INTEGER,
    "updateAt" INTEGER,

    CONSTRAINT "whitelists_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "whitelists_user_id_key" ON "whitelists"("user_id");

-- AddForeignKey
ALTER TABLE "whitelists" ADD CONSTRAINT "whitelists_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whitelists" ADD CONSTRAINT "whitelists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_wl_id_fkey" FOREIGN KEY ("wl_id") REFERENCES "whitelists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
