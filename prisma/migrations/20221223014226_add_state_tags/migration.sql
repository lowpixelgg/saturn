/*
  Warnings:

  - You are about to drop the column `state` on the `whitelists` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "whitelists" DROP COLUMN "state",
ADD COLUMN     "tags" TEXT[];
