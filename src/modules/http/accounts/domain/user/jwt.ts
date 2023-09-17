import { sign, verify } from 'jsonwebtoken';

import { auth } from '@configs/auth';
import { Either, left, right } from '@core/logic/Either';

import { InvalidJsonWebToken } from './errors/InvalidJsonWebToken';
import { User } from './user';

interface JWTData {
  id: string;
  features: string[];
  token: string;
}

export interface JWTTokenPayload {
  exp: number;
  sub: JWTData;
}

export class JWT {
  static sign(arg0: string, user: User) {
    throw new Error('Method not implemented.');
  }
  public readonly id: string;
  public readonly token: string;
  public readonly features: string[];

  private constructor({ id, token, features }: JWTData) {
    this.id = id;
    this.token = token;
    this.features = features;
  }

  static decodeToken(
    token: string
  ): Either<InvalidJsonWebToken, JWTTokenPayload> {
    try {
      const decoded = verify(
        token,
        auth.secretKey
      ) as unknown as JWTTokenPayload;

      return right(decoded);
    } catch (err) {
      return left(new InvalidJsonWebToken());
    }
  }

  static createFromJWT(token: string): Either<InvalidJsonWebToken, JWT> {
    const jwtPayloadOrError = this.decodeToken(token);

    if (jwtPayloadOrError.isLeft()) {
      return left(jwtPayloadOrError.value);
    }

    const jwt = new JWT({
      token,
      id: jwtPayloadOrError.value.sub.id,
      features: jwtPayloadOrError.value.sub.features,
    });

    return right(jwt);
  }

  static signUser(user: User): JWT {
    const token = sign(
      { id: user.id, features: user.features },
      auth.secretKey,
      {
        subject: user.id,
        expiresIn: auth.expiresIn,
      }
    );

    const jwt = new JWT({ id: user.id, features: user.features, token });

    return jwt;
  }
}
