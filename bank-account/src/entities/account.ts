import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { AccountCreated } from '../events/account-created'
import { DepositPerformed } from '../events/deposit-performed'
import { WithdrawPerformed } from '../events/withdraw-performed'

const balanceForNewAccounts = 0

@Entity
export class Account {
  public constructor(public id: UUID, readonly owner: UUID, readonly balance: number) {}

  @Reduces(AccountCreated)
  public static reduceBankAccountCreated(event: AccountCreated): Account {
    return new Account(event.iban, event.owner, balanceForNewAccounts)
  }

  @Reduces(DepositPerformed)
  public static reduceDepositPerformed(event: DepositPerformed, currentAccount?: Account): Account {
    if (!currentAccount) {
      throw new Error('Attempting to deposit into a nonexistent account')
    }
    const newBalance = currentAccount.balance + event.amount
    return new Account(currentAccount.id, currentAccount.owner, newBalance)
  }

  @Reduces(WithdrawPerformed)
  public static reduceWithdrawPerformed(event: WithdrawPerformed, currentAccount?: Account): Account {
    if (!currentAccount) {
      throw new Error('Attempting to withdraw from a nonexistent account')
    }
    const newBalance = currentAccount.balance - event.amount
    return new Account(currentAccount.id, currentAccount.owner, newBalance)
  }
}
