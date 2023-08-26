import { Controller } from '@core/infra/Controller'
import {
  clientError,
  fail,
  HttpResponse,
  notFound,
  ok,
} from '@core/infra/HttpResponse'
import { WhitelistDataMalformated } from './error/WhitelistDataMalformated'
import { WhitelistDoesNotExist } from './error/WhitelistDoesNotExist'
import { WhitelistMentiondUseNotExist } from './error/WhitelistMentiondUseNotExist'
import { UpdateWhitelistDelete } from './UpdateWhitelistDelete'
import { UpdateWhitelistStatus } from './UpdateWhitelistStatus'
import { WhitelistCustomError } from './error/WhitelistCustomError'

type UpdateWhitelistControllerRequest = {
  id: string
  mention: string
  status: string
  del?: boolean
}

export class UpdateWhitelistController implements Controller {
  constructor(
    private updateWhitelist: UpdateWhitelistStatus,
    private updateWhitelistDelete: UpdateWhitelistDelete
  ) {}

  private async updateStatus(id: string, mention: string, status: string) {
    const result = await this.updateWhitelist.execute({ id, mention, status })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WhitelistDataMalformated:
          return clientError(error)
        case WhitelistDoesNotExist:
          return notFound(error)
        case WhitelistMentiondUseNotExist:
          return notFound(error)

        case WhitelistCustomError:
          return clientError(error)
        default:
          return fail(error)
      }
    } else {
      return ok(result.value)
    }
  }

  private async updateDelete(id: string) {
    const result = await this.updateWhitelistDelete.execute({ id })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WhitelistDataMalformated:
          return clientError(error)
        case WhitelistDoesNotExist:
          return notFound(error)
        default:
          return fail(error)
      }
    } else {
      return ok()
    }
  }

  async handle({
    id,
    mention,
    status,
    del,
  }: UpdateWhitelistControllerRequest): Promise<HttpResponse> {
    if (Boolean(del)) {
      return this.updateDelete(id)
    } else {
      return this.updateStatus(id, mention, status)
    }
  }
}
