import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { UserProfile } from '../../entities/UserProfile'

@Event
export class UserJoined {
  public constructor(readonly id: UUID, readonly user: UserProfile) {}

  public entityID(): UUID {
    return this.id
  }
}
