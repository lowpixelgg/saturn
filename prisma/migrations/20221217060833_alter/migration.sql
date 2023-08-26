/*
  Warnings:

  - The primary key for the `visitors` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "visitors" DROP CONSTRAINT "visitors_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "visitors_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "visitors_id_seq";
