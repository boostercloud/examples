import { Entity } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Entity
export class Question {
  public constructor(
    public id: UUID,
    readonly conferenceId: UUID,
    readonly username: string,
    readonly text: string,
    readonly likes: number
  ) {}
}
