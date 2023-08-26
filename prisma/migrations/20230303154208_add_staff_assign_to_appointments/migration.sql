-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
