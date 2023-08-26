-- AddForeignKey
ALTER TABLE "visitors" ADD CONSTRAINT "visitors_visitor_id_fkey" FOREIGN KEY ("visitor_id") REFERENCES "profiles"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;
