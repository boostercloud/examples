import { Entity, Reduces } from '@boostercloud/framework-core'
import { ChatRoomCreated } from '../events/chatRoom/ChatRoomCreated'
import { UUID } from '@boostercloud/framework-types'
import { ChatRoomUpdated } from '../events/chatRoom/ChatRoomUpdated'
import { UserProfile } from './UserProfile'
import { UserJoined } from '../events/chatRoom/UserJoined'

@Entity
export class ChatRoom {
  public constructor(
    public id: UUID,
    readonly name: string,
    readonly description: string,
    readonly isPrivate: boolean,
    readonly participants: Array<UserProfile>,
    readonly createdBy: UserProfile
  ) {}

  @Reduces(ChatRoomCreated)
  public static onChatRoomCreated(event: ChatRoomCreated): ChatRoom {
    return new ChatRoom(event.id, event.name, event.description, event.isPrivate, [event.createdBy], event.createdBy)
  }

  @Reduces(ChatRoomUpdated)
  public static onChatRoomUpdated(event: ChatRoomUpdated, oldChatRoom: ChatRoom): ChatRoom {
    return {
      ...oldChatRoom,
      name: event.name,
      description: event.description,
      isPrivate: event.isPrivate,
    }
  }

  @Reduces(UserJoined)
  public static onsUserJoinedToChatRoom(event: UserJoined, oldChatRoom: ChatRoom): ChatRoom {
    return {
      ...oldChatRoom,
      participants: [...oldChatRoom.participants, event.user],
    }
  }
}
