import { Answers } from '../domain/Answers';

export interface IAnswerRepository {
  save(answers: Answers): Promise<void>;
  create(answers: Answers): Promise<void>;
}
