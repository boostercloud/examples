import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class WithdrawPerformed {
  public constructor(readonly iban: UUID, readonly amount: number) {}

  public entityID(): UUID {
    return this.iban
  }
}
