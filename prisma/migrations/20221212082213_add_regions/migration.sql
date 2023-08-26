/*
  Warnings:

  - You are about to drop the column `country` on the `profiles` table. All the data in the column will be lost.
  - Added the required column `region` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "country",
ADD COLUMN     "region" TEXT NOT NULL;
