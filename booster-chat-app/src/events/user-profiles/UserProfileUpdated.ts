import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class UserProfileUpdated {
  public constructor(readonly id: UUID, readonly alias: string, readonly photoUrl: string) {}

  public entityID(): UUID {
    return this.id
  }
}
