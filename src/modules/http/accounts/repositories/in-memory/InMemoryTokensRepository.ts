import { Token } from '../../domain/user/Token';
import { Tokens } from '../../domain/user/Tokens';

import { ITokensRepository } from '../ITokensRepository';

export class InMemoryTokensRepository implements ITokensRepository {
  public items: Token[] = [];

  async exists(id: string): Promise<boolean> {
    const exists = this.items.find(token => token.id === id);
    return !!exists;
  }

  async create(tokens: Tokens): Promise<void> {
    this.items.push(...tokens.getItems());
  }

  async save(tokens: Tokens): Promise<void> {
    this.items.push(...tokens.getNewItems());

    tokens.getRemovedItems().forEach(token => {
      const tokensIndex = this.items.findIndex(tokensItem => {
        return tokensItem.id === token.id;
      });

      this.items.splice(tokensIndex, 1);
    });
  }

  async getById(id: string): Promise<Token> {
    const index = this.items.findIndex(token => token.id === id);
    return this.items[index];
  }

  async saveSingle(token: Token): Promise<void> {
    const index = this.items.findIndex(token => token.id === token.id);
    this.items[index] = token;
  }
}
