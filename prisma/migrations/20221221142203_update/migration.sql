/*
  Warnings:

  - You are about to drop the column `userid` on the `Whitelist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Whitelist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdAt` to the `Whitelist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staff_id` to the `Whitelist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Whitelist` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "State" AS ENUM ('APPROVED', 'REPROVED', 'TRIAGE', 'DISCARTED');

-- DropForeignKey
ALTER TABLE "Whitelist" DROP CONSTRAINT "Whitelist_userid_fkey";

-- DropIndex
DROP INDEX "Whitelist_userid_key";

-- AlterTable
ALTER TABLE "Whitelist" DROP COLUMN "userid",
ADD COLUMN     "createdAt" INTEGER NOT NULL,
ADD COLUMN     "staff_id" TEXT NOT NULL,
ADD COLUMN     "state" "State" NOT NULL DEFAULT 'TRIAGE',
ADD COLUMN     "updateAt" INTEGER,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Whitelist_user_id_key" ON "Whitelist"("user_id");

-- AddForeignKey
ALTER TABLE "Whitelist" ADD CONSTRAINT "Whitelist_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Whitelist" ADD CONSTRAINT "Whitelist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
