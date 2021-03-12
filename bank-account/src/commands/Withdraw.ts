import { Command } from '@boostercloud/framework-core'
import { Register } from '@boostercloud/framework-types'
import { BankTeller, Customer } from '../roles'
import { WithdrawPerformed } from '../events/withdraw-performed'

@Command({
  authorize: [Customer, BankTeller],
})
export class Withdraw {
  public constructor(readonly iban: string, readonly amount: number) {}

  public static async handle(command: Withdraw, register: Register): Promise<void> {
    register.events(new WithdrawPerformed(command.iban, command.amount))
  }
}
