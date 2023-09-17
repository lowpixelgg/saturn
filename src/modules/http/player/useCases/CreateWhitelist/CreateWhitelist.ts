import { IUserRepository } from '@modules/http/accounts/repositories/IUserRepository';
import { Answer } from '@modules/http/player/domain/Answer';
import { Answers } from '@modules/http/player/domain/Answers';
import { Whitelist } from '@modules/http/player/domain/Whitelist';
import { IAnswerRepository } from '@modules/http/player/repositories/IAnswerRepository';
import { IWhitelistRepository } from '@modules/http/player/repositories/IWhitelistRepository';
import { Either, left, right } from '@core/logic/Either';
import dayjs from 'dayjs';
import { PlayerAccountDoesNotExist } from './errors/PlayerAccountDoesNotExist';
import { PlayerAccountIsTimeouted } from './errors/PlayerAccountIsTimeouted';
import { PlayerAlreadyHaveWhitelist } from './errors/PlayerAlreadyHaveWhitelist';

type AnswerRequest = {
  id: number;
  question: string;
  answer: string;
};

type CreateWhitelistRequest = {
  user: { id: string };
  exam: AnswerRequest[];
};

type CreateWhitelistResponse = Either<
  | PlayerAlreadyHaveWhitelist
  | PlayerAccountDoesNotExist
  | PlayerAccountIsTimeouted,
  Whitelist
>;

export class CreateWhitelist {
  constructor(
    private whitelistRepository: IWhitelistRepository,
    private answersRepository: IAnswerRepository,
    private usersRepository: IUserRepository
  ) {}

  async execute({
    user,
    exam,
  }: CreateWhitelistRequest): Promise<CreateWhitelistResponse> {
    const exists = await this.whitelistRepository.exists(user.id);
    const account = await this.usersRepository.findOne(user.id);

    if (exists) {
      const alreadyExists = await this.whitelistRepository.findOneByUserID(
        user.id
      );

      if (alreadyExists && alreadyExists.status !== 'REPROVADO') {
        return left(new PlayerAlreadyHaveWhitelist());
      }

      if (alreadyExists && alreadyExists.status === 'REPROVADO') {
        if (dayjs().isBefore(dayjs.unix(account.timeout))) {
          return left(new PlayerAccountIsTimeouted());
        } else {
          account.setAccountWhitelistTimeout = null;

          await this.whitelistRepository.deleteByID(alreadyExists.id);
        }
      }
    }

    const wl = Whitelist.create({
      user_id: user.id,
    });

    await this.whitelistRepository.create(wl);

    let uptoAnswers: Answer[] = [];

    exam.map((answer: AnswerRequest, index: number) => {
      let ans = Answer.create({
        answer: answer.answer,
        question: answer.question,
        whitelist_id: wl.id,
      });

      uptoAnswers = [...uptoAnswers, ans];
    });

    account.setAccountWhitelistStatus = 'TRIAGEM';

    const WLAnswers = Answers.create(uptoAnswers);
    await this.answersRepository.create(WLAnswers);
    await this.usersRepository.save(account);

    return right(wl);
  }
}
