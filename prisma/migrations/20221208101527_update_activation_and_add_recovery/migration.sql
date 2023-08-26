/*
  Warnings:

  - You are about to drop the `tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "tokens";

-- CreateTable
CREATE TABLE "activation" (
    "id" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "userid" TEXT NOT NULL,
    "expiresIn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recovery" (
    "id" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "userid" TEXT NOT NULL,
    "expiresIn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recovery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "activation_userid_key" ON "activation"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "recovery_userid_key" ON "recovery"("userid");
