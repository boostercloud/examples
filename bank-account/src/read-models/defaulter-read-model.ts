import { ReadModel, Projects } from '@boostercloud/framework-core'
import { UUID, ProjectionResult } from '@boostercloud/framework-types'
import { Defaulter } from '../entities/defaulter'
import { BankTeller } from '../roles'

@ReadModel({
  authorize: [BankTeller],
})
export class DefaulterReadModel {
  public constructor(public id: UUID, readonly defaultedAccounts: Array<UUID>) {}

  @Projects(Defaulter, 'userID')
  public static projectDefaulter(entity: Defaulter): ProjectionResult<DefaulterReadModel> {
    return new DefaulterReadModel(entity.id, entity.defaultedAccounts)
  }
}
