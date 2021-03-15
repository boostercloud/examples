import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class DefaulterDetected {
  public constructor(readonly userID: UUID, readonly onAccount: UUID, readonly debt: number) {}

  public entityID(): UUID {
    return this.userID
  }
}
