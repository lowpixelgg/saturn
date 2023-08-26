/*
  Warnings:

  - Added the required column `id` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");
