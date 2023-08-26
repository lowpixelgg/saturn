-- CreateTable
CREATE TABLE "visitors" (
    "id" SERIAL NOT NULL,
    "userid" TEXT NOT NULL,
    "at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visitors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "visitors" ADD CONSTRAINT "visitors_userid_fkey" FOREIGN KEY ("userid") REFERENCES "profiles"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;
