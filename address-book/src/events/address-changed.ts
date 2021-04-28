import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class AddressChanged {
  public constructor(readonly id: UUID, readonly address: string) {}

  public entityID(): UUID {
    return this.id
  }
}
