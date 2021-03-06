import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class QuestionLiked {
  public constructor(readonly questionId: UUID, readonly byWhom: string) {}

  public entityID(): UUID {
    return this.questionId
  }
}
