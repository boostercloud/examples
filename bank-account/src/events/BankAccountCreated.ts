import { UUID } from '@boostercloud/framework-types'

// @Event
export class BankAccountCreated {
  public constructor(readonly owner: UUID, readonly iban: UUID) {}

  public entityID(): UUID {
    return this.iban
  }
}
