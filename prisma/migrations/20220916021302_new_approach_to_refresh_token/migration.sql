/*
  Warnings:

  - A unique constraint covering the columns `[userid]` on the table `refresh_token` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_userid_key" ON "refresh_token"("userid");
