import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class ChatRoomUpdated {
  public constructor(
    readonly id: UUID,
    readonly name: string,
    readonly description: string,
    readonly isPrivate: boolean
  ) {}

  public entityID(): UUID {
    return this.id
  }
}
