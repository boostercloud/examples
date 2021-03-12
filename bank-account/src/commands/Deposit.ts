import { Command } from '@boostercloud/framework-core'
import { Register } from '@boostercloud/framework-types'
import { BankTeller, Customer } from '../roles'
import { DepositPerformed } from '../events/deposit-performed'

@Command({
  authorize: [Customer, BankTeller],
})
export class Deposit {
  public constructor(readonly iban: string, readonly amount: number) {}

  public static async handle(command: Deposit, register: Register): Promise<void> {
    register.events(new DepositPerformed(command.iban, command.amount))
  }
}
