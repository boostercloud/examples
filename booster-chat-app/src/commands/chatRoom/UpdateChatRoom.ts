import { Command, Booster } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { User, Admin } from '../../roles'
import { ChatRoomUpdated } from '../../events/chatRoom/ChatRoomUpdated'
import { ChatRoom } from '../../entities/ChatRoom'

@Command({
  authorize: [User, Admin],
})
export class UpdateChatRoom {
  public constructor(
    readonly id: UUID,
    readonly name: string,
    readonly description: string,
    readonly isPrivate: boolean
  ) {}

  public async handle(register: Register): Promise<void> {
    const chatRoom = await Booster.fetchEntitySnapshot(ChatRoom, this.id)

    if (chatRoom?.createdBy?.id === register.currentUser?.email) {
      register.events(new ChatRoomUpdated(this.id, this.name, this.description, this.isPrivate))
    } else {
      throw `Error trying to update the chat room with id ${this.id}. Make sure you are the owner or the chat room exists.`
    }
  }
}
