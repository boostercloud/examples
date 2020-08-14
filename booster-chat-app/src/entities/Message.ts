import { Entity } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { UserProfile } from './UserProfile'

export enum MessageType {
  CHAT = 'chat',
  JOIN = 'join',
}

@Entity
export class Message {
  public constructor(
    public id: UUID,
    readonly chatRoomId: UUID,
    readonly body: string,
    readonly messageType: MessageType,
    readonly createdAt: string,
    readonly createdBy: UserProfile
  ) {}
}
