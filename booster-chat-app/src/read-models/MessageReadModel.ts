import { ReadModel } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { Projects } from '@boostercloud/framework-core'
import { User, Admin } from '../roles'
import { UserProfile } from '../entities/UserProfile'
import { Message, MessageType } from '../entities/Message'

@ReadModel({
  authorize: [User, Admin],
})
export class MessageReadModel {
  public constructor(
    public id: UUID,
    readonly chatRoomId: UUID,
    readonly body: string,
    readonly messageType: MessageType,
    readonly createdAt: string,
    readonly createdBy: UserProfile
  ) {}

  @Projects(Message, 'chatRoomId')
  public static onMessageCreated(message: Message): MessageReadModel {
    return new MessageReadModel(
      message.id,
      message.chatRoomId,
      message.body,
      message.messageType,
      message.createdAt,
      message.createdBy
    )
  }
}
