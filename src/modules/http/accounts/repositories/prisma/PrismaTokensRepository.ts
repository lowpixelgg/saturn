import { prisma } from '@infra/prisma/prisma-client';
import { Token } from '../../domain/user/Token';
import { Tokens } from '../../domain/user/Tokens';
import { TokenMapper } from '../../mappers/TokenMapper';
import { ITokensRepository } from '../ITokensRepository';

export class PrismaTokensRepository implements ITokensRepository {
  async create(tokens: Tokens): Promise<void> {
    const data = tokens
      .getNewItems()
      .map(token => TokenMapper.toPersistence(token));

    await prisma.tokens.createMany({ data });
  }

  async save(tokens: Tokens): Promise<void> {
    if (tokens.getNewItems().length > 0) {
      const data = tokens
        .getNewItems()
        .map(token => TokenMapper.toPersistence(token));

      await prisma.tokens.createMany({
        data,
      });
    }

    if (tokens.getRemovedItems().length > 0) {
      const removeIds = tokens.getRemovedItems().map(token => token.id);

      await prisma.tokens.deleteMany({
        where: {
          id: {
            in: removeIds,
          },
        },
      });
    }
  }

  async getById(id: string): Promise<Token> {
    const dbQuery = await prisma.tokens.findUnique({ where: { id } });

    if (!dbQuery) {
      return null;
    }

    return TokenMapper.toDomain(dbQuery);
  }

  async exists(id: string): Promise<boolean> {
    const dbQuery = await prisma.tokens.findUnique({
      where: {
        id: id,
      },
    });
    return !!dbQuery;
  }

  async saveSingle(token: Token): Promise<void> {
    const data = TokenMapper.toPersistence(token);

    await prisma.tokens.update({
      where: {
        id: data.id,
      },
      data,
    });
  }
}
