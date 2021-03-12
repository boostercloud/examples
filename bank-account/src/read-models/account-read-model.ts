import { ReadModel, Projects } from '@boostercloud/framework-core'
import { UUID, ProjectionResult } from '@boostercloud/framework-types'
import { Account } from '../entities/account'
import { BankTeller, Customer } from '../roles'

@ReadModel({
  authorize: [Customer, BankTeller],
})
export class AccountReadModel {
  public constructor(public id: UUID, readonly owner: UUID, readonly balance: number) {}

  @Projects(Account, 'id')
  public static projectAccount(entity: Account): ProjectionResult<AccountReadModel> {
    return new AccountReadModel(entity.id, entity.owner, entity.balance)
  }
}
