/*
  Warnings:

  - You are about to drop the column `profile_id` on the `visitors` table. All the data in the column will be lost.
  - Added the required column `visitors_id` to the `visitors` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "visitors" DROP CONSTRAINT "visitors_profile_id_fkey";

-- AlterTable
ALTER TABLE "visitors" DROP COLUMN "profile_id",
ADD COLUMN     "visitors_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "visitors" ADD CONSTRAINT "visitors_visitors_id_fkey" FOREIGN KEY ("visitors_id") REFERENCES "profiles"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;
