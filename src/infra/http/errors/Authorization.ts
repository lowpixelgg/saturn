export class InsufficientPermissions extends Error {
  constructor(permission: string[]) {
    super(`Insufficient Permissions: ${permission}`);
    this.name = "AccountAleardyRegistared";
  }
}

export class FeatureDoesNotExist extends Error {
  constructor() {
    super(`No "feature" was specified for the authorization action.`);
    this.name = "FeatureDoesNotExist";
  }
}
