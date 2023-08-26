import {
  Appointments,
  Exam,
  Profile,
  Staff,
  User,
  Whitelist as PersistenceWhitelist,
} from '@prisma/client'
import { Answer } from '../domain/Answer'
import { Answers } from '../domain/Answers'
import { Whitelist } from '../domain/Whitelist'
import { UserMapper } from '@modules/http/accounts/mappers/UserMapper'

type PersistenceWhitelistRaw = PersistenceWhitelist & {
  user?: User & {
    Profile: Profile
    Staff: Staff
  }
  exam: Exam[]
}

export class WhitelistMapper {
  static toDomain(raw: PersistenceWhitelistRaw): Whitelist {
    let exam: Answers

    if (raw.exam) {
      let uptoAnswers: Answer[] = []

      raw.exam.map((answer: Exam) => {
        let ans = Answer.create({
          answer: answer.answer,
          question: answer.question,
        })

        uptoAnswers = [...uptoAnswers, ans]
      })

      exam = Answers.create(uptoAnswers)
    }

    const user = UserMapper.toDomain(raw.user)

    const whitelist = Whitelist.create(
      {
        user_id: raw.user_id,
        createdAt: raw.createdAt,
        status: raw.status,
        staff_id: raw.staff_id,
        count: raw.count,
        user: user,
        exam: exam,
      },
      raw.id
    )

    return whitelist
  }

  static toPersistence(whitelist: Whitelist) {
    return {
      id: whitelist.id,
      status: whitelist.status,
      user_id: whitelist.userid,
      staff_id: whitelist.staff_id,
      createdAt: whitelist.createdAt,
      updateAt: whitelist.updateAt,
    }
  }
}
