import { Entity, Reduces } from '@boostercloud/framework-core'
import { BankAccountCreated } from '../events/BankAccountCreated'
import { DepositPerformed } from '../events/DepositPerformed'
import { UUID } from '@boostercloud/framework-types/dist'

const NEW_ACCOUNT_BALANCE = 0.0

@Entity
export class BankAccount {
  public constructor(readonly id: UUID, readonly owner: UUID, readonly balance: number) {}

  @Reduces(BankAccountCreated)
  public static reduceBankAccountCreated(event: BankAccountCreated, _currentBankAccount?: BankAccount): BankAccount {
    return new BankAccount(event.iban, event.owner, NEW_ACCOUNT_BALANCE)
  }
}
