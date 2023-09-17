export class AccessDenied extends Error {
  constructor() {
    super(`E_INVALID_JWT_TOKEN`);
    this.name = `AccessDeniedError`;
  }
}
