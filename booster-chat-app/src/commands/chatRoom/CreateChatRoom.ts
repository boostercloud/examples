import { Command, Booster } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { ChatRoomCreated } from '../../events/chatRoom/ChatRoomCreated'
import { Admin, User } from '../../roles'
import { UserProfile } from '../../entities/UserProfile'

@Command({
  authorize: [User, Admin],
})
export class CreateChatRoom {
  public constructor(
    readonly id: UUID,
    readonly name: string,
    readonly description: string,
    readonly isPrivate: boolean
  ) {}

  public async handle(register: Register): Promise<void> {
    if (register.currentUser) {
      const userProfile = await Booster.fetchEntitySnapshot(UserProfile, register.currentUser.email)
      if (userProfile) {
        register.events(new ChatRoomCreated(UUID.generate(), this.name, this.description, userProfile, this.isPrivate))
      } else {
        throw 'Error trying to create a chat room. User not found.'
      }
    }
  }
}
