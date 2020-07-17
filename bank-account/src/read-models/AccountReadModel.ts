import { Projects, ReadModel } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { BankAccount } from '../entities/BankAccount'
import { Banker, Client } from '../Roles'

@ReadModel({
  authorize: [Client, Banker],
})
export class AccountReadModel {
  public constructor(public id: UUID, readonly iban: UUID, readonly balance: number) {}

  @Projects(BankAccount, 'owner')
  public static projectBankAccount(entity: BankAccount, _currentAccountReadModel?: AccountReadModel): AccountReadModel {
    return new AccountReadModel(entity.owner, entity.id, entity.balance)
  }
}
