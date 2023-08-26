/*
  Warnings:

  - You are about to drop the column `features` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "features";

-- CreateTable
CREATE TABLE "feature_flags" (
    "id" SERIAL NOT NULL,
    "flag" TEXT NOT NULL,
    "userid" TEXT,

    CONSTRAINT "feature_flags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "feature_flags" ADD CONSTRAINT "feature_flags_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
