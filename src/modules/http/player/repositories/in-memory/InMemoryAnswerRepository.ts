import { Answer } from '@modules/http/player/domain/Answer'
import { Answers } from '@modules/http/player/domain/Answers'
import { IAnswerRepository } from '../IAnswerRepository'

export class InMemoryAnswersRepository implements IAnswerRepository {
  public items: Answer[] = []

  constructor() {}

  async save(answers: Answers): Promise<void> {
    this.items.push(...answers.getNewItems())

    answers.getRemovedItems().forEach(answer => {
      const answersIndex = this.items.findIndex(answerItem => {
        return answerItem.id === answer.id
      })

      this.items.splice(answersIndex, 1)
    })
  }

  async create(answers: Answers): Promise<void> {
    this.items.push(...answers.getItems())
  }
}
