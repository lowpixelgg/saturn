import { Either, left, right } from '@core/logic/Either';
import { GetAccountDataUserNotExists } from './errors/GetAccountDataUserNotExists';
import { User } from '@modules/http/accounts/domain/user/user';
import { IUserRepository } from '@modules/http/accounts/repositories/IUserRepository';

type GetAccountDataResponse = Either<GetAccountDataUserNotExists, User>;

export class GetAccountData {
  constructor(private usersRepository: IUserRepository) {}

  async execute({ user }): Promise<GetAccountDataResponse> {
    const account = await this.usersRepository.findOne(user.id);

    if (!account) {
      return left(new GetAccountDataUserNotExists());
    }

    return right(account);
  }
}
