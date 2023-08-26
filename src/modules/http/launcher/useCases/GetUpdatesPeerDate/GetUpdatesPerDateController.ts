import { Controller } from "@core/infra/Controller"
import { GetUpdatesPerDate } from "./GetUpdatesPerDate"
import { HttpResponse, ok } from "@core/infra/HttpResponse"



type GetUpdatesPerDateControllerRequest = {
  date: string
}


export class GetUpdatesPerDateController implements Controller {
  constructor (private getUpdatesPerDate: GetUpdatesPerDate) {}
  
  async handle (date: GetUpdatesPerDateControllerRequest): Promise<HttpResponse> {
    const result = await this.getUpdatesPerDate.execute(date);
    return ok(result.data)
  }
}