import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { UserProfile } from '../../entities/UserProfile'

@Event
export class ChatRoomCreated {
  public constructor(
    readonly id: UUID,
    readonly name: string,
    readonly description: string,
    readonly createdBy: UserProfile,
    readonly isPrivate: boolean
  ) {}

  public entityID(): UUID {
    return this.id
  }
}
