import { Entity, Reduces } from '@boostercloud/framework-core'
import { BankAccountCreated } from '../events/BankAccountCreated'
import { DepositPerformed } from '../events/DepositPerformed'
import { UUID } from '@boostercloud/framework-types'
import { WithdrawPerformed } from '../events/WithdrawPerformed'

const NEW_ACCOUNT_BALANCE = 0.0

@Entity
export class BankAccount {
  public constructor(readonly id: UUID, readonly owner: UUID, readonly balance: number) {}

  @Reduces(BankAccountCreated)
  public static reduceBankAccountCreated(event: BankAccountCreated, _currentBankAccount?: BankAccount): BankAccount {
    return new BankAccount(event.iban, event.owner, NEW_ACCOUNT_BALANCE)
  }

  @Reduces(DepositPerformed)
  public static reduceDepositPerformed(event: DepositPerformed, currentBankAccount?: BankAccount): BankAccount {
    if (!currentBankAccount) {
      throw Error('Should not happen: Attempting to deposit into an unexistent account')
    }
    return new BankAccount(
      currentBankAccount.id,
      currentBankAccount.owner,
      BankAccount.calculateBalance(currentBankAccount, event.amount)
    )
  }

  @Reduces(WithdrawPerformed)
  static reduceWithdrawPerformed(event: WithdrawPerformed, currentBankAccount?: BankAccount): BankAccount {
    if (!currentBankAccount) {
      throw Error('Should not happen: Attempting to deposit into an unexistent account')
    }
    return new BankAccount(
      currentBankAccount.id,
      currentBankAccount.owner,
      BankAccount.calculateBalance(currentBankAccount, -event.amount)
    )
  }

  static calculateBalance(currentBankAccount: BankAccount, amount: number): number {
    return currentBankAccount.balance + amount
  }
}
