import { HttpResponse } from './HttpResponse';

export interface Middleware<T = any, U = any, R = any, RP = any, N = any> {
  handle: (
    httpRequest: T,
    httpBody?: U,
    request?: R,
    response?: RP,
    next?: any
  ) => Promise<HttpResponse | false>;
}
