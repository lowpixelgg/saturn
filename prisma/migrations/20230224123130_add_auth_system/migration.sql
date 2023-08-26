-- CreateEnum
CREATE TYPE "auth_system" AS ENUM ('GOOGLE', 'FACEBOOK', 'NORMAL');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "auth_system" "auth_system" NOT NULL DEFAULT 'NORMAL';
