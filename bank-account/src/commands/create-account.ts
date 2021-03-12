import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { AccountCreated } from '../events/account-created'
import { BankTeller } from '../roles'

@Command({
  authorize: [BankTeller],
})
export class CreateAccount {
  public constructor(readonly owner: UUID) {}

  public static async handle(command: CreateAccount, register: Register): Promise<void> {
    const iban = UUID.generate()
    register.events(new AccountCreated(command.owner, iban as string))
  }
}
