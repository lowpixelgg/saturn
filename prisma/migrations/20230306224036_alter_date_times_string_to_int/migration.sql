/*
  Warnings:

  - Changed the type of `Date` on the `times` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "times" DROP COLUMN "Date",
ADD COLUMN     "Date" INTEGER NOT NULL;
