/*
  Warnings:

  - A unique constraint covering the columns `[userid]` on the table `tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tokens_userid_key" ON "tokens"("userid");
