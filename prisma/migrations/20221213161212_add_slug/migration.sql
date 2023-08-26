/*
  Warnings:

  - You are about to drop the column `url` on the `profiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "url",
ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "profiles_slug_key" ON "profiles"("slug");
