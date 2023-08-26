/*
  Warnings:

  - You are about to drop the `Connections` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Connections";

-- CreateTable
CREATE TABLE "connections" (
    "id" TEXT NOT NULL,
    "plataform" TEXT NOT NULL,
    "fallback" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "connections_pkey" PRIMARY KEY ("id")
);
