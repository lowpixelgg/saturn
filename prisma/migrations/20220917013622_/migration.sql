/*
  Warnings:

  - You are about to drop the `feature_flags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "feature_flags" DROP CONSTRAINT "feature_flags_userid_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "features" TEXT[];

-- DropTable
DROP TABLE "feature_flags";
