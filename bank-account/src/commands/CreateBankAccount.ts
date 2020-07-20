import { Register, UUID } from '@boostercloud/framework-types'
import { BankAccountCreated } from '../events/BankAccountCreated'
import { Command } from '@boostercloud/framework-core'
import { BankTeller } from '../Roles'

@Command({
  authorize: [BankTeller],
})
export class CreateBankAccount {
  public constructor(readonly owner: UUID) {}

  private static generateNewIBAN(): UUID {
    return UUID.generate()
  }

  public async handle(register: Register): Promise<void> {
    register.events(new BankAccountCreated(this.owner, CreateBankAccount.generateNewIBAN()))
  }
}
