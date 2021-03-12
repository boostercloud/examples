import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class AccountCreated {
  public constructor(readonly owner: UUID, readonly iban: string) {}

  public entityID(): UUID {
    return this.iban
  }
}
