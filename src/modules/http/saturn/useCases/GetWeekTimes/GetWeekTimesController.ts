import { Controller } from '@core/infra/Controller'
import { fail, HttpResponse, ok } from '@core/infra/HttpResponse'
import { GetWeekTimes } from './GetWeekTimes'

export class GetWeekTimesController implements Controller {
  constructor(private getWeekTimes: GetWeekTimes) {}

  async handle(): Promise<HttpResponse> {
    try {
      const result = await this.getWeekTimes.execute()

      return ok(result)
    } catch (error) {
      return fail(error)
    }
  }
}
