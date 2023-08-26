import { Whitelist } from '@modules/http/player/domain/Whitelist'
import { IWhitelistRepository } from '@modules/http/player/repositories/IWhitelistRepository'
import { PrismaWhitelistRepository } from '@modules/http/player/repositories/prisma/PrismaWhitelistRepository'
import { Either, left, right } from '@core/logic/Either'
import { GetWhitelistNotFound } from './errors/GetWhitelistDetailsNotFound'

type GetWhitelistDetailsRequest = {
  id: string
}

type GetWhitelistDetailsResponse = Either<GetWhitelistNotFound, Whitelist>

export class GetWhitelistDetails {
  constructor(private whitelistRepository: IWhitelistRepository) {}

  async execute({
    id,
  }: GetWhitelistDetailsRequest): Promise<GetWhitelistDetailsResponse> {
    const exists = await this.whitelistRepository.exists(id)

    if (!exists) {
      return left(new GetWhitelistNotFound())
    }

    const whitelist = await this.whitelistRepository.findOneByID(id)
    return right(whitelist)
  }
}
