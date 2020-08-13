import { Command, Booster } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { User, Admin } from '../../roles'
import { MessageCreated } from '../../events/chatRoom/MessageCreated'
import { ChatRoom } from '../../entities/ChatRoom'
import { MessageType } from '../../entities/Message'
import { UserProfile } from '../../entities/UserProfile'

@Command({
  authorize: [User, Admin],
})
export class CreateMessage {
  public constructor(readonly chatRoomId: UUID, readonly body: string) {}

  public async handle(register: Register): Promise<void> {
    if (register.currentUser) {
      const chatRoom = await Booster.fetchEntitySnapshot(ChatRoom, this.chatRoomId)
      const userProfile = await Booster.fetchEntitySnapshot(UserProfile, register.currentUser?.email)

      if (chatRoom && userProfile) {
        register.events(new MessageCreated(UUID.generate(), this.chatRoomId, userProfile, this.body, MessageType.CHAT))
      } else {
        throw 'Unable to send the message. Please verify that the chat room exists and the user profile is valid'
      }
    }
  }
}
