import { Request, Response } from 'express';
import { Controller } from '@core/infra/Controller';

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const requestData = {
      ...request.body,
      ...request.params,
      ...request.query,
      ...request.headers,
      file: request.file || request.body.file,
      user: request.user,
    };

    const httpResponse = await controller.handle(requestData);

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      return response.status(httpResponse.statusCode).json(httpResponse);
    } else {
      return response
        .status(httpResponse.statusCode)
        .json(httpResponse.body.error);
    }
  };
};
