/*
  Warnings:

  - You are about to drop the column `userid` on the `visitors` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[visitor_id]` on the table `visitors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profile_id` to the `visitors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visitor_id` to the `visitors` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "visitors" DROP CONSTRAINT "visitors_userid_fkey";

-- AlterTable
ALTER TABLE "visitors" DROP COLUMN "userid",
ADD COLUMN     "profile_id" TEXT NOT NULL,
ADD COLUMN     "visitor_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "visitors_visitor_id_key" ON "visitors"("visitor_id");

-- AddForeignKey
ALTER TABLE "visitors" ADD CONSTRAINT "visitors_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;
