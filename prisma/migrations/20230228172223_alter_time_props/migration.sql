/*
  Warnings:

  - Changed the type of `day` on the `times` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `hour` on the `times` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `month` on the `times` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "times" DROP COLUMN "day",
ADD COLUMN     "day" INTEGER NOT NULL,
DROP COLUMN "hour",
ADD COLUMN     "hour" INTEGER NOT NULL,
DROP COLUMN "month",
ADD COLUMN     "month" INTEGER NOT NULL;
