/*
  Warnings:

  - You are about to drop the column `tags` on the `whitelists` table. All the data in the column will be lost.
  - Added the required column `status` to the `whitelists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "whitelists" DROP COLUMN "tags",
ADD COLUMN     "status" TEXT NOT NULL;
