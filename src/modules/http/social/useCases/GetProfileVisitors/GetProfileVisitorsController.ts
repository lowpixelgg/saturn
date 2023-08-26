import { Controller } from '@core/infra/Controller'
import { GetProfileVisitors } from './GetProfileVisitors'
import { HttpResponse, notFound, ok } from '@core/infra/HttpResponse'

import { VisitorMapper } from '@modules/http/social/mappers/VisitorMapper'

export class GetProfileVisitorsController implements Controller {
  constructor(private getProfileVisitors: GetProfileVisitors) {}

  async handle({ visitors_id }): Promise<HttpResponse> {
    const result = await this.getProfileVisitors.execute({ visitors_id })

    if (result.isLeft()) {
      const error = result.value
      return notFound(error)
    }

    const visitors = result.value.map(visitor =>
      VisitorMapper.toPersistence(visitor)
    )

    return ok(visitors)
  }
}
