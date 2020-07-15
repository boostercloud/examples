import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { BankAccountCreated } from '../events/BankAccountCreated'

@Entity
export class BankAccount {
  public constructor(public id: UUID, readonly owner: UUID, readonly iban: UUID, readonly balance: number) {}

  @Reduces(BankAccountCreated)
  public static reduceBankAccountCreated(event: BankAccountCreated, _currentBankAccount?: BankAccount): BankAccount {
    return new BankAccount(UUID.generate(), event.owner, event.iban, 0)
  }
}
