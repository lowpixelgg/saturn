/*
  Warnings:

  - Added the required column `game_session` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "game_session" TEXT NOT NULL;
