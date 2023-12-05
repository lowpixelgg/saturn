import { ok } from '@core/infra/HttpResponse';
import { Middleware } from '@core/infra/Middleware';
import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

export interface Options {
  max: number;
  windowMs: number;
}

export class EnsureRateLimitMiddleware implements Middleware {
  private limiter: any;

  constructor(options: Options) {
    this.limiter = rateLimit({
      max: options.max,
      windowMs: options.windowMs,
    });
  }

  async handle(
    requestData: any,
    requestBody: any,
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      // Use the limiter as middleware without the 'next' parameter
      await new Promise<void>((resolve, reject) => {
        this.limiter(request, response, (err: any) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      // If rate limit is not exceeded, send an "OK" response
      return ok();
    } catch (error) {
      // If rate limit is exceeded, send a 429 response
      return {
        statusCode: 429,
        body: {
          error: 'Too Many Requests',
          message: 'Rate limit exceeded',
        },
      };
    }
  }
}
