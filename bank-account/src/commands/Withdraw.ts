import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { BankTeller, Customer } from '../Roles'
import { WithdrawPerformed } from '../events/WithdrawPerformed'

@Command({
  authorize: [Customer, BankTeller],
})
export class Withdraw {
  public constructor(readonly iban: UUID, readonly amount: number) {}

  public async handle(register: Register): Promise<void> {
    register.events(new WithdrawPerformed(this.iban, this.amount))
  }
}
