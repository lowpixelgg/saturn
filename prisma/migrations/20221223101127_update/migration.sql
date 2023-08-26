/*
  Warnings:

  - You are about to drop the column `count` on the `whitelists` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_id_key";

-- AlterTable
ALTER TABLE "whitelists" DROP COLUMN "count";
