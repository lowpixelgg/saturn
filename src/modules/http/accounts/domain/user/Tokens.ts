import { WatchedList } from '@core/domain/WatchedList'
import { Token } from './Token'

export class Tokens extends WatchedList<Token> {
  private constructor(token: Token[]) {
    super(token)
  }

  public compareItems(a: Token, b: Token): boolean {
    return a.equals(b)
  }

  public static create(tokens?: Token[]): Tokens {
    return new Tokens(tokens || [])
  }
}
