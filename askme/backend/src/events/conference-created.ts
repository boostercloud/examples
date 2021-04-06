import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class ConferenceCreated {
  public constructor(readonly conferenceId: UUID, readonly location: string) {}

  public entityID(): UUID {
    return this.conferenceId
  }
}
