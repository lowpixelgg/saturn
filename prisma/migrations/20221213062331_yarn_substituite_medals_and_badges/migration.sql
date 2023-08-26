/*
  Warnings:

  - You are about to drop the column `insignia` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `medals` on the `profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "insignia",
DROP COLUMN "medals";

-- CreateTable
CREATE TABLE "badge" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "afinity" TEXT NOT NULL,
    "userid" TEXT NOT NULL,

    CONSTRAINT "medal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "badge" ADD CONSTRAINT "badge_userid_fkey" FOREIGN KEY ("userid") REFERENCES "profiles"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medal" ADD CONSTRAINT "medal_userid_fkey" FOREIGN KEY ("userid") REFERENCES "profiles"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;
