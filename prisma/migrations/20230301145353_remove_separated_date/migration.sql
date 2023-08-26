/*
  Warnings:

  - You are about to drop the column `day` on the `times` table. All the data in the column will be lost.
  - You are about to drop the column `hour` on the `times` table. All the data in the column will be lost.
  - You are about to drop the column `month` on the `times` table. All the data in the column will be lost.
  - Added the required column `Date` to the `times` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "times" DROP COLUMN "day",
DROP COLUMN "hour",
DROP COLUMN "month",
ADD COLUMN     "Date" TEXT NOT NULL;
