/*
  Warnings:

  - Added the required column `status` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeout` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "timeout" TEXT NOT NULL;
