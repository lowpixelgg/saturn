import { Entity } from '@core/domain/Entity'
import { Profile, User } from '@prisma/client'
import dayjs from 'dayjs'
import { Answer } from './Answer'
import { Answers } from './Answers'
import { User as UserRaw } from '@modules/http/accounts/domain/user/user'

interface IWhitelistProps {
  exam?: Answers
  status?: string
  staff_id?: string
  user?: UserRaw & {
    Profile?: Profile
  }
  user_id?: string
  createdAt?: number
  updateAt?: number
  count?: number
}

export class Whitelist extends Entity<IWhitelistProps> {
  get status() {
    return this.props.status
  }

  get staff_id() {
    return this.props.staff_id
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updateAt() {
    return this.props.updateAt
  }

  get user() {
    return this.props.user
  }

  get count() {
    return this.props.count
  }

  get exam() {
    return this.props.exam
  }

  get userid() {
    return this.props.user_id
  }

  set setWhitelistStatus(status: string) {
    this.props.status = status
  }

  set setStaffWhitelist(staff_id: string) {
    this.props.staff_id = staff_id
  }

  public addAnswer(answers: Answer) {
    return this.props.exam.add(answers)
  }

  private constructor(props: IWhitelistProps, id?: string) {
    super(props, id)
  }

  static create(props: IWhitelistProps, id?: string): Whitelist {
    const whitelist = new Whitelist(
      {
        ...props,
        createdAt: props.createdAt ?? dayjs().unix(),
        status: props.status ?? 'TRIAGEM',
        exam: props.exam ?? Answers.create([]),
      },
      id
    )

    return whitelist
  }
}
