import { Time as PersistenceStaff } from '@prisma/client'
import { Time } from '@modules/http/saturn/domain/Time'

export class TimeMapper {
  static toDomain(raw: PersistenceStaff) {
    const time = Time.create(
      {
        date: raw.Date,
        scheduled: raw.scheduled,
        staff_id: raw.staff_id,
      },
      raw.id
    )

    return time
  }

  static toPersistence(time: Time) {
    return {
      id: time.id,
      scheduled: time.scheduled,
      Date: time.date,
      staff_id: time.staff_id,
    }
  }
}
