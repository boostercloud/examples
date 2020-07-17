import { UUID } from '@boostercloud/framework-types'
import { Event } from '@boostercloud/framework-core'

@Event
export class DepositPerformed {
  public constructor(readonly iban: UUID, readonly amount: number) {}

  public entityID(): UUID {
    return this.iban
  }
}
