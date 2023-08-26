-- CreateTable
CREATE TABLE "Connections" (
    "id" TEXT NOT NULL,
    "plataform" TEXT NOT NULL,
    "fallback" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Connections_pkey" PRIMARY KEY ("id")
);
