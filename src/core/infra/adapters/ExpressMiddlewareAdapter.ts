import { Request, Response, NextFunction } from 'express';

import { Middleware } from '@core/infra/Middleware';

export const adaptMiddleware = (middleware: Middleware) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const requestData = {
      accessToken: request.headers?.['x-access-token'],
      user: request.user,
      ...(request.headers || {}),
    };

    const httpResponse = await middleware.handle(
      requestData,
      request.body,
      request,
      response,
      next
    );

    /*
     *
     * Not an error, but stop request process
     */

    if (httpResponse === false) {
      return response.status(200).send();
    }

    if (httpResponse.statusCode === 200) {
      Object.assign(request, httpResponse.body);

      return next();
    } else {
      return response.status(httpResponse.statusCode).json({
        status: httpResponse.statusCode,
        error: httpResponse.body.error,
      });
    }
  };
};
