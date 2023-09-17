import { Either, left, right } from '@core/logic/Either';
import { JWT } from '@modules/http/accounts/domain/user/jwt';
import { IUserRepository } from '@modules/http/accounts/repositories/IUserRepository';
import { SocialGoogleInvalidRequest } from './errors/SocialGoogleInvalidRequest';
import axios from 'axios';
import { Name } from '@modules/http/accounts/domain/user/Username';
import { Email } from '@modules/http/accounts/domain/user/Email';
import { Password } from '@modules/http/accounts/domain/user/Password';
import { User } from '@modules/http/accounts/domain/user/user';
import { Notification } from '@modules/http/accounts/domain/user/Notification';
import { SocialGoogleInvalidPassword } from './errors/SocialGoogleInvalidPassword';
import removeSpecialCharacters from '@utils/rmSpecialChars';
import CONSTANTS from '@configs/constants/google';

type TokenResponse = {
  token: string;
};

type SocialGoogleAuthenticateRequest = {
  token: string;
};

type SocialGoogleAuthenticateResponse = Either<
  SocialGoogleInvalidRequest,
  TokenResponse
>;

export class SocialGoogleAuthenticate {
  constructor(private usersRepository: IUserRepository) {}

  async execute({
    token,
  }: SocialGoogleAuthenticateRequest): Promise<SocialGoogleAuthenticateResponse> {
    try {
      const { data } = await axios.get(CONSTANTS.OAUTH2_URL + token);

      let account = await this.usersRepository.findOne(data.email);

      if (!account) {
        const nameOrError = Name.create(
          removeSpecialCharacters(
            `${data.given_name.toLowerCase()}${data.family_name.toLowerCase()}${Math.floor(
              Math.random() * 4096
            )}`.trim()
          )
        );
        const emailOrError = Email.create(data.email);
        const passwordOrError = Password.create(data.id);

        if (nameOrError.isLeft()) {
          return left(nameOrError.value);
        }

        if (emailOrError.isLeft()) {
          return left(emailOrError.value);
        }

        if (passwordOrError.isLeft()) {
          return left(passwordOrError.value);
        }

        const accountOrErr = User.create({
          username: nameOrError.value,
          email: emailOrError.value,
          password: passwordOrError.value,
          features: [
            'create:user',
            'read:user',
            'read:user:self',
            'read:user:list',
            'create:whitelist',
            'create:appointment',
            'update:profile:self',
            'profile:subscribe',
            'read:subscribers:list',
            'profile:unsubscribe',
            'create:session',
            'create:post',
            'read:post',
            'read:comments',
            'read:post:list',
            'create:comment',
            'update:post',
            'delete:post',
          ],
          auth_system: 'GOOGLE',
        });

        if (accountOrErr.isLeft()) {
          return left(accountOrErr.value);
        }

        account = accountOrErr.value;

        const notify = Notification.create({
          read: false,
          small:
            'Hey ' +
            account.username.value +
            ', é ótimo ter você por aqui! Lembre-se que esta é uma versão Beta da plataforma. Se você estiver com alguma dúvida, ou encontrar algum erro, não hesite em entrar em contato com nosso time de suporte no Discord!',
          userid: account.id,
        });

        account.addNotification(notify);
        await this.usersRepository.create(account);
      }

      const jwt = JWT.signUser(account);

      const isPasswordValid = await account.password.comparePassword(data.id);

      if (isPasswordValid === false) {
        return left(new SocialGoogleInvalidPassword());
      }

      return right({
        token: jwt.token,
      });
    } catch (error) {
      return left(new SocialGoogleInvalidRequest());
    }
  }
}
