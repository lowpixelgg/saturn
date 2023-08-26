import { v4 as uuid } from "uuid";

export type IBaseError = {
  message: string;
  stack?: any;
  action?: string;
  statusCode?: number;
  errorId?: string;
  requestId?: string;
  context?: any;
  errorLocationCode?: string;
  key?: string;
  type?: string;
  databaseErrorCode?: string;
};

export class BaseError {
  [x: string]: any;
  constructor({
    message,
    stack,
    action,
    statusCode,
    errorId,
    requestId,
    context,
    errorLocationCode,
    key,
    type,
    databaseErrorCode,
  }: IBaseError) {
    this.message = message;
    this.action = action;
    this.statusCode = statusCode || 500;
    this.errorId = errorId || uuid();
    this.requestId = requestId;
    this.context = context;
    this.stack = stack;
    this.errorLocationCode = errorLocationCode;
    this.key = key;
    this.type = type;
    this.databaseErrorCode = databaseErrorCode;
  }
}

export class InternalServerError extends BaseError {
  constructor({
    message,
    action,
    requestId,
    errorId,
    statusCode,
    stack,
    errorLocationCode,
  }: IBaseError) {
    super({
      message: message || "Um erro interno não esperado aconteceu.",
      action:
        action || "Informe ao suporte o valor encontrado no campo 'error_id'.",
      statusCode: statusCode || 500,
      requestId: requestId,
      errorId: errorId,
      stack: stack,
      errorLocationCode: errorLocationCode,
    });
  }
}

export class NotFoundError extends BaseError {
  constructor({
    message,
    action,
    requestId,
    errorId,
    stack,
    errorLocationCode,
    key,
  }: IBaseError) {
    super({
      message: message || "Não foi possível encontrar este recurso no sistema.",
      action:
        action ||
        "Verifique se o caminho (PATH) e o método (GET, POST, PUT, DELETE) estão corretos.",
      statusCode: 404,
      requestId: requestId,
      errorId: errorId,
      stack: stack,
      errorLocationCode: errorLocationCode,
      key: key,
    });
  }
}

export class ServiceError extends BaseError {
  constructor({
    message,
    action,
    stack,
    context,
    statusCode,
    errorLocationCode,
    databaseErrorCode,
  }: IBaseError) {
    super({
      message: message || "Serviço indisponível no momento.",
      action: action || "Verifique se o serviço está disponível.",
      stack: stack,
      statusCode: statusCode || 503,
      context: context,
      errorLocationCode: errorLocationCode,
      databaseErrorCode: databaseErrorCode,
    });
  }
}

export class ValidationError extends BaseError {
  constructor({
    message,
    action,
    stack,
    statusCode,
    context,
    errorLocationCode,
    key,
    type,
  }: IBaseError) {
    super({
      message: message || "Um erro de validação ocorreu.",
      action: action || "Ajuste os dados enviados e tente novamente.",
      statusCode: statusCode || 400,
      stack: stack,
      context: context,
      errorLocationCode: errorLocationCode,
      key: key,
      type: type,
    });
  }
}

export class UnauthorizedError extends BaseError {
  constructor({
    message,
    action,
    requestId,
    stack,
    errorLocationCode,
  }: IBaseError) {
    super({
      message: message || "Usuário não autenticado.",
      action:
        action ||
        "Verifique se você está autenticado com uma sessão ativa e tente novamente.",
      requestId: requestId,
      statusCode: 401,
      stack: stack,
      errorLocationCode: errorLocationCode,
    });
  }
}

export class ForbiddenError extends BaseError {
  constructor({
    message,
    action,
    requestId,
    stack,
    errorLocationCode,
  }: IBaseError) {
    super({
      message: message || "Você não possui permissão para executar esta ação.",
      action:
        action || "Verifique se você possui permissão para executar esta ação.",
      requestId: requestId,
      statusCode: 403,
      stack: stack,
      errorLocationCode: errorLocationCode,
    });
  }
}

export class ConflictError extends BaseError {
  constructor({
    message,
    action,
    requestId,
    stack,
    errorLocationCode,
  }: IBaseError) {
    super({
      message:
        message ||
        "Parece que já existe uma conta com estas credencias em nosso sistema.",
      action: action || "Escolha um nome de usuario ou email diferentes.",
      requestId: requestId,
      statusCode: 403,
      stack: stack,
      errorLocationCode: errorLocationCode,
    });
  }
}

export class TooManyRequestsError extends BaseError {
  constructor({
    message,
    action,
    context,
    stack,
    errorLocationCode,
  }: IBaseError) {
    super({
      message: message || "Você realizou muitas requisições recentemente.",
      action:
        action ||
        "Tente novamente mais tarde ou contate o suporte caso acredite que isso seja um erro.",
      statusCode: 429,
      context: context,
      stack: stack,
      errorLocationCode: errorLocationCode,
    });
  }
}

export class UnprocessableEntityError extends BaseError {
  constructor({ message, action, stack, errorLocationCode }: IBaseError) {
    super({
      message: message || "Não foi possível realizar esta operação.",
      action:
        action ||
        "Os dados enviados estão corretos, porém não foi possível realizar esta operação.",
      statusCode: 422,
      stack: stack,
      errorLocationCode: errorLocationCode,
    });
  }
}
