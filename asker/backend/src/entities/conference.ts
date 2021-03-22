import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { ConferenceCreated } from '../events/conference-created'

@Entity
export class Conference {
  public constructor(public id: UUID, readonly location: string) {}

  @Reduces(ConferenceCreated)
  public static reduceConferenceCreated(event: ConferenceCreated): Conference {
    return new Conference(event.conferenceId, event.location)
  }
}
