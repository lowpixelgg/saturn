import { Exam as PersistenceAnswer } from '@prisma/client';

import { Answer } from '../domain/Answer';

export class AnswerMapper {
  static toDomain(raw: PersistenceAnswer): Answer {
    const answer = Answer.create(
      {
        answer: raw.answer,
        question: raw.question,
        whitelist_id: raw.whitelist_id,
      },
      raw.id
    );

    return answer;
  }

  static toPersistence(answer: Answer) {
    return {
      id: answer.id,
      answer: answer.answer,
      question: answer.question,
      whitelist_id: answer.whitelist_id,
    };
  }
}
