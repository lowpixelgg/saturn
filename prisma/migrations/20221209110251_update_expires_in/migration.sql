/*
  Warnings:

  - You are about to drop the `activation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recovery` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "activation";

-- DropTable
DROP TABLE "recovery";

-- CreateTable
CREATE TABLE "activation1" (
    "id" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "userid" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL,

    CONSTRAINT "activation1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recovery1" (
    "id" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "userid" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL,

    CONSTRAINT "recovery1_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "activation1_userid_key" ON "activation1"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "recovery1_userid_key" ON "recovery1"("userid");
