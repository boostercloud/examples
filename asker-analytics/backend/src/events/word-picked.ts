import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class WordPicked {
  public constructor(
    readonly name: string,
    readonly id: UUID,
    readonly questionId: UUID,
    readonly conferenceId: UUID,
  ) {}

  public entityID(): UUID {
    return this.id
  }
}
