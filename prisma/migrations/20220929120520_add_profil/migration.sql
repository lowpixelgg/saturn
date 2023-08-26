-- CreateTable
CREATE TABLE "profiles" (
    "id" SERIAL NOT NULL,
    "avatar" TEXT,
    "banner" TEXT,
    "userid" TEXT NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userid_key" ON "profiles"("userid");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
