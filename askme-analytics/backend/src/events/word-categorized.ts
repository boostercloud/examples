import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class WordCategorized {
  public constructor(
    readonly name: string,
    readonly wordType: string,
    readonly id: UUID,
    readonly questionId: UUID,
    readonly conferenceId: UUID
  ) {}

  public entityID(): UUID {
    return this.id
  }
}
