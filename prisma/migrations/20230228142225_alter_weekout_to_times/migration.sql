/*
  Warnings:

  - You are about to drop the `WeekOut` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WeekOut" DROP CONSTRAINT "WeekOut_staff_id_fkey";

-- DropTable
DROP TABLE "WeekOut";

-- CreateTable
CREATE TABLE "Times" (
    "id" TEXT NOT NULL,
    "staff_id" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "hour" TEXT NOT NULL,

    CONSTRAINT "Times_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Times" ADD CONSTRAINT "Times_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
