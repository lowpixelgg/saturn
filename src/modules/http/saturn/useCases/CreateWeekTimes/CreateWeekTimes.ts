import { Either, left, right } from '@core/logic/Either'
import { toNumber } from 'lodash'
import { Time } from '../../domain/Time'
import { Times } from '../../domain/Times'
import { IStaffReposiotry } from '../../repositories/IStaffRepository'
import { ITimesRepository } from '../../repositories/ITimesRepository'
import { CreateWeekTimeInvalidRequest } from './errors/CreateWeekTimeInvalidRequest'
import { CreateWeekTimesInvalidTimesLength } from './errors/CreateWeekTimesInvalidTimesLength'
import { CreateWeekTimeStaffNotFound } from './errors/CreateWeekTimeStaffNotFound'

type TimeType = {
  date: string
}

type CreateWeekTimesRequest = {
  id: string
  times: TimeType[]
}

type CreateWeekTimesResponse = Either<
  | CreateWeekTimeStaffNotFound
  | CreateWeekTimeInvalidRequest
  | CreateWeekTimesInvalidTimesLength,
  boolean
>

export class CreateWeekTimes {
  constructor(private staffRepository: IStaffReposiotry) { }

  async execute({
    times,
    id,
  }: CreateWeekTimesRequest): Promise<CreateWeekTimesResponse> {
    if (times.length <= 0) {
      return left(new CreateWeekTimesInvalidTimesLength())
    }

    const exists = await this.staffRepository.exists(id)

    if (!exists) {
      return left(new CreateWeekTimeStaffNotFound())
    }

    const staff = await this.staffRepository.findByUserID(id)

    times.map(time => {
      return staff.WeekOut(
        Time.create({
          date: time.date,
          staff_id: staff.id,
        })
      )
    })


    await this.staffRepository.save(staff)

    return right(true)
  }
}
