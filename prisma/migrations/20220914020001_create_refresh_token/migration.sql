/*
  Warnings:

  - You are about to drop the column `userId` on the `refresh_token` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userid]` on the table `refresh_token` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "refresh_token" DROP CONSTRAINT "refresh_token_userId_fkey";

-- DropIndex
DROP INDEX "refresh_token_userId_key";

-- AlterTable
ALTER TABLE "refresh_token" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_userid_key" ON "refresh_token"("userid");

-- AddForeignKey
ALTER TABLE "refresh_token" ADD CONSTRAINT "refresh_token_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
