import { createUser } from '@utils/tests/UserFactory'
import { describe, it, expect } from 'vitest'
import { FeatureFlags } from './features'

describe('FeaturesFlags', () => {
  it('should be able to progress to next', () => {
    const user = createUser({
      features: ['create:session'],
    })
    const can = FeatureFlags.can(user.features, 'create:session')
    expect(can).toBe(true)
  })
  it('should be not able to progress to next', () => {
    const user = createUser({
      features: ['absurd:feature'],
    })
    const can = FeatureFlags.can(user.features, 'create:session')
    expect(can).toBe(false)
  })
  it('should be not able to progress with invalid feature', () => {
    const can = FeatureFlags.has('abusive:flag')
    expect(can).toBe(false)
  })
})
