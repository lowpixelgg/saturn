/*
  Warnings:

  - The `auth_system` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "auth_system",
ADD COLUMN     "auth_system" TEXT NOT NULL DEFAULT 'NORMAL';

-- DropEnum
DROP TYPE "auth_system";
