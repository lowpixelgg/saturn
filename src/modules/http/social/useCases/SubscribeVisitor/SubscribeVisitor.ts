import { Either, left, right } from '@core/logic/Either'
import { SubscribeVisitorDoesNotExist } from './errors/SubscribeVisitorDoesNotExist'
import { SubscribeVisitorProfileDoesNotExist } from './errors/SubscribeVisitorProfileDoesNotExist'
import { SubscribeVisitorAlreadySubscribed } from './errors/SubscribeVisitorAlreadySubscribed'

import { IProfilesRepository } from '@modules/http/social/repositories/IProfilesRepository'

import { Visitor } from '@modules/http/social/domain/profiles/Visitor'
import { IVisitorRepository } from '@modules/http/social/repositories/IVisitorRepository'

type SubscribeVisitorRequest = {
  visitor_id?: string
  visitors_id?: string
}

type SubscribeVisitorResponse = Either<
  | SubscribeVisitorDoesNotExist
  | SubscribeVisitorProfileDoesNotExist
  | SubscribeVisitorAlreadySubscribed,
  boolean
>

export class SubscribeVisitor {
  constructor(
    private profilesRepository: IProfilesRepository,
    private visitorsRepository: IVisitorRepository
  ) { }

  async execute({
    visitor_id,
    visitors_id,
  }: SubscribeVisitorRequest): Promise<SubscribeVisitorResponse> {
    if (visitor_id === visitors_id) {
      return right(true)
    }

    const userExists = await this.profilesRepository.exists(visitor_id)
    const profileExists = await this.profilesRepository.exists(visitors_id)

    if (!profileExists) {
      return left(new SubscribeVisitorProfileDoesNotExist())
    }

    if (!userExists) {
      return left(new SubscribeVisitorDoesNotExist())
    }

    const profile = await this.profilesRepository.findOne(visitors_id)

    const alreadySubscribetToVisitor =
      await this.visitorsRepository.findByProfileParams({
        visitors_id,
        visitor_id,
      })

    if (alreadySubscribetToVisitor) {
      return left(new SubscribeVisitorAlreadySubscribed())
    }

    const visitor = Visitor.create({
      visitors_id,
      visitor_id,
    })

    profile.subscribeToVisitor(visitor)
    await this.profilesRepository.save(profile)


    return right(true)
  }
}
