import { Command } from '@boostercloud/framework-core'
import { User, Admin } from '../../roles'
import { Register, UUID } from '@boostercloud/framework-types'
import { Booster } from '@boostercloud/framework-core/dist/booster'
import { ChatRoom } from '../../entities/ChatRoom'
import { UserProfile } from '../../entities/UserProfile'
import { UserJoined } from '../../events/chatRoom/UserJoined'

@Command({
  authorize: [User, Admin],
})
export class JoinUser {
  public constructor(readonly chatRoomId: UUID) {}

  public async handle(register: Register): Promise<void> {
    if (register.currentUser) {
      const chatRoom = await Booster.fetchEntitySnapshot(ChatRoom, this.chatRoomId)

      if (!chatRoom) {
        throw `Unable to join to chat room. Chat Room with id ${this.chatRoomId} does not exists`
      }

      const participant = chatRoom.participants.find((item) => item.id === register.currentUser?.email)

      if (!participant) {
        const userProfile = await Booster.fetchEntitySnapshot(UserProfile, register.currentUser.email)
        if (userProfile) {
          register.events(new UserJoined(this.chatRoomId, userProfile))
        }
      }
    }
  }
}
