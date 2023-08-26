-- CreateTable
CREATE TABLE "followers" (
    "id" TEXT NOT NULL,
    "followers_id" TEXT NOT NULL,
    "following_id" TEXT NOT NULL,

    CONSTRAINT "followers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "followers" ADD CONSTRAINT "followers_followers_id_fkey" FOREIGN KEY ("followers_id") REFERENCES "profiles"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "followers" ADD CONSTRAINT "followers_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "profiles"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;
