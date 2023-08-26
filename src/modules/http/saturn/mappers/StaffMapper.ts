import { Staff as PersistenceStaff } from '@prisma/client'
import { Time as PersistenceTimes } from '@prisma/client'
import { Staff } from '../domain/Staff'
import { Times } from '../domain/Times'
import { TimeMapper } from './TimeMapper'

type PersistenceStaffRaw = PersistenceStaff & {
  Times: PersistenceTimes[]
}

export class StaffMapper {
  static toDomain(raw: PersistenceStaffRaw) {
    const timesToDomain = raw.Times.map(time => {
      return TimeMapper.toDomain(time)
    })

    const _Times = Times.create(timesToDomain)

    const staff = Staff.create(
      {
        user_id: raw.user_id,
        access_level: raw.access_level,
        updated_at: raw.updated_at,
        times: _Times,
      },
      raw.id
    )

    return staff
  }

  static toPersistence(staff: PersistenceStaff) {
    return {
      user_id: staff.user_id,
      access_level: staff.access_level,
      updated_at: staff.updated_at,
    }
  }
}
