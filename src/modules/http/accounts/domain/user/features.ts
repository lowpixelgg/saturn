const availableFeatures = new Set([
  // USER
  'create:user',
  'read:user',
  'read:user:self',
  'read:user:list',

  // WHITELIST
  'create:whitelist',
  'create:appointment',
  'read:whitelist:list',
  'update:whitelist',
  'read:whitelist',

  // Appointments
  'update:week-times',

  // MAILING
  'read:activation_token',

  // Profile
  'update:profile:self',
  'profile:subscribe',
  'read:subscribers:list',
  'profile:unsubscribe',

  // SESSION
  'create:session',

  // TIMELINE
  'create:post',
  'read:post',
  'read:comments',
  'read:post:list',
  'create:comment',
  'update:post',
  'delete:post',
])

export class FeatureFlags {
  static can(userFeatures: string[], feature: string) {
    if (!userFeatures.includes(feature)) {
      return false
    }

    return true
  }

  static has(feature: string) {
    if (!availableFeatures.has(feature)) {
      return false
    } else {
      return true
    }
  }
}
