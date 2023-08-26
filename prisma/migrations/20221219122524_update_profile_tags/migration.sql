-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;
