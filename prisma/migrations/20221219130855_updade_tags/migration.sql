/*
  Warnings:

  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `instagram` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twitch` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `youtube` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_profile_id_fkey";

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "instagram" TEXT NOT NULL,
ADD COLUMN     "twitch" TEXT NOT NULL,
ADD COLUMN     "youtube" TEXT NOT NULL;

-- DropTable
DROP TABLE "tags";
