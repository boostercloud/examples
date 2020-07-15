import { Projects, ReadModel } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { BankAccount } from '../entities/BankAccount'
import { Banker, Client } from '../Roles'

@ReadModel({
  authorize: [Client, Banker],
})
export class AccountReadModel {
  public constructor(public id: UUID, readonly owner: UUID, readonly balance: number) {}

  @Projects(BankAccount, 'id')
  public static projectBankAccount(entity: BankAccount, _currentAccountReadModel?: AccountReadModel): AccountReadModel {
    return new AccountReadModel(entity.id, entity.owner, entity.balance)
  }
}
