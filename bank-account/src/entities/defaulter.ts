import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { DefaulterDetected } from '../events/defaulter-detected'

@Entity
export class Defaulter {
  public constructor(public id: UUID, readonly defaultedAccounts: Array<UUID>) {}

  @Reduces(DefaulterDetected)
  public static reduceDefaulterDetected(event: DefaulterDetected, currentDefaulter?: Defaulter): Defaulter {
    const defaultedOnAccounts: Array<UUID> = []
    if (currentDefaulter) {
      defaultedOnAccounts.push(...currentDefaulter.defaultedAccounts)
    }
    defaultedOnAccounts.push(event.onAccount)
    return new Defaulter(event.userID, defaultedOnAccounts)
  }
}
