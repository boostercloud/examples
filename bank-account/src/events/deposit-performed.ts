import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class DepositPerformed {
  public constructor(readonly iban: string, readonly amount: number) {}

  public entityID(): UUID {
    return this.iban
  }
}
