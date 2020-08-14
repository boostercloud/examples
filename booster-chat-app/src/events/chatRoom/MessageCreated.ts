import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { MessageType } from '../../entities/Message'
import { UserProfile } from '../../entities/UserProfile'

@Event
export class MessageCreated {
  public constructor(
    readonly id: UUID,
    readonly chatRoomId: UUID,
    readonly createdBy: UserProfile,
    readonly body: string,
    readonly messageType: MessageType
  ) {}

  public entityID(): UUID {
    return this.id
  }
}
