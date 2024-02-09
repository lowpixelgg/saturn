-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('USER', 'SUPPORT', 'MODERATOR', 'ADMIN');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Roles" NOT NULL DEFAULT 'USER',
    "features" TEXT[],
    "timeout" INTEGER,
    "status" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "isEarlySupporter" BOOLEAN NOT NULL DEFAULT false,
    "auth_system" TEXT NOT NULL DEFAULT 'NORMAL',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "nickname" TEXT,
    "avatar" TEXT DEFAULT 'https://google.com',
    "banner" TEXT DEFAULT 'https://google.com',
    "userid" TEXT NOT NULL,
    "status" TEXT,
    "region_city" TEXT,
    "region_uf" TEXT,
    "region_country" TEXT,
    "description" TEXT,
    "slug" TEXT,
    "youtube" TEXT,
    "twitch" TEXT,
    "instagram" TEXT,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Likes" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "type" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT,
    "content" TEXT,
    "small" TEXT NOT NULL,
    "userid" TEXT NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "badge" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "afinity" TEXT NOT NULL,
    "userid" TEXT NOT NULL,

    CONSTRAINT "medal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visitors" (
    "id" TEXT NOT NULL,
    "visitors_id" TEXT NOT NULL,
    "visitor_id" TEXT NOT NULL,
    "at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "followers" (
    "id" TEXT NOT NULL,
    "followers_id" TEXT NOT NULL,
    "following_id" TEXT NOT NULL,

    CONSTRAINT "followers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "whitelists" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "staff_id" TEXT,
    "user_id" TEXT NOT NULL,
    "createdAt" INTEGER,
    "updateAt" INTEGER,
    "timeout" INTEGER,
    "count" SERIAL NOT NULL,

    CONSTRAINT "whitelists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staffs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "access_level" TEXT NOT NULL DEFAULT 'minimum',
    "updated_at" TEXT NOT NULL,

    CONSTRAINT "staffs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "times" (
    "id" TEXT NOT NULL,
    "staff_id" TEXT NOT NULL,
    "Date" TEXT NOT NULL,
    "scheduled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "times_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exams" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "whitelist_id" TEXT NOT NULL,

    CONSTRAINT "exams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointments" (
    "id" TEXT NOT NULL,
    "staff_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "date" INTEGER NOT NULL,
    "status" TEXT,
    "channelId" TEXT,
    "name" TEXT NOT NULL,
    "observation" TEXT,

    CONSTRAINT "Appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "connections" (
    "id" TEXT NOT NULL,
    "plataform" TEXT NOT NULL,
    "fallback" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "connections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "updates" (
    "id" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "download" TEXT NOT NULL,
    "sha1" TEXT NOT NULL,
    "rm" TEXT[],
    "directory" TEXT NOT NULL,
    "release" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "updates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userid_key" ON "profiles"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_slug_key" ON "profiles"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "whitelists_user_id_key" ON "whitelists"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "staffs_user_id_key" ON "staffs"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Appointments_user_id_key" ON "Appointments"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "updates_id_key" ON "updates"("id");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "profiles"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "badge" ADD CONSTRAINT "badge_userid_fkey" FOREIGN KEY ("userid") REFERENCES "profiles"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medal" ADD CONSTRAINT "medal_userid_fkey" FOREIGN KEY ("userid") REFERENCES "profiles"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visitors" ADD CONSTRAINT "visitors_visitors_id_fkey" FOREIGN KEY ("visitors_id") REFERENCES "profiles"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visitors" ADD CONSTRAINT "visitors_visitor_id_fkey" FOREIGN KEY ("visitor_id") REFERENCES "profiles"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "followers" ADD CONSTRAINT "followers_followers_id_fkey" FOREIGN KEY ("followers_id") REFERENCES "profiles"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "followers" ADD CONSTRAINT "followers_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "profiles"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whitelists" ADD CONSTRAINT "whitelists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staffs" ADD CONSTRAINT "staffs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "times" ADD CONSTRAINT "times_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exams" ADD CONSTRAINT "exams_whitelist_id_fkey" FOREIGN KEY ("whitelist_id") REFERENCES "whitelists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
