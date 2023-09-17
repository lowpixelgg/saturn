import { Controller } from '@core/infra/Controller';
import { GetProfile } from './GetProfile';
import { fail, HttpResponse, notFound, ok } from '@core/infra/HttpResponse';
import { ProfileDoesNotExist } from './errors/ProfileDoesNotExist';
import ProfileDetailsDTO from '@modules/http/social/dtos/ProfileDetailsDTO';

export class GetProfileController implements Controller {
  constructor(private getProfile: GetProfile) {}

  async handle({ ident, user }): Promise<HttpResponse> {
    const result = await this.getProfile.execute({ ident, user });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ProfileDoesNotExist:
          return notFound(error);
        default:
          return fail(error);
      }
    } else {
      return ok(result.value);
    }
  }
}
