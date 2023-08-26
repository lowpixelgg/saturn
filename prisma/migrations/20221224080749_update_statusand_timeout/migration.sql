/*
  Warnings:

  - The `timeout` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "status" DROP NOT NULL,
DROP COLUMN "timeout",
ADD COLUMN     "timeout" INTEGER;
