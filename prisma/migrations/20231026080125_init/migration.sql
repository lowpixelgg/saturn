/*
  Warnings:

  - You are about to drop the column `game_session` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "game_session";

-- CreateTable
CREATE TABLE "updates" (
    "id" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "download" TEXT NOT NULL,
    "sha1" TEXT NOT NULL,
    "rm" TEXT[],
    "directory" TEXT NOT NULL,
    "release" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "updates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "updates_id_key" ON "updates"("id");
