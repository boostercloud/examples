import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class QuestionAsked {
  public constructor(
    readonly questionId: UUID,
    readonly questioner: string,
    readonly conference: UUID,
    readonly text: string
  ) {}

  public entityID(): UUID {
    return this.questionId
  }
}
