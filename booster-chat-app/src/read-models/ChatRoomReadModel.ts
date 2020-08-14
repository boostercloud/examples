import { ReadModel } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { Projects } from '@boostercloud/framework-core'
import { User, Admin } from '../roles'
import { ChatRoom } from '../entities/ChatRoom'
import { UserProfile } from '../entities/UserProfile'

@ReadModel({
  authorize: [User, Admin],
})
export class ChatRoomReadModel {
  public constructor(
    readonly id: UUID,
    readonly createdBy: UserProfile,
    readonly name: string,
    readonly description: string,
    readonly isPrivate: boolean,
    readonly participants: Array<User>
  ) {}

  @Projects(ChatRoom, 'id')
  public static onChatRoomCreated(chatRoom: ChatRoom): ChatRoomReadModel {
    return new ChatRoomReadModel(
      chatRoom.id,
      chatRoom.createdBy,
      chatRoom.name,
      chatRoom.description,
      chatRoom.isPrivate,
      chatRoom.participants
    )
  }
}
