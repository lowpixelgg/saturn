import { IWhitelistRepository } from '@modules/http/player/repositories/IWhitelistRepository'
import { Either, left, right } from '@core/logic/Either'
import { WhitelistDataMalformated } from './error/WhitelistDataMalformated'
import { WhitelistDoesNotExist } from './error/WhitelistDoesNotExist'

type UpdateWhitelistDeleteRequest = {
  id: string
}

type UpdateWhitelistDeleteResponse = Either<
  WhitelistDoesNotExist | WhitelistDataMalformated,
  boolean
>

export class UpdateWhitelistDelete {
  constructor(private whitelistsRepository: IWhitelistRepository) { }

  async execute({
    id,
  }: UpdateWhitelistDeleteRequest): Promise<UpdateWhitelistDeleteResponse> {
    if (!id) {
      return left(new WhitelistDataMalformated())
    }

    const exists = await this.whitelistsRepository.exists(id)

    if (!exists) {
      return left(new WhitelistDoesNotExist())
    }

    await this.whitelistsRepository.deleteByID(id)


    return right(true)
  }
}
