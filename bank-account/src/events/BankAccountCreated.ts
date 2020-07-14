import { UUID } from '@boostercloud/framework-types'
import { Event } from '@boostercloud/framework-core'

@Event
export class BankAccountCreated {
  public constructor(readonly owner: UUID, readonly iban: UUID) {}

  public entityID(): UUID {
    return this.iban
  }
}
