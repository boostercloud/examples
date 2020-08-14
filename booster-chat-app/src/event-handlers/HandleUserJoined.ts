import { EventHandler, Booster } from '@boostercloud/framework-core'
import { Register } from '@boostercloud/framework-types'
import { UserJoined } from '../events/chatRoom/UserJoined'
import { MessageCreated } from '../events/chatRoom/MessageCreated'
import { MessageType } from '../entities/Message'
import { ChatRoom } from '../entities/ChatRoom'

@EventHandler(UserJoined)
export class HandleUserJoined {
  public static async handle(event: UserJoined, register: Register): Promise<void> {
    const chatRoom = await Booster.fetchEntitySnapshot(ChatRoom, event.id)
    if (chatRoom) {
      register.events(
        new MessageCreated(event.id, chatRoom.id, event.user, `${event.user.alias} has joined in`, MessageType.JOIN)
      )
    }
  }
}
