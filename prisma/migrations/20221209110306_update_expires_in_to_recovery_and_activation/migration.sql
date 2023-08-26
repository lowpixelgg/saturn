/*
  Warnings:

  - You are about to drop the `activation1` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recovery1` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "activation1";

-- DropTable
DROP TABLE "recovery1";

-- CreateTable
CREATE TABLE "activation" (
    "id" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "userid" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL,

    CONSTRAINT "activation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recovery" (
    "id" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "userid" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL,

    CONSTRAINT "recovery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "activation_userid_key" ON "activation"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "recovery_userid_key" ON "recovery"("userid");
