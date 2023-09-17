import { Tokens as PersistenceToken } from '@prisma/client';
import { Token } from '../domain/user/Token';

export class TokenMapper {
  static toDomain(raw: PersistenceToken) {
    const token = Token.create(
      {
        expiresIn: raw.expiresIn,
        type: raw.type,
        user_id: raw.user_id,
        used: raw.used,
      },
      raw.id
    );

    return token;
  }

  static toPersistence(raw: Token) {
    return {
      id: raw.id,
      expiresIn: raw.expiresIn,
      type: raw.type,
      user_id: raw.userId,
      used: raw.used,
    };
  }
}
