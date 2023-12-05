import { Controller } from '@core/infra/Controller';
import {
  conflict,
  fail,
  HttpResponse,
  notFound,
  ok,
} from '@core/infra/HttpResponse';
import { SubscribeVisitorAlreadySubscribed } from '../SubscribeVisitor/errors/SubscribeVisitorAlreadySubscribed';
import { SubscribeFollowerDoesNotExist } from './errors/SubscribeFollowerDoesNotExist';
import { SubscribeFollowerProfileDoesNotExist } from './errors/SubscribeFollowerProfileDoesNotExist';
import { SubscribeFollower } from './SubscribeFollower';
import { SubscribeFollowerFindAll } from './SubscribeFollowerFindAll';
import { SubscribeFollowerUnsubscribe } from './SubscribeFollowUnFollow';

type SubscribeFollowerControllerRequest = {
  followers_id?: string;
  findAll?: boolean;
  unfollow?: boolean;
  user: { id: string };
};

export class SubscribeFollowerController implements Controller {
  constructor(
    private subscribeFollower: SubscribeFollower,
    private subscribeFollowerFindAll: SubscribeFollowerFindAll,
    private subscribeFollowerUnFollow: SubscribeFollowerUnsubscribe
  ) {}

  private async handleUnSubscribeFollower(
    followers_id: string,
    user: { id: string }
  ): Promise<HttpResponse> {
    const result = await this.subscribeFollowerUnFollow.execute({
      followers_id,
      user,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case SubscribeFollowerDoesNotExist:
          return notFound(error);
        case SubscribeFollowerProfileDoesNotExist:
          return notFound(error);
        default:
          return fail(error);
      }
    } else {
      return ok(result.value);
    }
  }

  private async handleSubscribeFollowerFindAll(followers_id: string) {
    const result = await this.subscribeFollowerFindAll.execute({
      followers_id,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case SubscribeFollowerProfileDoesNotExist:
          return notFound(error);
        default:
          return fail(error);
      }
    } else {
      return ok(result.value);
    }
  }

  private async handleSubscribeFollower(
    followers_id: string,
    user: { id: string }
  ) {
    const result = await this.subscribeFollower.execute({
      followers_id,
      user,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case SubscribeVisitorAlreadySubscribed:
          return conflict(error);
        case SubscribeFollowerDoesNotExist:
          return notFound(error);
        case SubscribeFollowerProfileDoesNotExist:
          return notFound(error);
        default:
          return fail(error);
      }
    }

    return ok({});
  }

  async handle({
    followers_id,
    user,
    findAll,
    unfollow,
  }: SubscribeFollowerControllerRequest): Promise<HttpResponse> {
    if (Boolean(unfollow)) {
      return this.handleUnSubscribeFollower(followers_id, user);
    }

    if (Boolean(findAll)) {
      return this.handleSubscribeFollowerFindAll(followers_id);
    } else {
      return this.handleSubscribeFollower(followers_id, user);
    }
  }
}
