import { Entity } from '@core/domain/Entity';
import { Whitelist } from '@prisma/client';

interface IAnswerProps {
  question: string;
  answer: string;
  whitelist?: Whitelist;
  whitelist_id?: string;
}

export class Answer extends Entity<IAnswerProps> {
  get question() {
    return this.props.question;
  }

  get answer() {
    return this.props.answer;
  }

  get whitelist() {
    return this.props.whitelist;
  }

  get whitelist_id() {
    return this.props.whitelist_id;
  }

  private constructor(props: IAnswerProps, id?: string) {
    super(props, id);
  }

  static create(props: IAnswerProps, id?: string): Answer {
    const answer = new Answer(props, id);
    return answer;
  }
}
