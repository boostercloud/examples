import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class QuestionAsked {
  public constructor(
    readonly text: string,
    readonly id: UUID,
    readonly conferenceId: UUID,
  ) {}

  public entityID(): UUID {
    return this.id
  }
}
