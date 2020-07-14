import { Register, UUID } from '@boostercloud/framework-types/dist'
import { DepositPerformed } from '../events/DepositPerformed'
import { Command } from '@boostercloud/framework-core/dist'
import { Client } from '../Roles'

@Command({
  authorize: [Client],
})
export class Deposit {
  constructor(readonly iban: UUID, readonly amount: number) {}

  public async handle(register: Register): Promise<void> {
    register.events(new DepositPerformed(this.iban, this.amount))
  }
}
