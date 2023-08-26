export class PermissionDenied extends Error {
  constructor(action: string) {
    super(`Insufficient permissions: ${action}`)
    this.name = 'PermissionDenied'
  }
}
