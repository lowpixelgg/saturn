-- CreateTable
CREATE TABLE "Whitelist" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,

    CONSTRAINT "Whitelist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exam" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "wl_id" TEXT NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Whitelist_userid_key" ON "Whitelist"("userid");

-- AddForeignKey
ALTER TABLE "Whitelist" ADD CONSTRAINT "Whitelist_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_wl_id_fkey" FOREIGN KEY ("wl_id") REFERENCES "Whitelist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
