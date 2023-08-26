/*
  Warnings:

  - You are about to drop the `Times` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Times" DROP CONSTRAINT "Times_staff_id_fkey";

-- DropTable
DROP TABLE "Times";

-- CreateTable
CREATE TABLE "times" (
    "id" TEXT NOT NULL,
    "staff_id" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "hour" TEXT NOT NULL,
    "month" TEXT NOT NULL,

    CONSTRAINT "times_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "times" ADD CONSTRAINT "times_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
