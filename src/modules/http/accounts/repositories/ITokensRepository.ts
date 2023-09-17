import { Token } from '../domain/user/Token';
import { Tokens } from '../domain/user/Tokens';

export interface ITokensRepository {
  exists(id: string): Promise<boolean>;
  create(tokens: Tokens): Promise<void>;
  save(tokens: Tokens): Promise<void>;
  getById(id: string): Promise<Token>;
  saveSingle(token: Token): Promise<void>;
}
