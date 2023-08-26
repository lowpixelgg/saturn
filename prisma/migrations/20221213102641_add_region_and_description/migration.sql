/*
  Warnings:

  - You are about to drop the column `region` on the `profiles` table. All the data in the column will be lost.
  - Added the required column `description` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickname` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region_city` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region_country` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region_uf` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "region",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "nickname" TEXT NOT NULL,
ADD COLUMN     "region_city" TEXT NOT NULL,
ADD COLUMN     "region_country" TEXT NOT NULL,
ADD COLUMN     "region_uf" TEXT NOT NULL;
